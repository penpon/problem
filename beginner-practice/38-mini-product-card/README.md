# ステップ19: 商品カード

## 🎯 学習目標

**これまでの全技術（HTML/CSS/JavaScript）を統合し、実用的な商品カードシステムを作成する**

- HTML、CSS、JavaScriptの知識を組み合わせた実用的なコンポーネント作成
- 商品情報の動的な表示・変更システムの実装
- 「いいね」ボタンやカウンター機能などのユーザーインタラクション
- 商品詳細の表示切替、価格表示、在庫管理などの実際のECサイトレベルの機能
- レスポンシブデザインによるマルチデバイス対応

## 📝 学習内容

### **統合技術**
- **HTML**：セマンティックな商品カード構造
- **CSS**：美しいデザイン、ホバー効果、アニメーション
- **JavaScript**：動的な機能、状態管理、ユーザーインタラクション

### **実装する機能**
- **いいねシステム**：ボタンクリックでいいね数増減
- **商品詳細切替**：詳細情報の表示・非表示
- **価格・セール表示**：割引率計算と表示
- **在庫管理**：在庫数の動的更新
- **カートシステム**：商品追加・削除機能
- **画像切替**：複数商品画像の切り替え

### **前回の復習**
- DOM操作による要素の取得と内容変更
- フォーム処理と入力値の取得・検証
- エラーハンドリングとユーザーフレンドリーなメッセージ表示

### **重要なポイント**
1. **技術統合**：HTML、CSS、JavaScriptを組み合わせた実用的なアプリケーション
2. **状態管理**：ユーザーの操作に応じた動的な状態変更
3. **ユーザビリティ**：直感的な操作感と視覚的フィードバック
4. **実用性**：実際のECサイトで使えるレベルの機能実装

## 🔍 商品カードシステムとは？

### **ECサイトの基本コンポーネント**
商品カードは、ECサイトやショッピングアプリで最も重要なUI要素の一つです。

```html
<div class="product-card">
    <img src="product.jpg" alt="商品画像">
    <h3>商品名</h3>
    <p class="price">価格</p>
    <button class="like-btn">いいね</button>
    <button class="cart-btn">カートに追加</button>
</div>
```

### **実装する主要機能**
- 商品情報の表示
- ユーザーインタラクション（いいね、カート追加）
- 動的な状態変更
- 視覚的フィードバック

## 🔍 コードの説明

### **HTML（index.html）**
セマンティックなHTML構造で、商品情報を構造化し、アクセシビリティも考慮した設計になっています。

### **CSS（style.css）**
モダンなグラデーション、影効果、ホバーアニメーション、レスポンシブデザインを組み合わせた美しいデザインです。

### **JavaScript（script.js）**
ユーザーインタラクション、状態管理、動的コンテンツ更新を含む約150行の実用的なコードです。

## 🔍 状態管理の基本

### **商品データの管理**
```javascript
const productData = {
    id: 1,
    name: "ワイヤレスイヤホン",
    price: 12800,
    originalPrice: 16000,
    stock: 15,
    likes: 127,
    liked: false,
    inCart: false,
    cartQuantity: 0
};
```

### **状態の更新**
```javascript
function updateProductState(property, value) {
    productData[property] = value;
    updateDisplay();
    saveToLocalStorage();
}
```

### **UIの反映**
```javascript
function updateDisplay() {
    // DOM要素を更新
    document.getElementById('like-count').textContent = productData.likes;
    document.getElementById('stock-count').textContent = productData.stock;
    // その他のUI要素を更新
}
```

## 🔍 ユーザーインタラクションの実装

### **1. いいね機能**
```javascript
function toggleLike() {
    if (productData.liked) {
        productData.likes--;
        productData.liked = false;
    } else {
        productData.likes++;
        productData.liked = true;
    }
    updateLikeButton();
}
```

### **2. カート機能**
```javascript
function addToCart() {
    if (productData.stock > 0) {
        productData.cartQuantity++;
        productData.stock--;
        updateCartDisplay();
        showNotification('カートに追加されました');
    }
}
```

### **3. 詳細表示切替**
```javascript
function toggleDetails() {
    const details = document.getElementById('product-details');
    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        details.classList.add('visible');
    } else {
        details.classList.remove('visible');
        details.classList.add('hidden');
    }
}
```

## 🚀 実践してみよう

### **手順1: ファイルを開く**
`19-mini-product-card/index.html` をブラウザで開いてください。

### **手順2: 各機能の確認**
1. **いいね機能**：ハートボタンをクリックしていいね数の変化を確認
2. **カート機能**：カートに追加ボタンで在庫数の減少を確認
3. **詳細表示**：「詳細を見る」ボタンで追加情報の表示・非表示
4. **画像切替**：複数の商品画像の切り替え機能
5. **レビュー機能**：星評価とレビュー投稿

### **手順3: 開発者ツールでの確認**
F12でコンソールを開き、以下を試してみましょう：
```javascript
// 商品データの確認
console.log(productData);

// 手動でいいね数を変更
updateProductState('likes', 200);
```

## ✨ 試してみよう

以下を変更して、機能を拡張してみましょう：

### **1. 新しい商品を追加**
```javascript
const products = [
    {
        id: 1,
        name: "ワイヤレスイヤホン",
        price: 12800,
        image: "product1.jpg"
    },
    {
        id: 2,
        name: "スマートウォッチ",
        price: 25600,
        image: "product2.jpg"
    }
];
```

