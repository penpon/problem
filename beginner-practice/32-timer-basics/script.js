console.log("⏰ タイマー基礎を開始します！");
console.log("==========================================");

// タイマー関連変数
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

// DOM要素の取得
const timerDisplay = document.getElementById("timer-display");
const timerStatus = document.getElementById("timer-status");
const messageDisplay = document.getElementById("message-display");
const countdownDisplay = document.getElementById("countdown-display");

const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const delayBtn = document.getElementById("delay-btn");

// 時間フォーマット関数
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// タイマー表示更新関数
function updateTimerDisplay() {
    if (isRunning) {
        elapsedTime = Date.now() - startTime;
    }
    timerDisplay.textContent = formatTime(elapsedTime);
}

// タイマー開始ボタン
startBtn.addEventListener("click", function() {
    console.log("▶️ タイマー開始");
    
    if (!isRunning) {
        startTime = Date.now() - elapsedTime; // 停止からの再開に対応
        isRunning = true;
        
        // setInterval で1秒ごとに更新
        timerInterval = setInterval(updateTimerDisplay, 1000);
        
        timerStatus.textContent = "⏰ タイマー実行中...";
        messageDisplay.textContent = "setInterval が1秒ごとに実行されています";
        
        startBtn.disabled = true;
        stopBtn.disabled = false;
        
        console.log("✅ setInterval でタイマーを開始しました");
    }
});

// タイマー停止ボタン
stopBtn.addEventListener("click", function() {
    console.log("⏸️ タイマー停止");
    
    if (isRunning) {
        isRunning = false;
        
        // clearInterval でタイマー停止
        clearInterval(timerInterval);
        timerInterval = null;
        
        timerStatus.textContent = "⏸️ タイマー停止中";
        messageDisplay.textContent = "clearInterval でタイマーを停止しました";
        
        startBtn.disabled = false;
        stopBtn.disabled = true;
        
        console.log("⏹️ clearInterval でタイマーを停止しました");
    }
});

// リセットボタン
resetBtn.addEventListener("click", function() {
    console.log("🔄 タイマーリセット");
    
    // タイマーが動いている場合は停止
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // 変数をリセット
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    
    // 表示をリセット
    timerDisplay.textContent = "00:00:00";
    timerStatus.textContent = "🔄 タイマーをリセットしました";
    messageDisplay.textContent = "タイマーが00:00:00にリセットされました";
    
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    console.log("🔄 タイマーをリセットしました");
});

// 3秒遅延実行ボタン
delayBtn.addEventListener("click", function() {
    console.log("⏳ 3秒遅延実行を開始");
    
    messageDisplay.textContent = "3秒後にメッセージが表示されます...";
    
    // カウントダウン表示
    let countdown = 3;
    countdownDisplay.textContent = `カウントダウン: ${countdown}秒`;
    
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownDisplay.textContent = `カウントダウン: ${countdown}秒`;
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = "カウントダウン: 完了！";
        }
    }, 1000);
    
    // setTimeout で3秒後に実行
    setTimeout(() => {
        messageDisplay.textContent = "🎉 3秒経過しました！setTimeout で実行されました";
        countdownDisplay.textContent = "カウントダウン: --";
        
        console.log("🎉 setTimeout による3秒遅延実行が完了しました");
        
        // 2秒後にメッセージをクリア
        setTimeout(() => {
            messageDisplay.textContent = "ここにタイマーの実行結果が表示されます";
        }, 2000);
    }, 3000);
});

// 初期化処理
console.log("✅ タイマー基礎システムが初期化されました！");
console.log("📚 学習内容:");
console.log("  - setTimeout: 指定時間後に1回実行");
console.log("  - setInterval: 指定間隔で繰り返し実行");
console.log("  - clearTimeout: setTimeoutの停止");
console.log("  - clearInterval: setIntervalの停止");
console.log("💡 すべてのボタンを試して、違いを体験してください！");

// デモ用のsetTimeout（5秒後にコンソールメッセージ）
setTimeout(() => {
    console.log("🎉 このメッセージは5秒後に表示されました（初期化時のsetTimeoutデモ）");
}, 5000);