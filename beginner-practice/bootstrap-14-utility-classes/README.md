# 📘 ユーティリティ（余白・背景・テキスト整形）

## 🧩 学ぶタグ/プロパティ
- 余白: **mb-3 / p-3**
- 背景: **bg-light**
- 角丸: **rounded**
- 枠線: **border**
- テキスト整形: **text-center**

## 🔁 前回の復習
- `.container .row .col-12` の基本構造

## 📌 重要なポイント
- ユーティリティクラスでレイアウト調整を素早く実現
- カスタムCSSなしでも整った見た目に

## 🧪 例題
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ユーティリティ</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container my-3">
    <h1 class="text-center mb-3">タイトル</h1>
    <div class="row">
      <div class="col-12">
        <div class="bg-light p-3 rounded border">ボックス</div>
      </div>
    </div>
  </div>
</body>
</html>
```

## ✨ 新しく追加された部分
- 背景色・余白・角丸・枠線のユーティリティ適用

## 🔍 コードの説明
- `.bg-light` で淡い背景、`.p-3` で内側余白、`.rounded` で角丸、`.border` で枠

## 📖 豆知識
- ユーティリティは組み合わせて使うのが基本。命名は直感的

## ⚠️ 注意点
- 重ねすぎるとクラスが冗長に。共通化が必要なら CSS も検討

## 🛒 ECサイト制作で繋がるポイント
- 商品説明ボックスや通知領域のスタイリングで頻出
