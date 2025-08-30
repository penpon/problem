# 改訂版ヒント（15 シンプルなアニメーション）

## 🧩 今回学ぶプロパティ
- `transition`, `animation`, `@keyframes`

## 🔁 前回の復習
- 影の多層表現と内側影の活用

## 📌 重要なポイント
- 小さな動きで**状態変化**を伝える（押下/ホバー/表示）
- 変化させるなら**GPUに優しいプロパティ**（`opacity`/`transform`）

## 🧪 例題
別テーマ：「通知バナーのフェードイン」。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>シンプルなアニメーション</title>
    <style>
      .toast { opacity: 0; animation: fadeIn .6s ease forwards; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    </style>
  </head>
  <body>
    <div class="toast">設定を保存しました</div>
  </body>
</html>
```

## ✨ 新しく追加された部分
- `@keyframes` と `animation` の**基本構成**

## 🔍 コードの説明
- `forwards` で**終了状態を保持**

## 📖 豆知識
- モーションは**0.2–0.6s**程度が快適

## ⚠️ 注意点
- ちらつき/酔いを避けるため**過度な動き**は控える

## 🛒 ECサイト制作で繋がるポイント
- 追加/削除/完了の**フィードバック**に軽いアニメが有効