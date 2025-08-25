/* ===== NOTIFICATION SYSTEM - 通知システム ===== */

// 通知システム（新機能）
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    // 3秒後に自動で非表示
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// アニメーションログ記録（新機能）
function logAnimation(action) {
    const timestamp = new Date().toLocaleTimeString();
    const animationDisplay = document.getElementById('animationDisplay');
    animationDisplay.textContent = `${timestamp}: ${action}`;
    console.log(`アニメーション: ${action}`);
}

/* ===== IMAGE GALLERY SYSTEM - 画像切替・ギャラリー機能 ===== */

// 画像切替システム（新機能 - メイン学習ポイント）
function changeImage(imageNumber) {
    const images = ['👕', '👔', '🧥']; // 3種類の商品画像
    const imageClasses = ['image-1', 'image-2', 'image-3'];
    const productImage = document.getElementById('productImage');
    const imageButtons = document.querySelectorAll('.image-btn');
    
    // 現在の画像クラスを削除
    productImage.className = 'product-image';
    
    // 新しい画像を設定（アニメーション付き）
    setTimeout(() => {
        productImage.className = `product-image ${imageClasses[imageNumber - 1]}`;
        productImage.textContent = images[imageNumber - 1];
        productData.currentImage = imageNumber;
        productData.imageChanges += 1;
        
        // ボタンのactive状態を更新
        imageButtons.forEach((btn, index) => {
            btn.classList.toggle('active', index + 1 === imageNumber);
        });
        
        logAnimation(`画像を ${imageNumber} 番に切替`);
        showNotification(`商品画像を変更しました`, 'info');
        updateDisplay();
        saveData();
    }, 100);
}

// 画像切替ボタンのイベント設定関数
function setupImageGallery() {
    const imageButtons = document.querySelectorAll('.image-btn');
    imageButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => changeImage(index + 1));
    });
}

/* ===== INTERACTIONS SYSTEM - その他インタラクション ===== */

// === 19.4 メイン学習テーマ: アニメーションとUI制御 ===

// 1. 商品データオブジェクト（19.3から拡張）
let productData = {
    name: "プレミアム Tシャツ",
    price: 2980,
    likes: 0,
    isLiked: false,
    showDetails: false,
    inCart: false,
    detailViews: 0,
    cartActions: 0,
    imageChanges: 0,         // 画像切替回数（新規追加）
    currentImage: 1,         // 現在の画像番号（新規追加）
    lastUpdated: new Date().toISOString()
};

let actionHistory = [];

// 2. データ保存・読み込み（19.3から継続）
function saveData() {
    try {
        productData.lastUpdated = new Date().toISOString();
        localStorage.setItem('productCardData_v4', JSON.stringify(productData));
        localStorage.setItem('productCardHistory_v4', JSON.stringify(actionHistory));
    } catch (error) {
        showNotification('データ保存に失敗しました', 'error');
    }
}

function loadData() {
    try {
        const savedData = localStorage.getItem('productCardData_v4');
        if (savedData) {
            productData = JSON.parse(savedData);
            showNotification('保存データを復元しました', 'success');
        }

        const savedHistory = localStorage.getItem('productCardHistory_v4');
        if (savedHistory) {
            actionHistory = JSON.parse(savedHistory);
        }
    } catch (error) {
        showNotification('データ読み込みエラー', 'error');
        resetToDefaults();
    }
}

// 3. 履歴記録
function addToHistory(action) {
    const timestamp = new Date().toLocaleTimeString();
    actionHistory.unshift(`${timestamp}: ${action}`);
    if (actionHistory.length > 5) {
        actionHistory = actionHistory.slice(0, 5);
    }
}

// 4. 表示更新
function updateDisplay() {
    const likeCount = document.getElementById('likeCount');
    const likeBtn = document.getElementById('likeBtn');
    const detailsBtn = document.getElementById('detailsBtn');
    const cartBtn = document.getElementById('cartBtn');
    const productDetails = document.getElementById('productDetails');
    const totalLikes = document.getElementById('totalLikes');
    const totalViews = document.getElementById('totalViews');
    const totalCart = document.getElementById('totalCart');
    const totalImageChanges = document.getElementById('totalImageChanges');
    const objectDisplay = document.getElementById('objectDisplay');
    
    likeCount.textContent = productData.likes;
    
    if (productData.isLiked) {
        likeBtn.classList.add('liked');
    } else {
        likeBtn.classList.remove('liked');
    }
    
    if (productData.showDetails) {
        productDetails.classList.add('show');
        detailsBtn.innerHTML = '<span>📝 閉じる</span>';
    } else {
        productDetails.classList.remove('show');
        detailsBtn.innerHTML = '<span>📝 詳細</span>';
    }
    
    if (productData.inCart) {
        cartBtn.classList.add('in-cart');
        cartBtn.innerHTML = '<span>🛒 削除</span>';
    } else {
        cartBtn.classList.remove('in-cart');
        cartBtn.innerHTML = '<span>🛒 カート</span>';
    }

    // 統計更新
    totalLikes.textContent = productData.likes;
    totalViews.textContent = productData.detailViews;
    totalCart.textContent = productData.cartActions;
    totalImageChanges.textContent = productData.imageChanges;

    // オブジェクト表示更新
    objectDisplay.innerHTML = `
        likes: ${productData.likes}<br>
        currentImage: ${productData.currentImage}<br>
        inCart: ${productData.inCart}<br>
        imageChanges: ${productData.imageChanges}
    `;

    // 画像状態の復元
    if (typeof changeImage === 'function') {
        changeImage(productData.currentImage);
    }
}

