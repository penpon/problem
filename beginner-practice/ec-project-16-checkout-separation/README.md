# EC-16: チェックアウトの段階分割（配送先 → 支払）

## 🧩 学ぶタグ/プロパティ
- ステップUI切替: `d-none`/`classList.toggle()`
- フォーム検証: `required`, `checkValidity()`
- 次へ/戻るの状態管理

## 🔁 前回の復習
- カート明細と合計の更新

## 📌 重要なポイント
- 入力をバリデーションしてから次ステップへ
- ステップは1画面でセクションを切り替えると簡潔

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-16 チェックアウト段階分割</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-4">
    <h1 class="mb-3">チェックアウト</h1>

    <ol class="breadcrumb">
      <li class="breadcrumb-item active" id="step1crumb">1 配送先</li>
      <li class="breadcrumb-item" id="step2crumb">2 支払</li>
    </ol>

    <form id="form1" class="mb-3">
      <div id="step1">
        <h5 class="mb-3">配送先</h5>
        <div class="mb-2">
          <label class="form-label">お名前</label>
          <input class="form-control" required>
        </div>
        <div class="mb-2">
          <label class="form-label">住所</label>
          <input class="form-control" required>
        </div>
        <button type="button" class="btn btn-primary" id="toStep2">次へ</button>
      </div>

      <div id="step2" class="d-none">
        <h5 class="mb-3">支払</h5>
        <div class="mb-2">
          <label class="form-label">カード番号（例: 4242 4242 4242 4242）</label>
          <input class="form-control" pattern="^(\d{4} ?){4}$" required>
          <div class="form-text">ダミーでOK</div>
        </div>
        <div class="d-flex gap-2">
          <button type="button" class="btn btn-outline-secondary" id="back">戻る</button>
          <button type="submit" class="btn btn-success">注文確定</button>
        </div>
      </div>
    </form>

    <div id="done" class="alert alert-success d-none">注文が確定しました！</div>
  </div>

  <script>
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const toStep2 = document.getElementById('toStep2');
    const back = document.getElementById('back');
    const form1 = document.getElementById('form1');

    function showStep(n){
      const s1 = n === 1; const s2 = n === 2;
      step1.classList.toggle('d-none', !s1);
      step2.classList.toggle('d-none', !s2);
      document.getElementById('step1crumb').classList.toggle('active', s1);
      document.getElementById('step2crumb').classList.toggle('active', s2);
    }

    toStep2.addEventListener('click', () => {
      // step1の必須入力をチェック
      const ok = [...step1.querySelectorAll('input')].every(i => i.checkValidity());
      if (!ok) { step1.querySelector('input:invalid')?.focus(); return; }
      showStep(2);
    });

    back.addEventListener('click', () => showStep(1));

    form1.addEventListener('submit', (e) => {
      e.preventDefault();
      const ok = [...step2.querySelectorAll('input')].every(i => i.checkValidity());
      if (!ok) { step2.querySelector('input:invalid')?.focus(); return; }
      document.getElementById('done').classList.remove('d-none');
    });

    showStep(1);
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- ステップ切替関数 `showStep(n)`

## 🔍 コードの説明
- 各ステップで `checkValidity()` を通過したら次へ

## 📖 豆知識
- マルチページよりシングルページ切替の方が状態管理が簡単な場合が多い

## ⚠️ 注意点
- 必須項目に `required` を忘れない

## 🛒 ECサイト制作で繋がるポイント
- 実運用のチェックアウト導線の土台
