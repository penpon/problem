# まとめ練習 - classListで表示の切替

## 🧩 **学ぶタグ/プロパティ**
- `classList.add/remove/toggle/contains`
- `textContent`

## 🔁 **前回の復習**
- ボタンクリックでの表示更新

## 📌 **重要なポイント**
- 見た目のON/OFFはクラス操作で行う

## 🧪 **例題（コピペで実行可）**
```html
<p id="panel" class="hidden">ここはパネルです</p>
<button id="btn">表示/非表示</button>
<style>
  .hidden{ display:none; }
  #panel{ padding:8px; border:1px solid #ccc; }
</style>
<script>
  const panel = document.getElementById('panel');
  document.getElementById('btn').addEventListener('click', ()=>{
    panel.classList.toggle('hidden');
  });
</script>
```

## ✨ **新しく追加された部分**
- `classList.toggle` でワンアクション切替

## 🔍 **コードの説明**
- `.hidden` クラスの有無で表示を制御

## 📖 **豆知識**
- `classList.contains` で状態判定可能

## ⚠️ **注意点**
- クラス名の衝突に注意（命名規則を統一）

## 🛒 **ECサイト制作で繋がるポイント**
- モーダルやドロップダウンの開閉制御
