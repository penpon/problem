# まとめ練習 - 小計＋配送オプションで合計更新

## 🧩 **学ぶタグ/プロパティ**
- `<input type="number">` / `<input type="radio">`
- `addEventListener('input' | 'change')`
- 共通関数 `update()` による再計算
- `textContent`、`Number()`

## 🔁 **前回の復習**
- 数量入力とボタン操作の連携
- 表示の分離（小計/送料/合計）

## 📌 **重要なポイント**
- 「小計」「送料」「合計」を独立して算出し、`update()` で一括反映
- ラジオ選択の状態を見て送料を切替

## 🧪 **例題（コピペで実行可）**

```html
<div>単価: <span id="unit-price">1500</span> 円</div>
<label>数量: <input id="qty-input" type="number" value="2" min="0"></label>
<div>小計: <span id="subtotal">3000</span> 円</div>
<label><input type="radio" name="ship" id="ship-standard" checked> 通常便（送料 300円）</label>
<label><input type="radio" name="ship" id="ship-express"> 速達便（送料 800円）</label>
<div>送料: <span id="shipping-fee">300</span> 円</div>
<div>合計: <span id="total">3300</span> 円</div>
<script>
  const unit = Number(document.getElementById('unit-price').textContent) || 0;
  const qty = document.getElementById('qty-input');
  const subEl = document.getElementById('subtotal');
  const feeEl = document.getElementById('shipping-fee');
  const totalEl = document.getElementById('total');
  const std = document.getElementById('ship-standard');
  const exp = document.getElementById('ship-express');
  function sub(){ return (Number(qty.value)||0) * unit; }
  function fee(){ return exp.checked ? 800 : 300; }
  function update(){
    subEl.textContent = String(sub());
    feeEl.textContent = String(fee());
    totalEl.textContent = String(sub() + fee());
  }
  qty.addEventListener('input', update);
  std.addEventListener('change', update);
  exp.addEventListener('change', update);
  update();
</script>
```

## ✨ **新しく追加された部分**
- 送料の分岐（通常/速達）を含む複合計算
- 初期表示時にも `update()` を実行

## 🔍 **コードの説明**
- 小計関数 `sub()`、送料関数 `fee()`、反映関数 `update()` を分離
- 再計算ポイント（input/change）で常に `update()` を呼ぶ

## 📖 **豆知識**
- ラジオボタンは同じ `name` を共有することで単一選択になる

## ⚠️ **注意点**
- 数量が空や負にならないようにJS側で防御（必要ならクランプを追加）

## 🛒 **ECサイト制作で繋がるポイント**
- 配送方法選択による送料の切替は、ECの合計計算で頻出
