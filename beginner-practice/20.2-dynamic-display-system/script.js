// === 20.2 メイン学習テーマ: JavaScriptによる動的HTML生成 ===

// 1. 拡張された商品データ配列（20.1の3商品から6商品に拡張）
let products = [
    {
        id: 1,
        name: "プレミアム Tシャツ",
        category: "fashion",
        price: 2980,
        description: "肌触りの良い上質なコットン100%素材",
        emoji: "👕",
        likes: 0,
        isLiked: false
    },
    {
        id: 2,
        name: "ワイヤレス イヤホン",
        category: "electronics",
        price: 8900,
        description: "高音質・長時間バッテリーのプロ仕様",
        emoji: "🎧",
        likes: 0,
        isLiked: false
    },
    {
        id: 3,
        name: "ランニング シューズ",
        category: "sports",
        price: 12000,
        description: "軽量で足への負担を軽減する設計",
        emoji: "👟",
        likes: 0,
        isLiked: false
    },
    {
        id: 4,
        name: "レザー ウォレット",
        category: "accessories",
        price: 5500,
        description: "職人手作りの本革長財布",
        emoji: "👛",
        likes: 0,
        isLiked: false
    },
    {
        id: 5,
        name: "スマート ウォッチ",
        category: "electronics",
        price: 25000,
        description: "健康管理・通知機能搭載の多機能型",
        emoji: "⌚",
        likes: 0,
        isLiked: false
    },
    {
        id: 6,
        name: "デニム ジャケット",
        category: "fashion",
        price: 7800,
        description: "カジュアルからきれいめまで対応",
        emoji: "🧥",
        likes: 0,
        isLiked: false
    }
];

let generatedElements = 0;

// 2. DOM要素の取得
const productsGrid = document.getElementById('productsGrid');
const generationStatus = document.getElementById('generationStatus');
const totalProducts = document.getElementById('totalProducts');
const totalLikes = document.getElementById('totalLikes');
const totalCategories = document.getElementById('totalCategories');
const generatedElementsEl = document.getElementById('generatedElements');
const generationSteps = document.getElementById('generationSteps');
const categoryStats = document.getElementById('categoryStats');
const templateInfo = document.getElementById('templateInfo');
const regenerateBtn = document.getElementById('regenerateBtn');
const resetBtn = document.getElementById('resetBtn');

// 3. 商品カードの動的生成テンプレート関数（メイン学習ポイント！）
function createProductCard(product, index) {
    console.log(`🏗️ 商品カード生成開始: ${product.name}`);
    
    // ステップ1: メインカード要素を作成
    const card = document.createElement('div');
    card.className = `product-card category-${product.category}`;
    card.setAttribute('data-product-id', product.id);
    
    // ステップ2: 商品画像要素を作成
    const imageDiv = document.createElement('div');
    imageDiv.className = 'product-image';
    imageDiv.textContent = product.emoji;
    
    // ステップ3: カテゴリ表示を作成
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'product-category';
    categoryDiv.textContent = product.category;
    
    // ステップ4: 商品名を作成
    const nameH3 = document.createElement('h3');
    nameH3.className = 'product-name';
    nameH3.textContent = product.name;
    
    // ステップ5: 商品説明を作成
    const descriptionP = document.createElement('p');
    descriptionP.className = 'product-description';
    descriptionP.textContent = product.description;
    
    // ステップ6: 価格表示を作成
    const priceDiv = document.createElement('div');
    priceDiv.className = 'product-price';
    priceDiv.textContent = `¥${product.price.toLocaleString()}`;
    
    // ステップ7: アクションエリアを作成
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'product-actions';
    
    // ステップ8: いいねボタンを作成
    const likeBtn = document.createElement('button');
    likeBtn.className = `btn-like ${product.isLiked ? 'liked' : ''}`;
    likeBtn.innerHTML = `❤️ ${product.isLiked ? 'いいね済み' : 'いいね'} ${product.likes}`;
    
    // ステップ9: イベントリスナーを設定
    likeBtn.addEventListener('click', () => handleLike(index));
    
    // ステップ10: 要素を組み立て（appendChild で構造化）
    actionsDiv.appendChild(likeBtn);
    
    card.appendChild(imageDiv);
    card.appendChild(categoryDiv);
    card.appendChild(nameH3);
    card.appendChild(descriptionP);
    card.appendChild(priceDiv);
    card.appendChild(actionsDiv);
    
    // 生成カウンターを更新
    generatedElements += 9; // 9個の要素を生成
    
    console.log(`✅ 商品カード生成完了: ${product.name}`);
    return card;
}

