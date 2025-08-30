# 改訂版ヒント（08 余白の基礎）

## 🧩 今回学ぶプロパティ
- `margin`, `padding`, `gap`（フレックス/グリッド）

## 🔁 前回の復習
- フォントサイズと行間で**テキストの読みやすさ**を調整

## 📌 重要なポイント
- **外側=margin / 内側=padding**
- 余白は**リズム（8px/4pxスケール等）**で統一
- 兄弟要素間には**`gap`**が便利（Flex/Grid）

## 🧪 例題
別テーマ：「お知らせボックスの余白調整」。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>余白の基礎</title>
    <style>
      .card { padding: 16px; margin: 16px 0; background: #f8f9fa; }
      .stack { display: flex; flex-direction: column; gap: 8px; }
    </style>
  </head>
  <body>
    <div class="card stack">
      <h2>メンテナンスのお知らせ</h2>
      <p>本日23時より一部機能がご利用できません。</p>
    </div>
  </body>
</html>
```

## ✨ 新しく追加された部分
- `gap` による**縦方向の間隔**管理

## 🔍 コードの説明
- `margin: 16px 0` は上下のみ余白
- `padding: 16px` は内側余白で読みやすさUP

## 📖 豆知識
- 8の倍数スケール（8/16/24/32…）で**統一感**
- `gap` は**コンテナ側**の責務で隙間を作る

## ⚠️ 注意点
- 余白の重複（親子に同値padding等）に注意
- マージンの折り畳み（margin-collapsing）を理解

## 🛒 ECサイト制作で繋がるポイント
- 商品リスト・カード・フォームの**上下間隔**を一定に保ち**可読性向上**