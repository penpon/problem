# 初めてのCSS

## 🎯 学習目標

**CSSを使って文字に色とスタイルをつける**

- CSSファイルの作り方を覚える
- HTMLとCSSを連結する方法を理解する
- 色とフォントの基本的な変更方法を学ぶ

## 📝 学習内容

### **今回学ぶこと**
- **CSS**（Cascading Style Sheets）とは何か
- **外部CSSファイル**の作り方
- **color**プロパティ（文字色）
- **font-family**プロパティ（フォント）
- **font-size**プロパティ（文字サイズ）

### **前回の復習**
- HTML基礎タグ（h1, p, img, a, ul, li）

### **重要なポイント**
1. **CSSは装飾専用**（見た目を変える）
2. **HTMLとは別ファイル**で作る
3. **HTMLから読み込む**必要がある

## 🔍 ファイル構成

この学習では **2つのファイル** を使います：

### **1. index.html（変更あり）**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <title>初めてのCSS</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>私のスタイル付きページ</h1>
    <p>この文字は色が変わっています！</p>
    <p>フォントも変更されています。</p>
    <ul>
        <li>赤い文字</li>
        <li>青い文字</li>
        <li>緑の文字</li>
    </ul>
</body>
</html>
```

### **2. style.css（新規作成）**
```css
/* 見出しのスタイル */
h1 {
    color: blue;
    font-family: Arial, sans-serif;
    font-size: 32px;
}

/* 段落のスタイル */
p {
    color: green;
    font-family: Arial, sans-serif;
    font-size: 18px;
}

/* リストのスタイル */
li {
    color: red;
    font-family: Arial, sans-serif;
}
```

## 🔗 HTMLとCSSの連結

### **linkタグで連結**
```html
<link rel="stylesheet" href="style.css">
```
- **`rel="stylesheet"`**：CSSファイルだと宣言
- **`href="style.css"`**：CSSファイル名を指定
- **headタグの中**に書く

## 🎨 CSSの書き方

### **基本構文**
```css
セレクタ {
    プロパティ: 値;
    プロパティ: 値;
}
```

### **例の解説**
```css
h1 {
    color: blue;
    font-size: 32px;
}
```
- **`h1`**：セレクタ（どの要素に適用するか）
- **`{}`**：スタイルの範囲
- **`color: blue;`**：文字色を青に
- **`font-size: 32px;`**：文字サイズを32ピクセルに
- **`;`**：各プロパティの終わりに必要

## 🚀 実践してみよう

### **手順1: ファイルを開く**
`06-first-css/index.html` をブラウザで開いてください。

### **手順2: 色の変化確認**
- **見出し**が青色で大きく表示される
- **段落**が緑色で表示される
- **リスト**が赤色で表示される

### **手順3: CSSファイル確認**
`06-first-css/style.css` をテキストエディタで開いて内容を確認してください。

## ✨ 試してみよう

以下を変更して、変化を確認してみましょう：

### **1. 色を変更**
```css
h1 {
    color: purple;  /* blue を purple に変更 */
}
```

### **2. サイズを変更**
```css
h1 {
    font-size: 48px;  /* 32px を 48px に変更 */
}
```

### **3. 新しいスタイルを追加**
```css
body {
    background-color: lightyellow;  /* 背景色を追加 */
}
```

## 🌈 使える色の名前

### **基本色**
- `red`（赤）
- `blue`（青）
- `green`（緑）
- `yellow`（黄）
- `purple`（紫）
- `orange`（オレンジ）
- `pink`（ピンク）
- `black`（黒）
- `white`（白）

### **薄い色**
- `lightblue`（薄い青）
- `lightgreen`（薄い緑）
- `lightyellow`（薄い黄）

## 📖 豆知識

### **CSSコメント**
```css
/* これはコメントです */
h1 {
    color: blue;  /* この行もコメントが書けます */
}
```
- **`/* */`** でコメントを書ける
- **説明やメモ**に使う

### **フォントファミリー**
```css
font-family: Arial, sans-serif;
```
- **Arial**：最初に試すフォント
- **sans-serif**：Arialがない場合の代替

## ⚠️ よくある間違い

### **1. セミコロンを忘れる**
```css
/* 間違い */
h1 {
    color: blue
    font-size: 32px;
}

/* 正しい */
h1 {
    color: blue;
    font-size: 32px;
}
```

### **2. 波括弧を忘れる**
```css
/* 間違い */
h1 
    color: blue;

/* 正しい */
h1 {
    color: blue;
}
```

## ✅ この学習でできるようになること

- [ ] CSSファイルを作成できる
- [ ] HTMLとCSSを連結できる
- [ ] colorプロパティで文字色を変更できる
- [ ] font-sizeプロパティで文字サイズを変更できる
- [ ] font-familyプロパティでフォントを変更できる
- [ ] CSSの基本構文を理解している

## 📚 次の学習

次は **余白の設定** で `margin` と `padding` を学びます！

---

**🎉 初めてのCSSが完成しました！文字に色とスタイルがつけられるようになりましたね！**