# まとめ練習 - フォーカス/ブラーでUI補助

## 🧩 **学ぶタグ/プロパティ**
- `focus` / `blur` イベント
- ヘルプ表示の制御

## 🔁 **前回の復習**
- `preventDefault` と検証

## 📌 **重要なポイント**
- 入力中のみ補助文を出すなどUX向上

## 🧪 **例題（コピペで実行可）**
```html
<label>ユーザー名: <input id="user" type="text"></label>
<small id="help" class="hide">英数字で入力してください</small>
<style>
  .hide{ opacity:0; transition:opacity .2s; }
  .show{ opacity:1; }
</style>
<script>
  const i = document.getElementById('user');
  const h = document.getElementById('help');
  i.addEventListener('focus', ()=>{ h.classList.remove('hide'); h.classList.add('show'); });
  i.addEventListener('blur', ()=>{ h.classList.remove('show'); h.classList.add('hide'); });
</script>
```

## ✨ **新しく追加された部分**
- フォーカス状態での補助表示

## 🔍 **コードの説明**
- クラスの付け替えで視覚変化

## 📖 **豆知識**
- キーボード操作ユーザーへの配慮が重要

## ⚠️ **注意点**
- 過剰なアニメは可読性を損ねる場合あり

## 🛒 **ECサイト制作で繋がるポイント**
- 入力フォームのUX改善
