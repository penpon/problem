# レイアウト基礎

## 🎯 学習目標

**複数の要素を並べて基本的なレイアウトを作る**

- displayプロパティで要素の表示方法を制御する
- inline-blockで要素を横並びにする
- widthとmarginを組み合わせた2カラムレイアウトを作る
- clearfixで回り込みを解除する方法を学ぶ

## 📝 学習内容

### **今回学ぶCSS**
- **display**：要素の表示方法を指定
  - `block`：縦に並ぶ（デフォルト）
  - `inline`：横に並ぶ（改行しない）
  - `inline-block`：横に並ぶ（幅・高さ指定可能）
- **float**：要素を左右に浮かせる（簡単な使用例のみ）
- **clear**：回り込みを解除

### **前回の復習**
- text-align: center（テキスト中央寄せ）
- margin: 0 auto（ボックス中央寄せ）
- width（幅の指定）

### **重要なポイント**
1. **display: block**は縦に並ぶ
2. **display: inline-block**は横に並び、幅・高さ指定可能
3. **width**を調整して2カラム、3カラムレイアウトを作れる

## 🔍 displayプロパティの違い

### **視覚的な説明**
```
block:
┌─────────────┐
│   BOX A     │
└─────────────┘
┌─────────────┐
│   BOX B     │
└─────────────┘

inline-block:
┌─────┐ ┌─────┐ ┌─────┐
│BOX A││BOX B││BOX C│
└─────┘ └─────┘ └─────┘
```

### **特徴**
- **block**：幅いっぱい、縦に並ぶ
- **inline**：内容の幅のみ、横に並ぶ（幅・高さ指定不可）
- **inline-block**：横に並ぶ + 幅・高さ指定可能

## 🔍 コードの説明

### **HTML（index.html）**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <title>レイアウト基礎</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>レイアウト基礎</h1>
    
    <h2>1. displayプロパティの違い</h2>
    <div class="demo-area">
        <div class="block-item">Block要素</div>
        <div class="block-item">Block要素</div>
        <span class="inline-item">Inline要素</span>
        <span class="inline-item">Inline要素</span>
    </div>
    
    <h2>2. inline-blockで横並び</h2>
    <div class="demo-area">
        <div class="inline-block-item">ボックス1</div>
        <div class="inline-block-item">ボックス2</div>
        <div class="inline-block-item">ボックス3</div>
    </div>
    
    <h2>3. 2カラムレイアウト</h2>
    <div class="container">
        <div class="sidebar">
            <h3>サイドバー</h3>
            <ul>
                <li>メニュー1</li>
                <li>メニュー2</li>
                <li>メニュー3</li>
            </ul>
        </div>
        <div class="main-content">
            <h3>メインコンテンツ</h3>
            <p>ここにメインの内容が入ります。</p>
            <p>2カラムレイアウトの例です。</p>
        </div>
    </div>
    
    <h2>4. 3カラムレイアウト</h2>
    <div class="three-column-container">
        <div class="column">
            <h3>カラム1</h3>
            <p>左側のコンテンツ</p>
        </div>
        <div class="column">
            <h3>カラム2</h3>
            <p>真ん中のコンテンツ</p>
        </div>
        <div class="column">
            <h3>カラム3</h3>
            <p>右側のコンテンツ</p>
        </div>
    </div>
    
    <div class="clearfix"></div>
    
    <h2>5. 実用例：カードレイアウト</h2>
    <div class="card-container">
        <div class="card">
            <h3>商品A</h3>
            <p>商品の説明文です</p>
        </div>
        <div class="card">
            <h3>商品B</h3>
            <p>商品の説明文です</p>
        </div>
        <div class="card">
            <h3>商品C</h3>
            <p>商品の説明文です</p>
        </div>
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
    background-color: #f8f9fa;
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
    margin-top: 50px;
    margin-bottom: 20px;
    border-left: 4px solid green;
    padding-left: 15px;
}

h3 {
    margin-top: 0;
    color: #333;
}

/* 1. displayプロパティのデモ */
.demo-area {
    background-color: #e9ecef;
    padding: 20px;
    margin: 20px 0;
    border: 2px solid #ccc;
}

.block-item {
    display: block;
    background-color: lightblue;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid blue;
}

.inline-item {
    display: inline;
    background-color: lightcoral;
    padding: 10px;
    margin: 5px;
    border: 1px solid red;
}

/* 2. inline-blockで横並び */
.inline-block-item {
    display: inline-block;
    width: 120px;
    height: 80px;
    background-color: lightgreen;
    padding: 15px;
    margin: 10px;
    border: 2px solid green;
    text-align: center;
    vertical-align: top;
}

/* 3. 2カラムレイアウト */
.container {
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    border: 1px solid #ddd;
    overflow: hidden;
}

.sidebar {
    width: 200px;
    float: left;
    background-color: #f1f3f4;
    padding: 20px;
    border-right: 1px solid #ddd;
}

.main-content {
    margin-left: 241px;
    padding: 20px;
}

.sidebar ul {
    list-style: none;
    padding: 0;
}

