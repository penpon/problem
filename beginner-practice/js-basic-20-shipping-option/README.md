# まとめ練習 - 配送オプションで送料切替

## 🧩 **学ぶタグ/プロパティ**
- ラジオボタン（単一選択）
- `change` イベント

## 🔁 **前回の復習**
- クーポン適用の分岐

## 📌 **重要なポイント**
- 選択状態から送料を算出 → 表示更新

## 🧪 **例題（コピペで実行可）**
```html
<label><input type="radio" name="ship" id="std" checked> 通常便（300円）</label>
<label><input type="radio" name="ship" id="exp"> 速達便（800円）</label>
<p>送料: <span id="fee">300</span> 円</p>
<script>
  const std = document.getElementById('std');
  const exp = document.getElementById('exp');
  const fee = document.getElementById('fee');
  function update(){ fee.textContent = String(exp.checked?800:300); }
  std.addEventListener('change', update);
  exp.addEventListener('change', update);
  update();
</script>
```

## ✨ **新しく追加された部分**
- ラジオ選択の取得と分岐

## 🔍 **コードの説明**
- `name` を同じにすると単一選択になる

## 📖 **豆知識**
- ラジオの既定値は `checked` 属性

## ⚠️ **注意点**
- 初期描画時にも反映関数を呼ぶ

## 🛒 **ECサイト制作で繋がるポイント**
- 配送方法選択UIの基礎
