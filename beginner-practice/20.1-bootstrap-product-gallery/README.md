# 20.1 Bootstrap商品ギャラリー - 実践的ECサイト構築

## 📋 概要

Bootstrap 5を活用して本格的な商品ギャラリーシステムを構築します。ECサイトレベルの機能と美しいUIを実装し、これまで学んだBootstrapの知識を総合的に活用します。レスポンシブ対応、検索・フィルター機能、商品詳細モーダル等、実用的なWebアプリケーション開発スキルを習得します。

## 🎯 学習目標

- **実践的ECサイト構築**: 商品一覧・詳細・カート機能の実装
- **高度なBootstrap活用**: グリッド、コンポーネント、ユーティリティの統合運用
- **ユーザーインタラクション**: 検索、フィルタリング、ソート機能
- **モーダル活用**: 商品詳細表示とユーザー体験向上
- **レスポンシブECデザイン**: あらゆるデバイスでの最適な表示
- **JavaScript統合**: Bootstrap JavaScriptとの連携

## 🛠 技術スタック

- **Bootstrap 5.3.3**: UIフレームワーク（グリッド・コンポーネント・ユーティリティ）
- **Bootstrap Icons**: アイコンライブラリ
- **JavaScript ES6+**: 商品データ管理・検索・フィルタリング機能
- **CSS3**: カスタムアニメーション・ホバーエフェクト
- **HTML5**: セマンティックマークアップ
- **Responsive Images**: srcset による最適化

## 📁 ファイル構成

```
20.1-bootstrap-product-gallery/
├── index.html              # メインHTML（商品ギャラリーページ）
├── css/
│   ├── style.css          # カスタムCSS（Bootstrap拡張）
│   └── animations.css     # アニメーション定義
├── js/
│   ├── script.js          # メイン機能制御
│   ├── products.js        # 商品データ管理
│   ├── filters.js         # フィルタリング機能
│   └── modal.js           # モーダル制御
├── images/
│   ├── products/          # 商品画像
│   └── placeholders/      # プレースホルダー画像
├── data/
│   └── products.json      # 商品データ（JSON形式）
└── README.md              # このファイル
```

## 🚀 使用方法

1. **ファイルを開く**
   ```bash
   # ローカルサーバー推奨（画像・JSONファイル読み込みのため）
   python -m http.server 8000
   # ブラウザで http://localhost:8000 にアクセス
   ```

2. **機能の確認**
   - 商品一覧の表示確認
   - 検索機能のテスト
   - カテゴリーフィルタリング
   - 価格帯フィルタリング
   - ソート機能（価格・名前・評価）
   - レスポンシブ表示の確認
   - 商品詳細モーダルの操作

## 🎨 主要機能と実装

### 1. レスポンシブ商品グリッド

