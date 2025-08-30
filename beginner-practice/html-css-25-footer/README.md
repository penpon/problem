# 25: まとめ練習 - フッター

- 🧩 **今回学ぶタグ/プロパティ**
  - HTML: `footer`, `ul`, `li`, `a`
  - CSS: レイアウト（中央寄せ・横並び）, `gap`/`margin`, `color`, `opacity`, `:hover`, `transition`, `background`, `padding`

- 🔁 **前回の復習**
  - 横並びレイアウト、ホバー演出、transitionでの滑らかな変化

- 📌 **重要なポイント**
  - フッター内リンク群を中央寄せの横並びに
  - ホバー時に色や不透明度が変化（transitionで自然に）
  - 背景色と上下余白で本文と明確に区切る

- 🧪 **例題**
  - 利用規約 / プライバシー / お問い合わせ / 採用情報 を横並びリンクで配置
  - 下記コードをそのまま `index.html` として保存すると動作します。

  ```html
  <!doctype html>
  <html lang="ja">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>フッター例</title>
      <style>
        :root { --bg:#111827; --link:#e5e7eb; }
        body { font-family: system-ui, sans-serif; margin:0; min-height:100vh; display:flex; flex-direction:column; }
        main { flex:1; padding:40px 20px; }
        .footer {
          background: var(--bg); color:#9ca3af; padding: 28px 16px;
        }
        .footer nav { display:flex; justify-content:center; }
        .footer ul { display:flex; gap:20px; padding:0; margin:0; list-style:none; }
        .footer a {
          color: var(--link); text-decoration:none; opacity:.85;
          transition: opacity .15s ease, color .15s ease;
        }
        .footer a:hover { opacity:1; color:#fff; }
        .copyright { text-align:center; margin-top:12px; font-size:12px; opacity:.7; }
      </style>
    </head>
    <body>
      <main>
        <h1>サンプルページ</h1>
        <p>本文コンテンツ...</p>
      </main>
      <footer class="footer">
        <nav aria-label="フッターナビゲーション">
          <ul>
            <li><a href="#">利用規約</a></li>
            <li><a href="#">プライバシー</a></li>
            <li><a href="#">お問い合わせ</a></li>
            <li><a href="#">採用情報</a></li>
          </ul>
        </nav>
        <p class="copyright"> 2025 Example Inc.</p>
      </footer>
    </body>
  </html>
  ```

- ✨ **新しく追加された部分**
  - `.footer`に背景色と充分な`padding`
  - `a:hover`で`color`や`opacity`を変化、`transition`で滑らかに

- 🔍 **コードの説明**
  - `footer.footer`で領域を定義、中央寄せ（`text-align: center` or `flex`）
  - `ul`をインライン横並びにして`gap`や`margin`で間隔調整
  - `a`にベース色を与え、`:hover`で視覚的な反応

- 📖 **豆知識**
  - アクセシビリティのため、リンクの色差とホバー時の変化は十分なコントラストで
  - `:focus-visible`でキーボード操作時の見やすさを確保

- ⚠️ **注意点**
  - 背景色が濃い場合はリンク色のコントラスト比に注意（WCAG）
  - 余白不足だと要素が窮屈に見えるため上下`padding`をしっかり確保

- 🛒 **ECサイト制作で繋がるポイント**
  - フッターのナビゲーション（会社情報、特商法、SNSリンク等）に直結
  - 信頼性と回遊性を高める導線として重要

---

## 課題の要件（転記）
- `footer.footer`内に`ul/li/a`のリンク群
- リンク群は中央寄せ・横並び
- `a`に`color`や`opacity`のホバー変化＋`transition`
- 背景色や上下余白で本文と視覚的に分離

### ヒント
- フッター全体に背景色（例: `#111`）と`padding`
- リンクは`opacity`や`color`で反応が分かりやすい
- 間隔は`gap`や`li`の`margin`で調整