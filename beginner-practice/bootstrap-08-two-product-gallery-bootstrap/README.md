# 📘 ナビバー最小（ブランド＋リンク）

## 🧩 学ぶタグ/プロパティ
- **.navbar .navbar-light .bg-light**
- **.container-fluid**
- **.navbar-brand / .nav-link**

## 🔁 前回の復習
- コンテナとテキスト/ボタン/フォームの基本

## 📌 重要なポイント
- `.navbar.navbar-light.bg-light` を使い、ブランドとリンク1〜2個を配置
- コンテナは `.container-fluid` を使用

## 🧪 例題
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>最小ナビバー</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">MyShop</a>
      <div>
        <a class="nav-link d-inline-block" href="#">Home</a>
        <a class="nav-link d-inline-block" href="#">About</a>
      </div>
    </div>
  </nav>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- `.navbar` と `.container-fluid` によるヘッダー

## 🔍 コードの説明
- `.navbar-light.bg-light` で明るい背景のナビバーを作成
- `.navbar-brand` は左側のサイト名/ロゴ

## 📖 豆知識
- `.navbar-nav` と `.nav-item` を使うのが正式構造だが、最小例では `.nav-link` を並べるだけでも表示可能

## ⚠️ 注意点
- 余白や配置を増やす場合は `.navbar-expand` や `.ms-auto` 等のクラスを追加検討

## 🛒 ECサイト制作で繋がるポイント
- 共通ヘッダーの土台。ブランド表示と主要リンクの配置を学ぶ
