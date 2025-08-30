# map().join('') でHTML生成

## 🧩 学ぶタグ/プロパティ
- `Array.prototype.map` と `Array.prototype.join` の組み合わせ
- `innerHTML` での静的HTML挿入（ユーザー入力は使わない）
- 単純なカードDOMの構造化

## 🔁 前回の復習
- `textContent` と `innerHTML` の使い分け（安全性）
- 繰り返し描画の基本フロー（データ → テンプレ → 代入）

## 📌 重要なポイント
- `map().join('')` で1つのHTML文字列にまとめてから `#list.innerHTML` に代入
- ユーザー入力を含めず、固定データのみをテンプレート化することで安全に `innerHTML` を使用
- カード（`.item`）は最小構成でOK（画像不要）

## 🧪 例題
HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>map().join('') でHTML生成</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="container" style="padding:16px">
    <h1 style="font-size:20px;margin:0 0 12px">商品一覧</h1>
    <div id="list"></div>
  </main>
  <script src="script.js"></script>
</body>
</html>
```

CSS
```css
#list{display:grid;gap:8px}
.item{padding:8px;border:1px solid #ddd;border-radius:6px}
.item .name{font-weight:600}
.item .price{color:#555}
```

JavaScript
```js
const items = [
  { id: 1, name: 'Apple', price: 120 },
  { id: 2, name: 'Banana', price: 80 },
  { id: 3, name: 'Cherry', price: 200 }
];

function render(){
  const html = items.map(i => `
    <div class="item">
      <div class="name">${i.name}</div>
      <div class="price">¥${i.price.toLocaleString()}</div>
    </div>
  `).join('');
  document.getElementById('list').innerHTML = html; // 固定データのみを挿入
}

render();
```

## ✨ 新しく追加された部分
- `map().join('')` によるカードHTMLの一括生成
- `toLocaleString()` による価格表示の整形

## 🔍 コードの説明
- `items.map(...)` で各要素のHTML断片を作り、`join('')` で連結
- 結果の文字列を `#list.innerHTML` に代入して描画

## 📖 豆知識
- ノード生成で安全性と可読性を高めたい場合は `createElement` + `appendChild` も有効
- 差分のみ更新したい場合は仮想DOMやKeyed更新の設計が有効

## ⚠️ 注意点
- ユーザー入力をテンプレ直挿ししない（XSS対策）。入力は必ず検証・エスケープするか `textContent` を使用
- 多量データの再描画ではパフォーマンスに注意（まとめて置換は速いが再フロー発生）

## 🛒 ECサイト制作で繋がるポイント
- 商品一覧・レビュー一覧などのカード化レンダリングの基礎
- 価格や在庫表示のテンプレ構築と再利用性の向上
