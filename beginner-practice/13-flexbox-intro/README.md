# ステップ13: Flexbox基礎

## 🎯 学習目標

**display: flexで現代的なレイアウトを作り、要素の配置を自由自在にコントロールする**

- display: flexでFlexboxレイアウトの基本概念を理解する
- justify-contentで水平方向の配置を調整する
- align-itemsで垂直方向の配置を調整する
- flex-directionで配置方向を変更する

## 📝 学習内容

### **今回学ぶCSS**
- **display: flex**：Flexboxコンテナを作成
- **justify-content**：水平方向（メイン軸）の配置
  - `flex-start`, `center`, `flex-end`, `space-between`, `space-around`
- **align-items**：垂直方向（クロス軸）の配置
  - `flex-start`, `center`, `flex-end`, `stretch`
- **flex-direction**：配置方向の指定
  - `row`（横並び）, `column`（縦並び）
- **flex-wrap**：改行の制御

### **前回の復習**
- transition（滑らかな変化）
- @keyframes（自動アニメーション）
- transform（要素の変形）

### **重要なポイント**
1. **Flexbox**は1次元レイアウト（一方向の配置）に最適
2. **親要素**に`display: flex`を指定する
3. **justify-content**と**align-items**で簡単に中央寄せができる

## 🔍 Flexboxの基本概念

### **メイン軸とクロス軸**
```
flex-direction: row の場合:
          メイン軸（horizontal）
     ←─────────────────────→
   ↑ ┌─────┐ ┌─────┐ ┌─────┐
   │ │ A   │ │ B   │ │ C   │
   │ └─────┘ └─────┘ └─────┘
   ↓
クロス軸（vertical）

flex-direction: column の場合:
   メイン軸（vertical）
        ↑
        │ ┌─────────┐
        │ │    A    │
        │ ├─────────┤
        │ │    B    │
        │ ├─────────┤
        │ │    C    │
        │ └─────────┘
        ↓
    ←──────────→
    クロス軸（horizontal）
```

## 🔍 コードの説明

### **HTML（index.html）**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <title>Flexbox基礎</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Flexbox基礎の練習</h1>
    
    <h2>1. 基本的なFlexbox</h2>
    <div class="basic-demo">
        <div class="flex-container">
            <div class="flex-item">アイテム1</div>
            <div class="flex-item">アイテム2</div>
            <div class="flex-item">アイテム3</div>
        </div>
        <p>通常のdiv（ブロック要素）は縦に並びますが、Flexboxでは横に並びます</p>
    </div>
    
    <h2>2. justify-content（水平方向の配置）</h2>
    <div class="justify-demo">
        <h3>flex-start（左寄せ）</h3>
        <div class="flex-container justify-start">
            <div class="flex-item">A</div>
            <div class="flex-item">B</div>
            <div class="flex-item">C</div>
        </div>
        
        <h3>center（中央寄せ）</h3>
        <div class="flex-container justify-center">
            <div class="flex-item">A</div>
            <div class="flex-item">B</div>
            <div class="flex-item">C</div>
        </div>
        
        <h3>flex-end（右寄せ）</h3>
        <div class="flex-container justify-end">
            <div class="flex-item">A</div>
            <div class="flex-item">B</div>
            <div class="flex-item">C</div>
        </div>
        
        <h3>space-between（両端揃え）</h3>
        <div class="flex-container justify-between">
            <div class="flex-item">A</div>
            <div class="flex-item">B</div>
            <div class="flex-item">C</div>
        </div>
        
        <h3>space-around（等間隔）</h3>
        <div class="flex-container justify-around">
            <div class="flex-item">A</div>
            <div class="flex-item">B</div>
            <div class="flex-item">C</div>
        </div>
    </div>
    
    <h2>3. align-items（垂直方向の配置）</h2>
    <div class="align-demo">
        <h3>flex-start（上寄せ）</h3>
        <div class="flex-container align-start tall">
            <div class="flex-item">A</div>
            <div class="flex-item large">B<br>大きい</div>
            <div class="flex-item">C</div>
        </div>
        
        <h3>center（中央寄せ）</h3>
        <div class="flex-container align-center tall">
            <div class="flex-item">A</div>
            <div class="flex-item large">B<br>大きい</div>
            <div class="flex-item">C</div>
        </div>
        
        <h3>flex-end（下寄せ）</h3>
        <div class="flex-container align-end tall">
            <div class="flex-item">A</div>
            <div class="flex-item large">B<br>大きい</div>
            <div class="flex-item">C</div>
        </div>
        
        <h3>stretch（高さを揃える）</h3>
        <div class="flex-container align-stretch tall">
            <div class="flex-item">A</div>
            <div class="flex-item large">B<br>大きい</div>
            <div class="flex-item">C</div>
        </div>
    </div>
    
    <h2>4. flex-direction（配置方向）</h2>
    <div class="direction-demo">
        <h3>row（横並び・デフォルト）</h3>
        <div class="flex-container direction-row">
            <div class="flex-item">1</div>
            <div class="flex-item">2</div>
            <div class="flex-item">3</div>
        </div>
        
        <h3>column（縦並び）</h3>
        <div class="flex-container direction-column">
            <div class="flex-item">1</div>
            <div class="flex-item">2</div>
            <div class="flex-item">3</div>
        </div>
    </div>
    
    <h2>5. 完璧な中央寄せ</h2>
    <div class="perfect-center">
        <div class="center-content">
            <h3>完璧な中央</h3>
            <p>水平・垂直両方向で中央に配置されています</p>
        </div>
    </div>
    
    <h2>6. 実用例：ナビゲーション</h2>
    <nav class="main-nav">
        <div class="logo">MyLogo</div>
        <ul class="nav-links">
            <li><a href="#">ホーム</a></li>
            <li><a href="#">サービス</a></li>
            <li><a href="#">会社概要</a></li>
            <li><a href="#">お問い合わせ</a></li>
        </ul>
    </nav>
    
    <h2>7. 実用例：カードレイアウト</h2>
    <div class="card-gallery">
        <div class="card">
            <h4>カード1</h4>
            <p>Flexboxで美しく配置されたカードです。</p>
            <button>詳細を見る</button>
        </div>
        <div class="card">
            <h4>カード2</h4>
            <p>レスポンシブ対応で様々な画面サイズに対応します。</p>
            <button>詳細を見る</button>
        </div>
        <div class="card">
            <h4>カード3</h4>
            <p>高さが異なってもキレイに揃います。</p>
            <button>詳細を見る</button>
        </div>
    </div>
