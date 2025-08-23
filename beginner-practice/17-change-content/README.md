# ステップ17: 画面内容変更（DOM操作）

## 🎯 学習目標

**JavaScriptでHTMLの内容を動的に変更する基本的なDOM操作を習得する**

- getElementById()でHTML要素を取得する方法を理解する
- innerHTML、textContent、srcプロパティで要素の内容を変更する
- JavaScriptでCSSスタイルを動的に変更する方法を学ぶ
- ユーザーの操作に応じて画面の内容をリアルタイムで更新する

## 📝 学習内容

### **今回学ぶJavaScript**
- **document.getElementById()**：IDで要素を取得
- **element.innerHTML**：HTML内容の変更
- **element.textContent**：テキスト内容のみ変更
- **element.src**：画像のソースを変更
- **element.style**：CSSスタイルを動的変更
- **配列とMath.random()**：ランダムな要素の選択

### **前回の復習**
- JavaScriptファイルの作成とHTMLへの読み込み
- addEventListener()でイベント処理
- console.log()とalert()の使い方

### **重要なポイント**
1. **DOM操作**でHTMLを動的に変更できる
2. **innerHTML**はHTMLタグも反映される
3. **textContent**はテキストのみ変更（セキュアな方法）
4. **style**プロパティで直接CSSを操作可能

## 🔍 DOM（Document Object Model）とは？

### **DOMの概念**
- **D**ocument（文書）
- **O**bject（オブジェクト）
- **M**odel（モデル）

**DOM**は、HTMLをJavaScriptで操作するための仕組みです。

### **操作できる要素**
- テキスト内容
- HTML構造
- 画像のソース
- CSSスタイル
- 要素の表示・非表示

## 🔍 コードの説明

### **HTML（index.html）**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>画面内容変更</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>画面内容変更デモ</h1>
    
    <div class="demo-container">
        <!-- 1. テキスト内容変更 -->
        <div class="demo-section">
            <h2>1. テキスト内容変更</h2>
            <p id="demo-text">ここのテキストが変わります</p>
            <div class="button-group">
                <button id="text-button1" class="demo-button">挨拶メッセージ</button>
                <button id="text-button2" class="demo-button">時刻表示</button>
                <button id="text-button3" class="demo-button">ランダム名言</button>
            </div>
        </div>
        
        <!-- 2. HTML内容変更 -->
        <div class="demo-section">
            <h2>2. HTML内容変更</h2>
            <div id="html-content">
                <p>ここにHTML内容が追加されます</p>
            </div>
            <div class="button-group">
                <button id="html-button1" class="demo-button">リスト追加</button>
                <button id="html-button2" class="demo-button">画像追加</button>
                <button id="reset-button" class="demo-button reset">リセット</button>
            </div>
        </div>
        
        <!-- 3. 画像変更 -->
        <div class="demo-section">
            <h2>3. 画像変更</h2>
            <img id="demo-image" src="../shared/images/simple-product.svg" alt="デモ画像" class="demo-img">
            <div class="button-group">
                <button id="image-button1" class="demo-button">元の画像</button>
                <button id="image-button2" class="demo-button">代替画像</button>
            </div>
        </div>
        
        <!-- 4. スタイル変更 -->
        <div class="demo-section">
            <h2>4. スタイル変更</h2>
            <div id="style-demo" class="style-box">
                スタイルが変更されます
            </div>
            <div class="button-group">
                <button id="color-button" class="demo-button">色変更</button>
                <button id="size-button" class="demo-button">サイズ変更</button>
                <button id="border-button" class="demo-button">枠線変更</button>
            </div>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
```

### **JavaScript（script.js）**
```javascript
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
            <ul style=\"padding-left: 20px; margin-top: 10px;\">
                <li style=\"margin-bottom: 5px;\">HTMLを学習する ✅</li>
                <li style=\"margin-bottom: 5px;\">CSSを学習する ✅</li>
                <li style=\"margin-bottom: 5px;\">JavaScriptを学習する 📝</li>
                <li style=\"margin-bottom: 5px;\">実用的なサイトを作る 🚀</li>
            </ul>
        `;
        htmlElement.className = 'fade-in';
        setTimeout(() => htmlElement.className = '', 500);
    });
    
    // 画像追加ボタン
    document.getElementById('html-button2').addEventListener('click', function() {
        const htmlElement = document.getElementById('html-content');
        htmlElement.innerHTML = `
            <div style=\"text-align: center;\">
                <h3>🎯 学習の進捗</h3>
                <div style=\"display: inline-block; background: #4299e1; color: white; padding: 15px 25px; border-radius: 10px; margin: 10px; font-weight: bold;\">HTML: 完了!</div>
                <div style=\"display: inline-block; background: #48bb78; color: white; padding: 15px 25px; border-radius: 10px; margin: 10px; font-weight: bold;\">CSS: 完了!</div>
                <div style=\"display: inline-block; background: #ed8936; color: white; padding: 15px 25px; border-radius: 10px; margin: 10px; font-weight: bold;\">JS: 学習中!</div>
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
```

## 🔍 DOM操作の基本メソッド

### **1. 要素の取得**
```javascript
// IDで取得
const element = document.getElementById('myId');

// クラスで取得（最初の要素）
const element = document.querySelector('.myClass');

// タグで取得（最初の要素）
const element = document.querySelector('p');
```

### **2. 内容の変更**
```javascript
// テキスト内容のみ変更（安全）
element.textContent = '新しいテキスト';

