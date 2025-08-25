# 36-form-validation：フォームバリデーション機能の実装

## 🎯 学習目標
このステップでは、リアルタイムフォームバリデーション機能を学びます。ユーザーが入力する際に即座にチェックし、適切なフィードバックを提供する高品質なフォームシステムを実装します。

### 身につく新概念
- **リアルタイムバリデーション**: 入力と同時に検証を行う処理
- **正規表現**: 文字列パターンマッチングの基礎
- **フォーム状態管理**: エラー状態とUI連携の処理

## 📖 学習内容

### 実装する機能
1. **会員登録フォーム** 👤 - 新規ユーザー登録のバリデーション
2. **ログインフォーム** 🔐 - ユーザー認証のバリデーション
3. **リアルタイム検証** ⚡ - 入力中の即座なフィードバック
4. **エラー表示システム** 🚨 - 分かりやすいエラーメッセージ

### フォームシステムの基本構造
```html
<!-- 会員登録フォーム -->
<div class="auth-forms">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow">
          <div class="card-header bg-primary text-white text-center">
            <h4 class="mb-0">👤 会員登録</h4>
          </div>
          <div class="card-body p-4">
            <form id="registerForm" novalidate>
              <!-- 名前入力 -->
              <div class="mb-3">
                <label for="registerName" class="form-label">
                  お名前 <span class="text-danger">*</span>
                </label>
                <div class="input-group">
                  <span class="input-group-text">👤</span>
                  <input type="text" 
                         class="form-control" 
                         id="registerName"
                         placeholder="山田 太郎"
                         required>
                  <div class="valid-feedback">
                    ✅ 正しく入力されました
                  </div>
                  <div class="invalid-feedback" id="nameError">
                    お名前を入力してください（2文字以上）
                  </div>
                </div>
              </div>
              
              <!-- メールアドレス -->
              <div class="mb-3">
                <label for="registerEmail" class="form-label">
                  メールアドレス <span class="text-danger">*</span>
                </label>
                <div class="input-group">
                  <span class="input-group-text">📧</span>
                  <input type="email" 
                         class="form-control" 
                         id="registerEmail"
                         placeholder="example@email.com"
                         required>
                  <div class="valid-feedback">
                    ✅ 正しいメールアドレスです
                  </div>
                  <div class="invalid-feedback" id="emailError">
                    正しいメールアドレスを入力してください
                  </div>
                </div>
              </div>
              
              <!-- パスワード -->
              <div class="mb-3">
                <label for="registerPassword" class="form-label">
                  パスワード <span class="text-danger">*</span>
                </label>
                <div class="input-group">
                  <span class="input-group-text">🔒</span>
                  <input type="password" 
                         class="form-control" 
                         id="registerPassword"
                         placeholder="8文字以上の英数字"
                         required>
                  <button class="btn btn-outline-secondary" 
                          type="button" 
                          id="togglePassword">
                    👁️
                  </button>
                  <div class="valid-feedback">
                    ✅ 強度の高いパスワードです
                  </div>
                  <div class="invalid-feedback" id="passwordError">
                    8文字以上の英数字を含むパスワードを入力してください
                  </div>
                </div>
                <!-- パスワード強度表示 -->
                <div class="password-strength mt-2" id="passwordStrength">
                  <div class="progress" style="height: 5px;">
                    <div class="progress-bar" 
                         role="progressbar" 
                         style="width: 0%"
                         id="strengthBar"></div>
                  </div>
                  <small class="form-text text-muted" id="strengthText">
                    パスワードを入力してください
                  </small>
                </div>
              </div>
              
              <!-- パスワード確認 -->
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">
                  パスワード確認 <span class="text-danger">*</span>
                </label>
                <div class="input-group">
                  <span class="input-group-text">🔐</span>
                  <input type="password" 
                         class="form-control" 
                         id="confirmPassword"
                         placeholder="上記パスワードを再入力"
                         required>
                  <div class="valid-feedback">
                    ✅ パスワードが一致しています
                  </div>
                  <div class="invalid-feedback" id="confirmError">
                    パスワードが一致しません
                  </div>
                </div>
              </div>
              
              <!-- 電話番号 -->
              <div class="mb-3">
                <label for="registerPhone" class="form-label">
                  電話番号
                </label>
                <div class="input-group">
                  <span class="input-group-text">📱</span>
                  <input type="tel" 
                         class="form-control" 
                         id="registerPhone"
                         placeholder="090-1234-5678">
                  <div class="valid-feedback">
                    ✅ 正しい電話番号です
                  </div>
                  <div class="invalid-feedback" id="phoneError">
                    正しい電話番号を入力してください（例: 090-1234-5678）
                  </div>
                </div>
              </div>
              
              <!-- 利用規約 -->
              <div class="mb-4">
                <div class="form-check">
                  <input class="form-check-input" 
                         type="checkbox" 
                         id="agreeTerms"
                         required>
                  <label class="form-check-label" for="agreeTerms">
                    <a href="#" class="text-primary">利用規約</a>と
                    <a href="#" class="text-primary">プライバシーポリシー</a>に同意する
                    <span class="text-danger">*</span>
                  </label>
                  <div class="invalid-feedback">
                    利用規約への同意が必要です
                  </div>
                </div>
              </div>
              
              <!-- 送信ボタン -->
              <div class="d-grid">
                <button type="submit" 
                        class="btn btn-primary btn-lg"
                        id="registerBtn">
                  <span class="spinner-border spinner-border-sm d-none me-2" 
                        id="registerSpinner"></span>
                  👤 会員登録
                </button>
              </div>
            </form>
            
            <!-- ログインリンク -->
            <div class="text-center mt-3">
              <small class="text-muted">
                すでにアカウントをお持ちの方は 
                <a href="#" class="text-primary" id="showLogin">ログイン</a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## 📝 学習ポイント

### 💡 バリデーションシステムの実装

```javascript
class FormValidationSystem {
  constructor() {
    this.validators = {
      name: {
        pattern: /^[ぁ-んァ-ヶー一-龯a-zA-Z\s]{2,}$/,
        message: 'お名前を2文字以上で入力してください'
      },
      email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: '正しいメールアドレスを入力してください'
      },
      password: {
        pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
        message: '8文字以上の英数字を含むパスワードを入力してください'
      },
      phone: {
        pattern: /^0\d{1,4}-\d{1,4}-\d{3,4}$/,
        message: '正しい電話番号を入力してください（例: 090-1234-5678）'
      }
    };
    