.sidebar li {
    padding: 8px 0;
    border-bottom: 1px solid #ddd;
}

/* 4. 3カラムレイアウト */
.three-column-container {
    max-width: 900px;
    margin: 0 auto;
    overflow: hidden;
}

.column {
    width: 30%;
    float: left;
    background-color: white;
    margin: 1.5%;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

/* 5. clearfixユーティリティ */
.clearfix {
    clear: both;
    margin: 30px 0;
}

/* 6. カードレイアウト */
.card-container {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
}

.card {
    display: inline-block;
    width: 200px;
    background-color: white;
    margin: 15px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    vertical-align: top;
    text-align: left;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.card:hover {
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}
```

## 📐 displayプロパティの詳細

### **主なdisplay値**
- **`block`**：縦に並ぶ、幅いっぱい（div, p, h1など）
- **`inline`**：横に並ぶ、幅・高さ指定不可（span, aなど）
- **`inline-block`**：横に並ぶ、幅・高さ指定可能
- **`none`**：非表示

### **例**
```css
.block     { display: block; }
.inline    { display: inline; }
.i-block   { display: inline-block; }
.hidden    { display: none; }
```

## 🏗 レイアウトテクニック

### **1. inline-blockで等幅カラム**
```css
.column {
    display: inline-block;
    width: 30%;
    margin: 1.5%;
    vertical-align: top;
}
```

### **2. floatで2カラム**
```css
.sidebar { 
    width: 200px; 
    float: left; 
}
.content { 
    margin-left: 220px; 
}
```

### **3. 中央揃えコンテナ**
```css
.container {
    max-width: 800px;
    margin: 0 auto;
}
```

## 🚀 実践してみよう

### **手順1: ファイルを開く**
`10-layout-basics/index.html` をブラウザで開いてください。

### **手順2: 各レイアウトの確認**
- **displayプロパティの違い**：block（縦並び）とinline（横並び）
- **inline-blockで横並び**：3つのボックスが横に並ぶ
- **2カラムレイアウト**：サイドバーとメインコンテンツ
- **3カラムレイアウト**：3つの等幅カラム
- **カードレイアウト**：ホバー効果付きカード

### **手順3: ブラウザの幅を変更**
ブラウザの幅を変えて、レイアウトがどう変化するかを確認してください。

## ✨ 試してみよう

以下を変更して、変化を確認してみましょう：

### **1. カラムの幅を変更**
```css
.column {
    width: 45%;  /* 30% を 45% に変更（2カラムになる） */
}
```

### **2. 新しいinline-blockボックス**
```css
.my-inline-block {
    display: inline-block;
    width: 150px;
    height: 100px;
    background-color: yellow;
    margin: 10px;
    padding: 15px;
    border: 2px solid orange;
}
```

### **3. サイドバーの幅を変更**
```css
.sidebar {
    width: 250px;  /* 200px を 250px に */
}
.main-content {
    margin-left: 271px;  /* サイドバー幅 + 境界線 + 余白 */
}
```

## 📖 豆知識

### **vertical-alignの重要性**
```css
.inline-block-item {
    vertical-align: top;  /* 上揃え */
}
```
inline-block要素は高さが違うとずれるため、vertical-alignで揃えます。

### **clearfixの使い方**
```css
/* floatした要素の後に配置 */
.clearfix {
    clear: both;
}

/* またはCSSのみで */
.container::after {
    content: "";
    display: table;
    clear: both;
}
```

### **max-widthでレスポンシブ**
```css
.container {
    max-width: 800px;  /* 最大幅 */
    margin: 0 auto;    /* 中央寄せ */
}
```

## ⚠️ よくある間違い

### **1. floatしたあとclearしない**
```css
/* 間違い：次の要素がfloatの影響を受ける */
.float-box { float: left; }
.next-section { /* clearがない */ }

/* 正しい */
.float-box { float: left; }
.clearfix { clear: both; }
```

### **2. inline-blockの隙間**
```css
/* HTMLの改行が隙間になる */
.inline-block-item {
    display: inline-block;
    /* 隙間を除去するには */
    margin-right: -4px;
}

/* または親要素に */
.parent {
    font-size: 0;
}
.inline-block-item {
    font-size: 16px;
}
```

### **3. widthの合計が100%を超える**
```css
/* 間違い：margin/paddingを含めて100%を超える */
.column {
    width: 50%;
    margin: 10px;  /* 合計が100%を超える */
}

/* 正しい */
.column {
    width: 45%;
    margin: 2.5%;  /* 合計100% */
}
```

## ✅ この学習でできるようになること

- [ ] displayプロパティ（block、inline、inline-block）を使い分けられる
- [ ] inline-blockで要素を横並びにできる
- [ ] floatとmarginで2カラムレイアウトを作れる
- [ ] 3カラムレイアウトを作れる
- [ ] clearfixで回り込みを解除できる
- [ ] 中央寄せコンテナでレスポンシブなレイアウトを作れる

## 📚 次の学習

次は **影と角丸** で `box-shadow` と `border-radius` を学びます！

---

**🎉 基本的なレイアウトができるようになりました！複数の要素を美しく配置できますね！**