# 24.3-password-confirmation：パスワード確認機能

## 🎯 学習目標
このステップでは、パスワードの入力間違いを防ぐためのパスワード確認機能を実装します。2つのパスワード入力欄の内容が一致するかをチェックし、安全なユーザー登録システムを完成させます。

### 具体的に身につくスキル
- 複数入力フィールド間の値比較
- パスワード入力の表示/非表示切り替え
- より実用的なフォームバリデーション
- ユーザビリティを意識したフィードバック

## 📖 学習内容

### 今回学ぶ新しい概念
**値の比較チェック** - 複数フィールドの連携
- 2つの入力値が同じかどうかを判定
- 条件分岐を使った複数の状態管理

**パスワード表示切り替え** - セキュリティとユーザビリティの両立
- `type="password"`と`type="text"`の動的切り替え
- 目のアイコンでの視覚的操作

### 実装する機能
1. **パスワード確認入力**
   - パスワード入力欄を2つ作成
   - 2つの値が一致するかチェック

2. **パスワード表示/非表示**
   - 目のアイコンをクリックでパスワード表示切り替え
   - セキュリティと利便性を両立

3. **完全なフォームバリデーション**
   - すべての項目の総合チェック
   - 段階的なエラー表示

## 📝 学習ポイント

### 💡 パスワード一致チェック
```javascript
function validatePasswordMatch() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  
  if (isEmpty(confirmPassword)) {
    showError('confirm-password', 'パスワード（確認）を入力してください');
    return false;
  } else if (password !== confirmPassword) {
    showError('confirm-password', 'パスワードが一致しません');
    return false;
  } else {
    clearError('confirm-password');
    return true;
  }
}
```

### 💡 パスワード表示切り替え
```javascript
function togglePasswordVisibility(passwordFieldId, toggleButtonId) {
  const passwordField = document.getElementById(passwordFieldId);
  const toggleButton = document.getElementById(toggleButtonId);
  
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    toggleButton.textContent = '🙈'; // 隠すアイコン
  } else {
    passwordField.type = 'password';
    toggleButton.textContent = '👁️'; // 表示アイコン
  }
}
```

### 💡 総合的なフォームバリデーション
```javascript
function validateAllFields() {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isPasswordMatchValid = validatePasswordMatch();
  
  return isNameValid && isEmailValid && isPasswordValid && isPasswordMatchValid;
}
```

## 🔍 詳細解説

### Step 1: HTMLにパスワード確認フィールドを追加
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>24.3 パスワード確認機能</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>ユーザー登録フォーム</h1>
    
    <form id="registration-form" class="registration-form">
      <div class="form-group">
        <label for="name">氏名 <span class="required">*</span></label>
        <input type="text" id="name" name="name" required>
        <div id="name-error" class="error-message"></div>
      </div>
      
      <div class="form-group">
        <label for="email">メールアドレス <span class="required">*</span></label>
        <input type="email" id="email" name="email" required>
        <div id="email-error" class="error-message"></div>
      </div>
      
      <div class="form-group">
        <label for="password">パスワード <span class="required">*</span></label>
        <div class="password-field">
          <input type="password" id="password" name="password" required>
          <button type="button" id="toggle-password" class="password-toggle">👁️</button>
        </div>
        <div id="password-error" class="error-message"></div>
      </div>
      
      <div class="form-group">
        <label for="confirm-password">パスワード（確認）<span class="required">*</span></label>
        <div class="password-field">
          <input type="password" id="confirm-password" name="confirm-password" required>
          <button type="button" id="toggle-confirm-password" class="password-toggle">👁️</button>
        </div>
        <div id="confirm-password-error" class="error-message"></div>
      </div>
      
      <button type="submit" class="submit-btn">登録する</button>
    </form>
    
    <div id="success-message" class="success-message" style="display: none;">
      ✅ 登録が完了しました！
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>
```

### Step 2: CSSでパスワード表示切り替えボタンのスタイル
```css
/* 前回のCSSに追加 */

