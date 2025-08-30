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