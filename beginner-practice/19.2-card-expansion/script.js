// === 19.2 メイン学習テーマ: DOM操作とイベント処理 ===

// 1. 商品データオブジェクト（19.1から拡張）
let productData = {
    name: "プレミアム Tシャツ",
    price: 2980,
    likes: 0,
    isLiked: false,
    showDetails: false,     // 詳細表示状態（新規追加）
    inCart: false,          // カート追加状態（新規追加）
    detailViews: 0,         // 詳細表示回数（新規追加）
    cartActions: 0,         // カート操作回数（新規追加）
    domChanges: 0           // DOM変更回数（学習用）
};

// 2. DOM要素の取得
const likeBtn = document.getElementById('likeBtn');
const detailsBtn = document.getElementById('detailsBtn');
const cartBtn = document.getElementById('cartBtn');
const productDetails = document.getElementById('productDetails');
const likeCount = document.getElementById('likeCount');
const totalLikes = document.getElementById('totalLikes');
const totalDetailViews = document.getElementById('totalDetailViews');
const totalCartActions = document.getElementById('totalCartActions');
const totalDomChanges = document.getElementById('totalDomChanges');
const domDisplay = document.getElementById('domDisplay');
const objectDisplay = document.getElementById('objectDisplay');
const resetBtn = document.getElementById('resetBtn');

// 3. DOM変化ログ記録機能（学習支援）
function logDomChange(action) {
    productData.domChanges += 1;
    domDisplay.textContent = `${new Date().toLocaleTimeString()}: ${action}`;
    console.log(`DOM操作: ${action}`);
}

// 4. オブジェクト表示更新機能
function displayObjectData() {
    objectDisplay.innerHTML = `
        {<br>
        &nbsp;&nbsp;likes: <span style="color: #e74c3c;">${productData.likes}</span>,<br>
        &nbsp;&nbsp;isLiked: <span style="color: #3498db;">${productData.isLiked}</span>,<br>
        &nbsp;&nbsp;showDetails: <span style="color: #27ae60;">${productData.showDetails}</span>,<br>
        &nbsp;&nbsp;inCart: <span style="color: #f39c12;">${productData.inCart}</span><br>
        }
    `;
}

// 5. 統計表示更新機能
function updateStats() {
    totalLikes.textContent = productData.likes;
    totalDetailViews.textContent = productData.detailViews;
    totalCartActions.textContent = productData.cartActions;
    totalDomChanges.textContent = productData.domChanges;
}

// 6. いいね機能（19.1から継続）
function handleLike() {
    productData.isLiked = !productData.isLiked;
    productData.likes += productData.isLiked ? 1 : -1;
    
    // DOM操作：ボタンの見た目を更新
    if (productData.isLiked) {
        likeBtn.classList.add('liked');
        logDomChange('いいねボタン → 赤色に変更');
    } else {
        likeBtn.classList.remove('liked');
        logDomChange('いいねボタン → グレーに変更');
    }
    
    likeCount.textContent = productData.likes;
    updateStats();
    displayObjectData();
}

// 7. 詳細表示切替機能（新機能 - DOM操作のメイン学習）
function handleDetailsToggle() {
    productData.showDetails = !productData.showDetails;
    productData.detailViews += productData.showDetails ? 1 : 0;
    
    // DOM操作：要素の表示・非表示切替
    if (productData.showDetails) {
        productDetails.classList.add('show');
        detailsBtn.textContent = '📝 閉じる';
        logDomChange('詳細エリア → 表示（addClass）');
    } else {
        productDetails.classList.remove('show');
        detailsBtn.textContent = '📝 詳細';
        logDomChange('詳細エリア → 非表示（removeClass）');
    }
    
    updateStats();
    displayObjectData();
}

// 8. カート機能（新機能）
function handleCart() {
    productData.inCart = !productData.inCart;
    productData.cartActions += 1;
    
    // DOM操作：ボタンの状態変更
    if (productData.inCart) {
        cartBtn.classList.add('in-cart');
        cartBtn.textContent = '🛒 削除';
        logDomChange('カートボタン → オレンジ色（追加状態）');
    } else {
        cartBtn.classList.remove('in-cart');
        cartBtn.textContent = '🛒 カート';
        logDomChange('カートボタン → 緑色（通常状態）');
    }
    
    updateStats();
    displayObjectData();
}

// 9. リセット機能
function handleReset() {
    if (confirm('全ての状態をリセットしますか？')) {
        // オブジェクトのリセット
        productData.likes = 0;
        productData.isLiked = false;
        productData.showDetails = false;
        productData.inCart = false;
        productData.detailViews = 0;
        productData.cartActions = 0;
        productData.domChanges = 0;
        
        // DOM要素のリセット
        likeBtn.classList.remove('liked');
        productDetails.classList.remove('show');
        cartBtn.classList.remove('in-cart');
        
        likeCount.textContent = '0';
        detailsBtn.textContent = '📝 詳細';
        cartBtn.textContent = '🛒 カート';
        
        logDomChange('全要素をリセット');
        updateStats();
        displayObjectData();
    }
}

// 10. イベントリスナーの設定
likeBtn.addEventListener('click', handleLike);
detailsBtn.addEventListener('click', handleDetailsToggle);
cartBtn.addEventListener('click', handleCart);
resetBtn.addEventListener('click', handleReset);

// 11. 初期化
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== 19.2 DOM操作学習モード開始 ===');
    console.log('新しい学習テーマ: DOM要素の動的操作');
    console.log('重要ポイント: オブジェクトの変化 → DOM要素の更新');
    
    logDomChange('初期化完了');
    updateStats();
    displayObjectData();
    
    console.log('🎯 各ボタンを押してDOM要素の変化を観察してみましょう！');
});