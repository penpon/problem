# 商品名検索（filter + includes）

## 🧩 **学ぶタグ/プロパティ**
- **input** イベント
- **Array.prototype.filter** / **String.prototype.includes**
- **textContent** による安全なテキスト反映

## 🔁 **前回の復習**
- 基本的な DOM 取得とイベント設定
- textContent での動的表示

## 📌 **重要なポイント**
- 入力値を **trim + toLowerCase** で正規化
- **filter → includes** の最小検索ロジック
- 表示は **textContent** を使用（XSS防止）

## 🧪 **例題**
HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>js-advanced-03 商品名検索（filter + includes）</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>商品名検索</h1>

    <div class="controls">
      <label for="searchInput">検索キーワード</label>
      <input id="searchInput" type="text" placeholder="例: pro / light / mini" />
      <div class="meta">該当件数: <span id="resultCount">0</span> 件</div>
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
#searchInput{padding:8px 10px;border:1px solid #ccc;border-radius:6px;min-width:240px}
.meta{color:#666}
.product-list{list-style:none;padding:0;margin:16px 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
.product-card{border:1px solid #e5e7eb;border-radius:8px;padding:12px}
.product-name{font-weight:600}
.product-price{color:#0a7;}
```

JavaScript
```js
// 商品データ（js-basic を下地にした最小サンプル）
const products = [
  { id: 1, name: 'Pro Camera', price: 49800 },
  { id: 2, name: 'Light Stand', price: 3200 },
  { id: 3, name: 'Mini Tripod', price: 1800 },
  { id: 4, name: 'Pro Light', price: 9800 },
  { id: 5, name: 'Simple Bag', price: 2500 }
];

const $input = document.getElementById('searchInput');
const $list = document.getElementById('productList');
const $count = document.getElementById('resultCount');

function render(list) {
  // 安全のため textContent で反映
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
  $count.textContent = String(list.length);
}

function filterProducts(keyword) {
  const k = keyword.trim().toLowerCase();
  if (!k) return products;
  return products.filter(p => p.name.toLowerCase().includes(k));
}

$input.addEventListener('input', () => {
  const filtered = filterProducts($input.value);
  render(filtered);
});

// 初期表示
render(products);
```

## ✨ **新しく追加された部分**
- 入力イベントに応じてリアルタイムに絞り込み
- 件数表示を同期更新

## 🔍 **コードの説明**
- `filterProducts()` で正規化したキーワード検索
- `render()` でリストDOMを再描画し、件数も更新

## 📖 **豆知識**
- `includes()` は部分一致検索。前方/後方/完全一致にしたい場合は正規表現等も検討

## ⚠️ **注意点**
- `innerHTML` を使わない（XSS回避）。文字列は `textContent` で反映
- 空文字は全件表示の仕様

## 🛒 **ECサイト制作で繋がるポイント**
- EC-11/12/13 の検索・カテゴリフィルタ・ソートの基礎
- EC-15 のカート件数更新などとも UI 更新パターンが共通
