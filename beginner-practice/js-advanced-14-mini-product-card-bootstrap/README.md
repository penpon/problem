# 複合条件フィルタ（カテゴリ + 在庫）

## 🧩 学ぶタグ/プロパティ
- `Array.prototype.filter` による複合条件絞り込み
- `map().join('')` + `innerHTML` での一括描画
- `select` と `checkbox` の `change` イベントで再描画

## 🔁 前回の復習
- 価格ソートや在庫フィルタの基本（map/join と innerHTML）
- イベント駆動レンダリングの流れ

## 📌 重要なポイント
- `#category` が `all` ならカテゴリ条件を無視、それ以外は完全一致
- `#inStock` がONなら `inStock === true` のみ
- フィルタ→テンプレ→`#list.innerHTML` の順で常に1つの `render()` に集約

## 🧪 例題
HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>複合条件フィルタ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main style="padding:16px">
    <select id="category">
      <option value="all">すべて</option>
      <option value="fruit">果物</option>
      <option value="drink">飲料</option>
    </select>
    <label style="margin-left:8px"><input id="inStock" type="checkbox"> 在庫のみ</label>
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
.badge{margin-left:6px;font-size:12px;color:#2563eb}
```

JavaScript
```js
const items = [
  { id: 1, name: 'Apple', price: 120, inStock: true, category: 'fruit' },
  { id: 2, name: 'Tea', price: 150, inStock: true, category: 'drink' },
  { id: 3, name: 'Banana', price: 80, inStock: false, category: 'fruit' }
];

const $cat = document.getElementById('category');
const $stock = document.getElementById('inStock');
const $list = document.getElementById('list');

function template(list){
  return list.map(i => `
    <div class="item">
      <div class="name">${i.name}<span class="badge">${i.category}</span></div>
      <div class="price">¥${i.price.toLocaleString()}${i.inStock ? '' : '（在庫切れ）'}</div>
    </div>
  `).join('');
}

function render(){
  const cat = $cat.value;
  const onlyStock = $stock.checked;
  const filtered = items.filter(i => {
    const catOk = (cat === 'all') || (i.category === cat);
    const stockOk = !onlyStock || i.inStock === true;
    return catOk && stockOk;
  });
  $list.innerHTML = template(filtered); // 固定配列のみ
}

$cat.addEventListener('change', render);
$stock.addEventListener('change', render);
render();
```

## ✨ 新しく追加された部分
- `category` と `inStock` の両条件を満たす要素のみ表示
- バッジ表示でカテゴリを視覚化

## 🔍 コードの説明
- `catOk && stockOk` のAND条件で `filter`
- 結果を `map().join('')` でHTML化し `innerHTML` へ一括反映

## 📖 豆知識
- 条件が増える場合は、条件式を関数化すると読みやすい
- `Set` でカテゴリ一覧を動的に作ることも可能

## ⚠️ 注意点
- ユーザー入力はテンプレ直挿ししない（XSS対策）。ここでは固定配列のみ
- 条件分岐の抜け漏れに注意（`all` の扱いなど）

## 🛒 ECサイト制作で繋がるポイント
- カテゴリ/在庫/価格帯など複合フィルタUIの基礎
- 検索パネルと結果リストの同期更新パターン
