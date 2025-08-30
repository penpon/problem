# 配列の基本操作

## 🧩 **学ぶタグ/プロパティ**
- 配列の作成と参照
- 要素の追加 `push()` / 削除 `pop()`
- 要素数 `length`

## 🔁 **前回の復習**
- 変数と複数値管理の違い
- DOM への安全な表示（`textContent`）

## 📌 **重要なポイント**
- 配列は 0 から始まるインデックスで要素にアクセス
- `push` は末尾に追加、`pop` は末尾から削除（戻り値は削除した要素）

## 🧪 **例題**
HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>js-advanced-05 配列の基本操作</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>配列の基本操作</h1>
    <div class="controls">
      <button id="addBtn">追加</button>
      <button id="removeBtn">削除</button>
    </div>
    <div id="arr"></div>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

CSS
```css
body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; margin: 16px; }
#arr { margin: 12px 0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
button { margin-right: 8px; }
```

JavaScript
```js
const arr = ['りんご', 'バナナ'];
const $arr = document.getElementById('arr');
const $add = document.getElementById('addBtn');
const $remove = document.getElementById('removeBtn');

function render() {
  $arr.textContent = `[${arr.join(', ')}]  (length: ${arr.length})`;
}

$add.addEventListener('click', () => {
  const item = `item-${arr.length + 1}`;
  arr.push(item);
  render();
});

$remove.addEventListener('click', () => {
  arr.pop();
  render();
});

// 初期表示
render();
```

## ✨ **新しく追加された部分**
- ボタン操作で配列の追加/削除を体験
- 画面表示と `length` の同期

## 🔍 **コードの説明**
- `render()` が配列内容と要素数を一行で表示
- `add/remove` の各イベントで配列操作 → `render()` 呼び出し

## 📖 **豆知識**
- 先頭操作は `unshift`/`shift`
- 任意位置の挿入/削除は `splice`

## ⚠️ **注意点**
- 大量DOM更新は避け、必要最小限の再描画にする（ここでは一箇所のテキスト更新）

## 🛒 **ECサイト制作で繋がるポイント**
- カート配列の追加/削除と件数表示の基本パターン
- 履歴リストや最近見た商品にも応用
