# 27-data-management-simplified：基本的なデータ管理

## 🎯 学習目標
このステップでは、商品データの基本的な管理機能を実装します。File APIやCSV処理などの高度な機能は除外し、配列操作の基本（追加・編集・削除）に集中して学習します。

### 具体的に身につくスキル
- 配列データの追加・編集・削除（CRUD操作の基本）
- フォームデータの取得と検証
- LocalStorageでのシンプルなデータ保存
- 基本的なID生成とユニーク性確保

## 📖 学習内容

### 今回学ぶ新しい概念
**CRUD操作** - データ操作の基本4機能
- **C**reate（作成）- 新しいデータの追加
- **R**ead（読み取り）- データの表示・検索
- **U**pdate（更新）- 既存データの編集
- **D**elete（削除）- データの削除

**LocalStorage** - ブラウザでのデータ保存
- `localStorage.setItem()` でデータ保存
- `localStorage.getItem()` でデータ取得
- JSON形式でのデータ保存

### 実装する機能
1. **商品の追加** - 新しい商品をリストに追加
2. **商品の表示** - 保存された商品を一覧表示
3. **商品の編集** - 既存商品の情報を更新
4. **商品の削除** - 商品をリストから削除
5. **データの永続化** - LocalStorageでの保存

## 📝 学習ポイント

### 💡 基本的なデータ構造
```javascript
const products = [
  { id: 1, name: 'スマートフォン', price: 50000, category: '電子機器' },
  { id: 2, name: 'ノートパソコン', price: 80000, category: '電子機器' }
];
```

### 💡 ID生成関数
```javascript
function generateId() {
  return Date.now(); // 現在時刻をIDとして使用（簡単な方法）
}
```

### 💡 基本的なCRUD操作
```javascript
// Create - 商品追加
function addProduct(name, price, category) {
  const newProduct = {
    id: generateId(),
    name: name,
    price: parseInt(price),
    category: category
  };
  
  products.push(newProduct);
  saveToLocalStorage();
  return newProduct;
}

// Update - 商品更新
function updateProduct(id, name, price, category) {
  const index = products.findIndex(p => p.id == id);
  if (index !== -1) {
    products[index] = { id: id, name, price: parseInt(price), category };
    saveToLocalStorage();
    return products[index];
  }
  return null;
}

// Delete - 商品削除
function deleteProduct(id) {
  const index = products.findIndex(p => p.id == id);
  if (index !== -1) {
    const deleted = products.splice(index, 1)[0];
    saveToLocalStorage();
    return deleted;
  }
  return null;
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
  <title>27 簡単データ管理</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>📦 商品データ管理</h1>
    
    <!-- 商品追加フォーム -->
    <div class="add-product-section">
      <h2>新しい商品を追加</h2>
      <form id="product-form" class="product-form">
        <div class="form-group">
          <label for="product-name">商品名</label>
          <input type="text" id="product-name" required>
        </div>
        
        <div class="form-group">
          <label for="product-price">価格</label>
          <input type="number" id="product-price" min="0" required>
        </div>
        
        <div class="form-group">
          <label for="product-category">カテゴリー</label>
          <select id="product-category" required>
            <option value="">選択してください</option>
            <option value="電子機器">電子機器</option>
            <option value="家電">家電</option>
            <option value="書籍">書籍</option>
            <option value="衣類">衣類</option>
            <option value="その他">その他</option>
          </select>
        </div>
        
        <button type="submit" id="submit-btn">商品を追加</button>
        <button type="button" id="cancel-btn" style="display: none;">キャンセル</button>
      </form>
    </div>
    
    <!-- 商品一覧 -->
    <div class="products-section">
      <div class="section-header">
        <h2>商品一覧</h2>
        <span id="product-count">0件</span>
      </div>
      
      <div id="products-list" class="products-list">
        <!-- 商品が動的に表示されます -->
      </div>
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>
```

