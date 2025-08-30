# まとめ練習 - 基本の数値演算

## 🧩 **学ぶタグ/プロパティ**
- `Number()`、加減乗除、`Math.floor`

## 🔁 **前回の復習**
- 変数・計算の基本

## 📌 **重要なポイント**
- 文字列から数値化して計算

## 🧪 **例題（コピペで実行可）**
```html
<label>価格: <input id="price" type="number" value="1200"></label>
<label>数量: <input id="qty" type="number" value="3"></label>
<p>小計: <span id="sub">0</span> 円</p>
<script>
  const price = document.getElementById('price');
  const qty = document.getElementById('qty');
  const sub = document.getElementById('sub');
  function update(){ sub.textContent = String(Math.floor((Number(price.value)||0)*(Number(qty.value)||0))); }
  price.addEventListener('input', update); qty.addEventListener('input', update); update();
</script>
```

## ✨ **新しく追加された部分**
- 入力イベントでのリアルタイム計算

## 🔍 **コードの説明**
- `Number(...)||0` でNaN防止

## 📖 **豆知識**
- 金額は整数化で端数を抑える場合がある

## ⚠️ **注意点**
- 空入力や無効値のガード

## 🛒 **ECサイト制作で繋がるポイント**
- 小計のリアルタイム更新
