# まとめ練習 - カウンター拡張（倍増/リセット）

## 🧩 **学ぶタグ/プロパティ**
- 追加操作（倍増・リセット）
- 関数分離とガード

## 🔁 **前回の復習**
- 基本カウンター

## 📌 **重要なポイント**
- 複数操作でも `render()` は1つ

## 🧪 **例題（コピペで実行可）**
```html
<p id="count">0</p>
<button id="inc">+1</button>
<button id="dbl">×2</button>
<button id="reset">リセット</button>
<script>
  let c = 0;
  const view = document.getElementById('count');
  function render(){ view.textContent = String(c); }
  document.getElementById('inc').addEventListener('click', ()=>{ c++; render(); });
  document.getElementById('dbl').addEventListener('click', ()=>{ c = c*2; render(); });
  document.getElementById('reset').addEventListener('click', ()=>{ c = 0; render(); });
  render();
</script>
```

## ✨ **新しく追加された部分**
- 複数操作の追加

## 🔍 **コードの説明**
- UIは `render()` に集約

## 📖 **豆知識**
- 責務ごとに関数を分けると拡張容易

## ⚠️ **注意点**
- 無限増加や負値など仕様に応じクランプ

## 🛒 **ECサイト制作で繋がるポイント**
- 応用的な数量操作（倍量やリセット）
