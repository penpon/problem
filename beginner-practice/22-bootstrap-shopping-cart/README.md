# 22 Bootstrapショッピングカート - 高機能カートシステム完全実装

## 📋 概要

Bootstrap 5を活用して本格的なショッピングカート機能を実装します。商品の追加・削除・数量変更、価格計算、配送オプション、決済フロー等、実際のECサイトで使用されるカート機能の全てを学習します。Offcanvas、Toast、Modal等のBootstrapコンポーネントを効果的に組み合わせ、優れたユーザー体験を提供するカートシステムを構築します。

## 🎯 学習目標

- **高機能カートシステム**: 追加・削除・数量変更・価格計算の完全実装
- **Bootstrap高度活用**: Offcanvas、Toast、Modal、Badge等の統合運用
- **状態管理**: LocalStorageとJavaScriptによるカートデータ永続化
- **動的UI制御**: リアルタイムな画面更新とインタラクション
- **決済フロー**: 配送情報入力から注文確認まで
- **レスポンシブEコマース**: あらゆるデバイスでの最適なカート体験

## 🛠 技術スタック

- **Bootstrap 5.3.3**: UIフレームワーク（特にOffcanvas、Toast、Modal）
- **Bootstrap Icons**: カート・決済関連アイコン
- **JavaScript ES6+**: カート状態管理・計算ロジック
- **LocalStorage**: カートデータの永続化
- **CSS3**: カートアニメーション・インタラクション
- **HTML5**: セマンティックマークアップ・フォーム

## 📁 ファイル構成

```
22-bootstrap-shopping-cart/
├── index.html              # メインHTML（商品一覧＋カート）
├── css/
│   ├── style.css          # カスタムCSS
│   ├── cart.css           # カート専用スタイル
│   └── animations.css     # アニメーション定義
├── js/
│   ├── script.js          # メイン機能
│   ├── cart.js            # カート機能
│   ├── checkout.js        # 決済処理
│   ├── storage.js         # データ永続化
│   └── notifications.js   # 通知システム
├── components/
│   ├── cart-offcanvas.html     # カートオフキャンバス
│   ├── checkout-modal.html     # 決済モーダル
│   └── order-confirmation.html # 注文確認
├── data/
│   └── products.json      # 商品データ
└── README.md              # このファイル
```

## 🚀 使用方法

1. **ファイルを開く**
   ```bash
   # ローカルサーバー推奨
   python -m http.server 8000
   # http://localhost:8000 でアクセス
   ```

2. **機能の確認**
   - 商品をカートに追加
   - カートオフキャンバスの表示
   - 数量変更・削除操作
   - 価格計算の確認
   - 配送オプションの選択
   - 決済フローの体験

## 🎨 主要機能と実装

### 1. カートオフキャンバス（メイン表示）

```html
<!-- カートオフキャンバス -->
<div class="offcanvas offcanvas-end" tabindex="-1" id="cartOffcanvas">
    <div class="offcanvas-header border-bottom">
        <h5 class="offcanvas-title d-flex align-items-center">
            <i class="bi bi-cart3 me-2"></i>
            ショッピングカート
            <span class="badge bg-primary ms-2" id="cartBadgeCount">0</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    
    <div class="offcanvas-body p-0">
        <!-- 空のカート表示 -->
        <div id="emptyCartMessage" class="text-center py-5 d-none">
            <i class="bi bi-cart-x fs-1 text-muted mb-3"></i>
            <h5 class="text-muted">カートが空です</h5>
            <p class="text-muted small">商品を追加してお買い物を始めましょう</p>
            <button class="btn btn-primary" data-bs-dismiss="offcanvas">
                商品を見る
            </button>
        </div>
        
        <!-- カートアイテム一覧 -->
        <div id="cartItemsList" class="flex-grow-1">
            <!-- 動的に生成 -->
        </div>
        
        <!-- カートサマリー -->
        <div class="border-top bg-light p-3" id="cartSummary">
            <div class="row mb-3">
                <div class="col-6">
                    <small class="text-muted">小計 (<span id="totalItems">0</span>点)</small>
                </div>
                <div class="col-6 text-end">
                    <span id="subtotal">¥0</span>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-6">
                    <small class="text-muted">配送料</small>
                </div>
                <div class="col-6 text-end">
                    <span id="shippingCost">¥500</span>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-6">
                    <small class="text-muted">税込み</small>
                </div>
                <div class="col-6 text-end">
                    <span id="tax">¥0</span>
                </div>
            </div>
            
            <hr>
            
            <div class="row mb-3">
                <div class="col-6">
                    <strong>合計</strong>
                </div>
                <div class="col-6 text-end">
                    <strong class="fs-5 text-primary" id="total">¥0</strong>
                </div>
            </div>
            
            <div class="d-grid gap-2">
                <button class="btn btn-primary btn-lg" 
                        id="checkoutBtn"
                        onclick="cart.proceedToCheckout()"
                        disabled>
                    <i class="bi bi-credit-card me-2"></i>
                    レジに進む
                </button>
                <button class="btn btn-outline-secondary" onclick="cart.clearCart()">
                    <i class="bi bi-trash me-2"></i>
                    カートを空にする
                </button>
            </div>
        </div>
    </div>
</div>
```

