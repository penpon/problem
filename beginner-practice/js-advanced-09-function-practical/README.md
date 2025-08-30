# タイマー基本（setInterval）

## 🧩 **学ぶタグ/プロパティ**
- `setInterval` と `clearInterval`
- ボタンでの開始/停止制御
- 数値の安全な表示（`textContent`）

## 🔁 **前回の復習**
- DOM 取得とイベントリスナー設定
- ライブ更新エリアの概念（`aria-live`）

## 📌 **重要なポイント**
- `setInterval` はIDを保持し、停止時に `clearInterval` する
- 二重起動に注意（必要に応じてガード）
- 期待仕様: 0 から 0.5 秒ごとに +1

## 🧪 **例題**
HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>js-advanced-09 タイマー基本</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>タイマー基本</h1>
  <div>
    <button id="startBtn">開始</button>
    <button id="stopBtn">停止</button>
  </div>
  <div id="count" aria-live="polite">0</div>
  <script src="script.js"></script>
</body>
</html>
```

CSS
```css
body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; margin: 16px; }
#count { margin: 12px 0; font-size: 20px; }
button { margin-right: 8px; }
```

JavaScript
```js
let timerId = null;
let n = 0;
const $count = document.getElementById('count');

document.getElementById('startBtn').addEventListener('click', () => {
  if (timerId !== null) return; // 多重起動防止（任意）
  timerId = setInterval(() => {
    n += 1;
    $count.textContent = String(n);
  }, 500); // 0.5秒ごと
});

document.getElementById('stopBtn').addEventListener('click', () => {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
});
```

## ✨ **新しく追加された部分**
- 0.5秒ピッチのインターバル更新
- 多重起動防止の最小実装

## 🔍 **コードの説明**
- `timerId` を参照して開始/停止を制御
- コールバックで `n` をインクリメントし、`textContent` に反映

## 📖 **豆知識**
- 遅延誤差が蓄積する用途では `Date.now()` との差分で計測
- 表示更新頻度が高い場合は `requestAnimationFrame` も検討

## ⚠️ **注意点**
- タブ非アクティブ時は間隔が伸びることがある（ブラウザ仕様）
- コンポーネント破棄時に `clearInterval` を必ず実施

## 🛒 **ECサイト制作で繋がるポイント**
- カート在庫の定期リフレッシュ、タイムセール残り時間表示などに応用
