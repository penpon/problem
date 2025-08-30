// EC-15: ミニカート導入（件数と合計の更新）

// 商品データ（最小）
const products = [
  { id: 1, name: "ベーシックTシャツ", price: 2980, image: "https://picsum.photos/seed/t1/300/200" },
  { id: 2, name: "カジュアルスニーカー", price: 4980, image: "https://picsum.photos/seed/s1/300/200" },
  { id: 3, name: "レザーバッグ", price: 8980, image: "https://picsum.photos/seed/b1/300/200" }
];

// カートの状態
let cart = [];

// 要素取得
const els = {
  productsGrid: document.getElementById('productsGrid'),
  cartCount: document.getElementById('cartCount'),
  miniCartTotal: document.getElementById('miniCartTotal'),
};

// 初期化
function init() {
  renderProducts(products);
  updateMiniCart();
}

// 商品描画
function renderProducts(items) {
  els.productsGrid.innerHTML = items
    .map((p) => `
      <article class="card">
        <img src="${p.image}" alt="${p.name}">
        <div class="name">${p.name}</div>
        <div class="price">¥${p.price.toLocaleString()}</div>
        <button data-id="${p.id}" class="add">🛒 カートに追加</button>
      </article>
    `)
    .join('');

  els.productsGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('button.add');
    if (!btn) return;
    const id = Number(btn.dataset.id);
    addToCart(id);
  }, { once: true });
}

// カートに追加
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const found = cart.find(i => i.id === productId);
  if (found) {
    found.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateMiniCart();
}

// ミニカート更新（件数/合計）
function updateMiniCart() {
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  els.cartCount.textContent = String(count);
  els.miniCartTotal.textContent = total.toLocaleString();
}

// DOM 準備後に開始
document.addEventListener('DOMContentLoaded', init);
