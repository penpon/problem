// 19-mini-product-card: 実用的な商品カードシステムの実装

// 商品データ
const productData = {
    id: 1,
    name: "プレミアム ワイヤレスイヤホン",
    price: 12800,
    originalPrice: 16000,
    stock: 15,
    maxStock: 20,
    likes: 127,
    liked: false,
    inCart: false,
    cartQuantity: 0,
    wishlist: false,
    quantity: 1,
    rating: 4.2,
    reviewCount: 127,
    images: [
        "../shared/images/simple-product.svg",
        "https://via.placeholder.com/400x300/4299e1/white?text=Side+View",
        "https://via.placeholder.com/400x300/48bb78/white?text=In+Box",
        "https://via.placeholder.com/400x300/ed8936/white?text=Features"
    ]
};

// DOM要素の取得
let elements = {};

// DOMが読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    // Bootstrap読み込み確認
    if (typeof bootstrap === 'undefined') {
        console.warn('⚠️ Bootstrap JavaScript が読み込まれていません');
        return;
    }
    
    initializeElements();
    initializeBootstrapComponents();
    initializeEventListeners();
    loadSavedData();
    updateAllDisplays();
    
    console.log('🛍️ 商品カードシステム（Bootstrap版）が読み込まれました！');
    console.log('💡 Bootstrap 5のコンポーネントを活用した実用的なECサイトコンポーネントを体験してください！');
});

// Bootstrap コンポーネントの初期化
function initializeBootstrapComponents() {
    // Toastコンポーネントの初期化
    const toastElement = document.getElementById('notification');
    if (toastElement && !bootstrap.Toast.getInstance(toastElement)) {
        new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 3000
        });
    }
    
    // Collapseコンポーネントの初期化
    const collapseElement = document.getElementById('details-content');
    if (collapseElement && !bootstrap.Collapse.getInstance(collapseElement)) {
        new bootstrap.Collapse(collapseElement, {
            toggle: false
        });
    }
}

// DOM要素を初期化
function initializeElements() {
    elements = {
        // 商品情報
        productTitle: document.getElementById('product-title'),
        currentPrice: document.getElementById('current-price'),
        originalPrice: document.getElementById('original-price'),
        discountAmount: document.getElementById('discount-amount'),
        stockCount: document.getElementById('stock-count'),
        stockFill: document.getElementById('stock-fill'),
        
        // 画像関連
        mainImage: document.getElementById('main-image'),
        thumbnails: document.querySelectorAll('.thumbnail'),
        
        // ボタン
        wishlistBtn: document.getElementById('wishlist-btn'),
        addToCartBtn: document.getElementById('add-to-cart'),
        buyNowBtn: document.getElementById('buy-now'),
        likeBtn: document.getElementById('like-btn'),
        shareBtn: document.getElementById('share-btn'),
        
        // 数量コントロール
        quantityInput: document.getElementById('quantity'),
        qtyMinus: document.getElementById('qty-minus'),
        qtyPlus: document.getElementById('qty-plus'),
        
        // カウンター表示
        likeCount: document.getElementById('like-count'),
        cartCount: document.getElementById('cart-count'),
        reviewCount: document.getElementById('review-count'),
        
        // 詳細表示
        toggleDetails: document.getElementById('toggle-details'),
        detailsContent: document.getElementById('details-content'),
        
        // 通知システム
        notification: document.getElementById('notification'),
        notificationIcon: document.getElementById('notification-icon'),
        notificationMessage: document.getElementById('notification-message'),
        notificationClose: document.getElementById('notification-close')
    };
}

