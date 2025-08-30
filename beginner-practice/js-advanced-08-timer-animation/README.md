# タイマーアニメーション（setInterval）

## 🧩 学ぶポイント
- setInterval/clearInterval を使ったシンプルなアニメーション
- 多重起動防止と状態表示（再生中/停止中）
- transform: translateX による軽量な動き

## 🔁 前回の復習
- タイマー基礎（07）での setInterval と状態管理

## 📌 重要なポイント
- ステージ幅とボックス幅を考慮し、端で位置をリセット
- 1 ステップあたりの移動量と間隔（約60fps: 16ms）
- textContent と style 操作のみで安全に表現

## 🧪 例題（HTML/CSS/JS）
- 本ディレクトリのテンプレート（index.html/style.css/script.js）を参照

## ✨ 新しく追加された部分
- ステージ領域内での水平アニメーション
- 再生/停止ボタンと状態テキスト

## 🔍 コードの説明
- step(): x を更新し transform に反映、端で 0 に戻す
- startAnim()/stopAnim(): 多重起動を防ぎつつ開始/停止

## 📖 豆知識
- translateX は reflow を抑えやすく滑らか
- requestAnimationFrame との違い（本課題は setInterval を採用）

## ⚠️ 注意点
- ウィンドウ幅変更時は clientWidth を毎回読み取るため追従
- innerHTML は使用せず、textContent/Style のみ

## 🛒 ECサイト制作で繋がるポイント
- スライダーや簡易バナーアニメーションの基礎ロジック
