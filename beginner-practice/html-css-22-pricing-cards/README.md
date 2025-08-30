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
