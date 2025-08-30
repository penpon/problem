# EC-19: 管理ログ（一覧＋CSVエクスポート）

## 🧩 学ぶタグ/プロパティ
- テーブル表示: `<table>`, `<thead>`, `<tbody>`
- CSVエクスポート（クライアント生成）
- 軽量フィルター（種別）

## 🔁 前回の復習
- 擬似ログインで保護領域と状態切替

## 📌 重要なポイント
- ログは配列として管理し、テーブルへ描画
- 種別セレクトで行を絞り込み
- CSVは `Blob` と `URL.createObjectURL` で生成/ダウンロード

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-19 管理ログ</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1 class="m-0">管理ログ</h1>
      <div class="d-flex gap-2">
        <select id="type" class="form-select">
          <option value="">すべて</option>
          <option value="INFO">INFO</option>
          <option value="WARN">WARN</option>
          <option value="ERROR">ERROR</option>
        </select>
        <button id="export" class="btn btn-outline-primary">CSVエクスポート</button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-sm align-middle">
        <thead class="table-light">
          <tr>
            <th>日時</th>
            <th>種別</th>
            <th>メッセージ</th>
          </tr>
        </thead>
        <tbody id="tbody"></tbody>
      </table>
    </div>
  </div>

  <script>
    const logs = [
      { at: '2024-07-01 10:00:02', type: 'INFO',  msg: '商品一覧を表示' },
      { at: '2024-07-01 10:01:15', type: 'WARN',  msg: '在庫が閾値を下回りました: item#12' },
      { at: '2024-07-01 10:02:33', type: 'ERROR', msg: '決済APIのタイムアウト' },
      { at: '2024-07-01 10:03:01', type: 'INFO',  msg: 'ユーザー demo がログイン' },
    ];

    function render(list){
      const tb = document.getElementById('tbody');
      tb.innerHTML = '';
      list.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="text-nowrap">${r.at}</td><td><span class="badge ${badge(r.type)}">${r.type}</span></td><td>${escape(r.msg)}</td>`;
        tb.appendChild(tr);
      });
    }

    function escape(s){
      const div = document.createElement('div');
      div.textContent = s; return div.innerHTML;
    }
    function badge(t){
      if (t==='ERROR') return 'bg-danger';
      if (t==='WARN') return 'bg-warning text-dark';
      return 'bg-secondary';
    }

    function apply(){
      const t = document.getElementById('type').value;
      const arr = t ? logs.filter(x => x.type === t) : logs;
      render(arr);
    }

    function toCSV(rows){
      const header = ['at','type','msg'];
      const csv = [header.join(','), ...rows.map(r => header.map(k => `"${String(r[k]).replaceAll('"','""')}"`).join(','))].join('\n');
      return new Blob([csv], {type:'text/csv;charset=utf-8;'});
    }

    document.getElementById('export').addEventListener('click', () => {
      const t = document.getElementById('type').value;
      const arr = t ? logs.filter(x => x.type === t) : logs;
      const blob = toCSV(arr);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'logs.csv'; a.click();
      URL.revokeObjectURL(url);
    });

    document.getElementById('type').addEventListener('change', apply);
    apply();
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- CSVエクスポート機能（クライアントのみで完結）

## 🔍 コードの説明
- セレクトで種別を絞り込み、`apply()` で再描画

## 📖 豆知識
- CSVはExcel/スプレッドシート取り込みに便利。UTF-8かつクオート/エスケープに注意

## ⚠️ 注意点
- 実運用ではサーバ側に保存・検索・権限管理が必要

## 🛒 ECサイト制作で繋がるポイント
- 運用監視・障害調査の第一歩になるログの見える化
