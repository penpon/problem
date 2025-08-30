# 🧩 まとめ練習 - カート合計（数量 + 送料 + クーポン）

## **🧩 学ぶタグ/プロパティ**
- `input[type=number]` / `button` / `select`
- `dataset` / `textContent`
- `Array.prototype.reduce`

## **🔁 前回の復習**
- 数量と小計（js-basic-17）
- 送料と合計（js-basic-22）
- クーポン適用（js-basic-23）

## **📌 重要なポイント**
- 行ごとに数量変化 → 小計を再計算
- 送料・クーポン（SAVE10）を合算して合計を更新
- 金額表示は `toLocaleString()` で整形

## **🧪 例題**
HTML:
```html
<div class="cart-row" data-id="1">
  <div class="price" data-price="1800">¥1,800</div>
  <div class="qty">
    <button class="dec">-</button>
    <input class="qty-input" type="number" value="1" />
    <button class="inc">+</button>
  </div>
  <div class="subtotal">¥1,800</div>
</div>
```
JS:
```js
function recalc(){ /* 小計/送料/合計 を更新 */ }
```

## **✨ 新しく追加された部分**
- 複数行の小計集計と送料・割引を合わせた総合計

## **🔍 コードの説明**
- `dataset.price` から数値を取り出し、`qty` を掛けて小計
- `SAVE10` は小計の10%割引

## **📖 豆知識**
- 送料は固定費用として実装すると単純化できる

## **⚠️ 注意点**
- 入力値は `Number()` 変換し、負数は 0 に丸める

## **🛒 ECサイト制作で繋がるポイント**
- 実際のカート画面の計算ロジックの最小モデル
