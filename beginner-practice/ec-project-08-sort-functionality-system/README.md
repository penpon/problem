# EC-08: 並び替え（価格/名前の昇順・降順）

## 🧩 学ぶタグ/プロパティ
- **セレクトUI**: `<select>` によるソート条件選択
- **配列ソート**: `Array.prototype.sort`
- **複合キー**: 価格・名前の昇順/降順

## 🔁 前回の復習
- カテゴリでの絞り込みと再描画

## 📌 重要なポイント
- ソートはデータ順序の入れ替え → 再描画
- 比較関数で昇順/降順を切替

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-08 並び替え</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-4">
    <h1 class="mb-3">並び替え（価格/名前）</h1>

    <div class="row g-3 mb-2">
      <div class="col-12 col-md-4">
        <select id="sort" class="form-select">
          <option value="">並び替えなし</option>
          <option value="price-asc">価格（安い→高い）</option>
          <option value="price-desc">価格（高い→安い）</option>
          <option value="name-asc">名前（A→Z）</option>
          <option value="name-desc">名前（Z→A）</option>
        </select>
      </div>
    </div>

    <div class="row g-3" id="productList"></div>
  </div>

  <script>
    const products = [
      { id: 1, name: 'ベーシックT', price: 2980, image: 'https://picsum.photos/seed/p1/600/400' },
      { id: 2, name: 'スニーカー', price: 4980, image: 'https://picsum.photos/seed/p2/600/400' },
      { id: 3, name: 'レザーバッグ', price: 8980, image: 'https://picsum.photos/seed/p3/600/400' },
      { id: 4, name: 'シャツ', price: 1980, image: 'https://picsum.photos/seed/p4/600/400' }
    ];

    function card(p) {
      const col = document.createElement('div');
      col.className = 'col-12 col-md-4';
      col.innerHTML = `
        <div class="card h-100">
          <img src="${p.image}" class="card-img-top" alt="${p.name}">
          <div class="card-body">
            <h5 class="card-title mb-1">${p.name}</h5>
            <div class="text-primary fw-bold">¥${p.price.toLocaleString()}</div>
          </div>
        </div>`;
      return col;
    }

    function render(list) {
      const root = document.getElementById('productList');
      root.innerHTML = '';
      list.forEach(p => root.appendChild(card(p)));
    }

    function applySort() {
      const v = document.getElementById('sort').value;
      const arr = [...products];
      const byNum = (k, dir=1) => (a,b) => (a[k]-b[k]) * dir;
      const byStr = (k, dir=1) => (a,b) => a[k].localeCompare(b[k], 'ja') * dir;
      if (v === 'price-asc') arr.sort(byNum('price', +1));
      if (v === 'price-desc') arr.sort(byNum('price', -1));
      if (v === 'name-asc') arr.sort(byStr('name', +1));
      if (v === 'name-desc') arr.sort(byStr('name', -1));
      render(arr);
    }

    document.getElementById('sort').addEventListener('change', applySort);
    render(products);
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- セレクトで条件選択 → 比較関数でソート

## 🔍 コードの説明
- 元配列は不変にし、コピー `[...]` を並び替えて描画

## 📖 豆知識
- 文字列比較は `localeCompare('ja')` で日本語も自然順

## ⚠️ 注意点
- ソート後は必ず再描画。

## 🛒 ECサイト制作で繋がるポイント
- 探しやすさ向上。検索・カテゴリと併用予定
