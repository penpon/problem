/**
 * Bootstrap基礎学習 - インタラクティブ機能
 * 学習効果を高めるための補助機能を実装
 */

// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Bootstrap基礎学習が開始されました！');
    
    // 初期化処理
    initializeAnimations();
    initializeProgressTracking();
    initializeInteractiveElements();
    setupResponsiveHints();
});

/**
 * アニメーション効果の初期化
 */
function initializeAnimations() {
    // フェードインアニメーションを適用
    const sections = document.querySelectorAll('section');
    
    // Intersection Observer でスクロール時のアニメーション
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * 学習進度の追跡
 */
function initializeProgressTracking() {
    // ページ内のクリックやスクロールを追跡
    let interactionCount = 0;
    const maxInteractions = 10;
    
    // クリックイベントの監視
    document.addEventListener('click', function(e) {
        if (e.target.matches('button, .btn, .card')) {
            interactionCount++;
            updateProgress();
            
            // ボタンクリック時のフィードバック
            showClickFeedback(e.target);
        }
    });
    
    // 進度の更新
    function updateProgress() {
        const progress = Math.min((interactionCount / maxInteractions) * 100, 100);
        console.log(`学習進度: ${progress.toFixed(0)}%`);
        
        // 進度が100%になったら祝福メッセージ
        if (progress === 100) {
            showCongratulations();
        }
    }
    
    // クリックフィードバック表示
    function showClickFeedback(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }
}

/**
 * インタラクティブ要素の設定
 */
function initializeInteractiveElements() {
    // ツールチップの有効化
    enableTooltips();
    
    // グリッドデモの強化
    enhanceGridDemo();
    
    // ボタンホバーエフェクト
    addButtonEffects();
}

/**
 * ツールチップ機能の有効化
 */
function enableTooltips() {
    // Bootstrap tooltipを有効化
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // カスタムツールチップを追加
    const gridCols = document.querySelectorAll('.row > div');
    gridCols.forEach(col => {
        const classes = col.className;
        col.setAttribute('title', `クラス: ${classes}`);
        new bootstrap.Tooltip(col);
    });
}

/**
 * グリッドデモの強化
 */
function enhanceGridDemo() {
    const gridItems = document.querySelectorAll('.row > div > div');
    
    gridItems.forEach(item => {
        // ホバー時に詳細情報を表示
        item.addEventListener('mouseenter', function() {
            const parentCol = this.parentElement;
            const colClasses = parentCol.className.match(/col-\w*-?\d*/g) || [];
            
            // 一時的にクラス情報を表示
            const originalText = this.textContent;
            this.innerHTML = `
                ${originalText}<br>
                <small class="text-white-50">${colClasses.join(' ')}</small>
            `;
        });
        
        item.addEventListener('mouseleave', function() {
            // 元のテキストに戻す
            const lines = this.innerHTML.split('<br>');
            this.textContent = lines[0];
        });
    });
}

/**
 * ボタンエフェクトの追加
 */
function addButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // クリック時のリップル効果
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: 20px;
                height: 20px;
                margin-left: -10px;
                margin-top: -10px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // リップルアニメーションのCSS追加
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

/**
 * レスポンシブヒントの設定
 */
function setupResponsiveHints() {
    // 画面サイズ変更時の処理
    window.addEventListener('resize', debounce(function() {
        const width = window.innerWidth;
        let deviceType;
        
        if (width >= 992) {
            deviceType = 'デスクトップ';
        } else if (width >= 576) {
            deviceType = 'タブレット';
        } else {
            deviceType = 'スマートフォン';
        }
        
        // コンソールに表示
        console.log(`📱 現在の表示: ${deviceType} (${width}px)`);
        
        // 一時的に画面サイズを表示
        showDeviceInfo(deviceType, width);
    }, 300));
}

/**
 * デバイス情報の表示
 */
function showDeviceInfo(deviceType, width) {
    // 既存の表示があれば削除
    const existing = document.getElementById('device-info');
    if (existing) existing.remove();
    
    const info = document.createElement('div');
    info.id = 'device-info';
    info.innerHTML = `📱 ${deviceType}: ${width}px`;
    info.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.8rem;
        z-index: 9999;
        animation: fadeInOut 2s ease;
    `;
    
    document.body.appendChild(info);
    
    setTimeout(() => {
        if (info.parentNode) {
            info.remove();
        }
    }, 2000);
}

/**
 * 解答例を表示する関数（HTMLから呼び出し）
 */
function showSolution() {
    const solutionDiv = document.getElementById('solution');
    const button = event.target;
    
    if (solutionDiv.style.display === 'none') {
        solutionDiv.style.display = 'block';
        button.textContent = '解答例を非表示';
        button.className = 'btn btn-outline-secondary';
        
        // アニメーション効果
        solutionDiv.style.opacity = '0';
        solutionDiv.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            solutionDiv.style.transition = 'all 0.3s ease';
            solutionDiv.style.opacity = '1';
            solutionDiv.style.transform = 'translateY(0)';
        }, 10);
        
        // 祝福メッセージ
        setTimeout(() => {
            showToast('🎉 素晴らしい！課題に取り組んでいますね');
        }, 500);
        
    } else {
        solutionDiv.style.display = 'none';
        button.textContent = '解答例を表示';
        button.className = 'btn btn-outline-primary';
    }
}

/**
 * 祝福メッセージの表示
 */
function showCongratulations() {
    showToast('🎉 お疲れ様！Bootstrap基礎をマスターしました！次の20.0.2に進みましょう', 'success');
}

/**
 * トーストメッセージの表示
 */
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // 自動削除
    toast.addEventListener('hidden.bs.toast', function () {
        toast.remove();
    });
}

/**
 * トーストコンテナの作成
 */
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(container);
    return container;
}

/**
 * デバウンス関数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * フェードイン・アウトアニメーションのCSS追加
 */
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; }
        20%, 80% { opacity: 1; }
    }
`;
document.head.appendChild(animationStyles);

// デバッグ用のグローバル関数
window.bootstrapLearning = {
    showProgress: () => console.log('学習進度機能が有効です'),
    resetProgress: () => location.reload(),
    showDeviceInfo: () => setupResponsiveHints()
};