```html
<div class="container-fluid px-4">
    <div class="row" id="productGrid">
        <!-- 商品カードの動的生成 -->
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4" v-for="product in filteredProducts">
            <div class="product-card h-100">
                <div class="card h-100 shadow-sm border-0 position-relative">
                    <!-- 商品画像 -->
                    <div class="card-img-container position-relative overflow-hidden">
                        <img src="product.image" 
                             class="card-img-top product-image" 
                             alt="product.name"
                             loading="lazy">
                        <!-- ホバーオーバーレイ -->
                        <div class="img-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                            <button class="btn btn-primary btn-sm me-2" onclick="viewProduct(product.id)">
                                <i class="bi bi-eye"></i> 詳細
                            </button>
                            <button class="btn btn-outline-light btn-sm" onclick="addToCart(product.id)">
                                <i class="bi bi-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- 商品情報 -->
                    <div class="card-body d-flex flex-column">
                        <h6 class="card-title text-truncate mb-2">product.name</h6>
                        <p class="text-muted small mb-2">product.category</p>
                        
                        <!-- 評価 -->
                        <div class="rating mb-2">
                            <span v-for="star in 5" 
                                  class="text-warning" 
                                  v-if="star <= product.rating">★</span>
                            <small class="text-muted ms-1">(product.reviews)</small>
                        </div>
                        
                        <!-- 価格 -->
                        <div class="mt-auto d-flex justify-content-between align-items-center">
                            <span class="fw-bold text-primary">¥product.price</span>
                            <small v-if="product.discount" class="text-muted text-decoration-line-through">
                                ¥product.originalPrice
                            </small>
                        </div>
                    </div>
                    
                    <!-- バッジ -->
                    <div class="position-absolute top-0 end-0 p-2">
                        <span v-if="product.isNew" class="badge bg-success">NEW</span>
                        <span v-if="product.discount" class="badge bg-danger">-product.discount%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

### 2. 高機能検索・フィルターシステム

```html
<!-- 検索・フィルターコントロール -->
<div class="row mb-4">
    <div class="col-12 col-md-8">
        <!-- 検索バー -->
        <div class="input-group mb-3">
            <span class="input-group-text">
                <i class="bi bi-search"></i>
            </span>
            <input type="text" 
                   class="form-control" 
                   placeholder="商品を検索..." 
                   id="searchInput"
                   onkeyup="filterProducts()">
        </div>
    </div>
    <div class="col-12 col-md-4">
        <!-- ソート -->
        <select class="form-select" id="sortSelect" onchange="sortProducts()">
            <option value="name-asc">名前（昇順）</option>
            <option value="name-desc">名前（降順）</option>
            <option value="price-asc">価格（安い順）</option>
            <option value="price-desc">価格（高い順）</option>
            <option value="rating-desc">評価（高い順）</option>
            <option value="newest">新着順</option>
        </select>
    </div>
</div>

<!-- フィルターサイドバー -->
<div class="col-12 col-lg-3 mb-4">
    <div class="card">
        <div class="card-header">
            <h6 class="mb-0">フィルター</h6>
        </div>
        <div class="card-body">
            <!-- カテゴリーフィルター -->
            <div class="mb-4">
                <h6 class="fw-semibold">カテゴリー</h6>
                <div class="form-check" v-for="category in categories">
                    <input class="form-check-input" 
                           type="checkbox" 
                           :value="category" 
                           :id="'cat-' + category"
                           onchange="filterProducts()">
                    <label class="form-check-label" :for="'cat-' + category">
                        category <span class="badge bg-light text-dark ms-1">count</span>
                    </label>
                </div>
            </div>
            
            <!-- 価格帯フィルター -->
            <div class="mb-4">
                <h6 class="fw-semibold">価格帯</h6>
                <div class="range-slider">
                    <input type="range" 
                           class="form-range mb-2" 
                           min="0" 
                           max="100000" 
                           step="1000" 
                           id="priceMin"
                           oninput="updatePriceFilter()">
                    <input type="range" 
                           class="form-range" 
                           min="0" 
                           max="100000" 
                           step="1000" 
                           id="priceMax"
                           oninput="updatePriceFilter()">
                    <div class="d-flex justify-content-between">
                        <small id="priceMinValue">¥0</small>
                        <small id="priceMaxValue">¥100,000</small>
                    </div>
                </div>
            </div>
            
            <!-- 評価フィルター -->
            <div class="mb-4">
                <h6 class="fw-semibold">評価</h6>
                <div class="form-check" v-for="rating in [5,4,3,2,1]">
                    <input class="form-check-input" 
                           type="radio" 
                           name="rating" 
                           :value="rating"
                           :id="'rating-' + rating"
                           onchange="filterProducts()">
                    <label class="form-check-label" :for="'rating-' + rating">
                        <span v-for="star in rating" class="text-warning">★</span>
                        <span v-for="star in (5-rating)" class="text-muted">☆</span>
                        以上
                    </label>
                </div>
            </div>
            
            <!-- フィルタークリア -->
            <button class="btn btn-outline-secondary w-100" onclick="clearFilters()">
                <i class="bi bi-arrow-clockwise"></i> フィルターをクリア
            </button>
        </div>
    </div>
