# まとめ練習 - ライブプレビュー（名前と価格）

## 🧩 **学ぶタグ/プロパティ**
- 複数入力の同時反映
- `Number()`、`toLocaleString()`

## 🔁 **前回の復習**
- 入力の即時反映

## 📌 **重要なポイント**
- 数値は数値化し、表示時に整形可能

## 🧪 **例題（コピペで実行可）**
```html
<label>商品名: <input id="name" type="text" placeholder="サンプル"></label>
<label>価格: <input id="price" type="number" value="1200"></label>
<div id="card">商品: — / 価格: — 円</div>
<script>
  const n = document.getElementById('name');
  const p = document.getElementById('price');
  const card = document.getElementById('card');
  function render(){
    const name = n.value.trim() || '（未入力）';
    const price = Number(p.value)||0;
    card.textContent = `商品: ${name} / 価格: ${price.toLocaleString()} 円`;
  }
  n.addEventListener('input', render);
  p.addEventListener('input', render);
  render();
</script>
```

## ✨ **新しく追加された部分**
- 数値整形で読みやすく

## 🔍 **コードの説明**
- 文字列/数値の扱いを分ける

## 📖 **豆知識**
- ロケールに応じた桁区切りは `toLocaleString`

## ⚠️ **注意点**
- NaNガードに `Number(...)||0`

## 🛒 **ECサイト制作で繋がるポイント**
- 商品カードのライブ更新
