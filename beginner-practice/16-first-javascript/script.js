// 初めてのJavaScript

// DOMが読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    
    // ボタンがクリックされた時の処理
    document.getElementById('helloButton').addEventListener('click', function() {
        alert('🎉 こんにちは！これが初めてのJavaScriptです！\n\nおめでとうございます！あなたは初めてのJavaScriptプログラムを動かしました！');
    });
});

// コンソールに初期メッセージを表示
console.log('🚀 JavaScriptファイルが読み込まれました！');
console.log('💡 ボタンをクリックしてJavaScriptの動作を確認してみましょう！');