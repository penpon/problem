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