// 20-two-product-gallery: 学習の集大成 - 2商品ギャラリーシステム

// 商品データベース
const productsData = [
    {
        id: 1,
        name: "プレミアム ワイヤレスイヤホン",
        category: "audio",
        price: 12800,
        originalPrice: 16000,
        image: "../shared/images/simple-product.svg",
        rating: 4.2,
        reviewCount: 127,
        stock: 15,
        features: ["24時間バッテリー", "ハイレゾ対応", "防水IPX7", "ノイズキャンセリング"],
        description: "最新の音響技術を搭載した高品質ワイヤレスイヤホン",
        new: false,
        sale: true,
        likes: 127,
        liked: false
    },
    {
        id: 2,
        name: "スマートフォン スタンド",
        category: "accessories",
        price: 2980,
        originalPrice: 3980,
        image: "https://via.placeholder.com/300x200/48bb78/white?text=Phone+Stand",
        rating: 4.5,
        reviewCount: 89,
        stock: 23,
        features: ["角度調整", "滑り止め", "折りたたみ式", "軽量設計"],
        description: "機能性とデザイン性を兼ね備えた多機能スマートフォンスタンド",
        new: true,
        sale: true,
        likes: 89,
        liked: false
    }
];

// アプリケーション状態管理
const appState = {
    products: [...productsData],
    filteredProducts: [...productsData],
    cart: [],
    favorites: [],
    compareList: [],
    filters: {
        search: '',
        category: 'all',
        sort: 'default'
    },
    ui: {
        cartOpen: false,
        compareOpen: false,
        loading: false
    }
};

// DOM要素の取得
let elements = {};

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 ステップ20: 2商品ギャラリーシステム起動中...');
    
    initializeElements();
    initializeEventListeners();
    loadSavedData();
    renderProducts();
    updateStatistics();
    
    // 初期化完了メッセージ
    showNotification('🎉 20ステップ学習の集大成へようこそ！', 'success');
    
    console.log('✨ システム初期化完了');
    console.log('📊 商品データ:', appState.products);
    console.log('🛒 カート状態:', appState.cart);
    console.log('💡 使い方: 検索、フィルター、カート機能をお試しください');
});

// DOM要素を初期化
function initializeElements() {
    elements = {
        // 検索・フィルター
        searchInput: document.getElementById('search-input'),
        searchBtn: document.getElementById('search-btn'),
        categoryFilter: document.getElementById('category-filter'),
        sortFilter: document.getElementById('sort-filter'),
        resetBtn: document.getElementById('reset-filters'),
        
        // 統計表示
        productsCount: document.getElementById('products-count'),
        cartTotal: document.getElementById('cart-total'),
        favoritesCount: document.getElementById('favorites-count'),
        
        // 商品グリッド
        productsGrid: document.getElementById('products-grid'),
        
        // カート
        cartToggle: document.getElementById('cart-toggle'),
        cartBadge: document.getElementById('cart-badge'),
        cartSidebar: document.getElementById('cart-sidebar'),
        cartClose: document.getElementById('cart-close'),
        cartContent: document.getElementById('cart-content'),
        cartSubtotal: document.getElementById('cart-subtotal'),
        cartShipping: document.getElementById('cart-shipping'),
        cartTotalPrice: document.getElementById('cart-total-price'),
        clearCart: document.getElementById('clear-cart'),
        checkout: document.getElementById('checkout'),
        
        // 比較パネル
        comparePanel: document.getElementById('compare-panel'),
        compareClose: document.getElementById('compare-close'),
        compareContent: document.getElementById('compare-content'),
        
        // 通知システム
        notificationSystem: document.getElementById('notification-system')
    };
}

// イベントリスナーを初期化
function initializeEventListeners() {
    // 検索機能
    elements.searchInput.addEventListener('input', handleSearch);
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleSearch();
    });
    
    // フィルター機能
    elements.categoryFilter.addEventListener('change', handleCategoryFilter);
    elements.sortFilter.addEventListener('change', handleSort);
    elements.resetBtn.addEventListener('click', resetFilters);
    
    // カート機能
    elements.cartToggle.addEventListener('click', toggleCart);
    elements.cartClose.addEventListener('click', closeCart);
    elements.clearCart.addEventListener('click', clearCart);
    elements.checkout.addEventListener('click', proceedToCheckout);
    
    // 比較機能
    elements.compareClose.addEventListener('click', closeCompare);
    
    // キーボードショートカット
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // クリック外の領域でサイドバーを閉じる
    document.addEventListener('click', handleOutsideClick);
}

