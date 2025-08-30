# まとめ練習 - フォーム送信を止めて検証

## 🧩 **学ぶタグ/プロパティ**
- `form` の `submit` と `event.preventDefault()`
- 入力検証とメッセージ表示

## 🔁 **前回の復習**
- 入力値のライブ反映

## 📌 **重要なポイント**
- 送信前に検証して結果を表示

## 🧪 **例題（コピペで実行可）**
```html
<form id="f">
  <label>メール: <input id="email" type="email" placeholder="test@example.com"></label>
  <button type="submit">送信</button>
</form>
<p id="msg">未送信</p>
<script>
  const f = document.getElementById('f');
  const email = document.getElementById('email');
  const msg = document.getElementById('msg');
  f.addEventListener('submit', (e)=>{
    e.preventDefault();
    const v = String(email.value||'').trim();
    if (v.includes('@')) msg.textContent = '形式OK（ダミー送信）';
    else msg.textContent = 'メール形式が不正です';
  });
</script>
```

## ✨ **新しく追加された部分**
- `preventDefault()` による送信阻止

## 🔍 **コードの説明**
- 送信起点で検証 → メッセージ反映

## 📖 **豆知識**
- 追加検証は正規表現等で拡張可能

## ⚠️ **注意点**
- 実運用ではサーバ側検証も必須

## 🛒 **ECサイト制作で繋がるポイント**
- 入力検証とユーザーフィードバック
