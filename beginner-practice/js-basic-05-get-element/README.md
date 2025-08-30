# まとめ練習 - 要素取得と表示

## 🧩 **学ぶタグ/プロパティ**
- `getElementById`、`querySelector`
- `textContent`

## 🔁 **前回の復習**
- 数値化と計算

## 📌 **重要なポイント**
- 目的に応じた要素取得APIの使い分け

## 🧪 **例題（コピペで実行可）**
```html
<p id="target">（初期）</p>
<button id="btn">取得して更新</button>
<script>
  const p = document.getElementById('target');
  document.getElementById('btn').addEventListener('click', ()=>{
    const same = document.querySelector('#target');
    p.textContent = '取得OK: ' + (p === same);
  });
</script>
```

## ✨ **新しく追加された部分**
- 複数の取得手段の比較

## 🔍 **コードの説明**
- `querySelector` はCSSセレクタで柔軟

## 📖 **豆知識**
- 頻繁に使う要素は変数にキャッシュ

## ⚠️ **注意点**
- ID重複は避ける

## 🛒 **ECサイト制作で繋がるポイント**
- パーツのピンポイント更新の基本
