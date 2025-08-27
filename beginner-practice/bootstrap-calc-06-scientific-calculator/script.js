// 18.3 高度な科学計算機 - JavaScriptファイル

// 計算機の状態管理
let currentExpression = '';
let currentResult = 0;
let angleMode = 'DEG'; // DEG or RAD
let waitingForNewInput = false;

// 統計情報
let calculationCount = 0;
let functionUsageCount = 0;
let bracketUsageCount = 0;
let errorCount = 0;

// 履歴管理
let calculationHistory = [];

// DOM要素の取得
const mainDisplay = document.getElementById('main-display');
const expressionDisplay = document.getElementById('expression-display');
const angleModeElement = document.getElementById('angle-mode');
const customExpressionInput = document.getElementById('custom-expression');
const historyList = document.getElementById('history-list');
const currentStatusElement = document.getElementById('current-status');
const calculationCountElement = document.getElementById('calculation-count');
const functionCountElement = document.getElementById('function-count');
const bracketCountElement = document.getElementById('bracket-count');
const errorCountElement = document.getElementById('error-count');

/**
 * 数字ボタンが押された時の処理
 */
function inputNumber(number) {
    console.log(`📖 数字入力: ${number}`);
    
    if (waitingForNewInput) {
        currentExpression = number.toString();
        waitingForNewInput = false;
    } else {
        currentExpression += number.toString();
    }
    
    updateDisplays();
    updateStatus(`数字 "${number}" を入力`);
    
    console.log(`✅ 現在の式: ${currentExpression}`);
}

/**
 * 小数点ボタンの処理
 */
function inputDecimal() {
    console.log('📖 小数点入力');
    
    if (waitingForNewInput) {
        currentExpression = '0.';
        waitingForNewInput = false;
    } else {
        // 最後の数値部分に小数点がまだない場合のみ追加
        const lastNumberMatch = currentExpression.match(/[\d.]+$/);
        if (!lastNumberMatch || !lastNumberMatch[0].includes('.')) {
            currentExpression += '.';
        }
    }
    
    updateDisplays();
    updateStatus('小数点を入力');
    
    console.log(`✅ 現在の式: ${currentExpression}`);
}

/**
 * 演算子ボタンの処理
 */
function inputOperator(op) {
    console.log(`📖 演算子入力: ${op}`);
    
    if (currentExpression === '') {
        currentExpression = currentResult + getOperatorSymbol(op);
    } else {
        // 最後が演算子の場合は置き換え
        if (/[+\-*/]$/.test(currentExpression)) {
            currentExpression = currentExpression.slice(0, -1) + getOperatorSymbol(op);
        } else {
            currentExpression += getOperatorSymbol(op);
        }
    }
    
    waitingForNewInput = false;
    updateDisplays();
    updateStatus(`演算子 "${getOperatorName(op)}" を入力`);
    
    console.log(`✅ 現在の式: ${currentExpression}`);
}

/**
 * 関数ボタンの処理
 */
function inputFunction(func) {
    console.log(`📖 関数入力: ${func}`);
    
    if (waitingForNewInput) {
        currentExpression = '';
        waitingForNewInput = false;
    }
    
    switch (func) {
        case 'sin':
        case 'cos':
        case 'tan':
        case 'log':
        case 'ln':
        case 'sqrt':
            currentExpression += func + '(';
            break;
        case 'square':
            if (currentExpression) {
                currentExpression = `(${currentExpression})^2`;
            }
            break;
        case 'pow':
            if (currentExpression) {
                currentExpression += '^';
            }
            break;
    }
    
    functionUsageCount++;
    updateFunctionCount();
    updateDisplays();
    updateStatus(`関数 "${func}" を入力`);
    
    console.log(`✅ 現在の式: ${currentExpression}`);
}

/**
 * 括弧ボタンの処理
 */
function inputBracket(bracket) {
    console.log(`📖 括弧入力: ${bracket}`);
    
    if (waitingForNewInput && bracket === '(') {
        currentExpression = '';
        waitingForNewInput = false;
    }
    
    currentExpression += bracket;
    
    bracketUsageCount++;
    updateBracketCount();
    updateDisplays();
    updateStatus(`括弧 "${bracket}" を入力`);
    
    console.log(`✅ 現在の式: ${currentExpression}`);
}

