console.log("⏰ ステップ17.4: タイマーとアニメーションを開始します！");
console.log("============================================");

// タイマー関連変数
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

// 統計用変数
let totalRunTime = 0;
let startCount = 0;
let stopCount = 0;
let resetCount = 0;
let intervalExecutions = 0;

// 各種インターバルID
let countdownInterval = null;
let movementInterval = null;
let autoChangeInterval = null;

// DOM要素の取得
let timerDisplay = document.getElementById("timer-display");
let timerStatus = document.getElementById("timer-status");
let progressFill = document.getElementById("progress-fill");
let movingElement = document.getElementById("moving-element");
let textChanger = document.getElementById("text-changer");
let colorChanger = document.getElementById("color-changer");

// ボタン要素
let startBtn = document.getElementById("start-btn");
let stopBtn = document.getElementById("stop-btn");
let resetBtn = document.getElementById("reset-btn");
let countdownBtn = document.getElementById("countdown-btn");
let intervalBtn = document.getElementById("interval-btn");
let autoChangeBtn = document.getElementById("auto-change-btn");

// 時間フォーマット関数
function formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// 統計更新関数
function updateStats() {
    document.getElementById("total-time").textContent = Math.floor(totalRunTime / 1000) + "秒";
    document.getElementById("start-count").textContent = startCount;
    document.getElementById("stop-count").textContent = stopCount;
    document.getElementById("reset-count").textContent = resetCount;
    document.getElementById("interval-count").textContent = intervalExecutions;
    document.getElementById("current-status").textContent = isRunning ? "実行中" : "停止中";
}

// タイマー表示更新関数
function updateTimerDisplay() {
    if (isRunning) {
        elapsedTime = Date.now() - startTime;
    }
    
    timerDisplay.textContent = formatTime(elapsedTime);
    
    // 進捗バー更新（60秒を100%とする）
    let progressPercent = Math.min((elapsedTime / 60000) * 100, 100);
    progressFill.style.width = progressPercent + '%';
    
    updateStats();
}

// 全インターバルクリア関数
function clearAllIntervals() {
    if (timerInterval) clearInterval(timerInterval);
    if (countdownInterval) clearInterval(countdownInterval);
    if (movementInterval) clearInterval(movementInterval);
    if (autoChangeInterval) clearInterval(autoChangeInterval);
    
    timerInterval = null;
    countdownInterval = null;
    movementInterval = null;
    autoChangeInterval = null;
}

// 開始/再開ボタン
startBtn.addEventListener("click", function() {
    console.log("▶️ タイマー開始/再開");
    
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        isRunning = true;
        startCount++;
        
        timerInterval = setInterval(updateTimerDisplay, 100);
        
        timerStatus.textContent = "⏰ タイマー実行中...";
        startBtn.disabled = true;
        stopBtn.disabled = false;
        
        updateStats();
    }
});

// 停止ボタン
stopBtn.addEventListener("click", function() {
    console.log("⏸️ タイマー一時停止");
    
    if (isRunning) {
        isRunning = false;
        stopCount++;
        totalRunTime += elapsedTime;
        
        clearInterval(timerInterval);
        timerInterval = null;
        
        timerStatus.textContent = "⏸️ タイマー一時停止中 - 再開できます";
        startBtn.disabled = false;
        stopBtn.disabled = true;
        
        updateStats();
    }
});

// リセットボタン
resetBtn.addEventListener("click", function() {
    console.log("🔄 タイマーリセット");
    
    clearAllIntervals();
    
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    resetCount++;
    
    timerDisplay.textContent = "00:00:00";
    progressFill.style.width = "0%";
    timerStatus.textContent = "🔄 タイマーリセット完了";
    
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    updateStats();
});

// カウントダウンボタン
countdownBtn.addEventListener("click", function() {
    console.log("⏳ カウントダウン開始");
    
    clearAllIntervals();
    
    let countdown = 10;
    timerDisplay.textContent = "00:00:" + String(countdown).padStart(2, '0');
    timerStatus.textContent = "⏳ カウントダウン実行中...";
    
    countdownInterval = setInterval(function() {
        countdown--;
        timerDisplay.textContent = "00:00:" + String(countdown).padStart(2, '0');
        
        // 進捗バー（10秒を100%とする）
        let progressPercent = ((10 - countdown) / 10) * 100;
        progressFill.style.width = progressPercent + '%';
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            countdownInterval = null;
            timerDisplay.textContent = "00:00:00";
            timerStatus.textContent = "🎉 カウントダウン完了！";
            progressFill.style.width = "0%";
            
            // アラート表示
            setTimeout(() => {
                alert("⏰ タイマー終了！");
            }, 500);
        }
        
        console.log(`カウントダウン: ${countdown}秒`);
    }, 1000);
});

