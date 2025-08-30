# 24: まとめ練習 - 手順リスト

- 🧩 **今回学ぶタグ/プロパティ**
  - HTML: `h2`, `ol`, `li`, `p`, `strong`/`h3`
  - CSS: `border-left`, `background`, `padding`, `margin`, `border-radius`, `line-height`

- 🔁 **前回の復習**
  - タイポグラフィ（行間・幅）とボックスの余白・角丸、読みやすさの設計

- 📌 **重要なポイント**
  - ステップが視覚的に追いやすい構造（番号・見出し・説明）
  - 左の強調線や背景で段落をグルーピング
  - 余白の設計で情報量を整理

- 🧪 **例題**
  - 会員登録の手順（1. 入力 → 2. 確認 → 3. 完了）をカード風に
  - 下記コードをそのまま `index.html` として保存すると動作します。

  ```html
  <!doctype html>
  <html lang="ja">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>手順リスト例</title>
      <style>
        body { font-family: system-ui, sans-serif; margin:0; padding:40px; background:#fafafa; }
        .steps { max-width: 720px; margin: 0 auto; }
        h2 { margin: 0 0 16px; }
        ol { list-style: decimal; margin:0; padding:0; }
        li {
          background:#fff; border-left: 6px solid #0ea5e9; margin: 12px 0; padding: 16px 16px 16px 16px;
          border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,.06);
        }
        li + li { margin-top: 16px; }
        h3 { margin: 0 0 8px; font-size: 18px; }
        p { margin: 0; line-height: 1.7; color:#374151; }
      </style>
    </head>
    <body>
      <section class="steps">
        <h2>会員登録の手順</h2>
        <ol>
          <li>
            <h3>1. 入力</h3>
            <p>必要事項（氏名・メールアドレス・パスワード）をフォームに入力します。</p>
          </li>
          <li>
            <h3>2. 確認</h3>
            <p>入力内容を確認し、問題なければ送信します。</p>
          </li>
          <li>
            <h3>3. 完了</h3>
            <p>登録完了メールが届きます。マイページへログインできます。</p>
          </li>
        </ol>
      </section>
    </body>
  </html>
  ```

- ✨ **新しく追加された部分**
  - `ol/li`をベースに、各`li`へ装飾（背景色、左ボーダー、角丸）
  - ステップ見出しを`strong`や`h3`で視認性アップ

- 🔍 **コードの説明**
  - `.steps`セクションに`h2`のタイトル
  - `ol`の各`li`に`border-left`や`background`、十分な`padding`/`margin`
  - 中の`p`で説明、見出しで要点を先に提示

- 📖 **豆知識**
  - グルーピングと余白は情報設計の要
  - カード風の見た目はガイド文の理解を助ける

- ⚠️ **注意点**
  - 行間`line-height`が狭すぎると読みにくい
  - ボーダー色・背景色のコントラストに注意

- 🛒 **ECサイト制作で繋がるポイント**
  - 注文手順、返品手順、会員登録フローの説明に応用
  - サポートページの可読性向上に寄与

---

## 課題の要件（転記）
- `h2`でセクションタイトル
- `ol/li`で3〜5ステップ
- `li`に`border-left`や背景色、`padding`、`margin`で読みやすく
- ステップ番号＋見出し＋説明文`p`の組み合わせ

### ヒント
- `li`に背景色と角丸でカード風
- `margin-bottom`でステップ間の余白
- `strong`や`h3`で見出しを強調