// 5. いいね機能（アニメーション強化）
function handleLike() {
    productData.isLiked = !productData.isLiked;
    productData.likes += productData.isLiked ? 1 : -1;
    
    addToHistory(productData.isLiked ? 'いいねしました' : 'いいねを取り消し');
    logAnimation(productData.isLiked ? 'ハートアニメーション実行' : 'ハート通常状態');
    showNotification(productData.isLiked ? '❤️ いいねしました！' : '💔 いいねを取り消しました');
    
    updateDisplay();
    saveData();
}

// 6. 詳細表示機能（アニメーション強化）
function handleDetailsToggle() {
    productData.showDetails = !productData.showDetails;
    if (productData.showDetails) {
        productData.detailViews += 1;
        addToHistory('詳細情報を表示');
        logAnimation('詳細パネル スライドダウン');
        showNotification('📝 詳細情報を表示しました');
    } else {
        addToHistory('詳細情報を閉じる');
        logAnimation('詳細パネル スライドアップ');
        showNotification('📝 詳細情報を閉じました');
    }
    
    updateDisplay();
    saveData();
}

// 7. カート機能（アニメーション強化）
function handleCart() {
    productData.inCart = !productData.inCart;
    productData.cartActions += 1;
    
    addToHistory(productData.inCart ? 'カートに追加' : 'カートから削除');
    logAnimation(productData.inCart ? 'カートボタン バウンス' : 'カートボタン 通常');
    showNotification(productData.inCart ? '🛒 カートに追加しました！' : '🗑️ カートから削除しました');
    
    updateDisplay();
    saveData();
}

// 8. デモ実行機能（新機能）
function runDemo() {
    showNotification('✨ デモを開始します', 'info');
    logAnimation('自動デモ開始');
    
    // 連続アニメーション実行
    setTimeout(() => changeImage(2), 1000);
    setTimeout(() => handleLike(), 2000);
    setTimeout(() => handleDetailsToggle(), 3000);
    setTimeout(() => handleCart(), 4000);
    setTimeout(() => changeImage(3), 5000);
    setTimeout(() => {
        showNotification('🎉 デモ完了！', 'success');
        logAnimation('自動デモ完了');
    }, 6000);
}

// 9. リセット機能
function handleReset() {
    if (confirm('全てのデータとアニメーション状態をリセットしますか？')) {
        localStorage.removeItem('productCardData_v4');
        localStorage.removeItem('productCardHistory_v4');
        resetToDefaults();
        updateDisplay();
        showNotification('🔄 データをリセットしました', 'info');
        logAnimation('システムをリセット');
    }
}

function resetToDefaults() {
    productData = {
        name: "プレミアム Tシャツ",
        price: 2980,
        likes: 0,
        isLiked: false,
        showDetails: false,
        inCart: false,
        detailViews: 0,
        cartActions: 0,
        imageChanges: 0,
        currentImage: 1,
        lastUpdated: new Date().toISOString()
    };
    actionHistory = [];
}

// 10. 初期化関数
function initializeInteractions() {
    // DOM要素のイベントリスナー設定
    const likeBtn = document.getElementById('likeBtn');
    const detailsBtn = document.getElementById('detailsBtn');
    const cartBtn = document.getElementById('cartBtn');
    const resetBtn = document.getElementById('resetBtn');
    const demoBtn = document.getElementById('demoBtn');

    likeBtn.addEventListener('click', handleLike);
    detailsBtn.addEventListener('click', handleDetailsToggle);
    cartBtn.addEventListener('click', handleCart);
    resetBtn.addEventListener('click', handleReset);
    demoBtn.addEventListener('click', runDemo);
}

// 11. メイン初期化処理
function initializeApp() {
    console.log('=== 19.4 アニメーション学習モード開始 ===');
    console.log('新しい学習テーマ: CSS アニメーションとJavaScript制御');
    console.log('重要ポイント: 視覚的に魅力的なUIインタラクション');
    
    loadData();
    updateDisplay();
    
    // 画像ギャラリーの初期化
    if (typeof setupImageGallery === 'function') {
        setupImageGallery();
    }
    
    // インタラクション機能の初期化
    initializeInteractions();
    
    addToHistory('システム開始');
    logAnimation('初期アニメーション完了');
    showNotification('🎨 アニメーション学習モードへようこそ！', 'success');
    
    console.log('🌟 各機能を試してアニメーション効果を楽しんでください！');
}

// 12. DOMContentLoaded時の初期化
document.addEventListener('DOMContentLoaded', initializeApp);