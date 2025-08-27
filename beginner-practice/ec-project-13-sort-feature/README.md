# 35-sort-feature：ソート機能の実装

## 🎯 学習目標
この学習では、配列のソート処理を学び、商品を様々な条件で並び替える機能を実装します。価格順、名前順、人気順など、ユーザーの好みに応じた商品の並び替えシステムを構築します。

### 身につく新概念
- **Array.sort()メソッド**: 配列の並び替え処理
- **比較関数**: カスタムソート条件の実装
- **複数ソート条件**: ソートの組み合わせと優先順位

## 📖 学習内容

### 実装する機能
1. **基本ソート機能** 📊 - 価格・名前・人気順での並び替え
2. **昇順・降順切り替え** ↕️ - ソート方向の選択
3. **ソート条件表示** 🏷️ - 現在のソート状態を表示
4. **検索・フィルターとの連携** 🔄 - 他の機能との組み合わせ

### ソートシステムの基本構造
```html
<!-- ソートコントロール -->
<div class="sort-controls mb-4">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-md-6">
        <div class="d-flex align-items-center">
          <label for="sortSelect" class="form-label me-2 mb-0">
            📊 並び順:
          </label>
          <select class="form-select form-select-sm" id="sortSelect" style="width: auto;">
            <option value="default">おすすめ順</option>
            <option value="name-asc">商品名（昇順）</option>
            <option value="name-desc">商品名（降順）</option>
            <option value="price-asc">価格（安い順）</option>
            <option value="price-desc">価格（高い順）</option>
            <option value="popularity-desc">人気順</option>
            <option value="newest">新着順</option>
          </select>
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="sort-info text-md-end">
          <small class="text-muted">
            <span id="sortedCount">6</span>件の商品を
            <span id="currentSort" class="fw-bold">おすすめ順</span>で表示
          </small>
        </div>
      </div>
    </div>
    
    <!-- ソートボタン（モバイル向け） -->
    <div class="row mt-2 d-md-none">
      <div class="col-12">
        <div class="btn-group btn-group-sm w-100" role="group">
          <button type="button" class="btn btn-outline-primary" data-sort="price-asc">
            💰 安い順
          </button>
          <button type="button" class="btn btn-outline-primary" data-sort="price-desc">
            💰 高い順
          </button>
          <button type="button" class="btn btn-outline-primary" data-sort="popularity-desc">
            ⭐ 人気順
          </button>
          <button type="button" class="btn btn-outline-primary" data-sort="newest">
            🆕 新着順
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

## 📝 学習ポイント

### 💡 ソートシステムの実装

```javascript
class SortSystem {
  constructor() {
    // 34番のフィルターシステムを拡張
    this.allProducts = [
      {
        id: 1,
        name: "ベーシックTシャツ",
        category: "トップス",
        price: 2500,
        popularity: 85, // 人気度（100点満点）
        releaseDate: new Date('2024-01-15'),
        images: ["images/tshirt-1.jpg"],
        description: "柔らかくて着心地の良いベーシックTシャツです。"
      },
      {
        id: 2,
        name: "デニムパンツ",
        category: "ボトムス",
        price: 6500,
        popularity: 92,
        releaseDate: new Date('2024-02-20'),
        images: ["images/jeans-1.jpg"],
        description: "スタイリッシュなデニムパンツ。"
      },
      {
        id: 3,
        name: "カジュアルスニーカー",
        category: "シューズ",
        price: 8500,
        popularity: 78,
        releaseDate: new Date('2024-03-10'),
        images: ["images/shoes-1.jpg"],
        description: "歩きやすくおしゃれなカジュアルスニーカー。"
      },
      {
        id: 4,
        name: "コットンシャツ",
        category: "トップス",
        price: 4200,
        popularity: 88,
        releaseDate: new Date('2024-01-25'),
        images: ["images/shirt-1.jpg"],
        description: "上質なコットン素材のシンプルなシャツ。"
      },
      {
        id: 5,
        name: "チノパンツ",
        category: "ボトムス",
        price: 5800,
        popularity: 75,
        releaseDate: new Date('2024-03-05'),
        images: ["images/chino-1.jpg"],
        description: "カジュアルからビジネスまで使えるチノパンツ。"
      },
      {
        id: 6,
        name: "レザーブーツ",
        category: "シューズ",
        price: 12000,
        popularity: 95,
        releaseDate: new Date('2024-02-28'),
        images: ["images/boots-1.jpg"],
        description: "本格レザーの長く愛用できるブーツ。"
      }
    ];
    
    // ソート状態
    this.currentSort = 'default';
    this.sortDirection = 'asc';
    
    // フィルター状態（34番から継承）
    this.filters = {
      searchTerm: '',
      categories: [],
      priceRanges: []
    };
    
    this.filteredProducts = [...this.allProducts];
    this.sortedProducts = [...this.allProducts];
    
    this.init();
  }
  
