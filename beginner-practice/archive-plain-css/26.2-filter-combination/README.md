# 26.2-filter-combination：複数条件の組み合わせフィルター

## 🎯 学習目標
このステップでは、複数の条件を組み合わせて商品を絞り込むフィルター機能を実装します。キーワード検索＋カテゴリー選択＋価格帯選択を同時に適用する方法を学びます。

### 具体的に身につくスキル
- 複数条件での配列フィルタリング
- 条件の論理演算（AND条件）
- セレクトボックスやチェックボックスの値取得
- 段階的なフィルタリング処理

## 📖 学習内容

### 今回学ぶ新しい概念
**複合条件フィルタリング** - 複数の条件を同時に適用
- 全ての条件を満たす商品のみを表示
- AND条件での絞り込み処理

**フォーム要素の値取得** - ユーザー選択の取得
- セレクトボックス（`<select>`）の値取得
- チェックボックス（`<input type="checkbox">`）の状態確認

### 実装する機能
1. **キーワード検索** - 商品名での検索
2. **カテゴリー選択** - 商品カテゴリーでの絞り込み
3. **価格帯選択** - 価格範囲での絞り込み
4. **フィルター条件表示** - 現在の絞り込み条件を表示

## 📝 学習ポイント

### 💡 複合フィルタリング関数
```javascript
function filterProducts(keyword, category, minPrice, maxPrice) {
  return products.filter(product => {
    // キーワード検索条件
    const matchesKeyword = !keyword || 
      product.name.toLowerCase().includes(keyword.toLowerCase());
    
    // カテゴリー条件
    const matchesCategory = !category || category === 'all' || 
      product.category === category;
    
    // 価格条件
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    
    // 全ての条件を満たす場合のみtrue
    return matchesKeyword && matchesCategory && matchesPrice;
  });
}
```

### 💡 フィルター条件の取得
```javascript
function getFilterConditions() {
  return {
    keyword: document.getElementById('search-input').value.trim(),
    category: document.getElementById('category-select').value,
    minPrice: parseInt(document.getElementById('min-price').value) || 0,
    maxPrice: parseInt(document.getElementById('max-price').value) || Infinity
  };
}
```

## 🔍 詳細解説

### Step 1: HTML構造（フィルター追加）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>26.2 複合フィルター機能</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>🔍 高度な商品検索</h1>
    
    <div class="filter-section">
      <h2>検索・フィルター</h2>
      
      <!-- キーワード検索 -->
      <div class="filter-group">
        <label for="search-input">商品名検索</label>
        <input type="text" id="search-input" placeholder="商品名を入力...">
      </div>
      
      <!-- カテゴリー選択 -->
      <div class="filter-group">
        <label for="category-select">カテゴリー</label>
        <select id="category-select">
          <option value="all">全てのカテゴリー</option>
          <option value="スマートフォン">スマートフォン</option>
          <option value="ノートパソコン">ノートパソコン</option>
          <option value="タブレット">タブレット</option>
          <option value="ヘッドフォン">ヘッドフォン</option>
          <option value="家電">家電</option>
        </select>
      </div>
      
      <!-- 価格帯選択 -->
      <div class="filter-group">
        <label>価格帯</label>
        <div class="price-inputs">
          <input type="number" id="min-price" placeholder="最低価格" min="0">
          <span>〜</span>
          <input type="number" id="max-price" placeholder="最高価格" min="0">
        </div>
      </div>
      
      <!-- ボタン -->
      <div class="filter-actions">
        <button id="apply-filter" class="apply-btn">フィルター適用</button>
        <button id="reset-filter" class="reset-btn">リセット</button>
      </div>
    </div>
    
    <!-- 現在のフィルター状態表示 -->
    <div class="current-filters">
      <span id="filter-status">全ての商品を表示中</span>
    </div>
    
    <div id="products-container" class="products-grid">
      <!-- 商品が動的に表示 -->
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>
```

### Step 2: JavaScript複合フィルター機能
```javascript
// 商品データ（前回より拡張）
const products = [
  { id: 1, name: 'iPhone 15', price: 120000, category: 'スマートフォン' },
  { id: 2, name: 'MacBook Air', price: 150000, category: 'ノートパソコン' },
  { id: 3, name: 'iPad Pro', price: 100000, category: 'タブレット' },
  { id: 4, name: 'AirPods Pro', price: 35000, category: 'ヘッドフォン' },
  { id: 5, name: 'Samsung Galaxy', price: 90000, category: 'スマートフォン' },
  { id: 6, name: 'コーヒーメーカー', price: 15000, category: '家電' },
  { id: 7, name: 'Surface Pro', price: 130000, category: 'タブレット' },
  { id: 8, name: 'Sony WH-1000XM4', price: 40000, category: 'ヘッドフォン' }
];

