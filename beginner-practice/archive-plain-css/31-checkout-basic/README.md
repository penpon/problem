# 31-checkout-basic：基本的なチェックアウトフォームの構築

## 🎯 学習目標
このステップでは、ECサイトの購入プロセスの基本となる、シンプルな注文フォームの実装を学びます。マルチステップフォームや複雑な決済処理は除外し、基本的な商品購入フォームに集中して実装します。

### 具体的に身につくスキル
- 基本的な注文フォーム作成
- フォームバリデーションの実装
- 注文内容の表示と確認
- 基本的な料金計算

## 📖 学習内容

### 今回学ぶ新しい概念
**フォームバリデーション** - 入力値の検証
- 必須項目のチェック
- メールアドレス形式の確認
- 電話番号形式の確認
- エラーメッセージの表示

**データ収集と表示** - フォームデータの処理
- フォームデータの取得
- 注文内容の確認表示
- 計算処理の実装

### 実装する機能
1. **商品選択** 🛍️ - シンプルな商品選択
2. **お客様情報入力** 👤 - 名前、メール、電話番号入力
3. **配送先入力** 📮 - 住所入力フォーム
4. **注文確認** 📄 - 入力内容の確認表示
5. **基本料金計算** 💰 - 小計、送料、合計の計算

## 📝 学習ポイント

### 💡 基本的なチェックアウトフォーム構造
```html
<div class="checkout-container">
  <h1>ご注文手続き</h1>
  
  <!-- 注文商品 -->
  <div class="order-summary">
    <h2>ご注文商品</h2>
    <div class="product-item">
      <img src="images/product.jpg" alt="商品画像" class="product-image">
      <div class="product-info">
        <h3>商品名：ベーシックTシャツ</h3>
        <p>価格：¥2,500</p>
        <p>数量：<input type="number" id="quantity" value="1" min="1" max="10"></p>
      </div>
    </div>
  </div>
  
  <!-- お客様情報 -->
  <div class="customer-info">
    <h2>お客様情報</h2>
    <div class="form-group">
      <label for="customerName">お名前 <span class="required">*</span></label>
      <input type="text" id="customerName" name="customerName" required>
      <span class="error-message" id="nameError"></span>
    </div>
    
    <div class="form-group">
      <label for="email">メールアドレス <span class="required">*</span></label>
      <input type="email" id="email" name="email" required>
      <span class="error-message" id="emailError"></span>
    </div>
    
    <div class="form-group">
      <label for="phone">電話番号 <span class="required">*</span></label>
      <input type="tel" id="phone" name="phone" required>
      <span class="error-message" id="phoneError"></span>
    </div>
  </div>
  
  <!-- 配送先情報 -->
  <div class="shipping-info">
    <h2>配送先情報</h2>
    <div class="form-group">
      <label for="postalCode">郵便番号 <span class="required">*</span></label>
      <input type="text" id="postalCode" name="postalCode" placeholder="例：123-4567" required>
      <span class="error-message" id="postalError"></span>
    </div>
    
    <div class="form-group">
      <label for="address">住所 <span class="required">*</span></label>
      <textarea id="address" name="address" rows="3" placeholder="都道府県市区町村番地建物名" required></textarea>
      <span class="error-message" id="addressError"></span>
    </div>
  </div>
  
  <!-- 料金計算 -->
  <div class="price-summary">
    <h2>料金内訳</h2>
    <div class="price-item">
      <span>商品代金：</span>
      <span id="subtotal">¥2,500</span>
    </div>
    <div class="price-item">
      <span>送料：</span>
      <span id="shipping">¥500</span>
    </div>
    <div class="price-total">
      <span>合計：</span>
      <span id="total">¥3,000</span>
    </div>
  </div>
  
  <!-- 注文ボタン -->
  <div class="checkout-actions">
    <button type="button" id="confirmBtn" class="confirm-btn">注文内容を確認</button>
    <button type="button" id="orderBtn" class="order-btn" style="display: none;">注文を確定する</button>
  </div>
  
  <!-- 確認画面 -->
  <div id="confirmationModal" class="modal" style="display: none;">
    <div class="modal-content">
      <h2>注文内容確認</h2>
      <div id="confirmationContent"></div>
      <div class="modal-actions">
        <button id="editBtn" class="edit-btn">修正する</button>
        <button id="finalOrderBtn" class="final-order-btn">注文確定</button>
      </div>
    </div>
  </div>
</div>
```

