# 22-shopping-cart-advanced：本格ショッピングカート機能

## 🎯 学習目標
このステップでは、実際のECサイトで使われるような本格的なショッピングカート機能を構築します。カートへの商品追加・削除・数量変更、合計金額の自動計算、そしてブラウザを閉じても情報が保持される永続化機能まで学びます。

### 具体的に身につくスキル
- ショッピングカートの状態管理
- LocalStorageを使ったデータの永続化
- 複雑なJavaScriptオブジェクトの操作
- 動的なDOM更新とイベント処理
- 数値計算と税込価格表示

## 📖 学習内容

### 今回学ぶ新しい概念
**LocalStorage（ローカルストレージ）** - ブラウザにデータを保存する仕組み
- `localStorage.setItem()` でデータを保存
- `localStorage.getItem()` でデータを取得
- ブラウザを閉じてもデータが残る

### 実装する機能
1. **商品をカートに追加**
   - 「カートに追加」ボタンをクリック
   - 既に同じ商品がある場合は数量を増やす

2. **カート内での商品管理**
   - 数量の増減（+/-ボタン）
   - 商品の削除（×ボタン）
   - 合計金額の自動計算

3. **カートバッジ表示**
   - カート内の商品数を表示
   - リアルタイムで更新

4. **データの永続化**
   - ページを再読み込みしてもカート内容が保持
   - LocalStorageを使用

## 📝 学習ポイント

### 💡 なぜLocalStorageが重要？
実際のECサイトでは、ユーザーがページを移動したり、間違ってブラウザを閉じても、カート内容が消えないことが重要です。LocalStorageを使うことで、この問題を解決できます。

### 💡 データ構造の設計
```javascript
// カート内のデータ構造例
const cartData = [
  {
    id: 1,
    name: "商品名",
    price: 1000,
    quantity: 2,
    image: "画像のURL"
  }
];
```

### 💡 金額計算のポイント
- 小数点の計算誤差を避ける方法
- 税込価格の計算（消費税10%）
- 合計金額の表示フォーマット

## 🔍 詳細解説

### Step 1: HTML構造の準備
```html
<!-- カートボタン（バッジ付き） -->
<div class="cart-button">
  🛒 カート (<span id="cart-count">0</span>)
</div>

<!-- 商品一覧 -->
<div class="products">
  <!-- 各商品に「カートに追加」ボタン -->
</div>

<!-- カート表示エリア -->
<div class="cart-area">
  <div class="cart-items">
    <!-- カート内商品がここに表示される -->
  </div>
  <div class="cart-summary">
    <!-- 合計金額表示 -->
  </div>
</div>
```

### Step 2: JavaScriptでのカート管理
```javascript
// カートデータの初期化
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// カートに商品を追加
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;  // 既存商品の数量を増やす
  } else {
    cart.push({ ...product, quantity: 1 });  // 新商品を追加
  }
  
  saveCart();  // LocalStorageに保存
  updateCartDisplay();  // 画面を更新
}
```

### Step 3: LocalStorageへの保存
```javascript
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
}
```

## 🚀 実装のコツ

### 1. 段階的な実装
1. **まず基本的なカート追加機能を作る**
2. **次に数量変更機能を追加**
3. **最後にLocalStorage対応**

### 2. エラーハンドリング
- LocalStorageが使えない環境への対応
- データ形式が正しくない場合の処理

### 3. ユーザビリティの向上
- カート追加時のアニメーション
- 数量変更時の即座な金額更新
- 空のカート時のメッセージ表示

## 🎨 スタイリングのポイント

### カートボタンのデザイン
- バッジの円形デザイン
- 商品数が0の時は非表示
- ホバー効果で操作感を演出

### カートエリアのレイアウト
- 商品情報の見やすい配置
- 数量変更ボタンの操作しやすさ
- 合計金額の目立つ表示

## ✅ 完成チェックリスト
- [ ] 商品をカートに追加できる
- [ ] 同じ商品を追加すると数量が増える
- [ ] カート内で数量を変更できる
- [ ] 商品をカートから削除できる
- [ ] 合計金額が正しく計算される
- [ ] カートバッジが正しく表示される
- [ ] ページを再読み込みしてもカート内容が保持される
- [ ] 税込価格が正しく表示される

## 🔗 次のステップ
このショッピングカート機能をマスターしたら、次は「23-product-detail-page」で商品詳細ページの作成を学びます。サイズや色の選択、在庫管理などを学んでいきます。

---
**💻 実際にコードを書いて動かしてみましょう！失敗しても大丈夫です。エラーも立派な学習材料です。**