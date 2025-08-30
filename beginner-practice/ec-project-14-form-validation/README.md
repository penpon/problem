# EC-14: フォーム入力チェック（Bootstrap + ネイティブ）

## 🧩 学ぶタグ/プロパティ
- ネイティブ検証: `required`, `type`, `pattern`
- Bootstrapの検証UI: `.is-invalid`, `.invalid-feedback`
- 送信抑止: `addEventListener('submit', e.preventDefault())`

## 🔁 前回の復習
- 配列描画・検索/絞込/並び替え・在庫表示などの土台

## 📌 重要なポイント
- ブラウザの検証を活かしつつ、見た目をBootstrapで補強
- エラーは視覚的に明確にする

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-14 入力チェック</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-4">
    <h1 class="mb-3">お届け先情報の入力</h1>

    <form id="checkoutForm" novalidate class="needs-validation">
      <div class="mb-3">
        <label class="form-label">お名前</label>
        <input id="name" class="form-control" required>
        <div class="invalid-feedback">お名前は必須です。</div>
      </div>
      <div class="mb-3">
        <label class="form-label">メールアドレス</label>
        <input id="email" type="email" class="form-control" required>
        <div class="invalid-feedback">正しいメールアドレスを入力してください。</div>
      </div>
      <div class="mb-3">
        <label class="form-label">郵便番号（例: 123-4567）</label>
        <input id="zip" class="form-control" pattern="^\d{3}-\d{4}$" required>
        <div class="invalid-feedback">郵便番号は 123-4567 の形式で入力してください。</div>
      </div>
      <button class="btn btn-primary" type="submit">確認へ進む</button>
    </form>

    <div id="ok" class="alert alert-success mt-3 d-none">入力OKです！</div>
  </div>

  <script>
    const form = document.getElementById('checkoutForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        // Bootstrap風にエラー表示
        [...form.elements].forEach(el => {
          if (el.tagName === 'INPUT') el.classList.toggle('is-invalid', !el.checkValidity());
        });
        return;
      }
      document.getElementById('ok').classList.remove('d-none');
    });

    form.addEventListener('input', (e) => {
      const el = e.target;
      if (el.tagName === 'INPUT') el.classList.toggle('is-invalid', !el.checkValidity());
    });
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- ネイティブ検証API + Bootstrapクラス連携

## 🔍 コードの説明
- `checkValidity()` で妥当性評価 → `is-invalid` の付け外し

## 📖 豆知識
- `novalidate` を付けるとブラウザのデフォルトUIを抑制し、独自表示にできる

## ⚠️ 注意点
- フィードバック要素 `.invalid-feedback` は入力直後では非表示（`.is-invalid`付与で表示）

## 🛒 ECサイト制作で繋がるポイント
- チェックアウトフォームの基礎バリデーションが構築できる
