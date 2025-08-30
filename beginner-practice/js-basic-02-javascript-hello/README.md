# まとめ練習 - 画面とコンソールに挨拶

## 🧩 **学ぶタグ/プロパティ**
- `textContent` での安全な書き換え
- `console.log()`

## 🔁 **前回の復習**
- クリックイベントの基本

## 📌 **重要なポイント**
- 画面表示は `textContent` を使う（`innerHTML`は避ける）

## 🧪 **例題（コピペで実行可）**
```html
<p id="msg">（未挨拶）</p>
<button id="hi">挨拶する</button>
<script>
  const msg = document.getElementById('msg');
  document.getElementById('hi').addEventListener('click', ()=>{
    msg.textContent = 'Hello, JavaScript!';
    console.log('挨拶を表示しました');
  });
</script>
```

## ✨ **新しく追加された部分**
- DOMのテキスト更新

## 🔍 **コードの説明**
- イベントで `textContent` を変更

## 📖 **豆知識**
- XSS対策として `textContent` を推奨

## ⚠️ **注意点**
- 取得IDとHTMLの一致を確認

## 🛒 **ECサイト制作で繋がるポイント**
- メッセージや状態表示の更新