.password-field {
  position: relative;
  display: flex;
}

.password-field input {
  flex: 1;
  padding-right: 45px; /* ボタンの分の余白 */
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 5px;
}

.password-toggle:hover {
  background-color: #f0f0f0;
  border-radius: 3px;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 15px;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
}
```

### Step 3: JavaScriptで機能実装
```javascript
// 前回のバリデーション関数に加えて追加

// パスワード確認のバリデーション
function validatePasswordMatch() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  
  if (isEmpty(confirmPassword)) {
    showError('confirm-password', 'パスワード（確認）を入力してください');
    return false;
  } else if (password !== confirmPassword) {
    showError('confirm-password', 'パスワードが一致しません');
    return false;
  } else {
    clearError('confirm-password');
    return true;
  }
}

// パスワード表示切り替え
function togglePasswordVisibility(passwordFieldId, toggleButtonId) {
  const passwordField = document.getElementById(passwordFieldId);
  const toggleButton = document.getElementById(toggleButtonId);
  
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    toggleButton.textContent = '🙈'; // パスワードを隠す
    toggleButton.title = 'パスワードを隠す';
  } else {
    passwordField.type = 'password';
    toggleButton.textContent = '👁️'; // パスワードを表示
    toggleButton.title = 'パスワードを表示';
  }
}

// すべてのフィールドのバリデーション
function validateAllFields() {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isPasswordMatchValid = validatePasswordMatch();
  
  return isNameValid && isEmailValid && isPasswordValid && isPasswordMatchValid;
}

// フォーム送信時の処理
document.getElementById('registration-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  if (validateAllFields()) {
    // 成功メッセージを表示
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';
    
    // フォームをリセット
    setTimeout(() => {
      this.reset();
      successMessage.style.display = 'none';
      // エラーメッセージもクリア
      clearError('name');
      clearError('email');
      clearError('password');
      clearError('confirm-password');
    }, 3000);
  }
});

// パスワード表示切り替えボタンのイベント
document.getElementById('toggle-password').addEventListener('click', function() {
  togglePasswordVisibility('password', 'toggle-password');
});

document.getElementById('toggle-confirm-password').addEventListener('click', function() {
  togglePasswordVisibility('confirm-password', 'toggle-confirm-password');
});

// リアルタイムバリデーション
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('password').addEventListener('blur', validatePassword);
document.getElementById('confirm-password').addEventListener('blur', validatePasswordMatch);

// パスワード入力時に確認パスワードもチェック
document.getElementById('password').addEventListener('input', function() {
  const confirmPassword = document.getElementById('confirm-password').value;
  if (confirmPassword) {
    validatePasswordMatch();
  }
});
```

## 🚀 実装のコツ

### 1. ユーザーエクスペリエンス
- パスワード表示/非表示で入力ミスを減らす
- リアルタイムでパスワード不一致を知らせる
- 成功時の適切なフィードバック

### 2. アクセシビリティ
- ボタンに適切な`title`属性
- キーボードでも操作可能
- スクリーンリーダー対応

### 3. セキュリティ意識
- パスワード入力の基本的な配慮
- 確認機能でタイプミスを防止

## ✅ 完成チェックリスト
- [ ] パスワード確認欄が表示される
- [ ] 2つのパスワードが異なる場合エラーメッセージが表示される
- [ ] パスワード表示/非表示ボタンが動作する
- [ ] 両方のパスワード欄で表示切り替えができる
- [ ] すべての項目が正しく入力された時のみ成功メッセージが表示される
- [ ] リアルタイムでパスワード不一致がチェックされる
- [ ] フォーム送信後にリセットされる

## 🔗 次のステップ
パスワード確認機能をマスターしたら、次は「25.1-modal-display-basic」でモーダルウィンドウの基本的な表示・非表示機能を学びます。ポップアップ式のユーザーインターフェースの基礎を学んでいきます。

---
**💻 ユーザーの入力ミスを防ぐ機能で、信頼できるフォームを作りましょう！**