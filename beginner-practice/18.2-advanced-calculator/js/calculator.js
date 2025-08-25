/* calculator.js - 基本計算ロジックと入力処理 */

// 計算機の状態管理
let currentInput = '0';
let previousInput = null;
let operator = null;
let waitingForNewInput = false;

// DOM要素の取得
const mainDisplay = document.getElementById('main-display');
const secondaryDisplay = document.getElementById('secondary-display');

/**
 * 数字ボタンが押された時の処理
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
    
    updateMainDisplay();
    updateButtonCount();
    updateStatus(`数字 "${number}" を入力`);
    
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
    
    updateMainDisplay();
    updateButtonCount();
    updateStatus('小数点を入力');
    
    console.log(`✅ 現在の入力: ${currentInput}`);
}

/**
 * 符号反転ボタンの処理
 */
function toggleSign() {
    console.log('📖 符号反転');
    
    if (currentInput !== '0') {
        if (currentInput.startsWith('-')) {
            currentInput = currentInput.substring(1);
        } else {
            currentInput = '-' + currentInput;
        }
    }
    
    updateMainDisplay();
    updateButtonCount();
    updateStatus('符号を反転');
    
    console.log(`✅ 符号反転後: ${currentInput}`);
}

/**
 * 演算子ボタンが押された時の処理
 */
function inputOperator(op) {
    console.log(`📖 演算子入力: ${op}`);
    
    const current = parseFloat(currentInput);
    
    if (previousInput === null) {
        previousInput = current;
    } else if (operator && !waitingForNewInput) {
        const result = performCalculation();
        if (result === null) return;
        
        currentInput = result.toString();
        previousInput = result;
        updateMainDisplay();
        calculationCount++;
        updateCalculationCount();
    } else {
        previousInput = current;
    }
    
    operator = op;
    waitingForNewInput = true;
    
    const operatorNames = {
        '+': '足し算', '-': '引き算',
        '*': '掛け算', '/': '割り算'
    };
    
    updateSecondaryDisplay(`${previousInput} ${getOperatorSymbol(op)}`);
    updateButtonCount();
    updateStatus(`${operatorNames[op]}を選択`);
    
    console.log(`✅ 演算子設定: ${op}, 前の値: ${previousInput}`);
}

/**
 * パーセント計算
 */
function percentage() {
    console.log('📖 パーセント計算');
    
    const current = parseFloat(currentInput);
    
    if (operator && previousInput !== null) {
        // 演算子がある場合：previousInput の current% を計算
        let result;
        switch (operator) {
            case '+':
            case '-':
                result = (previousInput * current) / 100;
                break;
            case '*':
            case '/':
                result = current / 100;
                break;
            default:
                result = current / 100;
        }
        currentInput = result.toString();
    } else {
        // 演算子がない場合：単純に100で割る
        const result = current / 100;
        currentInput = result.toString();
    }
    
    updateMainDisplay();
    percentUsageCount++;
    updatePercentUsage();
    updateButtonCount();
    updateStatus(`パーセント計算: ${current}% = ${currentInput}`);
    
    console.log(`✅ パーセント計算完了: ${currentInput}`);
}

/**
 * 計算実行
 */
function calculate() {
    console.log('📖 計算実行');
    
    if (operator === null || previousInput === null) {
        updateStatus('❌ 計算する式が不完全です');
        return;
    }
    
    const current = parseFloat(currentInput);
    const prev = previousInput;
    const op = operator;
    
    const result = performCalculation();
    if (result === null) return;
    
    // 履歴に追加
    const expression = `${prev} ${getOperatorSymbol(op)} ${current}`;
    addToHistory(expression, result);
    
    currentInput = result.toString();
    previousInput = null;
    operator = null;
    waitingForNewInput = true;
    
    updateMainDisplay();
    updateSecondaryDisplay(`${expression} =`);
    calculationCount++;
    updateCalculationCount();
    updateButtonCount();
    updateStatus(`✅ 計算完了: ${expression} = ${result}`);
    
    console.log(`✅ 計算完了: ${result}`);
}

/**
 * 実際の計算処理
 */
function performCalculation() {
    const prev = previousInput;
    const current = parseFloat(currentInput);
    
    console.log(`📊 計算実行: ${prev} ${operator} ${current}`);
    
    try {
        let result;
        switch (operator) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/':
                if (current === 0) {
                    throw new Error('0で割ることはできません');
                }
                result = prev / current;
                break;
            default:
                throw new Error('不明な演算子です');
        }
        
        // 浮動小数点の精度問題を解決
        result = Math.round(result * 1000000000000) / 1000000000000;
        
        return result;
    } catch (error) {
        console.error('❌ 計算エラー:', error.message);
        showError(error.message);
        return null;
    }
}

/**
 * 全クリア（C）
 */
function clearAll() {
    console.log('📖 全クリア実行');
    
    currentInput = '0';
    previousInput = null;
    operator = null;
    waitingForNewInput = false;
    
    updateMainDisplay();
    updateSecondaryDisplay('計算機をリセットしました');
    updateButtonCount();
    updateStatus('🔄 計算機を初期化');
    
    console.log('✅ 全クリア完了');
}

/**
 * エントリークリア（CE）
 */
function clearEntry() {
    console.log('📖 エントリークリア実行');
    
    currentInput = '0';
    waitingForNewInput = false;
    
    updateMainDisplay();
    updateButtonCount();
    updateStatus('🔄 現在の入力をクリア');
    
    console.log('✅ エントリークリア完了');
}

/**
 * 表示更新系の関数
 */
function updateMainDisplay() {
    mainDisplay.textContent = currentInput;
    mainDisplay.classList.remove('error');
}

function updateSecondaryDisplay(text) {
    secondaryDisplay.textContent = text;
}

/**
 * エラー表示
 */
function showError(message) {
    mainDisplay.textContent = `エラー: ${message}`;
    mainDisplay.classList.add('error');
    updateSecondaryDisplay('エラーが発生しました');
    
    setTimeout(() => {
        clearAll();
    }, 3000);
}

/**
 * 演算子記号を取得
 */
function getOperatorSymbol(op) {
    const symbols = {
        '+': '+',
        '-': '-',
        '*': '×',
        '/': '÷'
    };
    return symbols[op] || op;
}

// キーボード対応
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        inputNumber(parseInt(key));
        event.preventDefault();
    } else if (key === '+') {
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
    } else if (key === 'Enter' || key === '=') {
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
    } else if (key === '%') {
        percentage();
        event.preventDefault();
    }
});

// 初期化処理
console.log('🚀 中級計算機が起動しました');
updateStatus('中級計算機が起動しました');