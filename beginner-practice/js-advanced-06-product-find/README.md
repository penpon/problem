# 単一商品詳細表示（find）

## 🧩 学ぶポイント
- Array.prototype.find による単一要素の取得
- 最小のフォーム入力（number）とクリックイベント
- textContent による安全な表示

## 🔁 前回の復習
- filter/includes や sort の配列処理
- イベント駆動での DOM 更新

## 📌 重要なポイント
- 入力値は Number に変換し、妥当性を確認
- find は一致した最初の要素を返し、無い場合は undefined
- 表示は textContent を用いて XSS を回避

## 🧪 例題（HTML/CSS/JS）
- 本ディレクトリのテンプレート（index.html/style.css/script.js）を参照

## ✨ 新しく追加された部分
- ID 入力 → ボタンクリックで 1 件の詳細表示
- 見つかった/見つからないのステータス表示

## 🔍 コードの説明
- findProductById(id): products.find(p => p.id === id) || null
- renderDetail(product): 詳細DOM生成とステータス更新

## 📖 豆知識
- toLocaleString で価格フォーマット
- aria-live=polite で動的更新の読み上げを補助

## ⚠️ 注意点
- 不正な入力（小数/0/負値）は見つからない扱い
- innerHTML 直書きは使わず、要素生成 + textContent で追加

## 🛒 ECサイト制作で繋がるポイント
- 商品詳細画面（PDP）への基礎。検索→詳細遷移の一部ロジックに対応
