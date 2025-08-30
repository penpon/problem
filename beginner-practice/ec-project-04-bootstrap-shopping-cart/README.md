# EC-04: カート導入（カウント表示と追加ボタン）

## 🧩 学ぶタグ/プロパティ
- **ナビバー**: `.navbar`, `.navbar-brand`, `.badge`
- **ボタン**: `.btn`, `.btn-*`
- **テキスト反映**: `textContent`（セキュアなDOM更新）

## 🔁 前回の復習
- 商品カード（価格・バッジ・評価）
- 3カラムのレスポンシブグリッド

## 📌 重要なポイント
- 「カートに追加」→ ヘッダーのカート個数を増やす最小実装
- 永続化はまだしない（ページを更新するとリセットでOK）
- UIの反応があること（ユーザー行動の手応え）

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-04 カート導入（最小）</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">🛍️ My Shop</a>
      <div class="text-white">
        🛒 カート
        <span class="badge bg-warning text-dark" id="cartCount">0</span>
      </div>
    </div>
  </nav>

  <div class="container py-4">
    <h1 class="mb-3">カートに追加してみよう</h1>

    <div class="row g-3">
      <div class="col-12 col-md-4">
        <div class="card h-100">
          <img src="https://picsum.photos/seed/p1/600/400" class="card-img-top" alt="商品1">
          <div class="card-body">
            <h5 class="card-title mb-1">ベーシックマグ</h5>
            <div class="text-primary fw-bold mb-2">¥1,200</div>
            <button class="btn btn-primary w-100 add-to-cart">🛒 カートに追加</button>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="card h-100">
          <img src="https://picsum.photos/seed/p2/600/400" class="card-img-top" alt="商品2">
          <div class="card-body">
            <h5 class="card-title mb-1">コットンT</h5>
            <div class="text-primary fw-bold mb-2">¥2,980</div>
            <button class="btn btn-success w-100 add-to-cart">🛒 カートに追加</button>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="card h-100">
          <img src="https://picsum.photos/seed/p3/600/400" class="card-img-top" alt="商品3">
          <div class="card-body">
            <h5 class="card-title mb-1">トートバッグ</h5>
            <div class="text-primary fw-bold mb-2">¥3,480</div>
            <button class="btn btn-warning w-100 add-to-cart">🛒 カートに追加</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // 最小の状態管理（永続化しない）
    let cartCount = 0;
    const cartCountEl = document.getElementById('cartCount');

    document.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart')) {
        cartCount += 1;
        cartCountEl.textContent = cartCount.toString(); // セキュアに反映
      }
    });
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- ヘッダーに「カート個数」バッジを配置
- 「カートに追加」ボタンをクリックでカウント+1

## 🔍 コードの説明
- `textContent` で数値を反映（XSSリスクなし）
- イベント委任（`document.addEventListener`）でボタンを一括ハンドリング

## 📖 豆知識
- まずは「反応があるUI」を作ることが学習効率を上げる
- 後続で数量、明細、合計などを段階的に追加予定

## ⚠️ 注意点
- 今回は永続化しない（リロードで0に戻る想定）
- 複数箇所から更新する場合に備え、DOM参照は一度取得して使い回す

## 🛒 ECサイト制作で繋がるポイント
- カートの存在をユーザーに示す最小UIが完成
- 次回以降で「複数商品の追加・一覧表示」へ発展
