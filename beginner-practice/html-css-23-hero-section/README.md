# 23: まとめ練習 - ヒーローセクション

- 🧩 **今回学ぶタグ/プロパティ**
  - HTML: `h1`, `p`, `a`
  - CSS: `text-align: center`, `padding`, `font-size`, `line-height`, `max-width`, `display: inline-block`, `border-radius`, `:hover`, `transition`

- 🔁 **前回の復習**
  - 余白設計、中央寄せ、ボタン風スタイル、ホバー効果

- 📌 **重要なポイント**
  - 中央に大きな見出し・説明・CTAボタンをまとめて配置
  - 行幅と行間を整え、読みやすさを最優先
  - CTAは視認性と押しやすさ（余白・角丸・ホバー）

- 🧪 **例題**
  - 新サービスのランディングの先頭セクションを再現
  - 下記コードをそのまま `index.html` として保存すると動作します。

  ```html
  <!doctype html>
  <html lang="ja">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>ヒーローセクション例</title>
      <style>
        :root { --accent:#16a34a; }
        body { font-family: system-ui, sans-serif; margin:0; }
        .hero {
          text-align: center;
          padding: 80px 20px;
          background: linear-gradient(180deg,#f0fdf4,#ffffff);
        }
        .hero h1 { font-size: clamp(28px, 6vw, 48px); margin: 0 0 16px; }
        .hero p { max-width: 640px; margin: 0 auto 24px; line-height: 1.7; color:#334155; }
        .cta {
          display: inline-block; padding: 12px 20px; border-radius: 999px;
          background: var(--accent); color:#fff; text-decoration: none;
          transition: transform .15s ease, box-shadow .15s ease, background .15s linear;
          box-shadow: 0 4px 14px rgba(22,163,74,.25);
        }
        .cta:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(22,163,74,.35); }
        .cta:focus-visible { outline: 3px solid #a7f3d0; outline-offset: 3px; }
      </style>
    </head>
    <body>
      <section class="hero">
        <h1>はじめよう、あなたの新しい体験</h1>
        <p>
          シンプルでパワフルなツールで、アイデアをすぐに形に。読みやすい行間と適切な幅で、
          ストレスのない情報設計を体験しましょう。
        </p>
        <a class="cta" href="#">今すぐ試す</a>
      </section>
    </body>
  </html>
  ```

- ✨ **新しく追加された部分**
  - `.hero`に十分な`padding`と中央寄せ
  - `.cta`リンクをボタン風（背景色・角丸・余白）にして`hover`で色や影を変化

- 🔍 **コードの説明**
  - 見出しは大きめ`font-size`と余白`margin`で階層を明確化
  - 説明文`p`は`max-width`と`margin: 0 auto`で可読幅を制御
  - CTAは`display: inline-block`でクリック領域を確保

- 📖 **豆知識**
  - 行間`line-height`は1.6前後が読みやすいことが多い
  - コントラスト比はWCAGを意識するとアクセシビリティ向上

- ⚠️ **注意点**
  - モバイルでの余白が過剰/不足にならないよう`@media`で調整
  - ボタンのフォーカス可視化（`:focus-visible`）を忘れない

- 🛒 **ECサイト制作で繋がるポイント**
  - キービジュアルとCTAでコンバージョンに直結
  - セール情報や新着商品の訴求に応用可能

---

## 課題の要件（転記）
- `.hero`に`text-align: center`と`padding`
- `h1`を大きめのフォントサイズ
- `p`に`line-height`や`max-width`で読みやすさ確保
- `a.cta`をボタン風＋`hover`アニメーション

### ヒント
- `h1`は`font-size`や`margin`で視覚的階層
- `p`は`max-width: 600px; margin: 0 auto;`
- ボタンは`display: inline-block; padding; border-radius;`