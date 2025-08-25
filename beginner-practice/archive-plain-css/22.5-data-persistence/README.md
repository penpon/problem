# 22.5-data-persistence：データ永続化

## 🎯 今回学ぶたった1つの新しいこと
**JSON変換とLocalStorage**  
JavaScriptのオブジェクトや配列をJSON形式に変換して、ブラウザのLocalStorageに保存・読み込みする方法を学びます。

## 📖 前回までの復習
- 配列のpush/map/find/filter操作
- カートへの商品追加・表示・削除機能
- 数量管理と条件分岐
- ユーザーインターフェースの動的更新

## 🚀 今回作るもの
ページを再読み込み（F5キー）したり、ブラウザを閉じて再度開いても、カートの内容が保持される機能を作ります。

### 完成イメージ
```
【操作前】
┌─────────────────────────┐
│ 📋 カートの中身：        │
│ • 商品A - ¥1,000 (2個)  │
│ • 商品B - ¥2,000 (1個)  │
└─────────────────────────┘

【F5でページリロード後】
┌─────────────────────────┐
│ 📋 カートの中身：        │
│ • 商品A - ¥1,000 (2個)  │← そのまま残っている！
│ • 商品B - ¥2,000 (1個)  │← そのまま残っている！
└─────────────────────────┘
```

## 💡 なぜこれが重要？
実際のECサイトでは、ユーザーが商品を選んでいる途中でページを間違って閉じてしまったり、他のページを見に行ったりしても、カートの内容は保持されています。この機能があることで、ユーザーは安心してショッピングを続けられます。

## 📝 ステップバイステップ解説

### Step 1: LocalStorageとJSONを理解しよう
```javascript
// LocalStorageの基本操作
localStorage.setItem('key', 'value');        // 保存
const value = localStorage.getItem('key');   // 取得
localStorage.removeItem('key');              // 削除

// オブジェクトや配列は直接保存できない
const data = { name: '商品A', price: 1000 };
localStorage.setItem('product', data); // ❌ [object Object] になる

// JSON変換が必要
localStorage.setItem('product', JSON.stringify(data)); // ✅ 正しく保存
const savedData = JSON.parse(localStorage.getItem('product')); // ✅ 正しく取得
```

### Step 2: カートデータの保存機能
```javascript
function saveCartToStorage() {
  try {
    // 配列をJSON文字列に変換してLocalStorageに保存
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    console.log('カートデータを保存しました:', cart);
  } catch (error) {
    console.error('カートデータの保存に失敗しました:', error);
  }
}
```

### Step 3: カートデータの読み込み機能
```javascript
function loadCartFromStorage() {
  try {
    // LocalStorageからデータを取得
    const savedCart = localStorage.getItem('shoppingCart');
    
    if (savedCart) {
      // JSON文字列を配列に変換
      cart = JSON.parse(savedCart);
      console.log('保存されたカートデータを読み込みました:', cart);
    } else {
      // 保存されたデータがない場合は空の配列
      cart = [];
      console.log('新しいカートを作成しました');
    }
  } catch (error) {
    console.error('カートデータの読み込みに失敗しました:', error);
    cart = []; // エラー時は空のカートから開始
  }
}
```

### Step 4: ページ読み込み時の初期化
```javascript
// ページが読み込まれた時に実行される
window.addEventListener('DOMContentLoaded', function() {
  // 保存されたカートデータを読み込む
  loadCartFromStorage();
  
  // カート内容を画面に表示
  displayCart();
  
  console.log('ページ初期化完了');
});
```

### Step 5: カート操作時の自動保存
```javascript
// 商品追加時に保存
function addToCart(productName, price) {
  const existingProduct = cart.find(item => item.name === productName);
  
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      name: productName,
      price: price,
      quantity: 1
    });
  }
  
  // カートを更新したら必ず保存
  saveCartToStorage();
  displayCart();
}

// 商品削除時にも保存
function removeFromCart(productName) {
  const confirmed = confirm(`${productName}をカートから削除しますか？`);
  
  if (confirmed) {
    cart = cart.filter(product => product.name !== productName);
    
    // カートを更新したら必ず保存
    saveCartToStorage();
    displayCart();
  }
}
```

