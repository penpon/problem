/* script.js - 統合されたJavaScriptファイル */

/* ====================================
   history.js - 履歴機能と統計情報の管理
   ==================================== */

// 統計情報
let calculationCount = 0;
let buttonClickCount = 0;
let memoryUsageCount = 0;
let percentUsageCount = 0;

// 履歴管理
let calculationHistory = [];

// DOM要素の取得
const historyList = document.getElementById('history-list');
const currentOperationElement = document.getElementById('current-operation');
const calculationCountElement = document.getElementById('calculation-count');
const buttonCountElement = document.getElementById('button-count');
const memoryUsageElement = document.getElementById('memory-usage');
const percentUsageElement = document.getElementById('percent-usage');

/**
 * 履歴に計算結果を追加
 */
function addToHistory(expression, result) {
    const historyItem = {
        expression: expression,
        result: result,
        timestamp: new Date().toLocaleTimeString()
    };
    
    calculationHistory.unshift(historyItem);
    
    // 履歴は最大20件まで
    if (calculationHistory.length > 20) {
        calculationHistory = calculationHistory.slice(0, 20);
    }
    
    updateHistoryDisplay();
    console.log('✅ 履歴追加:', historyItem);
}

/**
 * 履歴表示を更新
 */
function updateHistoryDisplay() {
    historyList.innerHTML = '';
    
    if (calculationHistory.length === 0) {
        const emptyItem = document.createElement('div');
        emptyItem.className = 'history-item';
        emptyItem.innerHTML = '<span class="history-expression">履歴はここに表示されます</span>';
        historyList.appendChild(emptyItem);
        return;
    }
    
    calculationHistory.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <span class="history-expression">${item.expression}</span>
            <span class="history-result">${item.result}</span>
        `;
        
        // クリックで結果を表示に設定
        historyItem.style.cursor = 'pointer';
        historyItem.onclick = () => {
            currentInput = item.result.toString();
            updateMainDisplay();
            updateStatus(`履歴から選択: ${item.result}`);
        };
        
        historyList.appendChild(historyItem);
    });
}

/**
 * 履歴をクリア
 */
function clearHistory() {
    console.log('📖 履歴クリア実行');
    
    calculationHistory = [];
    updateHistoryDisplay();
    updateStatus('📝 履歴をクリア');
    
    console.log('✅ 履歴クリア完了');
}

/**
 * ステータス更新
 */
function updateStatus(message) {
    const timestamp = new Date().toLocaleTimeString();
    currentOperationElement.textContent = `[${timestamp}] ${message}`;
}

/**
 * 統計情報更新系の関数
 */
function updateCalculationCount() {
    calculationCountElement.textContent = calculationCount;
}

function updateButtonCount() {
    buttonClickCount++;
    buttonCountElement.textContent = buttonClickCount;
}

function updateMemoryUsage() {
    memoryUsageElement.textContent = memoryUsageCount;
}

function updatePercentUsage() {
    percentUsageElement.textContent = percentUsageCount;
}

/* ====================================
   memory.js - メモリ機能の管理
   ==================================== */

// メモリ関連の状態
let memory = 0;

// DOM要素の取得
const memoryDisplay = document.getElementById('memory-display');

/**
 * メモリストア（MS）
 */
function memoryStore() {
    console.log('📖 メモリストア実行');
    
    memory = parseFloat(currentInput);
    updateMemoryDisplay();
    memoryUsageCount++;
    updateMemoryUsage();
    updateButtonCount();
    updateStatus(`💾 メモリに保存: ${memory}`);
    
    console.log(`✅ メモリ保存完了: ${memory}`);
}

/**
 * メモリリコール（MR）
 */
function memoryRecall() {
    console.log('📖 メモリリコール実行');
    
    currentInput = memory.toString();
    waitingForNewInput = false;
    
    updateMainDisplay();
    memoryUsageCount++;
    updateMemoryUsage();
    updateButtonCount();
    updateStatus(`💾 メモリから読込: ${memory}`);
    
    console.log(`✅ メモリ読込完了: ${memory}`);
}

/**
 * メモリ加算（M+）
 */
function memoryAdd() {
    console.log('📖 メモリ加算実行');
    
    const current = parseFloat(currentInput);
    memory += current;
    
    updateMemoryDisplay();
    memoryUsageCount++;
    updateMemoryUsage();
    updateButtonCount();
    updateStatus(`💾 メモリ加算: +${current} = ${memory}`);
    
    console.log(`✅ メモリ加算完了: ${memory}`);
}

/**
 * メモリ減算（M-）
 */
function memorySubtract() {
    console.log('📖 メモリ減算実行');
    
    const current = parseFloat(currentInput);
    memory -= current;
    
    updateMemoryDisplay();
    memoryUsageCount++;
    updateMemoryUsage();
    updateButtonCount();
    updateStatus(`💾 メモリ減算: -${current} = ${memory}`);
    
    console.log(`✅ メモリ減算完了: ${memory}`);
}

/**
 * メモリクリア（MC）
 */
function memoryClear() {
    console.log('📖 メモリクリア実行');
    
    memory = 0;
    updateMemoryDisplay();
    updateButtonCount();
    updateStatus('💾 メモリをクリア');
    
    console.log('✅ メモリクリア完了');
}

/**
 * メモリ表示を更新
 */
function updateMemoryDisplay() {
    memoryDisplay.textContent = memory;
    if (memory !== 0) {
        memoryDisplay.style.backgroundColor = '#e3f2fd';
        memoryDisplay.style.color = '#1976d2';
    } else {
        memoryDisplay.style.backgroundColor = '#f8f9fa';
        memoryDisplay.style.color = '#495057';
    }
}

/* ====================================
   calculator.js - 基本計算ロジックと入力処理
   ==================================== */

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

/* ====================================
   初期化処理
   ==================================== */

// 履歴の初期表示
updateHistoryDisplay();

// 起動ログ
console.log('🚀 中級計算機が起動しました');
updateStatus('中級計算機が起動しました');