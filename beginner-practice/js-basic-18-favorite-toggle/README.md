# まとめ練習 - お気に入り（ハート）切替

## 🧩 **学ぶタグ/プロパティ**
- アイコンのON/OFF表示
- `classList.toggle` と `aria-pressed`

## 🔁 **前回の復習**
- 数量と小計の連動

## 📌 **重要なポイント**
- 視覚とアクセシビリティ状態を同期

## 🧪 **例題（コピペで実行可）**
```html
<button id="fav" aria-pressed="false" class="btn">♡ お気に入り</button>
<style>
  .btn{ padding:6px 10px; }
  .active{ color:#e11d48; font-weight:bold; }
</style>
<script>
  const b = document.getElementById('fav');
  b.addEventListener('click', ()=>{
    const on = b.getAttribute('aria-pressed') === 'true';
    b.setAttribute('aria-pressed', String(!on));
    b.classList.toggle('active');
    b.textContent = (!on ? '♥' : '♡') + ' お気に入り';
  });
</script>
```

## ✨ **新しく追加された部分**
- `aria-pressed` による状態表現

## 🔍 **コードの説明**
- 属性とクラス、文面を同時に更新

## 📖 **豆知識**
- スクリーンリーダー向けに `aria-*` 属性が有効

## ⚠️ **注意点**
- `innerHTML` ではなく `textContent` で文字更新

## 🛒 **ECサイト制作で繋がるポイント**
- ウィッシュリストの入口実装
