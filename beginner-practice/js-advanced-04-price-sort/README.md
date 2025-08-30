# 価格ソート（昇順/降順）

## 🧩 **学ぶタグ/プロパティ**
- `<select>` の変更イベント（`change`）
- `Array.prototype.sort` と比較関数
- 不変操作のための `slice()`（元配列保護）

## 🔁 **前回の復習**
- DOM 取得とイベント設定
- `textContent` での安全な表示

## 📌 **重要なポイント**
- `sort` は破壊的操作（元配列を書き換える）→ `slice()` でコピーしてから並べ替え
- 比較関数の定石
  - 昇順: `a.price - b.price`
  - 降順: `b.price - a.price`

## 🧪 **例題**
HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>js-advanced-04 価格ソート（昇順/降順）</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>価格ソート</h1>
    <div class="controls">
      <label for="sortSelect">並び順</label>
      <select id="sortSelect">
        <option value="asc">価格の安い順</option>
        <option value="desc">価格の高い順</option>
      </select>
    </div>
    <ul id="productList" class="product-list"></ul>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

CSS
```css
body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;margin:16px}
.container{max-width:800px;margin:auto}
.controls{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin:12px 0}
#sortSelect{padding:8px 10px;border:1px solid #ccc;border-radius:6px}
.product-list{list-style:none;padding:0;margin:16px 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
.product-card{border:1px solid #e5e7eb;border-radius:8px;padding:12px}
.product-name{font-weight:600}
.product-price{color:#0a7;}
```

JavaScript
```js
const products = [
  { id: 1, name: 'Pro Camera', price: 49800 },
  { id: 2, name: 'Light Stand', price: 3200 },
  { id: 3, name: 'Mini Tripod', price: 1800 },
  { id: 4, name: 'Pro Light', price: 9800 },
  { id: 5, name: 'Simple Bag', price: 2500 }
];

const $select = document.getElementById('sortSelect');
const $list = document.getElementById('productList');

function render(list) {
  $list.innerHTML = '';
  list.forEach(p => {
    const li = document.createElement('li');
    li.className = 'product-card';

    const name = document.createElement('div');
    name.className = 'product-name';
    name.textContent = p.name;

    const price = document.createElement('div');
    price.className = 'product-price';
    price.textContent = `¥${p.price.toLocaleString()}`;

    li.appendChild(name);
    li.appendChild(price);
    $list.appendChild(li);
  });
}

function sortProducts(order) {
  const arr = products.slice();
  arr.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
  return arr;
}

$select.addEventListener('change', () => {
  render(sortProducts($select.value));
});

// 初期表示
render(sortProducts($select.value || 'asc'));
```

## ✨ **新しく追加された部分**
- 選択値に応じたソートのリアクティブ更新

## 🔍 **コードの説明**
- `sortProducts(order)` が比較関数で並び替え（元配列は `slice()` で保護）
- `render()` がカードDOMを作って再描画

## 📖 **豆知識**
- `Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' })` で価格表記を統一可能

## ⚠️ **注意点**
- `innerHTML` 直書きは必要最小限に。ここでは個別DOM生成＋`textContent` で安全に反映

## 🛒 **ECサイト制作で繋がるポイント**
- ソートは検索・フィルタと組み合わせて UX 向上
- 価格帯フィルタやページネーションへの発展が容易
