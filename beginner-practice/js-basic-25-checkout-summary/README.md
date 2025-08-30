# まとめ練習 - チェックアウト要約

## 🧩 **学ぶタグ/プロパティ**
- 数量変更、配送選択、クーポン適用の統合
- `preventDefault`、関数分離（`sub/fee/total/render`）
- `textContent`、`Number()`、`trim()`

## 🔁 **前回の復習**
- 小計/送料/割引の個別実装

## 📌 **重要なポイント**
- 各状態を関数で分離し、`render()` で一括反映
- すべてのイベント起点で `render()` を呼ぶ

## 🧪 **例題（コピペで実行可）**

```html
<div>単価: <span id="unit-price">1000</span> 円</div>
<div>
  <button id="minus-btn">−</button>
  <input id="qty-input" type="number" value="1" min="0">
  <button id="plus-btn">＋</button>
</div>
<div>
  <label><input type="radio" name="ship" id="ship-standard" checked> 通常便（送料 300円）</label>
  <label><input type="radio" name="ship" id="ship-express"> 速達便（送料 800円）</label>
</div>
<form id="coupon-form">
  <label>クーポン: <input id="coupon" type="text" placeholder="EC2025"></label>
  <button type="submit">適用</button>
</form>
<pre id="summary" aria-live="polite">未計算</pre>
<script>
  const unit = Number(document.getElementById('unit-price').textContent)||0;
  const qty = document.getElementById('qty-input');
  const minus = document.getElementById('minus-btn');
  const plus = document.getElementById('plus-btn');
  const std = document.getElementById('ship-standard');
  const exp = document.getElementById('ship-express');
  const form = document.getElementById('coupon-form');
  const coup = document.getElementById('coupon');
  const summary = document.getElementById('summary');
  let discount = 0; // 0..1
  function clamp(n){ return Math.max(0, n|0); }
  function sub(){ return (Number(qty.value)||0) * unit; }
  function fee(){ return exp.checked ? 800 : 300; }
  function total(){ return Math.floor((sub() + fee()) * (1 - discount)); }
  function render(){
    const s = `数量: ${qty.value}\n小計: ${sub()} 円\n送料: ${fee()} 円\n割引: ${Math.round(discount*100)}%\n合計: ${total()} 円`;
    summary.textContent = s;
  }
  minus.addEventListener('click', ()=>{ qty.value = String(clamp((Number(qty.value)||0)-1)); render(); });
  plus.addEventListener('click', ()=>{ qty.value = String(clamp((Number(qty.value)||0)+1)); render(); });
  qty.addEventListener('input', ()=>{ qty.value = String(clamp(Number(qty.value)||0)); render(); });
  std.addEventListener('change', render);
  exp.addEventListener('change', render);
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const code = coup.value.trim();
    discount = (code === 'EC2025') ? 0.1 : 0;
    render();
  });
  render();
</script>
```

## ✨ **新しく追加された部分**
- `render()` によるまとめ表示（数量/小計/送料/割引/合計）
- すべての変更経路で同じ描画関数を使う

## 🔍 **コードの説明**
- ビジネスロジックと表示の分離（関数化）
- `aria-live` による画面リーダー通知の配慮

## 📖 **豆知識**
- 送料や割引の条件は定数化して1箇所で管理すると拡張しやすい

## ⚠️ **注意点**
- 例外入力（空/負/小数）に対してはクランプや丸めを適用

## 🛒 **ECサイト制作で繋がるポイント**
- チェックアウト画面の要約表示の基礎。イベント連鎖の設計法を学ぶ
