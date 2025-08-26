# 34-category-filter：カテゴリフィルター機能の実装

## 🎯 学習目標
このステップでは、複数の条件を組み合わせたフィルタリング機能を学びます。チェックボックスを使った複数選択と、検索機能との組み合わせによる高度な商品絞り込みシステムを実装します。

### 身につく新概念
- **複数条件フィルタリング**: 複数の条件を同時に適用する処理
- **チェックボックス操作**: 複数選択UIの実装
- **条件の組み合わせ**: 検索とフィルターの連携処理

## 📖 学習内容

### 実装する機能
1. **カテゴリフィルター** 🏷️ - チェックボックスでカテゴリ選択
2. **価格帯フィルター** 💰 - 価格範囲での絞り込み
3. **複合検索** 🔄 - 検索とフィルターの組み合わせ
4. **フィルターリセット** 🔄 - 全条件をクリアする機能

### フィルターシステムの基本構造
```html
<!-- フィルターサイドバー -->
<div class="filter-sidebar">
  <div class="card">
    <div class="card-header">
      <h5 class="mb-0">
        <i class="bi bi-funnel"></i> 絞り込み検索
      </h5>
    </div>
    <div class="card-body">
      <!-- カテゴリフィルター -->
      <div class="filter-section mb-4">
        <h6 class="filter-title">📂 カテゴリ</h6>
        <div class="filter-options">
          <div class="form-check">
            <input class="form-check-input" 
                   type="checkbox" 
                   value="トップス" 
                   id="category-tops">
            <label class="form-check-label" for="category-tops">
              トップス <span class="item-count">(2)</span>
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" 
                   type="checkbox" 
                   value="ボトムス" 
                   id="category-bottoms">
            <label class="form-check-label" for="category-bottoms">
              ボトムス <span class="item-count">(2)</span>
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" 
                   type="checkbox" 
                   value="シューズ" 
                   id="category-shoes">
            <label class="form-check-label" for="category-shoes">
              シューズ <span class="item-count">(2)</span>
            </label>
          </div>
        </div>
      </div>
      
      <!-- 価格帯フィルター -->
      <div class="filter-section mb-4">
        <h6 class="filter-title">💰 価格帯</h6>
        <div class="filter-options">
          <div class="form-check">
            <input class="form-check-input" 
                   type="checkbox" 
                   value="0-3000" 
                   id="price-1">
            <label class="form-check-label" for="price-1">
              ¥3,000以下
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" 
                   type="checkbox" 
                   value="3001-6000" 
                   id="price-2">
            <label class="form-check-label" for="price-2">
              ¥3,001 - ¥6,000
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" 
                   type="checkbox" 
                   value="6001-10000" 
                   id="price-3">
            <label class="form-check-label" for="price-3">
              ¥6,001 - ¥10,000
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" 
                   type="checkbox" 
                   value="10001-99999" 
                   id="price-4">
            <label class="form-check-label" for="price-4">
              ¥10,000以上
            </label>
          </div>
        </div>
      </div>
      
      <!-- アクションボタン -->
      <div class="filter-actions">
        <button class="btn btn-primary btn-sm" id="applyFilters">
          <i class="bi bi-check"></i> 適用
        </button>
        <button class="btn btn-outline-secondary btn-sm" id="resetFilters">
          <i class="bi bi-arrow-counterclockwise"></i> リセット
        </button>
      </div>
      
      <!-- アクティブフィルター表示 -->
      <div class="active-filters mt-3" id="activeFilters" style="display: none;">
        <h6 class="mb-2">適用中の条件:</h6>
        <div id="activeFilterTags"></div>
      </div>
    </div>
  </div>
</div>
```

## 📝 学習ポイント

### 💡 複合フィルタリングシステムの実装

