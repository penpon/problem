# 📘 ミニ統合（ヘッダー/グリッド/フッター）

## 🧩 学ぶタグ/プロパティ
- ヘッダー: **.navbar .navbar-light .bg-light / .container-fluid / .navbar-brand**
- グリッド: **.row.g-3 / .col-12 .col-md-6**
- フッター: **footer.text-center.py-3**

## 🔁 前回の復習
- ナビバー最小、商品グリッド、テキストユーティリティの基礎

## 📌 重要なポイント
- ヘッダー/商品グリッド/フッターを1ページに統合
- 必要最小のクラスでシンプルに構成

## 🧪 例題
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ミニ統合</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <!-- ヘッダー -->
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">MyShop</a>
    </div>
  </nav>

  <!-- 商品グリッド -->
  <main class="container my-4">
    <div class="row g-3">
      <div class="col-12 col-md-6"><div class="border p-3">商品A</div></div>
      <div class="col-12 col-md-6"><div class="border p-3">商品B</div></div>
      <div class="col-12 col-md-6"><div class="border p-3">商品C</div></div>
      <div class="col-12 col-md-6"><div class="border p-3">商品D</div></div>
    </div>
  </main>

  <!-- フッター -->
  <footer class="text-center py-3">
    <small>&copy; 2025 MyShop</small>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- ヘッダー〜フッターの最小統合フロー

## 🔍 コードの説明
- ヘッダーは `.navbar-light.bg-light` と `.container-fluid`
- グリッドは `.row.g-3` と `.col-12.col-md-6` の4要素
- フッターは中央寄せ `.text-center` と上下余白 `.py-3`

## 📖 豆知識
- 主要領域は `<main>` を使うとセマンティクス的に明確

## ⚠️ 注意点
- 余白はページ全体で過不足がないかチェック

## 🛒 ECサイト制作で繋がるポイント
- EC最小ページの骨格。以降でカード化や検索/ソート等の機能を追加
