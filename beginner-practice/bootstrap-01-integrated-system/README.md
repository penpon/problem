# 📘 Bootstrap導入と2カラムレイアウト

## 🧩 学ぶタグ/プロパティ
- **Bootstrap CDN（CSS/JS）**
- **.container / .row / .col-6**

## 🔁 前回の復習
- HTMLの基本構造とセクション分割

## 📌 重要なポイント
- CSS/JS の両方を **CDN(@latest)** で読み込む
- `.container > .row > .col-6` を2つで2カラム
- 各カラムに商品名と価格の簡単テキスト

## 🧪 例題
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>2カラム</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container my-3">
    <div class="row">
      <div class="col-6">商品A - 1000円</div>
      <div class="col-6">商品B - 2000円</div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- Bootstrapの導入と基本グリッド

## 🔍 コードの説明
- `.row` の直下に `.col-*` を配置し横並びを作る

## 📖 豆知識
- `.container` は中央寄せと左右余白を付与

## ⚠️ 注意点
- `.col-6` をちょうど2つにする（3つ以上だと幅が崩れる）

## 🛒 ECサイト制作で繋がるポイント
- 商品一覧の基本となる2カラムの骨格
