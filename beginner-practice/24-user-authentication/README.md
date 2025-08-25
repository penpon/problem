# 24-user-authentication：ユーザー認証システムの構築

## 🎯 学習目標
このステップでは、ECサイトに欠かせないユーザー認証システムを構築します。会員登録とログイン機能、リアルタイムバリデーション、パスワード強度チェック、そしてユーザー状態の管理を学びます。

### 具体的に身につくスキル
- フォームバリデーション（リアルタイム検証）
- 正規表現を使った入力チェック
- パスワード強度の判定と表示
- LocalStorageを使ったユーザー情報管理
- セキュリティを意識したフォーム設計

## 📖 学習内容

### 今回学ぶ新しい概念
**正規表現（RegExp）** - 文字列のパターンマッチング
- メールアドレスの形式チェック
- パスワードの強度判定
- 電話番号の形式確認

**フォームバリデーション** - 入力内容の検証
- `addEventListener('input')` でリアルタイム検証
- エラーメッセージの動的表示
- 送信ボタンの有効化/無効化制御

### 実装する機能
1. **会員登録フォーム**
   - 氏名、メールアドレス、パスワードの入力
   - リアルタイムバリデーション
   - パスワード確認機能

2. **ログインフォーム**
   - メールアドレスとパスワードでのログイン
   - ログイン状態の保持
   - "ログイン状態を保持する" チェックボックス

3. **パスワード強度チェック**
   - 文字数、大小文字、数字、記号の組み合わせ判定
   - 強度の視覚的表示（弱・中・強）
   - 改善提案の表示

4. **ユーザー状態管理**
   - ログイン状態の切り替え
   - ユーザー情報の表示
   - ログアウト機能

## 📝 学習ポイント

### 💡 なぜユーザー認証が重要？
ECサイトでは、個人情報の保護、購入履歴の管理、お気に入り機能などにユーザー認証が必要です。セキュリティと利便性を両立させることが重要です。

### 💡 リアルタイムバリデーションの実装
```javascript
// メールアドレスの形式チェック例
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  if (!email) {
    return { valid: false, message: "メールアドレスを入力してください" };
  }
  
  if (!emailRegex.test(email)) {
    return { valid: false, message: "正しいメールアドレス形式で入力してください" };
  }
  
  return { valid: true, message: "" };
}

// リアルタイム検証の実装
document.getElementById('email').addEventListener('input', function(e) {
  const result = validateEmail(e.target.value);
  showValidationMessage('email', result);
});
```

### 💡 パスワード強度の判定方法
```javascript
function checkPasswordStrength(password) {
  let strength = 0;
  let feedback = [];
  
  if (password.length >= 8) strength++;
  else feedback.push("8文字以上にしてください");
  
  if (/[a-z]/.test(password)) strength++;
  else feedback.push("小文字を含めてください");
  
  if (/[A-Z]/.test(password)) strength++;
  else feedback.push("大文字を含めてください");
  
  if (/[0-9]/.test(password)) strength++;
  else feedback.push("数字を含めてください");
  
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  else feedback.push("記号を含めてください");
  
  return { strength, feedback };
}
```

## 🔍 詳細解説

### Step 1: HTML構造の設計
```html
<div class="auth-container">
  <!-- タブ切り替え -->
  <div class="auth-tabs">
    <button class="tab-btn active" onclick="showTab('register')">新規登録</button>
    <button class="tab-btn" onclick="showTab('login')">ログイン</button>
  </div>
  
  <!-- 登録フォーム -->
  <form id="register-form" class="auth-form">
    <div class="form-group">
      <label for="register-name">氏名</label>
      <input type="text" id="register-name" name="name" required>
      <div class="validation-message"></div>
    </div>
    
    <div class="form-group">
      <label for="register-email">メールアドレス</label>
      <input type="email" id="register-email" name="email" required>
      <div class="validation-message"></div>
    </div>
    
    <div class="form-group">
      <label for="register-password">パスワード</label>
      <input type="password" id="register-password" name="password" required>
      <div class="password-strength">
        <div class="strength-bar"></div>
        <div class="strength-text"></div>
      </div>
      <div class="validation-message"></div>
    </div>
    
    <button type="submit" class="auth-btn" disabled>アカウントを作成</button>
  </form>
</div>
```

### Step 2: バリデーション処理の実装
```javascript
// バリデーションルール
const validationRules = {
  name: {
    required: true,
    minLength: 2,
    pattern: /^[ぁ-んァ-ヶ一-龯a-zA-Z\s]+$/
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    required: true,
    minLength: 8
  }
};

// バリデーション実行
function validateField(fieldName, value) {
  const rules = validationRules[fieldName];
  
  if (rules.required && !value) {
    return { valid: false, message: `${getFieldLabel(fieldName)}を入力してください` };
  }
  
  if (rules.minLength && value.length < rules.minLength) {
    return { valid: false, message: `${rules.minLength}文字以上で入力してください` };
  }
  
  if (rules.pattern && !rules.pattern.test(value)) {
    return { valid: false, message: getPatternErrorMessage(fieldName) };
  }
  
  return { valid: true, message: "" };
}
```

### Step 3: ユーザー状態管理
```javascript
// ユーザー状態の管理
let currentUser = null;
let isLoggedIn = false;

// ログイン処理
function login(email, password, rememberMe = false) {
  // 登録済みユーザーの検索
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    currentUser = user;
    isLoggedIn = true;
    
    // ログイン状態の保存
    if (rememberMe) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('rememberLogin', 'true');
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
    }
    
    updateUserInterface();
    return { success: true, message: "ログインしました" };
  } else {
    return { success: false, message: "メールアドレスまたはパスワードが間違っています" };
  }
}
```

## 🚀 実装のコツ

### 1. セキュリティ対策
- パスワードのハッシュ化（実際の開発では必須）
- XSS対策のための入力値サニタイズ
- CSRF対策の実装

### 2. ユーザビリティ向上
- エラーメッセージの分かりやすさ
- パスワード表示/非表示の切り替え
- フォーム送信時のローディング表示

### 3. アクセシビリティ
- ラベルとフォーム要素の関連付け
- エラー状態のスクリーンリーダー対応
- キーボード操作のサポート

## 🎨 スタイリングのポイント

### フォームデザイン
- 入力フィールドの視覚的フィードバック
- エラー状態の赤色ハイライト
- 成功状態の緑色表示

### パスワード強度表示
- 強度バーのアニメーション
- 色による強度の視覚化（赤→黄→緑）
- 改善提案の表示

### レスポンシブ対応
- モバイルでの使いやすいフォームサイズ
- タッチデバイス対応のボタンサイズ

## ✅ 完成チェックリスト
- [ ] 会員登録フォームが正しく動作する
- [ ] ログインフォームが正しく動作する
- [ ] リアルタイムバリデーションが機能する
- [ ] パスワード強度チェックが表示される
- [ ] エラーメッセージが適切に表示される
- [ ] ユーザー状態が正しく管理される
- [ ] ログイン状態が保持される
- [ ] ログアウト機能が動作する
- [ ] レスポンシブデザインで表示される

## 🔗 次のステップ
このユーザー認証システムをマスターしたら、次は「25-modal-system」でモーダルウィンドウシステムの構築を学びます。商品詳細表示、確認ダイアログ、画像拡大表示などを実装していきます。

---
**💻 セキュリティは実装の基本です。実際の開発では、より堅牢な認証システムの使用を強く推奨します。**