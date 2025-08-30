# まとめ練習 - 複数ボタンのハンドリング

## 🧩 **学ぶタグ/プロパティ**
- 同一クラスの複数要素へのイベント付与
- `forEach` / ループ

## 🔁 **前回の復習**
- クリックイベントとDOM更新

## 📌 **重要なポイント**
- 反復で同じロジックを適用して重複を減らす

## 🧪 **例題（コピペで実行可）**
```html
<ul id="list">
  <li><button class="add">追加1</button></li>
  <li><button class="add">追加2</button></li>
  <li><button class="add">追加3</button></li>
</ul>
<p id="log">0 回クリック</p>
<script>
  let count = 0;
  document.querySelectorAll('.add').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      count++; document.getElementById('log').textContent = count + ' 回クリック';
    });
  });
</script>
```

## ✨ **新しく追加された部分**
- NodeListへの一括処理

## 🔍 **コードの説明**
- `querySelectorAll` は静的NodeList

## 📖 **豆知識**
- 動的追加要素にはイベント委譲が有効

## ⚠️ **注意点**
- 大量要素へのリスナ多重付与はパフォーマンス注意

## 🛒 **ECサイト制作で繋がるポイント**
- 商品カード群に同じ操作を付与する基礎
