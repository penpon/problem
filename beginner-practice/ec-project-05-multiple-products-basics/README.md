# EC-05: 複数商品の基本（配列→カード描画）

## 🧩 学ぶタグ/プロパティ
- **配列/オブジェクト**: 複数商品のデータ構造
- **DOM操作**: `document.getElementById`, `createElement`, `appendChild`
- **クラス付与**: `className`

## 🔁 前回の復習
- カートに追加→個数バッジが増える最小実装
- `.card` による統一レイアウト

## 📌 重要なポイント
- データ（配列）と表示（DOM）の分離
- ループでカードを量産（商品数が増えてもスケール）
- テキスト反映は `textContent` を基本

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-05 複数商品の基本</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">🛍️ My Shop</a>
      <div class="text-white">🛒 カート <span class="badge bg-warning text-dark" id="cartCount">0</span></div>
    </div>
  </nav>

  <div class="container py-4">
    <h1 class="mb-3">配列から商品カードを生成</h1>
    <div class="row g-3" id="productList"></div>
  </div>

  <script>
    // 1) データ: 配列 + オブジェクト
    const products = [
      { id: 1, name: 'ベーシックマグ', price: 1200, image: 'https://picsum.photos/seed/p1/600/400' },
      { id: 2, name: 'コットンT', price: 2980, image: 'https://picsum.photos/seed/p2/600/400' },
      { id: 3, name: 'トートバッグ', price: 3480, image: 'https://picsum.photos/seed/p3/600/400' }
    ];

    // 2) 最小のカート数（永続化なし）
    let cartCount = 0;
    const cartCountEl = document.getElementById('cartCount');

    // 3) 1商品カードを生成する関数（textContent中心）
    function createProductCard(p) {
      const col = document.createElement('div');
      col.className = 'col-12 col-md-4';

      const card = document.createElement('div');
      card.className = 'card h-100';

      const img = document.createElement('img');
      img.className = 'card-img-top';
      img.src = p.image;
      img.alt = p.name;

      const body = document.createElement('div');
      body.className = 'card-body';

      const title = document.createElement('h5');
      title.className = 'card-title mb-1';
      title.textContent = p.name;

      const price = document.createElement('div');
      price.className = 'text-primary fw-bold mb-2';
      price.textContent = `¥${p.price.toLocaleString()}`;

      const btn = document.createElement('button');
      btn.className = 'btn btn-primary w-100';
      btn.textContent = '🛒 カートに追加';
      btn.addEventListener('click', () => {
        cartCount += 1;
        cartCountEl.textContent = String(cartCount);
      });

      body.appendChild(title);
      body.appendChild(price);
      body.appendChild(btn);

      card.appendChild(img);
      card.appendChild(body);
      col.appendChild(card);
      return col;
    }

    // 4) 一覧へ描画
    const list = document.getElementById('productList');
    products.forEach(p => list.appendChild(createProductCard(p)));
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- 商品配列 → ループで `.card` を量産
- `createProductCard()` でカード生成を関数化

## 🔍 コードの説明
- データを変更しても UI は自動で追従（ループで描画）
- `textContent` を基本に安全に値を反映
- イベントは各ボタンに個別付与（後続で委任も学習）

## 📖 豆知識
- データと描画の分離は、今後の検索/絞り込み/並び替えで効果大
- 価格の表示は `toLocaleString()` で桁区切り

## ⚠️ 注意点
- 大量データ時は一括描画・仮想化を後続回で検討
- 画像の `alt` は商品名など意味のある文言に

## 🛒 ECサイト制作で繋がるポイント
- 複数商品の土台が完成。次は絞り込み/並び替え/検索へ展開
