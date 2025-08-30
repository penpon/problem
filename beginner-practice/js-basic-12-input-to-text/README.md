# まとめ練習 - 入力をそのまま表示

## 🧩 **学ぶタグ/プロパティ**
- `<input>` の `input` イベント
- `textContent`、`trim()`

## 🔁 **前回の復習**
- classList による見た目操作

## 📌 **重要なポイント**
- 入力を都度反映、空時はプレースホルダ表示

## 🧪 **例題（コピペで実行可）**
```html
<label>お名前: <input id="name" type="text" placeholder="山田太郎"></label>
<p id="out">（ここに表示）</p>
<script>
  const i = document.getElementById('name');
  const o = document.getElementById('out');
  function update(){ o.textContent = i.value.trim() || '（ここに表示）'; }
  i.addEventListener('input', update);
  update();
</script>
```

## ✨ **新しく追加された部分**
- 空文字のとき既定文言

## 🔍 **コードの説明**
- `trim()` で前後空白を除去してから反映

## 📖 **豆知識**
- 見た目変更はCSSに寄せるのが保守的

## ⚠️ **注意点**
- `innerHTML` ではなく `textContent`

## 🛒 **ECサイト制作で繋がるポイント**
- フォームプレビューの基本
