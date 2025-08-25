# 22.3-quantity-management：数量管理基礎

## 🎯 今回学ぶたった1つの新しいこと
**find操作と条件分岐**  
配列から特定の条件に合う要素を見つける`find()`メソッドと、条件に応じて異なる処理を実行する`if文`を組み合わせて使う方法を学びます。

## 📖 前回までの復習
- 配列への要素追加（`push()`メソッド）
- 配列のmap操作とHTML生成
- テンプレートリテラルでの文字列作成
- カート内容の画面表示

## 🚀 今回作るもの
同じ商品を複数回「カートに追加」した時に、別々の商品として扱うのではなく、1つの商品の数量を増やす機能を作ります。

### 完成イメージ
```
┌─────────────────────────┐
│ 🛍️ シンプルショップ      │
├─────────────────────────┤
│ [商品A] ¥1,000          │
│ [カートに追加] ←3回クリック│
│                         │
│ 📋 カートの中身：        │
│ • 商品A - ¥1,000 (3個)  │
│                         │
│ 合計：3個の商品          │
└─────────────────────────┘
```

## 💡 なぜこれが重要？
実際のECサイトでは、同じ商品を何度も追加した場合、リストに同じ商品が何個も並ぶのではなく、数量として管理するのが一般的です。これにより、カートがすっきりと見やすくなります。

## 📝 ステップバイステップ解説

### Step 1: 商品データ構造に数量を追加
```javascript
// 商品オブジェクトにquantity（数量）を追加
const product = {
  name: '商品A',
  price: 1000,
  quantity: 1  // 数量を追加
};
```

### Step 2: find()メソッドを理解しよう
```javascript
// 基本的なfind()の例
const fruits = [
  { name: 'りんご', color: '赤' },
  { name: 'バナナ', color: '黄' },
  { name: 'ぶどう', color: '紫' }
];

// 条件に合う最初の要素を取得
const redFruit = fruits.find(fruit => fruit.color === '赤');
console.log(redFruit); // { name: 'りんご', color: '赤' }

// 見つからない場合はundefined
const blueFruit = fruits.find(fruit => fruit.color === '青');
console.log(blueFruit); // undefined
```

### Step 3: 改良されたaddToCart関数
```javascript
function addToCart(productName, price) {
  // 既に同じ商品がカートにあるかチェック
  const existingProduct = cart.find(item => item.name === productName);
  
  if (existingProduct) {
    // 既存商品があれば数量を増やす
    existingProduct.quantity += 1;
    console.log(`${productName}の数量を増やしました (${existingProduct.quantity}個)`);
  } else {
    // 新しい商品なら追加
    const newProduct = {
      name: productName,
      price: price,
      quantity: 1
    };
    cart.push(newProduct);
    console.log(`${productName}をカートに追加しました`);
  }
  
  // カート表示を更新
  displayCart();
}
```

### Step 4: 数量対応のカート表示
```javascript
function displayCart() {
  if (cart.length === 0) {
    document.getElementById('cart-items').innerHTML = '<p>カートは空です</p>';
    document.getElementById('cart-count').textContent = '合計：0個の商品';
    return;
  }
  
  // 各商品に数量を表示
  const cartHTML = cart.map(product => {
    return `
      <div class="cart-item">
        <span class="product-name">${product.name}</span>
        <span class="product-info">
          ¥${product.price.toLocaleString()} (${product.quantity}個)
        </span>
      </div>
    `;
  }).join('');
  
  // 総数量を計算
  const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
  
  document.getElementById('cart-items').innerHTML = cartHTML;
  document.getElementById('cart-count').textContent = `合計：${totalQuantity}個の商品`;
}
```

## 🔍 重要なポイント

### find()メソッドの特徴
- **条件に合う最初の要素**を返す
- **見つからない場合はundefined**を返す
- **元の配列は変更されない**

```javascript
const users = [
  { id: 1, name: '田中' },
  { id: 2, name: '佐藤' },
  { id: 3, name: '鈴木' }
];

// IDが2のユーザーを検索
const user = users.find(u => u.id === 2);
console.log(user.name); // '佐藤'
```

### 条件分岐のパターン
```javascript
// existingProductがundefinedでない場合はtrue
if (existingProduct) {
  // 商品が見つかった場合の処理
}

// より明確な書き方
if (existingProduct !== undefined) {
  // 商品が見つかった場合の処理
}
```

### reduce()で総数計算
```javascript
// 各商品の数量を合計
const totalQuantity = cart.reduce((total, product) => {
  return total + product.quantity;
}, 0); // 初期値は0
```

## ⚠️ よくあるエラーと対処法

### エラー1: 「Cannot read property 'quantity' of undefined」
```javascript
// ❌ 悪い例（findで見つからない場合の対処なし）
const existingProduct = cart.find(item => item.name === productName);
existingProduct.quantity += 1; // エラーの可能性

// ✅ 良い例（条件分岐で安全に処理）
const existingProduct = cart.find(item => item.name === productName);
if (existingProduct) {
  existingProduct.quantity += 1; // 安全
}
```

### エラー2: 比較演算子の間違い
```javascript
// ❌ 悪い例（代入になってしまう）
if (existingProduct = undefined) { // =は代入

// ✅ 良い例（比較演算子）
if (existingProduct === undefined) { // ===は比較
```

### エラー3: 数量の初期化忘れ
```javascript
// ❌ 悪い例
const newProduct = {
  name: productName,
  price: price
  // quantityが未定義
};

// ✅ 良い例
const newProduct = {
  name: productName,
  price: price,
  quantity: 1  // 必ず初期値を設定
};
```

## 🎨 数量表示のスタイリング
```css
.product-info {
  color: #7f8c8d;
  font-size: 0.9em;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #ecf0f1;
}

.product-name {
  font-weight: bold;
  color: #2c3e50;
}
```

## ✅ 完成チェックリスト
- [ ] 同じ商品を複数回追加すると数量が増える
- [ ] 異なる商品は別々のアイテムとして表示される
- [ ] 数量が正しくカッコ内に表示される（例：(3個)）
- [ ] 総数量が正しく計算される
- [ ] コンソールで数量増加のメッセージが確認できる
- [ ] 新商品追加と既存商品の数量増加で異なるメッセージが表示される

## 🔗 次回予告
次回「22.4-cart-delete-function」では、カートから商品を削除する機能を学びます。`filter()`メソッドを使って、配列から特定の要素を除去する技術を身につけましょう！

---
**💻 find()メソッドは配列操作の中でもよく使われる重要な機能です。「条件に合う要素を探す」という考え方を身につけることで、より高度なプログラムが書けるようになります！**