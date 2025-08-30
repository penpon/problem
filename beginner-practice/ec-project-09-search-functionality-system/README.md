# EC-09: 検索機能（商品名を部分一致）

## 🧩 学ぶタグ/プロパティ
- **検索UI**: `<input type="text">`
- **イベント**: `input` イベントで即時反映
- **配列フィルタ**: `String.prototype.includes()`

## 🔁 前回の復習
- 並び替え（価格/名前）と再描画

## 📌 重要なポイント
- 小文字化して大文字小文字を吸収
- 条件は1箇所に集約 → 再描画

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-09 検索（部分一致）</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-4">
    <h1 class="mb-3">商品検索（名前で部分一致）</h1>

    <div class="row g-3 mb-2">
      <div class="col-12 col-md-6">
        <input id="q" class="form-control" placeholder="キーワードを入力..." />
      </div>
    </div>

    <div class="row g-3" id="productList"></div>
  </div>

  <script>
    const products = [
      { id: 1, name: 'ベーシックTシャツ', price: 2980, image: 'https://picsum.photos/seed/p1/600/400' },
      { id: 2, name: 'カジュアルスニーカー', price: 4980, image: 'https://picsum.photos/seed/p2/600/400' },
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

    function applySearch() {
      const term = document.getElementById('q').value.trim().toLowerCase();
      const filtered = term ? products.filter(p => p.name.toLowerCase().includes(term)) : products;
      render(filtered);
    }

    document.getElementById('q').addEventListener('input', applySearch);
    render(products);
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- `input` イベントで即時検索
- 大文字小文字の差異を吸収

## 🔍 コードの説明
- 入力取得 → 正規化（`toLowerCase`）→ `includes` で部分一致

## 📖 豆知識
- 日本語IMEの変換途中はイベントが多く発火 → 実案件はデバウンスを検討

## ⚠️ 注意点
- 空文字は全件表示でOK

## 🛒 ECサイト制作で繋がるポイント
- 探しやすさ向上。カテゴリ/ソートとの併用で利便性UP