  init() {
    this.setupSearchInput();
    this.setupFilterInputs();
    this.setupSortControls();
    this.displayProducts();
  }
  
  // ソートコントロールの設定
  setupSortControls() {
    const sortSelect = document.getElementById('sortSelect');
    const sortButtons = document.querySelectorAll('[data-sort]');
    
    // ドロップダウンでのソート
    sortSelect.addEventListener('change', (e) => {
      const sortValue = e.target.value;
      this.applySorting(sortValue);
    });
    
    // ボタンでのソート（モバイル向け）
    sortButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const sortValue = e.target.dataset.sort;
        
        // アクティブボタンの切り替え
        sortButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // ドロップダウンも同期
        sortSelect.value = sortValue;
        
        this.applySorting(sortValue);
      });
    });
  }
  
  // ソート適用
  applySorting(sortType) {
    this.currentSort = sortType;
    
    // まずフィルタリングを適用
    this.applyFilters();
    
    // フィルタリング結果にソートを適用
    let sortedArray = [...this.filteredProducts];
    
    switch (sortType) {
      case 'name-asc':
        sortedArray.sort((a, b) => a.name.localeCompare(b.name));
        break;
        
      case 'name-desc':
        sortedArray.sort((a, b) => b.name.localeCompare(a.name));
        break;
        
      case 'price-asc':
        sortedArray.sort((a, b) => a.price - b.price);
        break;
        
      case 'price-desc':
        sortedArray.sort((a, b) => b.price - a.price);
        break;
        
      case 'popularity-desc':
        sortedArray.sort((a, b) => b.popularity - a.popularity);
        break;
        
      case 'newest':
        sortedArray.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        break;
        
      case 'default':
      default:
        // デフォルトは人気順＋価格を考慮したおすすめ順
        sortedArray.sort((a, b) => {
          const scoreA = a.popularity + (10000 - a.price) / 100;
          const scoreB = b.popularity + (10000 - b.price) / 100;
          return scoreB - scoreA;
        });
        break;
    }
    
    this.sortedProducts = sortedArray;
    this.displayProducts();
    this.updateSortInfo();
  }
  
  // フィルター適用（34番から継承）
  applyFilters() {
    let filtered = [...this.allProducts];
    
    // 検索条件
    if (this.filters.searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(this.filters.searchTerm.toLowerCase())
      );
    }
    
    // カテゴリフィルター
    if (this.filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        this.filters.categories.includes(product.category)
      );
    }
    
    // 価格帯フィルター
    if (this.filters.priceRanges.length > 0) {
      filtered = filtered.filter(product => {
        return this.filters.priceRanges.some(range => {
          return this.isInPriceRange(product.price, range);
        });
      });
    }
    
    this.filteredProducts = filtered;
  }
  
  // ソート情報の更新
  updateSortInfo() {
    const sortedCountElement = document.getElementById('sortedCount');
    const currentSortElement = document.getElementById('currentSort');
    
    if (sortedCountElement) {
      sortedCountElement.textContent = this.sortedProducts.length;
    }
    
    if (currentSortElement) {
      const sortLabels = {
        'default': 'おすすめ順',
        'name-asc': '商品名（昇順）',
        'name-desc': '商品名（降順）',
        'price-asc': '価格（安い順）',
        'price-desc': '価格（高い順）',
        'popularity-desc': '人気順',
        'newest': '新着順'
      };
      
      currentSortElement.textContent = sortLabels[this.currentSort] || 'おすすめ順';
    }
  }
  
  // 商品表示
  displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    if (this.sortedProducts.length === 0) {
      productsGrid.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="no-results">
            <h4>🔍 条件に合う商品が見つかりません</h4>
            <p class="text-muted">
              検索条件やフィルターを調整してお試しください
            </p>
            <button class="btn btn-primary" onclick="sortSystem.resetAllFilters()">
              全条件をリセット
            </button>
          </div>
        </div>
      `;
      return;
    }
    
    productsGrid.innerHTML = '';
    
    this.sortedProducts.forEach((product, index) => {
      const productCard = this.createProductCard(product, index + 1);
      productsGrid.appendChild(productCard);
    });
  }
  
  // 商品カード作成
  createProductCard(product, index) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';
    
    // 検索語のハイライト
    const highlightedName = this.highlightSearchTerm(product.name);
    
    // 人気バッジ
    const popularityBadge = product.popularity >= 90 ? 
      '<span class="badge bg-danger position-absolute top-0 start-0 m-2">🔥 人気</span>' :
      product.popularity >= 80 ? 
      '<span class="badge bg-warning position-absolute top-0 start-0 m-2">⭐ おすすめ</span>' : '';
    
    // 新着バッジ
    const isNew = new Date() - new Date(product.releaseDate) < 30 * 24 * 60 * 60 * 1000; // 30日以内
    const newBadge = isNew ? 
      '<span class="badge bg-success position-absolute top-0 end-0 m-2">🆕 新着</span>' : '';
    
    col.innerHTML = `
      <div class="card product-card h-100" style="animation-delay: ${index * 0.1}s">
        <div class="position-relative">
          <img src="${product.images[0]}" 
               class="card-img-top product-img" 
               alt="${product.name}">
          ${popularityBadge}
          ${newBadge}
          <div class="sort-rank">
            <span class="badge bg-primary">#${index}</span>
          </div>
          <div class="category-badge">
            <span class="badge bg-secondary">${product.category}</span>
          </div>
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${highlightedName}</h5>
          <p class="card-text text-muted small flex-grow-1">
            ${product.description}
          </p>
          
          <!-- 商品情報 -->
          <div class="product-info mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="h4 text-primary mb-0">¥${product.price.toLocaleString()}</span>
              <div class="rating">
                <span class="text-warning">
                  ${'★'.repeat(Math.floor(product.popularity / 20))}${'☆'.repeat(5 - Math.floor(product.popularity / 20))}
                </span>
                <span class="small text-muted">(${product.popularity})</span>
              </div>
            </div>
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
  
  // 検索・フィルター機能（34番から継承）
  setupSearchInput() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');
    
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filters.searchTerm = e.target.value.trim();
        this.applySorting(this.currentSort); // ソートを再適用
      });
    }
    
    if (clearButton) {
      clearButton.addEventListener('click', () => {
        searchInput.value = '';
        this.filters.searchTerm = '';
        this.applySorting(this.currentSort);
      });
    }
  }
  
  setupFilterInputs() {
    // カテゴリフィルター
    const categoryCheckboxes = document.querySelectorAll('input[id^="category-"]');
    categoryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updateCategoryFilters();
        this.applySorting(this.currentSort); // ソートを再適用
      });
    });
    
    // 価格帯フィルター
    const priceCheckboxes = document.querySelectorAll('input[id^="price-"]');
    priceCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updatePriceFilters();
        this.applySorting(this.currentSort); // ソートを再適用
      });
    });
  }
  
  updateCategoryFilters() {
    const checkedCategories = [];
    const categoryCheckboxes = document.querySelectorAll('input[id^="category-"]:checked');
    categoryCheckboxes.forEach(checkbox => {
      checkedCategories.push(checkbox.value);
    });
    this.filters.categories = checkedCategories;
  }
  
  updatePriceFilters() {
    const checkedPrices = [];
    const priceCheckboxes = document.querySelectorAll('input[id^="price-"]:checked');
    priceCheckboxes.forEach(checkbox => {
      checkedPrices.push(checkbox.value);
    });
    this.filters.priceRanges = checkedPrices;
  }
  
  // ユーティリティメソッド
  isInPriceRange(price, range) {
    const [min, max] = range.split('-').map(Number);
    
    if (max === 99999) {
      return price >= min;
    } else if (min === 0) {
      return price <= max;
    } else {
      return price >= min && price <= max;
    }
  }
  
  highlightSearchTerm(text) {
    if (!this.filters.searchTerm) return text;
    const regex = new RegExp(`(${this.filters.searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }
  
  resetAllFilters() {
    // 検索とフィルターをリセット
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.value = '';
    }
    this.filters.searchTerm = '';
    this.filters.categories = [];
    this.filters.priceRanges = [];
    
    // チェックボックスをリセット
    document.querySelectorAll('input[id^="category-"], input[id^="price-"]').forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // ソートをデフォルトに戻す
    document.getElementById('sortSelect').value = 'default';
    this.applySorting('default');
  }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
  window.sortSystem = new SortSystem();
});
```

### 💡 ソート機能のCSS

```css
/* ソートコントロール */
.sort-controls {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.sort-info {
  font-size: 0.9rem;
}

/* ソート順位表示 */
.sort-rank {
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  z-index: 2;
}

/* 商品カードアニメーション */
.product-card {
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* レーティング表示 */
.rating {
  text-align: right;
}

.rating .text-warning {
  font-size: 1.1em;
}

/* バッジスタイル */
.badge {
  font-size: 0.7em;
  font-weight: 500;
}

/* ボタングループ（モバイル） */
.btn-group .btn {
  font-size: 0.8rem;
  padding: 0.5rem 0.75rem;
}

.btn-group .btn.active {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: white;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .sort-controls {
    padding: 0.75rem;
  }
  
  .sort-info {
    margin-top: 0.5rem;
    text-align: center !important;
  }
  
  .sort-rank {
    display: none;
  }
}

/* ソート適用中のエフェクト */
.sorting-active .products-grid {
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.sorting-complete .products-grid {
  opacity: 1;
}
```

## 🚀 実装のコツ

### ソート処理の理解
- **sort()メソッド**: 配列の並び替えの基本
- **比較関数**: カスタムソート条件の作り方
- **複合ソート**: 複数の条件を組み合わせる方法

### UXの向上
- **リアルタイム更新**: ソート選択と同時に結果を表示
- **視覚的フィードバック**: 順位やバッジで情報を追加
- **状態の保持**: ソート条件とフィルターの組み合わせ

### Bootstrap活用
- **Select component**: ドロップダウンでのソート選択
- **Button group**: モバイル向けのタッチフレンドリーUI
- **Badge component**: 順位やステータス表示

## ✅ 完成チェックリスト

### 基本機能
- [ ] 価格順（昇順・降順）ソートができる
- [ ] 名前順（昇順・降順）ソートができる
- [ ] 人気順ソートができる
- [ ] 新着順ソートができる
- [ ] おすすめ順（デフォルト）が機能する

### UI/UX機能
- [ ] 現在のソート状態が表示される
- [ ] ソート結果の件数が表示される
- [ ] 商品に順位が表示される
- [ ] 人気・新着バッジが表示される

### 統合機能
- [ ] 検索とソートが連動する
- [ ] フィルターとソートが連動する
- [ ] モバイル用のタッチUI
- [ ] カードアニメーション効果

## 🎉 次の学習

おめでとうございます！ソート機能を習得しました。

### 🌟 習得したスキル
- **配列操作**: Array.sort()とカスタム比較関数
- **データ処理**: 複数条件での並び替え処理
- **UI連携**: ソート状態の表示と同期
- **UX設計**: ユーザーフレンドリーなソートUI

### 🚀 次の課題（36-form-validation）
次は「フォームバリデーション」に挑戦します！
- リアルタイム入力検証
- エラーメッセージの表示
- ユーザビリティの向上

---
**💡 ソート機能により、ユーザーが商品を好みの順序で閲覧できるようになりました！**