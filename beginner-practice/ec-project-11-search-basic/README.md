# 33-search-basic：基本検索機能の実装

## 🎯 学習目標
この学習では、文字列検索の基本を学び、ユーザーが商品名で商品を探せる検索機能を実装します。JavaScriptの文字列操作と配列のフィルタリング機能の理解を深めます。

### 身につく新概念
- **文字列検索**: `includes()`メソッドによる部分一致検索
- **リアルタイム検索**: 入力と同時に検索結果を表示
- **検索結果のハイライト**: 一致した部分を視覚的に強調

## 📖 学習内容

### 実装する機能
1. **検索バーの追加** 🔍 - Bootstrap Input groupを使用した検索UI
2. **リアルタイム検索** ⚡ - 入力しながら結果を更新
3. **検索結果の表示** 📊 - マッチした商品のみを表示
4. **検索のクリア機能** 🗑️ - 検索条件をリセットする機能

### 検索システムの基本構造
```html
<!-- 検索UI部分 -->
<div class="search-section mb-4">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="input-group input-group-lg">
          <span class="input-group-text">
            <i class="bi bi-search"></i> 🔍
          </span>
          <input type="text" 
                 class="form-control" 
                 id="searchInput" 
                 placeholder="商品名を入力して検索..."
                 autocomplete="off">
          <button class="btn btn-outline-secondary" 
                  type="button" 
                  id="clearSearch">
            クリア
          </button>
        </div>
      </div>
    </div>
    
    <!-- 検索結果表示エリア -->
    <div class="row mt-3">
      <div class="col-12">
        <div class="search-info">
          <span id="searchResults" class="text-muted"></span>
        </div>
      </div>
    </div>
  </div>
</div>
```

## 📝 学習ポイント

### 💡 基本的な検索システムの実装

