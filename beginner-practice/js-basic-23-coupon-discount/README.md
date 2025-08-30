# まとめ練習 - クーポン適用で割引計算

## 🧩 **学ぶタグ/プロパティ**
- `<form>` の `submit` と `preventDefault()`
- `trim()` による前後空白除去
- `textContent`・`Number()`・条件分岐

## 🔁 **前回の復習**
- 小計/送料の分離と合算
- メッセージ表示の基本

## 📌 **重要なポイント**
- クーポンの判定結果を状態として保持（割引率や送料無料）
- 反映時は必ず合計を再計算

## 🧪 **例題（コピペで実行可）**

```html
<div>小計: <span id="subtotal">5000</span> 円</div>
<div>送料: <span id="shipping-fee">300</span> 円</div>
<div>合計: <span id="total">5300</span> 円</div>
<form id="coupon-form">
  <label>クーポン: <input id="coupon" type="text" placeholder="EC2025"></label>
  <button type="submit">適用</button>
</form>
<p id="status">未適用</p>
<script>
  const subEl = document.getElementById('subtotal');
  const feeEl = document.getElementById('shipping-fee');
  const totalEl = document.getElementById('total');
  const form = document.getElementById('coupon-form');
  const input = document.getElementById('coupon');
  const statusEl = document.getElementById('status');
  let discount = 0; // 0..1
  function baseTotal(){ return (Number(subEl.textContent)||0) + (Number(feeEl.textContent)||0); }
  function apply(){ totalEl.textContent = String(Math.floor(baseTotal() * (1 - discount))); }
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const code = input.value.trim();
    if (code === 'EC2025') { discount = 0.1; statusEl.textContent = '10%OFFを適用しました'; }
    else if (code === 'FREESHIP') { discount = 0; feeEl.textContent = '0'; statusEl.textContent = '送料を無料にしました'; }
    else if (code.length === 0) { discount = 0; statusEl.textContent = 'コードを入力してください'; }
    else { discount = 0; statusEl.textContent = '無効なクーポンです'; }
    apply();
  });
  apply();
</script>
```

## ✨ **新しく追加された部分**
- `submit` の阻止と入力値の `trim()`
- 判定に応じて割引率や送料を更新

## 🔍 **コードの説明**
- 合計は「小計 + 送料」に割引を適用して算出
- 表示更新は `textContent`、数値化は `Number()`

## 📖 **豆知識**
- パーセント割引は小数（0..1）で管理すると扱いやすい

## ⚠️ **注意点**
- 入力の大小文字や余計な空白に注意（必要があれば正規化）

## 🛒 **ECサイト制作で繋がるポイント**
- クーポン適用は決済体験の重要ポイント。ロジック分離とメッセージ表示が鍵