</div>
```

### 3. 商品詳細モーダル

```html
<!-- 商品詳細モーダル -->
<div class="modal fade" id="productModal" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header border-0">
                <h5 class="modal-title">商品詳細</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <!-- 商品画像カルーセル -->
                    <div class="col-12 col-md-6 mb-4 mb-md-0">
                        <div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner" id="modalProductImages">
                                <!-- 動的画像読み込み -->
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon"></span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                                <span class="carousel-control-next-icon"></span>
                            </button>
                        </div>
                    </div>
                    
                    <!-- 商品詳細情報 -->
                    <div class="col-12 col-md-6">
                        <h4 id="modalProductName" class="fw-bold mb-3"></h4>
                        
                        <!-- 評価・レビュー -->
                        <div class="rating mb-3">
                            <span id="modalProductRating"></span>
                            <span class="text-muted ms-2" id="modalProductReviews"></span>
                        </div>
                        
                        <!-- 価格 -->
                        <div class="price-section mb-4">
                            <span class="fs-3 fw-bold text-primary" id="modalProductPrice"></span>
                            <span class="text-muted text-decoration-line-through ms-2" id="modalProductOriginalPrice"></span>
                        </div>
                        
                        <!-- 商品説明 -->
                        <div class="mb-4">
                            <h6 class="fw-semibold">商品説明</h6>
                            <p id="modalProductDescription" class="text-muted"></p>
                        </div>
                        
                        <!-- 在庫・サイズ選択 -->
                        <div class="mb-4">
                            <div class="row">
                                <div class="col-6">
                                    <label class="form-label">数量</label>
                                    <div class="input-group">
                                        <button class="btn btn-outline-secondary" type="button" onclick="decreaseQuantity()">-</button>
                                        <input type="number" class="form-control text-center" value="1" min="1" id="productQuantity">
                                        <button class="btn btn-outline-secondary" type="button" onclick="increaseQuantity()">+</button>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <label class="form-label">在庫</label>
                                    <p class="mb-0">
                                        <span class="badge bg-success" id="modalProductStock">在庫あり</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- アクションボタン -->
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary btn-lg" onclick="addToCartFromModal()">
                                <i class="bi bi-cart-plus"></i> カートに追加
                            </button>
                            <button class="btn btn-outline-primary" onclick="addToWishlist()">
                                <i class="bi bi-heart"></i> お気に入りに追加
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

### 4. JavaScript 機能実装

