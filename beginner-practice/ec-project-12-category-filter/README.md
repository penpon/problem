# EC-12: 複合フィルター（カテゴリ×在庫）

## 🧩 学ぶタグ/プロパティ
- 複数条件のフィルター適用
- チェックボックス: `<input type="checkbox">`
- バッジ表示の組み合わせ

## 🔁 前回の復習
- 単一カテゴリの絞り込み

## 📌 重要なポイント
- 条件は配列に保持し、まとめて適用→再描画
- 条件未指定は全件

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-12 複合フィルター</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-4">
    <h1 class="mb-3">カテゴリ×在庫の複合フィルター</h1>

    <div class="row g-2 mb-3">
      <div class="col-12 col-md-4">
        <select id="category" class="form-select">
          <option value="">すべて</option>
          <option value="服">服</option>
          <option value="靴">靴</option>
          <option value="バッグ">バッグ</option>
        </select>
      </div>
      <div class="col-12 col-md-4 d-flex align-items-center">
        <input id="onlyStock" type="checkbox" class="form-check-input me-2">
        <label for="onlyStock" class="form-check-label">在庫ありのみ</label>
      </div>
    </div>

    <div class="row g-3" id="productList"></div>
  </div>

  <script>
    const products = [
      { id: 1, name: 'ベーシックT', price: 2980, category: '服', inStock: true, image: 'https://picsum.photos/seed/p1/600/400' },
      { id: 2, name: 'スニーカー', price: 4980, category: '靴', inStock: false, image: 'https://picsum.photos/seed/p2/600/400' },
      { id: 3, name: 'レザーバッグ', price: 8980, category: 'バッグ', inStock: true, image: 'https://picsum.photos/seed/p3/600/400' }
    ];

    function card(p){
      const col = document.createElement('div');
      col.className = 'col-12 col-md-4';
      col.innerHTML = `
        <div class="card h-100">
          <div class="position-relative">
            <img src="${p.image}" class="card-img-top" alt="${p.name}">
            <span class="badge ${p.inStock? 'bg-success':'bg-secondary'} position-absolute top-0 start-0 m-2">${p.inStock? '在庫あり':'在庫なし'}</span>
          </div>
          <div class="card-body">
            <h5 class="card-title mb-1">${p.name}</h5>
            <div class="text-primary fw-bold mb-1">¥${p.price.toLocaleString()}</div>
            <span class="badge bg-secondary">${p.category}</span>
          </div>
        </div>`;
      return col;
    }

    function render(list){
      const root = document.getElementById('productList');
      root.innerHTML = '';
      list.forEach(p => root.appendChild(card(p)));
    }

    function apply(){
      const cat = document.getElementById('category').value;
      const only = document.getElementById('onlyStock').checked;
      let arr = [...products];
      if (cat) arr = arr.filter(p => p.category === cat);
      if (only) arr = arr.filter(p => p.inStock);
      render(arr);
    }

    document.getElementById('category').addEventListener('change', apply);
    document.getElementById('onlyStock').addEventListener('change', apply);
    render(products);
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- チェックボックスによる在庫条件

## 🔍 コードの説明
- 条件を順に適用 → 最終結果だけ描画

## 📖 豆知識
- 条件が増えたら関数分割（`applyFilters(list, conditions)`）で整理

## ⚠️ 注意点
- 条件未指定時に全件表示

## 🛒 ECサイト制作で繋がるポイント
- 実用的な一覧のフィルタリングの核