// イベントリスナーを初期化
function initializeEventListeners() {
    // 画像切り替え（data属性を使用）
    elements.thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener('click', () => {
            const imageUrl = thumbnail.getAttribute('data-image');
            if (imageUrl) {
                changeMainImageByUrl(imageUrl, thumbnail);
            }
        });
    });
    
    // お気に入りボタン
    elements.wishlistBtn.addEventListener('click', toggleWishlist);
    
    // いいねボタン
    elements.likeBtn.addEventListener('click', toggleLike);
    
    // シェアボタン
    elements.shareBtn.addEventListener('click', shareProduct);
    
    // カートボタン
    elements.addToCartBtn.addEventListener('click', addToCart);
    
    // 今すぐ購入ボタン
    elements.buyNowBtn.addEventListener('click', buyNow);
    
    // 数量コントロール
    elements.qtyMinus.addEventListener('click', decreaseQuantity);
    elements.qtyPlus.addEventListener('click', increaseQuantity);
    elements.quantityInput.addEventListener('change', updateQuantity);
    elements.quantityInput.addEventListener('input', validateQuantityInput);
    
    // 詳細表示切り替え（Bootstrap対応）
    elements.toggleDetails.addEventListener('click', toggleDetails);
    
    // 通知クローズ（Bootstrap Toast自動処理のため削除）
    // elements.notificationClose.addEventListener('click', hideNotification);
    
    // キーボードサポート
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// === 画像切り替え機能 ===
function changeMainImage(index) {
    if (productData.images[index]) {
        elements.mainImage.src = productData.images[index];
        
        // アクティブなサムネイルを更新
        elements.thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // アニメーション効果
        elements.mainImage.style.opacity = '0.7';
        setTimeout(() => {
            elements.mainImage.style.opacity = '1';
        }, 150);
    }
}

// URL指定での画像切り替え（Bootstrap版用）
function changeMainImageByUrl(imageUrl, activeThumbnail) {
    elements.mainImage.src = imageUrl;
    
    // アクティブなサムネイルを更新
    elements.thumbnails.forEach((thumb) => {
        thumb.classList.remove('active');
        // Bootstrapのimg-thumbnailクラスのborderを調整
        thumb.style.borderColor = '#dee2e6';
    });
    
    activeThumbnail.classList.add('active');
    activeThumbnail.style.borderColor = '#0d6efd';
    
    // アニメーション効果
    elements.mainImage.style.opacity = '0.7';
    setTimeout(() => {
        elements.mainImage.style.opacity = '1';
    }, 150);
}

// === お気に入り機能 ===
function toggleWishlist() {
    productData.wishlist = !productData.wishlist;
    updateWishlistDisplay();
    saveData();
    
    if (productData.wishlist) {
        showNotification('お気に入りに追加されました ❤️', 'success');
        elements.wishlistBtn.style.animation = 'bounce 0.5s ease';
    } else {
        showNotification('お気に入りから削除されました', 'warning');
    }
    
    setTimeout(() => {
        elements.wishlistBtn.style.animation = '';
    }, 500);
}

function updateWishlistDisplay() {
    const heartIcon = elements.wishlistBtn.querySelector('.heart-icon');
    if (productData.wishlist) {
        heartIcon.textContent = '❤️';
        elements.wishlistBtn.classList.add('active');
    } else {
        heartIcon.textContent = '🤍';
        elements.wishlistBtn.classList.remove('active');
    }
}

// === いいね機能 ===
function toggleLike() {
    if (productData.liked) {
        productData.likes--;
        productData.liked = false;
        showNotification('いいねを取り消しました', 'warning');
    } else {
        productData.likes++;
        productData.liked = true;
        showNotification('いいねしました！ 👍', 'success');
        elements.likeBtn.classList.add('liked');
        setTimeout(() => elements.likeBtn.classList.remove('liked'), 500);
    }
    
    updateLikeDisplay();
    saveData();
}

function updateLikeDisplay() {
    elements.likeCount.textContent = productData.likes;
    
    if (productData.liked) {
        elements.likeBtn.classList.add('liked');
        elements.likeBtn.querySelector('.like-icon').textContent = '👍';
    } else {
        elements.likeBtn.classList.remove('liked');
        elements.likeBtn.querySelector('.like-icon').textContent = '👍';
    }
}