    this.init();
  }
  
  init() {
    this.setupFormValidation();
    this.setupPasswordToggle();
  }
  
  // フォームバリデーション設定
  setupFormValidation() {
    const registerForm = document.getElementById('registerForm');
    
    // 各入力フィールドにリアルタイムバリデーションを設定
    const fields = [
      { id: 'registerName', validator: 'name' },
      { id: 'registerEmail', validator: 'email' },
      { id: 'registerPassword', validator: 'password' },
      { id: 'registerPhone', validator: 'phone' }
    ];
    
    fields.forEach(field => {
      const input = document.getElementById(field.id);
      if (input) {
        // リアルタイムバリデーション
        input.addEventListener('input', () => {
          this.validateField(input, field.validator);
          
          // パスワード強度チェック
          if (field.id === 'registerPassword') {
            this.checkPasswordStrength(input.value);
          }
        });
        
        // フォーカスアウト時の最終チェック
        input.addEventListener('blur', () => {
          this.validateField(input, field.validator);
        });
      }
    });
    
    // パスワード確認フィールド
    const confirmPassword = document.getElementById('confirmPassword');
    if (confirmPassword) {
      confirmPassword.addEventListener('input', () => {
        this.validatePasswordConfirm();
      });
      confirmPassword.addEventListener('blur', () => {
        this.validatePasswordConfirm();
      });
    }
    
    // 利用規約チェックボックス
    const agreeTerms = document.getElementById('agreeTerms');
    if (agreeTerms) {
      agreeTerms.addEventListener('change', () => {
        this.validateCheckbox(agreeTerms);
      });
    }
    
    // フォーム送信処理
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit();
      });
    }
  }
  
  // 個別フィールドバリデーション
  validateField(input, validatorType) {
    const value = input.value.trim();
    const validator = this.validators[validatorType];
    
    // 空の場合のチェック
    if (input.hasAttribute('required') && !value) {
      this.setFieldError(input, '必須項目です');
      return false;
    }
    
    // パターンチェック
    if (value && !validator.pattern.test(value)) {
      this.setFieldError(input, validator.message);
      return false;
    }
    
    // 成功時の処理
    this.setFieldValid(input);
    return true;
  }
  
  // パスワード確認バリデーション
  validatePasswordConfirm() {
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword');
    const confirmValue = confirmPassword.value;
    
    if (!confirmValue) {
      this.setFieldError(confirmPassword, 'パスワード確認を入力してください');
      return false;
    }
    
    if (password !== confirmValue) {
      this.setFieldError(confirmPassword, 'パスワードが一致しません');
      return false;
    }
    
    this.setFieldValid(confirmPassword);
    return true;
  }
  
  // チェックボックスバリデーション
  validateCheckbox(checkbox) {
    if (!checkbox.checked) {
      checkbox.classList.add('is-invalid');
      return false;
    }
    
    checkbox.classList.remove('is-invalid');
    checkbox.classList.add('is-valid');
    return true;
  }
  
  // パスワード強度チェック
  checkPasswordStrength(password) {
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    
    let strength = 0;
    let message = '';
    let colorClass = '';
    
    if (password.length >= 8) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 20;
    if (/[^a-zA-Z\d]/.test(password)) strength += 20;
    
    if (strength === 0) {
      message = 'パスワードを入力してください';
      colorClass = '';
    } else if (strength <= 40) {
      message = '弱い - より複雑にしてください';
      colorClass = 'bg-danger';
    } else if (strength <= 60) {
      message = '普通 - もう少し複雑にできます';
      colorClass = 'bg-warning';
    } else if (strength <= 80) {
      message = '良好 - 安全なパスワードです';
      colorClass = 'bg-info';
    } else {
      message = '非常に強い - 完璧です！';
      colorClass = 'bg-success';
    }
    
    // プログレスバー更新
    strengthBar.style.width = `${strength}%`;
    strengthBar.className = `progress-bar ${colorClass}`;
    strengthText.textContent = message;
    strengthText.className = `form-text ${strength <= 40 ? 'text-danger' : strength <= 60 ? 'text-warning' : 'text-success'}`;
  }
  
  // エラー状態設定
  setFieldError(input, message) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('invalid-feedback')) {
      errorElement.textContent = message;
    }
  }
  
  // 成功状態設定
  setFieldValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }
  
  // パスワード表示切り替え
  setupPasswordToggle() {
    const toggleButton = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('registerPassword');
    
    if (toggleButton && passwordInput) {
      toggleButton.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        toggleButton.textContent = type === 'password' ? '👁️' : '🙈';
      });
    }
  }
  
  // フォーム全体のバリデーション
  validateForm() {
    let isValid = true;
    
    // 名前チェック
    const nameInput = document.getElementById('registerName');
    if (!this.validateField(nameInput, 'name')) {
      isValid = false;
    }
    
    // メールチェック
    const emailInput = document.getElementById('registerEmail');
    if (!this.validateField(emailInput, 'email')) {
      isValid = false;
    }
    
    // パスワードチェック
    const passwordInput = document.getElementById('registerPassword');
    if (!this.validateField(passwordInput, 'password')) {
      isValid = false;
    }
    
    // パスワード確認チェック
    if (!this.validatePasswordConfirm()) {
      isValid = false;
    }
    
    // 電話番号チェック（必須でない場合）
    const phoneInput = document.getElementById('registerPhone');
    const phoneValue = phoneInput.value.trim();
    if (phoneValue && !this.validators.phone.pattern.test(phoneValue)) {
      this.setFieldError(phoneInput, this.validators.phone.message);
      isValid = false;
    }
    
    // 利用規約チェック
    const agreeTerms = document.getElementById('agreeTerms');
    if (!this.validateCheckbox(agreeTerms)) {
      isValid = false;
    }
    
    return isValid;
  }
  
  // フォーム送信処理
  async handleFormSubmit() {
    const submitButton = document.getElementById('registerBtn');
    const spinner = document.getElementById('registerSpinner');
    
    // バリデーションチェック
    if (!this.validateForm()) {
      this.showNotification('入力内容に誤りがあります。確認してください。', 'error');
      return;
    }
    
    // 送信中UI
    submitButton.disabled = true;
    spinner.classList.remove('d-none');
    
    try {
      // 模擬的な送信処理（2秒後に完了）
      await this.simulateRegistration();
      
      // 成功メッセージ
      this.showNotification('会員登録が完了しました！', 'success');
      
      // フォームをリセット
      document.getElementById('registerForm').reset();
      this.resetFormValidation();
      
    } catch (error) {
      this.showNotification('登録に失敗しました。もう一度お試しください。', 'error');
    } finally {
      // 送信中UI解除
      submitButton.disabled = false;
      spinner.classList.add('d-none');
    }
  }
  
  // 模擬登録処理
  simulateRegistration() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 90%の確率で成功
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('登録失敗'));
        }
      }, 2000);
    });
  }
  
  // フォームバリデーション状態リセット
  resetFormValidation() {
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.classList.remove('is-valid', 'is-invalid');
    });
    
    const checkbox = document.getElementById('agreeTerms');
    if (checkbox) {
      checkbox.classList.remove('is-valid', 'is-invalid');
    }
    
    // パスワード強度リセット
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    if (strengthBar) {
      strengthBar.style.width = '0%';
      strengthBar.className = 'progress-bar';
    }
    if (strengthText) {
      strengthText.textContent = 'パスワードを入力してください';
      strengthText.className = 'form-text text-muted';
    }
  }
  
  // 通知表示
  showNotification(message, type) {
    // 通知システム（30番から継承）を使用
    if (window.notificationSystem) {
      if (type === 'success') {
        window.notificationSystem.success(message);
      } else {
        window.notificationSystem.error(message);
      }
    } else {
      alert(message);
    }
  }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
  window.validationSystem = new FormValidationSystem();
});
```

### 💡 バリデーションのCSS

```css
/* フォーム基本スタイル */
.auth-forms {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 2rem 0;
}

