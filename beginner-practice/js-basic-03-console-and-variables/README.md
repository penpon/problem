# まとめ練習 - コンソールと変数の基本

## 🧩 **学ぶタグ/プロパティ**
- `let`/`const`、テンプレートリテラル
- `console.log` で値の確認

## 🔁 **前回の復習**
- DOM更新の基本

## 📌 **重要なポイント**
- 変数は用途で `let`/`const` を使い分け

## 🧪 **例題（コピペで実行可）**
```html
<button id="calc">計算して表示</button>
<script>
  document.getElementById('calc').addEventListener('click', ()=>{
    const price = 1200; let qty = 2; const subtotal = price * qty;
    console.log(`小計: ${subtotal}`);
    alert(`小計: ${subtotal} 円`);
  });
</script>
```

## ✨ **新しく追加された部分**
- 変数と式評価

## 🔍 **コードの説明**
- `const` は再代入不可、`let` は可

## 📖 **豆知識**
- 文字列結合はテンプレートリテラルが便利

## ⚠️ **注意点**
- 変数スコープを意識（`var`は使わない）

## 🛒 **ECサイト制作で繋がるポイント**
- 価格計算の基礎
