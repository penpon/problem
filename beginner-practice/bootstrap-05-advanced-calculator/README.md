# 📘 画像のレスポンシブ（.img-fluid）

## 🧩 学ぶタグ/プロパティ
- **img.img-fluid**（親幅に応じて自動で縮小）
- **.container**

## 🔁 前回の復習
- コンテナと基本的なテキスト配置

## 📌 重要なポイント
- 画像に `.img-fluid` を付けるだけでレスポンシブ対応
- 固定幅のスタイル指定は行わない

## 🧪 例題
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>レスポンシブ画像</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container my-3">
    <img class="img-fluid" src="https://picsum.photos/seed/responsive/1200/600" alt="サンプル画像">
  </div>
</body>
</html>
```

## ✨ 新しく追加された部分
- `.img-fluid` による画像の自動縮小

## 🔍 コードの説明
- 画像は親要素の幅に合わせて縮小（拡大はしない）

## 📖 豆知識
- `.img-thumbnail` で枠・角丸を付けることもできる

## ⚠️ 注意点
- HTML側やCSSで固定幅を設定すると `.img-fluid` の効果が損なわれる

## 🛒 ECサイト制作で繋がるポイント
- 商品画像のスマホ最適化に必須
