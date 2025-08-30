# イベント委譲（リスト内ボタン）

## 🧩 学ぶタグ/プロパティ
- イベント委譲（親に1つだけイベントを登録）
- `event.target.matches(selector)` による発火元の特定
- 安全なテキスト表示（`textContent`）

## 🔁 前回の復習
- `map().join('')` + `innerHTML` によるリスト描画
- クリックイベントの基本（`addEventListener('click', ...)`）

## 📌 重要なポイント
- 子のボタンごとにイベントを付けず、親 `#list` に1つだけ付与
- クリックされた要素が `.buy` かを `matches()` で判定
- 押下した商品の名前を `#log` に表示（追記でも置換でも可）

## 🧪 例題
HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>イベント委譲</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main style="padding:16px">
    <div id="list"></div>
    <div id="log" style="margin-top:8px" aria-live="polite"></div>
  </main>
  <script src="script.js"></script>
</body>
</html>
```

CSS
```css
#list{display:grid;gap:6px}
.item{padding:6px;border:1px solid #ddd;border-radius:6px}
.buy{margin-left:8px}
```

JavaScript
```js
const items = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cherry' }
];

function render(){
  const html = items.map(it => `
    <div class="item">${it.name}<button class="buy" data-id="${it.id}">購入</button></div>
  `).join('');
  document.getElementById('list').innerHTML = html; // 固定データのみ
}

function setup(){
  const $list = document.getElementById('list');
  const $log = document.getElementById('log');
  $list.addEventListener('click', (event) => {
    if (!event.target.matches('.buy')) return; // 発火元が購入ボタンか
    const id = Number(event.target.getAttribute('data-id'));
    const item = items.find(i => i.id === id);
    if (!item) return;
    $log.textContent = `${item.name} を購入ボタンでクリックしました`;
  });
}

render();
setup();
```

## ✨ 新しく追加された部分
- 親要素にイベントを一括登録し、子でのクリックを捕捉
- `matches('.buy')` と `dataset`/`getAttribute` で対象特定

## 🔍 コードの説明
- DOM描画は `render()` に集約、イベントは `setup()` で1回だけ登録
- クリック時に該当IDを取得し、対応する商品名を `#log` に表示

## 📖 豆知識
- 委譲は動的追加要素にも有効。大量要素でも負荷が少ない
- 最近のブラウザでは `closest('.selector')` も便利

## ⚠️ 注意点
- `innerHTML` は固定データのみ。ユーザー入力は `textContent` で
- `event.target` はボタン内の子要素になることもあるため `closest` を使うと堅牢

## 🛒 ECサイト制作で繋がるポイント
- 商品リストでの「購入」「お気に入り」などのクリック処理を一括管理
- 動的に増えるリストに対しても追加実装不要
