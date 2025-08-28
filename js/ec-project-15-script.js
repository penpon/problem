// EC Project 15 初心者向け実装
// 機能: カタログ/ミニカート×削除/チェックアウト/完了/認証・管理/ユーザー別お気に入り

(function(){
  'use strict';

  // ================== データと状態 ==================
  const PRODUCTS = [
    { id: 'p1', name: 'フリルドレス', category: 'dresses', price: 4800, stock: true, tags: ['frill'], sale: false, isNew: true, img: 'https://picsum.photos/seed/d1/400/260' },
    { id: 'p2', name: 'レーストップス', category: 'tops', price: 3200, stock: true, tags: ['lace'], sale: true, isNew: false, img: 'https://picsum.photos/seed/t1/400/260' },
    { id: 'p3', name: 'シフォンスカート', category: 'skirts', price: 6200, stock: false, tags: ['chiffon'], sale: false, isNew: true, img: 'https://picsum.photos/seed/s1/400/260' },
    { id: 'p4', name: 'アクセサリーA', category: 'accessories', price: 1800, stock: true, tags: [], sale: true, isNew: false, img: 'https://picsum.photos/seed/a1/400/260' }
  ];

  // localStorage キー
  const LS_USERS = 'wf_users'; // {email, password, isAdmin}
  const LS_CURRENT = 'wf_current_user'; // string email or ''
  const LS_FAVS = 'wf_favs'; // { [email or __guest__]: string[] }
  const LS_LOGS = 'wf_purchase_logs'; // 購入ログ配列
  const GUEST = '__guest__';

  let cart = []; // {id, qty}
  let pendingPurchase = false;

  // ================== 要素参照 ==================
  const $ = (sel) => document.querySelector(sel);
  const list = $('#list');
  const totalEl = $('#total');
  const cartCount = $('#cartCount');
  const miniCartList = $('#miniCartList');
  const miniCartTotal = $('#miniCartTotal');
  const cartList = $('#cartList');
  const totalCheckout = $('#totalCheckout');
  const checkoutBtn = $('#checkoutBtn');
  const goCheckoutMini = $('#goCheckoutMini');
  const backToCatalog = $('#backToCatalog');
  const completeBtn = $('#completeBtn');
  const backHome = $('#backHome');
  const orderNoEl = $('#orderNo');

  const viewCatalog = $('#viewCatalog');
  const viewCheckout = $('#viewCheckout');
  const viewComplete = $('#viewComplete');
  const viewAuth = $('#viewAuth');
  const viewAdmin = $('#viewAdmin');

  const authArea = $('#authArea');

  // フィルタ/ソート
  const categorySel = $('#category');
  const sortSel = $('#sort');
  const inStockCb = $('#inStock');

  // 認証フォーム
  const loginEmail = $('#loginEmail');
  const loginPass = $('#loginPassword');
  const loginBtn = $('#loginBtn');
  const regEmail = $('#registerEmail');
  const regPass = $('#registerPassword');
  const registerBtn = $('#registerBtn');

  // 管理画面
  const adminTableBody = $('#adminTableBody');

  // カテゴリバッジ
  const badgeNew = $('#badgeNew');
  const badgeDresses = $('#badgeDresses');
  const badgeTops = $('#badgeTops');
  const badgeSkirts = $('#badgeSkirts');
  const badgeAccessories = $('#badgeAccessories');

  // ================== ユーティリティ ==================
  function getUsers(){
    try { return JSON.parse(localStorage.getItem(LS_USERS) || '[]'); } catch { return []; }
  }
  function setUsers(arr){ localStorage.setItem(LS_USERS, JSON.stringify(arr)); }

  function getCurrent(){ return localStorage.getItem(LS_CURRENT) || ''; }
  function setCurrent(email){ localStorage.setItem(LS_CURRENT, email || ''); }

  function getFavs(){
    try { return JSON.parse(localStorage.getItem(LS_FAVS) || '{}'); } catch { return {}; }
  }
  function setFavs(obj){ localStorage.setItem(LS_FAVS, JSON.stringify(obj)); }

  function getLogs(){
    try { return JSON.parse(localStorage.getItem(LS_LOGS) || '[]'); } catch { return []; }
  }
  function setLogs(arr){ localStorage.setItem(LS_LOGS, JSON.stringify(arr)); }

  function ensureAdminSeed(){
    const users = getUsers();
    if (!users.find(u => u.email === 'admin@example.com')){
      users.push({ email: 'admin@example.com', password: 'admin123', isAdmin: true });
      setUsers(users);
    }
  }

  function currency(n){ return '¥' + n.toLocaleString(); }

  // ================== レンダリング ==================
  function renderCatalog(){
    const cat = categorySel ? categorySel.value : 'all';
    const sort = sortSel ? sortSel.value : 'new';
    const onlyStock = inStockCb ? inStockCb.checked : false;

    let arr = PRODUCTS.slice();

    if (cat !== 'all') arr = arr.filter(p => p.category === cat);
    if (onlyStock) arr = arr.filter(p => p.stock);

    if (sort === 'price_asc') arr.sort((a,b)=>a.price-b.price);
    if (sort === 'price_desc') arr.sort((a,b)=>b.price-a.price);
    if (sort === 'new') arr.sort((a,b)=> (b.isNew?1:0) - (a.isNew?1:0));

    const html = arr
      .map(p => `
        <div class="col-12 col-sm-6 col-lg-4">
          <div class="card h-100">
            <img src="${p.img}" class="card-img-top" alt="${p.name}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${p.name}</h5>
              <p class="card-text mb-1">${currency(p.price)}</p>
              <p class="text-${p.stock?'success':'danger'} small mb-3">${p.stock?'在庫あり':'在庫切れ'}</p>
              <div class="mt-auto d-flex gap-2">
                <button class="btn btn-dark btn-sm add-to-cart" data-id="${p.id}" ${p.stock?'':'disabled'}>カートに追加</button>
                <button class="btn btn-outline-secondary btn-sm toggle-fav" data-id="${p.id}">★</button>
              </div>
            </div>
          </div>
        </div>
      `)
      .join('');

    if (list) list.innerHTML = html;
  }

  function renderCartSummary(){
    const items = cart.map(ci => {
      const prod = PRODUCTS.find(p=>p.id===ci.id);
      return { ...ci, name: prod?.name || '', price: prod?.price || 0 };
    });
    const count = items.reduce((sum,i)=> sum + i.qty, 0);
    const total = items.reduce((sum,i)=> sum + i.price * i.qty, 0);

    if (cartCount) cartCount.textContent = String(count);
    if (totalEl) totalEl.textContent = currency(total);
    if (miniCartTotal) miniCartTotal.textContent = currency(total);
  }

  function renderMiniCart(){
    const items = cart.map(ci => {
      const prod = PRODUCTS.find(p=>p.id===ci.id);
      return { ...ci, name: prod?.name || '', price: prod?.price || 0 };
    });
    const html = items.map(i => `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <div class="fw-semibold">${i.name}</div>
          <div class="text-muted small">${currency(i.price)} × ${i.qty}</div>
        </div>
        <button class="btn-close remove-mini" aria-label="Remove" data-id="${i.id}"></button>
      </li>
    `).join('');
    if (miniCartList) miniCartList.innerHTML = html;
  }

  function renderCheckout(){
    const items = cart.map(ci => {
      const prod = PRODUCTS.find(p=>p.id===ci.id);
      return { ...ci, name: prod?.name || '', price: prod?.price || 0 };
    });
    const html = items.map(i => `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${i.name} × ${i.qty}</span>
        <span>${currency(i.price * i.qty)}</span>
      </li>
    `).join('');
    if (cartList) cartList.innerHTML = html;

    const total = items.reduce((sum,i)=> sum + i.price * i.qty, 0);
    if (totalCheckout) totalCheckout.textContent = currency(total);
  }

  // ================== カート操作 ==================
  function addToCart(id){
    const found = cart.find(c=>c.id===id);
    if (found) found.qty += 1; else cart.push({ id, qty: 1 });
    renderCartSummary();
    renderMiniCart();
  }
  function removeFromCart(id){
    cart = cart.filter(c=>c.id!==id);
    renderCartSummary();
    renderMiniCart();
  }

  // ================== 認証/管理 ==================
  function updateAuthArea(){
    const email = getCurrent();
    if (!authArea) return;
    if (email){
      const users = getUsers();
      const me = users.find(u=>u.email===email);
      const adminBadge = me?.isAdmin ? '<span class="badge text-bg-danger ms-2">ADMIN</span>' : '';
      authArea.innerHTML = `
        <span class="me-2">${email}</span>
        ${adminBadge}
        <button id="btnLogout" class="btn btn-outline-secondary btn-sm ms-2">ログアウト</button>
      `;
      const btnLogout = $('#btnLogout');
      if (btnLogout){
        btnLogout.addEventListener('click', () => {
          setCurrent('');
          updateAuthArea();
          showView('catalog');
        });
      }
    }else{
      authArea.innerHTML = `
        <button id="btnGoAuth" class="btn btn-outline-dark btn-sm">ログイン/登録</button>
      `;
      const btnGoAuth = $('#btnGoAuth');
      if (btnGoAuth){
        btnGoAuth.addEventListener('click', () => showView('auth'));
      }
    }
  }

  function tryLogin(){
    const email = (loginEmail?.value || '').trim();
    const password = (loginPass?.value || '').trim();
    if (!email || !password) return alert('メールとパスワードを入力してください');

    const users = getUsers();
    const u = users.find(x=>x.email===email && x.password===password);
    if (!u) return alert('メールまたはパスワードが違います');

    migrateGuestFavs(email);
    setCurrent(email);
    updateAuthArea();
    showView('catalog');
  }

  function tryRegister(){
    const email = (regEmail?.value || '').trim();
    const password = (regPass?.value || '').trim();
    if (!email || !password) return alert('メールとパスワードを入力してください');

    const users = getUsers();
    if (users.find(x=>x.email===email)) return alert('既に登録済みのメールです');

    users.push({ email, password, isAdmin: false });
    setUsers(users);

    migrateGuestFavs(email);
    setCurrent(email);
    updateAuthArea();
    showView('catalog');
  }

  function migrateGuestFavs(email){
    const favs = getFavs();
    const guest = new Set(favs[GUEST] || []);
    const me = new Set(favs[email] || []);
    favs[email] = Array.from(new Set([...guest, ...me]));
    favs[GUEST] = [];
    setFavs(favs);
  }

  function toggleFav(id){
    const email = getCurrent() || GUEST;
    const favs = getFavs();
    const arr = new Set(favs[email] || []);
    if (arr.has(id)) arr.delete(id); else arr.add(id);
    favs[email] = Array.from(arr);
    setFavs(favs);
  }

  function renderAdmin(){
    if (!adminTableBody) return;
    const email = getCurrent();
    const users = getUsers();
    const me = users.find(u=>u.email===email);
    const isAdmin = !!me?.isAdmin;
    if (!isAdmin){ adminTableBody.innerHTML = ''; return; }

    const logs = getLogs();
    const rows = logs.map((log, idx) => `
      <tr>
        <td>${idx+1}</td>
        <td>${log.email || '(guest)'}</td>
        <td>${log.items.map(i=>`${i.name}×${i.qty}`).join(', ')}</td>
        <td>${currency(log.total)}</td>
        <td>${log.orderNo}</td>
        <td>${new Date(log.at).toLocaleString()}</td>
      </tr>
    `).join('');
    adminTableBody.innerHTML = rows || '<tr><td colspan="6" class="text-center text-muted">購入ログはまだありません</td></tr>';
  }

  // ================== 画面遷移 ==================
  function showView(name){
    const map = {
      catalog: viewCatalog,
      checkout: viewCheckout,
      complete: viewComplete,
      auth: viewAuth,
      admin: viewAdmin
    };
    [viewCatalog, viewCheckout, viewComplete, viewAuth, viewAdmin].forEach(v => { if (v) v.classList.add('d-none'); });
    const el = map[name];
    if (el) el.classList.remove('d-none');

    if (name === 'catalog') renderCatalog();
    if (name === 'checkout') renderCheckout();
    if (name === 'admin') renderAdmin();
  }

  // ================== 購入処理 ==================
  function doCheckout(){
    if (cart.length === 0) return alert('カートが空です');
    pendingPurchase = true;
    showView('checkout');
  }

  function completePurchase(){
    if (!pendingPurchase) return;

    const items = cart.map(ci => {
      const prod = PRODUCTS.find(p=>p.id===ci.id);
      return { ...ci, name: prod?.name || '', price: prod?.price || 0 };
    });
    const total = items.reduce((s,i)=> s + i.price * i.qty, 0);
    const orderNo = 'W' + Math.random().toString(36).slice(2, 8).toUpperCase();

    // ログ保存
    const logs = getLogs();
    logs.push({
      email: getCurrent() || '',
      items,
      total,
      orderNo,
      at: Date.now()
    });
    setLogs(logs);

    // 表示/状態更新
    if (orderNoEl) orderNoEl.textContent = orderNo;
    cart = [];
    pendingPurchase = false;
    renderCartSummary();
    renderMiniCart();
    showView('complete');
  }

  // ================== イベント登録 ==================
  function bindEvents(){
    // カタログ操作
    if (list){
      list.addEventListener('click', (e) => {
        const btnAdd = e.target.closest('.add-to-cart');
        const btnFav = e.target.closest('.toggle-fav');
        if (btnAdd){ addToCart(btnAdd.dataset.id); }
        if (btnFav){ toggleFav(btnFav.dataset.id); }
      });
    }

    // ミニカート × 削除（btn-close）
    if (miniCartList){
      miniCartList.addEventListener('click', (e) => {
        const btn = e.target.closest('.remove-mini');
        if (btn){ removeFromCart(btn.dataset.id); }
      });
    }

    // ヘッダーのカートボタン
    const goCart = $('#goCart');
    if (goCart){ goCart.addEventListener('click', () => showView('checkout')); }

    // ミニカートのチェックアウトへ
    if (goCheckoutMini){ goCheckoutMini.addEventListener('click', () => doCheckout()); }

    // フィルタ/ソート
    if (categorySel) categorySel.addEventListener('change', renderCatalog);
    if (sortSel) sortSel.addEventListener('change', renderCatalog);
    if (inStockCb) inStockCb.addEventListener('change', renderCatalog);

    // バッジでカテゴリ切り替え
    if (badgeNew) badgeNew.addEventListener('click', () => { if (sortSel) sortSel.value='new'; renderCatalog(); });
    if (badgeDresses) badgeDresses.addEventListener('click', () => { if (categorySel) categorySel.value='dresses'; renderCatalog(); });
    if (badgeTops) badgeTops.addEventListener('click', () => { if (categorySel) categorySel.value='tops'; renderCatalog(); });
    if (badgeSkirts) badgeSkirts.addEventListener('click', () => { if (categorySel) categorySel.value='skirts'; renderCatalog(); });
    if (badgeAccessories) badgeAccessories.addEventListener('click', () => { if (categorySel) categorySel.value='accessories'; renderCatalog(); });

    // チェックアウト/完了
    if (checkoutBtn) checkoutBtn.addEventListener('click', () => doCheckout());
    if (backToCatalog) backToCatalog.addEventListener('click', () => showView('catalog'));
    if (completeBtn) completeBtn.addEventListener('click', () => completePurchase());
    if (backHome) backHome.addEventListener('click', () => showView('catalog'));

    // 認証
    if (loginBtn) loginBtn.addEventListener('click', () => tryLogin());
    if (registerBtn) registerBtn.addEventListener('click', () => tryRegister());

    // 管理画面表示切替（管理者のみ想定：UI側でリンクがあるとき）
    const adminLink = $('#goAdmin');
    if (adminLink){ adminLink.addEventListener('click', () => showView('admin')); }
  }

  // ================== 初期化 ==================
  document.addEventListener('DOMContentLoaded', () => {
    ensureAdminSeed();
    updateAuthArea();
    bindEvents();
    renderCartSummary();
    renderMiniCart();
    showView('catalog');
  });
})();