// === 商品表示とレンダリング ===

function renderProducts() {
    const container = elements.productsGrid;
    
    if (appState.filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <h3>🔍 商品が見つかりません</h3>
                <p>検索条件を変更してお試しください</p>
                <button onclick="resetFilters()" class="btn btn-primary">フィルターをリセット</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = appState.filteredProducts.map(product => createProductCard(product)).join('');
    
    // カードのイベントリスナーを追加
    addProductEventListeners();
}

function createProductCard(product) {
    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const stockStatus = getStockStatus(product.stock);
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                
                <div class="product-badges">
                    ${product.sale ? `<span class="badge sale">${discountPercent}% OFF</span>` : ''}
                    ${product.new ? '<span class="badge new">NEW</span>' : ''}
                </div>
                
                <div class="product-actions">
                    <button class="action-btn like-btn ${product.liked ? 'active' : ''}" 
                            data-product-id="${product.id}" 
                            aria-label="いいね">
                        ${product.liked ? '❤️' : '🤍'}
                    </button>
                    <button class="action-btn compare-btn" 
                            data-product-id="${product.id}" 
                            aria-label="比較に追加">
                        📊
                    </button>
                </div>
            </div>
            
            <div class="product-info">
                <div class="product-header">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-category">${getCategoryName(product.category)}</p>
                </div>
                
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-text">${product.rating} (${product.reviewCount})</span>
                </div>
                
                <div class="product-price">
                    <span class="current-price">¥${product.price.toLocaleString()}</span>
                    ${product.originalPrice > product.price ? 
                        `<span class="original-price">¥${product.originalPrice.toLocaleString()}</span>
                         <span class="discount-badge">${discountPercent}%OFF</span>` : ''
                    }
                </div>
                
                <div class="product-features">
                    ${product.features.slice(0, 3).map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
                
                <div class="product-stock">
                    <div class="stock-info">
                        <span class="stock-indicator ${stockStatus.class}"></span>
                        <span class="stock-text">${stockStatus.text}</span>
                    </div>
                </div>
                
                <div class="product-buttons">
                    <button class="btn btn-primary add-to-cart-btn" 
                            data-product-id="${product.id}"
                            ${product.stock === 0 ? 'disabled' : ''}>
                        <span>🛒</span>
                        ${product.stock === 0 ? '在庫切れ' : 'カートに追加'}
                    </button>
                    <button class="btn btn-secondary quick-view-btn" 
                            data-product-id="${product.id}">
                        👁️ 詳細
                    </button>
                </div>
            </div>
        </div>
    `;
}

function addProductEventListeners() {
    // いいねボタン
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.productId);
            toggleLike(productId);
        });
    });
    
    // カートに追加ボタン
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.productId);
            addToCart(productId);
        });
    });
    
    // 比較ボタン
    document.querySelectorAll('.compare-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.productId);
            toggleCompare(productId);
        });
    });
    
    // 詳細ボタン
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.productId);
            showProductDetails(productId);
        });
    });
}

// === 検索・フィルター機能 ===

function handleSearch() {
    const query = elements.searchInput.value.trim().toLowerCase();
    appState.filters.search = query;
    applyFilters();
    
    if (query) {
        showNotification(`"${query}" で検索しました`, 'info');
    }
}

function handleCategoryFilter() {
    appState.filters.category = elements.categoryFilter.value;
    applyFilters();
    showNotification('カテゴリフィルターを適用しました', 'info');
}

function handleSort() {
    appState.filters.sort = elements.sortFilter.value;
    applyFilters();
    showNotification('並び順を変更しました', 'info');
}

function applyFilters() {
    let filtered = [...appState.products];
    
    // 検索フィルター
    if (appState.filters.search) {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(appState.filters.search) ||
            product.description.toLowerCase().includes(appState.filters.search) ||
            product.features.some(feature => feature.toLowerCase().includes(appState.filters.search))
        );
    }
    
    // カテゴリフィルター
    if (appState.filters.category !== 'all') {
        filtered = filtered.filter(product => product.category === appState.filters.category);
    }
    
    // ソート
    switch (appState.filters.sort) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'likes-desc':
            filtered.sort((a, b) => b.likes - a.likes);
            break;
        case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // デフォルトはID順
            filtered.sort((a, b) => a.id - b.id);
    }
    
    appState.filteredProducts = filtered;
    renderProducts();
    updateStatistics();
}

function resetFilters() {
    appState.filters = { search: '', category: 'all', sort: 'default' };
    elements.searchInput.value = '';
    elements.categoryFilter.value = 'all';
    elements.sortFilter.value = 'default';
    applyFilters();
    showNotification('フィルターをリセットしました', 'success');
}

// === いいね機能 ===

function toggleLike(productId) {
    const product = appState.products.find(p => p.id === productId);
    if (!product) return;
    
    if (product.liked) {
        product.likes--;
        product.liked = false;
        showNotification(`${product.name}のいいねを取り消しました`, 'warning');
    } else {
        product.likes++;
        product.liked = true;
        showNotification(`${product.name}をいいねしました！`, 'success');
    }
    
    updateFavorites();
    renderProducts();
    saveData();
}

function updateFavorites() {
    appState.favorites = appState.products.filter(p => p.liked);
}

// === カート機能 ===

function addToCart(productId, quantity = 1) {
    const product = appState.products.find(p => p.id === productId);
    if (!product || product.stock === 0) {
        showNotification('商品が在庫切れです', 'error');
        return;
    }
    
    const existingItem = appState.cart.find(item => item.id === productId);
    
    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity <= product.stock) {
            existingItem.quantity = newQuantity;
            showNotification(`${product.name}を追加しました（${newQuantity}個）`, 'success');
        } else {
            showNotification('在庫数を超える数量は追加できません', 'warning');
            return;
        }
    } else {
        appState.cart.push({
            ...product,
            quantity: quantity,
            addedAt: Date.now()
        });
        showNotification(`${product.name}をカートに追加しました`, 'success');
    }
    
    updateCartDisplay();
    updateStatistics();
    saveData();
}

function removeFromCart(productId) {
    const index = appState.cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        const item = appState.cart[index];
        appState.cart.splice(index, 1);
        showNotification(`${item.name}をカートから削除しました`, 'warning');
        updateCartDisplay();
        updateStatistics();
        saveData();
    }
}

function updateCartQuantity(productId, newQuantity) {
    const item = appState.cart.find(item => item.id === productId);
    if (!item) return;
    
    const product = appState.products.find(p => p.id === productId);
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    if (newQuantity <= product.stock) {
        item.quantity = newQuantity;
        updateCartDisplay();
        updateStatistics();
        saveData();
    } else {
        showNotification('在庫数を超える数量は設定できません', 'warning');
    }
}

function updateCartDisplay() {
    const cartCount = appState.cart.reduce((total, item) => total + item.quantity, 0);
    
    // カートバッジ更新
    elements.cartBadge.textContent = cartCount;
    elements.cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
    
    // カート内容更新
    if (appState.cart.length === 0) {
        elements.cartContent.innerHTML = `
            <div class="cart-empty">
                <p>カートは空です</p>
                <p>商品を追加してみましょう！</p>
            </div>
        `;
        elements.checkout.disabled = true;
    } else {
        elements.cartContent.innerHTML = appState.cart.map(item => createCartItem(item)).join('');
        elements.checkout.disabled = false;
        addCartEventListeners();
    }
    
    // 価格計算
    updateCartPricing();
}

function createCartItem(item) {
    return `
        <div class="cart-item" data-product-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">¥${item.price.toLocaleString()}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn decrease" data-product-id="${item.id}">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn increase" data-product-id="${item.id}">+</button>
                    <button class="quantity-btn remove" data-product-id="${item.id}">🗑️</button>
                </div>
            </div>
        </div>
    `;
}

function addCartEventListeners() {
    // 数量調整ボタン
    document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            const item = appState.cart.find(item => item.id === productId);
            updateCartQuantity(productId, item.quantity + 1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            const item = appState.cart.find(item => item.id === productId);
            updateCartQuantity(productId, item.quantity - 1);
        });
    });
    
    // 削除ボタン
    document.querySelectorAll('.quantity-btn.remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            removeFromCart(productId);
        });
    });
}

function updateCartPricing() {
    const subtotal = appState.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 5000 ? 0 : 500;
    const total = subtotal + shipping;
    
    elements.cartSubtotal.textContent = `¥${subtotal.toLocaleString()}`;
    elements.cartShipping.textContent = shipping === 0 ? '無料' : `¥${shipping.toLocaleString()}`;
    elements.cartTotalPrice.textContent = `¥${total.toLocaleString()}`;
}

function toggleCart() {
    elements.cartSidebar.classList.toggle('open');
    appState.ui.cartOpen = !appState.ui.cartOpen;
}

function closeCart() {
    elements.cartSidebar.classList.remove('open');
    appState.ui.cartOpen = false;
}

function clearCart() {
    if (appState.cart.length === 0) return;
    
    if (confirm('カートを空にしてもよろしいですか？')) {
        appState.cart = [];
        updateCartDisplay();
        updateStatistics();
        saveData();
        showNotification('カートを空にしました', 'info');
    }
}

function proceedToCheckout() {
    if (appState.cart.length === 0) return;
    
    const total = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`合計¥${total.toLocaleString()}のお会計に進みます`, 'success');
    
    // デモ版では実際の決済は行わない
    setTimeout(() => {
        showNotification('デモ版では実際の購入はできません', 'info');
    }, 2000);
}

// === 比較機能 ===

function toggleCompare(productId) {
    const index = appState.compareList.findIndex(id => id === productId);
    const product = appState.products.find(p => p.id === productId);
    
    if (index !== -1) {
        appState.compareList.splice(index, 1);
        showNotification(`${product.name}を比較リストから削除しました`, 'warning');
    } else {
        if (appState.compareList.length >= 3) {
            showNotification('比較は最大3商品まで可能です', 'warning');
            return;
        }
        appState.compareList.push(productId);
        showNotification(`${product.name}を比較リストに追加しました`, 'success');
    }
    
    updateCompareDisplay();
    saveData();
}

function updateCompareDisplay() {
    if (appState.compareList.length === 0) {
        elements.comparePanel.classList.remove('open');
        return;
    }
    
    elements.comparePanel.classList.add('open');
    
    const compareProducts = appState.compareList.map(id => 
        appState.products.find(p => p.id === id)
    );
    
    elements.compareContent.innerHTML = `
        <h4>選択中の商品 (${compareProducts.length}/3)</h4>
        ${compareProducts.map(product => `
            <div class="compare-item">
                <span>${product.name}</span>
                <span class="compare-price">¥${product.price.toLocaleString()}</span>
                <button onclick="toggleCompare(${product.id})" class="remove-compare">×</button>
            </div>
        `).join('')}
        ${compareProducts.length >= 2 ? '<button onclick="showComparison()" class="btn btn-primary">比較表示</button>' : ''}
    `;
}

function closeCompare() {
    elements.comparePanel.classList.remove('open');
}

function showComparison() {
    const compareProducts = appState.compareList.map(id => 
        appState.products.find(p => p.id === id)
    );
    
    const comparisonHTML = `
        <div class="comparison-table">
            <h3>商品比較</h3>
            <table>
                <tr>
                    <th>商品名</th>
                    ${compareProducts.map(p => `<td>${p.name}</td>`).join('')}
                </tr>
                <tr>
                    <th>価格</th>
                    ${compareProducts.map(p => `<td>¥${p.price.toLocaleString()}</td>`).join('')}
                </tr>
                <tr>
                    <th>評価</th>
                    ${compareProducts.map(p => `<td>${p.rating} (${p.reviewCount})</td>`).join('')}
                </tr>
                <tr>
                    <th>在庫</th>
                    ${compareProducts.map(p => `<td>${p.stock}個</td>`).join('')}
                </tr>
            </table>
        </div>
    `;
    
    // 比較結果を新しいウィンドウまたはモーダルで表示
    const comparisonWindow = window.open('', 'comparison', 'width=800,height=600');
    comparisonWindow.document.write(`
        <html>
            <head><title>商品比較</title></head>
            <body style="font-family: Arial; padding: 20px;">
                ${comparisonHTML}
            </body>
        </html>
    `);
}

// === 商品詳細表示 ===

function showProductDetails(productId) {
    const product = appState.products.find(p => p.id === productId);
    if (!product) return;
    
    showNotification(`${product.name}の詳細を表示します`, 'info');
    
    // 実際のアプリケーションでは詳細ページへ遷移
    console.log('商品詳細:', product);
}

// === 統計更新 ===

function updateStatistics() {
    elements.productsCount.textContent = appState.filteredProducts.length;
    
    const cartItemCount = appState.cart.reduce((total, item) => total + item.quantity, 0);
    elements.cartTotal.textContent = `${cartItemCount}個`;
    
    elements.favoritesCount.textContent = `${appState.favorites.length}個`;
}

// === 通知システム ===

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <span class="notification-icon">${icons[type]}</span>
        <span class="notification-message">${message}</span>
    `;
    
    elements.notificationSystem.appendChild(notification);
    
    // アニメーション表示
    setTimeout(() => notification.classList.add('show'), 100);
    
    // 自動削除
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// === ユーティリティ関数 ===

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += '<span class="star filled">★</span>';
        } else if (i === fullStars && hasHalfStar) {
            stars += '<span class="star filled">☆</span>';
        } else {
            stars += '<span class="star">★</span>';
        }
    }
    
    return stars;
}

