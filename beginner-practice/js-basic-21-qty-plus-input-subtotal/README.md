# まとめ練習 - 数量加減＋入力で小計更新

## 🧩 **学ぶタグ/プロパティ**
- `<button>` / `<input type="number">`
- `addEventListener('click' | 'input')`
- `textContent` による安全な表示更新
- `Number()` での数値化、`Math.max()` によるクランプ

## 🔁 **前回の復習**
- ボタンクリックや入力イベントの基本
- DOMの取得（`getElementById`）
- `textContent` とセキュリティ（`innerHTML` は原則使用しない）

## 📌 **重要なポイント**
- 数量は負数にしない（下限0のクランプ）
- 入力とボタン操作の両経路で「同じ関数」を通して一貫更新
- 表示更新は `textContent`、計算は常に数値化してから

## 🧪 **例題（コピペで実行可）**

```html
<div>単価: <span id="unit-price">1200</span> 円</div>
<div>
  <button id="minus-btn">−</button>
  <input id="qty-input" type="number" value="1" min="0">
  <button id="plus-btn">＋</button>
</div>
<div>小計: <span id="subtotal">1200</span> 円</div>
<script>
  const unit = Number(document.getElementById('unit-price').textContent) || 0;
  const qtyInput = document.getElementById('qty-input');
  const subEl = document.getElementById('subtotal');
  const minus = document.getElementById('minus-btn');
  const plus = document.getElementById('plus-btn');
  function clamp(n){ return Math.max(0, n|0); }
  function update(){
    const n = clamp(Number(qtyInput.value) || 0);
    qtyInput.value = String(n);
    subEl.textContent = String(unit * n);
  }
  minus.addEventListener('click', ()=>{ qtyInput.value = String(clamp((Number(qtyInput.value)||0) - 1)); update(); });
  plus.addEventListener('click', ()=>{ qtyInput.value = String(clamp((Number(qtyInput.value)||0) + 1)); update(); });
  qtyInput.addEventListener('input', update);
  update();
</script>
```

## ✨ **新しく追加された部分**
- 直接入力とボタン操作の「併用」
- 共通処理 `update()` を用意して分岐の重複を削減

## 🔍 **コードの説明**
- `clamp()` で下限0を保証
- `n|0` は整数化（小数や空文字のガード）
- 画面更新は `textContent` による安全な反映

## 📖 **豆知識**
- `<input type="number">` の `min` 属性はUIヒントであり、JS側でもガード必須
- `value` は文字列。計算前に必ず `Number()` で数値化

## ⚠️ **注意点**
- `NaN` 伝播に注意（`Number(...) || 0` で防御）
- `innerHTML` を不用意に使わない（XSS回避）

## 🛒 **ECサイト制作で繋がるポイント**
- カート数量の増減・手入力を統合して小計を正しく反映する基礎
