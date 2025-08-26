# 19.7 はじめての計算機（足し算のみ）

## 🎯 学習目標

**2つの数字を足し算する簡単な計算機を作ろう**

- inputタグから数字を取得する
- JavaScriptで足し算をする
- 結果を画面に表示する

## 📝 学習内容

### 今回作るもの

**足し算計算機**
- 数字1を入力するボックス
- 数字2を入力するボックス
- 計算ボタン
- 結果表示エリア

### 今回学ぶJavaScript

- `document.getElementById()` → 要素を取得
- `.value` → 入力欄の値を取得
- `Number()` → 文字を数字に変換
- `+` → 足し算

## 🔍 詳細解説

### コード例（とても簡単）

**HTML**
```html
<h2>足し算計算機</h2>
<input type="number" id="num1" placeholder="1番目の数字">
+
<input type="number" id="num2" placeholder="2番目の数字">
<button onclick="calculate()">=</button>
<p id="result">結果: </p>
```

**JavaScript**
```javascript
function calculate() {
    // 入力された数字を取得
    const number1 = Number(document.getElementById('num1').value);
    const number2 = Number(document.getElementById('num2').value);
    
    // 足し算
    const answer = number1 + number2;
    
    // 結果を表示
    document.getElementById('result').textContent = '結果: ' + answer;
}
```

### 仕組みの説明

1. **数字を入力**: 2つのボックスに数字を入力
2. **ボタンをクリック**: `=` ボタンを押す
3. **関数が動く**: `calculate()` 関数が実行される
4. **結果が表示**: 足し算の答えが表示される

## 💻 実習の進め方

1. **HTMLを書く**: 入力欄、ボタン、結果表示を作る
2. **JavaScriptを書く**: 計算する関数を作る
3. **動作確認**: 実際に数字を入れて計算してみる

## 🎉 完成時の達成感

- ✅ **足し算計算機**が作れた
- ✅ **入力と表示**の仕組みが理解できた
- ✅ **次のステップ**（四則演算）への準備ができた