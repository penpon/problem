console.log("🎛️ ステップ16.1: 複数ボタン操作を開始します！");
console.log("========================================");

// 統計用変数
let totalClicks = 0;
let buttonClickCounts = {};

// メッセージ表示エリアの取得
let messageDisplay = document.getElementById("message-display");

// 1. ようこそボタン
document.getElementById("welcome-btn").addEventListener("click", function() {
    console.log("👋 ようこそボタンがクリックされました！");
    messageDisplay.textContent = "👋 ようこそ！JavaScriptの学習へ！一緒に頑張りましょう！";
    messageDisplay.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
    updateStats("ようこそボタン");
});

// 2. 幸せボタン
document.getElementById("happy-btn").addEventListener("click", function() {
    console.log("😊 幸せボタンがクリックされました！");
    messageDisplay.textContent = "😊 今日は良い一日ですね！笑顔でプログラミングを楽しみましょう！";
    messageDisplay.style.background = "linear-gradient(135deg, #ffecd2, #fcb69f)";
    updateStats("幸せボタン");
});

// 3. ロケットボタン
document.getElementById("rocket-btn").addEventListener("click", function() {
    console.log("🚀 ロケットボタンがクリックされました！");
    messageDisplay.textContent = "🚀 プログラミングスキルがロケットのように向上中！目指せ、宇宙！";
    messageDisplay.style.background = "linear-gradient(135deg, #fa709a, #fee140)";
    updateStats("ロケットボタン");
});

// 4. 虹色ボタン
document.getElementById("rainbow-btn").addEventListener("click", function() {
    console.log("🌈 虹色ボタンがクリックされました！");
    messageDisplay.textContent = "🌈 カラフルな虹のように、あなたの未来も輝いています！";
    messageDisplay.style.background = "linear-gradient(135deg, #a8edea, #fed6e3)";
    updateStats("虹色ボタン");
});

// 5. 音楽ボタン
document.getElementById("music-btn").addEventListener("click", function() {
    console.log("🎵 音楽ボタンがクリックされました！");
    messageDisplay.textContent = "🎵 プログラミングは音楽のように美しいリズムで作られます♪";
    messageDisplay.style.background = "linear-gradient(135deg, #ff9a9e, #fecfef)";
    updateStats("音楽ボタン");
});

// 6. 魔法ボタン
document.getElementById("magic-btn").addEventListener("click", function() {
    console.log("✨ 魔法ボタンがクリックされました！");
    messageDisplay.textContent = "✨ JavaScriptは魔法のような力を持っています！あなたも魔法使い！";
    messageDisplay.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
    updateStats("魔法ボタン");
});

// 統計更新関数
function updateStats(buttonName) {
    totalClicks++;
    
    // ボタン別クリック数をカウント
    if (buttonClickCounts[buttonName]) {
        buttonClickCounts[buttonName]++;
    } else {
        buttonClickCounts[buttonName] = 1;
    }
    
    // 画面の統計を更新
    document.getElementById("total-clicks").textContent = totalClicks;
    document.getElementById("last-clicked").textContent = buttonName;
    
    // 最も多くクリックされたボタンを特定
    let favoriteButton = "";
    let maxClicks = 0;
    for (let button in buttonClickCounts) {
        if (buttonClickCounts[button] > maxClicks) {
            maxClicks = buttonClickCounts[button];
            favoriteButton = button;
        }
    }
    document.getElementById("favorite-button").textContent = favoriteButton + " (" + maxClicks + "回)";
    
    // コンソールに統計を出力
    console.log("📊 合計クリック数: " + totalClicks);
    console.log("📊 最後にクリック: " + buttonName);
    console.log("📊 各ボタンのクリック数:", buttonClickCounts);
}

console.log("✅ 6つのボタンイベントがすべて設定されました！");
console.log("💡 それぞれのボタンをクリックして、異なる反応を確認してください！");