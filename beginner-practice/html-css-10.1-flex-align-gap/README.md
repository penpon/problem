# html-css-10.1 Flex配置とgap

## 🧩 学ぶタグ/プロパティ
- display: flex / justify-content / align-items / gap

## 🔁 前回の復習
- `display` の違い（block/inline/inline-block/flex）

## 📌 重要なポイント
- Flexは親要素に指定する
- 並び方向や整列は親で制御、サイズは子で制御

## 🧪 例題
HTML:
```html
<link rel="stylesheet" href="style.css">
<div class="container">
  <h1>Flex配置とgap</h1>
  <div class="flex-row">
    <div class="box">A</div>
    <div class="box">B</div>
    <div class="box">C</div>
  </div>
</div>
```
CSS:
```css
.flex-row { display: flex; gap: 16px; justify-content: center; align-items: center; }
.box { width: 120px; height: 80px; background: #e3f2fd; border: 1px solid #90caf9; border-radius: 8px; display:flex; align-items:center; justify-content:center; }
```

## ✨ 新しく追加された部分
- `gap` で要素間のすき間を一括管理

## 🔍 コードの説明
- `justify-content` 横方向の整列、`align-items` 縦方向の整列

## 📖 豆知識
- `gap` は Flex と Grid の両方で使える

## ⚠️ 注意点
- 子要素側に `margin` でもすき間は作れるが、`gap` の方が簡潔

## 🛒 ECサイト制作で繋がるポイント
- 商品カードの横並びやボタン群の整列に必須