// === シェア機能 ===
function shareProduct() {
    if (navigator.share) {
        navigator.share({
            title: productData.name,
            text: `${productData.name} - ¥${productData.price.toLocaleString()}`,
            url: window.location.href
        }).then(() => {
            showNotification('シェアしました！', 'success');
        }).catch((err) => {
            console.log('シェアがキャンセルされました');
        });
    } else {
        // フォールバック: クリップボードにコピー
        const shareText = `${productData.name} - ¥${productData.price.toLocaleString()} ${window.location.href}`;
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('リンクをクリップボードにコピーしました！', 'success');
        }).catch(() => {
            showNotification('シェア機能がサポートされていません', 'error');
        });
    }
}

// === カート機能 ===
function addToCart() {
    if (productData.stock <= 0) {
        showNotification('在庫切れです', 'error');
        return;
    }
    
    if (productData.quantity > productData.stock) {
        showNotification('在庫数を超える数量は選択できません', 'error');
        return;
    }
    
    productData.cartQuantity += productData.quantity;
    productData.stock -= productData.quantity;
    productData.inCart = true;
    
    updateAllDisplays();
    saveData();
    
    showNotification(`${productData.quantity}個をカートに追加しました！`, 'success');
    
    // カートボタンのアニメーション
    elements.addToCartBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        elements.addToCartBtn.style.transform = 'scale(1)';
    }, 150);
    
    // 在庫アラート
    checkStockLevel();
}

function buyNow() {
    if (productData.stock <= 0) {
        showNotification('在庫切れのため購入できません', 'error');
        return;
    }
    
    showNotification('購入手続きページに移動します...', 'success');
    
    // 実際のアプリケーションでは購入ページにリダイレクト
    setTimeout(() => {
        showNotification('デモ版では実際の購入はできません', 'warning');
    }, 2000);
}

// === 数量管理 ===
function increaseQuantity() {
    if (productData.quantity < productData.stock) {
        productData.quantity++;
        updateQuantityDisplay();
        saveData();
    } else {
        showNotification('在庫数を超える数量は選択できません', 'warning');
    }
}

function decreaseQuantity() {
    if (productData.quantity > 1) {
        productData.quantity--;
        updateQuantityDisplay();
        saveData();
    }
}

function updateQuantity() {
    const value = parseInt(elements.quantityInput.value);
    if (isNaN(value) || value < 1) {
        productData.quantity = 1;
    } else if (value > productData.stock) {
        productData.quantity = productData.stock;
        showNotification('在庫数を超える数量は選択できません', 'warning');
    } else {
        productData.quantity = value;
    }
    updateQuantityDisplay();
    saveData();
}

function validateQuantityInput() {
    const value = parseInt(elements.quantityInput.value);
    if (value > productData.stock) {
        elements.quantityInput.style.borderColor = 'var(--error-color)';
    } else {
        elements.quantityInput.style.borderColor = 'var(--border-color)';
    }
}

function updateQuantityDisplay() {
    elements.quantityInput.value = productData.quantity;
    elements.quantityInput.max = productData.stock;
    
    // ボタンの状態更新
    elements.qtyMinus.disabled = productData.quantity <= 1;
    elements.qtyPlus.disabled = productData.quantity >= productData.stock;
    
    // カートボタンの状態更新
    if (productData.stock <= 0) {
        elements.addToCartBtn.disabled = true;
        elements.addToCartBtn.querySelector('.btn-text').textContent = '在庫切れ';
        elements.addToCartBtn.style.opacity = '0.6';
    } else {
        elements.addToCartBtn.disabled = false;
        elements.addToCartBtn.querySelector('.btn-text').textContent = 'カートに追加';
        elements.addToCartBtn.style.opacity = '1';
    }
}

