# まとめ練習 - 数量と小計の連動

## 🧩 **学ぶタグ/プロパティ**
- `click` / `input` イベントの併用
- `Math.max` による下限制御

## 🔁 **前回の復習**
- カート追加での状態管理

## 📌 **重要なポイント**
- どの変更経路でも同じ関数で反映

## 🧪 **例題（コピペで実行可）**
```html
<div>単価: <span id="unit">900</span> 円</div>
<button id="minus">−</button>
<input id="qty" type="number" value="1" min="0">
<button id="plus">＋</button>
<p>小計: <span id="sub">0</span> 円</p>
<script>
  const unit = Number(document.getElementById('unit').textContent)||0;
  const qty = document.getElementById('qty');
  const sub = document.getElementById('sub');
  function clamp(n){ return Math.max(0, n|0); }
  function render(){ const n = clamp(Number(qty.value)||0); qty.value = String(n); sub.textContent = String(n*unit); }
  document.getElementById('minus').addEventListener('click', ()=>{ qty.value = String(clamp((Number(qty.value)||0)-1)); render(); });
  document.getElementById('plus').addEventListener('click', ()=>{ qty.value = String(clamp((Number(qty.value)||0)+1)); render(); });
  qty.addEventListener('input', render);
  render();
</script>
```

## ✨ **新しく追加された部分**
- クランプで不正値防止

## 🔍 **コードの説明**
- `n|0` で整数化

## 📖 **豆知識**
- モバイルは数値キーボードが出る

## ⚠️ **注意点**
- min属性だけに頼らずJS側でも防御

## 🛒 **ECサイト制作で繋がるポイント**
- 数量変更のベストプラクティス
