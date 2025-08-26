console.log("⚡ ステップ16.3: カウンター機能強化を開始します！");
console.log("==========================================");

// 制限値の定義
const MIN_VALUE = -50;
const MAX_VALUE = 100;
const TOTAL_RANGE = MAX_VALUE - MIN_VALUE;

// カウンター本体
let counter = 0;

// DOM要素の取得
let counterDisplay = document.getElementById("counter-display");
let statusDisplay = document.getElementById("status-display");
let progressFill = document.getElementById("progress-fill");
let progressText = document.getElementById("progress-text");

// すべてのボタンを取得
let buttons = {
    minus10: document.getElementById("minus10-btn"),
    minus5: document.getElementById("minus5-btn"),
    minus1: document.getElementById("minus1-btn"),
    plus1: document.getElementById("plus1-btn"),
    plus5: document.getElementById("plus5-btn"),
    plus10: document.getElementById("plus10-btn"),
    reset: document.getElementById("reset-btn"),
    random: document.getElementById("random-btn")
};

// カウンターを安全に変更する関数
function changeCounter(delta, buttonName) {
    let oldValue = counter;
    let newValue = counter + delta;
    
    // 範囲制限
    if (newValue < MIN_VALUE) {
        newValue = MIN_VALUE;
    } else if (newValue > MAX_VALUE) {
        newValue = MAX_VALUE;
    }
    
    counter = newValue;
    
    // ログ出力
    console.log(`${buttonName}: ${oldValue} → ${counter} (${delta > 0 ? '+' : ''}${delta})`);
    
    // 制限に達した場合の警告
    if (newValue !== oldValue + delta) {
        if (newValue === MIN_VALUE) {
            console.log("⚠️ 最小値(-50)に到達しました");
        } else if (newValue === MAX_VALUE) {
            console.log("⚠️ 最大値(100)に到達しました");
        }
    }
    
    updateDisplay();
}

// 表示を更新する関数
function updateDisplay() {
    // カウンター表示
    counterDisplay.textContent = counter;
    
    // 進捗バーの更新
    let progress = ((counter - MIN_VALUE) / TOTAL_RANGE) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `${counter - MIN_VALUE}/${TOTAL_RANGE} (${Math.round(progress)}%)`;
    
    // ステータス表示の更新
    updateStatus();
    
    // ボタンの有効/無効制御
    updateButtonStates();
}

// ステータスメッセージを更新する関数
function updateStatus() {
    statusDisplay.className = "status-display";
    
    if (counter === MAX_VALUE) {
        statusDisplay.textContent = "🎯 最大値(100)に到達！これ以上増加できません。";
        statusDisplay.classList.add("status-danger");
    } else if (counter === MIN_VALUE) {
        statusDisplay.textContent = "⚠️ 最小値(-50)に到達！これ以上減少できません。";
        statusDisplay.classList.add("status-danger");
    } else if (counter >= 80) {
        statusDisplay.textContent = "🔥 高い値です！最大値まであと少し！";
        statusDisplay.classList.add("status-warning");
    } else if (counter <= -40) {
        statusDisplay.textContent = "❄️ 低い値です！最小値に近づいています。";
        statusDisplay.classList.add("status-warning");
    } else if (counter >= 50) {
        statusDisplay.textContent = "✨ 良い調子！高い値を維持中！";
        statusDisplay.classList.add("status-success");
    } else if (counter <= -25) {
        statusDisplay.textContent = "📉 マイナス領域！でも大丈夫です。";
        statusDisplay.classList.add("status-normal");
    } else {
        statusDisplay.textContent = "👍 バランスの良い値です！";
        statusDisplay.classList.add("status-normal");
    }
}

// ボタンの有効/無効を制御する関数
function updateButtonStates() {
    // プラス系ボタンの制御
    buttons.plus1.disabled = (counter >= MAX_VALUE);
    buttons.plus5.disabled = (counter > MAX_VALUE - 5);
    buttons.plus10.disabled = (counter > MAX_VALUE - 10);
    
    // マイナス系ボタンの制御
    buttons.minus1.disabled = (counter <= MIN_VALUE);
    buttons.minus5.disabled = (counter < MIN_VALUE + 5);
    buttons.minus10.disabled = (counter < MIN_VALUE + 10);
}

// イベントリスナーの設定
buttons.plus1.addEventListener("click", () => changeCounter(1, "プラス1"));
buttons.plus5.addEventListener("click", () => changeCounter(5, "プラス5"));
buttons.plus10.addEventListener("click", () => changeCounter(10, "プラス10"));
buttons.minus1.addEventListener("click", () => changeCounter(-1, "マイナス1"));
buttons.minus5.addEventListener("click", () => changeCounter(-5, "マイナス5"));
buttons.minus10.addEventListener("click", () => changeCounter(-10, "マイナス10"));

buttons.reset.addEventListener("click", function() {
    console.log("🔄 リセット実行");
    counter = 0;
    updateDisplay();
});

buttons.random.addEventListener("click", function() {
    let randomValue = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE;
    console.log("🎲 ランダム値設定: " + randomValue);
    counter = randomValue;
    updateDisplay();
});

// 初期表示を設定
updateDisplay();

console.log("✅ 高機能カウンターシステムが初期化されました！");
console.log(`📊 設定範囲: ${MIN_VALUE} ～ ${MAX_VALUE}`);
console.log("💡 すべてのボタンを試して、制限機能を確認してください！");