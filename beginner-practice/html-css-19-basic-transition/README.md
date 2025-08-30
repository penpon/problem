# 改訂版ヒント（19 トランジションの基礎）

## 🧩 今回学ぶプロパティ
- `transition-property`, `transition-duration`, `transition-timing-function`

## 🔁 前回の復習
- カードの構造化（見出し/画像/本文/フッター）

## 📌 重要なポイント
- 変化するプロパティだけを**明示**する
- イージングで**動きの印象**が変わる（`ease`, `ease-in-out` など）

## 🧪 例題
別テーマ：「ボタンのホバー効果」。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>トランジションの基礎</title>
    <style>
      .btn { padding: 10px 14px; background: #1971c2; color: #fff; border-radius: 6px; transition: background-color .25s ease, transform .15s ease; }
      .btn:hover { background: #1c7ed6; }
      .btn:active { transform: translateY(1px); }
    </style>
  </head>
  <body>
    <button class="btn">購入する</button>
  </body>
</html>
```

## ✨ 新しく追加された部分
- 複数プロパティの**個別時間/イージング**指定

## 🔍 コードの説明
- `:active` で押下感を**微小移動**で表現

## 📖 豆知識
- `cubic-bezier()` で**細かな動き**を設計

## ⚠️ 注意点
- すべてにトランジションをかけると**重く/もっさり**感じる

## 🛒 ECサイト制作で繋がるポイント
- ボタンやナビの**手触り**を改善し、操作性向上