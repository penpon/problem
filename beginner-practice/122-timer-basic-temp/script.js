console.log("⏰ ステップ17.4: タイマーの基本を開始します！");

// DOM要素を取得
let contentDisplay = document.getElementById("content-display");
let movingBox = document.getElementById("moving-box");

// 1秒タイマーボタン
document.getElementById("timer-1sec").addEventListener("click", function() {
    console.log("1秒タイマーが開始されました");
    
    contentDisplay.innerHTML = `
        <h3 style="color: #f39c12; margin-top: 0;">⏳ 1秒タイマー実行中...</h3>
        <p>1秒後にメッセージが表示されます。少しお待ちください...</p>
    `;
    
    // 1秒後に実行
    setTimeout(function() {
        contentDisplay.innerHTML = `
            <h3 style="color: #27ae60; margin-top: 0;">✅ 1秒タイマー完了！</h3>
            <div style="background: linear-gradient(135deg, #27ae60, #2ecc71); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                <h2 style="margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                    1秒が経過しました！
                </h2>
            </div>
            <p style="color: #7f8c8d; margin-top: 15px;">
                setTimeout()が正確に1000ミリ秒後に実行されました
            </p>
        `;
        console.log("1秒タイマーが完了しました");
    }, 1000);
});

// 3秒タイマーボタン
document.getElementById("timer-3sec").addEventListener("click", function() {
    console.log("3秒タイマーが開始されました");
    
    contentDisplay.innerHTML = `
        <h3 style="color: #e67e22; margin-top: 0;">⏳ 3秒タイマー実行中...</h3>
        <p>3秒後にメッセージが表示されます。もう少しお待ちください...</p>
    `;
    
    // 3秒後に実行
    setTimeout(function() {
        contentDisplay.innerHTML = `
            <h3 style="color: #e67e22; margin-top: 0;">✅ 3秒タイマー完了！</h3>
            <div style="background: linear-gradient(135deg, #e67e22, #f39c12); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                <h2 style="margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                    3秒が経過しました！
                </h2>
            </div>
            <p style="color: #7f8c8d; margin-top: 15px;">
                setTimeout()が正確に3000ミリ秒後に実行されました
            </p>
        `;
        console.log("3秒タイマーが完了しました");
    }, 3000);
});

// 5秒タイマーボタン  
document.getElementById("timer-5sec").addEventListener("click", function() {
    console.log("5秒タイマーが開始されました");
    
    contentDisplay.innerHTML = `
        <h3 style="color: #8e44ad; margin-top: 0;">⏳ 5秒タイマー実行中...</h3>
        <p>5秒後にメッセージが表示されます。しばらくお待ちください...</p>
    `;
    
    // 5秒後に実行
    setTimeout(function() {
        contentDisplay.innerHTML = `
            <h3 style="color: #8e44ad; margin-top: 0;">✅ 5秒タイマー完了！</h3>
            <div style="background: linear-gradient(135deg, #8e44ad, #9b59b6); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                <h2 style="margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                    5秒が経過しました！
                </h2>
            </div>
            <p style="color: #7f8c8d; margin-top: 15px;">
                setTimeout()が正確に5000ミリ秒後に実行されました
            </p>
        `;
        console.log("5秒タイマーが完了しました");
    }, 5000);
});

// アニメーション移動ボタン
document.getElementById("move-btn").addEventListener("click", function() {
    console.log("アニメーション移動が開始されました");
    
    // 初期位置に戻す
    movingBox.style.transform = "translateX(0px)";
    movingBox.style.background = "#3498db";
    
    // 3秒後に移動
    setTimeout(function() {
        movingBox.style.transform = "translateX(200px)";
        movingBox.style.background = "#e74c3c";
        console.log("アニメーション移動が完了しました");
    }, 3000);
});

console.log("✅ タイマー基本システムが初期化されました！");
console.log("💡 各ボタンをクリックして、setTimeout()の動作を体験してください！");