// HTML内容も変更（HTMLタグ含む）
element.innerHTML = '<strong>強調テキスト</strong>';

// 画像のソース変更
image.src = 'new-image.jpg';
```

### **3. スタイルの変更**
```javascript
// 背景色を変更
element.style.backgroundColor = '#ff6b6b';

// フォントサイズを変更
element.style.fontSize = '20px';

// 複数のスタイルを変更
element.style.cssText = 'color: red; font-size: 18px; font-weight: bold;';
```

## 🚀 実践してみよう

### **手順1: ファイルを開く**
`17-change-content/index.html` をブラウザで開いてください。

### **手順2: 各機能の確認**
1. **テキスト内容変更**：3つのボタンで異なる内容に変更
2. **HTML内容変更**：HTMLタグを含む内容を追加
3. **画像変更**：画像のソースを動的に変更
4. **スタイル変更**：色、サイズ、枠線を動的に変更

### **手順3: コンソールの活用**
F12でコンソールを開き、以下を試してみましょう：
```javascript
// 直接テキストを変更
document.getElementById('demo-text').textContent = 'コンソールから変更！';

// 直接スタイルを変更
document.getElementById('style-demo').style.backgroundColor = 'purple';
```

## ✨ 試してみよう

以下を変更して、変化を確認してみましょう：

### **1. 新しい名言を追加**
```javascript
const quotes = [
    "明日は今日とは違う日。",
    "成功は準備と機会が出会うところで生まれる。",
    "あなただけの名言をここに追加！"  // ← 新しい名言
];
```

### **2. 新しい色を追加**
```javascript
const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#yourColor'];  // ← お気に入りの色
```

### **3. 新しいボタンと機能を追加**
HTML:
```html
<button id="new-button" class="demo-button">新機能</button>
```

JavaScript:
```javascript
document.getElementById('new-button').addEventListener('click', function() {
    document.getElementById('demo-text').innerHTML = '<em>新しい機能が追加されました！</em>';
});
```

## 📖 豆知識

### **textContentとinnerHTMLの違い**
```javascript
// textContent: テキストのみ（HTMLタグは文字として表示）
element.textContent = '<strong>太字</strong>';  // → <strong>太字</strong>

// innerHTML: HTMLタグも解釈される
element.innerHTML = '<strong>太字</strong>';   // → 太字（太字で表示）
```

### **セキュリティの考慮**
```javascript
// 安全：ユーザー入力をテキストとして扱う
element.textContent = userInput;

// 注意：ユーザー入力をHTMLとして扱う（XSS攻撃のリスク）
element.innerHTML = userInput;  // 危険！
```

### **スタイルプロパティの命名規則**
```javascript
// CSS: background-color
element.style.backgroundColor = 'red';  // ← キャメルケース

// CSS: font-size
element.style.fontSize = '18px';        // ← キャメルケース

// CSS: border-radius
element.style.borderRadius = '10px';    // ← キャメルケース
```

## ⚠️ よくある間違い

### **1. 要素が存在しない**
```javascript
// 間違い：要素の存在確認をしない
const element = document.getElementById('nonexistent');
element.textContent = 'テキスト';  // エラー！

// 正しい：存在確認をする
const element = document.getElementById('myElement');
if (element) {
    element.textContent = 'テキスト';
}
```

### **2. DOMContentLoadedより前に実行**
```javascript
// 間違い：HTMLが読み込まれる前に実行
document.getElementById('myButton').addEventListener(...);

// 正しい：HTMLが読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('myButton').addEventListener(...);
});
```

### **3. スタイルプロパティの単位忘れ**
```javascript
// 間違い：単位がない
element.style.fontSize = 20;        // 効果なし
element.style.width = 200;          // 効果なし

// 正しい：単位をつける
element.style.fontSize = '20px';
element.style.width = '200px';
```

## 🎯 DOM操作の活用例

### **1. フォームバリデーション**
```javascript
const emailInput = document.getElementById('email');
const errorMessage = document.getElementById('error');

if (!emailInput.value.includes('@')) {
    errorMessage.textContent = 'メールアドレスが正しくありません';
    errorMessage.style.color = 'red';
}
```

### **2. 動的リスト生成**
```javascript
const items = ['項目1', '項目2', '項目3'];
const listHTML = items.map(item => `<li>${item}</li>`).join('');
document.getElementById('list').innerHTML = `<ul>${listHTML}</ul>`;
```

### **3. テーマ切り替え**
```javascript
const body = document.body;
if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
}
```

## ✅ このステップでできるようになること

- [ ] document.getElementById()でHTML要素を正確に取得できる
- [ ] textContentでテキスト内容を安全に変更できる
- [ ] innerHTMLでHTML構造を含む内容を変更できる
- [ ] 画像のsrcプロパティを動的に変更できる
- [ ] element.styleでCSSプロパティを動的に変更できる
- [ ] 配列とMath.random()でランダムな要素を選択できる
- [ ] DOM操作と組み合わせたアニメーション効果を実装できる
- [ ] セキュリティを考慮したDOM操作を理解している
- [ ] コンソールでの直接DOM操作を試せる
- [ ] 実用的なユーザーインタラクションを実装できる

## 📚 次のステップ

次は **ステップ18: 簡単計算機** で入力フォームからの値の取得と計算処理、エラーハンドリングの基本を習得します！

---

**🎉 DOM操作の基本をマスターしました！JavaScriptでHTMLの内容を自由に変更できるようになり、動的なWebページ作成への大きな一歩を踏み出しましたね！**