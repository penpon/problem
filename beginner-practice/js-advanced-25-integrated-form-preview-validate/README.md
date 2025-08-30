# 🧩 まとめ練習 - フォーム プレビュー + バリデーション

## **🧩 学ぶタグ/プロパティ**
- `input` / `textarea` / `form`
- `textContent` / `addEventListener('input')`
- 正規表現（メール形式チェック）

## **🔁 前回の復習**
- ライブプレビュー（js-basic-13, 24）
- 入力検証の基本（js-advanced-20）

## **📌 重要なポイント**
- 入力のたびにプレビューを更新
- 必須/形式チェックを通過したら送信ボタンを有効化
- エラーメッセージは `<ul>` に積み上げ表示

## **🧪 例題**
HTML:
```html
<form id="contactForm" novalidate>
  <input id="nameInput" required />
  <input id="emailInput" type="email" required />
  <button id="submitBtn" disabled>送信</button>
</form>
<ul id="errorList"></ul>
```
JS:
```js
function validate(){ /* 必須/形式チェックし、ボタン制御 */ }
```

## **✨ 新しく追加された部分**
- プレビューとバリデーションの統合

## **🔍 コードの説明**
- `renderPreview()` でプレビュー、`validate()` で検証
- 送信時に `preventDefault()` し、合格時に状態を更新

## **📖 豆知識**
- サニタイズを意識し、`textContent` を使って反映

## **⚠️ 注意点**
- 空白のみの入力は `trim()` で空として扱う

## **🛒 ECサイト制作で繋がるポイント**
- お問い合わせやチェックアウトフォームに必須の基礎
