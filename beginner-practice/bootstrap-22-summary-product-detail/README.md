# 🧠 まとめ練習 - EC商品詳細

## 🧩 学ぶタグ/プロパティ
- 2カラムレイアウト（`.row` + `.col-*`）
- 画像のレスポンシブ（`.img-fluid`）
- 価格強調（`.text-primary` / `.h4`）
- バッジ（カテゴリ表示）

## 🔁 前回の復習
- カード/タイポグラフィ/ユーティリティの組合せ

## 📌 重要なポイント
- 画像と詳細を左右に配置（`lg`で並列）
- CTAボタンを分かりやすく

## 🧪 例題
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
<div class="container">
  <div class="row g-4">
    <div class="col-12 col-lg-6"><img class="img-fluid" src="https://picsum.photos/800/500"></div>
    <div class="col-12 col-lg-6">
      <h1 class="h3">高性能スピーカー</h1>
      <p class="price h4 text-primary">¥12,800</p>
      <span class="badge bg-info text-dark">オーディオ</span>
      <button class="btn btn-primary btn-lg mt-3">カートに追加</button>
    </div>
  </div>
</div>
```

## ✨ 新しく追加された部分
- 商品説明とCTAをまとめた詳細レイアウト

## 🔍 コードの説明
- `.img-fluid` で画像が列幅に合わせて縮む

## 📖 豆知識
- `rounded` で角丸にすると印象が柔らかくなる

## ⚠️ 注意点
- テキスト量が多い場合は `.mt-*` で余白調整

## 🛒 ECサイト制作で繋がるポイント
- 一覧→詳細→カートの動線設計の基礎
