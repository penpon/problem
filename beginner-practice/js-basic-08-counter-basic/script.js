console.log("🔢 カウンター基礎を開始します！");
console.log("=====================================");

// カウンター本体
let counter = 0;

// 統計用変数
let plusCount = 0;
let minusCount = 0;
let resetCount = 0;
let maxValue = 0;
let minValue = 0;

// DOM要素の取得
let counterDisplay = document.getElementById("counter-display");
let counterStatus = document.getElementById("counter-status");

// カウンター表示を更新する関数
function updateDisplay() {
    counterDisplay.textContent = counter;
    updateStatus();
    updateStats();
    
    console.log("📊 現在のカウンター値: " + counter);
}

// 状態メッセージを更新する関数
function updateStatus() {
    counterStatus.className = "counter-status";
    
    if (counter > 0) {
        counterStatus.textContent = `✨ プラス${counter}！ 順調に増加中です！`;
        counterStatus.classList.add("status-positive");
    } else if (counter < 0) {
        counterStatus.textContent = `⚡ マイナス${Math.abs(counter)}。負の数値も大切な学習です！`;
        counterStatus.classList.add("status-negative");
    } else {
        counterStatus.textContent = "🎯 ゼロに戻りました。新たなスタートです！";
        counterStatus.classList.add("status-zero");
    }
}

// 統計を更新する関数
function updateStats() {
    let totalOperations = plusCount + minusCount + resetCount;
    
    // 最高値・最低値の更新
    if (counter > maxValue) maxValue = counter;
    if (counter < minValue) minValue = counter;
    
    // 画面に統計を表示
    document.getElementById("plus-count").textContent = plusCount;
    document.getElementById("minus-count").textContent = minusCount;
    document.getElementById("reset-count").textContent = resetCount;
    document.getElementById("total-operations").textContent = totalOperations;
    document.getElementById("max-value").textContent = maxValue;
    document.getElementById("min-value").textContent = minValue;
}

// プラスボタン
document.getElementById("plus-btn").addEventListener("click", function() {
    console.log("➕ プラスボタンがクリックされました");
    counter = counter + 1;  // counter++ でも同じ
    plusCount++;
    updateDisplay();
});

// マイナスボタン
document.getElementById("minus-btn").addEventListener("click", function() {
    console.log("➖ マイナスボタンがクリックされました");
    counter = counter - 1;  // counter-- でも同じ
    minusCount++;
    updateDisplay();
});

// リセットボタン
document.getElementById("reset-btn").addEventListener("click", function() {
    console.log("🔄 リセットボタンがクリックされました");
    counter = 0;
    resetCount++;
    updateDisplay();
});

// 初期表示を設定
updateDisplay();

console.log("✅ カウンターシステムが初期化されました！");
console.log("💡 プラス、マイナス、リセットボタンをクリックして操作してください！");