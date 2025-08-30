# カードテンプレ（配列→カード生成）

## 🧩 学ぶポイント
- 配列データから DOM 要素（カード）を生成
- textContent による安全な文字挿入
- aria-live での動的領域更新

## 🔁 前提/復習
- これまでの DOM 生成・ループ処理

## 📌 要件
- 生成ボタン（#generateBtn）クリックで、配列 `products` の各要素をカード化
- 各カードはタイトル（.card-title）と価格（.card-price）を表示
- 完了後、#statusText を「生成済み」に更新

## 🧪 ヒント
- `document.createElement` / `appendChild`
- `toLocaleString()` で価格整形

## ✨ 追加仕様（任意）
- 件数表示や並び替え（本課題では不要）

## ⚠️ 注意
- innerHTML の直接連結は避け、textContent を使う

## 🛒 ECでの繋がり
- 商品一覧カードの最小構成・基礎テンプレ化
