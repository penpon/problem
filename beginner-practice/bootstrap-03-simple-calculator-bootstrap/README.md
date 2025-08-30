# 📘 スペーシングとグリッド（ユーティリティ）

## 🧩 学ぶタグ/プロパティ
- **.row.gy-3**（縦方向のギャップ）
- **col-12 / col-md-6**（レスポンシブ列）

## 🔁 前回の復習
- `.container` と基本グリッド構造

## 📌 重要なポイント
- `.row.gy-3` で縦方向の余白を確保
- 2つのブロックを `col-12 col-md-6` で並べる（md以上で2列）

## 🧪 例題
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>スペーシング</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container my-3">
    <div class="row gy-3">
      <div class="col-12 col-md-6"><div class="border p-3">ブロックA</div></div>
      <div class="col-12 col-md-6"><div class="border p-3">ブロックB</div></div>
    </div>
  </div>
</body>
</html>
```

## ✨ 新しく追加された部分
- `gy-*` による行間の余白

## 🔍 コードの説明
- `col-12`（1列）→ `col-md-6`（2列）へブレークポイントで切替

## 📖 豆知識
- `g-3` は縦横両方、`gy-3` は縦、`gx-3` は横のみに適用

## ⚠️ 注意点
- `.row` 直下は `.col-*` のみ

## 🛒 ECサイト制作で繋がるポイント
- 商品群や説明ブロックを整えて見せる基本レイアウト