```javascript
// products.js - 商品データ管理
class ProductManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.categories = [];
        this.cart = [];
        this.wishlist = [];
        this.currentFilters = {
            search: '',
            categories: [],
            priceRange: [0, 100000],
            rating: 0
        };
        this.sortOption = 'name-asc';
    }
    
    async loadProducts() {
        try {
            const response = await fetch('./data/products.json');
            this.products = await response.json();
            this.extractCategories();
            this.filteredProducts = [...this.products];
            this.renderProducts();
            this.renderFilters();
        } catch (error) {
            console.error('商品データの読み込みに失敗しました:', error);
            this.showErrorMessage();
        }
    }
    
    extractCategories() {
        const categorySet = new Set(this.products.map(product => product.category));
        this.categories = Array.from(categorySet);
    }
    
    filterProducts() {
        this.filteredProducts = this.products.filter(product => {
            // 検索フィルター
            const matchesSearch = product.name.toLowerCase()
                .includes(this.currentFilters.search.toLowerCase()) ||
                product.description.toLowerCase()
                .includes(this.currentFilters.search.toLowerCase());
            
            // カテゴリーフィルター
            const matchesCategory = this.currentFilters.categories.length === 0 ||
                this.currentFilters.categories.includes(product.category);
            
            // 価格フィルター
            const matchesPrice = product.price >= this.currentFilters.priceRange[0] &&
                product.price <= this.currentFilters.priceRange[1];
            
            // 評価フィルター
            const matchesRating = product.rating >= this.currentFilters.rating;
            
            return matchesSearch && matchesCategory && matchesPrice && matchesRating;
        });
        
        this.sortProducts();
        this.renderProducts();
        this.updateResultCount();
    }
    
    sortProducts() {
        const [field, direction] = this.sortOption.split('-');
        
        this.filteredProducts.sort((a, b) => {
            let valueA, valueB;
            
            switch (field) {
                case 'name':
                    valueA = a.name.toLowerCase();
                    valueB = b.name.toLowerCase();
                    break;
                case 'price':
                    valueA = a.price;
                    valueB = b.price;
                    break;
                case 'rating':
                    valueA = a.rating;
                    valueB = b.rating;
                    break;
                case 'newest':
                    valueA = new Date(a.createdAt);
                    valueB = new Date(b.createdAt);
                    break;
                default:
                    return 0;
            }
            
            if (direction === 'asc') {
                return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
            } else {
                return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
            }
        });
    }
    
    renderProducts() {
        const productGrid = document.getElementById('productGrid');
        
        if (this.filteredProducts.length === 0) {
            productGrid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="bi bi-search fs-1 text-muted"></i>
                    <h4 class="text-muted mt-3">商品が見つかりませんでした</h4>
                    <p class="text-muted">フィルター条件を変更してお試しください</p>
                </div>
            `;
            return;
        }
        
        productGrid.innerHTML = this.filteredProducts.map(product => `
            <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
                ${this.renderProductCard(product)}
            </div>
        `).join('');
        
        this.initializeProductAnimations();
    }
    
    renderProductCard(product) {
        return `
            <div class="product-card h-100" data-product-id="${product.id}">
                <div class="card h-100 shadow-sm border-0 position-relative">
                    <div class="card-img-container position-relative overflow-hidden">
                        <img src="${product.image}" 
                             class="card-img-top product-image" 
                             alt="${product.name}"
                             loading="lazy"
                             onerror="this.src='./images/placeholders/no-image.jpg'">
                        <div class="img-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center opacity-0">
                            <button class="btn btn-primary btn-sm me-2" onclick="productManager.viewProduct(${product.id})">
                                <i class="bi bi-eye"></i> 詳細
                            </button>
                            <button class="btn btn-outline-light btn-sm" onclick="productManager.addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="card-body d-flex flex-column p-3">
                        <h6 class="card-title text-truncate mb-2" title="${product.name}">${product.name}</h6>
                        <p class="text-muted small mb-2">${product.category}</p>
                        
                        <div class="rating mb-2">
                            ${this.renderStars(product.rating)}
                            <small class="text-muted ms-1">(${product.reviews})</small>
                        </div>
                        
                        <div class="mt-auto d-flex justify-content-between align-items-center">
                            <span class="fw-bold text-primary">¥${product.price.toLocaleString()}</span>
                            ${product.originalPrice ? `<small class="text-muted text-decoration-line-through">¥${product.originalPrice.toLocaleString()}</small>` : ''}
                        </div>
                    </div>
                    
                    ${this.renderBadges(product)}
                </div>
            </div>
        `;
    }
}

