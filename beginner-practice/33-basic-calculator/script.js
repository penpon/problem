// 計算機の状態管理
let currentInput = '0';
let previousInput = null;
let operator = null;
let waitingForNewInput = false;

// 統計情報
let calculationCount = 0;
let buttonClickCount = 0;

// DOM要素の取得
const display = document.getElementById('display');
const calculationCountElement = document.getElementById('calculation-count');
const buttonCountElement = document.getElementById('button-count');
const currentOperationElement = document.getElementById('current-operation');

/**
 * 数字ボタンが押された時の処理
 * @param {number} number - 入力された数字
 */
function inputNumber(number) {
    console.log(`📖 数字入力: ${number}`);
    
    if (waitingForNewInput) {
        currentInput = number.toString();
        waitingForNewInput = false;
    } else {
        if (currentInput === '0') {
            currentInput = number.toString();
        } else {
            currentInput += number.toString();
        }
    }
    
    updateDisplay();
    updateButtonCount();
    updateStatus(`数字 "${number}" を入力しました`);
    
    console.log(`✅ 現在の入力: ${currentInput}`);
}

/**
 * 小数点ボタンが押された時の処理
 */
function inputDecimal() {
    console.log('📖 小数点入力');
    
    if (waitingForNewInput) {
        currentInput = '0.';
        waitingForNewInput = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    
    updateDisplay();
    updateButtonCount();
    updateStatus('小数点を入力しました');
    
    console.log(`✅ 現在の入力: ${currentInput}`);
}

/**
 * 演算子ボタンが押された時の処理
 * @param {string} op - 演算子 (+, -, *, /)
 */
function inputOperator(op) {
    console.log(`📖 演算子入力: ${op}`);
    
    const current = parseFloat(currentInput);
    
    if (previousInput === null) {
        previousInput = current;
    } else if (operator && !waitingForNewInput) {
        const result = performCalculation();
        if (result === null) return; // エラーが発生した場合
        
        currentInput = result.toString();
        previousInput = result;
        updateDisplay();
        calculationCount++;
        updateCalculationCount();
    } else {
        previousInput = current;
    }
    
    operator = op;
    waitingForNewInput = true;
    
    const operatorNames = {
        '+': '足し算',
        '-': '引き算',
        '*': '掛け算',
        '/': '割り算'
    };
    
    updateButtonCount();
    updateStatus(`${operatorNames[op]}を選択しました`);
    
    console.log(`✅ 演算子設定: ${op}, 前の値: ${previousInput}`);
}

/**
 * イコールボタンが押された時の処理
 */
function calculate() {
    console.log('📖 計算実行');
    
    if (operator === null || previousInput === null) {
        updateStatus('❌ 計算する式が不完全です');
        console.log('❌ 計算できない状態');
        return;
    }
    
    const result = performCalculation();
    if (result === null) return; // エラーが発生した場合
    
    currentInput = result.toString();
    previousInput = null;
    operator = null;
    waitingForNewInput = true;
    
    updateDisplay();
    calculationCount++;
    updateCalculationCount();
    updateButtonCount();
    updateStatus(`✅ 計算完了: 結果 = ${result}`);
    
    console.log(`✅ 計算完了: ${result}`);
}

/**
 * 実際の計算処理
 * @returns {number|null} 計算結果またはnull（エラー時）
 */
function performCalculation() {
    const prev = previousInput;
    const current = parseFloat(currentInput);
    
    console.log(`📊 計算実行: ${prev} ${operator} ${current}`);
    
    let result;
    
    try {
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    throw new Error('0で割ることはできません');
                }
                result = prev / current;
                break;
            default:
                throw new Error('不明な演算子です');
        }
        
        // 結果の精度調整（小数点以下10桁で丸める）
        result = Math.round(result * 10000000000) / 10000000000;
        
        console.log(`✅ 計算結果: ${result}`);
        return result;
        
    } catch (error) {
        console.error('❌ 計算エラー:', error.message);
        showError(error.message);
        return null;
    }
}

/**
 * 全クリア（C）ボタンの処理
 */
function clearAll() {
    console.log('📖 全クリア実行');
    
    currentInput = '0';
    previousInput = null;
    operator = null;
    waitingForNewInput = false;
    
    updateDisplay();
    updateButtonCount();
    updateStatus('🔄 計算機を初期化しました');
    
    console.log('✅ 全クリア完了');
}

/**
 * エントリークリア（CE）ボタンの処理
 */
function clearEntry() {
    console.log('📖 エントリークリア実行');
    
    currentInput = '0';
    waitingForNewInput = false;
    
    updateDisplay();
    updateButtonCount();
    updateStatus('🔄 現在の入力をクリアしました');
    
    console.log('✅ エントリークリア完了');
}

/**
 * ディスプレイ表示を更新
 */
function updateDisplay() {
    display.textContent = currentInput;
    display.classList.remove('error');
}

/**
 * エラー表示
 * @param {string} message - エラーメッセージ
 */
function showError(message) {
    display.textContent = `エラー: ${message}`;
    display.classList.add('error');
    
    // 3秒後に自動的にクリア
    setTimeout(() => {
        clearAll();
    }, 3000);
}

/**
 * ボタンクリック回数を更新
 */
function updateButtonCount() {
    buttonClickCount++;
    buttonCountElement.textContent = buttonClickCount;
}

/**
 * 計算実行回数を更新
 */
function updateCalculationCount() {
    calculationCountElement.textContent = calculationCount;
}

/**
 * ステータス表示を更新
 * @param {string} message - 表示するメッセージ
 */
function updateStatus(message) {
    const timestamp = new Date().toLocaleTimeString();
    currentOperationElement.textContent = `[${timestamp}] ${message}`;
}

// 初期化処理
console.log('🚀 基本計算機が起動しました');
updateStatus('基本計算機が起動しました');

// キーボード対応
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // 数字キー
    if (key >= '0' && key <= '9') {
        inputNumber(parseInt(key));
        event.preventDefault();
    }
    // 演算子キー
    else if (key === '+') {
        inputOperator('+');
        event.preventDefault();
    } else if (key === '-') {
        inputOperator('-');
        event.preventDefault();
    } else if (key === '*') {
        inputOperator('*');
        event.preventDefault();
    } else if (key === '/') {
        inputOperator('/');
        event.preventDefault();
    }
    // その他の特殊キー
    else if (key === 'Enter' || key === '=') {
        calculate();
        event.preventDefault();
    } else if (key === 'Escape') {
        clearAll();
        event.preventDefault();
    } else if (key === 'Backspace') {
        clearEntry();
        event.preventDefault();
    } else if (key === '.') {
        inputDecimal();
        event.preventDefault();
    }
});

console.log('⌨️ キーボード入力制御が有効化されました');