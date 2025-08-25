# 22.6-price-calculation：金額計算システム

## 🎯 今回学ぶたった1つの新しいこと
**reduce操作と数値フォーマット**  
配列の要素を順次処理して1つの値にまとめる`reduce()`メソッドと、金額を見やすく表示するフォーマット技術を学びます。

## 📖 前回までの復習
- 配列の基本操作（push/map/find/filter）
- カートの商品管理（追加・削除・数量変更）
- LocalStorageでのデータ永続化
- JSON変換とエラーハンドリング

## 🚀 今回作るもの
カート内の商品から小計・消費税・送料を自動計算し、合計金額を表示するシステムを作ります。ECサイトに必要な本格的な金額計算機能を実装します。

### 完成イメージ
```
┌─────────────────────────┐
│ 📋 カートの中身：        │
│ • 商品A - ¥1,000 (2個)  │
│ • 商品B - ¥3,000 (1個)  │
│                         │
│ 💰 お会計：             │
│ 小計： ¥5,000           │
│ 消費税（10%）： ¥500     │
│ 送料： ¥0（送料無料）    │
│ ────────────────────     │
│ 合計： ¥5,500           │
└─────────────────────────┘
```

## 💡 なぜこれが重要？
正確な金額計算はECサイトの信頼性に直結する機能です。小数点の扱い、税計算、送料の判定など、実際の商取引で必要な計算ロジックを学ぶことで、実用的なWebアプリケーション開発スキルが身につきます。

## 📝 ステップバイステップ解説

### Step 1: reduce()メソッドを理解しよう
```javascript
// 基本的なreduce()の例
const numbers = [1, 2, 3, 4, 5];

// 合計を計算
const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0); // 初期値は0
console.log(sum); // 15

// 省略記法
const sum2 = numbers.reduce((acc, curr) => acc + curr, 0);
```

### Step 2: 小計の計算
```javascript
function calculateSubtotal() {
  // 各商品の価格×数量を合計
  const subtotal = cart.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);
  
  return subtotal;
}

// より詳細な計算（ログ付き）
function calculateSubtotalWithLog() {
  console.log('=== 小計計算開始 ===');
  
  const subtotal = cart.reduce((total, product) => {
    const productTotal = product.price * product.quantity;
    console.log(`${product.name}: ¥${product.price} × ${product.quantity} = ¥${productTotal}`);
    return total + productTotal;
  }, 0);
  
  console.log(`小計: ¥${subtotal}`);
  return subtotal;
}
```

### Step 3: 消費税の計算
```javascript
function calculateTax(subtotal) {
  const TAX_RATE = 0.10; // 消費税10%
  
  // 消費税は小数点以下切り捨て（一般的な計算方法）
  const tax = Math.floor(subtotal * TAX_RATE);
  
  return tax;
}
```

### Step 4: 送料の計算
```javascript
function calculateShipping(subtotal) {
  const FREE_SHIPPING_THRESHOLD = 3000; // 3000円以上で送料無料
  const SHIPPING_COST = 500; // 通常送料
  
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0; // 送料無料
  } else {
    return SHIPPING_COST;
  }
}
```

### Step 5: 総合的な金額計算システム
```javascript
function calculateTotalPrice() {
  // カートが空の場合
  if (cart.length === 0) {
    return {
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0
    };
  }
  
  // 小計計算
  const subtotal = calculateSubtotal();
  
  // 消費税計算
  const tax = calculateTax(subtotal);
  
  // 送料計算
  const shipping = calculateShipping(subtotal);
  
  // 合計計算
  const total = subtotal + tax + shipping;
  
  return {
    subtotal: subtotal,
    tax: tax,
    shipping: shipping,
    total: total
  };
}
```

### Step 6: 金額表示の更新
```javascript
function displayPriceBreakdown() {
  const prices = calculateTotalPrice();
  
  // 既存のカート表示に金額内訳を追加
  const priceBreakdownHTML = `
    <div class="price-breakdown">
      <h4>💰 お会計：</h4>
      <div class="price-row">
        <span>小計：</span>
        <span>¥${prices.subtotal.toLocaleString()}</span>
      </div>
      <div class="price-row">
        <span>消費税（10%）：</span>
        <span>¥${prices.tax.toLocaleString()}</span>
      </div>
      <div class="price-row">
        <span>送料：</span>
        <span>${prices.shipping === 0 ? '¥0（送料無料）' : '¥' + prices.shipping.toLocaleString()}</span>
      </div>
      <div class="price-row total-row">
        <span>合計：</span>
        <span>¥${prices.total.toLocaleString()}</span>
      </div>
    </div>
  `;
  
  // 金額内訳を表示
  document.getElementById('price-breakdown').innerHTML = priceBreakdownHTML;
}

// displayCart()関数も更新
function displayCart() {
  // 既存のカート商品表示
  displayCartItems();
  
  // 金額内訳の表示を追加
  displayPriceBreakdown();
}
```