### 2. カートアイテムテンプレート

```html
<!-- 個別カートアイテム -->
<div class="cart-item border-bottom p-3" data-product-id="${product.id}">
    <div class="row align-items-center">
        <div class="col-3">
            <img src="${product.image}" 
                 class="img-fluid rounded"
                 alt="${product.name}"
                 style="max-height: 80px; object-fit: cover;">
        </div>
        
        <div class="col-9">
            <div class="d-flex justify-content-between align-items-start mb-2">
                <h6 class="mb-1 text-truncate" style="max-width: 150px;" title="${product.name}">
                    ${product.name}
                </h6>
                <button class="btn btn-sm btn-outline-danger" 
                        onclick="cart.removeItem(${product.id})"
                        title="削除">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            
            <p class="text-muted small mb-2">${product.category}</p>
            
            <div class="d-flex justify-content-between align-items-center">
                <!-- 数量コントロール -->
                <div class="btn-group" role="group">
                    <button class="btn btn-outline-secondary btn-sm" 
                            onclick="cart.decreaseQuantity(${product.id})">
                        <i class="bi bi-dash"></i>
                    </button>
                    <span class="btn btn-outline-secondary btn-sm disabled">
                        ${item.quantity}
                    </span>
                    <button class="btn btn-outline-secondary btn-sm" 
                            onclick="cart.increaseQuantity(${product.id})">
                        <i class="bi bi-plus"></i>
                    </button>
                </div>
                
                <!-- 価格表示 -->
                <div class="text-end">
                    <div class="fw-bold text-primary">
                        ¥${(product.price * item.quantity).toLocaleString()}
                    </div>
                    <small class="text-muted">
                        ¥${product.price.toLocaleString()} × ${item.quantity}
                    </small>
                </div>
            </div>
            
            <!-- 在庫表示 -->
            <div class="mt-2">
                ${product.stock > 10 ? 
                    '<small class="text-success"><i class="bi bi-check-circle"></i> 在庫あり</small>' :
                    product.stock > 0 ?
                    `<small class="text-warning"><i class="bi bi-exclamation-circle"></i> 残り${product.stock}点</small>` :
                    '<small class="text-danger"><i class="bi bi-x-circle"></i> 在庫切れ</small>'
                }
            </div>
        </div>
    </div>
</div>
```

### 3. 決済モーダル

