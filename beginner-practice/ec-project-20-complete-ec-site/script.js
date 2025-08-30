/* ==========================================================================
   基本ショップ - 初心者向けECサイト スクリプト
   シンプルさ重視 / 初学者でも追いやすい実装
   ========================================================================== */

// ========== 商品データ（例） ==========
const products = [
  { id: 1, name: 'ベーシックTシャツ', category: '服', price: 2980, image: 'https://via.placeholder.com/200x200?text=Tシャツ', description: '着心地の良いベーシックなTシャツです。' },
  { id: 2, name: 'カジュアルスニーカー', category: '靴', price: 4980, image: 'https://via.placeholder.com/200x200?text=スニーカー', description: '歩きやすくて丈夫なスニーカーです。' },
  { id: 3, name: 'レザーバッグ', category: 'バッグ', price: 8980, image: 'https://via.placeholder.com/200x200?text=バッグ', description: '上質なレザーを使ったおしゃれなバッグです。' },
  { id: 4, name: 'シャツワンピース', category: '服', price: 6580, image: 'https://via.placeholder.com/200x200?text=ワンピース', description: 'きれいめカジュアルに使えるシャツワンピ。' }
];

// ========== 状態 ==========
let cart = []; // { id, name, price, quantity }
let filteredProducts = products.slice();

// ========== 要素取得 ==========
function getElements() {
  return {
    productsGrid: document.getElementById('productsGrid'),
    cartButton: document.getElementById('cartButton'),
    cartCount: document.getElementById('cartCount'),
    cartSidebar: document.getElementById('cartSidebar'),
    cartOverlay: document.getElementById('cartOverlay'),
    closeCart: document.getElementById('closeCart'),
    cartItems: document.getElementById('cartItems'),
    cartTotal: document.getElementById('cartTotal'),
    checkoutButton: document.getElementById('checkoutButton'),
    // 検索/フィルタ
    searchInput: document.getElementById('searchInput'),
    categoryFilter: document.getElementById('categoryFilter'),
    // モーダル
    productModal: document.getElementById('productModal'),
    modalOverlay: document.getElementById('modalOverlay'),
    closeModal: document.getElementById('closeModal'),
    productDetails: document.getElementById('productDetails'),
  };
}

