# 中央寄せ

## 🎯 学習目標

**要素を画面の中央に配置する方法を覚える**

- text-alignでテキストを中央に配置する
- margin: 0 autoでブロック要素を中央に配置する
- widthプロパティと組み合わせた中央寄せを理解する
- 見栄えの良い中央寄せレイアウトを作る

## 📝 学習内容

### **今回学ぶCSS**
- **text-align**：テキストの配置を指定
  - `center`：中央寄せ
  - `left`：左寄せ（デフォルト）
  - `right`：右寄せ
- **margin: 0 auto**：ブロック要素の中央寄せ
- **width**：要素の幅を指定

### **前回の復習**
- border（境界線）
- background-color（背景色）
- padding（内側の余白）

### **重要なポイント**
1. **text-align: center**はテキストや画像を中央寄せ
2. **margin: 0 auto**はボックス自体を中央寄せ
3. **width**を指定しないとmargin: 0 autoは効かない

## 🔍 中央寄せの種類

### **1. テキストの中央寄せ**
```css
.center-text {
    text-align: center;
}
```
- 文字や画像を中央に配置

### **2. ボックスの中央寄せ**
```css
.center-box {
    width: 300px;
    margin: 0 auto;
}
```
- 要素全体を中央に配置

### **3. 両方の組み合わせ**
```css
.center-everything {
    width: 400px;
    margin: 0 auto;
    text-align: center;
}
```
- ボックスも中身も中央寄せ

## 🔍 コードの説明

### **HTML（index.html）**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <title>中央寄せの練習</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>中央寄せの練習</h1>
    
    <h2>1. テキストの中央寄せ</h2>
    <p class="center-text">この文字は中央に配置されています</p>
    <p class="center-text">画像も中央に配置できます</p>
    <img src="../shared/images/simple-product.svg" alt="中央配置の画像" class="center-image">
    
    <h2>2. ボックスの中央寄せ</h2>
    <div class="center-box">この箱全体が中央に配置されています</div>
    
    <h2>3. 両方の組み合わせ</h2>
    <div class="center-everything">
        <h3>完璧な中央寄せ</h3>
        <p>ボックスも中身も中央です</p>
    </div>
    
    <h2>4. 実用例</h2>
    <div class="card">
        <h3>お知らせカード</h3>
        <p>重要な情報をきれいに表示</p>
    </div>
</body>
</html>
```

### **CSS（style.css）**
```css
/* 基本スタイル */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

h1 {
    text-align: center;
    color: darkblue;
    border-bottom: 3px solid blue;
    padding-bottom: 15px;
    margin-bottom: 40px;
}

h2 {
    color: darkgreen;
    margin-top: 40px;
    margin-bottom: 20px;
    border-left: 4px solid green;
    padding-left: 15px;
}

h3 {
    margin-top: 0;
    color: darkred;
}

/* 1. テキストの中央寄せ */
.center-text {
    text-align: center;
    background-color: #e8f5e8;
    padding: 15px;
    margin: 10px 0;
    border: 1px solid #4CAF50;
}

.center-image {
    display: block;
    margin: 20px auto;
    width: 80px;
    height: 80px;
}

/* 2. ボックスの中央寄せ */
.center-box {
    width: 400px;
    margin: 0 auto;
    background-color: #fff3cd;
    padding: 20px;
    border: 2px solid #ffc107;
    margin-top: 20px;
    margin-bottom: 20px;
}

/* 3. 両方の組み合わせ */
.center-everything {
    width: 350px;
    margin: 0 auto;
    text-align: center;
    background-color: #d1ecf1;
    padding: 25px;
    border: 2px solid #17a2b8;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
}

/* 4. 実用例 */
.card {
    width: 300px;
    margin: 30px auto;
    background-color: white;
    padding: 25px;
    border: 1px solid #ddd;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card h3 {
    color: #333;
    margin-bottom: 15px;
}