/**
 * 定数入力
 */
function inputConstant(constant) {
    console.log(`📖 定数入力: ${constant}`);
    
    if (waitingForNewInput) {
        currentExpression = '';
        waitingForNewInput = false;
    }
    
    switch (constant) {
        case 'pi':
            currentExpression += 'π';
            break;
        case 'e':
            currentExpression += 'e';
            break;
    }
    
    updateDisplays();
    updateStatus(`定数 "${constant}" を入力`);
    
    console.log(`✅ 現在の式: ${currentExpression}`);
}

/**
 * 符号反転
 */
function toggleSign() {
    console.log('📖 符号反転');
    
    if (currentExpression) {
        // 最後の数値部分を反転
        currentExpression = currentExpression.replace(/([\d.]+)$/, (match) => {
            return (-parseFloat(match)).toString();
        });
    } else if (currentResult !== 0) {
        currentExpression = (-currentResult).toString();
    }
    
    updateDisplays();
    updateStatus('符号を反転');
    
    console.log(`✅ 符号反転後: ${currentExpression}`);
}

/**
 * 計算実行
 */
function calculate() {
    console.log('📖 計算実行');
    
    if (!currentExpression) {
        updateStatus('❌ 計算する式がありません');
        return;
    }
    
    try {
        const result = evaluateExpression(currentExpression);
        
        // 履歴に追加
        addToHistory(currentExpression, result);
        
        currentResult = result;
        mainDisplay.textContent = formatResult(result);
        expressionDisplay.textContent = `${currentExpression} =`;
        
        currentExpression = '';
        waitingForNewInput = true;
        
        calculationCount++;
        updateCalculationCount();
        updateStatus(`✅ 計算完了: ${formatResult(result)}`);
        
        console.log(`✅ 計算完了: ${result}`);
        
    } catch (error) {
        console.error('❌ 計算エラー:', error.message);
        showError(error.message);
        
        errorCount++;
        updateErrorCount();
    }
}

/**
 * 数式の評価（メイン処理）
 */
function evaluateExpression(expression) {
    console.log(`📊 数式評価開始: ${expression}`);
    
    // 数式の前処理
    let processedExpression = preprocessExpression(expression);
    console.log(`📊 前処理後: ${processedExpression}`);
    
    // 括弧のバランスチェック
    if (!checkBracketBalance(processedExpression)) {
        throw new Error('括弧のバランスが合いません');
    }
    
    // 数式の評価
    const result = evaluateProcessedExpression(processedExpression);
    
    // 結果の検証
    if (!isFinite(result)) {
        throw new Error('計算結果が無限大または非数値です');
    }
    
    return result;
}

/**
 * 数式の前処理
 */
function preprocessExpression(expression) {
    let processed = expression;
    
    // 定数の置換
    processed = processed.replace(/π/g, Math.PI.toString());
    processed = processed.replace(/e/g, Math.E.toString());
    
    // 表示用記号を計算用に変換
    processed = processed.replace(/×/g, '*');
    processed = processed.replace(/÷/g, '/');
    processed = processed.replace(/\^/g, '**');
    
    return processed;
}

/**
 * 括弧のバランスチェック
 */
function checkBracketBalance(expression) {
    let balance = 0;
    for (let char of expression) {
        if (char === '(') balance++;
        if (char === ')') balance--;
        if (balance < 0) return false;
    }
    return balance === 0;
}

/**
 * 前処理済み数式の評価
 */
