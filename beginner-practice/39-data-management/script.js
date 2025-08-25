// === 19.3 メイン学習テーマ: localStorage による永続化 ===

// 1. 商品データオブジェクト（19.2から拡張）
let productData = {
    name: "プレミアム Tシャツ",
    price: 2980,
    likes: 0,
    isLiked: false,
    showDetails: false,
    inCart: false,
    detailViews: 0,
    cartActions: 0,
    lastUpdated: new Date().toISOString() // 最終更新日時を追加
};

// 操作履歴を保存する配列
let actionHistory = [];

// 2. DOM要素の取得
const likeBtn = document.getElementById('likeBtn');
const detailsBtn = document.getElementById('detailsBtn');
const cartBtn = document.getElementById('cartBtn');
const productDetails = document.getElementById('productDetails');
const likeCount = document.getElementById('likeCount');
const totalLikes = document.getElementById('totalLikes');
const totalViews = document.getElementById('totalViews');
const totalCart = document.getElementById('totalCart');
const storageStatus = document.getElementById('storageStatus');
const historyList = document.getElementById('historyList');
const objectDisplay = document.getElementById('objectDisplay');
const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// 3. localStorage からデータを読み込む機能（新機能）
function loadData() {
    try {
        // productData の読み込み
        const savedData = localStorage.getItem('productCardData');
        if (savedData) {
            productData = JSON.parse(savedData);
            updateStorageStatus('✅ データを復元しました', false);
        } else {
            updateStorageStatus('🆕 新規データで開始', false);
        }

        // 履歴データの読み込み
        const savedHistory = localStorage.getItem('productCardHistory');
        if (savedHistory) {
            actionHistory = JSON.parse(savedHistory);
        }

    } catch (error) {
        console.error('データ読み込みエラー:', error);
        updateStorageStatus('⚠️ データエラー - 初期化しました', true);
        resetToDefaults();
    }
}

// 4. localStorage にデータを保存する機能（新機能）
function saveData() {
    try {
        productData.lastUpdated = new Date().toISOString();
        localStorage.setItem('productCardData', JSON.stringify(productData));
        localStorage.setItem('productCardHistory', JSON.stringify(actionHistory));
        updateStorageStatus('💾 データを保存しました', false);
    } catch (error) {
        console.error('データ保存エラー:', error);
        updateStorageStatus('❌ 保存に失敗しました', true);
    }
}

// 5. 履歴に操作を記録する機能（新機能）
function addToHistory(action) {
    const timestamp = new Date().toLocaleTimeString();
    actionHistory.unshift(`${timestamp}: ${action}`); // 新しい記録を先頭に追加
    
    // 履歴は最大10件まで保持
    if (actionHistory.length > 10) {
        actionHistory = actionHistory.slice(0, 10);
    }
    
    updateHistoryDisplay();
}

// 6. localStorage状態表示の更新
function updateStorageStatus(message, isError) {
    storageStatus.textContent = message;
    storageStatus.className = isError ? 'storage-status error' : 'storage-status';
}

// 7. 履歴表示の更新
function updateHistoryDisplay() {
    if (actionHistory.length === 0) {
        historyList.innerHTML = '<div class="history-item">履歴がありません</div>';
    } else {
        historyList.innerHTML = actionHistory
            .map(item => `<div class="history-item">${item}</div>`)
            .join('');
    }
}

// 8. オブジェクト表示の更新
function displayObjectData() {
    objectDisplay.innerHTML = `
        likes: ${productData.likes}<br>
        isLiked: ${productData.isLiked}<br>
        showDetails: ${productData.showDetails}<br>
        inCart: ${productData.inCart}<br>
        <small>保存: ${new Date(productData.lastUpdated).toLocaleTimeString()}</small>
    `;
}

// 9. 統計表示の更新
function updateStats() {
    totalLikes.textContent = productData.likes;
    totalViews.textContent = productData.detailViews;
    totalCart.textContent = productData.cartActions;
}

