# 22.2-cart-display-system：カート表示システム

## 🎯 今回学ぶたった1つの新しいこと
**配列のmap操作とHTML生成**  
配列の各要素に対して処理を行い、その結果で新しい配列を作る`map()`メソッドと、動的にHTMLを生成する方法を学びます。

## 📖 前回までの復習
- 配列への要素追加（`push()`メソッド）
- オブジェクトを使った商品情報の管理
- ボタンクリックイベントの処理
- コンソールでのデバッグ出力

## 🚀 今回作るもの
カート配列に入っている商品を、ページ上に見やすいリストとして表示する機能を作ります。

### 完成イメージ
```
┌─────────────────────────┐
│ 🛍️ シンプルショップ      │
├─────────────────────────┤
│ [商品A] ¥1,000          │
│ [カートに追加]           │
│                         │
│ 📋 カートの中身：        │
│ • 商品A - ¥1,000        │
│ • 商品B - ¥2,000        │
│                         │
│ 合計：2個の商品          │
└─────────────────────────┘
```

## 💡 なぜこれが重要？
カートに商品を追加したら、ユーザーがその内容を確認できなければ意味がありません。配列の中身を見やすく表示することで、本格的なECサイトの第一歩となります。

## 📝 ステップバイステップ解説

### Step 1: HTML構造の準備
```html
<div id="cart-display">
  <h3>📋 カートの中身：</h3>
  <div id="cart-items">
    <!-- ここに商品リストが動的に表示される -->
  </div>
  <p id="cart-count">合計：0個の商品</p>
</div>
```
- `id="cart-items"`の部分に商品リストを表示
- `id="cart-count"`で商品の合計数を表示

### Step 2: map()メソッドを理解しよう
```javascript
// 基本的なmap()の例
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6]
```
- 配列の**各要素に対して**処理を実行
- 処理結果で**新しい配列**を作成
- **元の配列は変更されない**（非破壊的）

### Step 3: カート表示関数の作成
```javascript
function displayCart() {
  // カートが空の場合
  if (cart.length === 0) {
    document.getElementById('cart-items').innerHTML = '<p>カートは空です</p>';
    document.getElementById('cart-count').textContent = '合計：0個の商品';
    return;
  }
  
  // map()を使って各商品をHTMLに変換
  const cartHTML = cart.map(product => {
    return `
      <div class="cart-item">
        <span class="product-name">${product.name}</span>
        <span class="product-price">¥${product.price.toLocaleString()}</span>
      </div>
    `;
  }).join(''); // 配列を文字列に結合
  
  // HTMLを画面に表示
  document.getElementById('cart-items').innerHTML = cartHTML;
  document.getElementById('cart-count').textContent = `合計：${cart.length}個の商品`;
}
```

### Step 4: カート追加時に表示も更新
```javascript
function addToCart(productName, price) {
  const product = {
    name: productName,
    price: price
  };
  
  cart.push(product);
  
  // 追加後にカート表示を更新
  displayCart();
  
  console.log('カートに追加しました:', product);
}
```

## 🔍 重要なポイント

### map()メソッドの特徴
```javascript
const fruits = ['りんご', 'バナナ', 'オレンジ'];

// 各要素を大文字に変換
const upperFruits = fruits.map(fruit => fruit.toUpperCase());
console.log(upperFruits); // ['りんご', 'バナナ', 'オレンジ']
console.log(fruits);       // ['りんご', 'バナナ', 'オレンジ'] (元配列は変わらない)
```

### テンプレートリテラルでHTML生成
```javascript
const name = '商品A';
const price = 1000;

// バッククォート(`)でテンプレートリテラル
const html = `
  <div>
    <h3>${name}</h3>
    <p>¥${price.toLocaleString()}</p>
  </div>
`;
```
- **バッククォート** (`) で囲む
- **${変数名}** で変数を埋め込む
- **改行もそのまま**使える

### join()メソッドで配列を文字列に変換
```javascript
const htmlArray = ['<p>A</p>', '<p>B</p>', '<p>C</p>'];
const htmlString = htmlArray.join(''); // '<p>A</p><p>B</p><p>C</p>'
```

## ⚠️ よくあるエラーと対処法

### エラー1: 「Cannot read property 'innerHTML' of null」
```javascript
// ❌ 悪い例（要素が見つからない）
document.getElementById('cart-item').innerHTML = '...'; // typo

// ✅ 良い例（正しいID）
document.getElementById('cart-items').innerHTML = '...';
```

### エラー2: map()の戻り値を忘れる
```javascript
// ❌ 悪い例（returnを忘れる）
cart.map(product => {
  `<div>${product.name}</div>`; // returnがない
});

// ✅ 良い例
cart.map(product => {
  return `<div>${product.name}</div>`; // returnをつける
});

// ✅ もっと良い例（アロー関数の省略記法）
cart.map(product => `<div>${product.name}</div>`);
```

### エラー3: toLocaleString()の使い方
```javascript
// 数値を3桁区切りで表示
const price = 1000;
console.log(price.toLocaleString()); // "1,000"

const bigPrice = 1234567;
console.log(bigPrice.toLocaleString()); // "1,234,567"
```

## 🎨 CSSで見た目を整えよう
```css
.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.product-name {
  font-weight: bold;
}

.product-price {
  color: #e74c3c;
}
```

## ✅ 完成チェックリスト
- [ ] 「カートに追加」ボタンを押すと画面にカート内容が表示される
- [ ] 商品名と価格が正しく表示される
- [ ] 複数の商品を追加すると全て表示される
- [ ] 商品の合計数が正しく表示される
- [ ] カートが空の時に「カートは空です」と表示される
- [ ] 価格が3桁区切りで見やすく表示される（1,000など）

## 🔗 次回予告
次回「22.3-quantity-management」では、同じ商品を複数回追加した時に数量として管理する機能を学びます。`find()`メソッドを使って配列から特定の要素を見つける技術を身につけましょう！

---
**💻 map()メソッドは非常に重要な配列操作です。配列の各要素を変換して新しい配列を作る、という考え方をしっかり理解しましょう！**