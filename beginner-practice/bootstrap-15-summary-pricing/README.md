# 🧠 まとめ練習 - 価格表

## 🧩 学ぶタグ/プロパティ
- カード3カラム
- 枠線・背景色・テキスト色のユーティリティ
- 主/副ボタンの使い分け

## 🔁 前回の復習
- `.border-*` `.bg-*` `.text-*` の組合せ

## 📌 重要なポイント
- 中央寄せ＋見出し
- 中央のプランを強調（`bg-primary text-white`）

## 🧪 例題
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
<div class="row g-4">
  <div class="col-12 col-md-4">
    <div class="card h-100 text-center border-primary">
      <div class="card-header bg-primary text-white">Popular</div>
      <div class="card-body">
        <h5 class="card-title">¥980/月</h5>
        <button class="btn btn-primary">選択</button>
      </div>
    </div>
  </div>
</div>
```

## ✨ 新しく追加された部分
- 価格表の3カード構成

## 🔍 コードの説明
- `.text-center` と `.h-100` で見映えを整える

## 📖 豆知識
- ボタンの役割は色で伝わる：主（filled）/副（outline）

## ⚠️ 注意点
- 行間の確保に `.g-4` を活用

## 🛒 ECサイト制作で繋がるポイント
- サブスク/サービス型の価格提示の基本形
