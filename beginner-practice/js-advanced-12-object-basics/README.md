# filter で在庫のみ表示

## 🧩 学ぶタグ/プロパティ
- `Array.prototype.filter` による配列の絞り込み
- `map().join('')` でHTML文字列を生成し `innerHTML` に代入
- チェックボックス（`change` イベント）で表示を切替

## 🔁 前回の復習
- `map().join('')` と `innerHTML` の安全な使い方（固定データのみ）
- DOMの取得とイベントリスナー登録

## 📌 重要なポイント
- `#inStock` がONのとき `inStock === true` のみを表示、OFFなら全件
- 再描画は `render()` に集約し、ソースデータ→フィルタ→テンプレ→`innerHTML` の流れ
- ユーザー入力をテンプレ直挿ししない（固定配列のみ）

## 🧪 例題
HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>filter で在庫のみ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main style="padding:16px">
    <label><input id="inStock" type="checkbox"> 在庫のみ</label>
    <div id="list" style="margin-top:8px"></div>
  </main>
  <script src="script.js"></script>
</body>
</html>
```

CSS
```css
#list{display:grid;gap:6px}
.item{padding:6px;border:1px solid #ddd;border-radius:6px}
.name{font-weight:600}
```

JavaScript
```js
const items = [
  { id: 1, name: 'Apple', price: 120, inStock: true },
  { id: 2, name: 'Banana', price: 80, inStock: false },
  { id: 3, name: 'Cherry', price: 200, inStock: true }
];

const $inStock = document.getElementById('inStock');
const $list = document.getElementById('list');

function template(list){
  return list.map(i => `
    <div class="item">
      <div class="name">${i.name}</div>
      <div class="price">¥${i.price.toLocaleString()}</div>
    </div>
  `).join('');
}

function render(){
  const filtered = $inStock.checked ? items.filter(i => i.inStock === true) : items;
  $list.innerHTML = template(filtered); // 固定配列のみ
}

$inStock.addEventListener('change', render);
render();
```

## ✨ 新しく追加された部分
- チェック状態に連動した `filter`
- 再描画処理の単一関数化

## 🔍 コードの説明
- `$inStock.checked` を条件に `filter`
- `template()` で `map().join('')` を使ってHTMLを生成し、`innerHTML`に一括代入

## 📖 豆知識
- 在庫数でバッジを付けたい場合はテンプレ内で条件分岐可能
- 更新頻度が高い場合、差分更新やKeyedレンダリングが有効

## ⚠️ 注意点
- 外部/ユーザー入力をテンプレに直挿ししない（XSS防止）
- スタイルやDOM構造は過剰に複雑化しない（最小要件）

## 🛒 ECサイト制作で繋がるポイント
- 在庫フィルタ（リストの即時絞り込み）の基本実装
- カテゴリや価格帯など他条件との組み合わせに発展可能
