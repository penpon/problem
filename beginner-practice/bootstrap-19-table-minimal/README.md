# 📘 テーブル最小（table / thead / tbody）

## 🧩 学ぶタグ/プロパティ
- **.table**
- 構造: `<table>` `<thead>` `<tbody>` `<tr>` `<th>` `<td>`

## 🔁 前回の復習
- コンテナや余白ユーティリティ

## 📌 重要なポイント
- 最小の表構造を押さえる

## 🧪 例題
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>テーブル最小</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container my-3">
    <table class="table">
      <thead>
        <tr><th>商品</th><th>価格</th></tr>
      </thead>
      <tbody>
        <tr><td>Item A</td><td>100</td></tr>
        <tr><td>Item B</td><td>200</td></tr>
      </tbody>
    </table>
  </div>
</body>
</html>
```

## ✨ 新しく追加された部分
- `.table` による表のスタイル適用

## 🔍 コードの説明
- `thead` にヘッダ、`tbody` にデータ行

## 📖 豆知識
- `.table-striped` や `.table-hover` など拡張も簡単

## ⚠️ 注意点
- 表の可読性のため見出しは `<th>` を使う

## 🛒 ECサイト制作で繋がるポイント
- 注文履歴・比較表などにそのまま活用可能