.auth-forms .card {
  border: none;
  border-radius: 1rem;
  overflow: hidden;
}

.auth-forms .card-header {
  border-radius: 0;
  padding: 1.5rem;
}

/* バリデーション状態のスタイル */
.form-control.is-valid {
  border-color: #198754;
  box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
}

.form-control.is-invalid {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.form-check-input.is-invalid {
  border-color: #dc3545;
}

/* パスワード強度バー */
.password-strength .progress {
  background-color: #e9ecef;
}

.progress-bar {
  transition: width 0.3s ease, background-color 0.3s ease;
}

/* フィードバックメッセージ */
.valid-feedback {
  font-size: 0.875rem;
  font-weight: 500;
}

.invalid-feedback {
  font-size: 0.875rem;
  font-weight: 500;
}

/* 入力グループスタイル */
.input-group-text {
  background-color: #f8f9fa;
  border-color: #ced4da;
  font-size: 1.1em;
}

/* ボタンアニメーション */
.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.btn:disabled {
  transform: none;
  box-shadow: none;
}

/* スピナーアニメーション */
.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .auth-forms {
    padding: 1rem 0;
  }
  
  .auth-forms .card-body {
    padding: 2rem 1.5rem;
  }
  
  .input-group-text {
    font-size: 1em;
  }
}

