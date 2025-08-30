# html-css-10.3 floatで二列レイアウト

## 🧩 学ぶタグ/プロパティ
- float / overflow: auto / margin-left

## 🔁 前回の復習
- float による段組みの基本

## 📌 重要なポイント
- clearfix の代替として親に `overflow: auto` を指定

## 🧪 例題
HTML:
```html
<link rel="stylesheet" href="style.css">
<div class="container">
  <h1>floatで二列レイアウト</h1>
  <div class="two-column">
    <div class="sidebar">サイドバー</div>
    <div class="content">メインコンテンツ。本文が入ります。</div>
  </div>
</div>
```
CSS:
```css
.two-column { overflow: auto; }
.sidebar { width:200px; float:left; }
.content { margin-left:220px; }
```

## ✨ 新しく追加された部分
- 親要素の高さを保つための `overflow: auto`

## 🔍 コードの説明
- `margin-left` はサイドバー幅(200px) + 余白(20px) 相当を確保

## 📖 豆知識
- 近年はFlex/Gridが主流だが既存コードでfloatは残る

## ⚠️ 注意点
- 文字の回り込みが不要な箇所での使用は控える

## 🛒 ECサイト制作で繋がるポイント
- サイドナビ + コンテンツ領域の基本構成
