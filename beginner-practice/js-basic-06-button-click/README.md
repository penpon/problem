# まとめ練習 - ボタンクリックでメッセージ

## 🧩 **学ぶタグ/プロパティ**
- `addEventListener('click')`
- `textContent`

## 🔁 **前回の復習**
- 要素取得API

## 📌 **重要なポイント**
- ユーザー操作をトリガに画面更新

## 🧪 **例題（コピペで実行可）**
```html
<p id="msg">（未クリック）</p>
<button id="btn">クリック</button>
<script>
  document.getElementById('btn').addEventListener('click', ()=>{
    document.getElementById('msg').textContent = 'クリックされました！';
  });
</script>
```

## ✨ **新しく追加された部分**
- クリックでの動作反映

## 🔍 **コードの説明**
- ハンドラ内でDOMを書き換え

## 📖 **豆知識**
- 複数ハンドラも追加可能（重ねがけ）

## ⚠️ **注意点**
- ボタンの多重クリックによる副作用に留意

## 🛒 **ECサイト制作で繋がるポイント**
- 追加/削除/購入などボタン操作の基本
