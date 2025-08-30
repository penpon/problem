# 🧠 まとめ練習 - ランディングページ

## 🧩 学ぶタグ/プロパティ
- ヒーロー（中央寄せ）
- 3カラムの特徴紹介
- タイポグラフィ（`display-*` / `lead`）

## 🔁 前回の復習
- 余白ユーティリティ（`.my-*` `.mt-*`）
- グリッドとテキストセンタリング

## 📌 重要なポイント
- 視線誘導：大きな見出し→特徴→CTA

## 🧪 例題
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
<header class="container my-4 text-center">
  <h1 class="display-6 fw-bold">新作コレクション</h1>
  <p class="lead">季節のおすすめをチェック</p>
  <button class="btn btn-primary btn-lg">今すぐ購入</button>
</header>
```

## ✨ 新しく追加された部分
- ランディングの典型構成を最小で実装

## 🔍 コードの説明
- `.display-6` と `.lead` の使い分け

## 📖 豆知識
- CTAボタンは主ボタン（`btn-primary`）がわかりやすい

## ⚠️ 注意点
- セクション間の余白が詰まらないように `my-*` を活用

## 🛒 ECサイト制作で繋がるポイント
- LPの定型を理解するとトップページ構築が楽になる