// 4. 全商品の動的描画システム
function renderAllProducts() {
    console.log('🚀 全商品の動的生成を開始');
    
    // 既存の要素をクリア
    productsGrid.innerHTML = '';
    generatedElements = 0;
    
    // 生成プロセスの可視化
    updateGenerationSteps(0);
    
    // 各商品カードを動的に生成・追加
    products.forEach((product, index) => {
        const card = createProductCard(product, index);
        productsGrid.appendChild(card);
        
        // 段階的な生成エフェクト
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            
            requestAnimationFrame(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }, index * 100);
        
        updateGenerationSteps(index + 1);
    });
    
    generationStatus.textContent = `${products.length}商品の動的生成完了！`;
    generationStatus.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
    
    updateStats();
    console.log('🎉 全商品の動的生成完了');
}

// 5. 生成プロセスの可視化
function updateGenerationSteps(currentStep) {
    const steps = generationSteps.querySelectorAll('.process-step');
    steps.forEach((step, index) => {
        if (index < currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// 6. いいね機能（20.1から継続）
function handleLike(index) {
    const product = products[index];
    
    if (product.isLiked) {
        product.isLiked = false;
        product.likes = Math.max(0, product.likes - 1);
    } else {
        product.isLiked = true;
        product.likes += 1;
    }
    
    // 動的に生成された要素を更新
    renderAllProducts();
    console.log(`💖 ${product.name}: ${product.likes}いいね`);
}

// 7. 統計情報の更新
function updateStats() {
    const total = products.reduce((sum, product) => sum + product.likes, 0);
    const categories = [...new Set(products.map(p => p.category))];
    
    totalProducts.textContent = products.length;
    totalLikes.textContent = total;
    totalCategories.textContent = categories.length;
    generatedElementsEl.textContent = generatedElements;
    
    updateCategoryStats(categories);
}

// 8. カテゴリ別統計の動的生成
function updateCategoryStats(categories) {
    categoryStats.innerHTML = '';
    
    categories.forEach(category => {
        const count = products.filter(p => p.category === category).length;
        
        const categoryItem = document.createElement('div');
        categoryItem.className = 'category-item';
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'category-name';
        nameDiv.textContent = category;
        
        const countDiv = document.createElement('div');
        countDiv.className = 'category-count';
        countDiv.textContent = `${count}商品`;
        
        categoryItem.appendChild(nameDiv);
        categoryItem.appendChild(countDiv);
        categoryStats.appendChild(categoryItem);
    });
}

// 9. データの保存・読み込み
function saveData() {
    try {
        localStorage.setItem('productsData_v2', JSON.stringify(products));
    } catch (error) {
        console.error('データ保存エラー:', error);
    }
}

function loadData() {
    try {
        const savedProducts = localStorage.getItem('productsData_v2');
        if (savedProducts) {
            products = JSON.parse(savedProducts);
            console.log('💾 保存されたデータを復元');
        }
    } catch (error) {
        console.error('データ読み込みエラー:', error);
        resetToDefaults();
    }
}

// 10. リセット・再生成機能
function resetData() {
    if (confirm('全てのデータをリセットしますか？')) {
        localStorage.removeItem('productsData_v2');
        resetToDefaults();
        renderAllProducts();
        console.log('🔄 データをリセットしました');
    }
}

function resetToDefaults() {
    products.forEach(product => {
        product.likes = 0;
        product.isLiked = false;
    });
}

function regenerateGallery() {
    generationStatus.textContent = '再生成中...';
    generationStatus.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
    
    // 少し遅延させて再生成の過程を見せる
    setTimeout(() => {
        renderAllProducts();
    }, 500);
}

// 11. イベントリスナーの設定
regenerateBtn.addEventListener('click', regenerateGallery);
resetBtn.addEventListener('click', resetData);

// 12. 初期化処理
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== 20.2 動的HTML生成学習モード開始 ===');
    console.log('新しい学習テーマ: JavaScriptによる動的HTML要素生成');
    console.log('重要ポイント: createElement, appendChild, テンプレート関数');
    
    loadData();
    
    // 初期レンダリング（段階的表示で学習効果を高める）
    setTimeout(() => {
        renderAllProducts();
    }, 500);
    
    console.log('🏗️ 6商品の動的生成システムが稼働中');
    console.log('💡 各商品カードがJavaScriptで自動生成されています！');
});

// 13. 学習用のグローバル関数
window.showGenerationProcess = function() {
    console.log('=== 動的生成プロセスの詳細 ===');
    console.log('1. createElement() で要素を作成');
    console.log('2. className, textContent で属性設定');
    console.log('3. appendChild() で要素を組み立て');
    console.log('4. イベントリスナーで操作機能を追加');
    console.log('5. 最終的に DOM に追加');
    console.log('現在の生成要素数:', generatedElements);
};

console.log('💡 コンソールで showGenerationProcess() を実行すると生成プロセスの詳細が確認できます！');