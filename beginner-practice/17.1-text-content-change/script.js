console.log("📝 ステップ17.1: テキスト内容変更を開始します！");
console.log("========================================");

// 統計用変数
let totalChanges = 0;
let buttonCounts = {
    greeting: 0,
    time: 0,
    motivation: 0,
    learning: 0,
    progress: 0
};

// DOM要素の取得
let mainDisplay = document.getElementById("main-display");
let currentTextDisplay = document.getElementById("current-text");

// テキスト変更を処理する共通関数
function changeText(newText, buttonType, buttonName) {
    // 古いテキストを保存
    let oldText = mainDisplay.textContent;
    
    // 新しいテキストを設定
    mainDisplay.textContent = newText;
    
    // 現在のテキスト表示を更新
    currentTextDisplay.textContent = `現在のテキスト: "${newText}"`;
    
    // 統計を更新
    totalChanges++;
    if (buttonType && buttonCounts.hasOwnProperty(buttonType)) {
        buttonCounts[buttonType]++;
    }
    
    updateStats();
    
    // ログ出力
    console.log(`${buttonName}: テキストを変更しました`);
    console.log(`旧: "${oldText}"`);
    console.log(`新: "${newText}"`);
    console.log(`総変更回数: ${totalChanges}`);
}

// 統計表示を更新する関数
function updateStats() {
    document.getElementById("total-changes").textContent = totalChanges;
    document.getElementById("greeting-count").textContent = buttonCounts.greeting;
    document.getElementById("time-count").textContent = buttonCounts.time;
    document.getElementById("motivation-count").textContent = buttonCounts.motivation;
    document.getElementById("learning-count").textContent = buttonCounts.learning;
    document.getElementById("progress-count").textContent = buttonCounts.progress;
}

// 現在時刻を取得する関数
function getCurrentTime() {
    let now = new Date();
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// 挨拶ボタン
document.getElementById("greeting-btn").addEventListener("click", function() {
    let greetings = [
        "👋 こんにちは！JavaScriptの学習お疲れ様です！",
        "😊 素晴らしい一日ですね！一緒に頑張りましょう！",
        "🌟 あなたの学習への取り組みは本当に素晴らしいです！",
        "🎉 プログラミングの世界へようこそ！楽しんでいきましょう！"
    ];
    let randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    changeText(randomGreeting, "greeting", "挨拶ボタン");
});

// 時刻ボタン
document.getElementById("time-btn").addEventListener("click", function() {
    let currentTime = getCurrentTime();
    let timeMessage = `🕐 現在時刻: ${currentTime} - 今この瞬間も学習中！`;
    changeText(timeMessage, "time", "時刻ボタン");
});

// やる気ボタン
document.getElementById("motivation-btn").addEventListener("click", function() {
    let motivations = [
        "💪 あなたは必ずできます！一歩一歩前進していきましょう！",
        "🔥 情熱を持って取り組めば、どんな困難も乗り越えられます！",
        "⚡ エネルギー全開で頑張りましょう！今日も最高の一日に！",
        "🚀 目標に向かって飛び立ちましょう！あなたの可能性は無限大！"
    ];
    let randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];
    changeText(randomMotivation, "motivation", "やる気ボタン");
});

// 学習ボタン
document.getElementById("learning-btn").addEventListener("click", function() {
    let learningMessages = [
        "📖 知識は人生最大の財産です。今日も新しいことを学びましょう！",
        "🧠 脳は使えば使うほど発達します。プログラミングで脳を鍛えましょう！",
        "💡 理解できない時は休憩も大切。焦らず着実に進歩しましょう！",
        "🔬 実験するように学習しましょう。失敗も大切な学びの一部です！"
    ];
    let randomLearning = learningMessages[Math.floor(Math.random() * learningMessages.length)];
    changeText(randomLearning, "learning", "学習ボタン");
});

// 進捗ボタン
document.getElementById("progress-btn").addEventListener("click", function() {
    let stepNumber = "17.1";
    let progressMessages = [
        `📊 現在のステップ: ${stepNumber} - textContentマスターまであと少し！`,
        `🎯 学習進捗: 順調です！${stepNumber}ステップを着実にクリア中！`,
        `📈 スキルアップ中！ステップ${stepNumber}でさらに成長しています！`,
        `✨ 素晴らしい進捗です！ステップ${stepNumber}を楽しく学習中！`
    ];
    let randomProgress = progressMessages[Math.floor(Math.random() * progressMessages.length)];
    changeText(randomProgress, "progress", "進捗ボタン");
});

// クリアボタン
document.getElementById("clear-btn").addEventListener("click", function() {
    changeText("🧹 表示エリアがクリアされました。新たなスタートです！", null, "クリアボタン");
});

// 初期統計表示
updateStats();

console.log("✅ テキスト変更システムが初期化されました！");
console.log("💡 各ボタンをクリックして、テキストがどのように変化するか確認してください！");