console.log("🎯 配列とランダムの応用を開始します！");

// 複数の配列を定義
let quotes = [
    "成功は努力の結果です",
    "継続は力なり",
    "今日の努力が明日の成果に",
    "学び続けることが成長の秘訣",
    "小さな一歩が大きな変化を生む"
];

let colors = [
    { name: "夕焼けオレンジ", code: "#ff6b6b" },
    { name: "海の青", code: "#4ecdc4" },
    { name: "森の緑", code: "#56ab2f" },
    { name: "ラベンダー", code: "#667eea" }
];

let foods = [
    "🍕 ピザ",
    "🍔 ハンバーガー", 
    "🍜 ラーメン",
    "🍣 寿司",
    "🍰 ケーキ",
    "🍦 アイスクリーム"
];

// 統計用の変数
let stats = {
    quote: 0,
    color: 0,
    food: 0,
    total: 0
};

// DOM要素を取得
let contentDisplay = document.getElementById("content-display");

// 配列情報を表示する関数
function displayArrayInfo() {
    document.getElementById("quotes-info").textContent = `${quotes.length}個の名言`;
    document.getElementById("colors-info").textContent = `${colors.length}個の色`;
    document.getElementById("foods-info").textContent = `${foods.length}個の食べ物`;
}

// 統計を更新する関数
function updateStats() {
    document.getElementById("quote-count").textContent = stats.quote;
    document.getElementById("color-count").textContent = stats.color;
    document.getElementById("food-count").textContent = stats.food;
    document.getElementById("total-count").textContent = stats.total;
}

// ランダム選択を行う共通関数
function performRandomSelect(array, type, displayName) {
    let randomIndex = Math.floor(Math.random() * array.length);
    let selectedItem = array[randomIndex];
    
    // 統計を更新
    stats[type]++;
    stats.total++;
    updateStats();
    
    console.log(`${displayName}からランダム選択:`);
    console.log(`インデックス: ${randomIndex}, 選択: ${selectedItem}`);
    
    return { selectedItem, randomIndex };
}

// 名言選択ボタン
document.getElementById("quote-btn").addEventListener("click", function() {
    console.log("💬 名言選択ボタンが押されました");
    
    let result = performRandomSelect(quotes, "quote", "名言配列");
    
    contentDisplay.innerHTML = `
        <h3 style="color: #27ae60; margin-top: 0;">💬 今日の名言</h3>
        <div style="background: linear-gradient(135deg, #27ae60, #2ecc71); color: white; padding: 25px; border-radius: 15px; text-align: center;">
            <h2 style="margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                "${result.selectedItem}"
            </h2>
        </div>
        <p style="color: #7f8c8d; margin-top: 15px;">
            📍 ${quotes.length}個の名言の中から ${result.randomIndex + 1} 番目が選ばれました
        </p>
    `;
});

// 色選択ボタン
document.getElementById("color-btn").addEventListener("click", function() {
    console.log("🎨 色選択ボタンが押されました");
    
    let result = performRandomSelect(colors, "color", "色配列");
    let colorObj = result.selectedItem;
    
    contentDisplay.innerHTML = `
        <h3 style="color: #8e44ad; margin-top: 0;">🎨 今日の色</h3>
        <div style="background: ${colorObj.code}; color: white; padding: 25px; border-radius: 15px; text-align: center;">
            <h2 style="margin: 10px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                ${colorObj.name}
            </h2>
            <p style="font-family: monospace; font-size: 1.2rem; margin: 0;">
                ${colorObj.code}
            </p>
        </div>
        <p style="color: #7f8c8d; margin-top: 15px;">
            📍 ${colors.length}個の色の中から ${result.randomIndex + 1} 番目が選ばれました
        </p>
    `;
});

// 食べ物選択ボタン
document.getElementById("food-btn").addEventListener("click", function() {
    console.log("🍕 食べ物選択ボタンが押されました");
    
    let result = performRandomSelect(foods, "food", "食べ物配列");
    
    contentDisplay.innerHTML = `
        <h3 style="color: #e67e22; margin-top: 0;">🍕 今日のおすすめ</h3>
        <div style="background: linear-gradient(135deg, #e67e22, #f39c12); color: white; padding: 25px; border-radius: 15px; text-align: center;">
            <div style="font-size: 4rem; margin: 10px 0;">
                ${result.selectedItem.charAt(0)}
            </div>
            <h2 style="margin: 10px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                ${result.selectedItem.substring(2)}
            </h2>
        </div>
        <p style="color: #7f8c8d; margin-top: 15px;">
            📍 ${foods.length}個の食べ物の中から ${result.randomIndex + 1} 番目が選ばれました
        </p>
    `;
});

// 初期化処理
displayArrayInfo();
updateStats();

console.log("✅ 配列とランダムの応用システムが初期化されました！");
console.log("📊 使用可能な配列: quotes, colors, foods");
console.log("💡 各ボタンをクリックして、統計機能付きのランダム選択を体験してください！");