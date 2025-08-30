# 改訂版ヒント（16 Flexboxの基礎）

## 🧩 今回学ぶプロパティ
- コンテナ：`display: flex`, `gap`, `justify-content`, `align-items`, `flex-wrap`
- アイテム：`flex`, `flex-grow`, `flex-shrink`, `flex-basis`

## 🔁 前回の復習
- シンプルなトランジション/アニメーションの考え方

## 📌 重要なポイント
- Flexは**1次元レイアウト**（行または列）
- 余白は`gap`、伸縮は`flex`で管理

## 🧪 例題
別テーマ：「ボタン横並びの整列」。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>Flexboxの基礎</title>
    <style>
      .toolbar { display: flex; gap: 8px; justify-content: space-between; }
      .group { display: flex; gap: 8px; }
    </style>
  </head>
  <body>
    <div class="toolbar">
      <div class="group">
        <button>戻る</button><button>次へ</button>
      </div>
      <div class="group">
        <button>保存</button>
      </div>
    </div>
  </body>
</html>
```

## ✨ 新しく追加された部分
- `justify-content: space-between` で**端揃え**

## 🔍 コードの説明
- ネストしたFlexで**左右グループ**を構成

## 📖 豆知識
- `align-items: baseline` で**文字基準揃え**ができる

## ⚠️ 注意点
- アイテムの**最小幅**で折り返しが変わる

## 🛒 ECサイト制作で繋がるポイント
- 商品カードのフッター（価格＋ボタン）の**整列**に活用