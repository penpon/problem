# 22.4-cart-delete-function：カート削除機能

## 🎯 今回学ぶたった1つの新しいこと
**filter操作による要素削除**  
配列から特定の条件に合わない要素を除いて新しい配列を作る`filter()`メソッドを学び、カートから商品を削除する機能を実装します。

## 📖 前回までの復習
- 配列のpush操作（要素追加）
- 配列のmap操作（HTML生成）
- 配列のfind操作（要素検索）
- 条件分岐による数量管理

## 🚀 今回作るもの
カートに表示されている各商品に「削除」ボタンを追加し、クリックするとその商品がカートから完全に除去される機能を作ります。

### 完成イメージ
```
┌─────────────────────────┐
│ 📋 カートの中身：        │
├─────────────────────────┤
│ • 商品A - ¥1,000 (2個)  │
│   [削除] ←クリックで削除 │
│                         │
│ • 商品B - ¥2,000 (1個)  │
│   [削除]                │
│                         │
│ 合計：3個の商品          │
└─────────────────────────┘
```

## 💡 なぜこれが重要？
購入を迷っている商品や、間違えて追加した商品をカートから削除できる機能は、ユーザビリティの観点から必須です。filter()メソッドは配列操作の中でも頻繁に使われる重要な技術です。

## 📝 ステップバイステップ解説

### Step 1: filter()メソッドを理解しよう
```javascript
// 基本的なfilter()の例
const numbers = [1, 2, 3, 4, 5];

// 偶数のみを抽出
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]

// 3より大きい数のみを抽出
const bigNumbers = numbers.filter(num => num > 3);
console.log(bigNumbers); // [4, 5]

console.log(numbers); // [1, 2, 3, 4, 5] (元配列は変わらない)
```

### Step 2: 削除ボタン付きのHTML生成
```javascript
function displayCart() {
  if (cart.length === 0) {
    document.getElementById('cart-items').innerHTML = '<p>カートは空です</p>';
    document.getElementById('cart-count').textContent = '合計：0個の商品';
    return;
  }
  
  const cartHTML = cart.map(product => {
    return `
      <div class="cart-item">
        <div class="product-info">
          <span class="product-name">${product.name}</span>
          <span class="product-price">
            ¥${product.price.toLocaleString()} (${product.quantity}個)
          </span>
        </div>
        <button class="delete-btn" onclick="removeFromCart('${product.name}')">
          削除
        </button>
      </div>
    `;
  }).join('');
  
  const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
  
  document.getElementById('cart-items').innerHTML = cartHTML;
  document.getElementById('cart-count').textContent = `合計：${totalQuantity}個の商品`;
}
```

### Step 3: 削除機能の実装
```javascript
function removeFromCart(productName) {
  console.log(`削除対象: ${productName}`);
  
  // filter()を使って指定された商品以外を残す
  cart = cart.filter(product => product.name !== productName);
  
  console.log(`${productName}をカートから削除しました`);
  console.log('現在のカート:', cart);
  
  // カート表示を更新
  displayCart();
}
```

### Step 4: 確認ダイアログ付きの安全な削除
```javascript
function removeFromCart(productName) {
  // ユーザーに削除の確認を求める
  const confirmed = confirm(`${productName}をカートから削除しますか？`);
  
  if (confirmed) {
    // filter()で削除実行
    const beforeLength = cart.length;
    cart = cart.filter(product => product.name !== productName);
    const afterLength = cart.length;
    
    if (beforeLength > afterLength) {
      console.log(`${productName}をカートから削除しました`);
      displayCart();
    } else {
      console.log('削除対象の商品が見つかりませんでした');
    }
  } else {
    console.log('削除をキャンセルしました');
  }
}
```

## 🔍 重要なポイント

### filter()メソッドの特徴
- **条件に合う要素のみを残す**新しい配列を作成
- **元の配列は変更されない**（非破壊的）
- **条件に合わない要素は除外される**

```javascript
const animals = ['犬', '猫', '鳥', '魚'];

// '猫'以外を残す
const withoutCat = animals.filter(animal => animal !== '猫');
console.log(withoutCat); // ['犬', '鳥', '魚']
```

### 比較演算子の使い分け
```javascript
// 等しくない（除外したい条件）
product.name !== productName

// 等しい（残したい条件）
product.name === productName
```

### 削除前後の確認
```javascript
function removeFromCart(productName) {
  const beforeLength = cart.length;
  cart = cart.filter(product => product.name !== productName);
  const afterLength = cart.length;
  
  // 削除が実際に実行されたかチェック
  if (beforeLength > afterLength) {
    console.log('削除成功');
  } else {
    console.log('削除失敗：商品が見つかりませんでした');
  }
}
```

## ⚠️ よくあるエラーと対処法

### エラー1: 削除されない
```javascript
// ❌ 悪い例（新しい配列を代入し忘れ）
cart.filter(product => product.name !== productName); // cartに代入されない

// ✅ 良い例
cart = cart.filter(product => product.name !== productName);
```

### エラー2: 条件式の間違い
```javascript
// ❌ 悪い例（削除したい商品を残してしまう）
cart = cart.filter(product => product.name === productName); // 削除対象だけ残る

// ✅ 良い例（削除したい商品以外を残す）
cart = cart.filter(product => product.name !== productName);
```

### エラー3: HTML内の引用符エラー
```javascript
// ❌ 悪い例（シングルクォートが競合）
onclick="removeFromCart('商品's名前')"

// ✅ 良い例（エスケープまたはダブルクォート使用）
onclick="removeFromCart(\"${product.name}\")"
// または
onclick="removeFromCart('${product.name.replace(/'/g, '\\\'')}')"
```

## 🎨 削除ボタンのスタイリング
```css
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ecf0f1;
}

.product-info {
  flex: 1;
}

.delete-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background: #c0392b;
}

.delete-btn:active {
  transform: translateY(1px);
}
```

## ✅ 完成チェックリスト
- [ ] 各商品に「削除」ボタンが表示される
- [ ] 削除ボタンをクリックすると商品がカートから除去される
- [ ] 確認ダイアログが表示される
- [ ] 削除後にカート表示が正しく更新される
- [ ] 総数量が正しく再計算される
- [ ] コンソールに削除完了のメッセージが表示される
- [ ] 全商品を削除すると「カートは空です」が表示される

## 🔗 次回予告
次回「22.5-data-persistence」では、ページを再読み込みしてもカートの内容が保持される永続化機能を学びます。LocalStorageを使ったデータの保存と読み込み技術を身につけましょう！

---
**💻 filter()メソッドは「条件に合うものを残す」という考え方です。削除は「削除したいもの以外を残す」ことで実現します。この概念をしっかり理解しましょう！**