# 26.1-search-basic：基本的な検索機能

## 🎯 学習目標
このステップでは、商品データの中からキーワードに一致するものを探す基本的な検索機能を実装します。文字列の検索処理、配列のフィルタリング、リアルタイム検索表示を学びます。

### 具体的に身につくスキル
- 配列データの検索とフィルタリング
- `Array.filter()` メソッドの基本的な使い方
- 文字列の部分一致検索（`includes()` メソッド）
- リアルタイム検索の実装基礎

## 📖 学習内容

### 今回学ぶ新しい概念
**Array.filter()** - 配列から条件に合う要素を抽出
- 元の配列を変更せずに新しい配列を作成
- 条件に合う要素だけを含む配列を返す

**文字列検索** - テキスト内での検索処理
- `includes()` メソッドで部分一致検索
- `toLowerCase()` で大文字小文字を区別しない検索

### 実装する機能
1. **商品データの表示**
   - 配列に保存された商品情報の一覧表示

2. **基本的な検索機能**
   - キーワード入力での商品名検索
   - 大文字小文字を区別しない検索

3. **検索結果の表示**
   - 該当する商品のみ表示
   - 検索結果件数の表示

## 📝 学習ポイント

### 💡 基本的な商品データ構造
```javascript
const products = [
  { id: 1, name: 'スマートフォン', price: 50000, category: '電子機器' },
  { id: 2, name: 'ノートパソコン', price: 80000, category: '電子機器' },
  { id: 3, name: 'コーヒーメーカー', price: 15000, category: '家電' },
  { id: 4, name: 'ワイヤレスヘッドフォン', price: 20000, category: '電子機器' },
  { id: 5, name: 'トースター', price: 8000, category: '家電' }
];
```

### 💡 基本的な検索関数
```javascript
function searchProducts(keyword) {
  // 空文字の場合は全商品を返す
  if (!keyword.trim()) {
    return products;
  }
  
  // キーワードを小文字に変換
  const searchKeyword = keyword.toLowerCase();
  
  // 商品名に検索キーワードが含まれる商品をフィルタリング
  return products.filter(product => 
    product.name.toLowerCase().includes(searchKeyword)
  );
}
```

### 💡 検索結果の表示
```javascript
function displayProducts(productList) {
  const container = document.getElementById('products-container');
  
  if (productList.length === 0) {
    container.innerHTML = '<p class="no-results">検索結果が見つかりませんでした。</p>';
    return;
  }
  
  const html = productList.map(product => `
    <div class="product-card">
      <h3>${product.name}</h3>
      <p class="price">¥${product.price.toLocaleString()}</p>
      <p class="category">${product.category}</p>
    </div>
  `).join('');
  
  container.innerHTML = html;
}
```

## 🔍 詳細解説

### Step 1: HTML構造
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>26.1 基本検索機能</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>🔍 商品検索システム</h1>
    
    <div class="search-section">
      <div class="search-box">
        <input type="text" id="search-input" placeholder="商品名を入力してください..." />
        <button id="search-btn" class="search-btn">検索</button>
        <button id="clear-btn" class="clear-btn">クリア</button>
      </div>
      
      <div class="search-info">
        <span id="result-count">全ての商品を表示しています</span>
      </div>
    </div>
    
    <div id="products-container" class="products-grid">
      <!-- 商品が動的に表示されます -->
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>
```

### Step 2: CSSスタイル
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f7fa;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.search-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

#search-input {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

#search-input:focus {
  border-color: #3498db;
  outline: none;
}

.search-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.search-btn:hover {
  background-color: #2980b9;
}

.clear-btn {
  background-color: #95a5a6;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.clear-btn:hover {
  background-color: #7f8c8d;
}

.search-info {
  color: #666;
  font-size: 14px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.product-card h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.price {
  color: #e74c3c;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.category {
  color: #666;
  font-size: 14px;
  background-color: #ecf0f1;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

.no-results {
  text-align: center;
  color: #666;
  font-size: 18px;
  padding: 40px;
  grid-column: 1 / -1;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .search-box {
    flex-direction: column;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
}
```

