# 改訂版ヒント（18 シンプルなカード）

## 🧩 今回学ぶ構成
- 見出し/画像/本文/フッター（価格やボタン）の**カード設計**

## 🔁 前回の復習
- Flexでの折り返し・均等配置

## 📌 重要なポイント
- 余白・影・角丸で**情報のまとまり**を表現
- テキストは**行間**と**行長**で読みやすく

## 🧪 例題
別テーマ：「記事カード」。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>シンプルなカード</title>
    <style>
      .card { width: 320px; border-radius: 10px; box-shadow: 0 6px 16px rgba(0,0,0,.12); overflow: hidden; }
      .body { padding: 12px; line-height: 1.7; }
      .footer { display: flex; justify-content: space-between; align-items: center; padding: 12px; }
    </style>
  </head>
  <body>
    <article class="card">
      <img src="../shared/images/sample-landscape.jpg" alt="夕景の写真" width="320" height="180">
      <div class="body">
        <h3>週末の小旅行</h3>
        <p>自然の中でゆっくり過ごすコツを紹介します。</p>
      </div>
      <div class="footer">
        <span>5分で読めます</span>
        <button>続きを読む</button>
      </div>
    </article>
  </body>
</html>
```

## ✨ 新しく追加された部分
- 画像＋本文＋フッターの**情報ブロック化**

## 🔍 コードの説明
- `overflow: hidden` で**角丸に画像を合わせる**

## 📖 豆知識
- 画像比率は**16:9**が汎用的

## ⚠️ 注意点
- テキスト量で高さが変わる前提で**余白**を設計

## 🛒 ECサイト制作で繋がるポイント
- 商品カードの**基本骨格**として使い回し可能