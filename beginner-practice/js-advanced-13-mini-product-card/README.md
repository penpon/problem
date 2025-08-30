# sort の昇順/降順切替

## 🧩 学ぶタグ/プロパティ
- `Array.prototype.sort` による並び替え
- `map().join('')` と `innerHTML` による一括描画
- `change` イベントでの再描画

## 🔁 前回の復習
- `filter` と `map().join('')` の連携（固定配列→HTML文字列→`innerHTML`）
- イベント駆動でUIを更新する基本

## 📌 重要なポイント
- `#sort` の値（`price-asc` / `price-desc`）で価格の昇順/降順を切替
- `sort` は破壊的メソッドのため、描画用はコピー配列（`slice()` やスプレッド）を使う
- `map().join('')` でHTML文字列にして `#list.innerHTML` に代入

## 🧪 例題
HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>sort の昇順/降順</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main style="padding:16px">
    <select id="sort">
      <option value="price-asc">価格昇順</option>
      <option value="price-desc">価格降順</option>
    </select>
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

const $sort = document.getElementById('sort');
const $list = document.getElementById('list');

function template(list){
  return list.map(i => `
    <div class="item">
      <div class="name">${i.name}</div>
      <div class="price">¥${i.price.toLocaleString()}</div>
    </div>
  `).join('');
}

function render(){
  const by = $sort.value;
  const sorted = [...items].sort((a,b) => {
    if (by === 'price-asc') return a.price - b.price;
    return b.price - a.price; // price-desc
  });
  $list.innerHTML = template(sorted); // 固定配列のみ
}

$sort.addEventListener('change', render);
render();
```

## ✨ 新しく追加された部分
- セレクト値に応じた昇順/降順の切替
- 破壊的操作を避けるための配列コピー

## 🔍 コードの説明
- `sort` 比較関数で価格差を返して順序決定
- テンプレ関数でHTML化→`innerHTML`で一括描画

## 📖 豆知識
- 数値以外の多段ソートは条件分岐や`localeCompare`の活用
- 大量データは事前ソート結果をキャッシュして切替だけ行うと高速

## ⚠️ 注意点
- 元配列を上書きしないように毎回コピーしてから`sort`
- ユーザー入力文字列をテンプレへ直挿ししない（XSS対策）

## 🛒 ECサイト制作で繋がるポイント
- 商品一覧の価格ソート（昇順/降順）に直結
- 複合ソート（価格→評価→在庫）への拡張の基礎