```html
<!-- 決済モーダル -->
<div class="modal fade" id="checkoutModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="bi bi-credit-card me-2"></i>
                    お支払い・配送情報
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            
            <div class="modal-body">
                <form id="checkoutForm">
                    <!-- 配送先情報 -->
                    <div class="mb-4">
                        <h6 class="fw-bold mb-3">
                            <i class="bi bi-house me-2"></i>
                            配送先情報
                        </h6>
                        
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="lastName" class="form-label">姓 <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="lastName" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="firstName" class="form-label">名 <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="firstName" required>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="email" class="form-label">メールアドレス <span class="text-danger">*</span></label>
                            <input type="email" class="form-control" id="email" required>
                        </div>
                        
                        <div class="mb-3">
                            <label for="phone" class="form-label">電話番号 <span class="text-danger">*</span></label>
                            <input type="tel" class="form-control" id="phone" required>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <label for="zipCode" class="form-label">郵便番号 <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="zipCode" placeholder="123-4567" required>
                            </div>
                            <div class="col-md-8 mb-3">
                                <label for="prefecture" class="form-label">都道府県 <span class="text-danger">*</span></label>
                                <select class="form-select" id="prefecture" required>
                                    <option value="">選択してください</option>
                                    <option value="tokyo">東京都</option>
                                    <option value="osaka">大阪府</option>
                                    <!-- 全都道府県 -->
                                </select>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="address1" class="form-label">住所1 <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="address1" placeholder="市区町村" required>
                        </div>
                        
                        <div class="mb-3">
                            <label for="address2" class="form-label">住所2</label>
                            <input type="text" class="form-control" id="address2" placeholder="建物名・部屋番号">
                        </div>
                    </div>
                    
                    <!-- 配送オプション -->
                    <div class="mb-4">
                        <h6 class="fw-bold mb-3">
                            <i class="bi bi-truck me-2"></i>
                            配送オプション
                        </h6>
                        
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="radio" name="shipping" id="standardShipping" value="500" checked>
                            <label class="form-check-label" for="standardShipping">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <strong>通常配送</strong>
                                        <br><small class="text-muted">5-7営業日</small>
                                    </div>
                                    <span class="fw-bold">¥500</span>
                                </div>
                            </label>
                        </div>
                        
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="radio" name="shipping" id="expressShipping" value="1000">
                            <label class="form-check-label" for="expressShipping">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <strong>お急ぎ便</strong>
                                        <br><small class="text-muted">2-3営業日</small>
                                    </div>
                                    <span class="fw-bold">¥1,000</span>
                                </div>
                            </label>
                        </div>
                        
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="shipping" id="nextDayShipping" value="1500">
                            <label class="form-check-label" for="nextDayShipping">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <strong>翌日配送</strong>
                                        <br><small class="text-muted">翌営業日</small>
                                    </div>
                                    <span class="fw-bold">¥1,500</span>
                                </div>
                            </label>
                        </div>
                    </div>
                    
                    <!-- 支払い方法 -->
                    <div class="mb-4">
                        <h6 class="fw-bold mb-3">
                            <i class="bi bi-credit-card-2-front me-2"></i>
                            お支払い方法
                        </h6>
                        
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="radio" name="payment" id="creditCard" value="credit" checked>
                            <label class="form-check-label" for="creditCard">
                                <i class="bi bi-credit-card me-2"></i>
                                クレジットカード
                            </label>
                        </div>
                        
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="radio" name="payment" id="bankTransfer" value="bank">
                            <label class="form-check-label" for="bankTransfer">
                                <i class="bi bi-bank me-2"></i>
                                銀行振込
                            </label>
                        </div>
                        
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="payment" id="codPayment" value="cod">
                            <label class="form-check-label" for="codPayment">
                                <i class="bi bi-cash me-2"></i>
                                代金引換
                            </label>
                        </div>
                    </div>
                    
                    <!-- 注文確認 -->
                    <div class="bg-light rounded p-3">
                        <h6 class="fw-bold mb-3">注文内容</h6>
                        
                        <div class="d-flex justify-content-between mb-2">
                            <span>商品小計</span>
                            <span id="checkoutSubtotal">¥0</span>
                        </div>
                        
                        <div class="d-flex justify-content-between mb-2">
                            <span>配送料</span>
                            <span id="checkoutShipping">¥500</span>
                        </div>
                        
                        <div class="d-flex justify-content-between mb-2">
                            <span>税込み</span>
                            <span id="checkoutTax">¥0</span>
                        </div>
                        
                        <hr>
                        
                        <div class="d-flex justify-content-between">
                            <strong>合計金額</strong>
                            <strong class="text-primary fs-5" id="checkoutTotal">¥0</strong>
                        </div>
                    </div>
                </form>
            </div>
            
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    戻る
                </button>
                <button type="button" class="btn btn-primary btn-lg" onclick="checkout.processOrder()">
                    <i class="bi bi-check-circle me-2"></i>
                    注文を確定する
                </button>
            </div>
        </div>
    </div>
</div>
```

### 4. JavaScript カートクラス実装