// === 詳細表示切り替え（Bootstrap Collapse対応） ===
function toggleDetails() {
    // Bootstrap Collapseインスタンスを取得または作成
    const collapseElement = elements.detailsContent;
    let collapseInstance = bootstrap.Collapse.getInstance(collapseElement);
    
    if (!collapseInstance) {
        collapseInstance = new bootstrap.Collapse(collapseElement, {
            toggle: false
        });
    }
    
    // Bootstrap CollapseのAPIを使用してトグル
    collapseInstance.toggle();
    
    // イベントリスナーでボタンの状態を更新
    collapseElement.addEventListener('shown.bs.collapse', function () {
        elements.toggleDetails.classList.add('expanded');
        elements.toggleDetails.setAttribute('aria-expanded', 'true');
    });
    
    collapseElement.addEventListener('hidden.bs.collapse', function () {
        elements.toggleDetails.classList.remove('expanded');
        elements.toggleDetails.setAttribute('aria-expanded', 'false');
    });
}

// === 表示更新 ===
function updateAllDisplays() {
    updatePriceDisplay();
    updateStockDisplay();
    updateCartDisplay();
    updateLikeDisplay();
    updateWishlistDisplay();
    updateQuantityDisplay();
}

function updatePriceDisplay() {
    elements.currentPrice.textContent = `¥${productData.price.toLocaleString()}`;
    elements.originalPrice.textContent = `¥${productData.originalPrice.toLocaleString()}`;
    
    const discount = productData.originalPrice - productData.price;
    elements.discountAmount.textContent = `¥${discount.toLocaleString()}お得`;
    
    // セールバッジの更新
    const discountPercent = Math.round((discount / productData.originalPrice) * 100);
    const saleBadge = document.getElementById('sale-badge');
    if (saleBadge) {
        saleBadge.textContent = `${discountPercent}% OFF`;
    }
}

function updateStockDisplay() {
    elements.stockCount.textContent = productData.stock;
    
    // Bootstrap進捗バーの更新
    const stockPercentage = (productData.stock / productData.maxStock) * 100;
    elements.stockFill.style.width = `${stockPercentage}%`;
    elements.stockFill.setAttribute('aria-valuenow', productData.stock);
    
    // Bootstrap進捗バーの色クラスを更新
    elements.stockFill.className = 'progress-bar';
    
    if (stockPercentage <= 20) {
        elements.stockFill.classList.add('bg-danger');
    } else if (stockPercentage <= 50) {
        elements.stockFill.classList.add('bg-warning');
    } else {
        elements.stockFill.classList.add('bg-success');
    }
}

function updateCartDisplay() {
    elements.cartCount.textContent = productData.cartQuantity;
    // Bootstrap badgeの表示制御
    if (productData.cartQuantity > 0) {
        elements.cartCount.style.display = 'inline-block';
        elements.cartCount.classList.remove('d-none');
    } else {
        elements.cartCount.style.display = 'none';
        elements.cartCount.classList.add('d-none');
    }
}

// === 在庫アラート ===
function checkStockLevel() {
    if (productData.stock <= 3 && productData.stock > 0) {
        showNotification('残りわずかです！お早めにどうぞ', 'warning');
    } else if (productData.stock === 0) {
        showNotification('在庫切れになりました', 'error');
    }
}

// === 通知システム（Bootstrap Toast対応） ===
function showNotification(message, type = 'success') {
    const icons = {
        success: '✅',
        warning: '⚠️',
        error: '❌',
        info: 'ℹ️'
    };
    
    // アイコンとメッセージを設定
    elements.notificationIcon.textContent = icons[type] || icons.success;
    elements.notificationMessage.textContent = message;
    
    // Bootstrap Toastの背景色をタイプに応じて変更
    const toastElement = elements.notification;
    toastElement.className = 'toast'; // リセット
    
    // タイプに応じたクラス追加
    if (type === 'error') {
        toastElement.classList.add('border-danger');
        toastElement.querySelector('.toast-header').className = 'toast-header bg-danger text-white';
    } else if (type === 'warning') {
        toastElement.classList.add('border-warning');
        toastElement.querySelector('.toast-header').className = 'toast-header bg-warning text-dark';
    } else if (type === 'success') {
        toastElement.classList.add('border-success');
        toastElement.querySelector('.toast-header').className = 'toast-header bg-success text-white';
    } else {
        toastElement.classList.add('border-info');
        toastElement.querySelector('.toast-header').className = 'toast-header bg-info text-white';
    }
    
    // Bootstrap Toastインスタンスを取得または作成
    let toastInstance = bootstrap.Toast.getInstance(toastElement);
    if (!toastInstance) {
        toastInstance = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 3000
        });
    }
    
    // トーストを表示
    toastInstance.show();
}

