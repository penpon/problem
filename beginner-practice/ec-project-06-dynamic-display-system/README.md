# EC-06: 動的表示の基礎（在庫バッジ・表示切替）

## 🧩 学ぶタグ/プロパティ
- **表示制御**: `d-none`（表示/非表示）
- **状態でのUI分岐**: 在庫あり/なしバッジ
- **イベント**: `addEventListener('click', ...)`

## 🔁 前回の復習
- 配列からカードを量産
- クリックでカート数を更新

## 📌 重要なポイント
- 「状態」に応じてDOMの見え方を変える
- `classList.add/remove/toggle` で表示制御

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-06 動的表示の基礎</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-4">
    <h1 class="mb-3">在庫バッジの表示切替</h1>
    <div class="mb-3">
      <button id="toggleStock" class="btn btn-outline-primary">在庫状態を切替</button>
    </div>

    <div class="row g-3" id="productList"></div>
  </div>

  <script>
    const products = [
      { id: 1, name: 'ベーシックマグ', price: 1200, image: 'https://picsum.photos/seed/p1/600/400', inStock: true },
      { id: 2, name: 'コットンT', price: 2980, image: 'https://picsum.photos/seed/p2/600/400', inStock: false },
      { id: 3, name: 'トートバッグ', price: 3480, image: 'https://picsum.photos/seed/p3/600/400', inStock: true }
    ];

    function render(items) {
      const list = document.getElementById('productList');
      list.innerHTML = '';
      items.forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-4';

        const card = document.createElement('div');
        card.className = 'card h-100';

        const wrap = document.createElement('div');
        wrap.className = 'position-relative';

        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.src = p.image; img.alt = p.name;

        const badge = document.createElement('span');
        badge.className = 'badge position-absolute top-0 start-0 m-2 ' + (p.inStock ? 'bg-success' : 'bg-secondary');
        badge.textContent = p.inStock ? '在庫あり' : '在庫なし';

        wrap.appendChild(img); wrap.appendChild(badge);

        const body = document.createElement('div');
        body.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title mb-1';
        title.textContent = p.name;

        const price = document.createElement('div');
        price.className = 'text-primary fw-bold mb-2';
        price.textContent = `¥${p.price.toLocaleString()}`;

        const soldOutMsg = document.createElement('div');
        soldOutMsg.className = 'text-danger d-none';
        soldOutMsg.textContent = '申し訳ありません、在庫切れです。';
        if (!p.inStock) soldOutMsg.classList.remove('d-none');

        body.appendChild(title); body.appendChild(price); body.appendChild(soldOutMsg);
        card.appendChild(wrap); card.appendChild(body); col.appendChild(card);
        list.appendChild(col);
      });
    }

    render(products);

    document.getElementById('toggleStock').addEventListener('click', () => {
      products.forEach(p => p.inStock = !p.inStock);
      render(products);
    });
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- `d-none` で文言の表示/非表示
- 在庫状態に応じたバッジ色の切替

## 🔍 コードの説明
- `render()` を再実行してUIを再生成（最小・確実）
- 状態 `inStock` をもとにUI分岐

## 📖 豆知識
- 小規模では再描画がシンプル。大規模は差分更新を検討

## ⚠️ 注意点
- 多重イベント登録に注意（本例はOK）

## 🛒 ECサイト制作で繋がるポイント
- 状態でのUI切替は、後のフィルタ/並び替え/検索・カートでも必須
