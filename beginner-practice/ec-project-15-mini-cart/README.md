# EC-15: ミニカート（明細と合計）

## 🧩 学ぶタグ/プロパティ
- カート配列と数量: `id/price/qty`
- 合計金額の再計算
- イベント委任: 追加/±/削除

## 🔁 前回の復習
- 配列→カード描画、カウント増加

## 📌 重要なポイント
- 単一のソース（cart配列）からUIを毎回再描画
- 小計=price×qty、合計=小計の合算

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-15 ミニカート</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-4">
    <h1 class="mb-3">ミニカート（明細と合計）</h1>

    <div class="row g-3">
      <div class="col-12 col-lg-8">
        <div class="row g-3" id="products"></div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card">
          <div class="card-header">🛒 カート</div>
          <ul class="list-group list-group-flush" id="cartList"></ul>
          <div class="card-body d-flex justify-content-between">
            <strong>合計</strong>
            <strong>¥<span id="grand">0</span></strong>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const products = [
      { id: 1, name: 'マグ', price: 1200 },
      { id: 2, name: 'Tシャツ', price: 2980 },
      { id: 3, name: 'バッグ', price: 3480 }
    ];
    const cart = [];

    function renderProducts(){
      const root = document.getElementById('products');
      root.innerHTML = '';
      products.forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6';
        col.innerHTML = `
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title mb-1">${p.name}</h5>
              <div class="text-primary fw-bold mb-2">¥${p.price.toLocaleString()}</div>
              <button class="btn btn-primary add" data-id="${p.id}">カートに追加</button>
            </div>
          </div>`;
        root.appendChild(col);
      });
    }

    function renderCart(){
      const list = document.getElementById('cartList');
      list.innerHTML = '';
      let total = 0;
      cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        const sub = item.price * item.qty; total += sub;
        li.innerHTML = `
          <div>
            <div class="fw-bold">${item.name}</div>
            <div class="text-muted">¥${item.price.toLocaleString()} × ${item.qty} = ¥${sub.toLocaleString()}</div>
          </div>
          <div class="btn-group">
            <button class="btn btn-sm btn-outline-secondary dec" data-id="${item.id}">-</button>
            <button class="btn btn-sm btn-outline-secondary inc" data-id="${item.id}">+</button>
            <button class="btn btn-sm btn-outline-danger del" data-id="${item.id}">✕</button>
          </div>`;
        list.appendChild(li);
      });
      document.getElementById('grand').textContent = total.toLocaleString();
    }

    function addToCart(id){
      const p = products.find(x => x.id == id);
      const hit = cart.find(x => x.id == id);
      if (hit) hit.qty += 1; else cart.push({ ...p, qty: 1 });
      renderCart();
    }

    function changeQty(id, delta){
      const i = cart.findIndex(x => x.id == id);
      if (i === -1) return;
      cart[i].qty += delta;
      if (cart[i].qty <= 0) cart.splice(i,1);
      renderCart();
    }

    document.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      if (e.target.classList.contains('add')) addToCart(id);
      if (e.target.classList.contains('inc')) changeQty(id, +1);
      if (e.target.classList.contains('dec')) changeQty(id, -1);
      if (e.target.classList.contains('del')) changeQty(id, -9999);
    });

    renderProducts();
    renderCart();
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- 明細リストと小計/合計の表示
- 数量の±と削除

## 🔍 コードの説明
- `cart` を唯一の真実としUIを再描画

## 📖 豆知識
- 金額は常に表示直前で計算→一貫性が保てる

## ⚠️ 注意点
- マイナス数量を許さない防御

## 🛒 ECサイト制作で繋がるポイント
- チェックアウト画面へつなぐ準備が整う
