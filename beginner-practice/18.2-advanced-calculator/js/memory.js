/* memory.js - メモリ機能の管理 */

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