// DOM要素取得
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const applyBtn = document.getElementById('apply-filter');
const resetBtn = document.getElementById('reset-filter');
const productsContainer = document.getElementById('products-container');
const filterStatus = document.getElementById('filter-status');

// フィルター条件の取得
function getFilterConditions() {
  return {
    keyword: searchInput.value.trim(),
    category: categorySelect.value,
    minPrice: parseInt(minPriceInput.value) || 0,
    maxPrice: parseInt(maxPriceInput.value) || 999999
  };
}

// 複合フィルタリング関数
function filterProducts(keyword, category, minPrice, maxPrice) {
  return products.filter(product => {
    // キーワード検索条件（空の場合は条件なし）
    const matchesKeyword = !keyword || 
      product.name.toLowerCase().includes(keyword.toLowerCase());
    
    // カテゴリー条件（'all'の場合は条件なし）
    const matchesCategory = !category || category === 'all' || 
      product.category === category;
    
    // 価格条件
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    
    // 全ての条件を満たす場合のみtrue
    return matchesKeyword && matchesCategory && matchesPrice;
  });
}

// 商品表示関数
function displayProducts(productList) {
  if (productList.length === 0) {
    productsContainer.innerHTML = '<p class="no-results">条件に一致する商品が見つかりませんでした。</p>';
    return;
  }
  
  const html = productList.map(product => `
    <div class="product-card">
      <h3>${product.name}</h3>
      <p class="price">¥${product.price.toLocaleString()}</p>
      <p class="category">${product.category}</p>
    </div>
  `).join('');
  
  productsContainer.innerHTML = html;
}

// フィルター状態表示の更新
function updateFilterStatus(count, conditions) {
  let statusText = `${count}件の商品を表示中`;
  const activeFilters = [];
  
  if (conditions.keyword) {
    activeFilters.push(`キーワード: ${conditions.keyword}`);
  }
  
  if (conditions.category && conditions.category !== 'all') {
    activeFilters.push(`カテゴリー: ${conditions.category}`);
  }
  
  if (conditions.minPrice > 0 || conditions.maxPrice < 999999) {
    activeFilters.push(`価格: ¥${conditions.minPrice.toLocaleString()} - ¥${conditions.maxPrice.toLocaleString()}`);
  }
  
  if (activeFilters.length > 0) {
    statusText += ` (${activeFilters.join(', ')})`;
  }
  
  filterStatus.textContent = statusText;
}

// フィルター適用
function applyFilter() {
  const conditions = getFilterConditions();
  const filteredProducts = filterProducts(
    conditions.keyword,
    conditions.category,
    conditions.minPrice,
    conditions.maxPrice
  );
  
  displayProducts(filteredProducts);
  updateFilterStatus(filteredProducts.length, conditions);
}

// フィルターリセット
function resetFilter() {
  searchInput.value = '';
  categorySelect.value = 'all';
  minPriceInput.value = '';
  maxPriceInput.value = '';
  
  displayProducts(products);
  updateFilterStatus(products.length, {});
}

// イベントリスナー設定
applyBtn.addEventListener('click', applyFilter);
resetBtn.addEventListener('click', resetFilter);

// リアルタイムフィルター（入力時に自動適用）
searchInput.addEventListener('input', applyFilter);
categorySelect.addEventListener('change', applyFilter);
minPriceInput.addEventListener('input', applyFilter);
maxPriceInput.addEventListener('input', applyFilter);

// 初期表示
displayProducts(products);
updateFilterStatus(products.length, {});
```

## ✅ 完成チェックリスト
- [ ] キーワード検索が機能する
- [ ] カテゴリー選択で絞り込める
- [ ] 価格帯で絞り込める
- [ ] 複数条件を同時に適用できる
- [ ] フィルター状態が表示される
- [ ] リセットボタンが正しく動作する
- [ ] リアルタイムフィルタリングが機能する

## 🔗 次のステップ
次は「27-data-management-simplified」で大幅に簡素化されたデータ管理機能を学びます。

---
**💻 使いやすいフィルター機能で商品検索の利便性を向上させましょう！**