</body>
</html>
```

### **CSS（style.css）**
```css
/* Flexbox基礎 - display: flex とレイアウト制御 */

/* 基本スタイル */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
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
    color: #fff;
    margin-top: 60px;
    margin-bottom: 30px;
    border-left: 4px solid #00cec9;
    padding-left: 15px;
    background: rgba(0,0,0,0.1);
    padding: 15px;
    border-radius: 8px;
}

h3 {
    color: #ddd;
    margin: 25px 0 15px 0;
    font-size: 16px;
}

h4 {
    margin-top: 0;
    color: #333;
}

p {
    margin: 10px 0;
    color: #f1f2f6;
}

/* デモ用コンテナ */
.basic-demo, .justify-demo, .align-demo, .direction-demo {
    background: rgba(255,255,255,0.1);
    padding: 30px;
    margin: 30px 0;
    border-radius: 15px;
    backdrop-filter: blur(10px);
}

/* 1. 基本的なFlexbox */
.flex-container {
    display: flex;
    background-color: rgba(0,0,0,0.2);
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
}

.flex-item {
    background-color: #6c5ce7;
    color: white;
    padding: 15px 20px;
    margin: 5px;
    border-radius: 8px;
    text-align: center;
    border: 2px solid #a29bfe;
    transition: all 0.3s ease;
}

.flex-item:hover {
    background-color: #5f3dc4;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

/* 2. justify-content のデモ */
.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }

/* 3. align-items のデモ */
.tall {
    height: 120px;
}

.large {
    font-size: 14px;
    padding: 20px;
}

.align-start { align-items: flex-start; }
.align-center { align-items: center; }
.align-end { align-items: flex-end; }
.align-stretch { align-items: stretch; }

/* 4. flex-direction のデモ */
.direction-row { 
    flex-direction: row; 
}

.direction-column { 
    flex-direction: column;
    height: 200px;
    width: 200px;
    margin: 0 auto;
}

/* 5. 完璧な中央寄せ */
.perfect-center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    background: rgba(0,0,0,0.2);
    border-radius: 15px;
    margin: 30px 0;
}

.center-content {
    background: rgba(255,255,255,0.95);
    color: #333;
    padding: 40px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

/* 6. 実用例：ナビゲーション */
.main-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0,0,0,0.3);
    padding: 15px 30px;
    border-radius: 12px;
    margin: 30px 0;
    backdrop-filter: blur(10px);
}

.logo {
    font-size: 24px;
    font-weight: bold;
    color: #00cec9;
}

.nav-links {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 30px;
}

.nav-links a {
    color: white;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.nav-links a:hover {
    background-color: rgba(255,255,255,0.2);
    transform: translateY(-2px);
}

/* 7. 実用例：カードレイアウト */
.card-gallery {
    display: flex;
    gap: 25px;
    justify-content: center;
    flex-wrap: wrap;
    margin: 40px 0;
}

.card {
    background: rgba(255,255,255,0.95);
    color: #333;
    border-radius: 15px;
    padding: 25px;
    width: 250px;
    text-align: center;
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.3);
}

.card p {
    color: #666;
    flex-grow: 1;
    margin: 15px 0;
}

