# EC-練習: EC商品カード（価格・カテゴリ）最小

## 🧩 学ぶタグ/プロパティ
- **カード**: `.card .card-img-top .card-body .card-title`
- **価格強調**: `.price`
- **カテゴリ**: `.badge`

## 🔁 前回の復習
- 画像のレスポンシブとカードの基本

## 📌 重要なポイント
- 情報階層: 商品名 > 価格 > 補足（カテゴリ）

## 🧪 例題
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC Product Card</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>.price{color:#0d6efd;font-weight:700;}</style>
</head>
<body>
  <div class="container py-4">
    <div class="card" style="max-width: 420px;">
      <img src="https://picsum.photos/seed/p1/600/400" class="card-img-top" alt="商品">
      <div class="card-body">
        <h5 class="card-title mb-1">ベーシックTシャツ</h5>
        <div class="price mb-2">¥2,980</div>
        <span class="badge bg-secondary">服</span>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- 価格強調とカテゴリ表示

## 🔍 コードの説明
- `.price` は色＋太字、`.badge` はラベル表示

## 📖 豆知識
- 金額は `toLocaleString()` で3桁区切り表記にできる（JS拡張時）

## ⚠️ 注意点
- 画像には必ず `alt` を設定

## 🛒 ECサイト制作で繋がるポイント
- EC-03/20 の実用カードに直結
