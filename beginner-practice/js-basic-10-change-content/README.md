# まとめ練習 - コンテンツの切り替え

## 🧩 **学ぶタグ/プロパティ**
- `textContent` とクラスの切替
- `classList.add/remove/toggle`

## 🔁 **前回の復習**
- カウンター拡張

## 📌 **重要なポイント**
- 見た目の変更はCSSに寄せる

## 🧪 **例題（コピペで実行可）**
```html
<p id="msg" class="normal">通常表示</p>
<button id="toggle">切り替え</button>
<style>
  .normal{ color:#333; }
  .accent{ color:#e63946; font-weight:bold; }
</style>
<script>
  const msg = document.getElementById('msg');
  document.getElementById('toggle').addEventListener('click', ()=>{
    msg.classList.toggle('accent');
    msg.textContent = msg.classList.contains('accent') ? '強調表示' : '通常表示';
  });
</script>
```

## ✨ **新しく追加された部分**
- クラスでの見た目切替

## 🔍 **コードの説明**
- `classList.toggle` と状態に応じた文言変更

## 📖 **豆知識**
- 役割分離（ロジックはJS、見た目はCSS）

## ⚠️ **注意点**
- `innerHTML` は使わず `textContent`

## 🛒 **ECサイト制作で繋がるポイント**
- お知らせ枠やバッジのオン/オフ