/* アニメーション効果 */
.card {
  animation: fadeInUp 0.6s ease;
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

/* フォーカス時のハイライト */
.form-control:focus {
  transform: scale(1.02);
  transition: transform 0.2s ease;
}

/* エラー状態のアニメーション */
.is-invalid {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}
```

## 🚀 実装のコツ

### バリデーション処理の基本
- **正規表現**: パターンマッチングの活用
- **リアルタイム処理**: 入力イベントの適切な使い分け
- **状態管理**: エラー状態とUI表示の同期

### UXの向上ポイント
- **即座なフィードバック**: 入力中にリアルタイムで検証
- **分かりやすいエラー**: 具体的で実用的なメッセージ
- **視覚的な誘導**: 色や アイコンでの状態表示

### Bootstrap活用
- **Form validation classes**: is-valid/is-invalidクラス
- **Input groups**: アイコン付きの入力フィールド
- **Progress component**: パスワード強度の視覚化

## ✅ 完成チェックリスト

### 基本バリデーション機能
- [ ] 名前の文字数チェック
- [ ] メールアドレス形式チェック
- [ ] パスワード強度チェック
- [ ] パスワード確認の一致チェック
- [ ] 電話番号形式チェック
- [ ] 利用規約同意チェック

### リアルタイム機能
- [ ] 入力中の即座な検証
- [ ] パスワード強度のリアルタイム表示
- [ ] エラーメッセージの動的更新
- [ ] 成功状態の視覚的フィードバック

### UX機能
- [ ] パスワード表示切り替え
- [ ] 送信中のローディング表示
- [ ] 成功・エラー通知
- [ ] フォームリセット機能

## 🎉 次のステップ

おめでとうございます！フォームバリデーション機能を習得しました。

### 🌟 習得したスキル
- **リアルタイムバリデーション**: 入力と同時の検証処理
- **正規表現**: パターンマッチングの実践的活用
- **状態管理**: フォーム状態とUI連携
- **UX設計**: ユーザーフレンドリーなフォーム作成

### 🚀 次の課題（37-complete-ec-site）
次は最終課題「完全ECサイト統合」に挑戦します！
- 全機能の統合
- エラーハンドリングの完全実装
- パフォーマンス最適化
- 最終的な品質向上

---
**💡 高品質なフォームバリデーションにより、ユーザーが安心して登録・ログインできるシステムが完成しました！**