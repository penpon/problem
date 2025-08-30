# 📘 CDN + グリッド基礎（12/6/4）

## 🧩 学ぶタグ/プロパティ
- **Bootstrap CDN**（CSS/JSの読み込み）
- **.container / .row / .col-***（グリッドシステム）
- **レスポンシブ列**: `col-12` `col-sm-6` `col-lg-4`
- **間隔ユーティリティ**: `g-3`

## 🔁 前回の復習
- `.container` と `.row` の基本構造
- 列 `.col-*` を使った横並び配置

## 📌 重要なポイント
- CSS/JS ともに **CDN(@latest)** を読み込む（JSはモーダル等の準備のため）
- `.row.g-3` で列ブロック間に縦横の余白を付与
- 各カード（列）は `col-12 col-sm-6 col-lg-4` を指定し、幅に応じて 1/2/3 列に変化

## 🧪 例題
以下をコピペして動作確認できます（CDN読み込み済み）。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Bootstrap Grid</title>
  <!-- Bootstrap CSS CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container my-3">
    <h1 class="my-3">グリッド</h1>
    <div class="row g-3">
      <div class="col-12 col-sm-6 col-lg-4"><div class="border p-3">A</div></div>
      <div class="col-12 col-sm-6 col-lg-4"><div class="border p-3">B</div></div>
      <div class="col-12 col-sm-6 col-lg-4"><div class="border p-3">C</div></div>
    </div>
  </div>
  <!-- Bootstrap JS Bundle CDN -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- `g-3` によるブロック間の余白設定
- `col-12 col-sm-6 col-lg-4` の組み合わせでのレスポンシブ制御

## 🔍 コードの説明
- `link rel="stylesheet"` で CSS を読み込み、`script` で JS（Popper 同梱）を読み込み
- `.row.g-3` の子要素に列 `.col-*` を3つ配置
- 画面幅により 12/6/4 のカラム幅に自動調整

## 📖 豆知識
- Bootstrap 5 は **モバイルファースト**。`col-12` は最小幅で全幅、`sm` 以上で分割、`lg` 以上で3分割の指定
- `g-*` は縦横のギャップを同時に設定できる便利クラス

## ⚠️ 注意点
- CSS/JS の **CDN読み込み忘れ**に注意（とくに JS は今後のモーダル等で必要）
- `.row` 直下の子は必ず `.col-*` を使う

## 🛒 ECサイト制作で繋がるポイント
- 商品一覧カードの基本グリッド。幅に応じた **1/2/3列レイアウト** は実務で頻出
- 後続のカード/UI課題と組み合わせて、ギャラリーを素早く構築可能
