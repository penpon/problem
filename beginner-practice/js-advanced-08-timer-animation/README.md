# タイマーアニメーション（setInterval）

## 🧩 **学ぶタグ/プロパティ**
- `setInterval` / `clearInterval`
- CSS `transform: translateX(...)` による移動
- ステージ幅と要素幅からの境界判定

## 🔁 **前回の復習**
- タイマー基礎の開始/停止と重複起動防止（07）
- DOM の取得と状態表示の更新

## 📌 **重要なポイント**
- 1ティックあたりの移動量を一定にして、端に到達したら `x=0` に戻してループ
- タイマー多重起動を防ぐため `timerId !== null` をガード
- 状態テキスト（再生中/停止中）を同期

## 🧪 **例題**
HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>js-advanced-08 タイマーアニメーション</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>タイマーアニメーション</h1>
    <div class="controls">
      <button id="startBtn" type="button">開始</button>
      <button id="stopBtn" type="button">停止</button>
      <div class="meta">状態: <span id="statusText">停止中</span></div>
    </div>
    <div id="stage" class="stage" aria-label="アニメーション領域">
      <div id="box" class="box" aria-hidden="true"></div>
    </div>
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
.stage{position:relative;border:1px solid #e5e7eb;border-radius:8px;height:120px;margin-top:12px;overflow:hidden;background:#fafafa}
.box{position:absolute;width:40px;height:40px;background:#4f46e5;border-radius:6px;left:0;top:40px;transform:translateX(0)}
```

JavaScript
```js
let timerId = null;
let x = 0;

const $start = document.getElementById('startBtn');
const $stop = document.getElementById('stopBtn');
const $status = document.getElementById('statusText');
const $box = document.getElementById('box');
const $stage = document.getElementById('stage');

function step(){
  const stageWidth = $stage.clientWidth;
  const boxWidth = $box.clientWidth;
  x += 4; // 移動量
  if (x > stageWidth - boxWidth) x = 0; // 端でリセット
  $box.style.transform = `translateX(${x}px)`;
}

function startAnim(){ if (timerId !== null) return; $status.textContent = '再生中'; timerId = setInterval(step, 16); }
function stopAnim(){ if (timerId !== null){ clearInterval(timerId); timerId = null; } $status.textContent = '停止中'; }

$start.addEventListener('click', startAnim);
$stop.addEventListener('click', stopAnim);
```

## ✨ **新しく追加された部分**
- ステージ端での位置リセットによるループアニメーション
- 60fps相当（約16ms）のタイマー設定

## 🔍 **コードの説明**
- `step()` が現在位置 `x` を更新し、`transform` で反映
- ステージ幅とボックス幅を考慮して境界判定

## 📖 **豆知識**
- より滑らかなアニメーションは `requestAnimationFrame` を使用
- パフォーマンスのため `transform` を使うと再レイアウトを抑制しやすい

## ⚠️ **注意点**
- ウィンドウ幅の変化で `clientWidth` が変わる点に注意
- 多重タイマーで速度が上がってしまわないようにガード必須

## 🛒 **ECサイト制作で繋がるポイント**
- カルーセルやバナーの自動スライドの基礎
- ローディングインジケータ等の簡易アニメーション