### 💡 チェックアウトフォームのスタイル
```css
/* コンテナスタイル */
.checkout-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.checkout-container h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.checkout-container h2 {
  color: #34495e;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
  margin: 2rem 0 1rem 0;
}

/* 商品表示 */
.product-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

/* フォームスタイル */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

.required {
  color: #e74c3c;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
}

.form-group input.error,
.form-group textarea.error {
  border-color: #e74c3c;
}

.error-message {
  display: block;
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* 料金表示 */
.price-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
}

.price-item,
.price-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0;
}

.price-total {
  border-top: 2px solid #3498db;
  font-weight: bold;
  font-size: 1.2rem;
  color: #2c3e50;
}

/* ボタンスタイル */
.checkout-actions {
  text-align: center;
  margin-top: 2rem;
}

.confirm-btn,
.order-btn {
  background-color: #3498db;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-btn:hover,
.order-btn:hover {
  background-color: #2980b9;
}

/* モーダルスタイル */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .checkout-container {
    margin: 1rem;
    padding: 1rem;
  }
  
  .product-item {
    flex-direction: column;
    text-align: center;
  }
  
  .modal-content {
    margin: 1rem;
    padding: 1rem;
  }
}
```

### 💡 基本的なバリデーションとデータ処理
```javascript
// 基本チェックアウトシステム
class BasicCheckoutSystem {
  constructor() {
    this.productPrice = 2500;
    this.shippingFee = 500;
    this.quantity = 1;
    
    this.init();
  }
  
  init() {
    // 数量変更イベント
    document.getElementById('quantity').addEventListener('change', (e) => {
      this.quantity = parseInt(e.target.value);
      this.updatePrices();
    });
    
    // 確認ボタン
    document.getElementById('confirmBtn').addEventListener('click', () => {
      this.validateAndConfirm();
    });
    
    // 注文確定ボタン
    document.getElementById('finalOrderBtn').addEventListener('click', () => {
      this.completeOrder();
    });
    
    // 修正ボタン
    document.getElementById('editBtn').addEventListener('click', () => {
      this.closeConfirmation();
    });
    
    // 初期価格表示
    this.updatePrices();
  }
  
  // 料金更新
  updatePrices() {
    const subtotal = this.productPrice * this.quantity;
    const total = subtotal + this.shippingFee;
    
    document.getElementById('subtotal').textContent = `¥${subtotal.toLocaleString()}`;
    document.getElementById('total').textContent = `¥${total.toLocaleString()}`;
  }
  
  // バリデーション
  validateForm() {
    let isValid = true;
    const errors = {};
    
    // 名前チェック
    const name = document.getElementById('customerName').value.trim();
    if (!name) {
      errors.name = 'お名前を入力してください';
      isValid = false;
    }
    
    // メールチェック
    const email = document.getElementById('email').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = 'メールアドレスを入力してください';
      isValid = false;
    } else if (!emailPattern.test(email)) {
      errors.email = '正しいメールアドレスを入力してください';
      isValid = false;
    }
    
    // 電話番号チェック
    const phone = document.getElementById('phone').value.trim();
    const phonePattern = /^[0-9-]+$/;
    if (!phone) {
      errors.phone = '電話番号を入力してください';
      isValid = false;
    } else if (!phonePattern.test(phone)) {
      errors.phone = '正しい電話番号を入力してください';
      isValid = false;
    }
    
    // 郵便番号チェック
    const postal = document.getElementById('postalCode').value.trim();
    const postalPattern = /^\d{3}-\d{4}$/;
    if (!postal) {
      errors.postal = '郵便番号を入力してください';
      isValid = false;
    } else if (!postalPattern.test(postal)) {
      errors.postal = '正しい郵便番号を入力してください（例：123-4567）';
      isValid = false;
    }
    
    // 住所チェック
    const address = document.getElementById('address').value.trim();
    if (!address) {
      errors.address = '住所を入力してください';
      isValid = false;
    }
    
    this.displayErrors(errors);
    return isValid;
  }
  
  // エラー表示
  displayErrors(errors) {
    // 既存のエラーをクリア
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
    });
    
    document.querySelectorAll('input, textarea').forEach(el => {
      el.classList.remove('error');
    });
    
    // 新しいエラーを表示
    Object.keys(errors).forEach(field => {
      const errorElement = document.getElementById(`${field}Error`);
      if (errorElement) {
        errorElement.textContent = errors[field];
      }
      
      const inputElement = document.getElementById(field === 'name' ? 'customerName' : 
                                                field === 'postal' ? 'postalCode' : field);
      if (inputElement) {
        inputElement.classList.add('error');
      }
    });
  }
  
  // 注文確認
  validateAndConfirm() {
    if (this.validateForm()) {
      this.showConfirmation();
    } else {
      alert('入力内容に誤りがあります。確認してください。');
    }
  }
  
  // 確認画面表示
  showConfirmation() {
    const formData = this.collectFormData();
    const confirmationHTML = this.generateConfirmationHTML(formData);
    
    document.getElementById('confirmationContent').innerHTML = confirmationHTML;
    document.getElementById('confirmationModal').style.display = 'flex';
  }
  
  // フォームデータ収集
  collectFormData() {
    return {
      name: document.getElementById('customerName').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      postalCode: document.getElementById('postalCode').value.trim(),
      address: document.getElementById('address').value.trim(),
      quantity: this.quantity,
      subtotal: this.productPrice * this.quantity,
      shipping: this.shippingFee,
      total: (this.productPrice * this.quantity) + this.shippingFee
    };
  }
  
  // 確認画面HTML生成
  generateConfirmationHTML(data) {
    return `
      <div class="confirmation-section">
        <h3>商品情報</h3>
        <p>商品名：ベーシックTシャツ</p>
        <p>数量：${data.quantity}個</p>
        <p>小計：¥${data.subtotal.toLocaleString()}</p>
      </div>
      
      <div class="confirmation-section">
        <h3>お客様情報</h3>
        <p>お名前：${data.name}</p>
        <p>メール：${data.email}</p>
        <p>電話番号：${data.phone}</p>
      </div>
      
      <div class="confirmation-section">
        <h3>配送先</h3>
        <p>〒${data.postalCode}</p>
        <p>${data.address}</p>
      </div>
      
      <div class="confirmation-section">
        <h3>料金合計</h3>
        <p>商品代金：¥${data.subtotal.toLocaleString()}</p>
        <p>送料：¥${data.shipping.toLocaleString()}</p>
        <p><strong>合計：¥${data.total.toLocaleString()}</strong></p>
      </div>
    `;
  }
  
  // 確認画面を閉じる
  closeConfirmation() {
    document.getElementById('confirmationModal').style.display = 'none';
  }
  
  // 注文完了
  completeOrder() {
    alert('ご注文を承りました。確認メールをお送りしますので、しばらくお待ちください。');
    this.closeConfirmation();
    
    // フォームをリセット（オプション）
    // this.resetForm();
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  new BasicCheckoutSystem();
});
```

## 🚀 実装のコツ
- バリデーションは分かりやすいメッセージにする
- 必須項目を視覚的に明確にする
- 計算結果は随時更新する
- ユーザーが入力しやすいフォーム設計を心がける

## ✅ 完成チェックリスト
- [ ] 商品選択と数量変更が機能する
- [ ] お客様情報の入力ができる
- [ ] 配送先情報の入力ができる
- [ ] フォームバリデーションが動作する
- [ ] 料金計算が正しく表示される
- [ ] 注文確認画面が表示される
- [ ] 注文完了処理が動作する
- [ ] レスポンシブ対応ができている

## 🔗 次のステップ
次は「32-simple-integration」でこれまで学んだ機能をシンプルに統合します。

---
**💻 分かりやすいチェックアウトフォームは、購入完了率を大きく左右します！**