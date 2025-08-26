// ==========================================================================
// 基本ショップ - 初心者向けECサイト JavaScript
// ==========================================================================

// ========== 商品データ（配列とオブジェクトの基礎） ==========
const products = [
  {
    id: 1,
    name: "ベーシックTシャツ",
    category: "服",
    price: 2980,
    image: "https://via.placeholder.com/200x200/667eea/ffffff?text=Tシャツ",
    description: "着心地の良いベーシックなTシャツです。綿100%で肌触りが良く、カジュアルからちょっとしたお出かけまで幅広く使えます。"
  },
  {
    id: 2,
    name: "カジュアルスニーカー",
    category: "靴", 
    price: 4980,
    image: "https://via.placeholder.com/200x200/28a745/ffffff?text=スニーカー",
    description: "歩きやすくて丈夫なスニーカーです。クッション性に優れ、長時間歩いても疲れにくい設計です。"
  },
  {
    id: 3,
    name: "レザーバッグ",
    category: "バッグ",
    price: 8980,
    image: "https://via.placeholder.com/200x200/dc3545/ffffff?text=バッグ",
    description: "上質なレザーを使ったおしゃれなバッグです。収納力があり、ビジネスシーンにもカジュアルにも使えます。"
  },
  {
    id: 4,
    name: "デニムジャケット",
    category: "服",
    price: 6480,
    image: "https://via.placeholder.com/200x200/6f42c1/ffffff?text=ジャケット",
    description: "定番のデニムジャケット。どんなスタイルにも合わせやすく、一着持っていると重宝します。"
  }
];

// ========== グローバル変数（状態管理） ==========
let cart = []; // カート内の商品を管理する配列
let filteredProducts = [...products]; // フィルター後の商品を管理

// ========== DOM要素の取得（getElementById の基礎） ==========
function getElements() {
  return {
    // 商品表示関連
    productsGrid: document.getElementById('productsGrid'),
    
    // カート関連
    cartButton: document.getElementById('cartButton'),
    cartCount: document.getElementById('cartCount'),
    cartSidebar: document.getElementById('cartSidebar'),
    closeCart: document.getElementById('closeCart'),
    cartItems: document.getElementById('cartItems'),
    cartTotal: document.getElementById('cartTotal'),
    cartOverlay: document.getElementById('cartOverlay'),
    checkoutBtn: document.getElementById('checkoutBtn'),
    
    // 検索・フィルター関連
    searchInput: document.getElementById('searchInput'),
    categoryFilter: document.getElementById('categoryFilter'),
    
    // モーダル関連
    productModal: document.getElementById('productModal'),
    closeModal: document.getElementById('closeModal'),
    productDetails: document.getElementById('productDetails')
  };
}

// ========== 商品表示機能 ==========

/**
 * 商品を表示する関数
 * @param {Array} productsToShow - 表示する商品の配列
 */
function displayProducts(productsToShow = products) {
  const elements = getElements();
  elements.productsGrid.innerHTML = '';
  
  // 商品が0件の場合のメッセージ
  if (productsToShow.length === 0) {
    elements.productsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #666;">
        <p>🔍 該当する商品が見つかりませんでした</p>
        <p>検索条件を変更してお試しください</p>
      </div>
    `;
    return;
  }
  
  // 各商品のカードを作成して表示
  productsToShow.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <h3>${product.name}</h3>
      <p class="price">¥${product.price.toLocaleString()}</p>
      <p class="description">${product.description}</p>
      <div class="button-group">
        <button onclick="addToCart(${product.id})" class="add-to-cart-btn">
          🛒 カートに追加
        </button>
        <button onclick="showProductDetail(${product.id})" class="detail-btn">
          👁️ 詳細を見る
        </button>
      </div>
    `;
    
    elements.productsGrid.appendChild(productCard);
  });
}

/**
 * 商品詳細をモーダルで表示する関数
 * @param {number} productId - 商品のID
 */
function showProductDetail(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const elements = getElements();
  
  elements.productDetails.innerHTML = `
    <div class="product-detail">
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p class="price">¥${product.price.toLocaleString()}</p>
      <p class="description">${product.description}</p>
      <p><strong>カテゴリ:</strong> ${product.category}</p>
      <button onclick="addToCart(${product.id}); closeProductModal();" class="add-to-cart-btn">
        🛒 カートに追加
      </button>
    </div>
  `;
  
  elements.productModal.classList.remove('hidden');
}

/**
 * 商品詳細モーダルを閉じる関数
 */
function closeProductModal() {
  const elements = getElements();
  elements.productModal.classList.add('hidden');
}

// ========== カート機能 ==========

/**
 * カートに商品を追加する関数
 * @param {number} productId - 商品のID
 */
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    // 既にカートにある商品の数量を増やす
    existingItem.quantity += 1;
  } else {
    // 新しい商品をカートに追加
    cart.push({
      ...product, // スプレッド演算子で商品の全プロパティをコピー
      quantity: 1
    });
  }
  
  // カート表示を更新
  updateCartDisplay();
  updateCartCount();
  
  // カートに追加した際の視覚的フィードバック
  showAddToCartFeedback(product.name);
}

/**
 * カートから商品を削除する関数
 * @param {number} productId - 商品のID
 */
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartDisplay();
  updateCartCount();
}

/**
 * カート内商品の数量を変更する関数
 * @param {number} productId - 商品のID
 * @param {number} change - 数量の変更（+1 または -1）
 */
function changeQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;
  
  item.quantity += change;
  
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    updateCartDisplay();
    updateCartCount();
  }
}

/**
 * カートの表示を更新する関数
 */