### Step 2: JavaScript データ管理機能
```javascript
// 商品データ配列
let products = [];
let editingId = null; // 編集中の商品ID

// DOM要素取得
const productForm = document.getElementById('product-form');
const productName = document.getElementById('product-name');
const productPrice = document.getElementById('product-price');
const productCategory = document.getElementById('product-category');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const productsList = document.getElementById('products-list');
const productCount = document.getElementById('product-count');

// ID生成関数
function generateId() {
  return Date.now();
}

// LocalStorageへの保存
function saveToLocalStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}

// LocalStorageからの読み込み
function loadFromLocalStorage() {
  const saved = localStorage.getItem('products');
  if (saved) {
    products = JSON.parse(saved);
  }
}

// 商品追加
function addProduct(name, price, category) {
  const newProduct = {
    id: generateId(),
    name: name,
    price: parseInt(price),
    category: category
  };
  
  products.push(newProduct);
  saveToLocalStorage();
  return newProduct;
}

// 商品更新
function updateProduct(id, name, price, category) {
  const index = products.findIndex(p => p.id == id);
  if (index !== -1) {
    products[index] = {
      id: parseInt(id),
      name: name,
      price: parseInt(price),
      category: category
    };
    saveToLocalStorage();
    return products[index];
  }
  return null;
}

// 商品削除
function deleteProduct(id) {
  const index = products.findIndex(p => p.id == id);
  if (index !== -1) {
    const deleted = products.splice(index, 1)[0];
    saveToLocalStorage();
    return deleted;
  }
  return null;
}

// 商品一覧表示
function displayProducts() {
  if (products.length === 0) {
    productsList.innerHTML = '<p class="empty-state">商品がまだ追加されていません。</p>';
    productCount.textContent = '0件';
    return;
  }
  
  const html = products.map(product => `
    <div class="product-item" data-id="${product.id}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="price">¥${product.price.toLocaleString()}</p>
        <p class="category">${product.category}</p>
      </div>
      <div class="product-actions">
        <button class="edit-btn" onclick="editProduct(${product.id})">編集</button>
        <button class="delete-btn" onclick="confirmDelete(${product.id})">削除</button>
      </div>
    </div>
  `).join('');
  
  productsList.innerHTML = html;
  productCount.textContent = `${products.length}件`;
}

// 商品編集開始
function editProduct(id) {
  const product = products.find(p => p.id == id);
  if (product) {
    productName.value = product.name;
    productPrice.value = product.price;
    productCategory.value = product.category;
    
    editingId = id;
    submitBtn.textContent = '更新する';
    cancelBtn.style.display = 'inline-block';
    
    // フォームまでスクロール
    document.querySelector('.add-product-section').scrollIntoView();
  }
}

// 編集キャンセル
function cancelEdit() {
  productForm.reset();
  editingId = null;
  submitBtn.textContent = '商品を追加';
  cancelBtn.style.display = 'none';
}

// 削除確認
function confirmDelete(id) {
  const product = products.find(p => p.id == id);
  if (product && confirm(`「${product.name}」を削除しますか？`)) {
    deleteProduct(id);
    displayProducts();
  }
}

// フォーム送信処理
productForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = productName.value.trim();
  const price = productPrice.value;
  const category = productCategory.value;
  
  if (!name || !price || !category) {
    alert('すべての項目を入力してください。');
    return;
  }
  
  if (editingId) {
    // 更新
    updateProduct(editingId, name, price, category);
    cancelEdit();
  } else {
    // 新規追加
    addProduct(name, price, category);
    productForm.reset();
  }
  
  displayProducts();
});

// キャンセルボタン
cancelBtn.addEventListener('click', cancelEdit);

// 初期化
document.addEventListener('DOMContentLoaded', function() {
  loadFromLocalStorage();
  displayProducts();
});
```

## ✅ 完成チェックリスト
- [ ] 新しい商品を追加できる
- [ ] 商品一覧が表示される
- [ ] 商品を編集できる
- [ ] 商品を削除できる
- [ ] データがLocalStorageに保存される
- [ ] ページ再読み込み後もデータが残っている
- [ ] フォームのバリデーションが機能する

## 🔗 次のステップ
次は「28-navigation-simplified」で簡素化されたナビゲーションシステムを学びます。

---
**💻 データ管理の基本をマスターして、実用的なアプリケーション作成の基礎を築きましょう！**