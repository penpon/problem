# ステップ07: 余白の設定

## 🎯 学習目標

**marginとpaddingを使って余白を調整する**

- marginとpaddingの違いを理解する
- 要素の周りと内側に余白を作る方法を学ぶ
- 余白で読みやすいレイアウトを作る

## 📝 学習内容

### **今回学ぶCSS**
- **margin**：要素の外側の余白
- **padding**：要素の内側の余白
- **background-color**：背景色

### **前回の復習**
- color, font-family, font-size

### **重要なポイント**
1. **margin**は要素の外側のスペース
2. **padding**は要素の内側のスペース
3. **background-color**で背景に色をつけると余白が見やすい

## 🔍 marginとpaddingの違い

### **視覚的な説明**
```
[ margin ]
    ┌─────────────────┐
    │   [ padding ]   │
    │   ┌─────────┐   │ ← background-color の範囲
    │   │ content │   │
    │   └─────────┘   │
    │                 │
    └─────────────────┘
```

- **content**：文字や画像などの内容
- **padding**：内容と境界線の間
- **margin**：他の要素との間

## 🔍 コードの説明

### **HTML（index.html）**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <title>余白の設定</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>余白のテスト</h1>
    <p class="box1">この段落にはmarginとpaddingがあります</p>
    <p class="box2">こちらの段落は別のスタイルです</p>
    <p>普通の段落です（比較用）</p>
</body>
</html>
```

### **CSS（style.css）**
```css
/* 基本スタイル */
body {
    font-family: Arial, sans-serif;
}

h1 {
    color: blue;
    margin-bottom: 30px;
}

/* box1クラスのスタイル */
.box1 {
    background-color: lightblue;
    margin: 20px;
    padding: 15px;
    color: darkblue;
}

/* box2クラスのスタイル */
.box2 {
    background-color: lightgreen;
    margin: 10px 0px;
    padding: 20px 10px;
    color: darkgreen;
}
```

## 🎨 CSSの新機能

### **1. classセレクタ**
```css
.box1 {
    /* スタイル */
}
```
- **`.box1`**：class="box1" の要素に適用
- **HTMLで指定**：`<p class="box1">テキスト</p>`

### **2. marginの指定方法**
```css
margin: 20px;           /* 上下左右すべて20px */
margin: 10px 0px;       /* 上下10px、左右0px */
margin-bottom: 30px;    /* 下側だけ30px */
```

### **3. paddingの指定方法**
```css
padding: 15px;          /* 上下左右すべて15px */
padding: 20px 10px;     /* 上下20px、左右10px */
```

## 🚀 実践してみよう

### **手順1: ファイルを開く**
`07-spacing/index.html` をブラウザで開いてください。

### **手順2: 余白の確認**
- **box1**：青い背景で大きな余白
- **box2**：緑の背景で異なる余白設定
- **普通の段落**：余白なし（比較用）

### **手順3: 背景色で余白を確認**
背景色がついているので、padding（内側の余白）が見えます。

## ✨ 試してみよう

以下を変更して、変化を確認してみましょう：

### **1. marginを変更**
```css
.box1 {
    margin: 50px;  /* 20px を 50px に変更 */
}
```

### **2. paddingを変更**
```css
.box1 {
    padding: 30px;  /* 15px を 30px に変更 */
}
```

### **3. 新しいクラスを追加**
```css
.box3 {
    background-color: lightyellow;
    margin: 5px;
    padding: 25px;
    color: orange;
}
```

## 📏 余白の単位

### **px（ピクセル）**
- **固定サイズ**
- **10px = 画面の10ドット**
- 初心者にとって分かりやすい

### **よく使う値**
- **5px**：小さな余白
- **10px**：普通の余白
- **20px**：大きめの余白
- **30px**：とても大きな余白

## 📖 豆知識

### **marginの相殺**
上下に並んだ要素のmarginは、大きい方の値になります：
```css
/* 要素A */
margin-bottom: 20px;

/* 要素B */
margin-top: 10px;

/* 実際の間隔は20px（30pxではない） */
```

### **margin: 0 auto**
```css
.center {
    margin: 0 auto;  /* 左右の余白を自動調整（中央揃え） */
}
```

## ⚠️ よくある間違い

### **1. 単位を忘れる**
```css
/* 間違い */
margin: 20;

/* 正しい */
margin: 20px;
```

### **2. クラス名にドット（.）を忘れる**
```css
/* 間違い */
box1 {
    color: blue;
}

/* 正しい */
.box1 {
    color: blue;
}
```

## ✅ このステップでできるようになること

- [ ] marginで要素の外側余白を設定できる
- [ ] paddingで要素の内側余白を設定できる
- [ ] classセレクタを使って特定の要素にスタイルを適用できる
- [ ] background-colorで背景色を設定できる
- [ ] marginとpaddingの違いを理解している

## 📚 次のステップ

次は **ステップ08: 境界線と背景** で `border` と詳しい `background` を学びます！

---

**🎉 余白の調整ができるようになりました！文字が読みやすくなりましたね！**