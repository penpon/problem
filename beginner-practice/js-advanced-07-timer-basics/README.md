# タイマー基礎（setInterval）

## 🧩 学ぶポイント
- setInterval と clearInterval の基本
- ボタン操作（開始/停止）での状態管理
- textContent での安全な表示更新

## 🔁 前回の復習
- DOM 取得、イベントリスナー、基本的な状態管理

## 📌 重要なポイント
- 多重起動防止: 実行中は新規 setInterval を作成しない
- 停止時は clearInterval + ハンドルを null に戻す
- 画面表示は textContent で更新

## 🧪 例題（HTML/CSS/JS）
- 本ディレクトリのテンプレート（index.html/style.css/script.js）を参照

## ✨ 新しく追加された部分
- 1 秒ごとにカウントアップするタイマー
- ステータステキスト（計測中/停止中）の表示

## 🔍 コードの説明
- timerId に interval のIDを保持し、重複起動を防止
- 経過秒を state（seconds）として管理し、毎秒 updateCounter()

## 📖 豆知識
- aria-live=polite で動的テキストの読み上げ補助
- setTimeout と違い setInterval は繰り返し実行

## ⚠️ 注意点
- 画面離脱などでも interval が残らないよう停止の扱いを明確に
- innerHTML は使用せず、textContent で安全に更新

## 🛒 ECサイト制作で繋がるポイント
- ローディング表示や簡易的なバナー切替などの時間制御の基本
