# まとめ練習 - クーポン適用の基本

## 🧩 **学ぶタグ/プロパティ**
- `submit + preventDefault`
- 文字列の正規化（`trim()`）

## 🔁 **前回の復習**
- お気に入りの状態管理

## 📌 **重要なポイント**
- コード判定 → 割引率や送料変更 → 再計算

## 🧪 **例題（コピペで実行可）**
```html
<div>小計: <span id="sub">4000</span> 円 / 送料: <span id="fee">300</span> 円</div>
<div>合計: <span id="total">4300</span> 円</div>
<form id="c">
  <input id="code" placeholder="EC2025"><button type="submit">適用</button>
</form>
<p id="msg">未適用</p>
<script>
  const sub = document.getElementById('sub');
  const fee = document.getElementById('fee');
  const total = document.getElementById('total');
  const form = document.getElementById('c');
  const code = document.getElementById('code');
  const msg = document.getElementById('msg');
  let discount = 0;
  function render(){ total.textContent = String(Math.floor((Number(sub.textContent)||0 + (Number(fee.textContent)||0))*(1-discount))); }
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const v = code.value.trim();
    if(v==='EC2025'){ discount=0.1; msg.textContent='10%OFF適用'; }
    else if(v==='FREESHIP'){ fee.textContent='0'; discount=0; msg.textContent='送料0円適用'; }
    else { discount=0; msg.textContent='無効なコード'; }
    render();
  });
  render();
</script>
```

## ✨ **新しく追加された部分**
- 判定と再計算の流れ

## 🔍 **コードの説明**
- 合計 = (小計+送料)×(1-割引)

## 📖 **豆知識**
- コードは大文字小文字を正規化することも

## ⚠️ **注意点**
- ユーザー入力の前後空白を除去

## 🛒 **ECサイト制作で繋がるポイント**
- 決済の基本分岐
