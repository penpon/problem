# 📘 カード3枚（画像・タイトル・テキスト）

## 🧩 学ぶタグ/プロパティ
- **.card / .card-img-top / .card-body / .card-title / .card-text**
- **.row.g-3** とレスポンシブ列: `col-12 col-sm-6 col-lg-4`
- 画像プレースホルダ: `https://picsum.photos/seed/{id}/300/200`

## 🔁 前回の復習
- `.container .row .col-*` によるグリッド配置
- `g-*` による要素間の余白

## 📌 重要なポイント
- 3枚のカードを同一レイアウトで配置
- 画像は `.card-img-top`、本文は `.card-body` 内に見出しとテキスト

## 🧪 例題
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>カード3枚</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container my-3">
    <div class="row g-3">
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card">
          <img class="card-img-top" src="https://picsum.photos/seed/a/300/200" alt="" />
          <div class="card-body"><h5 class="card-title">商品A</h5><p class="card-text">説明A</p></div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card">
          <img class="card-img-top" src="https://picsum.photos/seed/b/300/200" alt="" />
          <div class="card-body"><h5 class="card-title">商品B</h5><p class="card-text">説明B</p></div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card">
          <img class="card-img-top" src="https://picsum.photos/seed/c/300/200" alt="" />
          <div class="card-body"><h5 class="card-title">商品C</h5><p class="card-text">説明C</p></div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

## ✨ 新しく追加された部分
- `.card` コンポーネント構造の導入
- 画像・タイトル・テキストの基本組み合わせ

## 🔍 コードの説明
- `.row.g-3` でカード間に余白
- 各カードは画像→本文の順に構成

## 📖 豆知識
- `.card-img-top` はカード上部に最適化された画像スタイル

## ⚠️ 注意点
- 画像サイズは固定しない（レスポンシブ前提）

## 🛒 ECサイト制作で繋がるポイント
- 商品カードの最小単位。後続で価格・ボタン・バッジ追加へ拡張
