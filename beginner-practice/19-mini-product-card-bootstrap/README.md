# 🛍️ ステップ19: 商品カード（Bootstrap版）

## 🎯 学習目標

- **Bootstrap 5を活用した実用的な商品カードシステムの構築**
- **Bootstrapコンポーネント（Card、Badge、Button、Toast、Accordion等）の統合**
- **レスポンシブECサイトコンポーネントの効率的な開発手法**
- **Bootstrap APIとカスタムJavaScriptの組み合わせ**
- **Vanilla版とBootstrap版の比較による最適な開発手法の理解**

## 📖 学習内容

このステップでは、**ステップ19の商品カードをBootstrap 5で再実装**し、モダンなECサイト開発の実践的なスキルを習得します。

### 🔄 Bootstrap版の特徴

#### **1. Bootstrapコンポーネントの活用**
```html
<div class="card shadow-lg">
    <img src="product.jpg" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title">商品名</h5>
        <span class="badge bg-danger">25% OFF</span>
        <button class="btn btn-primary">カートに追加</button>
    </div>
</div>
```

#### **2. Bootstrap Toast通知システム**
```javascript
// Bootstrap Toast APIの使用
const toast = new bootstrap.Toast(document.getElementById('notification'));
toast.show();
```

#### **3. Bootstrap Accordion詳細情報**
```html
<div class="accordion" id="product-details">
    <div class="accordion-item">
        <button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#details-content">
            商品詳細
        </button>
        <div id="details-content" class="accordion-collapse collapse">
            <!-- 詳細情報 -->
        </div>
    </div>
</div>
```

## 📝 学習ポイント

### ✅ **Bootstrap統合の優位性**

#### **開発効率の劇的向上**
- カードレイアウトが瞬時に完成
- レスポンシブ対応が自動で実現
- 統一されたUIコンポーネント

#### **保守性とスケーラビリティ**
- 標準化されたコンポーネント設計
- フレームワーク更新での自動改善
- チーム開発での一貫性確保

### ✅ **主要Bootstrapコンポーネント活用**

#### **Card コンポーネント**
```html
<div class="card h-100 shadow-lg">
    <div class="position-relative">
        <img class="card-img-top" src="product.jpg">
        <div class="position-absolute top-0 start-0 m-2">
            <span class="badge bg-danger">SALE</span>
        </div>
    </div>
    <div class="card-body d-flex flex-column">
        <h5 class="card-title">商品名</h5>
        <div class="mt-auto">
            <button class="btn btn-primary w-100">購入</button>
        </div>
    </div>
</div>
```

#### **Progress Bar在庫表示**
```html
<div class="progress" style="height: 8px;">
    <div class="progress-bar bg-warning" 
         role="progressbar" 
         style="width: 75%"
         id="stock-fill">
    </div>
</div>
<span class="text-warning fw-bold">残り15個</span>
```

#### **Input Group数量選択**
```html
<div class="input-group" style="max-width: 150px;">
    <button class="btn btn-outline-secondary" type="button">-</button>
    <input type="number" class="form-control text-center" value="1">
    <button class="btn btn-outline-secondary" type="button">+</button>
</div>
```

## 🔍 詳細解説

### **Bootstrap Toast通知システム**

#### **JavaScript統合**
```javascript
function showNotification(message, type = 'success') {
    const toastElement = document.getElementById('notification');
    const messageElement = document.getElementById('notification-message');
    const iconElement = document.getElementById('notification-icon');
    
    // メッセージとアイコンを設定
    messageElement.textContent = message;
    iconElement.textContent = type === 'success' ? '✅' : '⚠️';
    
    // Bootstrap Toast API使用
    let toastInstance = bootstrap.Toast.getInstance(toastElement);
    if (!toastInstance) {
        toastInstance = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 3000
        });
    }
    
    toastInstance.show();
}
```

### **Bootstrap Collapse詳細情報**

#### **アコーディオン制御**
```javascript
function toggleDetails() {
    const collapseElement = document.getElementById('details-content');
    let collapseInstance = bootstrap.Collapse.getInstance(collapseElement);
    
    if (!collapseInstance) {
        collapseInstance = new bootstrap.Collapse(collapseElement, {
            toggle: false
        });
    }
    
    collapseInstance.toggle();
}
```

### **Bootstrap Badge動的表示**

#### **カートカウント管理**
```javascript
function updateCartDisplay() {
    const cartBadge = document.getElementById('cart-count');
    
    if (productData.cartQuantity > 0) {
        cartBadge.textContent = productData.cartQuantity;
        cartBadge.style.display = 'inline-block';
        cartBadge.classList.remove('d-none');
        cartBadge.classList.add('bounce'); // アニメーション追加
    } else {
        cartBadge.style.display = 'none';
        cartBadge.classList.add('d-none');
    }
}
```

## 🆚 Vanilla版との比較

### **開発効率の比較**
| 項目 | Vanilla版 | Bootstrap版 |
|------|-----------|-------------|
| CSSコード量 | 500行+ | 234行（53%削減） |
| HTMLの複雑さ | 高（独自クラス） | 低（標準クラス） |
| レスポンシブ実装 | 手動メディアクエリ | 自動Grid対応 |
| デザイン統一性 | 個別調整必要 | フレームワーク保証 |
| 通知システム | カスタム実装 | Bootstrap Toast |
| アコーディオン | カスタムJS | Bootstrap Collapse |

### **学習効果の相乗効果**
- **Vanilla版**: CSS/JavaScript基礎力の習得
- **Bootstrap版**: フレームワーク活用力の習得  
- **比較学習**: 状況に応じた最適手法の選択能力

