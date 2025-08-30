# 📘 商品一覧グリッド（sm:1列 / md:2列）

## 🧩 学ぶタグ/プロパティ
- **.row.g-3**（アイテム間の余白）
- **.col-12 .col-md-6**（ブレークポイントで1→2列）

## 🔁 前回の復習
- コンテナと基本グリッドの作り方

## 📌 重要なポイント
- `.row.g-3` を作り、`.col-12.col-md-6` のアイテムを4つ
- 各アイテムはテキストのみ（カード不要）

## 🧪 例題
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>商品一覧グリッド</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container my-4">
    <div class="row g-3">
      <div class="col-12 col-md-6"><div class="border p-3">商品1</div></div>
      <div class="col-12 col-md-6"><div class="border p-3">商品2</div></div>
      <div class="col-12 col-md-6"><div class="border p-3">商品3</div></div>
      <div class="col-12 col-md-6"><div class="border p-3">商品4</div></div>
    </div>
  </div>
</body>
</html>
```

## ✨ 新しく追加された部分
- シンプルなグリッドでの一覧表現

## 🔍 コードの説明
- `g-3` は縦横の隙間を一括で設定
- `col-12`（スマホ1列）→ `col-md-6`（md以上2列）

## 📖 豆知識
- 余白強調には `.p-3`、境界の視認性には `.border`

## ⚠️ 注意点
- `.row` 直下は `.col-*` を必ず挟む

## 🛒 ECサイト制作で繋がるポイント
- 商品タイルの最小レイアウト。のちにカード化や画像追加へ拡張