## 🔍 重要なポイント

### JSON.stringify()とJSON.parse()
```javascript
// オブジェクト → JSON文字列
const obj = { name: '商品A', price: 1000, inStock: true };
const jsonString = JSON.stringify(obj);
console.log(jsonString); // '{"name":"商品A","price":1000,"inStock":true}'

// JSON文字列 → オブジェクト
const parsedObj = JSON.parse(jsonString);
console.log(parsedObj.name); // '商品A'
```

### LocalStorageの制限事項
- **文字列のみ保存可能**（オブジェクトはJSON変換が必要）
- **保存容量は約5-10MB**
- **同じドメインでのみアクセス可能**
- **ユーザーが削除可能**（設定で無効化可能）

### エラーハンドリングの重要性
```javascript
function saveCartToStorage() {
  try {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  } catch (error) {
    // LocalStorageが無効/容量不足の場合
    console.error('保存できませんでした:', error);
    alert('カートの保存に失敗しました。ブラウザの設定を確認してください。');
  }
}
```

## ⚠️ よくあるエラーと対処法

### エラー1: JSON.parse()でのエラー
```javascript
// ❌ 悪い例（データが壊れている場合）
const savedCart = localStorage.getItem('shoppingCart');
const cart = JSON.parse(savedCart); // エラーの可能性

// ✅ 良い例（エラーハンドリング）
try {
  const savedCart = localStorage.getItem('shoppingCart');
  const cart = savedCart ? JSON.parse(savedCart) : [];
} catch (error) {
  console.error('データが壊れています:', error);
  const cart = []; // 初期化
}
```

### エラー2: LocalStorageが使えない環境
```javascript
// ✅ LocalStorageが使えるかチェック
function isLocalStorageAvailable() {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

if (isLocalStorageAvailable()) {
  saveCartToStorage();
} else {
  console.warn('LocalStorageが利用できません');
}
```

### エラー3: 古いデータ形式
```javascript
function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      
      // データ形式をチェック
      if (Array.isArray(cart)) {
        return cart;
      } else {
        console.warn('古いデータ形式です。初期化します。');
        return [];
      }
    }
  } catch (error) {
    console.error('読み込みエラー:', error);
    return [];
  }
}
```

## 🛠️ デバッグ用機能の追加
```javascript
// デバッグ用：保存されたデータの確認
function debugStorage() {
  console.log('=== LocalStorage内容確認 ===');
  const savedData = localStorage.getItem('shoppingCart');
  console.log('生データ:', savedData);
  
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      console.log('パース後:', parsedData);
    } catch (e) {
      console.log('パースエラー:', e);
    }
  }
}

// デバッグ用：保存データの削除
function clearStorage() {
  localStorage.removeItem('shoppingCart');
  console.log('保存データを削除しました');
}
```

## ✅ 完成チェックリスト
- [ ] 商品をカートに追加してからページを再読み込みしても内容が保持される
- [ ] 商品を削除してからページを再読み込みしても変更が保持される
- [ ] ブラウザを閉じて再度開いてもカート内容が残っている
- [ ] コンソールに保存・読み込み完了のメッセージが表示される
- [ ] LocalStorageが使えない環境でもエラーが出ない
- [ ] 開発者ツールのApplicationタブでLocalStorageの内容を確認できる

## 🔗 次回予告
次回「22.6-price-calculation」では、カート内商品の小計・税額・送料・合計金額を自動計算する機能を学びます。`reduce()`メソッドを使った数値計算と、実用的な金額表示フォーマットを身につけましょう！

---
**💻 LocalStorageは現代のWeb開発で必須の技術です。ユーザーエクスペリエンスを大幅に向上させる重要な機能なので、しっかりマスターしましょう！**