# ステップ08: 境界線と背景

## 🎯 学習目標

**borderで枠線を作り、backgroundで背景を詳しくカスタマイズする**

- borderプロパティで要素に枠線をつける方法を学ぶ
- background-colorの詳しい使い方を覚える
- 枠線のスタイル、太さ、色を調整する
- 背景と枠線を組み合わせて見やすいデザインを作る

## 📝 学習内容

### **今回学ぶCSS**
- **border**：要素の周りに枠線を作る
  - `border-width`：枠線の太さ
  - `border-style`：枠線の種類（実線、点線など）
  - `border-color`：枠線の色
- **background-color**：より詳しい背景色の設定

### **前回の復習**
- margin（外側の余白）
- padding（内側の余白）
- classセレクタ

### **重要なポイント**
1. **border**は要素の境界に表示される
2. **margin → border → padding → content** の順番
3. **border**はpaddingの外側、marginの内側に表示される

## 🔍 要素のボックスモデル

### **視覚的な説明**
```
[ margin ]
    ┌─────────────────┐
    │   [ border ]    │ ← 今回学ぶ部分
    │   ┌─────────┐   │
    │   │[padding]│   │
    │   │┌───────┐│   │
    │   ││content││   │
    │   │└───────┘│   │
    │   └─────────┘   │
    │                 │
    └─────────────────┘
```

## 🔍 コードの説明

### **HTML（index.html）**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <title>境界線と背景</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>境界線の練習</h1>
    
    <p class="basic-border">基本的な境界線です</p>
    <p class="thick-border">太い境界線です</p>
    <p class="dashed-border">点線の境界線です</p>
    <p class="colored-border">カラフルな境界線です</p>
    
    <h2>背景と境界線の組み合わせ</h2>
    <p class="nice-box">美しいボックスデザイン</p>
    <p class="info-box">情報ボックス</p>
</body>
</html>
```

### **CSS（style.css）**
```css
/* 基本スタイル */
body {
    font-family: Arial, sans-serif;
    margin: 20px;
    background-color: #f9f9f9;
}

h1 {
    color: darkblue;
    border-bottom: 3px solid blue;
    padding-bottom: 10px;
    margin-bottom: 30px;
}

h2 {
    color: darkgreen;
    margin-top: 40px;
    margin-bottom: 20px;
}

/* 基本的な境界線 */
.basic-border {
    border: 2px solid black;
    padding: 15px;
    margin: 10px 0;
}

/* 太い境界線 */
.thick-border {
    border: 5px solid red;
    padding: 20px;
    margin: 15px 0;
    background-color: #ffe6e6;
}

/* 点線の境界線 */
.dashed-border {
    border: 3px dashed blue;
    padding: 15px;
    margin: 10px 0;
    background-color: #e6f2ff;
}

/* カラフルな境界線（各辺別々の色） */
.colored-border {
    border-top: 4px solid red;
    border-right: 4px solid blue;
    border-bottom: 4px solid green;
    border-left: 4px solid orange;
    padding: 20px;
    margin: 15px 0;
    background-color: #f0f0f0;
}

/* 美しいボックスデザイン */
.nice-box {
    border: 2px solid #4CAF50;
    background-color: #f1f8e9;
    padding: 25px;
    margin: 20px 0;
    color: #2e7d32;
}

/* 情報ボックス */
.info-box {
    border-left: 5px solid #2196F3;
    background-color: #e3f2fd;
    padding: 20px;
    margin: 20px 0;
    color: #0d47a1;
}
```

## 🎨 borderプロパティの詳細

### **1. 一括指定**
```css
border: 太さ スタイル 色;
border: 2px solid red;
```

### **2. 個別指定**
```css
border-width: 3px;    /* 太さ */
border-style: dashed; /* スタイル */
border-color: blue;   /* 色 */
```

### **3. 各辺別々に指定**
```css
border-top: 2px solid red;     /* 上辺 */
border-right: 2px solid blue;  /* 右辺 */
border-bottom: 2px solid green; /* 下辺 */
border-left: 2px solid orange; /* 左辺 */
```

## 🖌 border-styleの種類

### **主なスタイル**
- **`solid`**：実線（最もよく使う）
- **`dashed`**：点線
- **`dotted`**：丸い点の線
- **`double`**：二重線

### **例**
```css
.solid-line   { border-style: solid; }
.dashed-line  { border-style: dashed; }
.dotted-line  { border-style: dotted; }
.double-line  { border-style: double; }
```

## 🚀 実践してみよう

### **手順1: ファイルを開く**
`08-borders/index.html` をブラウザで開いてください。

### **手順2: 境界線の確認**
- **basic-border**：黒い実線の枠
- **thick-border**：太い赤い枠と薄い赤背景
- **dashed-border**：青い点線の枠と薄い青背景
- **colored-border**：各辺が異なる色の枠

### **手順3: 背景との組み合わせ確認**
- **nice-box**：緑の枠と薄い緑背景
- **info-box**：左側だけ青い太い線

## ✨ 試してみよう

以下を変更して、変化を確認してみましょう：

### **1. 新しい境界線スタイル**
```css
.my-border {
    border: 4px dotted purple;
    background-color: lavender;
    padding: 20px;
}
```

### **2. 境界線の太さを変更**
```css
.thick-border {
    border: 10px solid red;  /* 5px を 10px に変更 */
}
```

### **3. 背景色を変更**
```css
.nice-box {
    background-color: lightcyan;  /* 色を変更 */
}
```

## 🎨 色の指定方法

### **色名での指定**
```css
border-color: red;
background-color: lightblue;
```

### **16進数での指定**
```css
border-color: #FF0000;        /* 赤 */
background-color: #E3F2FD;    /* 薄い青 */
```

## 📖 豆知識

### **border-bottom でアンダーライン**
```css
h1 {
    border-bottom: 3px solid blue;
    padding-bottom: 10px;
}
```
見出しの下に線を引くテクニックです。

### **左側だけに線を引く**
```css
.info-box {
    border-left: 5px solid blue;
    padding-left: 20px;
}
```
引用文や重要な情報を強調する時によく使われます。

### **境界線を消す**
```css
.no-border {
    border: none;
}
```

## ⚠️ よくある間違い

### **1. borderの順番間違い**
```css
/* 間違い */
border: red solid 2px;

/* 正しい */
border: 2px solid red;
```

### **2. 単位を忘れる**
```css
/* 間違い */
border: 2 solid red;

/* 正しい */
border: 2px solid red;
```

### **3. paddingを忘れる**
```css
/* 境界線と文字がくっついて読みにくい */
.bad-border {
    border: 2px solid black;
}

/* paddingで読みやすく */
.good-border {
    border: 2px solid black;
    padding: 15px;
}
```

## ✅ このステップでできるようになること

- [ ] borderプロパティで要素に枠線をつけられる
- [ ] border-width、border-style、border-colorを理解している
- [ ] 各辺に異なる境界線を設定できる
- [ ] background-colorと境界線を組み合わせてデザインできる
- [ ] ボックスモデル（margin、border、padding、content）を理解している

## 📚 次のステップ

次は **ステップ09: 中央寄せ** で要素を中央に配置する方法を学びます！

---

**🎉 境界線と背景が使えるようになりました！要素がはっきりと見やすくなりましたね！**