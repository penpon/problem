# 改訂版ヒント（17 Flexbox 応用導入）

## 🧩 今回学ぶポイント
- `flex-wrap`, `align-content`, 複数行レイアウトと均等配置

## 🔁 前回の復習
- Flexの基本プロパティとグルーピング

## 📌 重要なポイント
- 複数行になったときは**`align-content`**で行間配分
- 要素サイズに応じて**折り返し**を許可

## 🧪 例題
別テーマ：「タグの自動折り返し」。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>Flex 応用導入</title>
    <style>
      .tags { display: flex; flex-wrap: wrap; gap: 8px; align-content: flex-start; }
      .tag { padding: 6px 10px; background: #e7f5ff; border-radius: 9999px; }
    </style>
  </head>
  <body>
    <div class="tags">
      <span class="tag">新着</span><span class="tag">セール</span><span class="tag">おすすめ</span><span class="tag">在庫あり</span>
    </div>
  </body>
</html>
```

## ✨ 新しく追加された部分
- `flex-wrap: wrap` と**複数行**の制御

## 🔍 コードの説明
- ピル型タグは`border-radius: 9999px`で**丸み**を最大化

## 📖 豆知識
- 自動折り返しは**レスポンシブ**の基礎

## ⚠️ 注意点
- `align-items` と `align-content` の**役割違い**に注意

## 🛒 ECサイト制作で繋がるポイント
- フィルタタグやカテゴリチップの**自動折返し**配置