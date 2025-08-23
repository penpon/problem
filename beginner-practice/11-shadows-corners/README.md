# ステップ11: 影と角丸

## 🎯 学習目標

**box-shadowで影をつけ、border-radiusで角を丸くして美しいデザインを作る**

- box-shadowで要素に影をつける方法を学ぶ
- border-radiusで角を丸くする方法を理解する
- 複数の影を組み合わせて深度感を作る
- 影と角丸を使った現代的なカードデザインを作る

## 📝 学習内容

### **今回学ぶCSS**
- **box-shadow**：要素に影をつける
  - `水平位置 垂直位置 ぼかし 拡がり 色`
  - `inset`で内側の影
- **border-radius**：角を丸くする
  - `5px`：全ての角
  - `10px 20px`：対角線で異なる値
  - `50%`：完全な円形

### **前回の復習**
- display（block、inline、inline-block）
- float（要素を左右に配置）
- clear（回り込み解除）

### **重要なポイント**
1. **box-shadow**は重ねて使うことで立体感を出せる
2. **border-radius**は角の丸さを調整できる
3. **影と角丸**を組み合わせると現代的なデザインになる

## 🔍 box-shadowの構文

### **基本構文**
```css
box-shadow: 水平位置 垂直位置 ぼかし 拡がり 色;
box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);
```

### **各値の意味**
- **水平位置**：右方向への移動（負の値で左）
- **垂直位置**：下方向への移動（負の値で上）
- **ぼかし**：影のぼけ具合（大きいほどぼやける）
- **拡がり**：影の大きさ（省略可能）
- **色**：影の色（rgba推奨）

### **複数の影**
```css
box-shadow: 
    2px 2px 5px rgba(0,0,0,0.2),
    0px 0px 20px rgba(0,0,0,0.1);
```

## 🔍 コードの説明

### **HTML（index.html）**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <title>影と角丸</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>影と角丸の練習</h1>
    
    <h2>1. 基本的な影</h2>
    <div class="basic-shadow">基本的な影です</div>
    <div class="soft-shadow">柔らかい影です</div>
    <div class="dark-shadow">濃い影です</div>
    
    <h2>2. 角丸の基本</h2>
    <div class="small-radius">小さな角丸</div>
    <div class="large-radius">大きな角丸</div>
    <div class="circle">円形</div>
    
    <h2>3. 影と角丸の組み合わせ</h2>
    <div class="card-basic">
        <h3>基本カード</h3>
        <p>影と角丸を組み合わせた美しいカードです。</p>
    </div>
    
    <div class="card-elevated">
        <h3>浮き上がるカード</h3>
        <p>より立体的な影でカードが浮き上がって見えます。</p>
    </div>
    
    <h2>4. 複数の影</h2>
    <div class="multi-shadow">
        <h3>多層の影</h3>
        <p>複数の影を重ねて深度感を表現しています。</p>
    </div>
    
    <h2>5. 内側の影</h2>
    <div class="inset-shadow">
        <h3>くぼんだ効果</h3>
        <p>insetを使って内側に影をつけています。</p>
    </div>
    
    <h2>6. 実用例：商品カード</h2>
    <div class="product-grid">
        <div class="product-card">
            <div class="product-image"></div>
            <h3>商品A</h3>
            <p class="price">¥1,200</p>
            <p>美しい影と角丸のカードデザイン</p>
        </div>
        
        <div class="product-card">
            <div class="product-image"></div>
            <h3>商品B</h3>
            <p class="price">¥1,800</p>
            <p>ホバー時に影が変化します</p>
        </div>
    </div>
</body>
</html>
```

### **CSS（style.css）**
```css
/* 影と角丸 - box-shadowとborder-radiusの基本 */

/* 基本スタイル */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
}

