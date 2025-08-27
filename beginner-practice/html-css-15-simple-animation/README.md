# 簡単なアニメーション

## 🎯 学習目標

**transitionで滑らかな変化を作り、keyframesで基本的なアニメーションを実装する**

- transitionで要素の変化を滑らかにする
- hover時のアニメーション効果を作る
- @keyframesで自動的に動くアニメーションを作る
- timing-functionでアニメーションの速度曲線を調整する

## 📝 学習内容

### **今回学ぶCSS**
- **transition**：要素の変化を滑らかにする
  - `property duration timing-function delay`
  - `all 0.3s ease 0s`
- **@keyframes**：アニメーションの動きを定義
- **animation**：keyframesアニメーションを適用
  - `name duration timing-function delay iteration-count`
- **transform**：要素を変形・移動

### **前回の復習**
- box-shadow（影の作成）
- border-radius（角丸）
- hover疑似クラス

### **重要なポイント**
1. **transition**は状態変化（hover等）をなめらかにする
2. **@keyframes**は自動的に繰り返すアニメーションを作る
3. **transform**は要素の位置・大きさ・回転を変更する

## 🔍 transitionの構文

### **基本構文**
```css
transition: プロパティ 時間 速度曲線 遅延;
transition: all 0.3s ease 0s;
```

### **個別指定**
```css
transition-property: transform;
transition-duration: 0.5s;
transition-timing-function: ease-in-out;
transition-delay: 0.1s;
```

### **複数プロパティ**
```css
transition: 
    transform 0.3s ease,
    background-color 0.2s ease,
    box-shadow 0.3s ease;
```

## 🔍 コードの説明

### **HTML（index.html）**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <title>簡単なアニメーション</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>アニメーションの練習</h1>
    
    <h2>1. 基本的なtransition</h2>
    <div class="hover-container">
        <div class="basic-hover">基本のホバー効果</div>
        <div class="color-change">色が変わります</div>
        <div class="size-change">サイズが変わります</div>
    </div>
    
    <h2>2. transform による変形</h2>
    <div class="transform-container">
        <div class="move-box">移動します</div>
        <div class="rotate-box">回転します</div>
        <div class="scale-box">拡大します</div>
    </div>
    
    <h2>3. 複合的な変化</h2>
    <div class="complex-container">
        <div class="complex-card">
            <h3>複合カード</h3>
            <p>複数の効果が同時に変化します</p>
        </div>
        
        <div class="floating-card">
            <h3>浮き上がるカード</h3>
            <p>影と位置が変化します</p>
        </div>
    </div>
    
    <h2>4. @keyframes アニメーション</h2>
    <div class="keyframes-container">
        <div class="bounce-box">跳ねる動き</div>
        <div class="fade-box">点滅します</div>
        <div class="slide-box">左右に動きます</div>
    </div>
    
    <h2>5. 実用例：ボタンアニメーション</h2>
    <div class="button-container">
        <button class="primary-button">メインボタン</button>
        <button class="secondary-button">サブボタン</button>
        <button class="success-button">成功ボタン</button>
    </div>
    
    <h2>6. ローディングアニメーション</h2>
    <div class="loading-container">
        <div class="spinner"></div>
        <div class="dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
        <div class="progress-bar">
            <div class="progress"></div>
        </div>
    </div>
</body>
</html>
```

### **CSS（style.css）**
```css
/* 簡単なアニメーション - transitionとkeyframesの基本 */

/* 基本スタイル */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: white;
}

