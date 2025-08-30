# 改訂版ヒント（10 センタリング）

## 🧩 今回学ぶテクニック
- 横中央：`margin: 0 auto` / `text-align: center`
- 縦横中央：`flex` + `justify-content` + `align-items`

## 🔁 前回の復習
- 枠線と角丸で**要素のまとまり**を演出

## 📌 重要なポイント
- **テキスト**は`text-align`、**ブロック要素**は`margin: 0 auto`
- 完全中央は**Flex**の`center`が最短

## 🧪 例題
別テーマ：「センター揃えのカード」。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>センタリング</title>
    <style>
      .center { display: flex; justify-content: center; align-items: center; min-height: 60vh; }
      .card { width: 320px; padding: 16px; background: #f1f3f5; border-radius: 8px; }
    </style>
  </head>
  <body class="center">
    <div class="card">中央に配置されたカード</div>
  </body>
</html>
```

## ✨ 新しく追加された部分
- `display: flex` と**中央寄せ**の基本

## 🔍 コードの説明
- コンテナに`min-height`を設定して**縦方向の余白**を確保

## 📖 豆知識
- インライン要素の中央は**行ボックス**の概念が関与
- 画像の上下ズレは**ベースライン**が原因のことが多い

## ⚠️ 注意点
- 固定高さでの中央寄せは**レスポンシブ崩れ**に注意

## 🛒 ECサイト制作で繋がるポイント
- ダイアログや空状態の**視線誘導**として中央配置を活用