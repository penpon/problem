// 初めてのJavaScript

// カウンター変数
let counter = 0;

// DOMが読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. アラートボタン
    document.getElementById('alertButton').addEventListener('click', function() {
        alert('こんにちは！これが初めてのJavaScriptです！');
    });
    
    // 2. コンソールボタン
    document.getElementById('consoleButton').addEventListener('click', function() {
        console.log('コンソールに出力されました！');
        console.log('現在の時刻:', new Date());
    });
    
    // 3. 背景色変更ボタン
    document.getElementById('colorButton').addEventListener('click', function() {
        const colors = ['#ff9999', '#99ff99', '#9999ff', '#ffff99', '#ff99ff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;
    });
    
    // 4. カウンター増加ボタン
    document.getElementById('increaseButton').addEventListener('click', function() {
        counter++;
        document.getElementById('counter').textContent = counter;
    });
    
    // 5. カウンター減少ボタン
    document.getElementById('decreaseButton').addEventListener('click', function() {
        counter--;
        document.getElementById('counter').textContent = counter;
    });
    
    // 6. カウンターリセットボタン
    document.getElementById('resetButton').addEventListener('click', function() {
        counter = 0;
        document.getElementById('counter').textContent = counter;
    });
    
    // 7. メッセージ表示ボタン
    document.getElementById('showMessageButton').addEventListener('click', function() {
        document.getElementById('message').style.display = 'block';
    });
    
    // 8. メッセージ非表示ボタン
    document.getElementById('hideMessageButton').addEventListener('click', function() {
        document.getElementById('message').style.display = 'none';
    });
});

// コンソールに初期メッセージを表示
console.log('JavaScriptファイルが読み込まれました！');