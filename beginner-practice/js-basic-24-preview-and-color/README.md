# まとめ練習 - プレビュー更新＋色切替

## 🧩 **学ぶタグ/プロパティ**
- `<input type="text">`、`classList.toggle()`
- `addEventListener('input' | 'click')`
- `textContent`・`trim()`

## 🔁 **前回の復習**
- 入力値の反映とイベントの基本

## 📌 **重要なポイント**
- 表示の初期化と更新を同じ関数で統一
- トグル状態はクラスで管理（`.active`）

## 🧪 **例題（コピペで実行可）**

```html
<label>お名前: <input id="name-input" type="text" placeholder="山田太郎"></label>
<p id="preview">（ここにプレビュー）</p>
<button id="color-btn">色切替</button>
<style>
  #preview { color: #333; transition: color .2s; }
  #preview.active { color: #e76f51; }
</style>
<script>
  const input = document.getElementById('name-input');
  const prev = document.getElementById('preview');
  const btn = document.getElementById('color-btn');
  function update(){ prev.textContent = input.value.trim() || '（ここにプレビュー）'; }
  input.addEventListener('input', update);
  btn.addEventListener('click', ()=>{ prev.classList.toggle('active'); });
  update();
</script>
```

## ✨ **新しく追加された部分**
- `.active` のオン/オフで見た目を切り替え
- 空文字時のプレースホルダ表示

## 🔍 **コードの説明**
- `trim()` で空白を削除してから反映
- 初期表示時にも `update()` を実行

## 📖 **豆知識**
- 見た目の変更はCSSへ寄せると保守性が高い

## ⚠️ **注意点**
- `innerHTML` は使わず `textContent` を使用

## 🛒 **ECサイト制作で繋がるポイント**
- 入力プレビューやバリエーション表示の導入部
