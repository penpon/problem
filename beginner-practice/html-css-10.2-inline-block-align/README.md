# html-css-10.2 inline-blockの整列

## 🧩 学ぶタグ/プロパティ
- display: inline-block / vertical-align / 余白対策(font-size:0)

## 🔁 前回の復習
- `display` の種類と横並びの作り方

## 📌 重要なポイント
- inline-block は隣接テキストの影響で隙間ができる
- コンテナ側 `font-size: 0` で制御可能

## 🧪 例題
HTML:
```html
<link rel="stylesheet" href="style.css">
<div class="container">
  <h1>inline-blockの整列</h1>
  <div class="inline-list">
    <div class="item">1</div>
    <div class="item">2<br>高い要素</div>
    <div class="item">3</div>
  </div>
</div>
```
CSS:
```css
.inline-list { font-size: 0; }
.item { display: inline-block; width: 120px; height: 80px; vertical-align: top; }
.item + .item { margin-left: 10px; }
```

## ✨ 新しく追加された部分
- inline-block の隙間を `font-size:0` で消すテクニック

## 🔍 コードの説明
- `.item + .item` で2個目以降に左余白を付与

## 📖 豆知識
- 画像やアイコンも inline 要素。`vertical-align` の影響を受ける

## ⚠️ 注意点
- コンテナ `font-size:0` のまま子に文字を書くと消えるので、子でサイズを復帰

## 🛒 ECサイト制作で繋がるポイント
- バッジや小型カードの整列で利用