```javascript
class SearchSystem {
  constructor() {
    // 32番の商品データを拡張
    this.allProducts = [
      {
        id: 1,
        name: "ベーシックTシャツ",
        category: "トップス",
        price: 2500,
        images: ["images/tshirt-1.jpg", "images/tshirt-2.jpg"],
        description: "柔らかくて着心地の良いベーシックTシャツです。"
      },
      {
        id: 2,
        name: "デニムパンツ",
        category: "ボトムス", 
        price: 6500,
        images: ["images/jeans-1.jpg", "images/jeans-2.jpg"],
        description: "スタイリッシュなデニムパンツ。様々なコーディネートに合います。"
      },
      {
        id: 3,
        name: "カジュアルスニーカー",
        category: "シューズ",
        price: 8500,
        images: ["images/shoes-1.jpg", "images/shoes-2.jpg"],
        description: "歩きやすくおしゃれなカジュアルスニーカーです。"
      },
      {
        id: 4,
        name: "コットンシャツ",
        category: "トップス",
        price: 4200,
        images: ["images/shirt-1.jpg", "images/shirt-2.jpg"],
        description: "上質なコットン素材を使用したシンプルなシャツです。"
      },
      {
        id: 5,
        name: "チノパンツ",
        category: "ボトムス",
        price: 5800,
        images: ["images/chino-1.jpg", "images/chino-2.jpg"],
        description: "カジュアルからビジネスカジュアルまで使えるチノパンツ。"
      },
      {
        id: 6,
        name: "レザーブーツ",
        category: "シューズ",
        price: 12000,
        images: ["images/boots-1.jpg", "images/boots-2.jpg"],
        description: "本格的なレザーを使用した長く愛用できるブーツです。"
      }
    ];
    
    // 検索関連の状態
    this.currentSearchTerm = '';
    this.filteredProducts = [...this.allProducts];
    
    this.init();
  }
  
  init() {
    this.setupSearchInput();
    this.displayProducts();
  }
  
  // 検索入力の設定
  setupSearchInput() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');
    
    // リアルタイム検索
    searchInput.addEventListener('input', (e) => {
      this.currentSearchTerm = e.target.value.trim();
      this.performSearch();
    });
    
    // クリア機能
    clearButton.addEventListener('click', () => {
      this.clearSearch();
    });
    
    // エンターキーでの検索
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.performSearch();
      }
    });
  }
  
  // 検索実行
  performSearch() {
    if (this.currentSearchTerm === '') {
      // 検索語が空の場合は全商品を表示
      this.filteredProducts = [...this.allProducts];
    } else {
      // 商品名で検索（大文字小文字を区別しない）
      this.filteredProducts = this.allProducts.filter(product => 
        product.name.toLowerCase().includes(this.currentSearchTerm.toLowerCase())
      );
    }
    
    this.displayProducts();
    this.updateSearchInfo();
  }
  
  // 検索クリア
  clearSearch() {
    document.getElementById('searchInput').value = '';
    this.currentSearchTerm = '';
    this.filteredProducts = [...this.allProducts];
    this.displayProducts();
    this.updateSearchInfo();
  }
  
  // 検索結果情報の更新
  updateSearchInfo() {
    const searchResultsElement = document.getElementById('searchResults');
    
    if (this.currentSearchTerm === '') {
      searchResultsElement.textContent = `全${this.allProducts.length}件の商品を表示中`;
    } else {
      const count = this.filteredProducts.length;
      if (count > 0) {
        searchResultsElement.textContent = 
          `"${this.currentSearchTerm}" の検索結果: ${count}件見つかりました`;
      } else {
        searchResultsElement.textContent = 
          `"${this.currentSearchTerm}" に一致する商品が見つかりませんでした`;
      }
    }
  }
  
  // 商品表示
  displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    if (this.filteredProducts.length === 0) {
      productsGrid.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="no-results">
            <h4>🔍 検索結果がありません</h4>
            <p class="text-muted">
              検索条件を変更して再度お試しください
            </p>
            <button class="btn btn-primary" onclick="searchSystem.clearSearch()">
              全商品を見る
            </button>
          </div>
        </div>
      `;
      return;
    }
    
    productsGrid.innerHTML = '';
    
    this.filteredProducts.forEach(product => {
      const productCard = this.createProductCard(product);
      productsGrid.appendChild(productCard);
    });
  }
  
  // 商品カード作成（32番から継承）
  createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';
    
    // 検索語のハイライト
    const highlightedName = this.highlightSearchTerm(product.name);
    
    col.innerHTML = `
      <div class="card product-card h-100">
        <div class="card-img-container">
          <img src="${product.images[0]}" 
               class="card-img-top product-img" 
               alt="${product.name}">
          <div class="img-overlay">
            <button class="btn btn-light btn-sm" 
                    onclick="showProductDetail(${product.id})">
              詳細を見る
            </button>
          </div>
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${highlightedName}</h5>
          <p class="card-text text-muted small flex-grow-1">
            ${product.description}
          </p>
          <div class="product-price">
            <span class="h4 text-primary">¥${product.price.toLocaleString()}</span>
          </div>
          <button class="btn btn-primary mt-auto" 
                  onclick="addToCart(${product.id})">
            <i class="bi bi-cart-plus"></i> カートに追加
          </button>
        </div>
      </div>
    `;
    
    return col;
  }
  
  // 検索語のハイライト表示
  highlightSearchTerm(text) {
    if (!this.currentSearchTerm) return text;
    
    const regex = new RegExp(`(${this.currentSearchTerm})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }
}

// ページ読み込み時に検索システムを初期化
document.addEventListener('DOMContentLoaded', () => {
  window.searchSystem = new SearchSystem();
});
```

### 💡 検索機能のCSS

```css
/* 検索セクションのスタイル */
.search-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.search-section .input-group {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.search-section .form-control {
  border: none;
  padding: 1rem;
  font-size: 1.1rem;
}

.search-section .form-control:focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
  border-color: transparent;
}

/* 検索結果情報 */
.search-info {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

/* ハイライト表示 */
.search-highlight {
  background-color: #fff3cd;
  color: #856404;
  padding: 0.1em 0.2em;
  border-radius: 0.25rem;
  font-weight: bold;
}

/* 商品カードのホバー効果 */
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.card-img-container {
  position: relative;
  overflow: hidden;
}

.product-img {
  transition: transform 0.3s ease;
}

.card-img-container:hover .product-img {
  transform: scale(1.05);
}

.img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-img-container:hover .img-overlay {
  opacity: 1;
}

/* 検索結果なしの場合 */
.no-results {
  padding: 3rem 2rem;
}

.no-results h4 {
  color: #6c757d;
  margin-bottom: 1rem;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .search-section {
    padding: 1.5rem 0;
  }
  
  .search-section .input-group {
    flex-direction: column;
  }
  
  .search-section .input-group > * {
    border-radius: 0.375rem !important;
    margin-bottom: 0.5rem;
  }
  
  .search-section .input-group > *:last-child {
    margin-bottom: 0;
  }
}
```

## 🚀 実装のコツ

### 初心者が注意すべきポイント
- **大文字小文字の区別**: `toLowerCase()`で統一する
- **空文字の処理**: 検索語が空の場合の処理を忘れずに
- **リアルタイム検索**: `input`イベントを使用する
- **エラーハンドリング**: 商品が見つからない場合の表示

### デバッグのポイント
- コンソールで検索結果の配列を確認
- 検索語が正しく取得できているかチェック
- フィルタリング条件の論理を確認

### Bootstrap活用
- **Input group**: 検索アイコンとクリアボタンの統合
- **Card component**: 商品表示の統一感
- **Utility classes**: レスポンシブ対応とスペーシング

## ✅ 完成チェックリスト

### 基本機能
- [ ] 検索バーが表示される
- [ ] 文字入力と同時に検索が実行される
- [ ] 商品名で部分一致検索ができる
- [ ] 検索結果が正しく表示される
- [ ] クリアボタンで検索がリセットされる

### UI/UX機能
- [ ] 検索結果の件数が表示される
- [ ] 検索語がハイライトされる
- [ ] 検索結果がない場合の表示がある
- [ ] モバイルでも使いやすいレイアウト

### 拡張機能
- [ ] エンターキーで検索実行
- [ ] 検索中の視覚的フィードバック
- [ ] 商品カードのホバー効果

## 🎉 次の学習

おめでとうございます！検索機能の基本を習得しました。

### 🌟 習得したスキル
- **文字列検索**: `includes()`を使った部分一致検索
- **配列操作**: `filter()`メソッドによるデータ絞り込み
- **リアルタイム処理**: ユーザー入力に応じた即座な反応
- **UI/UX向上**: 検索結果のハイライト表示

### 🚀 次の課題（34-category-filter）
次は「カテゴリフィルター機能」に挑戦します！
- 複数条件での絞り込み
- チェックボックスでの選択UI
- 検索とフィルターの組み合わせ

---
**💡 検索機能はECサイトの使いやすさを大きく左上させる重要な機能です！**