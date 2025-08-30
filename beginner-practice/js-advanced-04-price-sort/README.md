# 価格ソート（昇順/降順）

## 🧩 学ぶポイント
- select 変更イベント
- Array.prototype.sort と比較関数
- 不変操作のための slice()

## 🔁 前回の復習
- DOM 取得とイベント設定
- textContent での安全な表示

## 📌 重要なポイント
- sort は破壊的操作のため、元配列を守るには slice() でコピー
- 比較関数: 昇順 a.price - b.price / 降順 b.price - a.price

## 🧪 例題（HTML/CSS/JS）
- beginner-practice ディレクトリ内のテンプレートを参照

## ✨ 新しく追加された部分
- 並び順 select に応じてリストを並べ替え

## 🔍 コードの説明
- sortProducts(order) でコピー配列に対して sort を実施
- render() でカードDOMを再生成

## 📖 豆知識
- Intl.NumberFormat で通貨表記を統一可能

## ⚠️ 注意点
- innerHTML 直書きを避け、textContent で反映

## 🛒 ECサイト制作で繋がるポイント
- EC-13（ソート機能）の基礎実装