function evaluateProcessedExpression(expression) {
    // 関数の処理
    let processed = expression;
    
    // 三角関数の処理
    processed = processed.replace(/sin\(([^)]+)\)/g, (match, p1) => {
        const angle = evaluateProcessedExpression(p1);
        return Math.sin(angleMode === 'DEG' ? angle * Math.PI / 180 : angle).toString();
    });
    
    processed = processed.replace(/cos\(([^)]+)\)/g, (match, p1) => {
        const angle = evaluateProcessedExpression(p1);
        return Math.cos(angleMode === 'DEG' ? angle * Math.PI / 180 : angle).toString();
    });
    
    processed = processed.replace(/tan\(([^)]+)\)/g, (match, p1) => {
        const angle = evaluateProcessedExpression(p1);
        return Math.tan(angleMode === 'DEG' ? angle * Math.PI / 180 : angle).toString();
    });
    
    // 対数関数
    processed = processed.replace(/log\(([^)]+)\)/g, (match, p1) => {
        const value = evaluateProcessedExpression(p1);
        if (value <= 0) throw new Error('対数の引数は正の数である必要があります');
        return Math.log10(value).toString();
    });
    
    processed = processed.replace(/ln\(([^)]+)\)/g, (match, p1) => {
        const value = evaluateProcessedExpression(p1);
        if (value <= 0) throw new Error('自然対数の引数は正の数である必要があります');
        return Math.log(value).toString();
    });
    
    // 平方根
    processed = processed.replace(/sqrt\(([^)]+)\)/g, (match, p1) => {
        const value = evaluateProcessedExpression(p1);
        if (value < 0) throw new Error('平方根の引数は非負である必要があります');
        return Math.sqrt(value).toString();
    });
    
    // 基本的な算術式の評価
    try {
        return Function('"use strict"; return (' + processed + ')')();
    } catch (error) {
        throw new Error('数式の評価に失敗しました');
    }
}

/**
 * カスタム数式の評価
 */
function evaluateCustomExpression() {
    const expression = customExpressionInput.value.trim();
    
    if (!expression) {
        updateStatus('❌ 数式を入力してください');
        return;
    }
    
    console.log(`📖 カスタム数式評価: ${expression}`);
    
    try {
        const result = evaluateExpression(expression);
        
        // メイン表示に結果を設定
        currentResult = result;
        mainDisplay.textContent = formatResult(result);
        expressionDisplay.textContent = `${expression} =`;
        currentExpression = '';
        
        // 履歴に追加
        addToHistory(expression, result);
        
        calculationCount++;
        updateCalculationCount();
        updateStatus(`✅ カスタム計算完了: ${formatResult(result)}`);
        
        // 入力欄をクリア
        customExpressionInput.value = '';
        
        console.log(`✅ カスタム計算完了: ${result}`);
        
    } catch (error) {
        console.error('❌ カスタム計算エラー:', error.message);
        showError(error.message);
        
        errorCount++;
        updateErrorCount();
    }
}

/**
 * 角度モードの切り替え
 */
function toggleAngleMode() {
    angleMode = angleMode === 'DEG' ? 'RAD' : 'DEG';
    angleModeElement.textContent = `角度モード: ${angleMode}`;
    updateStatus(`角度モードを${angleMode}に変更`);
    
    console.log(`✅ 角度モード変更: ${angleMode}`);
}

/**
 * 全クリア
 */
function clearAll() {
    console.log('📖 全クリア実行');
    
    currentExpression = '';
    currentResult = 0;
    waitingForNewInput = false;
    
    mainDisplay.textContent = '0';
    expressionDisplay.textContent = '準備完了';
    updateStatus('🔄 計算機を初期化');
    
    console.log('✅ 全クリア完了');
}

/**
 * エントリークリア
 */
function clearEntry() {
    console.log('📖 エントリークリア実行');
    
    currentExpression = '';
    mainDisplay.textContent = '0';
    expressionDisplay.textContent = '入力クリア';
    updateStatus('🔄 現在の入力をクリア');
    
    console.log('✅ エントリークリア完了');
}

/**
 * 履歴管理
 */
function addToHistory(expression, result) {
    const historyItem = {
        expression: expression,
        result: result,
        timestamp: new Date().toLocaleTimeString()
    };
    
    calculationHistory.unshift(historyItem);
    
    if (calculationHistory.length > 50) {
        calculationHistory = calculationHistory.slice(0, 50);
    }
    
    updateHistoryDisplay();
    console.log('✅ 履歴追加:', historyItem);
}

