# 改訂版ヒント（09 枠線の基礎）

## 🧩 今回学ぶプロパティ
- `border`, `border-radius`, `border-color`, `border-style`, `border-width`

## 🔁 前回の復習
- 余白設計（margin/padding/gap）で**レイアウトの間**を整える

## 📌 重要なポイント
- 枠線は**意味づけ**（区切り/強調）に使う
- 角丸 `border-radius` は**柔らかい印象**
- 線の太さ・色・スタイルの**組み合わせ**を理解

## 🧪 例題
別テーマ：「通知ボックスのデザイン」。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>枠線の基礎</title>
    <style>
      .notice { border: 1px solid #1971c2; border-radius: 8px; padding: 12px; }
    </style>
  </head>
  <body>
    <div class="notice">新機能が追加されました。</div>
  </body>
</html>
```

## ✨ 新しく追加された部分
- `border` の**ショートハンド**と `border-radius`

## 🔍 コードの説明
- `1px solid #1971c2` で太さ/種類/色を一括
- `border-radius: 8px` で**角丸**

## 📖 豆知識
- 輪郭線 `outline` はレイアウトに影響しない
- フォーカスリングは**アクセシビリティに重要**（消しすぎ注意）

## ⚠️ 注意点
- 枠線と背景色の**コントラスト**を確保
- 太さの過剰強調は**視線を奪う**

## 🛒 ECサイト制作で繋がるポイント
- カード・バナー・入力欄の**区切り**に活用。柔らかい角は**安心感**