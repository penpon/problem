# HTML内容変更基本（innerHTML）

## 🧩 **学ぶタグ/プロパティ**
- `innerHTML` による構造的コンテンツの挿入
- クリックイベントの基本（`addEventListener('click', ...)`）
- `textContent` との使い分けと安全性

## 🔁 **前回の復習**
- `textContent` でのプレーンテキスト更新
- DOM 要素取得（`getElementById`）

## 📌 **重要なポイント**
- `innerHTML` は HTML を解釈して描画する（強力だが取り扱い注意）
- ユーザー入力の直挿しは禁止（XSS対策）。固定の安全なHTMLのみ使用
- 最小実装は「ボタンを押す → `#box` に `<h2>` と `<p>` を挿入」

## 🧪 **例題**
HTML（最小サンプル）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>js-advanced-02 HTML内容変更基本</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>HTML内容変更基本</h1>
    <button id="genBtn">コンテンツを挿入</button>
    <div id="box"></div>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

CSS（最小）
```css
body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; margin: 16px; }
#box { margin: 12px 0; }
```

JavaScript（最小）
```js
const box = document.getElementById('box');
const btn = document.getElementById('genBtn');

btn.addEventListener('click', () => {
  box.innerHTML = `
    <h2>ようこそ</h2>
    <p>innerHTMLで見出しと段落を挿入しました。</p>
  `;
});
```

## ✨ **新しく追加された部分**
- `innerHTML` による複数要素の一括挿入
- テンプレートリテラルでの可読性向上

## 🔍 **コードの説明**
- `#genBtn` のクリックで `#box.innerHTML` に安全な固定HTMLを代入
- `<h2>` と `<p>` の2要素を一度に生成

## 📖 **豆知識**
- `textContent` は文字列をそのまま表示（タグは無効化）
- `innerHTML` は文字列をHTMLとしてパースして挿入

## ⚠️ **注意点**
- 外部入力（フォーム値/URLパラメータ等）を `innerHTML` に代入しない
- 信頼できる固定HTMLのみを使うこと

## 🛒 **ECサイト制作で繋がるポイント**
- 商品カードやレビューのHTML生成で `innerHTML` を使う場面がある
- ただしユーザー生成コンテンツは必ず `textContent` で安全に表示する