// 10. 画面全体の更新
function updateDisplay() {
    // ボタン状態の更新
    likeCount.textContent = productData.likes;
    
    if (productData.isLiked) {
        likeBtn.classList.add('liked');
    } else {
        likeBtn.classList.remove('liked');
    }
    
    if (productData.showDetails) {
        productDetails.classList.add('show');
        detailsBtn.textContent = '📝 閉じる';
    } else {
        productDetails.classList.remove('show');
        detailsBtn.textContent = '📝 詳細';
    }
    
    if (productData.inCart) {
        cartBtn.classList.add('in-cart');
        cartBtn.textContent = '🛒 削除';
    } else {
        cartBtn.classList.remove('in-cart');
        cartBtn.textContent = '🛒 カート';
    }
    
    updateStats();
    displayObjectData();
}

// 11. いいね機能（自動保存付き）
function handleLike() {
    productData.isLiked = !productData.isLiked;
    productData.likes += productData.isLiked ? 1 : -1;
    
    addToHistory(productData.isLiked ? 'いいねしました' : 'いいねを取り消しました');
    updateDisplay();
    saveData(); // 自動保存
}

// 12. 詳細表示機能（自動保存付き）
function handleDetailsToggle() {
    productData.showDetails = !productData.showDetails;
    if (productData.showDetails) {
        productData.detailViews += 1;
        addToHistory('詳細情報を表示しました');
    } else {
        addToHistory('詳細情報を閉じました');
    }
    
    updateDisplay();
    saveData(); // 自動保存
}

// 13. カート機能（自動保存付き）
function handleCart() {
    productData.inCart = !productData.inCart;
    productData.cartActions += 1;
    
    addToHistory(productData.inCart ? 'カートに追加しました' : 'カートから削除しました');
    updateDisplay();
    saveData(); // 自動保存
}

// 14. データのリセット
function handleReset() {
    if (confirm('全ての保存データを削除してリセットしますか？')) {
        localStorage.removeItem('productCardData');
        localStorage.removeItem('productCardHistory');
        resetToDefaults();
        addToHistory('データをリセットしました');
        updateDisplay();
        updateStorageStatus('🔄 データをリセットしました', false);
    }
}

// 15. デフォルト値への復元
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
        lastUpdated: new Date().toISOString()
    };
    actionHistory = [];
}

// 16. データのエクスポート（学習用）
function handleExport() {
    const exportData = {
        productData: productData,
        history: actionHistory,
        timestamp: new Date().toISOString()
    };
    console.log('=== 保存されたデータの詳細 ===');
    console.log(JSON.stringify(exportData, null, 2));
    alert('コンソール（F12）にデータの詳細を出力しました！');
}

// 17. 履歴のクリア
function handleClearHistory() {
    if (confirm('操作履歴をクリアしますか？')) {
        actionHistory = [];
        localStorage.setItem('productCardHistory', JSON.stringify(actionHistory));
        updateHistoryDisplay();
        addToHistory('履歴をクリアしました');
    }
}

// 18. イベントリスナーの設定
likeBtn.addEventListener('click', handleLike);
detailsBtn.addEventListener('click', handleDetailsToggle);
cartBtn.addEventListener('click', handleCart);
resetBtn.addEventListener('click', handleReset);
exportBtn.addEventListener('click', handleExport);
clearHistoryBtn.addEventListener('click', handleClearHistory);

// 19. 初期化処理
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== 19.3 localStorage学習モード開始 ===');
    console.log('新しい学習テーマ: データの永続化');
    console.log('重要ポイント: ブラウザを閉じても状態を保持');
    
    loadData(); // 保存されたデータを読み込み
    updateDisplay(); // 画面を更新
    updateHistoryDisplay(); // 履歴を表示
    
    addToHistory('システムを開始しました');
    
    console.log('💡 ブラウザを閉じて再度開いても、状態が保持されることを確認してみましょう！');
});