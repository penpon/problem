# タイマー基礎（setInterval）

## 🧩 **学ぶタグ/プロパティ**
- `setInterval` / `clearInterval`
- 重複起動防止（状態管理）
- ライブリージョン更新（`aria-live`）

## 🔁 **前回の復習**
- `addEventListener` によるイベント駆動
- `textContent` での安全な数値表示

## 📌 **重要なポイント**
- 実行中は新しい `setInterval` を作らない（`timerId !== null` でガード）
- 停止時は必ず `clearInterval` して `timerId = null`
- 画面の状態文言（計測中/停止中）を同期

## 🧪 **例題**
HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>js-advanced-07 タイマー基礎（setInterval）</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>タイマー基礎</h1>
    <div class="controls">
      <button id="startBtn" type="button">開始</button>
      <button id="stopBtn" type="button">停止</button>
      <div class="meta">状態: <span id="statusText">停止中</span></div>
    </div>
    <div class="counter" aria-live="polite">経過秒: <span id="counter">0</span></div>
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
button{padding:8px 12px;border:1px solid #ccc;border-radius:6px;background:#f8f8f8}
.meta{color:#666}
.counter{border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-top:12px;min-height:56px;font-size:18px}
```

JavaScript
```js
let timerId = null;
let seconds = 0;

const $start = document.getElementById('startBtn');
const $stop = document.getElementById('stopBtn');
const $counter = document.getElementById('counter');
const $status = document.getElementById('statusText');

function updateCounter(){ seconds += 1; $counter.textContent = String(seconds); }
function startTimer(){ if (timerId !== null) return; $status.textContent = '計測中'; timerId = setInterval(updateCounter, 1000); }
function stopTimer(){ if (timerId !== null){ clearInterval(timerId); timerId = null; } $status.textContent = '停止中'; }

$start.addEventListener('click', startTimer);
$stop.addEventListener('click', stopTimer);
```

## ✨ **新しく追加された部分**
- 重複開始防止フラグ（`timerId`）
- 状態テキストの同期表示

## 🔍 **コードの説明**
- `startTimer` で `setInterval` を作成し毎秒 `seconds` を加算
- `stopTimer` で `clearInterval` → 再開可能な状態へ

## 📖 **豆知識**
- より精密な計測は `Date.now()` を基準に差分で算出
- 高頻度UI更新には `requestAnimationFrame` も選択肢

## ⚠️ **注意点**
- 画面遷移やコンポーネント破棄時に `clearInterval` を忘れない
- ボタン連打でも多重起動しないことを確認

## 🛒 **ECサイト制作で繋がるポイント**
- 自動リフレッシュや残り時間表示の基礎
- バックエンドポーリングの間隔管理に応用
