# 19.8 四則演算の計算機

## 🎯 学習目標

**47番の足し算計算機に、引き算・掛け算・割り算を追加しよう**

- 足し算に加えて引き算、掛け算、割り算を実装する
- ボタンで演算を選択する方法を学ぶ
- 条件分岐（if文）を使った処理を理解する

## 📝 学習内容

### 今回作るもの

**四則演算計算機**
- 数字1、数字2を入力するボックス
- 演算を選ぶボタン（+, -, ×, ÷）
- 計算ボタン
- 結果表示エリア

### 今回学ぶJavaScript

- ボタンで選んだ演算を取得
- `if`文で条件分岐
- 4つの演算を実装

## 🔍 詳細解説

### コード例（演算を選べる）

**HTML**
```html
<h2>四則演算計算機</h2>
<input type="number" id="num1" placeholder="1番目の数字">
<input type="number" id="num2" placeholder="2番目の数字">

<div>
    <button onclick="setOperation('+')">+</button>
    <button onclick="setOperation('-')">-</button>
    <button onclick="setOperation('*')">×</button>
    <button onclick="setOperation('/')">÷</button>
</div>

<button onclick="calculate()">=</button>
<p id="result">結果: </p>
```

**JavaScript**
```javascript
let selectedOperation = '+';

function setOperation(op) {
    selectedOperation = op;
}

function calculate() {
    const number1 = Number(document.getElementById('num1').value);
    const number2 = Number(document.getElementById('num2').value);
    let answer;
    
    if (selectedOperation === '+') {
        answer = number1 + number2;
    } else if (selectedOperation === '-') {
        answer = number1 - number2;
    } else if (selectedOperation === '*') {
        answer = number1 * number2;
    } else if (selectedOperation === '/') {
        answer = number1 / number2;
    }
    
    document.getElementById('result').textContent = '結果: ' + answer;
}
```

### 仕組みの説明

1. **演算を選択**: +、-、×、÷のボタンで計算方法を選ぶ
2. **数字を入力**: 2つのボックスに数字を入力
3. **計算実行**: = ボタンで計算する
4. **結果表示**: 選んだ演算の結果が表示される

### 新しく学ぶこと

- **変数の保存**: `selectedOperation` で選んだ演算を記憶
- **条件分岐**: `if` 文で演算を使い分け
- **4つの演算**: +（足し算）、-（引き算）、*（掛け算）、/（割り算）

## 💻 実習の進め方

1. **HTMLを書く**: 入力欄、演算ボタン、計算ボタンを作る
2. **JavaScriptを書く**: 演算選択と計算の関数を作る
3. **動作確認**: 4つの演算がちゃんと動くかテスト

## 🎉 完成時の達成感

- ✅ **四則演算**ができる計算機が完成
- ✅ **条件分岐**の使い方が理解できた
- ✅ **本格的な計算機**への第一歩が踏み出せた