### Step 3: JavaScript検索機能
```javascript
// 商品データ
const products = [
  { id: 1, name: 'iPhone 15', price: 120000, category: 'スマートフォン' },
  { id: 2, name: 'MacBook Air', price: 150000, category: 'ノートパソコン' },
  { id: 3, name: 'iPad Pro', price: 100000, category: 'タブレット' },
  { id: 4, name: 'AirPods Pro', price: 35000, category: 'ヘッドフォン' },
  { id: 5, name: 'Apple Watch', price: 50000, category: 'ウェアラブル' },
  { id: 6, name: 'コーヒーメーカー', price: 15000, category: '家電' },
  { id: 7, name: 'ワイヤレスマウス', price: 8000, category: 'PC周辺機器' },
  { id: 8, name: 'Bluetoothスピーカー', price: 12000, category: 'オーディオ' }
];

// DOM要素の取得
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');
const productsContainer = document.getElementById('products-container');
const resultCount = document.getElementById('result-count');

// 商品検索関数
function searchProducts(keyword) {
  // 空文字の場合は全商品を返す
  if (!keyword.trim()) {
    return products;
  }
  
  // キーワードを小文字に変換して検索
  const searchKeyword = keyword.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(searchKeyword)
  );
}

// 商品表示関数
function displayProducts(productList) {
  if (productList.length === 0) {
    productsContainer.innerHTML = '<p class="no-results">❌ 検索結果が見つかりませんでした。</p>';
    updateResultCount(0, searchInput.value);
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
  updateResultCount(productList.length, searchInput.value);
}

// 検索結果件数表示の更新
function updateResultCount(count, keyword) {
  if (!keyword.trim()) {
    resultCount.textContent = `全ての商品を表示しています (${count}件)`;
  } else {
    resultCount.textContent = `「${keyword}」の検索結果: ${count}件`;
  }
}

// 検索実行
function performSearch() {
  const keyword = searchInput.value;
  const results = searchProducts(keyword);
  displayProducts(results);
}

// クリア機能
function clearSearch() {
  searchInput.value = '';
  displayProducts(products);
  searchInput.focus();
}

// イベントリスナー設定
searchBtn.addEventListener('click', performSearch);
clearBtn.addEventListener('click', clearSearch);

// Enterキーでの検索
searchInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    performSearch();
  }
});

// リアルタイム検索（入力中に検索結果を更新）
searchInput.addEventListener('input', function() {
  // 少し遅延させてパフォーマンスを向上
  clearTimeout(searchInput.searchTimeout);
  searchInput.searchTimeout = setTimeout(performSearch, 300);
});

// 初期表示
displayProducts(products);
```

## 🚀 実装のコツ

### 1. パフォーマンス
- リアルタイム検索にsetTimeoutで遅延を追加
- 必要最小限のDOM操作
- 効率的な検索アルゴリズム

### 2. ユーザビリティ
- 大文字小文字を区別しない検索
- Enterキーでの検索実行
- クリアボタンで簡単リセット

### 3. 分かりやすさ
- 検索結果件数の表示
- 検索結果なしの場合の適切なメッセージ

## ✅ 完成チェックリスト
- [ ] 商品一覧が正しく表示される
- [ ] 検索ボックスに入力して検索できる
- [ ] 大文字小文字関係なく検索される
- [ ] 検索結果件数が表示される
- [ ] Enterキーで検索実行される
- [ ] クリアボタンで検索がリセットされる
- [ ] リアルタイム検索が機能する
- [ ] 検索結果なしの場合の表示が適切

## 🔗 次のステップ
基本的な検索機能をマスターしたら、次は「26.2-filter-combination」で複数条件の組み合わせフィルターを学びます。カテゴリー別・価格帯別の絞り込み機能を実装していきます。

---
**💻 検索機能はユーザーが目的の商品を見つけるための重要な機能です！**