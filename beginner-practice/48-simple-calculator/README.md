# ステップ18: 簡単計算機

## 🎯 学習目標

**JavaScriptで入力フォームから値を取得し、四則演算とエラーハンドリングを実装する**

- inputタグから値を取得してJavaScriptで処理する方法を学ぶ
- parseFloat()やparseInt()で文字列を数値に変換する
- 四則演算（+、-、×、÷）の基本的な実装を習得する
- isNaN()やtry-catch文を使った基本的なエラーハンドリングを理解する
- ユーザーフレンドリーなエラーメッセージ表示を実装する

## 📝 学習内容

### **今回学ぶJavaScript**
- **element.value**：入力フィールドの値を取得
- **parseFloat()**：文字列を小数点数値に変換
- **parseInt()**：文字列を整数に変換
- **isNaN()**：値が数値でないかを判定
- **try-catch文**：エラーハンドリングの基本
- **toFixed()**：小数点以下の桁数を制限

### **前回の復習**
- DOM操作による要素の取得と内容変更
- addEventListener()によるイベント処理
- innerHTML、textContentの使い分け

### **重要なポイント**
1. **ユーザー入力**は常に文字列として取得される
2. **数値変換**が計算処理には必須
3. **エラーハンドリング**でアプリクレーションの安定性を確保
4. **入力検証**でユーザビリティを向上

## 🔍 フォーム処理とは？

### **HTMLフォーム要素**
```html
<input type="number" id="number1" placeholder="最初の数値">
<input type="number" id="number2" placeholder="2番目の数値">
<select id="operation">
    <option value="+">足し算</option>
    <option value="-">引き算</option>
    <option value="*">掛け算</option>
    <option value="/">割り算</option>
</select>
```

### **JavaScriptでの値取得**
```javascript
const num1 = document.getElementById('number1').value;  // 文字列
const num1Float = parseFloat(num1);  // 数値
```

## 🔍 コードの説明

### **HTML（index.html）**
この計算機は、基本的な四則演算に加えて、履歴機能や特殊計算（平方根、乗算、円の面積）も実装した実用的なアプリケーションです。

### **JavaScript（script.js）**
入力値の取得、数値変換、計算処理、エラーハンドリング、結果表示まで、一連の流れを体系的に学べる構造になっています。

## 🔍 数値処理の基本

### **1. 文字列から数値への変換**
```javascript
// parseFloat: 小数点数値に変換
const floatNum = parseFloat('3.14');     // 3.14
const floatNum2 = parseFloat('3.14abc'); // 3.14 (数値部分のみ)

// parseInt: 整数に変換
const intNum = parseInt('42');           // 42
const intNum2 = parseInt('42.99');       // 42 (整数部分のみ)

// Number: 厳密な変換
const num = Number('3.14');              // 3.14
const numError = Number('3.14abc');      // NaN (エラー)
```

### **2. 数値の妥当性チェック**
```javascript
// NaN（Not a Number）のチェック
const userInput = 'abc';
const converted = parseFloat(userInput);
if (isNaN(converted)) {
    console.log('数値ではありません');
}

// 有限数のチェック
if (isFinite(converted)) {
    console.log('有限の数値です');
}
```

### **3. 小数点の処理**
```javascript
const result = 1 / 3;                    // 0.3333333333333333
const rounded = result.toFixed(2);       // "0.33" (文字列)
const roundedNum = parseFloat(rounded);   // 0.33 (数値)
```

## 🔍 エラーハンドリングの基本

### **try-catch文の使用**
```javascript
try {
    // 危険な処理
    const result = riskyCalculation();
    displayResult(result);
} catch (error) {
    // エラーが発生した場合の処理
    console.error('計算エラー:', error.message);
    showErrorMessage(error.message);
} finally {
    // 必ず実行される処理（省略可能）
    console.log('計算処理が完了しました');
}
```

### **カスタムエラーの発生**
```javascript
function divide(a, b) {
    if (b === 0) {
        throw new Error('0で割ることはできません');
    }
    return a / b;
}
```

## 🚀 実践してみよう

### **手順1: ファイルを開く**
`18-simple-calculator/index.html` をブラウザで開いてください。

### **手順2: 各機能の確認**
1. **基本計算**：四則演算を試す
2. **エラーハンドリング**：無効な入力でエラーメッセージを確認
3. **履歴機能**：計算履歴の確認とクリア
4. **特殊計算**：平方根、乗算、円の面積計算

### **手順3: エラーケースのテスト**
- 数値を入力せずに計算実行
- 0で割り算を実行
- 文字列を入力して計算実行
- 負の数の平方根を計算

## ✨ 試してみよう

以下を変更して、機能を拡張してみましょう：

### **1. 新しい演算を追加**
HTML:
```html
<option value="%">% 余り算</option>
```

