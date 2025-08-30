# 📘 商品カード最小（画像/タイトル/価格/ボタン）

## 🧩 学ぶタグ/プロパティ
- **.card / .card-img-top / .card-body**
- **.btn .btn-primary**

## 🔁 前回の復習
- コンテナと基本的なテキスト/画像配置

## 📌 重要なポイント
- 1つの `.card` に画像・タイトル（h5）・価格・購入ボタン
- 必要最低限の構造だけでOK

## 🧪 例題
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>商品カード最小</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container my-4">
    <div class="card" style="max-width: 360px;">
      <img src="https://picsum.photos/seed/card/800/600" class="card-img-top" alt="商品画像">
      <div class="card-body">
        <h5 class="card-title mb-2">サンプル商品</h5>
        <p class="mb-3">¥1,980</p>
        <button class="btn btn-primary">購入</button>
      </div>
    </div>
  </div>
</body>
</html>
```

## ✨ 新しく追加された部分
- `.card` コンポーネントの最小構造

## 🔍 コードの説明
- `.card-img-top` は画像、`.card-body` に本文要素をまとめる

## 📖 豆知識
- 価格や在庫は `.small` や `.text-muted` と相性が良い

## ⚠️ 注意点
- `.card` の直下に画像→`.card-body` の順が分かりやすい

## 🛒 ECサイト制作で繋がるポイント
- 商品一覧や詳細の基本パターン
