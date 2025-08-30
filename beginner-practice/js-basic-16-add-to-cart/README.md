# まとめ練習 - カートに追加（件数と小計）

## 🧩 **学ぶタグ/プロパティ**
- 状態管理（件数/小計）
- `textContent`、`Number()`

## 🔁 **前回の復習**
- フォーカス/ブラーによる補助

## 📌 **重要なポイント**
- クリックで状態を更新し描画を一元化

## 🧪 **例題（コピペで実行可）**
```html
<div>単価: <span id="unit">1200</span> 円</div>
<p>カート: <span id="count">0</span> 件 / 小計: <span id="sub">0</span> 円</p>
<button id="add">カートに追加</button>
<script>
  const unit = Number(document.getElementById('unit').textContent)||0;
  let count = 0; let sub = 0;
  function render(){
    document.getElementById('count').textContent = String(count);
    document.getElementById('sub').textContent = String(sub);
  }
  document.getElementById('add').addEventListener('click', ()=>{ count++; sub += unit; render(); });
  render();
</script>
```

## ✨ **新しく追加された部分**
- 状態（count/sub）を管理

## 🔍 **コードの説明**
- 変更は状態→描画の順

## 📖 **豆知識**
- 通知やバッジは状態から算出

## ⚠️ **注意点**
- 単価取得は数値化

## 🛒 **ECサイト制作で繋がるポイント**
- カートの最小実装
