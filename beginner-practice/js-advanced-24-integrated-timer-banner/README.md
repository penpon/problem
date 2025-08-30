# 🧩 総合: タイマーバナー（カウントダウンで表示/非表示）

## **🧩 学ぶタグ/プロパティ**
- `setInterval` / `clearInterval`
- `classList` / `textContent`

## **🔁 前回の復習**
- ボタンイベント（js-basic-07）
- タイマー処理（js-advanced-09）

## **📌 重要なポイント**
- 残り秒数を state（変数）で管理
- 残りが 0 になったら自動停止、バナーを非表示
- UIの状態文言（表示中/停止中）を同期

## **🧪 例題**
HTML:
```html
<button id="startBtn">開始</button>
<button id="stopBtn">停止</button>
<div id="banner">今だけセール開催中！</div>
```
JS:
```js
function start(sec){ /* ... */ }
function stop(){ /* ... */ }
```

## **✨ 新しく追加された部分**
- カウントダウンに応じたバナーの表示/非表示

## **🔍 コードの説明**
- `remaining` を1秒ごとに減らし、`updateView()` でDOM反映

## **📖 豆知識**
- タイマは重複起動に注意（毎回 clearInterval）

## **⚠️ 注意点**
- 残り秒が負数にならないように `Math.max(0, ...)` を利用

## **🛒 ECサイト制作で繋がるポイント**
- セールやクーポン告知バナーの制御の最小モデル
