# 🧪 js-basic-12: 入力値をテキストに反映

## 🎯 学習目標
- ボタンクリックイベントで、`input.value` を取得し、要素の `textContent` を更新できる。

## 📖 内容
- HTMLの`<input>`から文字列を取得
- `addEventListener('click', ...)`でイベントを登録
- `textContent`で安全に表示（`innerHTML`は使わない）

## 📝 学習ポイント
- `document.getElementById()` で要素取得
- 入力は文字列であること（数値計算はしない）
- 空文字のときの簡単な分岐表示

## 🔍 詳細解説
- DOM構築後に実行されるよう`defer`もしくは`DOMContentLoaded`を使用
- ECサイトでの検索窓や名前入力の即時反映の基礎

---

## テンプレ（コピペでOK）

files.html / files.css / files.js を同じディレクトリに配置して実行してください。
