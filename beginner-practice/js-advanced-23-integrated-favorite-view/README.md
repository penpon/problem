# 🧩 まとめ練習 - お気に入り + 表示切替

## **🧩 学ぶタグ/プロパティ**
- `checkbox` / `button`
- `classList` / `textContent`
- `Array.prototype.filter`

## **🔁 前回の復習**
- お気に入りトグル（js-basic-18）
- 表示切替（js-advanced-18）
- 配列からカード生成（js-advanced-11, 19）

## **📌 重要なポイント**
- データ配列に `favorite` を持たせて状態を管理
- チェックボックスで「お気に入りのみ」を切替
- お気に入り数の表示を随時更新

## **🧪 例題**
HTML:
```html
<label><input id="onlyFav" type="checkbox"> お気に入りのみ表示</label>
<div id="itemList"></div>
```
JS:
```js
const items = [{ title:'Pro Camera', favorite:false }];
function render(){ /* ... */ }
```

## **✨ 新しく追加された部分**
- 一覧に対する条件付きビュー（お気に入りのみ）

## **🔍 コードの説明**
- `getView()` でビュー用の配列を作成
- ボタンで `favorite` をトグルし再レンダリング

## **📖 豆知識**
- 状態は1箇所（配列）で一元管理するとシンプル

## **⚠️ 注意点**
- `innerHTML +=` は避ける（再レンダリング時は全置換）

## **🛒 ECサイト制作で繋がるポイント**
- ウィッシュリストやお気に入り機能の基本
