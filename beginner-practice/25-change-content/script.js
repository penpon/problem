// 17-change-content: 画面内容変更のデモ

// ランダム名言のリスト
const quotes = [
    "明日は今日とは違う日。",
    "成功は準備と機会が出会うところで生まれる。",
    "夢は逃げない。逃げるのはいつも自分だ。",
    "小さな一歩が大きな変化の始まり。",
    "失敗は成功への階段。"
];

// 色のリスト
const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];

// DOMが読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    
    // === 1. テキスト内容変更 ===
    
    // 挨拶メッセージボタン
    document.getElementById('text-button1').addEventListener('click', function() {
        const textElement = document.getElementById('demo-text');
        textElement.textContent = 'こんにちは！JavaScriptでテキストを変更しました！';
        textElement.className = 'fade-in';
        setTimeout(() => textElement.className = '', 500);
    });
    
    // 時刻表示ボタン
    document.getElementById('text-button2').addEventListener('click', function() {
        const textElement = document.getElementById('demo-text');
        const now = new Date();
        textElement.textContent = `現在の時刻: ${now.toLocaleString()}`;
        textElement.className = 'fade-in';
        setTimeout(() => textElement.className = '', 500);
    });
    
    // ランダム名言ボタン
    document.getElementById('text-button3').addEventListener('click', function() {
        const textElement = document.getElementById('demo-text');
        const randomIndex = Math.floor(Math.random() * quotes.length);
        textElement.textContent = `💡 ${quotes[randomIndex]}`;
        textElement.className = 'fade-in';
        setTimeout(() => textElement.className = '', 500);
    });
    
    // === 2. HTML内容変更 ===
    
    // リスト追加ボタン
    document.getElementById('html-button1').addEventListener('click', function() {
        const htmlElement = document.getElementById('html-content');
        htmlElement.innerHTML = `
            <h3>✨ やることリスト</h3>
            <ul style="padding-left: 20px; margin-top: 10px;">
                <li style="margin-bottom: 5px;">HTMLを学習する ✅</li>
                <li style="margin-bottom: 5px;">CSSを学習する ✅</li>
                <li style="margin-bottom: 5px;">JavaScriptを学習する 📝</li>
                <li style="margin-bottom: 5px;">実用的なサイトを作る 🚀</li>
            </ul>
        `;
        htmlElement.className = 'fade-in';
        setTimeout(() => htmlElement.className = '', 500);
    });
    
    // 進捗表示ボタン
    document.getElementById('html-button2').addEventListener('click', function() {
        const htmlElement = document.getElementById('html-content');
        htmlElement.innerHTML = `
            <div style="text-align: center;">
                <h3>🎯 学習の進捗</h3>
                <div style="display: inline-block; background: #4299e1; color: white; padding: 15px 25px; border-radius: 10px; margin: 10px; font-weight: bold;">HTML: 完了!</div>
                <div style="display: inline-block; background: #48bb78; color: white; padding: 15px 25px; border-radius: 10px; margin: 10px; font-weight: bold;">CSS: 完了!</div>
                <div style="display: inline-block; background: #ed8936; color: white; padding: 15px 25px; border-radius: 10px; margin: 10px; font-weight: bold;">JS: 学習中!</div>
            </div>
        `;
        htmlElement.className = 'fade-in';
        setTimeout(() => htmlElement.className = '', 500);
    });
    
    // リセットボタン
    document.getElementById('reset-button').addEventListener('click', function() {
        const htmlElement = document.getElementById('html-content');
        htmlElement.innerHTML = '<p>ここにHTML内容が追加されます</p>';
        htmlElement.className = 'pulse';
        setTimeout(() => htmlElement.className = '', 500);
    });
    
    // === 3. 画像変更 ===
    
    // 元の画像ボタン
    document.getElementById('image-button1').addEventListener('click', function() {
        const imgElement = document.getElementById('demo-image');
        imgElement.src = '../shared/images/simple-product.svg';
        imgElement.alt = 'デモ画像';
        imgElement.className = 'demo-img fade-in';
        setTimeout(() => imgElement.className = 'demo-img', 500);
    });
    
    // 代替画像ボタン
    document.getElementById('image-button2').addEventListener('click', function() {
        const imgElement = document.getElementById('demo-image');
        // プレースホルダー画像サービスを使用
        imgElement.src = 'https://via.placeholder.com/200x200/667eea/white?text=JavaScript';
        imgElement.alt = 'JavaScript画像';
        imgElement.className = 'demo-img fade-in';
        setTimeout(() => imgElement.className = 'demo-img', 500);
    });
    
    // === 4. スタイル変更 ===
    
    // 色変更ボタン
    document.getElementById('color-button').addEventListener('click', function() {
        const styleElement = document.getElementById('style-demo');
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        styleElement.style.backgroundColor = randomColor;
        styleElement.style.transform = 'scale(1.1)';
        styleElement.textContent = `色が ${randomColor} に変わりました！`;
        
        setTimeout(() => {
            styleElement.style.transform = 'scale(1)';
        }, 300);
    });
    
    // サイズ変更ボタン
    document.getElementById('size-button').addEventListener('click', function() {
        const styleElement = document.getElementById('style-demo');
        const currentScale = styleElement.style.transform || 'scale(1)';
        const isLarge = currentScale.includes('1.2');
        
        if (isLarge) {
            styleElement.style.transform = 'scale(1)';
            styleElement.style.fontSize = '1.2rem';
            styleElement.textContent = '通常のサイズに戻りました';
        } else {
            styleElement.style.transform = 'scale(1.2)';
            styleElement.style.fontSize = '1.4rem';
            styleElement.textContent = 'サイズが大きくなりました！';
        }
    });
    
    // 枠線変更ボタン
    document.getElementById('border-button').addEventListener('click', function() {
        const styleElement = document.getElementById('style-demo');
        const borders = [
            '3px solid #ff6b6b',
            '5px dashed #4ecdc4',
            '4px dotted #45b7d1',
            '6px double #96ceb4',
            '2px solid #feca57'
        ];
        
        const randomBorder = borders[Math.floor(Math.random() * borders.length)];
        styleElement.style.border = randomBorder;
        styleElement.style.borderRadius = '15px';
        styleElement.textContent = '枠線のスタイルが変わりました！';
        
        styleElement.className = 'style-box pulse';
        setTimeout(() => styleElement.className = 'style-box', 500);
    });
});

// ページ読み込み完了時の初期メッセージ
console.log('🎯 ステップ17: 画面内容変更のスクリプトが読み込まれました！');
console.log('💡 F12でコンソールを開いて、DOM操作の様子を確認してみましょう！');