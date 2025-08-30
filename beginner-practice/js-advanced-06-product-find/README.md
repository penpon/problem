# 単一商品詳細表示（find）

## 🧩 **学ぶタグ/プロパティ**
- `Array.prototype.find` による単一要素検索
- 入力値の数値化と妥当性チェック（`Number`, `Number.isInteger`）
- `textContent` による安全な表示

## 🔁 **前回の復習**
- リスト表示・カードDOM生成（03/04）
- ユーザー入力の正規化（trim, toLowerCase）

## 📌 **重要なポイント**
- `find` は最初に一致した1件のみを返す（無ければ `undefined`）
- 非数や0/負数は不正として扱い、見つからない表示にする
- 画面更新は一箇所の `renderDetail()` に集約

## 🧪 **例題**
HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>js-advanced-06 単一商品詳細表示（find）</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>商品詳細</h1>
    <div class="controls">
      <label for="productIdInput">商品ID</label>
      <input id="productIdInput" type="number" min="1" step="1" placeholder="例: 1" />
      <button id="showBtn" type="button">表示</button>
      <div class="meta">該当: <span id="statusText">未検索</span></div>
    </div>
    <div id="productDetail" class="product-detail" aria-live="polite"></div>
  </div>
  <script src="script.js"></script>
</body>
</html>
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

const $input = document.getElementById('productIdInput');
const $btn = document.getElementById('showBtn');
const $detail = document.getElementById('productDetail');
const $status = document.getElementById('statusText');

function renderDetail(product) {
  $detail.innerHTML = '';
  if (!product) { $status.textContent = '見つかりません'; return; }
  const name = document.createElement('div');
  name.className = 'product-name';
  name.textContent = product.name;
  const price = document.createElement('div');
  price.className = 'product-price';
  price.textContent = `¥${product.price.toLocaleString()}`;
  $detail.appendChild(name);
  $detail.appendChild(price);
  $status.textContent = '見つかりました';
}

function findProductById(id) { return products.find(p => p.id === id) || null; }

$btn.addEventListener('click', () => {
  const id = Number($input.value);
  if (!Number.isInteger(id) || id <= 0) { renderDetail(null); return; }
  renderDetail(findProductById(id));
});
```

## ✨ **新しく追加された部分**
- `find` による単一データの取得フロー
- ステータステキスト（見つかった/見つからない）の導入

## 🔍 **コードの説明**
- `findProductById` が1件検索を返す
- `renderDetail` が詳細DOM生成と状態表示を担う

## 📖 **豆知識**
- 複数候補が欲しい場合は `filter`
- 見つからないときの代替UI/プレースホルダを用意すると親切

## ⚠️ **注意点**
- 入力を厳格に数値検証（空/小数/負数はNG）
- 表示は `textContent` で安全に行う

## 🛒 **ECサイト制作で繋がるポイント**
- 商品詳細ページのIDクエリ解決
- 入力/パラメータに対する堅牢なバリデーション
