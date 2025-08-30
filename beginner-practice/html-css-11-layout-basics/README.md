# 改訂版ヒント（11 レイアウトの基礎）

## 🧩 今回学ぶレイアウト
- 1カラム/2カラム、ヘッダー-メイン-フッターの基本
- `display: block/inline/inline-block`、`flex`

## 🔁 前回の復習
- センタリングの手法（テキスト/要素/Flex）

## 📌 重要なポイント
- レイアウトは**情報の優先順位**を可視化する
- Flexは**並び**と**余白配分**が簡単

## 🧪 例題
別テーマ：「2カラムの基本レイアウト」。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>レイアウトの基礎</title>
    <style>
      .layout { display: flex; gap: 16px; }
      .sidebar { width: 200px; background: #f1f3f5; padding: 12px; }
      .main { flex: 1; background: #fff; padding: 12px; border: 1px solid #dee2e6; }
    </style>
  </head>
  <body>
    <div class="layout">
      <aside class="sidebar">サイドバー</aside>
      <main class="main">メインコンテンツ</main>
    </div>
  </body>
</html>
```

## ✨ 新しく追加された部分
- Flexで**カラム分割**し、`gap`で列間余白

## 🔍 コードの説明
- `flex: 1` で**余白をメインに配分**

## 📖 豆知識
- サイドバー幅は**固定**、メインは**可変**が基本
- 小画面では**縦積み**に切り替える（後続課題で）

## ⚠️ 注意点
- カラム間の**可読性**を確保（余白/コントラスト）

## 🛒 ECサイト制作で繋がるポイント
- 商品一覧ページの**フィルタ＋リスト**構成の基礎