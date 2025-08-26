# ステップ70: 基本的なECサイト

## 🎯 学習目標
これまで学んだHTML、CSS、JavaScriptの基礎知識を使って、シンプルで実用的な基本ECサイトを作ります。初心者が「ECサイトを作れた！」と達成感を得られる、理解しやすいレベルで実装します。

### 身につく基本概念
- **HTML/CSS/JavaScript の総合活用**: 基礎技術の統合練習
- **商品表示**: 複数商品のカード表示
- **基本的なカート機能**: 商品の追加・削除・数量変更
- **簡単な検索・フィルター**: 基本的なデータ処理

## 📖 学習内容

### 実装する基本機能
1. **商品表示** 📦 - 3-4個の商品をカード形式で表示
2. **商品詳細** 🔍 - クリックで詳細情報を表示
3. **カート機能** 🛒 - 商品の追加・削除・数量変更
4. **カテゴリフィルター** 📂 - カテゴリ別に商品を絞り込み
5. **商品検索** 🔍 - 商品名での簡単な検索
6. **合計計算** 💰 - カート内商品の合計金額表示

### 基本的なECサイト構造
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>基本ショップ - 初心者向けECサイト</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- ヘッダー -->
  <header>
    <h1>🛍️ 基本ショップ</h1>
    <div id="cartButton">
      🛒 カート (<span id="cartCount">0</span>)
    </div>
  </header>

  <!-- 検索とフィルター -->
  <div class="controls">
    <input type="text" id="searchInput" placeholder="商品を検索...">
    <select id="categoryFilter">
      <option value="">すべてのカテゴリ</option>
      <option value="服">服</option>
      <option value="靴">靴</option>
      <option value="バッグ">バッグ</option>
    </select>
  </div>

  <!-- 商品一覧 -->
  <div class="products-grid" id="productsGrid">
    <!-- JavaScript で商品が追加される -->
  </div>

  <!-- カートサイドバー -->
  <div id="cartSidebar" class="cart-sidebar hidden">
    <div class="cart-header">
      <h3>🛒 ショッピングカート</h3>
      <button id="closeCart">✕</button>
    </div>
    <div id="cartItems" class="cart-items">
      <!-- JavaScript でカートアイテムが追加される -->
    </div>
    <div class="cart-total">
      <strong>合計: ¥<span id="cartTotal">0</span></strong>
    </div>
  </div>

  <!-- 商品詳細モーダル -->
  <div id="productModal" class="modal hidden">
    <div class="modal-content">
      <button id="closeModal">✕</button>
      <div id="productDetails">
        <!-- JavaScript で商品詳細が表示される -->
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

## 📝 学習ポイント

### 💡 基本的なJavaScript実装

```javascript
// 商品データ（配列とオブジェクトの基礎）
const products = [
  {
    id: 1,
    name: "ベーシックTシャツ",
    category: "服",
    price: 2980,
    image: "https://via.placeholder.com/200x200?text=Tシャツ",
    description: "着心地の良いベーシックなTシャツです。"
  },
  {
    id: 2,
    name: "カジュアルスニーカー",
    category: "靴", 
    price: 4980,
    image: "https://via.placeholder.com/200x200?text=スニーカー",
    description: "歩きやすくて丈夫なスニーカーです。"
  },
  {
    id: 3,
    name: "レザーバッグ",
    category: "バッグ",
    price: 8980,
    image: "https://via.placeholder.com/200x200?text=バッグ",
    description: "上質なレザーを使ったおしゃれなバッグです。"
  }
];

// カートの状態管理（基本的な配列操作）
let cart = [];

// DOM要素の取得（getElementById の基礎）
function getElements() {
  return {
    productsGrid: document.getElementById('productsGrid'),
    cartButton: document.getElementById('cartButton'),
    cartCount: document.getElementById('cartCount'),
    cartSidebar: document.getElementById('cartSidebar'),
    closeCart: document.getElementById('closeCart'),
    cartItems: document.getElementById('cartItems'),
    cartTotal: document.getElementById('cartTotal'),
    searchInput: document.getElementById('searchInput'),
    categoryFilter: document.getElementById('categoryFilter')
  };
}

// 商品を表示する関数
function displayProducts(productsToShow = products) {
  const elements = getElements();
  elements.productsGrid.innerHTML = '';
  
  productsToShow.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">¥${product.price.toLocaleString()}</p>
      <p class="description">${product.description}</p>
      <button onclick="addToCart(${product.id})" class="add-to-cart-btn">
        🛒 カートに追加
      </button>
      <button onclick="showProductDetail(${product.id})" class="detail-btn">
        詳細を見る
      </button>
    `;
    
    elements.productsGrid.appendChild(productCard);
  });
}

