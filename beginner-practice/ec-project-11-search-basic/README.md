# EC-11: 検索（基本・強調表示）

## 🧩 学ぶタグ/プロパティ
- 入力イベント: `input`
- 部分一致検索: `includes()`
- 強調表示: `<mark>` 風のCSS装飾（安全に `textContent` + wrap）

## 🔁 前回の復習
- 検索/絞込/並び替えの統合適用

## 📌 重要なポイント
- 検索語を含む部分を視覚的にハイライト
- DOM挿入は `textContent` ベースで安全に

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-11 検索（強調表示）</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    .mark { background: #fff3cd; padding: 0 .2em; border-radius: .2em; }
  </style>
</head>
<body class="bg-light">
  <div class="container py-4">
    <h1 class="mb-3">検索語を強調表示</h1>
    <div class="row mb-3">
      <div class="col-12 col-md-6">
        <input id="q" class="form-control" placeholder="商品名で検索..." />
      </div>
    </div>
    <ul class="list-group" id="list"></ul>
  </div>

  <script>
    const items = ['ベーシックTシャツ', 'カジュアルスニーカー', 'レザーバッグ', 'シャツ', 'ソックス'];

    function render(term = '') {
      const ul = document.getElementById('list');
      ul.innerHTML = '';
      const lower = term.toLowerCase();
      items
        .filter(name => !term || name.toLowerCase().includes(lower))
        .forEach(name => {
          const li = document.createElement('li');
          li.className = 'list-group-item';
          if (!term) {
            li.textContent = name;
          } else {
            const i = name.toLowerCase().indexOf(lower);
            const before = name.slice(0, i);
            const hit = name.slice(i, i + term.length);
            const after = name.slice(i + term.length);
            // textNode + span.mark + textNode の安全合成
            li.append(document.createTextNode(before));
            const mark = document.createElement('span');
            mark.className = 'mark';
            mark.textContent = hit;
            li.append(mark);
            li.append(document.createTextNode(after));
          }
          ul.appendChild(li);
        });
    }

    document.getElementById('q').addEventListener('input', e => render(e.target.value.trim()));
    render();
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- 検索ヒット箇所のハイライト

## 🔍 コードの説明
- 文字列を3分割し、`textContent` と `.mark` で安全に強調

## 📖 豆知識
- `innerHTML` での置換はXSSリスク。安全合成が基本

## ⚠️ 注意点
- 空検索で全件表示

## 🛒 ECサイト制作で繋がるポイント
- 検索の視認性を高め、商品発見性を向上
