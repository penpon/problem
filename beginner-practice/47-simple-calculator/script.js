// 18-simple-calculator: 簡単計算機の実装

// 計算履歴を保存する配列
let calculationHistory = [];

// DOMが読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    
    // === 基本計算機の実装 ===
    
    document.getElementById('calculate').addEventListener('click', function() {
        // 入力値を取得
        const num1Input = document.getElementById('num1').value;
        const num2Input = document.getElementById('num2').value;
        const operation = document.getElementById('operation').value;
        
        // エラーメッセージをクリア
        clearError();
        
        try {
            // 入力値のバリデーション
            if (!num1Input || !num2Input) {
                throw new Error('両方の数値を入力してください');
            }
            
            // 数値に変換
            const num1 = parseFloat(num1Input);
            const num2 = parseFloat(num2Input);
            
            // 数値の妥当性チェック
            if (isNaN(num1) || isNaN(num2)) {
                throw new Error('有効な数値を入力してください');
            }
            
            // 計算実行
            let result = performCalculation(num1, num2, operation);
            
            // 結果の表示
            displayResult(num1, num2, operation, result);
            
            // 履歴に追加
            addToHistory(num1, num2, operation, result);
            
        } catch (error) {
            // エラーメッセージを表示
            showError(error.message);
        }
    });
    
    // === 履歴管理 ===
    
    document.getElementById('clear-history').addEventListener('click', function() {
        calculationHistory = [];
        updateHistoryDisplay();
    });
    
    // === 特殊計算の実装 ===
    
    // 平方根計算
    document.getElementById('sqrt-btn').addEventListener('click', function() {
        const input = document.getElementById('sqrt-input').value;
        const resultSpan = document.getElementById('sqrt-result');
        
        if (!input) {
            resultSpan.textContent = 'エラー: 数値を入力してください';
            resultSpan.className = 'special-result error';
            return;
        }
        
        const num = parseFloat(input);
        if (isNaN(num)) {
            resultSpan.textContent = 'エラー: 有効な数値を入力してください';
            resultSpan.className = 'special-result error';
            return;
        }
        
        if (num < 0) {
            resultSpan.textContent = 'エラー: 負の数の平方根は計算できません';
            resultSpan.className = 'special-result error';
            return;
        }
        
        const result = Math.sqrt(num);
        resultSpan.textContent = `= ${result.toFixed(4)}`;
        resultSpan.className = 'special-result success';
    });
    
    // 乗算計算
    document.getElementById('power-btn').addEventListener('click', function() {
        const baseInput = document.getElementById('power-base').value;
        const expInput = document.getElementById('power-exp').value;
        const resultSpan = document.getElementById('power-result');
        
        if (!baseInput || !expInput) {
            resultSpan.textContent = 'エラー: 両方の数値を入力してください';
            resultSpan.className = 'special-result error';
            return;
        }
        
        const base = parseFloat(baseInput);
        const exp = parseFloat(expInput);
        
        if (isNaN(base) || isNaN(exp)) {
            resultSpan.textContent = 'エラー: 有効な数値を入力してください';
            resultSpan.className = 'special-result error';
            return;
        }
        
        const result = Math.pow(base, exp);
        resultSpan.textContent = `= ${result.toFixed(4)}`;
        resultSpan.className = 'special-result success';
    });
    
    // 円の面積計算
    document.getElementById('circle-btn').addEventListener('click', function() {
        const input = document.getElementById('circle-radius').value;
        const resultSpan = document.getElementById('circle-result');
        
        if (!input) {
            resultSpan.textContent = 'エラー: 半径を入力してください';
            resultSpan.className = 'special-result error';
            return;
        }
        
        const radius = parseFloat(input);
        if (isNaN(radius)) {
            resultSpan.textContent = 'エラー: 有効な数値を入力してください';
            resultSpan.className = 'special-result error';
            return;
        }
        
        if (radius < 0) {
            resultSpan.textContent = 'エラー: 半径は正の数である必要があります';
            resultSpan.className = 'special-result error';
            return;
        }
        
        const area = Math.PI * Math.pow(radius, 2);
        resultSpan.textContent = `= ${area.toFixed(4)}`;
        resultSpan.className = 'special-result success';
    });
    
    // Enter キーで計算実行
    document.getElementById('num1').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('calculate').click();
        }
    });
    
    document.getElementById('num2').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('calculate').click();
        }
    });
});

// === ヘルパー関数 ===

// 計算を実行する関数
function performCalculation(num1, num2, operation) {
    let result;
    
    switch (operation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                throw new Error('0で割ることはできません');
            }
            result = num1 / num2;
            break;
        default:
            throw new Error('無効な演算子です');
    }
    
    return result;
}

// 結果を表示する関数
function displayResult(num1, num2, operation, result) {
    const resultElement = document.getElementById('result');
    const operatorSymbol = getOperatorSymbol(operation);
    const formattedResult = Number.isInteger(result) ? result : result.toFixed(4);
    
    resultElement.innerHTML = `
        <div class="calculation">
            <span class="calculation-expression">${num1} ${operatorSymbol} ${num2}</span>
            <span class="equals"> = </span>
            <span class="calculation-result">${formattedResult}</span>
        </div>
    `;
    resultElement.className = 'result-display success';
}

// 演算子の表示用記号を取得
function getOperatorSymbol(operation) {
    const symbols = {
        '+': '+',
        '-': '-',
        '*': '×',
        '/': '÷'
    };
    return symbols[operation] || operation;
}

// エラーメッセージを表示する関数
function showError(message) {
    const errorElement = document.getElementById('error');
    const resultElement = document.getElementById('result');
    
    errorElement.textContent = `⚠️ ${message}`;
    errorElement.style.display = 'block';
    
    resultElement.textContent = '計算エラー';
    resultElement.className = 'result-display error';
}

// エラーメッセージをクリアする関数
function clearError() {
    const errorElement = document.getElementById('error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

// 履歴に計算結果を追加
function addToHistory(num1, num2, operation, result) {
    const timestamp = new Date().toLocaleString();
    const operatorSymbol = getOperatorSymbol(operation);
    const formattedResult = Number.isInteger(result) ? result : result.toFixed(4);
    
    const historyItem = {
        expression: `${num1} ${operatorSymbol} ${num2} = ${formattedResult}`,
        timestamp: timestamp
    };
    
    calculationHistory.unshift(historyItem); // 最新を先頭に追加
    
    // 履歴は最大20件まで
    if (calculationHistory.length > 20) {
        calculationHistory.pop();
    }
    
    updateHistoryDisplay();
}

// 履歴表示を更新
function updateHistoryDisplay() {
    const historyElement = document.getElementById('history');
    
    if (calculationHistory.length === 0) {
        historyElement.innerHTML = '<p class="history-empty">計算履歴はまだありません</p>';
        return;
    }
    
    const historyHTML = calculationHistory.map((item, index) => `
        <div class="history-item">
            <div class="history-expression">${item.expression}</div>
            <div class="history-time">${item.timestamp}</div>
        </div>
    `).join('');
    
    historyElement.innerHTML = historyHTML;
}

// 初期メッセージ
console.log('🧮 ステップ18: 簡単計算機が読み込まれました！');
console.log('💡 数値を入力して計算してみましょう！');