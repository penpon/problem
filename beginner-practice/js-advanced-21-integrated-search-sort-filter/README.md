# 🧩 まとめ練習 - 検索 + カテゴリ + ソート

## **🧩 学ぶタグ/プロパティ**
- `input` / `select` / `button`
- `Array.prototype.filter` / `sort` / `includes`
- `textContent` / `createElement`

## **🔁 前回の復習**
- 検索（js-advanced-03）
- 価格ソート（js-advanced-04）
- 配列からカードを生成（js-advanced-11, 19）

## **📌 重要なポイント**
- キーワード/カテゴリ/ソートを組み合わせた結果をレンダリング
- DOM 更新は毎回全クリア→再構築（小規模でシンプル）
- 文言は `textContent` で安全に出力

## **🧪 例題**
HTML:
```html
<div class="controls">
  <input id="searchInput" type="text" placeholder="商品名で検索" />
  <select id="categorySelect">
    <option value="all">すべて</option>
    <option value="camera">カメラ</option>
    <option value="accessory">アクセサリ</option>
  </select>
  <select id="sortSelect">
    <option value="price-asc">価格: 安い順</option>
    <option value="price-desc">価格: 高い順</option>
  </select>
  <button id="applyBtn" type="button">反映</button>
  <div class="meta">件数: <span id="countText">0</span></div>
</div>
<div id="productList"></div>
```
JS:
```js
const products = [
  { title: 'Pro Camera', price: 49800, category: 'camera' },
  { title: 'Mini Tripod', price: 1800, category: 'accessory' }
];
function render(items){ /* ... */ }
```

## **✨ 新しく追加された部分**
- 複合フィルタ（検索 + カテゴリ）
- ソート切り替え（昇順/降順）

## **🔍 コードの説明**
- `filterAndSort()` で条件をまとめて適用
- `render()` でDOMをクリアしてから再描画

## **📖 豆知識**
- `toLocaleString()` でカンマ区切り表示

## **⚠️ 注意点**
- `innerHTML +=` はXSS/パフォーマンス面で避ける

## **🛒 ECサイト制作で繋がるポイント**
- 一覧画面の検索・カテゴリ絞り込み・価格ソートの基本形
