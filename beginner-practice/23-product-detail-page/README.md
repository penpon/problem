# 23-product-detail-page：商品詳細ページの構築

## 🎯 学習目標
このステップでは、ECサイトの核となる商品詳細ページを作成します。複数の商品画像を切り替えるギャラリー機能、サイズや色の選択、在庫状況の表示、そして顧客レビューの表示機能を学びます。

### 具体的に身につくスキル
- 画像ギャラリーとサムネイル操作
- セレクトボックスとラジオボタンの活用
- 条件分岐による動的な表示制御
- 配列データの効率的な操作
- ユーザーインターフェースの設計思想

## 📖 学習内容

### 今回学ぶ新しい概念
**画像配列とDOM操作** - 複数の画像を効率的に管理・表示する方法
- 画像の配列データ構造
- クリックイベントによる画像切り替え
- アクティブ状態の視覚的フィードバック

**条件分岐による表示制御** - 在庫状況に応じた表示変更
- `if文`を使った在庫チェック
- CSSクラスの動的な追加・削除
- ユーザーへの適切な情報提示

### 実装する機能
1. **商品画像ギャラリー**
   - メイン画像の表示
   - サムネイル画像一覧
   - クリックによる画像切り替え

2. **商品オプション選択**
   - サイズ選択（S/M/L/XL）
   - 色選択（複数カラー対応）
   - 選択状態の視覚的表示

3. **在庫管理システム**
   - 在庫数の表示
   - 在庫切れ時の購入ボタン無効化
   - 在庫状況に応じたメッセージ表示

4. **レビュー・評価表示**
   - 星評価の表示
   - 顧客レビューの一覧
   - 平均評価の自動計算

## 📝 学習ポイント

### 💡 なぜ商品詳細ページが重要？
ECサイトでは、顧客が購入を決定する最も重要なページです。必要な情報を分かりやすく提示し、安心して購入できる環境を作ることが売上に直結します。

### 💡 画像ギャラリーの実装方法
```javascript
// 画像データの構造例
const productImages = [
  { id: 1, url: "main-image.jpg", alt: "メイン画像" },
  { id: 2, url: "detail1.jpg", alt: "詳細画像1" },
  { id: 3, url: "detail2.jpg", alt: "詳細画像2" }
];

// 画像切り替えの基本的な流れ
function changeImage(imageIndex) {
  const mainImage = document.getElementById('main-image');
  mainImage.src = productImages[imageIndex].url;
  
  // アクティブなサムネイルの表示更新
  updateActiveThumbnail(imageIndex);
}
```

### 💡 在庫管理の考え方
```javascript
// 在庫チェックの例
function checkStock(selectedSize, selectedColor) {
  const stockInfo = getStockInfo(selectedSize, selectedColor);
  
  if (stockInfo.quantity <= 0) {
    disablePurchaseButton();
    showOutOfStockMessage();
  } else if (stockInfo.quantity <= 5) {
    showLowStockWarning(stockInfo.quantity);
  }
}
```

## 🔍 詳細解説

### Step 1: HTML構造の設計
```html
<div class="product-detail">
  <!-- 左側：商品画像ギャラリー -->
  <div class="product-gallery">
    <div class="main-image">
      <img id="main-image" src="main.jpg" alt="商品画像">
    </div>
    <div class="thumbnail-list">
      <!-- サムネイル画像がここに表示 -->
    </div>
  </div>
  
  <!-- 右側：商品情報 -->
  <div class="product-info">
    <h1 class="product-title">商品名</h1>
    <div class="product-price">¥価格</div>
    
    <!-- オプション選択 -->
    <div class="product-options">
      <div class="size-selection">
        <!-- サイズ選択ボタン -->
      </div>
      <div class="color-selection">
        <!-- 色選択ボタン -->
      </div>
    </div>
    
    <!-- 在庫情報 -->
    <div class="stock-info">
      <span class="stock-quantity">在庫: 10個</span>
    </div>
    
    <!-- 購入ボタン -->
    <button class="add-to-cart-btn">カートに追加</button>
  </div>
</div>
```

### Step 2: JavaScript でのオプション管理
```javascript
// 商品オプションの状態管理
let selectedOptions = {
  size: null,
  color: null
};

// サイズ選択の処理
function selectSize(size) {
  selectedOptions.size = size;
  updateSizeButtons(size);
  updateStockInfo();
  updatePurchaseButton();
}

// 色選択の処理
function selectColor(color) {
  selectedOptions.color = color;
  updateColorButtons(color);
  updateStockInfo();
  updatePurchaseButton();
}
```

### Step 3: 在庫管理システム
```javascript
// 在庫データの例
const stockData = {
  'S-red': { quantity: 5, price: 2980 },
  'M-red': { quantity: 10, price: 2980 },
  'L-red': { quantity: 0, price: 2980 },
  // ... 他のサイズ・色の組み合わせ
};

// 在庫情報の更新
function updateStockInfo() {
  const { size, color } = selectedOptions;
  
  if (!size || !color) return;
  
  const stockKey = `${size}-${color}`;
  const stock = stockData[stockKey];
  
  const stockElement = document.getElementById('stock-quantity');
  const purchaseBtn = document.getElementById('purchase-btn');
  
  if (stock && stock.quantity > 0) {
    stockElement.textContent = `在庫: ${stock.quantity}個`;
    purchaseBtn.disabled = false;
    purchaseBtn.textContent = 'カートに追加';
  } else {
    stockElement.textContent = '在庫切れ';
    purchaseBtn.disabled = true;
    purchaseBtn.textContent = '在庫切れ';
  }
}
```

## 🚀 実装のコツ

### 1. 段階的な機能実装
1. **静的な商品情報表示**
2. **画像ギャラリー機能**
3. **オプション選択機能**
4. **在庫管理システム**
5. **レビュー表示機能**

### 2. ユーザビリティの向上
- オプション未選択時の適切な案内
- 選択状態の視覚的なフィードバック
- 在庫状況の分かりやすい表示
- レスポンシブデザインでモバイル対応

### 3. エラーハンドリング
- 画像読み込み失敗時の代替表示
- 在庫データが見つからない場合の処理
- ネットワークエラー時の対応

## 🎨 スタイリングのポイント

### 画像ギャラリーのデザイン
- メイン画像の見やすいサイズ設定
- サムネイルのホバー効果
- アクティブサムネイルの明確な表示

### オプション選択のUI
- ボタン形式での直感的な選択
- 選択状態の視覚的フィードバック
- 無効化された選択肢の表示

### 在庫情報の表示
- 在庫切れ時の赤色表示
- 残り少ない場合の注意喚起
- 購入ボタンの状態変化

## ✅ 完成チェックリスト
- [ ] メイン画像が正しく表示される
- [ ] サムネイルをクリックして画像を切り替えられる
- [ ] サイズを選択できる
- [ ] 色を選択できる
- [ ] 選択状態が視覚的に分かる
- [ ] 在庫状況が正しく表示される
- [ ] 在庫切れ時に購入ボタンが無効化される
- [ ] レビュー・評価が表示される
- [ ] レスポンシブデザインで表示される

## 🔗 次のステップ
この商品詳細ページをマスターしたら、次は「24-user-authentication」でユーザー認証システムの構築を学びます。会員登録やログイン機能を実装していきます。

---
**💻 実際にコードを書いて動かしてみましょう！完璧を目指さず、まずは基本機能から始めて徐々に改善していくことが大切です。**