// カートに商品を追加する関数
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  updateCartDisplay();
  updateCartCount();
}

// 検索機能
function searchProducts() {
  const elements = getElements();
  const searchTerm = elements.searchInput.value.toLowerCase();
  const category = elements.categoryFilter.value;
  
  let filteredProducts = products;
  
  // 検索フィルター
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm)
    );
  }
  
  // カテゴリフィルター
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category === category
    );
  }
  
  displayProducts(filteredProducts);
}

// 初期化処理
document.addEventListener('DOMContentLoaded', function() {
  displayProducts();
  
  // イベントリスナーの設定
  const elements = getElements();
  
  // カートボタンクリック
  elements.cartButton.addEventListener('click', function() {
    elements.cartSidebar.classList.toggle('hidden');
  });
  
  // 検索機能
  elements.searchInput.addEventListener('input', searchProducts);
  elements.categoryFilter.addEventListener('change', searchProducts);
});
```

### 💡 基本的なCSS実装

```css
/* 基本的なレイアウト */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f4f4f4;
}

/* ヘッダー */
header {
  background-color: #007bff;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#cartButton {
  background-color: rgba(255,255,255,0.2);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

/* 商品グリッド */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
  margin: 1rem 0;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin: 0.3rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
```

## 🚀 実装のコツ

### 初心者向けポイント
- **シンプルな構造**: 複雑なフレームワークは使わず、基本的なHTML/CSS/JSのみ
- **理解しやすいコード**: クラス設計ではなく関数ベースで実装
- **段階的実装**: 一つずつ機能を追加していく
- **基本的なDOM操作**: getElementById、addEventListener の活用

### JavaScript基礎の復習
- **配列操作**: push、find、filter、forEach の活用
- **オブジェクト操作**: プロパティの取得と設定
- **イベントハンドリング**: click、input、change イベント
- **DOM操作**: 要素の作成、追加、スタイル変更

## ✅ 完成チェックリスト

### 基本機能
- [ ] 商品データが正しく表示される
- [ ] カートへの商品追加が動作する
- [ ] カート内の商品数量変更ができる
- [ ] 合計金額が正しく計算される
- [ ] 検索機能が動作する
- [ ] カテゴリフィルターが動作する

### UI/UX
- [ ] レスポンシブ対応（スマートフォンでも見やすい）
- [ ] ホバーエフェクトが適切に動作する
- [ ] ボタンが押しやすく配置されている
- [ ] カートの開閉がスムーズに動作する

### コード品質
- [ ] 変数名が分かりやすい
- [ ] 関数が適切に分割されている
- [ ] コメントが必要な箇所に記載されている
- [ ] エラーが発生しないようにコードが書かれている

## 🎉 完成おめでとうございます！

### 🌟 身につけたスキル
- **HTML/CSS/JavaScript の統合**: 3つの技術を組み合わせたサイト制作
- **データ処理の基礎**: 配列とオブジェクトを使ったデータ管理
- **DOM操作**: JavaScriptでHTMLを動的に変更する技術
- **イベント処理**: ユーザーの操作に応じた処理の実装
- **レスポンシブデザイン**: 様々な画面サイズに対応したデザイン

### 🚀 次のステップ
この基礎力をベースに、さらなるスキルアップを目指しましょう：

1. **より高度な機能**: ユーザー登録・ログイン機能
2. **データの永続化**: LocalStorageの活用
3. **API連携**: 外部データの取得と表示
4. **フレームワーク学習**: React、Vue.js などの習得
5. **バックエンド技術**: Node.js、データベース

---

**🎊 Great Job! あなたは初心者向けECサイトを完成させました！🎊**

この経験を通じて、Webサイト制作の基礎をしっかりと身につけることができました。これからも継続して学習を続け、より高度なWebアプリケーションの開発に挑戦していきましょう！