function getCategoryName(category) {
    const categories = {
        'audio': 'オーディオ',
        'electronics': '家電',
        'accessories': 'アクセサリー'
    };
    return categories[category] || category;
}

function getStockStatus(stock) {
    if (stock === 0) {
        return { class: 'out', text: '在庫切れ' };
    } else if (stock <= 5) {
        return { class: 'low', text: `残り${stock}個` };
    } else {
        return { class: '', text: `在庫あり（${stock}個）` };
    }
}

// === キーボードショートカット ===

function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + K: 検索フォーカス
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        elements.searchInput.focus();
        showNotification('検索バーにフォーカスしました', 'info');
    }
    
    // Escape: サイドバーを閉じる
    if (e.key === 'Escape') {
        if (appState.ui.cartOpen) {
            closeCart();
        }
        if (elements.comparePanel.classList.contains('open')) {
            closeCompare();
        }
    }
    
    // Ctrl/Cmd + Shift + C: カート開閉
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        toggleCart();
    }
}

// === 外部クリック処理 ===

function handleOutsideClick(e) {
    // カートサイドバー外をクリックした場合
    if (appState.ui.cartOpen && 
        !elements.cartSidebar.contains(e.target) && 
        !elements.cartToggle.contains(e.target)) {
        closeCart();
    }
}

