# 22: まとめ練習 - 価格表カード

- 🧩 **今回学ぶタグ/プロパティ**
  - HTML: `section`, `div`, `ul`, `li`
  - CSS: `display: flex`, `border-radius`, `box-shadow`, `padding`, `text-align: center`, `transform`, `:hover`, `transition`

- 🔁 **前回の復習**
  - レイアウトの基礎（横並び、余白、影）とホバーの基礎

- 📌 **重要なポイント**
  - 3枚のカードを均等配置（中央カードを視覚的に強調）
  - 箇条書きでプラン特徴を明確化
  - ホバーで浮き上がり（影＋軽い拡大）

- 🧪 **例題**
  - Basic / Pro / Enterprise の3プランを横並びにし、Proを強調
  - 下記コードをそのまま `index.html` として保存すると動作します。

  ```html
  <!doctype html>
  <html lang="ja">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>価格表カード例</title>
      <style>
        :root { --accent:#2563eb; }
        body { font-family: system-ui, sans-serif; margin:0; padding:40px; background:#f7f7fb; }
        .pricing { display:flex; gap:20px; justify-content:center; flex-wrap:wrap; }
        .card {
          width:260px; background:#fff; border-radius:16px; padding:24px; text-align:center;
          box-shadow:0 2px 10px rgba(0,0,0,.06); transition:transform .2s ease, box-shadow .2s ease;
        }
        .card:hover { transform: translateY(-4px); box-shadow:0 10px 24px rgba(0,0,0,.16); }
        .card--featured { border:2px solid var(--accent); transform: scale(1.02); }
        .title { font-size:20px; font-weight:700; margin:0 0 8px; }
        .price { font-size:32px; font-weight:800; color:var(--accent); margin:0 0 16px; }
        ul { list-style: none; padding:0; margin:0 0 16px; }
        li { margin:6px 0; color:#444; }
        .btn { display:inline-block; padding:10px 16px; border-radius:999px; background:var(--accent); color:#fff; text-decoration:none; }
      </style>
    </head>
    <body>
      <h1>プラン比較</h1>
      <section class="pricing">
        <article class="card">
          <h2 class="title">Basic</h2>
          <p class="price">¥0</p>
          <ul>
            <li>1プロジェクト</li>
            <li>メールサポート</li>
            <li>月間1GB</li>
          </ul>
          <a class="btn" href="#">はじめる</a>
        </article>
        <article class="card card--featured">
          <h2 class="title">Pro</h2>
          <p class="price">¥980</p>
          <ul>
            <li>無制限プロジェクト</li>
            <li>優先サポート</li>
            <li>月間50GB</li>
          </ul>
          <a class="btn" href="#">今すぐ登録</a>
        </article>
        <article class="card">
          <h2 class="title">Enterprise</h2>
          <p class="price">お問い合わせ</p>
          <ul>
            <li>SLA保証</li>
            <li>専任サクセスマネージャー</li>
            <li>カスタム統合</li>
          </ul>
          <a class="btn" href="#">相談する</a>
        </article>
      </section>
    </body>
  </html>
  ```

- ✨ **新しく追加された部分**
  - `.card--featured`に`transform`や強い配色で差別化
  - `:hover`で`box-shadow`強化＋わずかな`scale`

- 🔍 **コードの説明**
  - `.pricing`に`display: flex; gap: ...;`で3カラム
  - `.card`に角丸・影・パディング・中央寄せ
  - `.card--featured`だけ背景色やサイズ、枠線で視線誘導

- 📖 **豆知識**
  - `transition`は影やtransformにも適用でき、自然な動きに
  - リストは`ul > li`で情報の読みやすさが向上

- ⚠️ **注意点**
  - モバイル幅では縦積みに切り替える（`flex-wrap`や`@media`）
  - 拡大時のズレを防ぐため、カード全体に`transform`適用

- 🛒 **ECサイト制作で繋がるポイント**
  - 料金表・プラン比較・サブスクリプション導線に直結
  - 強調カードでユーザーの選択を後押し

---

## 課題の要件（転記）
- `.pricing`を`display: flex`で3枚の`.card`を横並び
- `.card`に角丸・影・padding・`text-align: center`
- `.card--featured`で`transform`や色で強調
- `.card:hover`で浮き上がりと影の強調
- `ul/li`でプランの特徴を記述

### ヒント
- 中央カードに`scale(1.03)`や強い色で視線誘導
- `ul/li`で特徴を箇条書き
- `hover`時に`box-shadow`を強化してクリック可能感
