// EC Project 15 初心者向け実装
// 機能: カタログ/ミニカート×削除/チェックアウト/完了/認証・管理/ユーザー別お気に入り

(function(){
  'use strict';

  // ================== データと状態 ==================
  const PRODUCTS = [
    // dresses (6 items)
    { id: 'p1', name: 'フリルドレス', category: 'dresses', price: 4800, stock: true, tags: ['frill'], sale: false, isNew: true, img: 'https://picsum.photos/seed/d1/400/260' },
    { id: 'p5', name: 'リボンドレス', category: 'dresses', price: 5200, stock: true, tags: ['ribbon'], sale: true, isNew: false, img: 'https://picsum.photos/seed/d2/400/260' },
    { id: 'p6', name: 'サマードレス', category: 'dresses', price: 6500, stock: true, tags: ['summer'], sale: false, isNew: true, img: 'https://picsum.photos/seed/d3/400/260' },
    { id: 'p7', name: 'フラワードレス', category: 'dresses', price: 7000, stock: false, tags: ['flower'], sale: false, isNew: false, img: 'https://picsum.photos/seed/d4/400/260' },
    { id: 'p8', name: 'シンプルドレス', category: 'dresses', price: 4300, stock: true, tags: ['simple'], sale: true, isNew: false, img: 'https://picsum.photos/seed/d5/400/260' },
    { id: 'p9', name: 'エレガントドレス', category: 'dresses', price: 8800, stock: true, tags: ['elegant'], sale: false, isNew: false, img: 'https://picsum.photos/seed/d6/400/260' },

    // tops (6 items)
    { id: 'p2', name: 'レーストップス', category: 'tops', price: 3200, stock: true, tags: ['lace'], sale: true, isNew: false, img: 'https://picsum.photos/seed/t1/400/260' },
    { id: 'p10', name: 'コットントップス', category: 'tops', price: 2800, stock: true, tags: ['cotton'], sale: false, isNew: true, img: 'https://picsum.photos/seed/t2/400/260' },
    { id: 'p11', name: 'ボーダートップス', category: 'tops', price: 3100, stock: true, tags: ['border'], sale: false, isNew: false, img: 'https://picsum.photos/seed/t3/400/260' },
    { id: 'p12', name: 'シアートップス', category: 'tops', price: 3600, stock: false, tags: ['sheer'], sale: true, isNew: false, img: 'https://picsum.photos/seed/t4/400/260' },
    { id: 'p13', name: 'カットソー', category: 'tops', price: 2400, stock: true, tags: ['cutsew'], sale: false, isNew: false, img: 'https://picsum.photos/seed/t5/400/260' },
    { id: 'p14', name: 'ニットトップス', category: 'tops', price: 5400, stock: true, tags: ['knit'], sale: false, isNew: true, img: 'https://picsum.photos/seed/t6/400/260' },

    // skirts (6 items)
    { id: 'p3', name: 'シフォンスカート', category: 'skirts', price: 6200, stock: false, tags: ['chiffon'], sale: false, isNew: true, img: 'https://picsum.photos/seed/s1/400/260' },
    { id: 'p15', name: 'プリーツスカート', category: 'skirts', price: 5900, stock: true, tags: ['pleats'], sale: true, isNew: false, img: 'https://picsum.photos/seed/s2/400/260' },
    { id: 'p16', name: 'Aラインスカート', category: 'skirts', price: 5300, stock: true, tags: ['aline'], sale: false, isNew: false, img: 'https://picsum.photos/seed/s3/400/260' },
    { id: 'p17', name: 'デニムスカート', category: 'skirts', price: 4500, stock: true, tags: ['denim'], sale: false, isNew: true, img: 'https://picsum.photos/seed/s4/400/260' },
    { id: 'p18', name: 'チェック柄スカート', category: 'skirts', price: 6100, stock: false, tags: ['check'], sale: false, isNew: false, img: 'https://picsum.photos/seed/s5/400/260' },
    { id: 'p19', name: 'ミニスカート', category: 'skirts', price: 4200, stock: true, tags: ['mini'], sale: true, isNew: false, img: 'https://picsum.photos/seed/s6/400/260' },

    // accessories (6 items)
    { id: 'p4', name: 'アクセサリーA', category: 'accessories', price: 1800, stock: true, tags: [], sale: true, isNew: false, img: 'https://picsum.photos/seed/a1/400/260' },
    { id: 'p20', name: 'アクセサリーB', category: 'accessories', price: 1500, stock: true, tags: [], sale: false, isNew: true, img: 'https://picsum.photos/seed/a2/400/260' },
    { id: 'p21', name: 'アクセサリーC', category: 'accessories', price: 2100, stock: false, tags: [], sale: false, isNew: false, img: 'https://picsum.photos/seed/a3/400/260' },
    { id: 'p22', name: 'アクセサリーD', category: 'accessories', price: 2300, stock: true, tags: [], sale: true, isNew: false, img: 'https://picsum.photos/seed/a4/400/260' },
    { id: 'p23', name: 'アクセサリーE', category: 'accessories', price: 1700, stock: true, tags: [], sale: false, isNew: false, img: 'https://picsum.photos/seed/a5/400/260' },
    { id: 'p24', name: 'アクセサリーF', category: 'accessories', price: 2600, stock: true, tags: [], sale: false, isNew: true, img: 'https://picsum.photos/seed/a6/400/260' }
  ];

  // localStorage キー
  const LS_USERS = 'wf_users'; // {email, password, isAdmin}
  const LS_CURRENT = 'wf_current_user'; // string email or ''
  const LS_LOGS = 'wf_purchase_logs'; // 購入ログ配列

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

  function getLogs(){
    try { return JSON.parse(localStorage.getItem(LS_LOGS) || '[]'); } catch { return []; }
  }
  function setLogs(arr){ localStorage.setItem(LS_LOGS, JSON.stringify(arr)); }

  function ensureAdminSeed(){
    const users = getUsers();
    const idx = users.findIndex(u => u.email === 'admin@example.com');
    if (idx === -1){
      users.push({ email: 'admin@example.com', password: 'password', isAdmin: true });
      setUsers(users);
    } else {
      // 既存の管理者アカウントがある場合も仕様に合わせてパスワードと権限を整合
      const u = users[idx];
      let changed = false;
      if (u.password !== 'password'){ u.password = 'password'; changed = true; }
      if (!u.isAdmin){ u.isAdmin = true; changed = true; }
      if (changed) setUsers(users);
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
    const email = (loginEmail?.value || regEmail?.value || '').trim();
    const password = (loginPass?.value || regPass?.value || '').trim();
    if (!email || !password) return alert('メールとパスワードを入力してください');

    const users = getUsers();
    const u = users.find(x=>x.email===email && x.password===password);
    if (!u) return alert('メールまたはパスワードが違います');

    setCurrent(email);
    updateAuthArea();
    showView('catalog');
  }

  function tryRegister(){
    const email = (regEmail?.value || loginEmail?.value || '').trim();
    const password = (regPass?.value || loginPass?.value || '').trim();
    if (!email || !password) return alert('メールとパスワードを入力してください');

    const users = getUsers();
    if (users.find(x=>x.email===email)) return alert('既に登録済みのメールです');

    users.push({ email, password, isAdmin: false });
    setUsers(users);
    setCurrent(email);
    updateAuthArea();
    showView('catalog');
  }

  // お気に入り機能は除外

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
    const email = getCurrent();
    if (!email){
      alert('購入手続きにはログインが必要です');
      showView('auth');
      return;
    }
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
        if (btnAdd){ addToCart(btnAdd.dataset.id); }
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
    if (adminLink){
      adminLink.addEventListener('click', () => {
        const users = getUsers();
        const me = users.find(u=>u.email===getCurrent());
        if (!me?.isAdmin){
          alert('管理画面は管理者のみが閲覧できます');
          return;
        }
        showView('admin');
      });
    }
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
