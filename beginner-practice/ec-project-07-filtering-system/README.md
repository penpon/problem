# EC-07: カテゴリ絞り込み（フィルターの最小実装）

## 🧩 学ぶタグ/プロパティ
- **カテゴリフィルター**: `<select>` と `change` イベント
- **配列フィルタ**: `Array.prototype.filter`
- **再描画**: 条件に応じて一覧を再レンダリング

## 🔁 前回の復習
- 状態に応じた表示切替（在庫・バッジ）
- 配列→カード描画の基礎

## 📌 重要なポイント
- データはそのまま、表示だけを条件で変える
- フィルター条件は1箇所に集約→再描画で反映

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-07 カテゴリ絞り込み</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-4">
    <h1 class="mb-3">カテゴリで商品を絞り込み</h1>

    <div class="row mb-3">
      <div class="col-12 col-md-4">
        <select id="category" class="form-select">
          <option value="">すべて</option>
          <option value="服">服</option>
          <option value="靴">靴</option>
          <option value="バッグ">バッグ</option>
        </select>
      </div>
    </div>

    <div class="row g-3" id="productList"></div>
  </div>

  <script>
    const products = [
      { id: 1, name: 'ベーシックT', price: 2980, category: '服', image: 'https://picsum.photos/seed/p1/600/400' },
      { id: 2, name: 'スニーカー', price: 4980, category: '靴', image: 'https://picsum.photos/seed/p2/600/400' },
      { id: 3, name: 'レザーバッグ', price: 8980, category: 'バッグ', image: 'https://picsum.photos/seed/p3/600/400' },
      { id: 4, name: 'シャツ', price: 3980, category: '服', image: 'https://picsum.photos/seed/p4/600/400' }
    ];

    function createCard(p) {
      const col = document.createElement('div');
      col.className = 'col-12 col-md-4';
      col.innerHTML = `
        <div class="card h-100">
          <img src="${p.image}" class="card-img-top" alt="${p.name}">
          <div class="card-body">
            <h5 class="card-title mb-1">${p.name}</h5>
            <div class="text-primary fw-bold mb-2">¥${p.price.toLocaleString()}</div>
            <span class="badge bg-secondary">${p.category}</span>
          </div>
        </div>`;
      return col;
    }

    function render(list) {
      const root = document.getElementById('productList');
      root.innerHTML = '';
      list.forEach(p => root.appendChild(createCard(p)));
    }

    function applyFilter() {
      const cat = document.getElementById('category').value;
      const filtered = cat ? products.filter(p => p.category === cat) : products;
      render(filtered);
    }

    document.getElementById('category').addEventListener('change', applyFilter);
    render(products);
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- `<select>` によるカテゴリ選択
- `filter()` で配列を絞り込み

## 🔍 コードの説明
- 条件を読み取り → フィルタ → `render()` で再描画

## 📖 豆知識
- フィルター・検索・ソートは「同じ描画土台」を共有すると実装がシンプル

## ⚠️ 注意点
- 該当なしの場合の空表示も正常動作（エラーなし）でOK

## 🛒 ECサイト制作で繋がるポイント
- カテゴリ別に商品を探せる基礎が完成
- 次は並び替え機能と組み合わせて利便性アップ
