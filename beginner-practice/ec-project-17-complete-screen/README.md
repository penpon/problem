# EC-17: 注文完了画面（購入明細の表示）

## 🧩 学ぶタグ/プロパティ
- 完了メッセージと要約表示
- クエリ取得: `URLSearchParams`
- 再訪問導線: トップへ戻るボタン

## 🔁 前回の復習
- チェックアウトの段階分割と入力検証

## 📌 重要なポイント
- 購入明細（合計/件数/注文番号）をわかりやすく表示
- 直接アクセス時（パラメータ欠落）も破綻しない

## 🧪 例題（コピペ即動作）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EC-17 注文完了</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
  <div class="container py-5">
    <div class="text-center mb-4">
      <h1 class="mb-2">ご注文ありがとうございました！</h1>
      <p class="text-muted">ご注文を受け付けました。以下が注文内容の概要です。</p>
    </div>

    <div class="row justify-content-center">
      <div class="col-12 col-md-8">
        <div class="card mb-3">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div>注文番号</div>
              <strong id="orderId">-</strong>
            </div>
            <div class="d-flex justify-content-between">
              <div>商品点数</div>
              <strong id="count">0</strong>
            </div>
            <div class="d-flex justify-content-between">
              <div>合計金額</div>
              <strong>¥<span id="total">0</span></strong>
            </div>
          </div>
        </div>
        <div class="text-center">
          <a class="btn btn-primary" href="../index.html">トップへ戻る</a>
        </div>
      </div>
    </div>
  </div>

  <script>
    // URL例: ?orderId=ABC123&count=3&total=6780
    const p = new URLSearchParams(location.search);
    const orderId = p.get('orderId') || `TMP-${Date.now().toString().slice(-6)}`;
    const count = Number(p.get('count') || 0);
    const total = Number(p.get('total') || 0);

    document.getElementById('orderId').textContent = orderId;
    document.getElementById('count').textContent = count;
    document.getElementById('total').textContent = total.toLocaleString();
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✨ 新しく追加された部分
- クエリから明細を読み取り表示

## 🔍 コードの説明
- `URLSearchParams` で `orderId/count/total` を取得しDOMへ反映

## 📖 豆知識
- 本来はサーバで注文番号採番/保存。ここではモック（TMP-タイムスタンプ）

## ⚠️ 注意点
- 直接アクセス時のフォールバック値を用意

## 🛒 ECサイト制作で繋がるポイント
- 決済完了後のユーザー安心感を高める要約レイアウト