## 🚀 実践してみよう

### **手順1: ファイルを開く**
`19-mini-product-card-bootstrap/index.html` をブラウザで開いてください。

### **手順2: Bootstrap機能の体験**
1. **レスポンシブ確認**: ウィンドウサイズ変更でBootstrapグリッドの動作確認
2. **Toast通知**: ボタンクリックでBootstrap Toast通知の確認
3. **アコーディオン**: Bootstrap Collapseによる詳細情報の開閉確認
4. **Progress Bar**: 在庫バーの動的更新確認

### **手順3: 開発者ツール確認**
```javascript
// Bootstrap API確認
console.log(bootstrap.Toast);
console.log(bootstrap.Collapse);

// コンポーネント動的操作
const toast = new bootstrap.Toast(document.getElementById('notification'));
toast.show();
```

## ✨ Bootstrap拡張機能を試してみよう

### **1. Bootstrap Modal商品詳細**
```html
<!-- Modal追加 -->
<div class="modal fade" id="productModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">商品詳細</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <!-- 詳細コンテンツ -->
            </div>
        </div>
    </div>
</div>
```

### **2. Bootstrap Carousel画像スライダー**
```html
<div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="image1.jpg" class="d-block w-100">
        </div>
        <div class="carousel-item">
            <img src="image2.jpg" class="d-block w-100">
        </div>
    </div>
    <button class="carousel-control-prev" data-bs-target="#productCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" data-bs-target="#productCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
    </button>
</div>
```

### **3. Bootstrap Offcanvasカート**
```html
<div class="offcanvas offcanvas-end" tabindex="-1" id="cartOffcanvas">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title">ショッピングカート</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
        <!-- カート内容 -->
    </div>
</div>
```

## 📖 Bootstrap実践テクニック

### **1. ユーティリティクラス活用**
```html
<!-- スペーシング -->
<div class="mt-4 mb-3 px-2 py-1">

<!-- フレックス -->
<div class="d-flex justify-content-between align-items-center">

<!-- テキスト -->
<p class="text-center text-primary fw-bold fs-5">

<!-- 背景・ボーダー -->
<div class="bg-light border rounded shadow-sm">
```

### **2. Bootstrap変数カスタマイズ**
```css
:root {
    --bs-primary: #667eea;
    --bs-success: #48bb78;
    --bs-warning: #ed8936;
    --bs-danger: #f56565;
}

.btn-primary {
    background: linear-gradient(45deg, var(--bs-primary), #764ba2);
    border: none;
}
```

### **3. レスポンシブブレークポイント**
```html
<!-- 画面サイズ別表示制御 -->
<div class="col-12 col-md-6 col-lg-4">
    <div class="d-block d-md-flex d-lg-grid">
        <!-- レスポンシブレイアウト -->
    </div>
</div>
```

## 🎯 実用的なBootstrap統合パターン

### **1. 商品フィルタリング**
```javascript
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.classList.remove('d-none');
            product.classList.add('fade-in');
        } else {
            product.classList.add('d-none');
        }
    });
}
```

### **2. 動的バッジ生成**
```javascript
function createBadge(text, type = 'primary') {
    const badge = document.createElement('span');
    badge.className = `badge bg-${type} me-1`;
    badge.textContent = text;
    return badge;
}

// 使用例
const saleBadge = createBadge('25% OFF', 'danger');
const newBadge = createBadge('NEW', 'success');
```

### **3. Bootstrap Grid動的生成**
```javascript
function createProductGrid(products) {
    const container = document.createElement('div');
    container.className = 'row g-4';
    
    products.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 col-sm-12';
        col.innerHTML = createProductCard(product);
        container.appendChild(col);
    });
    
    return container;
}
```

## 💡 Bootstrap開発のベストプラクティス

### **1. パフォーマンス最適化**
```html
<!-- 必要な機能のみ読み込み -->
<link href="bootstrap-grid.min.css" rel="stylesheet">
<script src="bootstrap-components.min.js"></script>
```

### **2. アクセシビリティ**
```html
<button class="btn btn-primary" 
        aria-label="商品をカートに追加"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="カートに追加">
    <i class="bi bi-cart-plus" aria-hidden="true"></i>
</button>
```

### **3. カスタマイゼーション戦略**
```css
/* Bootstrap拡張（上書きではなく拡張） */
.btn-custom {
    @extend .btn;
    @extend .btn-primary;
    background: linear-gradient(45deg, #667eea, #764ba2);
}
```

## ✅ このステップで習得できるスキル

- ✅ Bootstrap 5コンポーネントの実用的な活用
- ✅ Bootstrap APIとカスタムJavaScriptの統合
- ✅ レスポンシブECサイトコンポーネント開発
- ✅ Bootstrap Toast/Collapse/Badgeの動的制御
- ✅ ユーティリティファーストアプローチ
- ✅ Bootstrap変数カスタマイゼーション
- ✅ パフォーマンスとアクセシビリティの最適化
- ✅ Vanilla/Bootstrapの使い分け判断能力

## 📚 次のステップへの応用

### **実践的な応用シナリオ**
- 企業レベルのECサイトコンポーネント開発
- チーム開発での統一されたUI実装
- 保守性の高いコードベース構築
- 効率的なプロトタイピング

**🌟 Bootstrap 5の強力なコンポーネントシステムで、実用性とデザイン品質を両立した商品カードが完成しました！**

---

**次は20-two-product-gallery-bootstrap/で複数商品の効率的な管理とBootstrapグリッドシステムの真価を体験しましょう！**