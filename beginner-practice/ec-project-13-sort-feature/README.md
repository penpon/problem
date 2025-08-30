# EC-13: 複合ソート（価格→名前の優先順）

## 🧩 学ぶタグ/プロパティ
- 複合ソート: 主要キーが同値の場合に第二キーで並べ替え
- 比較関数の合成
- UI: `<select>` でモード切替

## 🔁 前回の復習
- 単一キー（価格/名前）の昇降順ソート

## 📌 重要なポイント
- 価格が同じときは名前順で安定化
- 比較関数は「短絡評価」して合成

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-13 複合ソート</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-4">
    <h1 class="mb-3">複合ソート（価格→名前）</h1>

    <div class="row g-2 mb-3">
      <div class="col-12 col-md-4">
        <select id="mode" class="form-select">
          <option value="priceAsc_nameAsc">価格↑ → 名前↑</option>
          <option value="priceAsc_nameDesc">価格↑ → 名前↓</option>
          <option value="priceDesc_nameAsc">価格↓ → 名前↑</option>
          <option value="priceDesc_nameDesc">価格↓ → 名前↓</option>
        </select>
      </div>
    </div>

    <ul class="list-group" id="list"></ul>
  </div>

  <script>
    const products = [
      { name: 'ベーシックT', price: 2980 },
      { name: 'シャツ', price: 2980 },
      { name: 'ソックス', price: 980 },
      { name: 'スニーカー', price: 4980 },
      { name: 'バッグ', price: 4980 }
    ];

    const byNum = (k, dir=1) => (a,b) => (a[k]-b[k]) * dir;
    const byStr = (k, dir=1) => (a,b) => a[k].localeCompare(b[k], 'ja') * dir;
    const combine = (...cmps) => (a,b) => {
      for (const cmp of cmps) {
        const r = cmp(a,b);
        if (r !== 0) return r;
      }
      return 0;
    };

    function render(arr){
      const ul = document.getElementById('list');
      ul.innerHTML = '';
      arr.forEach(p => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between';
        li.innerHTML = `<span>${p.name}</span><strong>¥${p.price.toLocaleString()}</strong>`;
        ul.appendChild(li);
      });
    }

    function apply(){
      const v = document.getElementById('mode').value;
      const map = {
        priceAsc_nameAsc: combine(byNum('price', +1), byStr('name', +1)),
        priceAsc_nameDesc: combine(byNum('price', +1), byStr('name', -1)),
        priceDesc_nameAsc: combine(byNum('price', -1), byStr('name', +1)),
        priceDesc_nameDesc: combine(byNum('price', -1), byStr('name', -1)),
      };
      const arr = [...products].sort(map[v]);
      render(arr);
    }

    document.getElementById('mode').addEventListener('change', apply);
    apply();
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- 比較関数の合成 `combine()`

## 🔍 コードの説明
- 主要キーの結果が0なら次のキーで比較

## 📖 豆知識
- 現代のブラウザでは `sort()` は実装依存の安定性。複合キーで順序を明示すると意図が安定

## ⚠️ 注意点
- 数値と文字列で比較関数を分ける

## 🛒 ECサイト制作で繋がるポイント
- 一覧の順序をビジネス要件に合わせて柔軟に制御
