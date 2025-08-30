# 改訂版ヒント（20 ホバー効果）

## 🧩 今回学ぶテクニック
- `:hover`, `:focus`, `:active` と`transform`/`opacity`の組み合わせ

## 🔁 前回の復習
- トランジションで**状態変化**を滑らかに

## 📌 重要なポイント
- ホバーは**手がかり**（どこが押せるか）を明確にする
- キーボード操作の**`:focus`**も同等に配慮

## 🧪 例題
別テーマ：「カード全体にホバー効果」。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>ホバー効果</title>
    <style>
      .card { padding: 16px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,.08); transition: transform .2s ease, box-shadow .2s ease; }
      .card:hover, .card:focus-within { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,.14); }
    </style>
  </head>
  <body>
    <article class="card" tabindex="0">
      <h3>最新の記事</h3>
      <p>特集：はじめてのUI設計</p>
    </article>
  </body>
</html>
```

## ✨ 新しく追加された部分
- `:focus-within` で**キーボード操作**にも反応

## 🔍 コードの説明
- 影＋微小移動で**浮き上がり**を演出

## 📖 豆知識
- タップ端末では**ホバーがない**前提の設計を

## ⚠️ 注意点
- 動きで**情報過多**にならないよう節度を持つ

## 🛒 ECサイト制作で繋がるポイント
- 商品カードやメニューの**インタラクション向上**に直結