function hideNotification() {
    // Bootstrap Toastインスタンスを使用して非表示
    const toastInstance = bootstrap.Toast.getInstance(elements.notification);
    if (toastInstance) {
        toastInstance.hide();
    }
}

// === データの保存と読み込み ===
function saveData() {
    try {
        localStorage.setItem('productCardData', JSON.stringify({
            likes: productData.likes,
            liked: productData.liked,
            cartQuantity: productData.cartQuantity,
            stock: productData.stock,
            wishlist: productData.wishlist,
            quantity: productData.quantity,
            inCart: productData.inCart
        }));
    } catch (error) {
        console.error('データの保存に失敗しました:', error);
    }
}

function loadSavedData() {
    try {
        const saved = localStorage.getItem('productCardData');
        if (saved) {
            const data = JSON.parse(saved);
            Object.assign(productData, data);
        }
    } catch (error) {
        console.error('データの読み込みに失敗しました:', error);
    }
}

// === キーボードショートカット ===
function handleKeyboardShortcuts(e) {
    // Alt + L: いいね
    if (e.altKey && e.key === 'l') {
        e.preventDefault();
        toggleLike();
    }
    
    // Alt + C: カートに追加
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        addToCart();
    }
    
    // Alt + W: お気に入り
    if (e.altKey && e.key === 'w') {
        e.preventDefault();
        toggleWishlist();
    }
    
    // Alt + D: 詳細表示切り替え
    if (e.altKey && e.key === 'd') {
        e.preventDefault();
        toggleDetails();
    }
    
    // Escape: 通知を閉じる
    if (e.key === 'Escape') {
        hideNotification();
    }
}

// === ユーティリティ関数 ===

// 価格フォーマット
function formatPrice(price) {
    return new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY'
    }).format(price);
}

// 割引率計算
function calculateDiscount(originalPrice, salePrice) {
    const discount = ((originalPrice - salePrice) / originalPrice * 100).toFixed(0);
    return `${discount}%OFF`;
}

// ランダムな商品データ生成（デモ用）
function generateRandomProductData() {
    const products = [
        {
            name: "ワイヤレスイヤホン",
            price: 12800,
            originalPrice: 16000
        },
        {
            name: "スマートウォッチ",
            price: 25600,
            originalPrice: 32000
        },
        {
            name: "Bluetoothスピーカー",
            price: 8900,
            originalPrice: 12000
        }
    ];
    
    return products[Math.floor(Math.random() * products.length)];
}

// === グローバル関数（デバッグ用） ===
window.productCard = {
    getData: () => productData,
    setLikes: (count) => {
        productData.likes = count;
        updateLikeDisplay();
        saveData();
    },
    setStock: (count) => {
        productData.stock = Math.max(0, count);
        productData.maxStock = Math.max(productData.maxStock, count);
        updateAllDisplays();
        saveData();
    },
    resetData: () => {
        localStorage.removeItem('productCardData');
        location.reload();
    },
    showDemo: () => {
        console.log('🔥 利用可能な機能:');
        console.log('- いいね機能: Alt + L');
        console.log('- カート追加: Alt + C');  
        console.log('- お気に入り: Alt + W');
        console.log('- 詳細切替: Alt + D');
        console.log('- データリセット: productCard.resetData()');
    }
};

// 初期化完了メッセージ
console.log('🎮 デバッグ用コマンド: productCard.showDemo()');
console.log('💾 データの永続化: LocalStorage使用');
console.log('⌨️ キーボードショートカット対応');