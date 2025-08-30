# 21: まとめ練習 - ギャラリー

- 🧩 **今回学ぶタグ/プロパティ**
  - HTML: `img`, `div`
  - CSS: `display: flex / inline-block`, `flex-wrap`, `gap`, `width/%`, `border-radius`, `box-shadow`, `transform: scale()`, `transition`

- 🔁 **前回の復習**
  - 画像の扱い、ボックスの余白や影、ホバー効果の基本

- 📌 **重要なポイント**
  - サムネイルを等間隔で整列し、折り返し時も美しく配置
  - 画像は枠にフィットさせ、角丸や影でカード風に
  - ホバー時の拡大は`transition`で滑らかに

- 🧪 **例題**
  - 旅行写真のサムネイルを3〜4列で並べ、ホバーで少し拡大＋影
  - 下記コードをそのまま `index.html` として保存すると動作します（画像は Picsum を使用）。

  ```html
  <!doctype html>
  <html lang="ja">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>ギャラリー例</title>
      <style>
        body { font-family: system-ui, sans-serif; margin: 0; padding: 40px; background:#fafafa; }
        .gallery {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
        }
        .item { width: 220px; }
        .thumb {
          display: block;
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,.08);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .thumb:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(0,0,0,.18);
        }
      </style>
    </head>
    <body>
      <h1>旅行ギャラリー</h1>
      <div class="gallery">
        <div class="item"><img class="thumb" src="https://picsum.photos/seed/1/600/400" alt="sample 1"></div>
        <div class="item"><img class="thumb" src="https://picsum.photos/seed/2/600/400" alt="sample 2"></div>
        <div class="item"><img class="thumb" src="https://picsum.photos/seed/3/600/400" alt="sample 3"></div>
        <div class="item"><img class="thumb" src="https://picsum.photos/seed/4/600/400" alt="sample 4"></div>
        <div class="item"><img class="thumb" src="https://picsum.photos/seed/5/600/400" alt="sample 5"></div>
        <div class="item"><img class="thumb" src="https://picsum.photos/seed/6/600/400" alt="sample 6"></div>
      </div>
    </body>
  </html>
  ```

- ✨ **新しく追加された部分**
  - `.gallery`で横並び・折り返し
  - `.thumb`画像に`border-radius`とホバー拡大

- 🔍 **コードの説明**
  - コンテナに`display: flex; flex-wrap: wrap; gap: ...;`
  - 子要素幅を`width: 24%`や`calc()`で列数を調整
  - `:hover`で`transform: scale(1.05); box-shadow: ...;`を付与

- 📖 **豆知識**
  - 画像は`display: block; width: 100%;`でコンテナにフィット
  - `object-fit: cover;`でトリミング風の見せ方も

- ⚠️ **注意点**
  - ホバー拡大でレイアウトが崩れないように`overflow`や`transform-origin`を調整
  - 画像の読み込み失敗対策に`alt`を必ず設定

- 🛒 **ECサイト制作で繋がるポイント**
  - 商品ギャラリー・一覧ページのサムネイルレイアウトに直結
  - ホバー演出は可読性と操作性を両立させるのが鍵

---

## 課題の要件（転記）
- `.gallery`をflexやinline-blockで横並び・折り返しレイアウト
- `.thumb`を幅固定や%指定でグリッド風に
- 画像に`border-radius`、ホバーで`transform: scale()`と`box-shadow`
- 中央寄せと均等な間隔

### ヒント
- 画像は`display: block; width: 100%`で枠にフィット
- `gap`や`margin`で均等な間隔
- `scale(1.05)`程度が自然