// === データの保存と読み込み ===

function saveData() {
    try {
        const dataToSave = {
            products: appState.products.map(p => ({
                id: p.id,
                likes: p.likes,
                liked: p.liked,
                stock: p.stock
            })),
            cart: appState.cart,
            favorites: appState.favorites,
            compareList: appState.compareList,
            filters: appState.filters
        };
        
        localStorage.setItem('productGalleryData', JSON.stringify(dataToSave));
        console.log('💾 データを保存しました');
    } catch (error) {
        console.error('データ保存エラー:', error);
        showNotification('データの保存に失敗しました', 'error');
    }
}

function loadSavedData() {
    try {
        const saved = localStorage.getItem('productGalleryData');
        if (!saved) return;
        
        const data = JSON.parse(saved);
        
        // 商品データの更新
        if (data.products) {
            data.products.forEach(savedProduct => {
                const product = appState.products.find(p => p.id === savedProduct.id);
                if (product) {
                    product.likes = savedProduct.likes;
                    product.liked = savedProduct.liked;
                    product.stock = savedProduct.stock;
                }
            });
        }
        
        // カートデータの復元
        if (data.cart) {
            appState.cart = data.cart;
        }
        
        // お気に入りデータの復元
        if (data.favorites) {
            appState.favorites = data.favorites;
        }
        
        // 比較リストの復元
        if (data.compareList) {
            appState.compareList = data.compareList;
        }
        
        // フィルター状態の復元
        if (data.filters) {
            appState.filters = { ...appState.filters, ...data.filters };
            elements.searchInput.value = appState.filters.search || '';
            elements.categoryFilter.value = appState.filters.category || 'all';
            elements.sortFilter.value = appState.filters.sort || 'default';
        }
        
        updateFavorites();
        updateCartDisplay();
        updateCompareDisplay();
        applyFilters();
        
        console.log('📂 保存データを読み込みました');
    } catch (error) {
        console.error('データ読み込みエラー:', error);
        showNotification('データの読み込みに失敗しました', 'warning');
    }
}