// 定期実行ボタン
intervalBtn.addEventListener("click", function() {
    console.log("🔔 定期実行開始");
    
    clearAllIntervals();
    
    timerStatus.textContent = "🔔 定期実行中 - 2秒ごとに要素移動";
    intervalExecutions = 0;
    
    movementInterval = setInterval(function() {
        intervalExecutions++;
        
        // 要素をランダムな位置に移動
        let animationArea = document.getElementById("animation-area");
        let maxX = animationArea.offsetWidth - 60;
        let maxY = animationArea.offsetHeight - 60;
        
        let randomX = Math.floor(Math.random() * maxX);
        let randomY = Math.floor(Math.random() * maxY);
        
        movingElement.style.left = randomX + 'px';
        movingElement.style.top = randomY + 'px';
        
        // 背景色も変更
        let colors = [
            'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
            'linear-gradient(135deg, #667eea, #764ba2)',
            'linear-gradient(135deg, #fa709a, #fee140)',
            'linear-gradient(135deg, #a8edea, #fed6e3)',
            'linear-gradient(135deg, #ff9a9e, #fecfef)'
        ];
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        movingElement.style.background = randomColor;
        
        updateStats();
        
        console.log(`定期実行 ${intervalExecutions}回目: 位置(${randomX}, ${randomY})`);
    }, 2000);
});

// 自動変化ボタン
autoChangeBtn.addEventListener("click", function() {
    console.log("🎨 自動変化開始");
    
    clearAllIntervals();
    
    timerStatus.textContent = "🎨 自動変化実行中 - 複数要素が1秒ごとに変化";
    let changeCount = 0;
    
    autoChangeInterval = setInterval(function() {
        changeCount++;
        
        // テキスト変化
        let texts = [
            "✨ キラキラ効果中！",
            "🌈 虹色に変化中！",
            "⭐ スター効果中！",
            "🎭 マジック実行中！",
            "🎪 サーカス開催中！",
            "🚀 ロケット飛行中！"
        ];
        textChanger.textContent = texts[changeCount % texts.length];
        
        // 背景色変化
        let bgColors = [
            'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
            'linear-gradient(135deg, #667eea, #764ba2)',
            'linear-gradient(135deg, #fa709a, #fee140)',
            'linear-gradient(135deg, #a8edea, #fed6e3)',
            'linear-gradient(135deg, #ff9a9e, #fecfef)',
            'linear-gradient(135deg, #89f7fe, #66a6ff)'
        ];
        colorChanger.style.background = bgColors[changeCount % bgColors.length];
        
        // アニメーションクラス変化
        let animations = ['animate-bounce', 'animate-rotate', 'animate-pulse'];
        movingElement.className = 'moving-element ' + animations[changeCount % animations.length];
        
        // 進捗バー（10回を100%とする）
        let progressPercent = Math.min((changeCount / 10) * 100, 100);
        progressFill.style.width = progressPercent + '%';
        
        console.log(`自動変化 ${changeCount}回目: ${texts[changeCount % texts.length]}`);
        
        // 10回で停止
        if (changeCount >= 10) {
            clearInterval(autoChangeInterval);
            autoChangeInterval = null;
            timerStatus.textContent = "🎉 自動変化完了！";
            movingElement.className = 'moving-element';
        }
    }, 1000);
});

// 初期化
updateTimerDisplay();
updateStats();

// 初期位置設定
movingElement.style.left = "20px";
movingElement.style.top = "100px";

console.log("✅ タイマーとアニメーションシステムが初期化されました！");
console.log("⏰ setTimeout/setInterval の使用例:");
console.log("  - setTimeout: 指定時間後に1回実行");
console.log("  - setInterval: 指定間隔で繰り返し実行");
console.log("💡 各ボタンをクリックして、時間ベースの動的変化を体験してください！");

// デモ用のsetTimeout
setTimeout(function() {
    console.log("🎉 このメッセージは3秒後に表示されました（setTimeoutのデモ）");
}, 3000);