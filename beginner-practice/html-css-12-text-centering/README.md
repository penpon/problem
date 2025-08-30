# 改訂版ヒント（12 テキストの中央寄せ）

## 🧩 今回学ぶプロパティ
- `text-align: center`、行内配置とブロック幅

## 🔁 前回の復習
- レイアウトの分割とFlexの基礎

## 📌 重要なポイント
- `text-align` は**インライン要素**の整列に作用
- 親要素の**幅**と**余白**で見栄えが決まる

## 🧪 例題
別テーマ：「ヒーローテキストの中央寄せ」。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>テキスト中央寄せ</title>
    <style>
      .hero { max-width: 640px; margin: 40px auto; text-align: center; }
    </style>
  </head>
  <body>
    <div class="hero">
      <h1>ようこそ</h1>
      <p>ここからあなたの学習が始まります。</p>
    </div>
  </body>
</html>
```

## ✨ 新しく追加された部分
- 親ブロックの**中央配置＋テキスト中央**の組み合わせ

## 🔍 コードの説明
- `max-width` と `margin: 0 auto` で**読みやすい行幅**を確保

## 📖 豆知識
- 日本語は行幅**35–45字**が読みやすい目安

## ⚠️ 注意点
- 長文の全面中央寄せは**可読性低下**。見出しや短文に限定

## 🛒 ECサイト制作で繋がるポイント
- LPの**ヒーローセクション**やCTAの訴求に活用