/* ===== NOTIFICATION SYSTEM - 通知システム ===== */

// 通知システム（新機能）
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    // 3秒後に自動で非表示
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// アニメーションログ記録（新機能）
function logAnimation(action) {
    const timestamp = new Date().toLocaleTimeString();
    const animationDisplay = document.getElementById('animationDisplay');
    animationDisplay.textContent = `${timestamp}: ${action}`;
    console.log(`アニメーション: ${action}`);
}