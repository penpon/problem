# まとめ練習 - 初めてのJavaScript

## 🧩 **学ぶタグ/プロパティ**
- `<script>` によるJS読み込み
- `addEventListener('click')` と `alert()`
- `console.log()`

## 🔁 **前回の復習**
- HTML/CSSの役割（構造/見た目）

## 📌 **重要なポイント**
- JSはbody末尾で読み込む（DOM後に実行）
- イベント駆動で処理を書く

## 🧪 **例題（コピペで実行可）**
```html
<button id="hello">はじめてのJS</button>
<script>
  document.getElementById('hello').addEventListener('click', ()=>{
    alert('こんにちは！JavaScriptの第一歩！');
    console.log('ボタンがクリックされました');
  });
</script>
```

## ✨ **新しく追加された部分**
- クリックイベントと対話的な動き

## 🔍 **コードの説明**
- `getElementById` で要素取得 → `addEventListener` で処理登録

## 📖 **豆知識**
- `console.log` はデバッグの基本

## ⚠️ **注意点**
- `<script>` は原則 `</body>` 直前に配置

## 🛒 **ECサイト制作で繋がるポイント**
- ボタン押下でのインタラクションの基礎
