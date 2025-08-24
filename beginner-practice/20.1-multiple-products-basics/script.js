// ===== 20.1 メイン学習テーマ: 配列による複数商品データ管理 =====

// 1. 複数商品データの配列管理（これが今回のメインテーマ！）
// なぜ配列を使うのか？
// → 複数の商品データを効率的に管理できる
// → 同じ処理を複数の商品に適用できる
let products = [
    {
        id: 1,
        name: "プレミアム Tシャツ",
        price: 2980,
        likes: 0,
        isLiked: false,
        emoji: "👕"
    },
    {
        id: 2,
        name: "カジュアル パンツ",
        price: 4200,
        likes: 0,
        isLiked: false,
        emoji: "👖"
    },
    {
        id: 3,
        name: "スニーカー",
        price: 8500,
        likes: 0,
        isLiked: false,
        emoji: "👟"
    }
];

let operationCount = 0;
let operationHistory = [];

// 2. DOM要素の取得
const productsGrid = document.getElementById('productsGrid');
const totalProducts = document.getElementById('totalProducts');
const totalLikes = document.getElementById('totalLikes');
const totalOperations = document.getElementById('totalOperations');
const arrayContent = document.getElementById('arrayContent');
const individualStats = document.getElementById('individualStats');
const operationLog = document.getElementById('operationLog');
const resetBtn = document.getElementById('resetBtn');
const demoBtn = document.getElementById('demoBtn');

// 3. 配列の可視化機能（学習支援）
function displayArrayContent() {
    let content = "products = [\n";
    products.forEach((product, index) => {
        content += `  [${index}] {\n`;
        content += `    id: ${product.id},\n`;
        content += `    name: "${product.name}",\n`;
        content += `    price: ${product.price},\n`;
        content += `    likes: ${product.likes},\n`;
        content += `    isLiked: ${product.isLiked}\n`;
        content += `  }${index < products.length - 1 ? ',' : ''}\n`;
    });
    content += "];";
    
    arrayContent.textContent = content;
}

// 4. 操作ログ記録機能
function addToLog(message) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.textContent = `${timestamp}: ${message}`;
    
    operationLog.appendChild(logEntry);
    
    // ログが多くなったら古いものを削除
    const logs = operationLog.querySelectorAll('.log-entry');
    if (logs.length > 8) {
        logs[0].remove();
    }
    
    console.log(`配列操作: ${message}`);
}

// 5. 統計情報の更新（集約処理）
function updateStats() {
    // 全商品のいいね数を合計（配列の重要操作！）
    const total = products.reduce((sum, product) => sum + product.likes, 0);
    
    totalProducts.textContent = products.length;
    totalLikes.textContent = total;
    totalOperations.textContent = operationCount;
    
    // 個別統計の表示
    individualStats.innerHTML = '';
    products.forEach(product => {
        const statDiv = document.createElement('div');
        statDiv.className = 'product-stat';
        statDiv.innerHTML = `
            <span class="product-name-small">${product.name}</span>
            <span class="product-likes">${product.likes} いいね</span>
        `;
        individualStats.appendChild(statDiv);
    });
    
    // 配列可視化の更新
    displayArrayContent();
}

// 6. 商品カードの動的生成（重要な配列操作）
function renderProducts() {
    productsGrid.innerHTML = '';
    
    // forEach: 配列の各要素に対して処理を実行
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = `product-card product-${product.id}`;
        
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">¥${product.price.toLocaleString()}</div>
            </div>
            <button class="btn-like ${product.isLiked ? 'liked' : ''}" 
                    onclick="handleLike(${index})"
                    aria-label="${product.name}にいいね">
                ❤️ ${product.isLiked ? 'いいね済み' : 'いいね'} ${product.likes}
            </button>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// 7. いいね機能（配列の特定要素を操作）
function handleLike(index) {
    // 配列の特定のインデックスの商品を操作
    const product = products[index];
    
    if (product.isLiked) {
        product.isLiked = false;
        product.likes = Math.max(0, product.likes - 1);
        addToLog(`${product.name}のいいねを取り消し`);
    } else {
        product.isLiked = true;
        product.likes += 1;
        addToLog(`${product.name}にいいね！`);
    }
    
    operationCount += 1;
    
    // 画面を再描画
    renderProducts();
    updateStats();
    saveData();
}

// 8. データの保存・読み込み（配列対応）
function saveData() {
    try {
        localStorage.setItem('productsData_v1', JSON.stringify(products));
        localStorage.setItem('operationCount_v1', operationCount.toString());
    } catch (error) {
        console.error('データ保存エラー:', error);
        addToLog('データ保存エラーが発生しました');
    }
}

function loadData() {
    try {
        const savedProducts = localStorage.getItem('productsData_v1');
        const savedOperations = localStorage.getItem('operationCount_v1');
        
        if (savedProducts) {
            products = JSON.parse(savedProducts);
            addToLog('保存された商品データを復元しました');
        }
        
        if (savedOperations) {
            operationCount = parseInt(savedOperations);
        }
    } catch (error) {
        console.error('データ読み込みエラー:', error);
        addToLog('データ読み込みエラー - 初期データを使用');
        resetToDefaults();
    }
}

// 9. リセット機能
function resetData() {
    if (confirm('全てのデータをリセットしますか？')) {
        localStorage.removeItem('productsData_v1');
        localStorage.removeItem('operationCount_v1');
        resetToDefaults();
        renderProducts();
        updateStats();
        addToLog('データをリセットしました');
    }
}

function resetToDefaults() {
    products = [
        { id: 1, name: "プレミアム Tシャツ", price: 2980, likes: 0, isLiked: false, emoji: "👕" },
        { id: 2, name: "カジュアル パンツ", price: 4200, likes: 0, isLiked: false, emoji: "👖" },
        { id: 3, name: "スニーカー", price: 8500, likes: 0, isLiked: false, emoji: "👟" }
    ];
    operationCount = 0;
    operationHistory = [];
}

// 10. デモ実行機能（学習支援）
function runDemo() {
    addToLog('自動デモを開始します');
    
    // 順番に各商品にいいねする
    setTimeout(() => handleLike(0), 1000);
    setTimeout(() => handleLike(1), 2000);
    setTimeout(() => handleLike(2), 3000);
    setTimeout(() => handleLike(1), 4000); // 2番目の商品にもう一度
    setTimeout(() => {
        addToLog('デモ完了！配列操作を確認してください');
    }, 5000);
}

// 11. イベントリスナーの設定
resetBtn.addEventListener('click', resetData);
demoBtn.addEventListener('click', runDemo);

// 12. 初期化処理
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== 20.1 配列による複数商品管理学習モード開始 ===');
    console.log('メイン学習テーマ: 配列とオブジェクトの組み合わせ');
    console.log('重要ポイント: 複数データの効率的管理');
    
    loadData();
    renderProducts();
    updateStats();
    
    addToLog('3商品の配列管理システム開始');
    
    console.log('📦 現在の商品配列:', products);
    console.log('🎯 各商品のいいね機能を試して、配列の変化を観察してください！');
});

// 13. エラーハンドリング
window.addEventListener('error', function(event) {
    console.error('システムエラー:', event.error);
    addToLog(`エラーが発生しましたが安全に処理されました`);
});

// 学習用のグローバル関数（コンソールから配列を確認できる）
window.showProducts = function() {
    console.table(products);
    console.log('配列の長さ:', products.length);
    console.log('総いいね数:', products.reduce((sum, p) => sum + p.likes, 0));
};

console.log('💡 コンソールで showProducts() を実行すると配列の詳細が確認できます！');