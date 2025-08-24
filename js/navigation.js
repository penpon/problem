/**
 * 共通ナビゲーション機能
 * JavaScript学習サイト統合システム
 */

class NavigationManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.initializeNavigation();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        if (filename === 'grader.html') return 'grader';
        if (filename === 'visualizer.html') return 'visualizer';
        if (filename === 'frontend.html') return 'frontend';
        if (filename === 'memory-state-transition.html') return 'memory';
        if (filename === 'sequence-diagram.html') return 'sequence';
        if (filename === 'quiz.html') return 'quiz';
        return 'home';
    }

    initializeNavigation() {
        this.createNavigationHeader();
        this.addNavigationStyles();
    }

    createNavigationHeader() {
        // 既存のbodyの最初に挿入するためのヘッダーを作成
        const header = document.createElement('div');
        header.className = 'nav-header';
        header.innerHTML = this.getHeaderHTML();

        // bodyの最初に挿入
        document.body.insertBefore(header, document.body.firstChild);
    }

    getHeaderHTML() {
        return `
            <nav class="nav-container">
                <div class="nav-content">
                    <div class="nav-links">
                        <a href="index.html" class="nav-link ${this.currentPage === 'home' ? 'active' : ''}">
                            <span class="link-icon">🏠</span>
                            <span class="link-text">ホーム</span>
                        </a>
                        <a href="grader.html" class="nav-link ${this.currentPage === 'grader' ? 'active' : ''}">
                            <span class="link-icon">📊</span>
                            <span class="link-text">採点システム</span>
                        </a>
                        <a href="frontend.html" class="nav-link ${this.currentPage === 'frontend' ? 'active' : ''}">
                            <span class="link-icon">🎨</span>
                            <span class="link-text">フロントエンド</span>
                        </a>
                        <a href="quiz.html" class="nav-link ${this.currentPage === 'quiz' ? 'active' : ''}">
                            <span class="link-icon">📱</span>
                            <span class="link-text">エンジニアクイズ</span>
                        </a>
                        <a href="visualizer.html" class="nav-link ${this.currentPage === 'visualizer' ? 'active' : ''}">
                            <span class="link-icon">🔍</span>
                            <span class="link-text">可視化ツール</span>
                        </a>
                        <a href="memory-state-transition.html" class="nav-link ${this.currentPage === 'memory' ? 'active' : ''}">
                            <span class="link-icon">🧠</span>
                            <span class="link-text">メモリ解析</span>
                        </a>
                        <a href="sequence-diagram.html" class="nav-link ${this.currentPage === 'sequence' ? 'active' : ''}">
                            <span class="link-icon">📈</span>
                            <span class="link-text">フロー図生成</span>
                        </a>
                    </div>
                    
                    <button class="mobile-menu-toggle" onclick="navigationManager.toggleMobileMenu()">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
        `;
    }

    addNavigationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .nav-header {
                position: sticky;
                top: 0;
                z-index: 1000;
                background: white;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                border-bottom: 1px solid #e2e8f0;
            }

            .nav-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
            }

            .nav-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 64px;
            }

            .nav-brand {
                display: flex;
                align-items: center;
                text-decoration: none;
                color: #2d3748;
                font-weight: bold;
                font-size: 1.2em;
                white-space: nowrap;
                flex-shrink: 0;
            }

            .nav-brand:hover {
                color: #4299e1;
            }

            .nav-icon {
                font-size: 1.5em;
                margin-right: 10px;
                flex-shrink: 0;
            }

            .nav-title {
                white-space: nowrap;
            }

            .nav-links {
                display: flex;
                gap: 12px;
                align-items: center;
                flex-wrap: nowrap;
            }

            .nav-link {
                display: flex;
                align-items: center;
                text-decoration: none;
                color: #718096;
                padding: 6px 12px;
                border-radius: 6px;
                transition: all 0.3s ease;
                font-weight: 500;
                white-space: nowrap;
                font-size: 0.9em;
            }

            .nav-link:hover {
                background: #f7fafc;
                color: #4299e1;
                transform: translateY(-1px);
            }

            .nav-link.active {
                background: #ebf8ff;
                color: #4299e1;
                font-weight: 600;
            }

            .link-icon {
                margin-right: 4px;
                font-size: 1em;
            }

            .mobile-menu-toggle {
                display: none;
                flex-direction: column;
                background: none;
                border: none;
                cursor: pointer;
                padding: 4px;
                gap: 3px;
            }

            .mobile-menu-toggle span {
                width: 25px;
                height: 3px;
                background: #4a5568;
                border-radius: 2px;
                transition: all 0.3s ease;
            }

            .mobile-menu-toggle:hover span {
                background: #4299e1;
            }

            /* 中サイズ画面での調整 */
            @media (max-width: 1200px) {
                .nav-link {
                    padding: 6px 10px;
                    font-size: 0.85em;
                }
                
                .nav-links {
                    gap: 8px;
                }
                
                .link-icon {
                    margin-right: 3px;
                    font-size: 0.9em;
                }
            }

            /* 1100px以下での追加調整 - ナビゲーションタイトルの折り返し防止強化 */
            @media (max-width: 1100px) {
                .nav-brand {
                    font-size: 1.1em;
                }
                
                .nav-links {
                    gap: 6px;
                }
                
                .nav-link {
                    padding: 6px 8px;
                    font-size: 0.8em;
                }
            }

            /* タブレット・モバイル対応 */
            @media (max-width: 1024px) {
                .nav-brand .nav-title {
                    display: none;
                }

                .nav-links {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    flex-direction: column;
                    padding: 20px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                    gap: 10px;
                }

                .nav-links.mobile-open {
                    display: flex;
                }

                .nav-link {
                    justify-content: center;
                    padding: 12px 20px;
                    width: 100%;
                }

                .mobile-menu-toggle {
                    display: flex;
                }

                .link-text {
                    font-size: 1em;
                }
            }

            @media (max-width: 480px) {
                .nav-container {
                    padding: 0 15px;
                }

                .nav-content {
                    height: 56px;
                }

                .link-icon {
                    font-size: 1.2em;
                }
            }

            /* ページ調整 - ナビゲーションヘッダーの分だけ上部マージンを調整 */
            body {
                margin-top: 0;
            }

            .nav-header + .header {
                margin-top: 0;
            }

            .nav-header + .container {
                margin-top: 20px;
            }

            /* quiz.html専用の調整 */
            .nav-header + .quiz-container {
                margin-top: 0;
            }

            .nav-header + .quiz-container .quiz-header .header-content {
                display: none; /* クイズロゴとメニューボタンのみ非表示 */
            }

            .nav-header + .quiz-container .quiz-header {
                background: transparent; /* 背景を透明に */
                padding: 10px 0; /* パディング調整 */
            }
        `;
        document.head.appendChild(style);
    }

    toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('mobile-open');
    }

    // コード共有機能
    shareCodeToVisualizer(code) {
        if (!code || code.trim() === '') {
            alert('共有するコードがありません。');
            return;
        }

        try {
            localStorage.setItem('visualizerCode', code);
            localStorage.setItem('visualizerCodeTimestamp', Date.now().toString());
            
            // 新しいタブで可視化ツールを開く
            const url = 'visualizer.html?from=grader&shared=true';
            window.open(url, '_blank');
        } catch (error) {
            console.error('コードの共有に失敗しました:', error);
            alert('コードの共有に失敗しました。');
        }
    }

    // 共有されたコードを取得
    getSharedCode() {
        try {
            const params = new URLSearchParams(window.location.search);
            
            if (params.get('shared') === 'true' && params.get('from') === 'grader') {
                const code = localStorage.getItem('visualizerCode');
                const timestamp = localStorage.getItem('visualizerCodeTimestamp');
                
                // 1時間以内の共有のみ有効
                if (code && timestamp) {
                    const age = Date.now() - parseInt(timestamp);
                    if (age < 3600000) { // 1時間 = 3600000ms
                        // 使用後は削除（一回限り）
                        localStorage.removeItem('visualizerCode');
                        localStorage.removeItem('visualizerCodeTimestamp');
                        return code;
                    }
                }
            }
        } catch (error) {
            console.error('共有コードの取得に失敗しました:', error);
        }
        
        return null;
    }

    // 通知機能
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // 通知スタイルを追加（初回のみ）
        if (!document.querySelector('#notification-styles')) {
            this.addNotificationStyles();
        }

        document.body.appendChild(notification);

        // 5秒後に自動削除
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        switch (type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            default: return 'ℹ️';
        }
    }

    addNotificationStyles() {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 80px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 9999;
                animation: slideIn 0.3s ease;
                max-width: 400px;
                border-left: 4px solid #4299e1;
            }

            .notification-success {
                border-left-color: #48bb78;
            }

            .notification-error {
                border-left-color: #f56565;
            }

            .notification-warning {
                border-left-color: #ed8936;
            }

            .notification-content {
                display: flex;
                align-items: center;
                padding: 12px 16px;
                gap: 10px;
            }

            .notification-icon {
                font-size: 1.2em;
            }

            .notification-message {
                flex: 1;
                color: #2d3748;
                font-weight: 500;
            }

            .notification-close {
                background: none;
                border: none;
                font-size: 1.2em;
                cursor: pointer;
                color: #a0aec0;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .notification-close:hover {
                color: #718096;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @media (max-width: 480px) {
                .notification {
                    left: 10px;
                    right: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// DOMの読み込み完了後にナビゲーションを初期化
document.addEventListener('DOMContentLoaded', function() {
    window.navigationManager = new NavigationManager();
});

// グローバル関数として公開（他のスクリプトからも使用可能）
window.shareCodeToVisualizer = function(code) {
    if (window.navigationManager) {
        window.navigationManager.shareCodeToVisualizer(code);
    }
};

window.getSharedCode = function() {
    if (window.navigationManager) {
        return window.navigationManager.getSharedCode();
    }
    return null;
};

window.showNotification = function(message, type = 'info') {
    if (window.navigationManager) {
        window.navigationManager.showNotification(message, type);
    }
};