.card p {
    color: #666;
    margin: 0;
}
```

## 📐 widthプロパティについて

### **widthの単位**
```css
width: 300px;     /* ピクセル（固定サイズ） */
width: 50%;       /* パーセント（親要素の50%） */
width: 20em;      /* em（文字サイズの20倍） */
```

### **margin: 0 autoが効く条件**
1. **width**が指定されている
2. **display: block**（divやpは最初から）
3. **marginが固定値でない**

### **例**
```css
/* 効く */
.good {
    width: 300px;
    margin: 0 auto;
}

/* 効かない（widthがない） */
.bad {
    margin: 0 auto;
}
```

## 🚀 実践してみよう

### **手順1: ファイルを開く**
`09-centering/index.html` をブラウザで開いてください。

### **手順2: 中央寄せの確認**
- **テキスト中央寄せ**：文字と画像が中央に配置
- **ボックス中央寄せ**：黄色いボックス全体が中央に配置
- **両方の組み合わせ**：青いボックスが中央で、中身の文字も中央
- **実用例**：白いカードが中央に美しく配置

### **手順3: ブラウザの幅を変更**
ブラウザの幅を変えても、中央寄せが保たれることを確認してください。

## ✨ 試してみよう

以下を変更して、変化を確認してみましょう：

### **1. カードの幅を変更**
```css
.card {
    width: 500px;  /* 300px を 500px に変更 */
}
```

### **2. 新しい中央寄せボックス**
```css
.my-center {
    width: 250px;
    margin: 0 auto;
    text-align: center;
    background-color: lavender;
    padding: 20px;
    border: 2px solid purple;
}
```

### **3. 右寄せを試す**
```css
.right-text {
    text-align: right;
    background-color: #ffe6e6;
    padding: 15px;
}
```

## 🎨 text-alignの値

### **主な値**
- **`left`**：左寄せ（デフォルト）
- **`center`**：中央寄せ
- **`right`**：右寄せ
- **`justify`**：両端揃え

### **例**
```css
.left     { text-align: left; }
.center   { text-align: center; }
.right    { text-align: right; }
.justify  { text-align: justify; }
```

## 📖 豆知識

### **画像の中央寄せ**
```css
img {
    display: block;
    margin: 0 auto;
}
```
画像は`display: block`にしてから`margin: 0 auto`を使います。

### **中央寄せの歴史**
昔はtableタグを使って中央寄せしていましたが、現在は：
- **テキスト**：`text-align: center`
- **ブロック要素**：`margin: 0 auto`
- **現代的な方法**：Flexbox（後で学習）

### **レスポンシブデザイン**
```css
.responsive-center {
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
}
```
`max-width`を使うと、大画面でも適切な幅になります。

## ⚠️ よくある間違い

### **1. widthを忘れる**
```css
/* 間違い（効かない） */
.bad {
    margin: 0 auto;
}

/* 正しい */
.good {
    width: 300px;
    margin: 0 auto;
}
```

### **2. text-alignとmarginの混同**
```css
/* テキストの中央寄せ */
.text-center {
    text-align: center;
}

/* ボックスの中央寄せ */
.box-center {
    width: 300px;
    margin: 0 auto;
}
```

### **3. インライン要素にmargin: 0 auto**
```css
/* spanやaタグには効かない */
span {
    margin: 0 auto;  /* 効かない */
}

/* display: blockにするか、text-alignを使う */
span {
    display: block;
    margin: 0 auto;
}
```

## ✅ この学習でできるようになること

- [ ] text-align: centerでテキストを中央寄せできる
- [ ] margin: 0 autoでブロック要素を中央寄せできる
- [ ] widthプロパティの重要性を理解している
- [ ] 画像の中央寄せができる
- [ ] 中央寄せを使った美しいカードデザインを作れる

## 📚 次の学習

次は **レイアウト基礎** でより複雑なレイアウト作成を学びます！

---

**🎉 中央寄せができるようになりました！整理された美しいレイアウトが作れますね！**