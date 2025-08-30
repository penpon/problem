# EC-20: 完成版ミニEC（一覧×検索×絞込×並び替え×カート）

## 🧩 学ぶタグ/プロパティ
- 一覧/検索/絞込/並び替え/カートの統合
- 状態管理の基本パターン（単一ソース）
- BootstrapのレイアウトとフォームUI

## 🔁 前回の復習
- 認証モック、管理ログ、チェックアウト分割、ミニカート

## 📌 重要なポイント
- 元データ（products）と状態（filters, sort, cart）を分離
- UIは毎回「描画関数」で再構築し一貫性を担保

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-20 完成版ミニEC</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-4">
    <h1 class="mb-3">完成版ミニEC</h1>

    <div class="row g-2 mb-3">
      <div class="col-12 col-md-4">
        <input id="q" class="form-control" placeholder="検索（商品名）">
      </div>
      <div class="col-6 col-md-4">
        <select id="category" class="form-select">
          <option value="">カテゴリ: すべて</option>
          <option value="服">服</option>
          <option value="靴">靴</option>
          <option value="バッグ">バッグ</option>
        </select>
      </div>
      <div class="col-6 col-md-4">
        <select id="sort" class="form-select">
          <option value="">並び替え: なし</option>
          <option value="price-asc">価格（安→高）</option>
          <option value="price-desc">価格（高→安）</option>
          <option value="name-asc">名前（A→Z）</option>
          <option value="name-desc">名前（Z→A）</option>
        </select>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-lg-8">
        <div id="list" class="row g-3"></div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span>🛒 カート</span>
            <span class="badge bg-primary" id="count">0</span>
          </div>
          <ul class="list-group list-group-flush" id="cart"></ul>
          <div class="card-body d-flex justify-content-between">
            <strong>合計</strong>
            <strong>¥<span id="total">0</span></strong>
          </div>
          <div class="card-body pt-0">
            <button id="checkout" class="btn btn-success w-100" disabled>チェックアウトへ</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // --- データ ---
    const products = [
      { id: 1, name: 'ベーシックTシャツ', category: '服', price: 2980, image: 'https://picsum.photos/seed/p1/600/400' },
      { id: 2, name: 'カジュアルスニーカー', category: '靴', price: 4980, image: 'https://picsum.photos/seed/p2/600/400' },
      { id: 3, name: 'レザーバッグ', category: 'バッグ', price: 8980, image: 'https://picsum.photos/seed/p3/600/400' },
      { id: 4, name: 'シャツ', category: '服', price: 1980, image: 'https://picsum.photos/seed/p4/600/400' }
    ];

    // --- 状態 ---
    const state = {
      q: '',
      category: '',
      sort: '',
      cart: [] // {id, name, price, qty}
    };

    // --- ユーティリティ ---
    const byNum = (k, dir=1) => (a,b) => (a[k]-b[k]) * dir;
    const byStr = (k, dir=1) => (a,b) => a[k].localeCompare(b[k], 'ja') * dir;

    function filteredSorted(){
      let arr = [...products];
      const t = state.q.trim().toLowerCase();
      if (t) arr = arr.filter(p => p.name.toLowerCase().includes(t));
      if (state.category) arr = arr.filter(p => p.category === state.category);
      const s = state.sort;
      if (s === 'price-asc') arr.sort(byNum('price', +1));
      if (s === 'price-desc') arr.sort(byNum('price', -1));
      if (s === 'name-asc') arr.sort(byStr('name', +1));
      if (s === 'name-desc') arr.sort(byStr('name', -1));
      return arr;
    }

    // --- 描画 ---
    function renderList(){
      const root = document.getElementById('list');
      root.innerHTML = '';
      filteredSorted().forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6';
        col.innerHTML = `
          <div class="card h-100">
            <img src="${p.image}" class="card-img-top" alt="${p.name}">
            <div class="card-body d-flex justify-content-between align-items-start">
              <div>
                <h5 class="card-title mb-1">${p.name}</h5>
                <div class="text-primary fw-bold">¥${p.price.toLocaleString()}</div>
                <span class="badge bg-secondary">${p.category}</span>
              </div>
              <button class="btn btn-sm btn-primary add" data-id="${p.id}">追加</button>
            </div>
          </div>`;
        root.appendChild(col);
      });
    }

    function renderCart(){
      const ul = document.getElementById('cart');
      ul.innerHTML = '';
      let total = 0; let count = 0;
      state.cart.forEach(item => {
        const sub = item.price * item.qty; total += sub; count += item.qty;
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
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
        ul.appendChild(li);
      });
      document.getElementById('total').textContent = total.toLocaleString();
      document.getElementById('count').textContent = count;
      document.getElementById('checkout').disabled = state.cart.length === 0;
    }

    function render(){
      renderList();
      renderCart();
    }

    // --- カート操作 ---
    function addToCart(id){
      const p = products.find(x => x.id == id);
      const hit = state.cart.find(x => x.id == id);
      if (hit) hit.qty += 1; else state.cart.push({ id:p.id, name:p.name, price:p.price, qty:1 });
      renderCart();
    }
    function changeQty(id, delta){
      const i = state.cart.findIndex(x => x.id == id);
      if (i === -1) return;
      state.cart[i].qty += delta;
      if (state.cart[i].qty <= 0) state.cart.splice(i,1);
      renderCart();
    }

    // --- イベント ---
    document.getElementById('q').addEventListener('input', e => { state.q = e.target.value; renderList(); });
    document.getElementById('category').addEventListener('change', e => { state.category = e.target.value; renderList(); });
    document.getElementById('sort').addEventListener('change', e => { state.sort = e.target.value; renderList(); });

    document.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      if (e.target.classList.contains('add')) addToCart(id);
      if (e.target.classList.contains('inc')) changeQty(id, +1);
      if (e.target.classList.contains('dec')) changeQty(id, -1);
      if (e.target.classList.contains('del')) changeQty(id, -9999);
    });

    document.getElementById('checkout').addEventListener('click', () => {
      const total = state.cart.reduce((s, x) => s + x.price * x.qty, 0);
      const count = state.cart.reduce((s, x) => s + x.qty, 0);
      alert(`仮チェックアウト\n点数: ${count}\n合計: ¥${total.toLocaleString()}`);
    });

    // 初期描画
    render();
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- 検索/絞込/並び替え/カートの統合と状態管理

## 🔍 コードの説明
- `state` に検索/絞込/並び替え/カートを集約し、`render*` でUIを同期

## 📖 豆知識
- 小規模なら「単一状態 + 再描画」パターンが最もシンプル

## ⚠️ 注意点
- 実運用では在庫同期/価格改定/非同期通信/認証などと連携が必要

## 🛒 ECサイト制作で繋がるポイント
- ここまでの学びを統合した最小プロトタイプ。次はAPI接続や永続化へ拡張
