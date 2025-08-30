# EC-03: 実用カード（価格・バッジ・評価）

## 🧩 学ぶタグ/プロパティ
- **バッジ**: `.badge`, 位置指定 `position-absolute` `top-0 start-0 m-2`
- **価格表示**: 強調レイアウト（太字・色）
- **評価表現**: 文字による星（⭐）とレビュー件数

## 🔁 前回の復習
- `col-12 col-md-4` によるレスポンシブ3列
- `.card` 構造と `.btn` の使い方

## 📌 重要なポイント
- 価格・バッジ・評価の3要素で「ECらしさ」を出す
- 見た目の情報階層（商品名 > 価格 > 補足）を意識

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-03 実用カード</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    .price { color: #0d6efd; font-weight: 700; font-size: 1.25rem; }
    .rating { color: #f39c12; }
  </style>
</head>
<body class="bg-light">
  <div class="container py-4">
    <h1 class="mb-3">💰 価格・バッジ・評価つき商品カード</h1>

    <div class="row g-3">
      <div class="col-12 col-md-4">
        <div class="card h-100">
          <div class="position-relative">
            <img src="https://picsum.photos/seed/p1/600/400" class="card-img-top" alt="商品1">
            <span class="badge bg-danger position-absolute top-0 start-0 m-2">セール</span>
          </div>
          <div class="card-body">
            <h5 class="card-title mb-1">プレミアムマグカップ</h5>
            <div class="price mb-2">¥1,980</div>
            <p class="mb-2 rating">⭐️⭐️⭐️⭐️☆ <span class="text-muted">(123)</span></p>
            <a href="#" class="btn btn-primary">購入する</a>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="card h-100">
          <img src="https://picsum.photos/seed/p2/600/400" class="card-img-top" alt="商品2">
          <div class="card-body">
            <h5 class="card-title mb-1">コットンTシャツ</h5>
            <div class="price mb-2">¥2,980</div>
            <p class="mb-2 rating">⭐️⭐️⭐️☆☆ <span class="text-muted">(58)</span></p>
            <a href="#" class="btn btn-success">購入する</a>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="card h-100">
          <div class="position-relative">
            <img src="https://picsum.photos/seed/p3/600/400" class="card-img-top" alt="商品3">
            <span class="badge bg-warning text-dark position-absolute top-0 start-0 m-2">新着</span>
          </div>
          <div class="card-body">
            <h5 class="card-title mb-1">コンパクトバッグ</h5>
            <div class="price mb-2">¥3,980</div>
            <p class="mb-2 rating">⭐️⭐️⭐️⭐️⭐️ <span class="text-muted">(12)</span></p>
            <a href="#" class="btn btn-warning">購入する</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- バッジ（セール/新着）の重ね表示
- 価格の視覚的強調
- 星と件数で信頼感の表現

## 🔍 コードの説明
- `.position-relative` + `.position-absolute` で画像の左上にバッジ
- `.price` をカスタムCSSで太字・色付け
- 星は文字（UTF-8）でOK。後続回でアイコン化も可能

## 📖 豆知識
- 価格は「桁区切り」「色のコントラスト」で視認性UP
- レビュー件数は少数でも表記があると安心感

## ⚠️ 注意点
- バッジのコントラスト（背景と文字）を確保
- 画像の `alt` で内容を簡潔に説明

## 🛒 ECサイト制作で繋がるポイント
- 見た目の充実で「購入の意思決定」を後押し
- 次回以降で検索や並び替えで商品を探しやすくする
