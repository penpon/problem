# 📘 応用グリッド（カード + 12/6/4 レイアウト）

## 🧩 学ぶタグ/プロパティ
- **.row.g-3** とレスポンシブ列: `col-12 col-sm-6 col-lg-4`
- **.card / .card-body / .card-title / .card-text**

## 🔁 前回の復習
- 基本のグリッドとカード

## 📌 重要なポイント
- 3枚のカードを 1/2/3 列でレスポンシブ配置

## 🧪 例題
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>応用グリッド</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container my-3">
    <div class="row g-3">
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card"><div class="card-body"><h5 class="card-title">A</h5><p class="card-text">本文A</p></div></div>
      </div>
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card"><div class="card-body"><h5 class="card-title">B</h5><p class="card-text">本文B</p></div></div>
      </div>
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card"><div class="card-body"><h5 class="card-title">C</h5><p class="card-text">本文C</p></div></div>
      </div>
    </div>
  </div>
</body>
</html>
```

## ✨ 新しく追加された部分
- カードとグリッドの複合

## 🔍 コードの説明
- `.row.g-3` でカード間の余白、レスポンシブ列で 1/2/3 列に可変

## 📖 豆知識
- 画像やボタンを加えると商品カードとして完成度が上がる

## ⚠️ 注意点
- 行・列の入れ子関係（`.row` 直下は `.col-*`）を守る

## 🛒 ECサイト制作で繋がるポイント
- 商品一覧の完成形に近い構成
