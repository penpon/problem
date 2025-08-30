# ビュー切替（d-none・関数化）

## 🧩 学ぶタグ/プロパティ
- 表示/非表示の切替クラス：`.d-none { display: none }`
- ビュー切替ロジックの関数化：`toggleView(targetId)`
- イベントリスナーでの画面更新

## 🔁 前回の復習
- 基本的なイベント処理（クリック）
- DOM取得とクラスの付け外し（`classList.add/remove`）

## 📌 重要なポイント
- `#viewA` と `#viewB` のどちらか一方だけを表示
- 初期状態は `#viewA` を表示、`#viewB` は `d-none`
- 切替は必ず `toggleView(targetId)` に集約し、重複ロジックを排除

## 🧪 例題
HTML
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ビュー切替</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main style="padding:16px">
    <div class="buttons">
      <button id="btnA">A</button>
      <button id="btnB">B</button>
    </div>
    <div id="viewA" class="view">ビューA</div>
    <div id="viewB" class="view d-none">ビューB</div>
  </main>
  <script src="script.js"></script>
</body>
</html>
```

CSS
```css
.view{padding:8px;border:1px solid #ddd;border-radius:6px;margin-top:8px}
.d-none{display:none}
```

JavaScript
```js
function toggleView(targetId){
  const ids = ['viewA', 'viewB'];
  for (const id of ids){
    const el = document.getElementById(id);
    if (!el) continue;
    if (id === targetId) el.classList.remove('d-none');
    else el.classList.add('d-none');
  }
}

const btnA = document.getElementById('btnA');
const btnB = document.getElementById('btnB');
btnA.addEventListener('click', () => toggleView('viewA'));
btnB.addEventListener('click', () => toggleView('viewB'));
```

## ✨ 新しく追加された部分
- 切替処理を `toggleView()` に一元化
- `classList` による表示制御の明確化

## 🔍 コードの説明
- `ids` 配列で対象ビューを列挙し、ループで `d-none` を切替
- クリック時に目的ビューIDを渡して関数を呼び出す

## 📖 豆知識
- 複数ビュー（3つ以上）の場合でも `ids` を増やすだけで拡張可能
- アニメーションをつける場合は `opacity/visibility` とCSSトランジションも有効

## ⚠️ 注意点
- 存在しないIDの指定に備えた `null` チェック
- 初期状態（A表示/B非表示）をHTML/CSSで定義

## 🛒 ECサイト制作で繋がるポイント
- タブ切替・モーダル・ステップフォームなどの表示制御に応用
- ローディング状態の切替（骨組み→結果）にも応用可能
