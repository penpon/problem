# reduce で件数と合計を計算

## 🧩 学ぶタグ/プロパティ
- `Array.prototype.reduce` による集計（件数・合計）
- `map().join('')` + `innerHTML` による一覧描画
- 数値の整形表示（`toLocaleString()`）

## 🔁 前回の復習
- `map().join('')` でのカードHTML生成
- イベント非依存の初期描画フロー

## 📌 重要なポイント
- 件数は `items.length`、合計は `reduce((sum, i) => sum + i.price, 0)`
- 結果は `#count` と `#total` に表示（通貨表記は任意）
- 一覧は `map→join→#list.innerHTML` で最小実装

## 🧪 例題
HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>reduce で合計</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main style="padding:16px">
    <div>件数: <span id="count">0</span></div>
    <div>合計: <span id="total">0</span></div>
    <div id="list" style="margin-top:8px"></div>
  </main>
  <script src="script.js"></script>
</body>
</html>
```

CSS
```css
#list{display:grid;gap:6px}
.item{padding:6px;border:1px solid #ddd;border-radius:6px}
.name{font-weight:600}
```

JavaScript
```js
const items = [
  { id: 1, name: 'Apple', price: 120 },
  { id: 2, name: 'Banana', price: 80 },
  { id: 3, name: 'Cherry', price: 200 }
];

function render(){
  const count = items.length;
  const total = items.reduce((sum, i) => sum + i.price, 0);
  document.getElementById('count').textContent = String(count);
  document.getElementById('total').textContent = `¥${total.toLocaleString()}`;

  const html = items.map(i => `
    <div class="item">
      <div class="name">${i.name}</div>
      <div class="price">¥${i.price.toLocaleString()}</div>
    </div>
  `).join('');
  document.getElementById('list').innerHTML = html; // 固定配列のみ
}

render();
```

## ✨ 新しく追加された部分
- `reduce` による合計値の計算
- 件数・合計のヘッダ表示

## 🔍 コードの説明
- `reduce` 初期値 `0`、各要素の `price` を加算
- 一覧は `map().join('')` でHTML生成→`innerHTML` へ反映

## 📖 豆知識
- 複合集計（件数・合計・平均）はオブジェクトをアキュムレータに
- 金額フォーマットは `Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' })`

## ⚠️ 注意点
- 数値型での加算を保証（文字列連結に注意）
- ユーザー入力はテンプレ直挿ししない（XSS対策）

## 🛒 ECサイト制作で繋がるポイント
- カート内件数・小計の算出
- 絞り込み結果の合計金額表示
