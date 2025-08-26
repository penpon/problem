console.log("🖱️ 最初のクリック体験を開始します！");
console.log("=====================================");

// クリック回数をカウントする変数
let totalClicks = 0;

// 1. Helloボタンの処理
let helloButton = document.getElementById("hello-button");
helloButton.addEventListener("click", function() {
    console.log("🌟 Helloボタンがクリックされました！");
    
    let display = document.getElementById("message-display");
    display.textContent = "🌟 こんにちは！ JavaScriptの世界へようこそ！";
    display.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
    
    updateClickStats("Helloボタン");
});

// 2. 色変更ボタンの処理
let colorButton = document.getElementById("color-button");
colorButton.addEventListener("click", function() {
    console.log("🎨 色変更ボタンがクリックされました！");
    
    let display = document.getElementById("message-display");
    display.textContent = "🎨 カラフルに変身しました！";
    display.style.background = "linear-gradient(135deg, #ff6b6b, #4ecdc4)";
    
    updateClickStats("色変更ボタン");
});

// 3. 時間表示ボタンの処理
let timeButton = document.getElementById("time-button");
timeButton.addEventListener("click", function() {
    console.log("🕐 時間表示ボタンがクリックされました！");
    
    let display = document.getElementById("message-display");
    let now = new Date();
    let timeString = now.getHours() + ":" + 
                   String(now.getMinutes()).padStart(2, '0') + ":" + 
                   String(now.getSeconds()).padStart(2, '0');
    
    display.textContent = "🕐 現在時刻: " + timeString;
    display.style.background = "linear-gradient(135deg, #fa709a, #fee140)";
    
    updateClickStats("時間表示ボタン");
});

// クリック統計を更新する関数
function updateClickStats(buttonName) {
    totalClicks++;
    document.getElementById("click-count").textContent = totalClicks;
    document.getElementById("last-button").textContent = buttonName;
    
    console.log("📊 合計クリック数: " + totalClicks);
    console.log("📊 最後にクリック: " + buttonName);
}

console.log("✅ すべてのボタンイベントが設定されました！");
console.log("💡 ボタンをクリックして、インタラクティブ機能を体験してください！");