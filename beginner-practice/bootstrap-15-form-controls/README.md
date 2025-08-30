# 📘 フォーム最小（form-control + バリデーション）

## 🧩 学ぶタグ/プロパティ
- **.form-control / .form-label / .invalid-feedback**
- **.was-validated**（送信時に付与）
- フォーム属性: `novalidate`、入力属性: `required`、`type="email"`

## 🔁 前回の復習
- コンポーネントの基本クラス（ボタンなど）

## 📌 重要なポイント
- 送信時に `.was-validated` を付ける最小JS
- `required` と `invalid-feedback` の組み合わせ

## 🧪 例題
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>フォーム最小</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
  <script defer>
    document.addEventListener('DOMContentLoaded', () => {
      const form = document.getElementById('form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.classList.add('was-validated');
      });
    });
  </script>
</head>
<body>
  <div class="container my-3">
    <form id="form" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="email" class="form-label">メール</label>
        <input id="email" type="email" class="form-control" required>
        <div class="invalid-feedback">メールを入力してください</div>
      </div>
      <button class="btn btn-primary" type="submit">送信</button>
    </form>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- バリデーション表示の最小パターン

## 🔍 コードの説明
- `novalidate` でブラウザ既定を抑止し、Bootstrapのスタイルで可視化

## 📖 豆知識
- `.was-validated` はフォーム全体に適用され、`.is-invalid` 等を自動表示

## ⚠️ 注意点
- 実務では送信前の個別検証・エラーメッセージの多言語化も考慮

## 🛒 ECサイト制作で繋がるポイント
- 会員登録・チェックアウトのバリデーションの基礎
