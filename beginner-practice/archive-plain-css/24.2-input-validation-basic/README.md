# 24.2-input-validation-basic：入力値の基本チェック

## 🎯 学習目標
このステップでは、ユーザーが入力した情報が正しいかどうかをJavaScriptで基本的にチェックします。空文字の検証、簡単な形式チェック、エラーメッセージの表示を学びます。

### 具体的に身につくスキル
- JavaScriptでのフォームバリデーション基礎
- 空文字チェックと基本的な形式チェック
- エラーメッセージの動的表示
- `addEventListener`でのフォームイベント処理

## 📖 学習内容

### 今回学ぶ新しい概念
**フォームバリデーション** - 入力データの検証
- 空文字（空の入力）のチェック
- 最低文字数の確認
- 簡単なメール形式のチェック

**DOM操作の基礎** - HTML要素の操作
- `getElementById`で要素を取得
- `textContent`でメッセージを表示
- `classList.add/remove`でCSSクラスの追加・削除

### 実装する機能
1. **入力必須チェック**
   - 空文字の検出
   - エラーメッセージ表示

2. **基本形式チェック**
   - 氏名の最低文字数チェック（2文字以上）
   - メールアドレスの@マーク確認
   - パスワードの最低文字数チェック（4文字以上）

3. **リアルタイムバリデーション**
   - 入力中にエラーチェック
   - エラー状態の視覚的表示

## 📝 学習ポイント

### 💡 基本的なバリデーション関数
```javascript
// 空文字チェック
function isEmpty(value) {
  return value.trim() === '';
}

// 最低文字数チェック
function isMinLength(value, minLength) {
  return value.trim().length >= minLength;
}

// 基本的なメール形式チェック（@マークがあるかだけ）
function hasAtSymbol(email) {
  return email.includes('@');
}
```

### 💡 エラーメッセージの表示
```javascript
function showError(fieldName, message) {
  const errorElement = document.getElementById(fieldName + '-error');
  const inputElement = document.getElementById(fieldName);
  
  errorElement.textContent = message;
  inputElement.classList.add('error');
}

function clearError(fieldName) {
  const errorElement = document.getElementById(fieldName + '-error');
  const inputElement = document.getElementById(fieldName);
  
  errorElement.textContent = '';
  inputElement.classList.remove('error');
}
```

### 💡 フォーム送信時のチェック
```javascript
document.getElementById('registration-form').addEventListener('submit', function(e) {
  e.preventDefault(); // フォームの通常送信を停止
  
  let hasErrors = false;
  
  // 氏名チェック
  const name = document.getElementById('name').value;
  if (isEmpty(name)) {
    showError('name', '氏名を入力してください');
    hasErrors = true;
  } else if (!isMinLength(name, 2)) {
    showError('name', '氏名は2文字以上で入力してください');
    hasErrors = true;
  } else {
    clearError('name');
  }
  
  // エラーがなければ成功メッセージ
  if (!hasErrors) {
    alert('入力内容に問題ありません！');
  }
});
```

## 🔍 詳細解説

### Step 1: HTMLにエラー表示エリアを追加
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>24.2 入力値基本チェック</title>
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
        <input type="password" id="password" name="password" required>
        <div id="password-error" class="error-message"></div>
      </div>
      
      <button type="submit" class="submit-btn">登録する</button>
    </form>
    
    <div id="success-message" class="success-message" style="display: none;">
      入力内容に問題ありません！
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>
```

### Step 2: CSSでエラー状態のスタイル追加
```css
/* 前回のCSSに追加 */

.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
  min-height: 20px; /* 高さを固定してレイアウト崩れを防ぐ */
}

input.error {
  border-color: #e74c3c;
  background-color: #fdf2f2;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  margin-top: 20px;
  text-align: center;
}
```

### Step 3: JavaScriptでバリデーション機能実装
```javascript
// バリデーション関数
function isEmpty(value) {
  return value.trim() === '';
}

function isMinLength(value, minLength) {
  return value.trim().length >= minLength;
}

function hasAtSymbol(email) {
  return email.includes('@');
}

// エラー表示機能
function showError(fieldName, message) {
  const errorElement = document.getElementById(fieldName + '-error');
  const inputElement = document.getElementById(fieldName);
  
  errorElement.textContent = message;
  inputElement.classList.add('error');
}

function clearError(fieldName) {
  const errorElement = document.getElementById(fieldName + '-error');
  const inputElement = document.getElementById(fieldName);
  
  errorElement.textContent = '';
  inputElement.classList.remove('error');
}

// 各フィールドのバリデーション
function validateName() {
  const name = document.getElementById('name').value;
  
  if (isEmpty(name)) {
    showError('name', '氏名を入力してください');
    return false;
  } else if (!isMinLength(name, 2)) {
    showError('name', '氏名は2文字以上で入力してください');
    return false;
  } else {
    clearError('name');
    return true;
  }
}

function validateEmail() {
  const email = document.getElementById('email').value;
  
  if (isEmpty(email)) {
    showError('email', 'メールアドレスを入力してください');
    return false;
  } else if (!hasAtSymbol(email)) {
    showError('email', '正しいメールアドレスを入力してください（@が必要です）');
    return false;
  } else {
    clearError('email');
    return true;
  }
}

function validatePassword() {
  const password = document.getElementById('password').value;
  
  if (isEmpty(password)) {
    showError('password', 'パスワードを入力してください');
    return false;
  } else if (!isMinLength(password, 4)) {
    showError('password', 'パスワードは4文字以上で入力してください');
    return false;
  } else {
    clearError('password');
    return true;
  }
}

// フォーム送信時のバリデーション
document.getElementById('registration-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  
  if (isNameValid && isEmailValid && isPasswordValid) {
    // 成功メッセージを表示
    document.getElementById('success-message').style.display = 'block';
    
    // フォームをリセット
    setTimeout(() => {
      this.reset();
      document.getElementById('success-message').style.display = 'none';
    }, 3000);
  }
});

// リアルタイムバリデーション（オプション）
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('password').addEventListener('blur', validatePassword);
```

## 🚀 実装のコツ

### 1. 段階的なバリデーション
- まずは空文字チェックから
- 次に基本的な形式チェック
- 複雑な検証は後のステップで学習

### 2. ユーザーフレンドリー
- 明確でわかりやすいエラーメッセージ
- エラー状態の視覚的フィードバック
- 成功時の適切な反応

### 3. パフォーマンス
- 必要最小限のDOM操作
- イベントリスナーの適切な設定

## ✅ 完成チェックリスト
- [ ] 空文字入力時にエラーメッセージが表示される
- [ ] 氏名が2文字未満の場合エラーになる
- [ ] メールアドレスに@がない場合エラーになる
- [ ] パスワードが4文字未満の場合エラーになる
- [ ] 全項目正しく入力すると成功メッセージが表示される
- [ ] エラー状態でフィールドの色が変わる
- [ ] リアルタイムバリデーションが機能する（オプション）

## 🔗 次のステップ
基本的なバリデーションをマスターしたら、次は「24.3-password-confirmation」でパスワード確認機能を学びます。2つのパスワード入力欄の一致チェックを実装していきます。

---
**💻 ユーザビリティの高いバリデーションで、使いやすいフォームを作りましょう！**