# 20.0 基本計算機の完成

## 🎯 学習目標

**49番までの計算機機能をまとめて、完成した基本計算機を作ろう**

- これまでの機能（足し算、四則演算、クリアボタン）をまとめる
- 使いやすいデザインを追加する
- 計算機として完成させる

## 📝 学習内容

### 今回作るもの

**完成した基本計算機**
- 数字1、数字2を入力するボックス
- 四則演算ボタン（+, -, ×, ÷）
- 計算ボタン
- クリアボタン
- きれいなデザイン

### 今回学ぶこと

- これまでの機能を1つにまとめる
- CSSで見た目を整える
- 完成したアプリケーションを作る体験

## 🔍 詳細解説

### コード例（すべての機能をまとめた完成版）

**HTML**
```html
<div class="calculator">
    <h2>基本計算機</h2>
    <input type="number" id="num1" placeholder="1番目の数字">
    <input type="number" id="num2" placeholder="2番目の数字">
    
    <div class="operation-buttons">
        <button onclick="setOperation('+')">+</button>
        <button onclick="setOperation('-')">-</button>
        <button onclick="setOperation('*')">×</button>
        <button onclick="setOperation('/')">÷</button>
    </div>
    
    <div class="action-buttons">
        <button onclick="calculate()" class="calculate">=</button>
        <button onclick="clearAll()" class="clear">クリア</button>
    </div>
    
    <div class="result" id="result">結果: </div>
</div>
```

**CSS（きれいなデザイン）**
```css
.calculator {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    background: white;
}

.calculator h2 {
    text-align: center;
    color: #333;
}

.calculator input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
}

.calculator button {
    padding: 15px;
    margin: 5px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
}

.operation-buttons button {
    background: #007bff;
    color: white;
}

.calculate {
    background: #28a745 !important;
    color: white !important;
}

.clear {
    background: #dc3545 !important;
    color: white !important;
}

.result {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 5px;
    margin-top: 20px;
}
```

**JavaScript（完成版）**
```javascript
let selectedOperation = '+';

function setOperation(op) {
    selectedOperation = op;
    
    // 選択された演算子をハイライト
    document.querySelectorAll('.operation-buttons button').forEach(btn => {
        btn.style.background = '#007bff';
    });
    event.target.style.background = '#0056b3';
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
        if (number2 === 0) {
            document.getElementById('result').textContent = 'エラー: 0で割れません';
            return;
        }
        answer = number1 / number2;
    }
    
    document.getElementById('result').textContent = '結果: ' + answer;
}

function clearAll() {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('result').textContent = '結果: ';
    selectedOperation = '+';
    
    // すべてのボタンをリセット
    document.querySelectorAll('.operation-buttons button').forEach(btn => {
        btn.style.background = '#007bff';
    });
}
```

### 新しく追加した機能

- **きれいなデザイン**: CSSでプロっぽい見た目
- **ボタンのハイライト**: 選択中の演算子がわかる
- **エラーハンドリング**: 0で割り算した時の対応
- **使いやすさ向上**: 色分けとレイアウト改善

## 💻 実習の進め方

1. **49番の確認**: これまでの機能が動くか確認
2. **デザイン追加**: CSSできれいな見た目にする
3. **機能統合**: すべての機能を1つにまとめる
4. **動作確認**: 完成した計算機をテスト

## 🎉 完成時の達成感

- ✅ **完成した計算機**がついに完成
- ✅ **きれいなデザイン**で使いやすい
- ✅ **次の学習**（Bootstrapの導入）への準備ができた