// ========== 表示系 ==========
function displayProducts(list = filteredProducts) {
  const el = getElements();
  el.productsGrid.innerHTML = '';

  list.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p class="price">¥${p.price.toLocaleString()}</p>
      <p class="description">${p.description}</p>
      <button class="add-to-cart-btn" data-id="${p.id}">🛒 カートに追加</button>
      <button class="detail-btn" data-id="${p.id}">詳細を見る</button>
    `;
    el.productsGrid.appendChild(card);
  });
}

function updateCartCount() {
  const el = getElements();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  el.cartCount.textContent = count;
}

function updateCartDisplay() {
  const el = getElements();
  el.cartItems.innerHTML = '';

  if (cart.length === 0) {
    el.cartItems.innerHTML = '<p class="empty-cart-message">カートは空です</p>';
  } else {
    cart.forEach((item) => {
      const li = document.createElement('div');
      li.className = 'cart-item';
      li.innerHTML = `
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="price">¥${item.price.toLocaleString()}</div>
          <div class="quantity-controls">
            <button class="decrease" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="increase" data-id="${item.id}">+</button>
          </div>
          <button class="remove-btn" data-id="${item.id}">削除</button>
        </div>
        <div>¥${(item.price * item.quantity).toLocaleString()}</div>
      `;
      el.cartItems.appendChild(li);
    });
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  el.cartTotal.textContent = total.toLocaleString();
}

// ========== カート操作 ==========
function addToCart(productId) {
  const p = products.find((x) => x.id === productId);
  if (!p) return;

  const existing = cart.find((x) => x.id === productId);
  if (existing) existing.quantity += 1;
  else cart.push({ id: p.id, name: p.name, price: p.price, quantity: 1 });

  updateCartCount();
  updateCartDisplay();
}

function changeQuantity(productId, delta) {
  const idx = cart.findIndex((x) => x.id === productId);
  if (idx === -1) return;
  cart[idx].quantity += delta;
  if (cart[idx].quantity <= 0) cart.splice(idx, 1);
  updateCartCount();
  updateCartDisplay();
}

function removeFromCart(productId) {
  cart = cart.filter((x) => x.id !== productId);
  updateCartCount();
  updateCartDisplay();
}

// ========== 検索/フィルター ==========
function applyFilters() {
  const el = getElements();
  const q = (el.searchInput.value || '').toLowerCase();
  const cat = el.categoryFilter.value;

  filteredProducts = products.filter((p) => {
    const okQ = !q || p.name.toLowerCase().includes(q);
    const okCat = !cat || p.category === cat;
    return okQ && okCat;
  });

  displayProducts();
}

// ========== 商品詳細 ==========
function showProductDetail(productId) {
  const el = getElements();
  const p = products.find((x) => x.id === productId);
  if (!p) return;

  el.productDetails.innerHTML = `
    <div class="product-detail">
      <img src="${p.image}" alt="${p.name}" />
      <h2>${p.name}</h2>
      <div class="price">¥${p.price.toLocaleString()}</div>
      <p class="description">${p.description}</p>
      <button class="add-to-cart-btn" data-id="${p.id}">🛒 カートに追加</button>
    </div>
  `;

  el.productModal.classList.remove('hidden');
  el.productModal.setAttribute('aria-hidden', 'false');
  el.modalOverlay.classList.remove('hidden');
}

function closeModal() {
  const el = getElements();
  el.productModal.classList.add('hidden');
  el.productModal.setAttribute('aria-hidden', 'true');
  el.modalOverlay.classList.add('hidden');
}

// ========== 初期化 ==========
document.addEventListener('DOMContentLoaded', () => {
  const el = getElements();

  displayProducts();
  updateCartCount();

  // 商品リストへのイベント委譲
  el.productsGrid.addEventListener('click', (ev) => {
    const addBtn = ev.target.closest('.add-to-cart-btn');
    const detailBtn = ev.target.closest('.detail-btn');

    if (addBtn) {
      addToCart(Number(addBtn.dataset.id));
    } else if (detailBtn) {
      showProductDetail(Number(detailBtn.dataset.id));
    }
  });

  // 検索/フィルター
  el.searchInput.addEventListener('input', applyFilters);
  el.categoryFilter.addEventListener('change', applyFilters);

  // カートの開閉
  el.cartButton.addEventListener('click', () => {
    el.cartSidebar.classList.toggle('hidden');
    el.cartOverlay.classList.toggle('hidden');
    const isOpen = !el.cartSidebar.classList.contains('hidden');
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  });
  el.closeCart.addEventListener('click', () => {
    el.cartSidebar.classList.add('hidden');
    el.cartOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });
  el.cartOverlay.addEventListener('click', () => {
    el.cartSidebar.classList.add('hidden');
    el.cartOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });

  // カート内の操作（数量変更・削除）
  el.cartItems.addEventListener('click', (ev) => {
    const inc = ev.target.closest('.increase');
    const dec = ev.target.closest('.decrease');
    const rm = ev.target.closest('.remove-btn');
    if (inc) changeQuantity(Number(inc.dataset.id), +1);
    if (dec) changeQuantity(Number(dec.dataset.id), -1);
    if (rm) removeFromCart(Number(rm.dataset.id));
  });

  // モーダル操作
  el.closeModal.addEventListener('click', closeModal);
  el.modalOverlay.addEventListener('click', closeModal);

  // デバッグ: 幅が狭いときは自動的にサイドバーを閉じる
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) return;
    el.cartSidebar.classList.add('hidden');
    el.cartOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });
});

// ========== デバッグ用関数 ==========
function debugInfo() {
  console.log('=== デバッグ情報 ===');
  console.log('商品数:', products.length);
  console.log('カート内商品数:', cart.length);
  console.log('カート詳細:', cart);
  console.log('フィルター後商品数:', filteredProducts.length);
}
