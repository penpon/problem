console.log("⚡ ステップ17.5-1: 関数の基本を開始します！");

// DOM要素を取得
let contentDisplay = document.getElementById("content-display");

// 挨拶を表示する関数
function showGreeting() {
    console.log("👋 showGreeting関数が実行されました");
    
    contentDisplay.innerHTML = `
        <h3 style="color: #27ae60; margin-top: 0;">👋 挨拶関数の実行結果</h3>
        <div style="background: linear-gradient(135deg, #27ae60, #2ecc71); color: white; padding: 20px; border-radius: 10px; text-align: center;">
            <h2 style="margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                こんにちは！
            </h2>
            <p style="margin: 10px 0 0 0;">showGreeting() 関数が実行されました</p>
        </div>
    `;
}

// 現在時刻を表示する関数
function showCurrentTime() {
    console.log("🕐 showCurrentTime関数が実行されました");
    
    // 現在時刻を取得
    let now = new Date();
    let timeString = now.toLocaleTimeString();
    
    contentDisplay.innerHTML = `
        <h3 style="color: #3498db; margin-top: 0;">🕐 時刻表示関数の実行結果</h3>
        <div style="background: linear-gradient(135deg, #3498db, #2980b9); color: white; padding: 20px; border-radius: 10px; text-align: center;">
            <h2 style="margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                現在時刻: ${timeString}
            </h2>
            <p style="margin: 10px 0 0 0;">showCurrentTime() 関数が実行されました</p>
        </div>
    `;
}

// メッセージを表示する関数
function showMessage() {
    console.log("💬 showMessage関数が実行されました");
    
    // 励ましメッセージの配列
    let messages = [
        "がんばっていますね！",
        "プログラミング学習、順調です！", 
        "関数の使い方、覚えましたね！",
        "この調子で学習を続けましょう！"
    ];
    
    // ランダムにメッセージを選択
    let randomIndex = Math.floor(Math.random() * messages.length);
    let selectedMessage = messages[randomIndex];
    
    contentDisplay.innerHTML = `
        <h3 style="color: #e67e22; margin-top: 0;">💬 メッセージ関数の実行結果</h3>
        <div style="background: linear-gradient(135deg, #e67e22, #f39c12); color: white; padding: 20px; border-radius: 10px; text-align: center;">
            <h2 style="margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                ${selectedMessage}
            </h2>
            <p style="margin: 10px 0 0 0;">showMessage() 関数が実行されました</p>
        </div>
    `;
}

// ボタンにイベントリスナーを追加
document.getElementById("hello-btn").addEventListener("click", function() {
    console.log("挨拶ボタンがクリックされました");
    showGreeting(); // 挨拶関数を呼び出し
});

document.getElementById("time-btn").addEventListener("click", function() {
    console.log("時刻ボタンがクリックされました");
    showCurrentTime(); // 時刻関数を呼び出し  
});

document.getElementById("message-btn").addEventListener("click", function() {
    console.log("メッセージボタンがクリックされました");
    showMessage(); // メッセージ関数を呼び出し
});

console.log("✅ 関数基本システムが初期化されました！");
console.log("🔧 定義された関数: showGreeting, showCurrentTime, showMessage");
console.log("💡 各ボタンをクリックして、関数の動作を体験してください！");