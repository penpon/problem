# 19.9 クリアボタン付き計算機

## 🎯 学習目標

**48番の四則演算計算機にクリアボタンを追加しよう**

- 計算結果をリセットするクリアボタンを実装する
- 入力欄もまとめてリセットする機能を学ぶ
- 使いやすい計算機の基本機能を完成させる

## 📝 学習内容

### 今回作るもの

**クリアボタン付き計算機**
- 数字1、数字2を入力するボックス
- 演算を選ぶボタン（+, -, ×, ÷）
- 計算ボタン
- **クリアボタン**（新しい機能）
- 結果表示エリア

### 今回学ぶJavaScript

- 入力欄を空にする（`.value = ''`）
- 結果をリセットする
- ユーザーが使いやすいUI

## 🔍 詳細解説

### コード例（クリアボタンを追加）

**HTML**
```html
<h2>クリアボタン付き計算機</h2>
<input type="number" id="num1" placeholder="1番目の数字">
<input type="number" id="num2" placeholder="2番目の数字">

<div>
    <button onclick="setOperation('+')">+</button>
    <button onclick="setOperation('-')">-</button>
    <button onclick="setOperation('*')">×</button>
    <button onclick="setOperation('/')">÷</button>
</div>

<button onclick="calculate()">=</button>
<button onclick="clearAll()">クリア</button>
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

// 新しい機能：クリアボタン
function clearAll() {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('result').textContent = '結果: ';
    selectedOperation = '+';
}
```

### 仕組みの説明

1. **計算実行**: 数字を入力して演算を選び、= で計算
2. **クリアボタン**: すべての入力と結果をリセット
3. **使いやすさ向上**: ミスしても簡単にやり直せる

### クリア機能の詳細

- **入力欄をクリア**: `.value = ''` で空にする
- **結果をクリア**: 結果表示を初期状態に戻す
- **演算子をリセット**: 選択した演算子を初期値に戻す

## 💻 実習の進め方

1. **48番の確認**: 四則演算計算機が動くか確認
2. **クリアボタン追加**: HTMLにボタンを追加
3. **クリア関数作成**: JavaScriptでclearAll関数を作成
4. **動作確認**: クリアボタンがちゃんと動くかテスト

## 🎉 完成時の達成感

- ✅ **使いやすい計算機**が完成
- ✅ **リセット機能**でミスしても安心
- ✅ **計算機の基本機能**がすべて揃った