```javascript
class CategoryFilterSystem {
  constructor() {
    // 33番の検索システムを拡張
    this.allProducts = [
      {
        id: 1,
        name: "ベーシックTシャツ",
        category: "トップス",
        price: 2500,
        images: ["images/tshirt-1.jpg"],
        description: "柔らかくて着心地の良いベーシックTシャツです。"
      },
      {
        id: 2,
        name: "デニムパンツ",
        category: "ボトムス",
        price: 6500,
        images: ["images/jeans-1.jpg"],
        description: "スタイリッシュなデニムパンツ。"
      },
      {
        id: 3,
        name: "カジュアルスニーカー",
        category: "シューズ",
        price: 8500,
        images: ["images/shoes-1.jpg"],
        description: "歩きやすくおしゃれなカジュアルスニーカー。"
      },
      {
        id: 4,
        name: "コットンシャツ",
        category: "トップス",
        price: 4200,
        images: ["images/shirt-1.jpg"],
        description: "上質なコットン素材のシンプルなシャツ。"
      },
      {
        id: 5,
        name: "チノパンツ",
        category: "ボトムス",
        price: 5800,
        images: ["images/chino-1.jpg"],
        description: "カジュアルからビジネスまで使えるチノパンツ。"
      },
      {
        id: 6,
        name: "レザーブーツ",
        category: "シューズ",
        price: 12000,
        images: ["images/boots-1.jpg"],
        description: "本格レザーの長く愛用できるブーツ。"
      }
    ];
    
    // フィルター状態
    this.filters = {
      searchTerm: '',
      categories: [], // 選択されたカテゴリ
      priceRanges: [] // 選択された価格帯
    };
    
    this.filteredProducts = [...this.allProducts];
    
    this.init();
  }
  
  init() {
    this.setupSearchInput();
    this.setupFilterInputs();
    this.updateCategoryCounts();
    this.displayProducts();
  }
  
  // 検索入力の設定（33番から継承）
  setupSearchInput() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');
    
    searchInput.addEventListener('input', (e) => {
      this.filters.searchTerm = e.target.value.trim();
      this.applyFilters();
    });
    
    clearButton.addEventListener('click', () => {
      searchInput.value = '';
      this.filters.searchTerm = '';
      this.applyFilters();
    });
  }
  
  // フィルター入力の設定
  setupFilterInputs() {
    // カテゴリフィルター
    const categoryCheckboxes = document.querySelectorAll('input[id^="category-"]');
    categoryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updateCategoryFilters();
        this.applyFilters();
      });
    });
    
    // 価格帯フィルター
    const priceCheckboxes = document.querySelectorAll('input[id^="price-"]');
    priceCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updatePriceFilters();
        this.applyFilters();
      });
    });
    
    // 適用ボタン
    document.getElementById('applyFilters').addEventListener('click', () => {
      this.applyFilters();
    });
    
    // リセットボタン
    document.getElementById('resetFilters').addEventListener('click', () => {
      this.resetAllFilters();
    });
  }
  
  // カテゴリフィルターの更新
  updateCategoryFilters() {
    const checkedCategories = [];
    const categoryCheckboxes = document.querySelectorAll('input[id^="category-"]:checked');
    
    categoryCheckboxes.forEach(checkbox => {
      checkedCategories.push(checkbox.value);
    });
    
    this.filters.categories = checkedCategories;
  }
  
  // 価格帯フィルターの更新
  updatePriceFilters() {
    const checkedPrices = [];
    const priceCheckboxes = document.querySelectorAll('input[id^="price-"]:checked');
    
    priceCheckboxes.forEach(checkbox => {
      checkedPrices.push(checkbox.value);
    });
    
    this.filters.priceRanges = checkedPrices;
  }
  
  // フィルター適用
  applyFilters() {
    let filtered = [...this.allProducts];
    
    // 検索条件の適用
    if (this.filters.searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(this.filters.searchTerm.toLowerCase())
      );
    }
    
    // カテゴリフィルターの適用
    if (this.filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        this.filters.categories.includes(product.category)
      );
    }
    
    // 価格帯フィルターの適用
    if (this.filters.priceRanges.length > 0) {
      filtered = filtered.filter(product => {
        return this.filters.priceRanges.some(range => {
          return this.isInPriceRange(product.price, range);
        });
      });
    }
    
    this.filteredProducts = filtered;
    this.displayProducts();
    this.updateSearchInfo();
    this.updateActiveFilters();
  }
  
  // 価格範囲の判定
  isInPriceRange(price, range) {
    const [min, max] = range.split('-').map(Number);
    
    if (max === 99999) {
      // "10001-99999" は "10000以上" を意味
      return price >= min;
    } else if (min === 0) {
      // "0-3000" は "3000以下" を意味
      return price <= max;
    } else {
      // 通常の範囲
      return price >= min && price <= max;
    }
  }
  
  // カテゴリ別商品数の更新
  updateCategoryCounts() {
    const categories = ['トップス', 'ボトムス', 'シューズ'];
    
    categories.forEach(category => {
      const count = this.allProducts.filter(p => p.category === category).length;
      const countElement = document.querySelector(`label[for="category-${category.toLowerCase().replace('ス', 's')}"] .item-count`);
      if (countElement) {
        countElement.textContent = `(${count})`;
      }
    });
  }
  
  // アクティブフィルターの表示
  updateActiveFilters() {
    const activeFiltersContainer = document.getElementById('activeFilters');
    const activeFilterTags = document.getElementById('activeFilterTags');
    
    const activeTags = [];
    
    // 検索条件
    if (this.filters.searchTerm) {
      activeTags.push(`検索: "${this.filters.searchTerm}"`);
    }
    
    // カテゴリ条件
    if (this.filters.categories.length > 0) {
      activeTags.push(`カテゴリ: ${this.filters.categories.join(', ')}`);
    }
    
    // 価格条件
    if (this.filters.priceRanges.length > 0) {
      const priceLabels = this.filters.priceRanges.map(range => {
        const [min, max] = range.split('-').map(Number);
        if (max === 99999) return '¥10,000以上';
        if (min === 0) return '¥3,000以下';
        return `¥${min.toLocaleString()} - ¥${max.toLocaleString()}`;
      });
      activeTags.push(`価格帯: ${priceLabels.join(', ')}`);
    }
    
    if (activeTags.length > 0) {
      activeFilterTags.innerHTML = activeTags.map(tag => 
        `<span class="badge bg-primary me-1 mb-1">${tag}</span>`
      ).join('');
      activeFiltersContainer.style.display = 'block';
    } else {
      activeFiltersContainer.style.display = 'none';
    }
  }
  
  // 全フィルターリセット
  resetAllFilters() {
    // 検索条件リセット
    document.getElementById('searchInput').value = '';
    this.filters.searchTerm = '';
    
    // カテゴリフィルターリセット
    document.querySelectorAll('input[id^="category-"]').forEach(checkbox => {
      checkbox.checked = false;
    });
    this.filters.categories = [];
    
    // 価格帯フィルターリセット
    document.querySelectorAll('input[id^="price-"]').forEach(checkbox => {
      checkbox.checked = false;
    });
    this.filters.priceRanges = [];
    
    // フィルター適用
    this.applyFilters();
  }
  
  // 検索情報の更新
  updateSearchInfo() {
    const searchResultsElement = document.getElementById('searchResults');
    const totalCount = this.allProducts.length;
    const filteredCount = this.filteredProducts.length;
    
    if (this.hasActiveFilters()) {
      searchResultsElement.textContent = 
        `${filteredCount}件の商品が見つかりました（全${totalCount}件中）`;
    } else {
      searchResultsElement.textContent = `全${totalCount}件の商品を表示中`;
    }
  }
  
  // アクティブなフィルターがあるかチェック
  hasActiveFilters() {
    return this.filters.searchTerm || 
           this.filters.categories.length > 0 || 
           this.filters.priceRanges.length > 0;
  }
  
  // 商品表示（33番から継承して拡張）
  displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    if (this.filteredProducts.length === 0) {
      productsGrid.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="no-results">
            <h4>🔍 条件に合う商品が見つかりません</h4>
            <p class="text-muted">
              検索条件やフィルターを調整してお試しください
            </p>
            <button class="btn btn-primary" onclick="filterSystem.resetAllFilters()">
              全条件をリセット
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
  
  // 商品カード作成
  createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';
    
    // 検索語のハイライト（33番から継承）
    const highlightedName = this.highlightSearchTerm(product.name);
    
    col.innerHTML = `
      <div class="card product-card h-100">
        <div class="position-relative">
          <img src="${product.images[0]}" 
               class="card-img-top product-img" 
               alt="${product.name}">
          <div class="category-badge">
            <span class="badge bg-secondary">${product.category}</span>
          </div>
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${highlightedName}</h5>
          <p class="card-text text-muted small flex-grow-1">
            ${product.description}
          </p>
          <div class="product-price mb-3">
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
  
  // 検索語ハイライト（33番から継承）
  highlightSearchTerm(text) {
    if (!this.filters.searchTerm) return text;
    
    const regex = new RegExp(`(${this.filters.searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
  window.filterSystem = new CategoryFilterSystem();
});
```

### 💡 フィルターUIのCSS

```css
/* フィルターサイドバー */
.filter-sidebar {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
}

.filter-section {
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 1rem;
}

.filter-section:last-child {
  border-bottom: none;
  margin-bottom: 0 !important;
}

.filter-title {
  color: #495057;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.filter-options .form-check {
  margin-bottom: 0.5rem;
}

.item-count {
  font-size: 0.85em;
  color: #6c757d;
}

/* アクティブフィルター */
.active-filters {
  border-top: 1px solid #e9ecef;
  padding-top: 1rem;
}

.active-filters .badge {
  font-size: 0.75em;
}

/* カテゴリバッジ */
.category-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 2;
}

/* フィルターアクションボタン */
.filter-actions {
  display: flex;
  gap: 0.5rem;
}

.filter-actions .btn {
  flex: 1;
}

/* レスポンシブ対応 */
@media (max-width: 991px) {
  .filter-sidebar {
    margin-bottom: 2rem;
  }
  
  .filter-section {
    margin-bottom: 1.5rem !important;
  }
  
  .filter-actions {
    flex-direction: column;
  }
  
  .filter-actions .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}

/* アニメーション効果 */
.product-card {
  transition: all 0.3s ease;
}

.filter-options .form-check {
  transition: background-color 0.2s ease;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.filter-options .form-check:hover {
  background-color: rgba(0,123,255,0.1);
}
```

## 🚀 実装のコツ

### 複合条件の処理方法
- **配列の活用**: 選択された条件を配列で管理
- **some()とevery()**: 条件判定にArrayメソッドを活用
- **条件の組み合わせ**: ANDとORの論理を理解する

### UIの使いやすさ
- **リアルタイム更新**: チェック時に即座に結果を表示
- **条件の可視化**: アクティブな条件をタグで表示
- **簡単リセット**: 全条件を一括クリアできる機能

### Bootstrap活用ポイント
- **Form controls**: チェックボックスの統一感
- **Badge component**: カテゴリと条件表示
- **Card component**: フィルターエリアの区切り

## ✅ 完成チェックリスト

### 基本機能
- [ ] カテゴリフィルターが動作する
- [ ] 価格帯フィルターが動作する
- [ ] 検索とフィルターが連動する
- [ ] 複数条件を同時に適用できる
- [ ] フィルターリセットが動作する

### UI/UX機能
- [ ] アクティブなフィルターが表示される
- [ ] 商品数がリアルタイムで更新される
- [ ] カテゴリバッジが商品に表示される
- [ ] フィルター結果の件数が表示される

### 応用機能
- [ ] 条件なしの場合の全商品表示
- [ ] モバイルでの使いやすいレイアウト
- [ ] ホバー効果とアニメーション

## 🎉 次のステップ

おめでとうございます！複合フィルタリングシステムを習得しました。

### 🌟 習得したスキル
- **複数条件処理**: 複数のフィルターを組み合わせる技術
- **状態管理**: フィルター条件の管理とUI連携
- **配列操作**: filter()、some()、every()の実践的活用
- **UX向上**: ユーザーフレンドリーなフィルターUI

### 🚀 次の課題（35-sort-feature）
次は「ソート機能」に挑戦します！
- 商品の並び替え機能
- 複数のソート条件
- フィルターとソートの組み合わせ

---
**💡 複合検索機能により、ユーザーが目的の商品を効率的に見つけられるようになりました！**