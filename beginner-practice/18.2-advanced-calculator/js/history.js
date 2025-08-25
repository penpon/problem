/* history.js - 履歴機能と統計情報の管理 */

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

// 初期化処理
updateHistoryDisplay();