.card button {
    background: linear-gradient(135deg, #74b9ff, #0984e3);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
    margin-top: auto;
}

.card button:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(116, 185, 255, 0.4);
}
```

## 📐 justify-contentの値

### **水平方向の配置**
- **`flex-start`**：左寄せ（デフォルト）
- **`center`**：中央寄せ
- **`flex-end`**：右寄せ
- **`space-between`**：両端に配置、間隔は等分
- **`space-around`**：各要素の周りに等しい間隔
- **`space-evenly`**：すべての間隔が等しい

## 📐 align-itemsの値

### **垂直方向の配置**
- **`flex-start`**：上寄せ
- **`center`**：中央寄せ
- **`flex-end`**：下寄せ
- **`stretch`**：高さを揃える（デフォルト）
- **`baseline`**：ベースラインで揃える

## 🔄 flex-directionの値

### **配置方向**
- **`row`**：横並び（左→右）デフォルト
- **`row-reverse`**：横並び（右→左）
- **`column`**：縦並び（上→下）
- **`column-reverse`**：縦並び（下→上）

## 🚀 実践してみよう

### **手順1: ファイルを開く**
`13-flexbox-intro/index.html` をブラウザで開いてください。

### **手順2: 各レイアウトの確認**
- **基本Flexbox**：3つの要素が横に並ぶ
- **justify-content**：水平方向の配置パターン
- **align-items**：垂直方向の配置パターン（高さの違いに注目）
- **flex-direction**：配置方向の変化
- **完璧な中央寄せ**：画面中央に配置
- **ナビゲーション**：実用的なヘッダー
- **カードレイアウト**：高さが揃った美しいカード

### **手順3: レスポンシブ確認**
ブラウザの幅を変えて、Flexboxの柔軟性を確認してください。

## ✨ 試してみよう

以下を変更して、変化を確認してみましょう：

### **1. 新しい配置パターン**
```css
.custom-layout {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 200px;
}
```

### **2. flex-wrapで改行**
```css
.wrap-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
```

### **3. 個別のflex設定**
```css
.flex-grow {
    flex: 1;  /* 残りスペースを占有 */
}
.flex-shrink {
    flex: 0 0 100px;  /* 幅固定 */
}
```

## 📖 豆知識

### **gap プロパティ**
```css
.modern-flex {
    display: flex;
    gap: 20px;  /* 要素間の間隔 */
}
```
marginの代わりにgapを使うと、要素間の間隔を簡単に設定できます。

### **flexとgridの使い分け**
- **Flexbox**：1次元レイアウト（行または列）
- **CSS Grid**：2次元レイアウト（行と列の両方）

### **古いfloatレイアウトとの比較**
```css
/* 古い方法（float） */
.old-layout {
    float: left;
    width: 33.33%;
}

/* 新しい方法（Flexbox） */
.new-layout {
    display: flex;
    justify-content: space-between;
}
```

## ⚠️ よくある間違い

### **1. 親要素にdisplay: flexを忘れる**
```css
/* 間違い：子要素に指定 */
.flex-item {
    display: flex;  /* 効かない */
}

/* 正しい：親要素に指定 */
.flex-container {
    display: flex;
}
```

### **2. justify-contentとalign-itemsを混同**
```css
/* 水平方向の配置 */
.container {
    justify-content: center;
}

/* 垂直方向の配置 */
.container {
    align-items: center;
}
```

### **3. heightを指定しないと align-items が効かない**
```css
/* 間違い：高さがないと垂直中央寄せできない */
.container {
    display: flex;
    align-items: center;  /* 効果が見えない */
}

/* 正しい：高さを指定 */
.container {
    display: flex;
    align-items: center;
    height: 200px;
}
```

## 🎯 Flexboxの実用パターン

### **1. ヘッダーレイアウト**
```css
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}
```

### **2. 等幅カラム**
```css
.columns {
    display: flex;
}
.column {
    flex: 1;  /* 等幅 */
    margin: 0 10px;
}
```

### **3. フッターの下部固定**
```css
.page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.content {
    flex: 1;
}
```

## ✅ このステップでできるようになること

- [ ] display: flexでFlexboxコンテナを作れる
- [ ] justify-contentで水平方向の配置を調整できる
- [ ] align-itemsで垂直方向の配置を調整できる
- [ ] flex-directionで配置方向を変更できる
- [ ] 完璧な中央寄せができる
- [ ] 実用的なナビゲーションバーを作れる
- [ ] レスポンシブなカードレイアウトを作れる
- [ ] Flexboxとfloatの違いを理解している

## 📚 次のステップ

次は **ステップ14: シンプルカード** でFlexboxを活用したカードデザインを深く学びます！

---

**🎉 Flexboxの基礎が身につきました！現代的で柔軟なレイアウトが作れるようになりましたね！**