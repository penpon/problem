# EC-10: 統合ギャラリー（検索×絞込×並び替え）

## 🧩 学ぶタグ/プロパティ
- **検索**: `input`、部分一致
- **カテゴリ絞込**: `<select>`、`change`
- **並び替え**: `<select>`、比較関数

## 🔁 前回の復習
- 検索、カテゴリ、ソートを個別に実装

## 📌 重要なポイント
- 条件はすべて1箇所で適用 → 結果を一括再描画
- 元配列は不変、都度コピーして操作

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-10 統合ギャラリー</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-4">
    <h1 class="mb-3">検索×カテゴリ×並び替え</h1>

    <div class="row g-2 mb-3">
      <div class="col-12 col-md-4">
        <input id="q" class="form-control" placeholder="検索..." />
      </div>
      <div class="col-6 col-md-4">
        <select id="category" class="form-select">
          <option value="">すべて</option>
          <option value="服">服</option>
          <option value="靴">靴</option>
          <option value="バッグ">バッグ</option>
        </select>
      </div>
      <div class="col-6 col-md-4">
        <select id="sort" class="form-select">
          <option value="">並び替えなし</option>
          <option value="price-asc">価格（安→高）</option>
          <option value="price-desc">価格（高→安）</option>
          <option value="name-asc">名前（A→Z）</option>
          <option value="name-desc">名前（Z→A）</option>
        </select>
      </div>
    </div>

    <div class="row g-3" id="productList"></div>
  </div>

  <script>
    const products = [
      { id: 1, name: 'ベーシックTシャツ', category: '服', price: 2980, image: 'https://picsum.photos/seed/p1/600/400' },
      { id: 2, name: 'カジュアルスニーカー', category: '靴', price: 4980, image: 'https://picsum.photos/seed/p2/600/400' },
      { id: 3, name: 'レザーバッグ', category: 'バッグ', price: 8980, image: 'https://picsum.photos/seed/p3/600/400' },
      { id: 4, name: 'シャツ', category: '服', price: 1980, image: 'https://picsum.photos/seed/p4/600/400' }
    ];

    function card(p) {
      const col = document.createElement('div');
      col.className = 'col-12 col-md-4';
      col.innerHTML = `
        <div class="card h-100">
          <img src="${p.image}" class="card-img-top" alt="${p.name}">
          <div class="card-body">
            <h5 class="card-title mb-1">${p.name}</h5>
            <div class="text-primary fw-bold mb-1">¥${p.price.toLocaleString()}</div>
            <span class="badge bg-secondary">${p.category}</span>
          </div>
        </div>`;
      return col;
    }

    function render(list) {
      const root = document.getElementById('productList');
      root.innerHTML = '';
      list.forEach(p => root.appendChild(card(p)));
    }

    function applyAll() {
      const term = document.getElementById('q').value.trim().toLowerCase();
      const cat = document.getElementById('category').value;
      const sort = document.getElementById('sort').value;

      let arr = [...products];
      if (term) arr = arr.filter(p => p.name.toLowerCase().includes(term));
      if (cat) arr = arr.filter(p => p.category === cat);

      const byNum = (k, dir=1) => (a,b) => (a[k]-b[k]) * dir;
      const byStr = (k, dir=1) => (a,b) => a[k].localeCompare(b[k], 'ja') * dir;
      if (sort === 'price-asc') arr.sort(byNum('price', +1));
      if (sort === 'price-desc') arr.sort(byNum('price', -1));
      if (sort === 'name-asc') arr.sort(byStr('name', +1));
      if (sort === 'name-desc') arr.sort(byStr('name', -1));

      render(arr);
    }

    document.getElementById('q').addEventListener('input', applyAll);
    document.getElementById('category').addEventListener('change', applyAll);
    document.getElementById('sort').addEventListener('change', applyAll);
    render(products);
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- 全条件をまとめて適用する `applyAll()`
- 検索→絞込→ソートの順に処理

## 🔍 コードの説明
- 条件変更ごとに `applyAll()` を呼んで再描画

## 📖 豆知識
- 条件の組合せが増えても「一次関数」を合成するように順次適用でOK

## ⚠️ 注意点
- 空結果（0件）時も正常終了（エラーなし）

## 🛒 ECサイト制作で繋がるポイント
- 実用的な商品一覧の核が完成。次は詳細・カートへ展開