function updateCartDisplay() {
  const elements = getElements();
  
  if (cart.length === 0) {
    elements.cartItems.innerHTML = '<p class="empty-cart-message">カートは空です</p>';
    return;
  }
  
  elements.cartItems.innerHTML = '';
  
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    cartItem.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p class="price">¥${item.price.toLocaleString()}</p>
        <div class="quantity-controls">
          <button onclick="changeQuantity(${item.id}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${item.id}, 1)">＋</button>
        </div>
        <button onclick="removeFromCart(${item.id})" class="remove-btn">削除</button>
      </div>
    `;
    
    elements.cartItems.appendChild(cartItem);
  });
  
  updateCartTotal();
}

/**
 * カート内商品数のバッジを更新する関数
 */
function updateCartCount() {
  const elements = getElements();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  elements.cartCount.textContent = totalItems;
}

/**
 * カート合計金額を更新する関数
 */
function updateCartTotal() {
  const elements = getElements();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  elements.cartTotal.textContent = total.toLocaleString();
}

/**
 * カートサイドバーを開く・閉じる関数
 */
function toggleCart() {
  const elements = getElements();
  const isHidden = elements.cartSidebar.classList.contains('hidden');
  
  if (isHidden) {
    elements.cartSidebar.classList.remove('hidden');
    elements.cartOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // スクロール無効化
  } else {
    elements.cartSidebar.classList.add('hidden');
    elements.cartOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto'; // スクロール有効化
  }
}

/**
 * カートを閉じる関数
 */
function closeCart() {
  const elements = getElements();
  elements.cartSidebar.classList.add('hidden');
  elements.cartOverlay.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

/**
 * カートに商品を追加した際のフィードバック表示
 * @param {string} productName - 商品名
 */
function showAddToCartFeedback(productName) {
  // 簡単な通知を表示（初心者向けのシンプルな実装）
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #28a745;
    color: white;
    padding: 1rem;
    border-radius: 5px;
    z-index: 2000;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  `;
  notification.textContent = `"${productName}" をカートに追加しました`;
  
  document.body.appendChild(notification);
  
  // 3秒後に通知を削除
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);
}

// ========== 検索・フィルター機能 ==========

/**
 * 商品を検索・フィルターする関数
 */
function searchProducts() {
  const elements = getElements();
  const searchTerm = elements.searchInput.value.toLowerCase().trim();
  const category = elements.categoryFilter.value;
  
  // 元の商品配列からフィルタリング
  let filtered = [...products];
  
  // 検索キーワードでフィルター
  if (searchTerm) {
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }
  
  // カテゴリでフィルター
  if (category) {
    filtered = filtered.filter(product => product.category === category);
  }
  
  // フィルター結果を保存
  filteredProducts = filtered;
  
  // 商品表示を更新
  displayProducts(filteredProducts);
}

/**
 * 検索・フィルターをリセットする関数
 */
function resetFilters() {
  const elements = getElements();
  elements.searchInput.value = '';
  elements.categoryFilter.value = '';
  filteredProducts = [...products];
  displayProducts(filteredProducts);
}

// ========== 初期化とイベントリスナー設定 ==========

/**
 * アプリケーションの初期化関数
 */
function initializeApp() {
  // 初期表示
  displayProducts();
  updateCartCount();
  
  // イベントリスナーの設定
  setupEventListeners();
  
  console.log('🛍️ 基本ショップアプリが初期化されました');
}

/**
 * イベントリスナーを設定する関数
 */
function setupEventListeners() {
  const elements = getElements();
  
  // カート関連のイベント
  elements.cartButton.addEventListener('click', toggleCart);
  elements.closeCart.addEventListener('click', closeCart);
  elements.cartOverlay.addEventListener('click', closeCart);
  
  // 検索・フィルター関連のイベント
  elements.searchInput.addEventListener('input', searchProducts);
  elements.categoryFilter.addEventListener('change', searchProducts);
  
  // モーダル関連のイベント
  elements.closeModal.addEventListener('click', closeProductModal);
  
  // モーダル外をクリックしたときに閉じる
  elements.productModal.addEventListener('click', function(e) {
    if (e.target === elements.productModal) {
      closeProductModal();
    }
  });
  
  // チェックアウトボタン（簡単な実装）
  elements.checkoutBtn.addEventListener('click', function() {
    if (cart.length === 0) {
      alert('カートに商品がありません');
      return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (confirm(`${itemCount}点の商品、合計¥${total.toLocaleString()}を購入しますか？`)) {
      alert('ご購入ありがとうございました！\n（これは練習用のECサイトです）');
      cart = []; // カートを空にする
      updateCartDisplay();
      updateCartCount();
      closeCart();
    }
  });
  
  // Escapeキーでモーダルとカートを閉じる
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeProductModal();
      closeCart();
    }
  });
}

// ========== DOMContentLoadedイベント ==========
document.addEventListener('DOMContentLoaded', function() {
  console.log('📄 DOMが読み込まれました');
  initializeApp();
});

// ========== ウィンドウサイズ変更時の処理 ==========
window.addEventListener('resize', function() {
  // モバイルでカートを開いている時にウィンドウサイズが変わったら閉じる
  if (window.innerWidth > 768) {
    const elements = getElements();
    elements.cartSidebar.classList.add('hidden');
    elements.cartOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
});

// ========== デバッグ用関数（開発時に便利） ==========
function debugInfo() {
  console.log('=== デバッグ情報 ===');
  console.log('商品数:', products.length);
  console.log('カート内商品数:', cart.length);
  console.log('カート詳細:', cart);
  console.log('フィルター後商品数:', filteredProducts.length);
}