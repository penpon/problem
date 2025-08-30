# 📘 フォーム最小（検索）

## 🧩 学ぶタグ/プロパティ
- **.row / .col-***（レイアウト）
- 入力: **.form-control**
- ボタン: **.btn / .btn-primary / .w-100**

## 🔁 前回の復習
- コンテナとグリッドの基本

## 📌 重要なポイント
- 1行に入力欄＋検索ボタン
- `col-md-8` に入力、`col-md-4` にボタン
- ボタンは `.w-100` で横幅いっぱい

## 🧪 例題
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>検索フォーム最小</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container my-4">
    <div class="row g-2">
      <div class="col-12 col-md-8">
        <input type="text" class="form-control" placeholder="キーワードを入力" aria-label="検索キーワード">
      </div>
      <div class="col-12 col-md-4">
        <button class="btn btn-primary w-100">検索</button>
      </div>
    </div>
  </div>
</body>
</html>
```

## ✨ 新しく追加された部分
- `.form-control` による統一された入力UI
- `.w-100` でボタン幅を100%

## 🔍 コードの説明
- `col-12` でモバイル1列、`col-md-*` でmd以上2列

## 📖 豆知識
- アクセシビリティ向上のため `placeholder` と `aria-label` を付与

## ⚠️ 注意点
- 入力とボタンは `.row` 直下の `.col-*` に入れる

## 🛒 ECサイト制作で繋がるポイント
- 商品検索やキーワード絞り込みの基本UI