// 初期化
const productManager = new ProductManager();
document.addEventListener('DOMContentLoaded', () => {
    productManager.loadProducts();
});
```

## 💪 実習課題

### 課題1: カートシステム拡張
商品ギャラリーにカート機能を追加：
- カートアイコン付きナビゲーション
- 商品追加時のトースト通知
- カート内容をオフキャンバスで表示
- 数量変更・削除機能
- 合計金額の計算表示

### 課題2: お気に入り機能
- ハートアイコンでお気に入り追加・削除
- お気に入り商品の一覧表示
- LocalStorageでの永続化
- お気に入り数の表示

### 課題3: 商品比較機能
- 複数商品の選択機能
- 比較テーブルでの表示
- スペック・価格・評価の比較
- 比較結果の印刷機能

### 課題4: レビューシステム
- 商品レビューの表示
- 星評価システム
- レビューの投稿フォーム
- 写真付きレビュー

## 🎨 高度なカスタマイゼーション

### CSS アニメーション
```css
/* 商品カードのホバーエフェクト */
.product-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.product-card:hover .img-overlay {
    opacity: 1;
    background: rgba(0, 0, 0, 0.3);
}

.product-image {
    transition: transform 0.3s ease;
}

.product-card:hover .product-image {
    transform: scale(1.05);
}

/* フィルター結果のフェードイン */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.product-card {
    animation: fadeInUp 0.5s ease-out;
}
```

### JavaScript拡張機能
```javascript
// 無限スクロール
class InfiniteScroll {
    constructor(productManager) {
        this.productManager = productManager;
        this.page = 1;
        this.itemsPerPage = 12;
        this.loading = false;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    
    handleScroll() {
        if (this.loading) return;
        
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            this.loadMore();
        }
    }
    
    loadMore() {
        this.loading = true;
        this.page++;
        
        // ローディング表示
        this.showLoadingSpinner();
        
        setTimeout(() => {
            this.productManager.loadMoreProducts(this.page);
            this.hideLoadingSpinner();
            this.loading = false;
        }, 1000);
    }
}

// 検索サジェスト
class SearchSuggestions {
    constructor() {
        this.suggestions = [];
        this.init();
    }
    
    init() {
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', this.handleInput.bind(this));
        searchInput.addEventListener('focus', this.showSuggestions.bind(this));
    }
    
    handleInput(event) {
        const query = event.target.value;
        if (query.length >= 2) {
            this.generateSuggestions(query);
        } else {
            this.hideSuggestions();
        }
    }
}
```

## ✅ 習得チェックリスト

### Bootstrap統合活用
- [ ] グリッドシステムでのレスポンシブレイアウト
- [ ] カード・モーダル・オフキャンバス等コンポーネント活用
- [ ] ユーティリティクラスでの効率的スタイリング
- [ ] Bootstrap JavaScriptとの連携

### JavaScript機能
- [ ] 商品データの非同期読み込み
- [ ] 検索・フィルタリング・ソート機能
- [ ] 動的HTML生成とDOM操作
- [ ] LocalStorageでのデータ永続化

### UX/UI実装
- [ ] レスポンシブデザインの完全対応
- [ ] スムーズなアニメーション実装
- [ ] アクセシビリティへの配慮
- [ ] エラーハンドリングとローディング表示

### 実践スキル
- [ ] ECサイトレベルの機能実装
- [ ] パフォーマンス最適化の考慮
- [ ] 保守性の高いコード構造
- [ ] 実用的なWebアプリケーション開発

## 🔗 次のステップ

- **22-bootstrap-shopping-cart**: カート機能の高度な実装
- **実践プロジェクト**: 学習成果を活用したオリジナルECサイト制作
- **バックエンド連携**: API通信によるリアルタイムデータ取得

## 💡 参考リンク

- [Bootstrap Examples](https://getbootstrap.com/docs/5.3/examples/)
- [JavaScript Array Methods](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Fetch API](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API)
- [CSS Animations](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Animations)
- [Web Accessibility](https://developer.mozilla.org/ja/docs/Web/Accessibility)

---

**🎉 Bootstrap実践マスターおめでとうございます！**

本格的なECサイトレベルの商品ギャラリーシステムを構築できるスキルが身につきました。Bootstrap・JavaScript・現代的なWebアプリケーション開発手法を統合的に活用し、プロフェッショナルレベルのWebサイト制作が可能になりました。次はより高度なカート機能の実装に挑戦しましょう！