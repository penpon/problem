# EC-18: 認証モック（ログイン/ログアウト）

## 🧩 学ぶタグ/プロパティ
- ログインフォーム: `<form>`, `type="password"`
- 擬似セッション: `localStorage` にトークン保存
- 保護領域の表示切替

## 🔁 前回の復習
- 完了画面でのパラメータ表示

## 📌 重要なポイント
- 成否判定はモック（固定ユーザー/パス）でOK
- トークン有無でUI切替（ログイン/ログアウト）

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-18 認証モック</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-4">
    <h1 class="mb-3">ログイン（モック）</h1>

    <div id="loginBox" class="card mb-3">
      <div class="card-body">
        <form id="loginForm" class="row g-2">
          <div class="col-12 col-md-5">
            <input id="user" class="form-control" placeholder="ユーザー名" value="demo" required>
          </div>
          <div class="col-12 col-md-5">
            <input id="pass" type="password" class="form-control" placeholder="パスワード" value="pass" required>
          </div>
          <div class="col-12 col-md-2 d-grid">
            <button class="btn btn-primary" type="submit">ログイン</button>
          </div>
        </form>
        <div id="error" class="text-danger small mt-2 d-none">認証に失敗しました</div>
      </div>
    </div>

    <div id="member" class="card d-none">
      <div class="card-body d-flex justify-content-between align-items-center">
        <div>
          <div class="fw-bold">メンバー専用エリア</div>
          <div class="text-muted small">ここには購入履歴などを表示</div>
        </div>
        <button id="logout" class="btn btn-outline-secondary">ログアウト</button>
      </div>
    </div>
  </div>

  <script>
    const KEY = 'mock_token';
    function isAuthed(){ return !!localStorage.getItem(KEY); }
    function onAuthChange(){
      document.getElementById('loginBox').classList.toggle('d-none', isAuthed());
      document.getElementById('member').classList.toggle('d-none', !isAuthed());
    }

    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('user').value.trim();
      const pass = document.getElementById('pass').value;
      const ok = (user === 'demo' && pass === 'pass');
      document.getElementById('error').classList.toggle('d-none', ok);
      if (!ok) return;
      localStorage.setItem(KEY, 'token-'+Date.now());
      onAuthChange();
    });

    document.getElementById('logout').addEventListener('click', () => {
      localStorage.removeItem(KEY);
      onAuthChange();
    });

    onAuthChange();
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- `localStorage` を用いた擬似的なログイン状態管理

## 🔍 コードの説明
- 成功時にトークンを保存し、UIを切替

## 📖 豆知識
- 実運用ではHTTP-onlyクッキーやOAuth/OIDCを使用（ここでは学習目的のモック）

## ⚠️ 注意点
- 本コードは学習用。実運用の認証・セキュリティ要件は別途実装が必要

## 🛒 ECサイト制作で繋がるポイント
- マイページ/購入履歴への導線を試作する土台