// === グローバル関数（デバッグ・管理用） ===

window.productGallery = {
    // データ確認
    getState: () => appState,
    getProducts: () => appState.products,
    getCart: () => appState.cart,
    
    // データ操作
    addProduct: (productData) => {
        const newId = Math.max(...appState.products.map(p => p.id)) + 1;
        const newProduct = { ...productData, id: newId };
        appState.products.push(newProduct);
        applyFilters();
        saveData();
    },
    
    setLikes: (productId, likes) => {
        const product = appState.products.find(p => p.id === productId);
        if (product) {
            product.likes = likes;
            renderProducts();
            saveData();
        }
    },
    
    setStock: (productId, stock) => {
        const product = appState.products.find(p => p.id === productId);
        if (product) {
            product.stock = Math.max(0, stock);
            renderProducts();
            saveData();
        }
    },
    
    // システム管理
    resetData: () => {
        if (confirm('すべてのデータをリセットしますか？')) {
            localStorage.removeItem('productGalleryData');
            location.reload();
        }
    },
    
    exportData: () => {
        const data = localStorage.getItem('productGalleryData');
        if (data) {
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'product-gallery-data.json';
            a.click();
            URL.revokeObjectURL(url);
        }
    },
    
    // ヘルプ
    showHelp: () => {
        console.log(`
🌟 2商品ギャラリーシステム - 操作ガイド

📖 基本操作:
  • 検索: 上部の検索バーで商品名や特徴を検索
  • フィルター: カテゴリ別の絞り込み
  • ソート: 価格順、人気順での並び替え
  • いいね: ❤️ボタンでお気に入り管理
  • カート: 🛒ボタンで商品をカートに追加

⌨️ キーボードショートカット:
  • Ctrl/Cmd + K: 検索フォーカス
  • Ctrl/Cmd + Shift + C: カート開閉
  • Escape: サイドバーを閉じる

🛠️ 開発者向け:
  • productGallery.getState(): 現在の状態確認
  • productGallery.resetData(): データリセット
  • productGallery.exportData(): データエクスポート
  
🎓 学習ポイント:
  • HTML5セマンティック要素の活用
  • CSS3アニメーション・レスポンシブデザイン
  • ES6+モダンJavaScript（配列操作、オブジェクト分割代入等）
  • LocalStorage での永続化
  • ユーザビリティを考慮したUI/UX設計
        `);
    }
};

// 初期化完了とヘルプ情報
console.log(`
🎊 20ステップ学習完了おめでとうございます！ 🎊

✨ あなたが習得したスキル:
  • HTML5: セマンティック構造設計
  • CSS3: モダンデザイン・レスポンシブ
  • JavaScript: DOM操作・状態管理・配列処理
  • Web標準: アクセシビリティ・ユーザビリティ

🚀 次のステップ:
  • React/Vue.js等のフレームワーク
  • Node.js等のバックエンド技術
  • TypeScript等の型安全な開発
  • Git/GitHub等のバージョン管理

💡 操作方法: productGallery.showHelp()
📊 現在の状態: productGallery.getState()
🔄 データリセット: productGallery.resetData()
`);

// 学習完了の祝福メッセージ
setTimeout(() => {
    showNotification('🎓 Web開発の基礎を完全マスター！おめでとうございます！', 'success');
}, 1000);