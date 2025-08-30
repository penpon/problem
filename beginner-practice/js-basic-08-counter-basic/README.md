# まとめ練習 - カウンターの基本

## 🧩 **学ぶタグ/プロパティ**
- 状態変数と画面反映
- `textContent`

## 🔁 **前回の復習**
- 複数要素へのイベント

## 📌 **重要なポイント**
- 状態（count）を単一ソースにしてUIへ反映

## 🧪 **例題（コピペで実行可）**
```html
<p id="count">0</p>
<button id="inc">+1</button>
<button id="dec">-1</button>
<script>
  let c = 0;
  function render(){ document.getElementById('count').textContent = String(c); }
  document.getElementById('inc').addEventListener('click', ()=>{ c++; render(); });
  document.getElementById('dec').addEventListener('click', ()=>{ c--; render(); });
  render();
</script>
```

## ✨ **新しく追加された部分**
- `render()` による一貫更新

## 🔍 **コードの説明**
- 変更は状態→描画の順

## 📖 **豆知識**
- 反映関数でUI更新箇所を一元化

## ⚠️ **注意点**
- 下限/上限が必要ならクランプ

## 🛒 **ECサイト制作で繋がるポイント**
- 数量ボタンの基本実装
