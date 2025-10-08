# 🧠 まとめ練習 - ヘッダー＋検索＋ナビ

## 🧩 学ぶタグ/プロパティ
- ナビバー（拡張/折りたたみ）
- 検索フォーム
- ヒーロー（`bg-light` + 余白ユーティリティ）

## 🔁 前回の復習
- `.navbar-expand-lg` のブレークポイント
- `.collapse` と `.navbar-toggler`

## 📌 重要なポイント
- ブランド、ナビ、検索の3要素の配置
- モバイルで折りたためる構成

## 🧪 例題
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css" rel="stylesheet">
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">MyShop</a>
    <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav"><span class="navbar-toggler-icon"></span></button>
    <div id="nav" class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto"><li class="nav-item"><a class="nav-link active">ホーム</a></li></ul>
      <form class="d-flex"><input class="form-control me-2"><button class="btn btn-outline-success">検索</button></form>
    </div>
  </div>
</nav>
```

## ✨ 新しく追加された部分
- ヒーローブロックとCTAの追加

## 🔍 コードの説明
- `.me-auto` でナビリストを左寄せにし、検索を右側へ

## 📖 豆知識
- トグラーはBootstrapのJSが必要ですが、本課題では見た目の構成が主眼

## ⚠️ 注意点
- 依存CDNのパス漏れに注意（CSSのみで可）

## 🛒 ECサイト制作で繋がるポイント
- ヘッダーの情報設計とファーストビューの設計
