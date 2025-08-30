# テキスト内容変更（textContent）

## 🧩 **学ぶタグ/プロパティ**
- `textContent` による安全なテキスト更新
- クリックイベントの基本（`addEventListener('click', ...)`）
- 配列からのランダム選択と現在時刻の表示

## 🔁 **前回の復習**
- DOM 要素取得（`getElementById`）
- イベント駆動で画面のテキストを書き換える流れ

## 📌 **重要なポイント**
- `textContent` は HTML を無効化して文字として表示（XSS防止）
- 可読性のため共通関数を用意して一箇所で更新
- ランダム/時刻など動的な値は都度生成

## 🧪 **例題**
HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>js-advanced-01 テキスト内容変更</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>テキスト内容変更</h1>
    <div class="controls">
      <button id="greetBtn">挨拶</button>
      <button id="timeBtn">時刻</button>
      <button id="clearBtn">クリア</button>
    </div>
    <div id="text" class="text" aria-live="polite"></div>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

CSS
```css
body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;margin:16px}
.container{max-width:800px;margin:auto}
.controls{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin:12px 0}
.text{border:1px solid #e5e7eb;border-radius:8px;padding:16px;min-height:48px}
```

JavaScript
```js
const $text = document.getElementById('text');
const $greet = document.getElementById('greetBtn');
const $time = document.getElementById('timeBtn');
const $clear = document.getElementById('clearBtn');

function setText(t){ $text.textContent = t; }
function now(){ const d=new Date(); return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}:${d.getSeconds().toString().padStart(2,'0')}`; }

$greet.addEventListener('click', () => {
  const messages = ['こんにちは！','学習、順調です！','今日もがんばろう！','良い一日を！'];
  setText(messages[Math.floor(Math.random()*messages.length)]);
});

$time.addEventListener('click', () => {
  setText(`現在時刻: ${now()}`);
});

$clear.addEventListener('click', () => setText(''));
```

## ✨ **新しく追加された部分**
- `setText()` による共通更新ロジック
- ランダムメッセージと現在時刻の切替ボタン

## 🔍 **コードの説明**
- それぞれのボタンが `setText()` を呼び出し、`#text` の `textContent` を更新
- `now()` は 0 埋めで「HH:MM:SS」表示を生成

## 📖 **豆知識**
- ユーザー入力は常に `textContent` で表示すると安全
- 改行を表示したい場合は CSS で `white-space: pre-wrap` を使うと良い

## ⚠️ **注意点**
- HTML を解釈させたい場合は `innerHTML` だが、ユーザー入力を直挿しはNG
- 短時間に頻繁な更新はアクセシビリティに配慮（`aria-live` ゾーン最小限）

## 🛒 **ECサイト制作で繋がるポイント**
- 状態テキスト（在庫状況、エラー、通知）の安全表示
- ボタンクリックによるメッセージ表示パターンの基礎
