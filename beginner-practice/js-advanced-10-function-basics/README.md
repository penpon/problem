# 配列のフィルタ表示（最小文字数）

## 🧩 **学ぶタグ/プロパティ**
- `Array.prototype.filter` による配列抽出
- 文字列の長さ（`.length`）
- 入力の数値変換と妥当性チェック

## 🔁 **前回の復習**
- 配列の基本操作と表示（05）
- 入力→処理→表示の基本フロー

## 📌 **重要なポイント**
- 入力を `Number` で数値化し、0 以上の整数かを検証
- フィルタ条件は「要素の文字数 >= 最小文字数」
- 表示は `textContent` を用いた安全な反映

## 🧪 **例題**
HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>js-advanced-10 配列のフィルタ表示</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>配列のフィルタ表示</h1>
  <div>
    <label for="minLen">最小文字数</label>
    <input id="minLen" type="number" min="0" step="1" value="3" />
    <button id="applyBtn">絞り込む</button>
  </div>
  <ul id="list"></ul>
  <script src="script.js"></script>
</body>
</html>
```

CSS
```css
body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; margin: 16px; }
#list { margin-top: 12px; padding-left: 20px; }
input { width: 80px; margin-right: 6px; }
button { margin-right: 8px; }
```

JavaScript
```js
const items = ['camera', 'bag', 'light', 'tripod', 'stabilizer', 'mic'];
const $min = document.getElementById('minLen');
const $btn = document.getElementById('applyBtn');
const $list = document.getElementById('list');

function render(arr){
  $list.innerHTML = '';
  arr.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text; // 安全に文字列表示
    $list.appendChild(li);
  });
}

function filterByMinLen(min){
  return items.filter(s => s.length >= min);
}

$btn.addEventListener('click', () => {
  const n = Number($min.value);
  if (!Number.isInteger(n) || n < 0) {
    render([]); // 不正値は空表示
    return;
  }
  render(filterByMinLen(n));
});

// 初期表示
render(filterByMinLen(Number($min.value)));
```

## ✨ **新しく追加された部分**
- 最小文字数によるフィルタロジック
- 入力値の妥当性チェックと空表示フォールバック

## 🔍 **コードの説明**
- `filterByMinLen(n)` が `length >= n` の要素だけを返す
- `render()` が UL 配下へ安全にテキストノードを追加

## 📖 **豆知識**
- 大文字/小文字を無視したい場合は `toLowerCase()` を併用
- 日本語はサロゲートペアや結合文字で文字数カウントに注意（`Array.from(str).length`）

## ⚠️ **注意点**
- 入力が空や小数の場合の取り扱いを設計（ここでは不正扱いで空表示）
- 表示のたびにリストをクリアして再生成する

## 🛒 **ECサイト制作で繋がるポイント**
- キーワード長さによるサジェスト抑制
- 最低入力文字数を満たしたときのみ検索実行するUIの基礎
