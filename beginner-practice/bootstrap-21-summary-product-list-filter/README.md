# 🧠 まとめ練習 - EC商品一覧＋フィルタ

## 🧩 学ぶタグ/プロパティ
- Grid（`.row` と `.col-*`）
- フォーム（`.form-select` / `.form-check-input`）
- ナビバー（`.navbar`）
- カード（`.card`）
- ユーティリティ（`.text-primary` `.h5` `.badge` 等）

## 🔁 前回の復習
- 画像付きカードの作成
- 検索欄・カテゴリ選択・チェックボックスの配置
- レスポンシブなカラム分割

## 📌 重要なポイント
- コントロール（カテゴリ/在庫/並び替え）を横並び（`md:3列`）
- 商品カードは `sm:1` `md:2` `lg:3` 列
- 価格は視覚強調（`.text-primary` や太字）

## 🧪 例題
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
<div class="container my-3">
  <div class="row g-2 mb-3">
    <div class="col-12 col-md-4"><select class="form-select"><option>カテゴリ</option></select></div>
    <div class="col-12 col-md-4"><input class="form-check-input" type="checkbox"> 在庫あり</div>
    <div class="col-12 col-md-4"><select class="form-select"><option>並び替え</option></select></div>
  </div>
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4 mb-3">
      <div class="card h-100">
        <img class="card-img-top" src="https://picsum.photos/400/250?1">
        <div class="card-body">
          <h5 class="card-title">商品A</h5>
          <p class="price h5 text-primary">¥1,980</p>
          <span class="badge bg-secondary">家電</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

## ✨ 新しく追加された部分
- 3種のフィルタUIとカードグリッドを1ページで統合

## 🔍 コードの説明
- `.row.g-2` で要素間の余白を統一
- `.card.h-100` で高さ揃え

## 📖 豆知識
- フォーム要素の `label` と `for` を揃えるとアクセシビリティが向上

## ⚠️ 注意点
- 本課題ではJSによる実動フィルタは不要（UI構成を完成させる）

## 🛒 ECサイト制作で繋がるポイント
- カテゴリ/在庫/並び替えUIはECの基礎。後続でJSロジックを追加して実用化できる