```javascript
// cart.js - ショッピングカート管理
class ShoppingCart {
    constructor() {
        this.items = [];
        this.isInitialized = false;
        this.taxRate = 0.1; // 消費税率
        this.freeShippingThreshold = 5000; // 送料無料基準額
        
        this.init();
    }
    
    init() {
        this.loadFromStorage();
        this.bindEvents();
        this.updateDisplay();
        this.isInitialized = true;
    }
    
    // 商品をカートに追加
    addItem(productId, quantity = 1) {
        const product = productManager.getProduct(productId);
        if (!product) {
            this.showError('商品が見つかりません');
            return false;
        }
        
        // 在庫チェック
        if (product.stock < quantity) {
            this.showError('在庫が不足しています');
            return false;
        }
        
        const existingItem = this.items.find(item => item.productId === productId);
        
        if (existingItem) {
            // 既存アイテムの数量を更新
            const newQuantity = existingItem.quantity + quantity;
            if (newQuantity > product.stock) {
                this.showError('在庫を超えて追加することはできません');
                return false;
            }
            existingItem.quantity = newQuantity;
        } else {
            // 新しいアイテムを追加
            this.items.push({
                productId: productId,
                quantity: quantity,
                addedAt: new Date().toISOString()
            });
        }
        
        this.saveToStorage();
        this.updateDisplay();
        this.showSuccess(`${product.name}をカートに追加しました`);
        this.animateCartIcon();
        
        return true;
    }
    
    // アイテムを削除
    removeItem(productId) {
        const product = productManager.getProduct(productId);
        this.items = this.items.filter(item => item.productId !== productId);
        
        this.saveToStorage();
        this.updateDisplay();
        this.showInfo(`${product.name}をカートから削除しました`);
    }
    
    // 数量を変更
    updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            this.removeItem(productId);
            return;
        }
        
        const product = productManager.getProduct(productId);
        if (quantity > product.stock) {
            this.showError('在庫を超えて設定することはできません');
            return false;
        }
        
        const item = this.items.find(item => item.productId === productId);
        if (item) {
            item.quantity = quantity;
            this.saveToStorage();
            this.updateDisplay();
        }
        
        return true;
    }
    
    // 数量を増やす
    increaseQuantity(productId) {
        const item = this.items.find(item => item.productId === productId);
        if (item) {
            this.updateQuantity(productId, item.quantity + 1);
        }
    }
    
    // 数量を減らす
    decreaseQuantity(productId) {
        const item = this.items.find(item => item.productId === productId);
        if (item) {
            this.updateQuantity(productId, item.quantity - 1);
        }
    }
    
    // カートを空にする
    clearCart() {
        if (this.items.length === 0) return;
        
        if (confirm('カートを空にしてもよろしいですか？')) {
            this.items = [];
            this.saveToStorage();
            this.updateDisplay();
            this.showInfo('カートを空にしました');
        }
    }
    
    // 計算関連
    getSubtotal() {
        return this.items.reduce((total, item) => {
            const product = productManager.getProduct(item.productId);
            return total + (product.price * item.quantity);
        }, 0);
    }
    
    getShippingCost() {
        const subtotal = this.getSubtotal();
        if (subtotal >= this.freeShippingThreshold) {
            return 0;
        }
        
        // 配送オプションが選択されている場合
        const selectedShipping = document.querySelector('input[name="shipping"]:checked');
        if (selectedShipping) {
            return parseInt(selectedShipping.value);
        }
        
        return 500; // デフォルト配送料
    }
    
    getTax() {
        return Math.floor(this.getSubtotal() * this.taxRate);
    }
    
    getTotal() {
        return this.getSubtotal() + this.getShippingCost() + this.getTax();
    }
    
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }
    
    // 表示更新
    updateDisplay() {
        this.updateCartBadge();
        this.updateCartOffcanvas();
        this.updateCartSummary();
        this.updateMainCartIcon();
    }
    
    updateCartBadge() {
        const badge = document.getElementById('cartBadgeCount');
        const mainBadge = document.getElementById('mainCartBadge');
        const count = this.getTotalItems();
        
        [badge, mainBadge].forEach(element => {
            if (element) {
                element.textContent = count;
                element.style.display = count > 0 ? 'inline' : 'none';
            }
        });
    }
    
    updateCartOffcanvas() {
        const emptyMessage = document.getElementById('emptyCartMessage');
        const itemsList = document.getElementById('cartItemsList');
        const cartSummary = document.getElementById('cartSummary');
        
        if (this.items.length === 0) {
            emptyMessage.classList.remove('d-none');
            itemsList.innerHTML = '';
            cartSummary.style.display = 'none';
        } else {
            emptyMessage.classList.add('d-none');
            cartSummary.style.display = 'block';
            itemsList.innerHTML = this.renderCartItems();
        }
    }
    
    renderCartItems() {
        return this.items.map(item => {
            const product = productManager.getProduct(item.productId);
            return this.renderCartItem(product, item);
        }).join('');
    }
    
    renderCartItem(product, item) {
        return `
            <div class="cart-item border-bottom p-3 animate__animated animate__fadeInUp" data-product-id="${product.id}">
                <div class="row align-items-center">
                    <div class="col-3">
                        <img src="${product.image}" 
                             class="img-fluid rounded"
                             alt="${product.name}"
                             style="max-height: 80px; object-fit: cover;"
                             onerror="this.src='./images/placeholders/no-image.jpg'">
                    </div>
                    
                    <div class="col-9">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h6 class="mb-1 text-truncate" style="max-width: 150px;" title="${product.name}">
                                ${product.name}
                            </h6>
                            <button class="btn btn-sm btn-outline-danger" 
                                    onclick="cart.removeItem(${product.id})"
                                    title="削除">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                        
                        <p class="text-muted small mb-2">${product.category}</p>
                        
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group" role="group">
                                <button class="btn btn-outline-secondary btn-sm" 
                                        onclick="cart.decreaseQuantity(${product.id})"
                                        ${item.quantity <= 1 ? 'disabled' : ''}>
                                    <i class="bi bi-dash"></i>
                                </button>
                                <span class="btn btn-outline-secondary btn-sm disabled">
                                    ${item.quantity}
                                </span>
                                <button class="btn btn-outline-secondary btn-sm" 
                                        onclick="cart.increaseQuantity(${product.id})"
                                        ${item.quantity >= product.stock ? 'disabled' : ''}>
                                    <i class="bi bi-plus"></i>
                                </button>
                            </div>
                            
                            <div class="text-end">
                                <div class="fw-bold text-primary">
                                    ¥${(product.price * item.quantity).toLocaleString()}
                                </div>
                                <small class="text-muted">
                                    ¥${product.price.toLocaleString()} × ${item.quantity}
                                </small>
                            </div>
                        </div>
                        
                        <div class="mt-2">
                            ${this.renderStockStatus(product)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderStockStatus(product) {
        if (product.stock > 10) {
            return '<small class="text-success"><i class="bi bi-check-circle"></i> 在庫あり</small>';
        } else if (product.stock > 0) {
            return `<small class="text-warning"><i class="bi bi-exclamation-circle"></i> 残り${product.stock}点</small>`;
        } else {
            return '<small class="text-danger"><i class="bi bi-x-circle"></i> 在庫切れ</small>';
        }
    }
    
    // 決済処理
    proceedToCheckout() {
        if (this.items.length === 0) {
            this.showError('カートが空です');
            return;
        }
        
        // 在庫チェック
        const outOfStockItems = this.items.filter(item => {
            const product = productManager.getProduct(item.productId);
            return product.stock < item.quantity;
        });
        
        if (outOfStockItems.length > 0) {
            this.showError('在庫切れの商品があります。数量を調整してください。');
            return;
        }
        
        // 決済モーダルを開く
        checkout.openModal();
    }
    
    // 通知表示
    showSuccess(message) {
        this.showToast(message, 'success');
    }
    
    showError(message) {
        this.showToast(message, 'danger');
    }
    
    showInfo(message) {
        this.showToast(message, 'info');
    }
    
    showToast(message, type = 'primary') {
        const toastHTML = `
            <div class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="bi bi-${this.getIconForType(type)} me-2"></i>
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;
        
        let toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toastContainer';
            toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
            toastContainer.style.zIndex = '1080';
            document.body.appendChild(toastContainer);
        }
        
        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        
        const toastElement = toastContainer.lastElementChild;
        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 3000
        });
        
        toast.show();
        
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }
    
    getIconForType(type) {
        const icons = {
            success: 'check-circle',
            danger: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle',
            primary: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
    
    // ローカルストレージ
    saveToStorage() {
        try {
            localStorage.setItem('shoppingCart', JSON.stringify({
                items: this.items,
                savedAt: new Date().toISOString()
            }));
        } catch (error) {
            console.error('カートデータの保存に失敗しました:', error);
        }
    }
    
    loadFromStorage() {
        try {
            const data = localStorage.getItem('shoppingCart');
            if (data) {
                const parsed = JSON.parse(data);
                this.items = parsed.items || [];
                
                // 古いデータのクリーンアップ（7日以上前）
                const savedAt = new Date(parsed.savedAt);
                const now = new Date();
                const diffDays = (now - savedAt) / (1000 * 60 * 60 * 24);
                
                if (diffDays > 7) {
                    this.items = [];
                    this.saveToStorage();
                }
            }
        } catch (error) {
            console.error('カートデータの読み込みに失敗しました:', error);
            this.items = [];
        }
    }
    
    // アニメーション
    animateCartIcon() {
        const cartIcon = document.getElementById('mainCartIcon');
        if (cartIcon) {
            cartIcon.classList.add('animate__animated', 'animate__bounce');
            setTimeout(() => {
                cartIcon.classList.remove('animate__animated', 'animate__bounce');
            }, 1000);
        }
    }
    
    // イベントリスナー
    bindEvents() {
        // 配送オプション変更時
        document.addEventListener('change', (e) => {
            if (e.target.name === 'shipping') {
                this.updateCartSummary();
                checkout.updateCheckoutSummary();
            }
        });
        
        // ページを離れる前の確認
        window.addEventListener('beforeunload', (e) => {
            if (this.items.length > 0) {
                e.preventDefault();
                e.returnValue = 'カートに商品が入っています。このページを離れてもよろしいですか？';
            }
        });
    }
}

// カートインスタンス作成
const cart = new ShoppingCart();
```

## 💪 実習課題

### 課題1: クーポンシステム
カート機能にクーポン適用システムを追加：
- クーポンコード入力フィールド
- 割引額・割引率の計算
- 有効期限チェック機能
- 使用済みクーポンの管理

### 課題2: 商品推奨システム
- カート内商品に基づく関連商品表示
- 「よく一緒に購入される商品」機能
- カートに追加促進のUI
- 推奨商品クリック時の統計収集

### 課題3: 保存済みカート
- 複数のカートの保存機能
- お気に入りカートの命名・管理
- カート比較機能
- 共有可能なカートURL生成

### 課題4: 高度な在庫管理
- リアルタイム在庫同期
- 在庫切れ時の代替商品提案
- 入荷通知リクエスト機能
- バックオーダー対応

## 🎨 高度なカスタマイゼーション

### CSS アニメーション強化
```css
/* カートアイテムのスライドイン */
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.cart-item {
    animation: slideInRight 0.3s ease-out;
}

/* 数量変更時のパルス */
@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

.quantity-changed {
    animation: pulse 0.3s ease-in-out;
}

/* 価格更新時のハイライト */
@keyframes highlight {
    0% {
        background-color: transparent;
    }
    50% {
        background-color: rgba(0, 123, 255, 0.2);
    }
    100% {
        background-color: transparent;
    }
}

.price-updated {
    animation: highlight 0.5s ease-in-out;
}
```

### Progressive Web App対応
```javascript
// PWA対応 - オフライン機能
class OfflineCart {
    constructor() {
        this.isOnline = navigator.onLine;
        this.pendingSyncs = [];
        this.initServiceWorker();
        this.bindOnlineEvents();
    }
    
    initServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js');
        }
    }
    
    bindOnlineEvents() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.syncPendingData();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.showOfflineMessage();
        });
    }
    
    syncPendingData() {
        // オンライン復帰時の同期処理
    }
}
```

## ✅ 習得チェックリスト

### Bootstrap活用
- [ ] Offcanvasによるサイドカート実装
- [ ] Toastによる通知システム
- [ ] Modalによる決済フロー
- [ ] Badge・Progress等の状態表示

### カート機能
- [ ] 商品の追加・削除・数量変更
- [ ] 価格計算（小計・税込・送料）
- [ ] 在庫管理とエラーハンドリング
- [ ] LocalStorageによるデータ永続化

### ユーザー体験
- [ ] レスポンシブデザイン対応
- [ ] スムーズなアニメーション
- [ ] 直感的な操作インターフェース
- [ ] 適切なフィードバック表示

### 高度な機能
- [ ] 決済フロー実装
- [ ] バリデーション機能
- [ ] エラーハンドリング
- [ ] パフォーマンス最適化

## 🔗 次のステップ

- **決済API連携**: Stripe、PayPal等の実装
- **バックエンド連携**: 在庫管理・注文処理API
- **analytics実装**: カート離脱率・コンバージョン分析
- **A/Bテスト**: UI改善とコンバージョン最適化

## 💡 参考リンク

- [Bootstrap Offcanvas](https://getbootstrap.com/docs/5.3/components/offcanvas/)
- [Bootstrap Toast](https://getbootstrap.com/docs/5.3/components/toasts/)
- [Web Storage API](https://developer.mozilla.org/ja/docs/Web/API/Web_Storage_API)
- [E-commerce UX Best Practices](https://baymard.com/blog)
- [Progressive Web Apps](https://web.dev/progressive-web-apps/)

---

**🎉 高機能カートシステムマスターおめでとうございます！**

実際のECサイトで使用されるレベルのショッピングカート機能を完全に実装できるスキルが身につきました。Bootstrap・JavaScript・モダンWeb技術を駆使して、優れたユーザー体験を提供するEコマースシステムの構築が可能になりました！