JavaScript:
```javascript
case '%':
    if (num2 === 0) {
        throw new Error('0で割ることはできません');
    }
    result = num1 % num2;
    break;
```

### **2. 三角関数の追加**
```javascript
// sin, cos, tan の計算
document.getElementById('sin-btn').addEventListener('click', function() {
    const input = parseFloat(document.getElementById('angle-input').value);
    const result = Math.sin(input * Math.PI / 180); // 度をラジアンに変換
    document.getElementById('sin-result').textContent = result.toFixed(4);
});
```

### **3. メモリ機能の追加**
```javascript
let memory = 0;

function memoryStore(value) {
    memory = value;
    console.log(`メモリに保存: ${memory}`);
}

function memoryRecall() {
    return memory;
}
```

## 📖 豆知識

### **浮動小数点数の注意点**
```javascript
// JavaScript の小数点計算の問題
console.log(0.1 + 0.2);              // 0.30000000000000004

// 解決策: 小数点以下を四捨五入
function safeAdd(a, b) {
    return Math.round((a + b) * 100) / 100;
}
console.log(safeAdd(0.1, 0.2));      // 0.3
```

### **型変換の自動実行**
```javascript
// 自動型変換（避けるべき）
const result1 = '5' - 3;             // 2 (数値)
const result2 = '5' + 3;             // '53' (文字列)

// 明示的な型変換（推奨）
const result3 = parseFloat('5') - 3;  // 2
const result4 = parseFloat('5') + 3;  // 8
```

### **ユーザビリティの向上**
```javascript
// Enterキーでの計算実行
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateButton.click();
    }
});

// 入力値のリアルタイム検証
input.addEventListener('input', function(e) {
    const value = e.target.value;
    if (isNaN(parseFloat(value)) && value !== '') {
        e.target.classList.add('invalid');
    } else {
        e.target.classList.remove('invalid');
    }
});
```

## ⚠️ よくある間違い

### **1. 型変換の忘れ**
```javascript
// 間違い: 文字列のまま計算
const result = input1.value + input2.value;  // "32" (文字列の連結)

// 正しい: 数値に変換してから計算
const result = parseFloat(input1.value) + parseFloat(input2.value);  // 5 (数値の加算)
```

### **2. エラーハンドリングの不備**
```javascript
// 間違い: エラーを無視
const result = parseFloat(userInput) / parseFloat(divisor);

// 正しい: エラーをチェック
const num1 = parseFloat(userInput);
const num2 = parseFloat(divisor);
if (isNaN(num1) || isNaN(num2)) {
    throw new Error('有効な数値を入力してください');
}
if (num2 === 0) {
    throw new Error('0で割ることはできません');
}
const result = num1 / num2;
```

### **3. 小数点精度の問題**
```javascript
// 問題: 無限に続く小数
const result = 1 / 3;  // 0.3333333333333333

// 解決: 適切な桁数で丸める
const result = (1 / 3).toFixed(4);  // "0.3333"
const resultNum = parseFloat(result);  // 0.3333
```

## 🎯 実用的な計算機能

### **1. 単位変換**
```javascript
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function kilometersToMiles(km) {
    return km * 0.621371;
}
```

### **2. 統計計算**
```javascript
function calculateAverage(numbers) {
    const sum = numbers.reduce((a, b) => a + b, 0);
    return sum / numbers.length;
}

function findMaxMin(numbers) {
    return {
        max: Math.max(...numbers),
        min: Math.min(...numbers)
    };
}
```

### **3. 財務計算**
```javascript
function calculateCompoundInterest(principal, rate, time, compoundFreq) {
    return principal * Math.pow(1 + (rate / compoundFreq), compoundFreq * time);
}
```

## ✅ このステップでできるようになること

- [ ] inputタグから値を正確に取得できる
- [ ] parseFloat()とparseInt()で文字列を数値に変換できる
- [ ] 四則演算を正しく実装できる
- [ ] isNaN()を使って数値の妥当性をチェックできる
- [ ] try-catch文で基本的なエラーハンドリングができる
- [ ] ユーザーフレンドリーなエラーメッセージを表示できる
- [ ] toFixed()で小数点以下の桁数を制御できる
- [ ] 計算履歴機能を実装できる
- [ ] Enterキーでの操作など、ユーザビリティを考慮した実装ができる
- [ ] 特殊な数学関数（平方根、乗算など）を活用できる

## 📚 次のステップ

次は **ステップ19: 商品カード** でこれまでのすべてのスキル（HTML/CSS/JavaScript）を統合し、実用的な商品情報表示システムを作成します！

---

**🎉 JavaScript計算処理の基本をマスターしました！ユーザー入力の取得、数値処理、エラーハンドリングができるようになり、実用的なWebアプリケーション作成への大きな一歩を踏み出しましたね！**