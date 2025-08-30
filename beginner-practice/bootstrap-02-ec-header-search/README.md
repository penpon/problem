# EC-練習: ECヘッダー＋検索バー（最小）

## 🧩 学ぶタグ/プロパティ
- **Bootstrap CDN(@latest)**
- **ナビバー**: `.navbar .bg-light .container-fluid .navbar-brand`
- **フォーム**: `input.form-control`（placeholder）

## 🔁 前回の復習
- `container`/`row`/`col-*` の基本

## 📌 重要なポイント
- ヘッダーは `.navbar`、検索は `.form-control` を用いた最小構成

## 🧪 例題
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC Header + Search</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">MyShop</a>
    </div>
  </nav>
  <div class="container py-3">
    <input id="q" class="form-control" placeholder="検索（商品名）">
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- ヘッダーと検索入力の組合せ（EC-20のUI土台）

## 🔍 コードの説明
- `.navbar` はサイト共通ヘッダー、`#q.form-control` は検索欄

## 📖 豆知識
- `container-fluid` はヘッダー横幅を全幅にしやすい

## ⚠️ 注意点
- CDN `<link>`/`<script>` の抜け漏れに注意

## 🛒 ECサイト制作で繋がるポイント
- EC-11/20 の検索UIへ直結