function updateHistoryDisplay() {
    historyList.innerHTML = '';
    
    if (calculationHistory.length === 0) {
        const emptyItem = document.createElement('div');
        emptyItem.className = 'history-item';
        emptyItem.innerHTML = '<div class="history-expression">履歴が表示されます</div>';
        historyList.appendChild(emptyItem);
        return;
    }
    
    calculationHistory.slice(0, 10).forEach((item) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-expression">${item.expression}</div>
            <div class="history-result">${formatResult(item.result)}</div>
        `;
        
        historyItem.style.cursor = 'pointer';
        historyItem.onclick = () => {
            currentResult = item.result;
            mainDisplay.textContent = formatResult(item.result);
            expressionDisplay.textContent = item.expression + ' =';
            currentExpression = '';
            waitingForNewInput = true;
            updateStatus(`履歴から選択: ${item.expression}`);
        };
        
        historyList.appendChild(historyItem);
    });
}

function clearHistory() {
    calculationHistory = [];
    updateHistoryDisplay();
    updateStatus('📚 履歴をクリア');
}

/**
 * 表示更新系の関数
 */
function updateDisplays() {
    if (currentExpression) {
        mainDisplay.textContent = currentExpression;
        expressionDisplay.textContent = currentExpression;
    } else {
        mainDisplay.textContent = formatResult(currentResult);
        expressionDisplay.textContent = '準備完了';
    }
    
    mainDisplay.classList.remove('error');
}

function updateStatus(message) {
    const timestamp = new Date().toLocaleTimeString();
    currentStatusElement.textContent = `[${timestamp}] ${message}`;
}

function updateCalculationCount() {
    calculationCountElement.textContent = calculationCount;
}

function updateFunctionCount() {
    functionCountElement.textContent = functionUsageCount;
}

function updateBracketCount() {
    bracketCountElement.textContent = bracketUsageCount;
}

function updateErrorCount() {
    errorCountElement.textContent = errorCount;
}

/**
 * エラー表示
 */
function showError(message) {
    mainDisplay.textContent = `エラー: ${message}`;
    mainDisplay.classList.add('error');
    expressionDisplay.textContent = 'エラーが発生しました';
    
    setTimeout(() => {
        clearAll();
    }, 4000);
}

/**
 * ヘルパー関数
 */
function getOperatorSymbol(op) {
    const symbols = { '+': '+', '-': '-', '*': '×', '/': '÷' };
    return symbols[op] || op;
}

function getOperatorName(op) {
    const names = { '+': '足し算', '-': '引き算', '*': '掛け算', '/': '割り算' };
    return names[op] || op;
}

function formatResult(result) {
    if (Math.abs(result) < 1e-10) return '0';
    if (Math.abs(result) > 1e10) return result.toExponential(6);
    return parseFloat(result.toPrecision(12)).toString();
}

// キーボード対応（完全版）
document.addEventListener('keydown', function(event) {
    const key = event.key;
    const shiftKey = event.shiftKey;
    
    // 数字キー
    if (key >= '0' && key <= '9') {
        inputNumber(parseInt(key));
        event.preventDefault();
    }
    // 基本演算子
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
    // 括弧
    else if (key === '(' || key === ')') {
        inputBracket(key);
        event.preventDefault();
    }
    // 関数のショートカット
    else if (key.toLowerCase() === 's') {
        inputFunction('sin');
        event.preventDefault();
    } else if (key.toLowerCase() === 'c') {
        inputFunction('cos');
        event.preventDefault();
    } else if (key.toLowerCase() === 't') {
        inputFunction('tan');
        event.preventDefault();
    } else if (key.toLowerCase() === 'q') {
        inputFunction('sqrt');
        event.preventDefault();
    } else if (key.toLowerCase() === 'l') {
        inputFunction('log');
        event.preventDefault();
    } else if (key.toLowerCase() === 'p') {
        inputConstant('pi');
        event.preventDefault();
    } else if (key === '^') {
        inputFunction('pow');
        event.preventDefault();
    } else if (key === '@' && shiftKey) {
        inputFunction('square');
        event.preventDefault();
    }
    // その他
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

// カスタム数式入力のEnterキー対応
customExpressionInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        evaluateCustomExpression();
        event.preventDefault();
    }
});

// 初期化処理
console.log('🚀 高度な計算機が起動しました');
updateStatus('高度な計算機が起動しました');
updateHistoryDisplay();