# EC-01: レスポンシブ土台（Bootstrap導入と3カラム）

## 🧩 学ぶタグ/プロパティ
- **Bootstrap CDN**（CSS/JS）
- **グリッドの基本**: `container` / `row` / `col-4`
- **カード**: `.card`, `.card-body`, `.btn`

## 🔁 前回の復習
- HTML の基本構造（`<!DOCTYPE html>` / `<head>` / `<body>`）
- 画像の表示とテキストの配置

## 📌 重要なポイント
- Bootstrap は 12 カラム制。`col-4` × 3 = 12 で3列レイアウト
- 幅が狭い画面では自動的に縦並び（最小限のレスポンシブ）
- まずは「動く土台」を作り、後続回で機能を積み上げる

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-01 商品ギャラリー（土台）</title>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-4">
    <h1 class="mb-3">🛍️ 商品ギャラリー（3カラム）</h1>
    <p class="text-muted">Bootstrap のグリッドで 3 つのカードを並べてみよう</p>

    <div class="row g-3">
      <div class="col-12 col-md-4">
        <div class="card h-100">
          <img src="https://picsum.photos/seed/p1/600/400" class="card-img-top" alt="商品1">
          <div class="card-body">
            <h5 class="card-title">商品1</h5>
            <p class="card-text">シンプルで使いやすいアイテム。</p>
            <a href="#" class="btn btn-primary">購入する</a>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="card h-100">
          <img src="https://picsum.photos/seed/p2/600/400" class="card-img-top" alt="商品2">
          <div class="card-body">
            <h5 class="card-title">商品2</h5>
            <p class="card-text">日常をちょっと良くするアイテム。</p>
            <a href="#" class="btn btn-success">購入する</a>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="card h-100">
          <img src="https://picsum.photos/seed/p3/600/400" class="card-img-top" alt="商品3">
          <div class="card-body">
            <h5 class="card-title">商品3</h5>
            <p class="card-text">ギフトにも最適な定番。</p>
            <a href="#" class="btn btn-warning">購入する</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- CDN で **Bootstrap** を導入
- `row` と `col-4`（実装では `col-12 col-md-4` にして最小レスポンシブ）
- `.card` コンポーネントで商品カードの形を統一

## 🔍 コードの説明
- `<link ... bootstrap.min.css>`: Bootstrap のスタイルを読み込み
- `.container`/`.row`/`.col-12 .col-md-4`: 画面幅に応じて 1 → 3 カラム
- `.card` + `.btn`: 部品化された UI を安全に流用

## 📖 豆知識
- 「12 カラム制」は Web レイアウトの定番。3 等分なら 4、4 等分なら 3 を使う
- 画像は `picsum.photos` のシード固定で安定表示

## ⚠️ 注意点
- CDN の `<link>`/`<script>` を必ず `<head>`/`</body>` 直前に正しく配置
- 画像の `alt` を設定し、アクセシビリティを担保

## 🛒 ECサイト制作で繋がるポイント
- 商品カードの「土台」はこの回で完成
- 次回以降で価格・バッジ・評価・検索/絞り込み・カートへと徐々に拡張