## 🔍 重要なポイント

### reduce()メソッドの仕組み
```javascript
const cart = [
  { name: '商品A', price: 1000, quantity: 2 },
  { name: '商品B', price: 3000, quantity: 1 }
];

// reduce()の処理の流れ
// 1回目: total=0, product={name:'商品A', price:1000, quantity:2}
//        return 0 + (1000 * 2) = 2000
// 2回目: total=2000, product={name:'商品B', price:3000, quantity:1}
//        return 2000 + (3000 * 1) = 5000
// 結果: 5000
```

### 消費税計算の注意点
```javascript
// 小数点以下の処理方法
const subtotal = 1999;
const tax1 = subtotal * 0.1;        // 199.9
const tax2 = Math.floor(tax1);       // 199（切り捨て）
const tax3 = Math.round(tax1);       // 200（四捨五入）
const tax4 = Math.ceil(tax1);        // 200（切り上げ）

// 一般的には切り捨て（Math.floor）を使用
```

### 数値フォーマットの活用
```javascript
const price = 1234567;

// 3桁区切り
console.log(price.toLocaleString()); // "1,234,567"

// 通貨フォーマット
console.log(price.toLocaleString('ja-JP', {
  style: 'currency',
  currency: 'JPY'
})); // "¥1,234,567"
```

## ⚠️ よくあるエラーと対処法

### エラー1: reduce()の初期値忘れ
```javascript
// ❌ 悪い例（初期値がないと空配列でエラー）
const total = cart.reduce((acc, item) => acc + item.price);

// ✅ 良い例（必ず初期値を指定）
const total = cart.reduce((acc, item) => acc + item.price, 0);
```

### エラー2: 小数点計算の誤差
```javascript
// ❌ 問題のある例
const price1 = 0.1 + 0.2; // 0.30000000000000004

// ✅ 対処法（整数で計算してから小数点に戻す）
const price2 = (10 + 20) / 100; // 0.3

// または Math.round() を使用
const price3 = Math.round((0.1 + 0.2) * 100) / 100; // 0.3
```

### エラー3: undefinedでの計算
```javascript
// ❌ 悪い例（productが存在しない可能性）
const total = cart.reduce((acc, product) => {
  return acc + product.price * product.quantity; // productがundefinedの可能性
}, 0);

// ✅ 良い例（安全な計算）
const total = cart.reduce((acc, product) => {
  if (product && typeof product.price === 'number' && typeof product.quantity === 'number') {
    return acc + (product.price * product.quantity);
  }
  return acc;
}, 0);
```

## 🎨 金額表示のスタイリング
```css
.price-breakdown {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #27ae60;
}

.price-breakdown h4 {
  margin-bottom: 15px;
  color: #2c3e50;
}

.price-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 14px;
}

.total-row {
  border-top: 2px solid #27ae60;
  margin-top: 10px;
  padding-top: 10px;
  font-weight: bold;
  font-size: 18px;
  color: #27ae60;
}
```

## ✅ 完成チェックリスト
- [ ] 小計が正しく計算される（価格×数量の合計）
- [ ] 消費税が10%で計算される（小数点以下切り捨て）
- [ ] 3000円以上で送料無料、未満で500円送料が適用される
- [ ] 合計金額が正しく表示される
- [ ] 金額が3桁区切りで見やすく表示される
- [ ] カートが空の時は全て0円表示される
- [ ] 商品追加・削除時に金額が自動更新される

## 🎉 22-shopping-cart系 完成おめでとうございます！

これで本格的なショッピングカート機能が完成しました！学んだスキル：
- **配列操作**: push/map/find/filter/reduce
- **データ管理**: オブジェクト構造、数量管理
- **永続化**: LocalStorage、JSON変換
- **計算処理**: 金額計算、税計算、条件分岐
- **UI更新**: 動的HTML生成、リアルタイム表示

## 🔗 次のシリーズ予告
次回「23.1-product-info-display」では、商品詳細ページの構築を始めます。より複雑なオブジェクト構造でのデータ管理を学んでいきましょう！

---
**💻 reduce()は配列操作の集大成です。「配列の要素を1つの値にまとめる」という概念をマスターすることで、様々な集計処理ができるようになります！**