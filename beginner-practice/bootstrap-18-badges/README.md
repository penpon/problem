# 📘 バッジ（在庫・送料無料）

## 🧩 学ぶタグ/プロパティ
- **.badge**
- 色: **bg-success**、**bg-info** + `text-dark`

## 🔁 前回の復習
- コンポーネントの基本（ボタン/カードなど）

## 📌 重要なポイント
- テキストの補助情報を視覚的に表示

## 🧪 例題
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>バッジ</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container my-3">
    <div>商品A
      <span class="badge bg-success">在庫あり</span>
      <span class="badge bg-info text-dark">送料無料</span>
    </div>
  </div>
</body>
</html>
```

## ✨ 新しく追加された部分
- バッジの配色と可読性

## 🔍 コードの説明
- `.badge` はインライン要素としてテキストに付随

## 📖 豆知識
- 数量表示など `.badge` はナビやボタンにも添えやすい

## ⚠️ 注意点
- 淡色系は `text-dark` で可読性を確保

## 🛒 ECサイト制作で繋がるポイント
- 在庫/セール/新着などのステータス表示に最適