h1 {
    text-align: center;
    color: #2c3e50;
    border-bottom: none;
    padding-bottom: 15px;
    margin-bottom: 40px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

h2 {
    color: #34495e;
    margin-top: 50px;
    margin-bottom: 20px;
    border-left: 4px solid #3498db;
    padding-left: 15px;
}

h3 {
    margin-top: 0;
    color: #2c3e50;
}

/* 1. 基本的な影 */
.basic-shadow {
    background-color: white;
    padding: 20px;
    margin: 20px 0;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
}

.soft-shadow {
    background-color: white;
    padding: 20px;
    margin: 20px 0;
    box-shadow: 0px 4px 15px rgba(0,0,0,0.1);
}

.dark-shadow {
    background-color: white;
    padding: 20px;
    margin: 20px 0;
    box-shadow: 3px 3px 10px rgba(0,0,0,0.4);
}

/* 2. 角丸の基本 */
.small-radius {
    background-color: #e8f4f8;
    padding: 20px;
    margin: 20px 0;
    border-radius: 8px;
    border: 2px solid #3498db;
}

.large-radius {
    background-color: #f0e8ff;
    padding: 20px;
    margin: 20px 0;
    border-radius: 25px;
    border: 2px solid #9b59b6;
}

.circle {
    background-color: #fef9e7;
    padding: 30px;
    margin: 20px auto;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #f39c12;
}

/* 3. 影と角丸の組み合わせ */
.card-basic {
    background-color: white;
    padding: 25px;
    margin: 20px auto;
    max-width: 400px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.card-elevated {
    background-color: white;
    padding: 25px;
    margin: 20px auto;
    max-width: 400px;
    border-radius: 15px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    transform: translateY(-2px);
}

/* 4. 複数の影 */
.multi-shadow {
    background-color: white;
    padding: 25px;
    margin: 30px auto;
    max-width: 400px;
    border-radius: 12px;
    box-shadow: 
        0 2px 4px rgba(0,0,0,0.1),
        0 8px 16px rgba(0,0,0,0.1),
        0 16px 32px rgba(0,0,0,0.05);
}

/* 5. 内側の影 */
.inset-shadow {
    background-color: #ecf0f1;
    padding: 25px;
    margin: 20px auto;
    max-width: 400px;
    border-radius: 10px;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
    border: 1px solid #bdc3c7;
}

/* 6. 実用例：商品カード */
.product-grid {
    display: flex;
    gap: 30px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 30px;
}

.product-card {
    background-color: white;
    border-radius: 15px;
    padding: 20px;
    width: 200px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
}

.product-card:hover {
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    transform: translateY(-5px);
}

.product-image {
    width: 100%;
    height: 120px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    border-radius: 10px;
    margin-bottom: 15px;
}

.price {
    color: #e74c3c;
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0;
}

.product-card p {
    color: #7f8c8d;
    margin: 10px 0 0 0;
    font-size: 14px;
}
```

## 🎨 border-radiusの詳細

### **1. 全ての角に同じ値**
```css
border-radius: 10px;
```

### **2. 各角を個別に指定**
```css
border-radius: 5px 10px 15px 20px;
/* 左上 右上 右下 左下 の順 */
```

### **3. 縦横で異なる丸み**
```css
border-radius: 20px / 10px;
/* 横方向20px、縦方向10px */
```

### **4. 完全な円形**
```css
.circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
```

## 🌟 box-shadowのテクニック

### **1. 上方向の影**
```css
box-shadow: 0 -2px 5px rgba(0,0,0,0.2);
```

### **2. 光る効果**
```css
box-shadow: 0 0 20px rgba(52, 152, 219, 0.5);
```

### **3. 押し込まれた効果**
```css
box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
```

## 🚀 実践してみよう

### **手順1: ファイルを開く**
`11-shadows-corners/index.html` をブラウザで開いてください。

### **手順2: 各効果の確認**
- **基本的な影**：影の濃さと位置の違い
- **角丸の基本**：小さな角丸から円形まで
- **カードデザイン**：影と角丸の組み合わせ効果
- **複数の影**：重なった影の深度感
- **商品カード**：ホバー時の影の変化

### **手順3: ホバー効果の確認**
商品カードにマウスを乗せて、影の変化を確認してください。

## ✨ 試してみよう

以下を変更して、変化を確認してみましょう：

### **1. 影の色を変更**
```css
.colorful-shadow {
    box-shadow: 5px 5px 15px rgba(255, 0, 0, 0.3);
}
```

### **2. 非対称な角丸**
```css
.asymmetric-radius {
    border-radius: 0 20px 0 20px;
}
```

### **3. 光る効果のカード**
```css
.glowing-card {
    box-shadow: 
        0 0 20px rgba(52, 152, 219, 0.3),
        0 4px 15px rgba(0,0,0,0.1);
}
```

## 📖 豆知識

### **影の最適化**
```css
/* 良い例：透明度を使用 */
box-shadow: 0 2px 4px rgba(0,0,0,0.1);

/* 避ける例：不透明な色 */
box-shadow: 0 2px 4px gray;
```

### **モバイル対応**
```css
/* モバイルでは影を軽く */
@media (max-width: 768px) {
    .card {
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
}
```

### **パフォーマンス**
多数の要素に複雑な影をつけると重くなるため、必要な場所にのみ使用しましょう。

## ⚠️ よくある間違い

### **1. 影が濃すぎる**
```css
/* 間違い：影が目立ちすぎ */
box-shadow: 5px 5px 5px black;

/* 正しい：適度な透明度 */
box-shadow: 5px 5px 15px rgba(0,0,0,0.2);
```

### **2. border-radiusの単位忘れ**
```css
/* 間違い */
border-radius: 10;

/* 正しい */
border-radius: 10px;
```

### **3. 影の方向が不自然**
```css
/* 不自然：光源が複数方向 */
.bad {
    box-shadow: 
        5px 5px 10px rgba(0,0,0,0.2),
        -5px -5px 10px rgba(0,0,0,0.2);
}

/* 自然：一方向からの光 */
.good {
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
```

## ✅ このステップでできるようになること

- [ ] box-shadowで要素に美しい影をつけられる
- [ ] border-radiusで角を丸くできる
- [ ] 複数の影を組み合わせて深度感を作れる
- [ ] 内側の影（inset）を使える
- [ ] 現代的なカードデザインを作れる
- [ ] ホバー効果と組み合わせて動的な表現ができる

## 📚 次のステップ

次は **ステップ12: 簡単なアニメーション** で `transition` と `keyframes` を学びます！

---

**🎉 影と角丸が使えるようになりました！要素に立体感と美しさを加えられますね！**