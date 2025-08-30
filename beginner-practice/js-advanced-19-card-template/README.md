# カードテンプレ（配列→カード生成）

## 🧩 学ぶタグ/プロパティ
- 安全な文字列挿入：`textContent`
- 要素生成：`document.createElement` / `appendChild`
- 状態表示の更新（`#statusText`）

## 🔁 前回の復習
- `map().join('')` と `innerHTML` による一括描画（固定データのみ）
- クリックイベントと関数分割（`renderCards()` など）

## 📌 重要なポイント
- `#generateBtn` クリックで `products` 配列からカードを生成
- `.card` 内に `.card-title` と `.card-price` を作り、`textContent` で安全に挿入
- 生成完了後に `#statusText` を「生成済み」に更新
- 連結 `innerHTML` は使用せず、作成した要素を `appendChild` する

## 🧪 例題
HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>js-advanced-19 カードテンプレ</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>カードテンプレ（配列→カード生成）</h1>

    <div class="controls">
      <button id="generateBtn" type="button">生成</button>
      <div class="meta">状態: <span id="statusText">未生成</span></div>
    </div>

    <div id="cardList" class="card-list" aria-live="polite"></div>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

CSS
```css
body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;margin:16px}
.container{max-width:900px;margin:auto}
.controls{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin:12px 0}
button{padding:8px 12px;border:1px solid #ccc;border-radius:6px;background:#f8f8f8}
.meta{color:#666}
.card-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;margin-top:12px}
.card{border:1px solid #e5e7eb;border-radius:8px;padding:12px;background:#fff}
.card-title{font-weight:600;margin-bottom:4px}
.card-price{color:#0a7}
```

JavaScript
```js
const products = [
  { id: 1, title: 'Pro Camera', price: 49800 },
  { id: 2, title: 'Light Stand', price: 3200 },
  { id: 3, title: 'Mini Tripod', price: 1800 },
  { id: 4, title: 'Pro Light', price: 9800 }
];

const $btn = document.getElementById('generateBtn');
const $list = document.getElementById('cardList');
const $status = document.getElementById('statusText');

function renderCards(items){
  $list.innerHTML = '';
  for (const item of items){
    const card = document.createElement('div');
    card.className = 'card';

    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = item.title; // 安全に挿入

    const price = document.createElement('div');
    price.className = 'card-price';
    price.textContent = `¥${item.price.toLocaleString()}`; // 安全に挿入

    card.appendChild(title);
    card.appendChild(price);
    $list.appendChild(card);
  }
}

$btn.addEventListener('click', () => {
  renderCards(products);
  $status.textContent = '生成済み';
});
```

## ✨ 新しく追加された部分
- `createElement` + `appendChild` によるノード構築
- 生成後の状態表示更新

## 🔍 コードの説明
- ループ内で `.card` とその子要素を生成して追加
- 金額は `toLocaleString()` で見やすく整形

## 📖 豆知識
- 大量生成時は `DocumentFragment` を使うと再描画が少なく高速
- 画像やボタンなどの要素も同様に安全な `textContent`/属性で追加

## ⚠️ 注意点
- `innerHTML` 連結は使用しない（本課題要件）
- ユーザー入力値を表示する場合は必ず `textContent` を利用

## 🛒 ECサイト制作で繋がるポイント
- 商品カードの動的生成の基本
- 後続の「お気に入り」「カート追加」などのボタン実装の土台
