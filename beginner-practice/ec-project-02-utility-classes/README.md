# EC-02: スマホ/PCで切替（基本レスポンシブ）

## 🧩 学ぶタグ/プロパティ
- **グリッドのブレークポイント**: `col-12 col-md-4`
- **余白ユーティリティ**: `g-3`, `mb-3`
- **アラート**: `.alert`

## 🔁 前回の復習
- `container` / `row` / `col-*` の基本
- `.card` コンポーネントの使い方

## 📌 重要なポイント
- 画面幅に応じてカラムを切替える: 小画面=1列, 中画面以上=3列
- コンポーネント間の余白はユーティリティクラスで調整

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-02 レスポンシブ切替</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-4">
    <h1 class="mb-3">📱→🖥️ 自動でレイアウトが変わる</h1>
    <div class="alert alert-info">幅を縮めたり広げたりして挙動を確認しよう</div>

    <div class="row g-3">
      <div class="col-12 col-md-4">
        <div class="card h-100">
          <img src="https://picsum.photos/seed/p1/600/400" class="card-img-top" alt="商品1">
          <div class="card-body">
            <h5 class="card-title">商品1</h5>
            <p class="card-text">小画面では1列、広い画面で3列。</p>
            <a href="#" class="btn btn-primary">購入する</a>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card h-100">
          <img src="https://picsum.photos/seed/p2/600/400" class="card-img-top" alt="商品2">
          <div class="card-body">
            <h5 class="card-title">商品2</h5>
            <p class="card-text">`col-12 col-md-4` を使用。</p>
            <a href="#" class="btn btn-success">購入する</a>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="card h-100">
          <img src="https://picsum.photos/seed/p3/600/400" class="card-img-top" alt="商品3">
          <div class="card-body">
            <h5 class="card-title">商品3</h5>
            <p class="card-text">カード間の余白は `g-3`。</p>
            <a href="#" class="btn btn-warning">購入する</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- ブレークポイント指定 `col-12 col-md-4`
- 行・列のギャップ `g-3`

## 🔍 コードの説明
- `col-12`: 小画面で全幅（縦並び）
- `col-md-4`: 中画面以上で 3 分割
- `g-3`: 同一行の列間余白

## 📖 豆知識
- Bootstrap のブレークポイント: `sm`/`md`/`lg`/`xl`/`xxl`
- 最初は `md` 基準でOK。後続回で細かく最適化

## ⚠️ 注意点
- 画像の縦横比が揃わないと視覚的に崩れる → サンプルでは `picsum` 固定サイズで安定

## 🛒 ECサイト制作で繋がるポイント
- 同一レイアウトで端末に最適化 → 実運用で最重要
- 後続の検索/並び替え機能でもこの土台に描画していく