h1 {
    text-align: center;
    color: white;
    margin-bottom: 40px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

h2 {
    color: #f8f9fa;
    margin-top: 50px;
    margin-bottom: 20px;
    border-left: 4px solid #ffd700;
    padding-left: 15px;
}

h3 {
    margin-top: 0;
    color: #2c3e50;
}

/* コンテナ */
.hover-container, .transform-container, .complex-container, 
.keyframes-container, .button-container, .loading-container {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
    margin: 30px 0;
}

/* 1. 基本的なtransition */
.basic-hover {
    background-color: rgba(255,255,255,0.9);
    color: #333;
    padding: 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.basic-hover:hover {
    background-color: #3498db;
    color: white;
    transform: translateY(-5px);
}

.color-change {
    background-color: #e74c3c;
    color: white;
    padding: 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.5s ease;
}

.color-change:hover {
    background-color: #27ae60;
}

.size-change {
    background-color: #9b59b6;
    color: white;
    padding: 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.size-change:hover {
    transform: scale(1.1);
}

/* 2. transform による変形 */
.move-box {
    background-color: rgba(255,255,255,0.9);
    color: #333;
    padding: 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.4s ease;
}

.move-box:hover {
    transform: translateX(20px);
}

.rotate-box {
    background-color: rgba(255,255,255,0.9);
    color: #333;
    padding: 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.5s ease;
}

.rotate-box:hover {
    transform: rotate(15deg);
}

.scale-box {
    background-color: rgba(255,255,255,0.9);
    color: #333;
    padding: 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.scale-box:hover {
    transform: scale(1.2);
}

/* 3. 複合的な変化 */
.complex-card {
    background-color: white;
    color: #333;
    padding: 25px;
    border-radius: 15px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    width: 200px;
}

.complex-card:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
    color: white;
}

.floating-card {
    background-color: white;
    color: #333;
    padding: 25px;
    border-radius: 15px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    width: 200px;
}

.floating-card:hover {
    transform: translateY(-20px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

/* 4. @keyframes アニメーション */
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

.bounce-box {
    background-color: #f39c12;
    color: white;
    padding: 20px;
    border-radius: 8px;
    animation: bounce 2s infinite;
}

@keyframes fade {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}

.fade-box {
    background-color: #e74c3c;
    color: white;
    padding: 20px;
    border-radius: 8px;
    animation: fade 1.5s infinite;
}

@keyframes slide {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(30px); }
}

.slide-box {
    background-color: #2ecc71;
    color: white;
    padding: 20px;
    border-radius: 8px;
    animation: slide 3s infinite;
}

/* 5. ボタンアニメーション */
.primary-button, .secondary-button, .success-button {
    padding: 15px 30px;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 5px;
}

.primary-button {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
}

.primary-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.secondary-button {
    background: transparent;
    color: white;
    border: 2px solid white;
}

.secondary-button:hover {
    background: white;
    color: #764ba2;
    transform: scale(1.05);
}

.success-button {
    background: linear-gradient(135deg, #56ab2f, #a8e6cf);
    color: white;
}

.success-button:hover {
    background: linear-gradient(135deg, #a8e6cf, #56ab2f);
    transform: scale(0.95);
}

/* 6. ローディングアニメーション */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255,255,255,0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes dot-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

.dots {
    display: flex;
    gap: 5px;
}

.dot {
    width: 12px;
    height: 12px;
    background-color: white;
    border-radius: 50%;
    animation: dot-bounce 1.4s infinite;
}

.dot:nth-child(2) {
    animation-delay: 0.2s;
}

.dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes progress {
    0% { width: 0%; }
    100% { width: 100%; }
}

.progress-bar {
    width: 200px;
    height: 8px;
    background-color: rgba(255,255,255,0.3);
    border-radius: 4px;
    overflow: hidden;
}

.progress {
    height: 100%;
    background: linear-gradient(90deg, #ffd700, #ff6b6b);
    border-radius: 4px;
    animation: progress 3s infinite;
}
```

## 🎨 transformの種類

### **主な変形**
- **`translateX(20px)`**：X方向（横）に移動
- **`translateY(-10px)`**：Y方向（縦）に移動
- **`scale(1.2)`**：拡大・縮小（1.2倍）
- **`rotate(45deg)`**：回転（45度）

### **複合変形**
```css
transform: translateY(-10px) scale(1.1) rotate(5deg);
```

## ⏱ timing-functionの種類

### **主な速度曲線**
- **`ease`**：ゆっくり始まって、速くなって、ゆっくり終わる（デフォルト）
- **`linear`**：一定速度
- **`ease-in`**：ゆっくり始まって、だんだん速くなる
- **`ease-out`**：速く始まって、だんだん遅くなる
- **`ease-in-out`**：ゆっくり始まって、ゆっくり終わる

### **カスタム曲線**
```css
transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

## 🚀 実践してみよう

### **手順1: ファイルを開く**
`12-simple-animation/index.html` をブラウザで開いてください。

### **手順2: 各アニメーションの確認**
- **基本transition**：ホバーした時の色・サイズの変化
- **transform変形**：移動・回転・拡大の効果
- **複合カード**：複数の効果が同時に変化
- **keyframesアニメーション**：自動的に動き続ける要素
- **ボタンアニメーション**：実用的なボタン効果
- **ローディング**：スピナー・ドット・プログレスバー

### **手順3: 動きの観察**
各要素の動きの速度や曲線に注目してください。

## ✨ 試してみよう

以下を変更して、変化を確認してみましょう：

### **1. アニメーション時間の調整**
```css
.slow-animation {
    transition: all 2s ease;  /* 2秒でゆっくり変化 */
}
```

### **2. 新しいkeyframes**
```css
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

.pulse-box {
    animation: pulse 1s infinite;
}
```

### **3. 遅延効果**
```css
.delayed-animation {
    transition: all 0.5s ease 0.3s;  /* 0.3秒待ってから開始 */
}
```

## 📖 豆知識

### **will-changeでパフォーマンス向上**
```css
.animated-element {
    will-change: transform;  /* ブラウザに最適化を指示 */
    transition: transform 0.3s ease;
}
```

### **reduced-motionでアクセシビリティ対応**
```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

### **3D変形も使える**
```css
transform: 
    perspective(1000px) 
    rotateX(10deg) 
    rotateY(20deg);
```

## ⚠️ よくある間違い

### **1. transitionし過ぎ**
```css
/* 間違い：全てをアニメーション */
* {
    transition: all 0.3s ease;
}

/* 正しい：必要な要素のみ */
.button {
    transition: transform 0.2s ease;
}
```

### **2. アニメーション時間が長すぎ**
```css
/* 遅すぎ：ユーザーを待たせる */
.slow {
    transition: all 3s ease;
}

/* 適切：素早くレスポンシブ */
.good {
    transition: all 0.3s ease;
}
```

### **3. 不適切なプロパティをアニメーション**
```css
/* 重い：レイアウトが変化する */
.bad {
    transition: width 0.3s ease;
}

/* 軽い：transformを使用 */
.good {
    transition: transform 0.3s ease;
}
```

## 🎯 パフォーマンス向上のコツ

### **1. transformとopacityを優先**
```css
/* 高速 */
.fast {
    transform: translateY(-10px);
    opacity: 0.8;
}

/* 重い */
.slow {
    top: 10px;
    width: 200px;
}
```

### **2. animation-fill-modeの活用**
```css
.slide-in {
    animation: slideIn 0.5s ease forwards;
}

@keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}
```

## ✅ この学習でできるようになること

- [ ] transitionで要素の変化を滑らかにできる
- [ ] hover時に美しいアニメーション効果を作れる
- [ ] @keyframesで自動的に動くアニメーションを作れる
- [ ] transformで要素を移動・回転・拡大できる
- [ ] 複数の効果を組み合わせて複合的なアニメーションを作れる
- [ ] timing-functionで動きの速度曲線を調整できる
- [ ] 実用的なボタンやローディングアニメーションを作れる

## 📚 次の学習

次は **Flexbox基礎** で現代的なレイアウト手法を学びます！

---

**🎉 アニメーションが使えるようになりました！サイトに生き生きとした動きを加えられますね！**