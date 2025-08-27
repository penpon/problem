/* ============================================
   基本計算機のJavaScriptファイル
   ============================================ */

// 計算機の状態を管理する変数
let currentInput = '0';        // 現在表示されている数字
let previousNumber = null;     // 前に入力された数字
let operator = null;           // 選択された演算子（+、-、*、/）
let waitingForNewInput = false; // 新しい数字の入力待ちかどうか

// DOM要素を取得
const display = document.getElementById('display');
const status = document.getElementById('status');

/**
 * 表示を更新する関数
 */
function updateDisplay() {
    display.textContent = currentInput;
    display.classList.remove('error');
    console.log('表示更新:', currentInput);
}

/**
 * ステータスメッセージを更新する関数
 */
function updateStatus(message) {
    const timestamp = new Date().toLocaleTimeString();
    status.textContent = `[${timestamp}] ${message}`;
    console.log('ステータス:', message);
}

/**
 * 数字ボタンが押された時の処理
 * @param {number} number - 押された数字（0-9）
 */
function inputNumber(number) {
    console.log(`数字ボタン "${number}" が押されました`);
    
    // 新しい入力を待っている場合、または表示が0の場合
    if (waitingForNewInput || currentInput === '0') {
        currentInput = number.toString();
        waitingForNewInput = false;
    } else {
        // 既に数字がある場合は末尾に追加
        currentInput += number.toString();
    }
    
    updateDisplay();
    updateStatus(`数字 "${number}" を入力しました`);
}

/**
 * 小数点ボタンが押された時の処理
 */
function inputDecimal() {
    console.log('小数点ボタンが押されました');
    
    // 新しい入力を待っている場合
    if (waitingForNewInput) {
        currentInput = '0.';
        waitingForNewInput = false;
    } else if (!currentInput.includes('.')) {
        // まだ小数点が含まれていない場合のみ追加
        currentInput += '.';
    } else {
        // すでに小数点がある場合は何もしない
        updateStatus('小数点は既に入力済みです');
        return;
    }
    
    updateDisplay();
    updateStatus('小数点を入力しました');
}

/**
 * 演算子ボタンが押された時の処理
 * @param {string} op - 演算子（+、-、*、/）
 */
function setOperator(op) {
    console.log(`演算子 "${op}" が選択されました`);
    
    const current = parseFloat(currentInput);
    
    // 前の数字が既にある場合、先に計算を実行
    if (previousNumber !== null && operator !== null && !waitingForNewInput) {
        const result = performCalculation();
        if (result !== null) {
            currentInput = result.toString();
            previousNumber = result;
            updateDisplay();
        }
    } else {
        previousNumber = current;
    }
    
    operator = op;
    waitingForNewInput = true;
    
    const operatorNames = {
        '+': '足し算',
        '-': '引き算',
        '*': '掛け算',
        '/': '割り算'
    };
    
    updateStatus(`${operatorNames[op]}（${getOperatorSymbol(op)}）を選択しました`);
}

/**
 * 計算実行ボタン（=）が押された時の処理
 */
function calculate() {
    console.log('計算実行ボタンが押されました');
    
    if (operator === null || previousNumber === null) {
        updateStatus('❌ 計算する式が不完全です');
        return;
    }
    
    const current = parseFloat(currentInput);
    const prev = previousNumber;
    const op = operator;
    
    const result = performCalculation();
    if (result !== null) {
        const expression = `${prev} ${getOperatorSymbol(op)} ${current}`;
        
        currentInput = result.toString();
        previousNumber = null;
        operator = null;
        waitingForNewInput = true;
        
        updateDisplay();
        updateStatus(`✅ 計算完了: ${expression} = ${result}`);
    }
}

/**
 * 実際の計算処理を行う関数
 * @returns {number|null} 計算結果、エラーの場合はnull
 */
function performCalculation() {
    const prev = previousNumber;
    const current = parseFloat(currentInput);
    
    console.log(`計算実行: ${prev} ${operator} ${current}`);
    
    try {
        let result;
        
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
                throw new Error('未対応の演算子です');
        }
        
        // 小数点以下の桁数を制限（表示の都合上）
        if (result % 1 !== 0) {
            result = Math.round(result * 100000000) / 100000000;
        }
        
        console.log(`計算結果: ${result}`);
        return result;
        
    } catch (error) {
        console.error('計算エラー:', error.message);
        showError(error.message);
        return null;
    }
}

/**
 * 符号変更ボタン（±）が押された時の処理
 */
function toggleSign() {
    console.log('符号変更ボタンが押されました');
    
    if (currentInput !== '0') {
        if (currentInput.startsWith('-')) {
            currentInput = currentInput.substring(1);
        } else {
            currentInput = '-' + currentInput;
        }
        
        updateDisplay();
        updateStatus('符号を変更しました');
    } else {
        updateStatus('0の符号は変更できません');
    }
}

/**
 * パーセントボタン（%）が押された時の処理
 */
function percentage() {
    console.log('パーセントボタンが押されました');
    
    const current = parseFloat(currentInput);
    const result = current / 100;
    
    currentInput = result.toString();
    updateDisplay();
    updateStatus(`パーセント計算: ${current}% = ${result}`);
}

/**
 * 全クリア（C）ボタンが押された時の処理
 */
function clearAll() {
    console.log('全クリアボタンが押されました');
    
    currentInput = '0';
    previousNumber = null;
    operator = null;
    waitingForNewInput = false;
    
    updateDisplay();
    updateStatus('🔄 計算機をリセットしました');
}

/**
 * エントリークリア（CE）ボタンが押された時の処理
 */
function clearEntry() {
    console.log('エントリークリアボタンが押されました');
    
    currentInput = '0';
    waitingForNewInput = false;
    
    updateDisplay();
    updateStatus('🔄 現在の入力をクリアしました');
}

/**
 * エラーを表示する関数
 * @param {string} message - エラーメッセージ
 */
function showError(message) {
    display.textContent = `エラー: ${message}`;
    display.classList.add('error');
    updateStatus(`❌ ${message}`);
    
    // 3秒後に自動的にリセット
    setTimeout(() => {
        clearAll();
    }, 3000);
}

/**
 * 演算子記号を表示用に変換する関数
 * @param {string} op - 演算子
 * @returns {string} 表示用の演算子記号
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

/**
 * キーボード入力への対応
 */
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // 数字キー（0-9）
    if (key >= '0' && key <= '9') {
        inputNumber(parseInt(key));
        event.preventDefault();
    }
    // 演算子キー
    else if (key === '+') {
        setOperator('+');
        event.preventDefault();
    }
    else if (key === '-') {
        setOperator('-');
        event.preventDefault();
    }
    else if (key === '*') {
        setOperator('*');
        event.preventDefault();
    }
    else if (key === '/') {
        setOperator('/');
        event.preventDefault();
    }
    // 計算実行キー
    else if (key === 'Enter' || key === '=') {
        calculate();
        event.preventDefault();
    }
    // クリアキー
    else if (key === 'Escape') {
        clearAll();
        event.preventDefault();
    }
    else if (key === 'Backspace') {
        clearEntry();
        event.preventDefault();
    }
    // 小数点キー
    else if (key === '.') {
        inputDecimal();
        event.preventDefault();
    }
});

/**
 * 初期化処理
 */
function initialize() {
    console.log('🧮 基本計算機が起動しました');
    updateDisplay();
    updateStatus('基本計算機が起動しました');
}

// ページ読み込み完了時に初期化実行
document.addEventListener('DOMContentLoaded', initialize);