### **2. 割引計算の実装**
```javascript
function calculateDiscount(originalPrice, salePrice) {
    const discount = ((originalPrice - salePrice) / originalPrice * 100).toFixed(0);
    return `${discount}%OFF`;
}
```

### **3. 在庫アラート機能**
```javascript
function checkStockLevel() {
    if (productData.stock <= 3 && productData.stock > 0) {
        showNotification('残りわずかです！', 'warning');
    } else if (productData.stock === 0) {
        showNotification('在庫切れです', 'error');
    }
}
```

### **4. お気に入り機能の拡張**
```javascript
function addToWishlist() {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.includes(productData.id)) {
        wishlist.push(productData.id);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showNotification('お気に入りに追加されました');
    }
}
```

## 📖 豆知識

### **localStorage の活用**
```javascript
// データの保存
function saveToLocalStorage() {
    localStorage.setItem('productData', JSON.stringify(productData));
}

// データの読み込み
function loadFromLocalStorage() {
    const saved = localStorage.getItem('productData');
    if (saved) {
        Object.assign(productData, JSON.parse(saved));
    }
}
```

### **価格のフォーマット**
```javascript
function formatPrice(price) {
    return new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY'
    }).format(price);
}
```

### **アニメーション効果の実装**
```css
.product-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
}

@keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.like-btn.liked {
    animation: bounce 0.3s ease;
}
```

## ⚠️ よくある間違い

### **1. 状態管理の不整合**
```javascript
// 間違い: UIだけ更新してデータを更新しない
document.getElementById('like-count').textContent = newCount;

// 正しい: データとUIを同期
function updateLikes(newCount) {
    productData.likes = newCount;
    document.getElementById('like-count').textContent = newCount;
}
```

### **2. イベントリスナーの重複追加**
```javascript
// 間違い: 同じ要素に何度もリスナーを追加
button.addEventListener('click', handler);
button.addEventListener('click', handler); // 重複

// 正しい: 一度だけ追加、または削除してから追加
button.removeEventListener('click', handler);
button.addEventListener('click', handler);
```

### **3. 非同期処理の考慮不足**
```javascript
// 改善前: 即座にUIを更新
function addToCart() {
    updateUI();  // APIレスポンス前に更新
    api.addToCart();
}

// 改善後: レスポンスを待ってから更新
async function addToCart() {
    try {
        await api.addToCart();
        updateUI();
        showNotification('追加完了');
    } catch (error) {
        showNotification('エラーが発生しました', 'error');
    }
}
```

## 🎯 実用的な機能拡張

### **1. 商品比較機能**
```javascript
const comparison = {
    products: [],
    add(productId) {
        if (this.products.length < 3) {
            this.products.push(productId);
            this.updateCompareButton();
        }
    },
    remove(productId) {
        this.products = this.products.filter(id => id !== productId);
        this.updateCompareButton();
    }
};
```

### **2. 最近見た商品**
```javascript
function addToRecentlyViewed(productId) {
    let recent = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    recent = recent.filter(id => id !== productId); // 重複削除
    recent.unshift(productId); // 先頭に追加
    recent = recent.slice(0, 10); // 10件まで保持
    localStorage.setItem('recentlyViewed', JSON.stringify(recent));
}
```

### **3. 商品レコメンデーション**
```javascript
function getRecommendations(currentProduct) {
    // 簡単な類似商品推薦ロジック
    return products.filter(product => 
        product.category === currentProduct.category &&
        product.id !== currentProduct.id
    ).slice(0, 4);
}
```

## 🎨 デザインのポイント

### **カラーパレット**
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #48bb78;
    --warning-color: #ed8936;
    --error-color: #f56565;
    --text-color: #2d3748;
    --bg-color: #f7fafc;
}
```

### **レスポンシブデザイン**
```css
/* モバイル */
@media (max-width: 768px) {
    .product-card {
        width: 100%;
        margin: 0 auto 20px;
    }
}

/* タブレット */
@media (min-width: 769px) and (max-width: 1024px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* デスクトップ */
@media (min-width: 1025px) {
    .product-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

### **アクセシビリティ**
```html
<button 
    aria-label="商品をお気に入りに追加"
    aria-pressed="false"
    id="like-button">
    <span aria-hidden="true">❤️</span>
    お気に入り
</button>
```

## ✅ このステップでできるようになること

- [ ] HTML、CSS、JavaScriptを統合した実用的なコンポーネントを作成できる
- [ ] 商品データの状態管理を適切に実装できる
- [ ] ユーザーインタラクション（いいね、カート、詳細表示）を実装できる
- [ ] localStorage を使ったデータの永続化ができる
- [ ] レスポンシブデザインでマルチデバイス対応ができる
- [ ] 価格計算、割引表示、在庫管理などの実用的な機能を実装できる
- [ ] アニメーション効果で優れたユーザーエクスペリエンスを提供できる
- [ ] エラーハンドリングとユーザーフレンドリーな通知システムを実装できる
- [ ] セマンティックHTMLとアクセシビリティを考慮したマークアップができる
- [ ] 実際のECサイトで使えるレベルの商品カードを作成できる

## 📚 次のステップ

次は **ステップ20: 2商品ギャラリー** で複数商品の管理、商品切り替え機能、そして学習の集大成として今後の発展的な学習への道筋を示します！

---

**🎉 HTML、CSS、JavaScriptの全技術を統合した実用的な商品カードを完成させました！これで実際のECサイトで使えるレベルのコンポーネントが作れるようになり、Web開発の基礎を完全にマスターしましたね！**