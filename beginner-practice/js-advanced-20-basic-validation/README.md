# 基本バリデーション（名前とメール）

## 🧩 学ぶタグ/プロパティ
- 入力値の正規化：`trim()`
- 正規表現による最小メール形式チェック
- エラー表示のDOM生成：`createElement('li')` + `appendChild`
- 状態表示とクラス操作：`textContent` / `classList.add/remove`

## 🔁 前回の復習
- `textContent` による安全な表示
- クリックイベントと関数分割

## 📌 重要なポイント
- 送信クリックで検証 → エラー一覧（LI）を `#errorList` に描画
- 成功時は `#statusText` を「送信成功」にし `.success` を付与
- エラーがある場合は「エラーあり」にし `.success` を外す
- メール形式は `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` の最小チェック

## 🧪 例題
HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>js-advanced-20 基本バリデーション</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>基本バリデーション（名前とメール）</h1>

    <div class="form">
      <label for="nameInput">名前</label>
      <input id="nameInput" type="text" placeholder="山田太郎" />

      <label for="emailInput">メール</label>
      <input id="emailInput" type="email" placeholder="taro@example.com" />

      <button id="submitBtn" type="button">送信</button>
      <div class="meta">状態: <span id="statusText">未送信</span></div>
    </div>

    <ul id="errorList" class="errors" aria-live="polite"></ul>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

CSS
```css
body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;margin:16px}
.container{max-width:640px;margin:auto}
.form{display:grid;grid-template-columns:1fr;gap:8px;margin:12px 0}
input{padding:8px 10px;border:1px solid #ccc;border-radius:6px}
button{padding:8px 12px;border:1px solid #ccc;border-radius:6px;background:#f8f8f8}
.meta{color:#666}
.errors{margin-top:10px;color:#d00;padding-left:18px}
.errors li{margin:2px 0}
.success{color:#0a7}
```

JavaScript
```js
const $name = document.getElementById('nameInput');
const $email = document.getElementById('emailInput');
const $submit = document.getElementById('submitBtn');
const $status = document.getElementById('statusText');
const $errors = document.getElementById('errorList');

function validate(){
  const errs = [];
  const name = ($name.value || '').trim();
  const email = ($email.value || '').trim();

  if (name.length === 0) errs.push('名前を入力してください');
  const MAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 最小限の形式チェック
  if (!MAIL_RE.test(email)) errs.push('メールアドレスの形式が正しくありません');

  return errs;
}

function renderErrors(errs){
  $errors.innerHTML = '';
  for (const msg of errs){
    const li = document.createElement('li');
    li.textContent = msg; // 安全に表示
    $errors.appendChild(li);
  }
}

$submit.addEventListener('click', () => {
  const errs = validate();
  renderErrors(errs);
  if (errs.length === 0){
    $status.textContent = '送信成功';
    $status.classList.add('success');
  } else {
    $status.textContent = 'エラーあり';
    $status.classList.remove('success');
  }
});
```

## ✨ 新しく追加された部分
- `validate()` による検証ロジックと `renderErrors()` の分離
- 成否に応じた状態テキストとクラス操作

## 🔍 コードの説明
- 名前は `trim()` 後の非空を判定
- メールは正規表現で最小限の形式チェックを実施
- すべてのエラーを UL の LI として列挙

## 📖 豆知識
- 実運用ではより厳密なメール検証やバックエンド側の再検証が必要
- 送信中の状態（ローディング）や成功時のリセット等も拡張可能

## ⚠️ 注意点
- ユーザー入力は常に `textContent` で表示（XSS防止）
- 正規表現は最小チェックであり、完全な保証ではない

## 🛒 ECサイト制作で繋がるポイント
- 会員登録・問い合わせフォームの最小バリデーション
- 入力エラーの即時フィードバックと状態管理の基本
