/**
 * QuizAnimations - アニメーション制御システム
 * 問題文と選択肢の動的アニメーション管理
 */

class QuizAnimations {
    constructor() {
        this.animationQueue = [];
        this.isAnimating = false;
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // アニメーション設定
        this.config = {
            enableAnimations: !this.prefersReducedMotion,
            typingSpeed: 50, // ミリ秒
            wordDelay: 100, // ミリ秒
            defaultDuration: 300 // ミリ秒
        };
        
        console.log('🎬 QuizAnimations initialized', this.prefersReducedMotion ? '(reduced motion)' : '');
    }

    /**
     * 問題文のアニメーション
     * @param {HTMLElement} element 対象要素
     * @param {string} text 表示するテキスト
     * @param {string} type アニメーションタイプ
     * @returns {Promise} アニメーション完了Promise
     */
    async animateQuestionText(element, text, type = 'fade-in') {
        if (!this.config.enableAnimations) {
            element.textContent = text;
            return Promise.resolve();
        }

        // 既存のアニメーションクラスをクリア
        this.clearAnimationClasses(element);
        
        switch (type) {
            case 'typing':
            case 'terminal_typing':
                return this.animateTyping(element, text);
            case 'words':
            case 'fade_in_words':
                return this.animateWords(element, text);
            case 'fade-in':
            default:
                return this.animateFadeIn(element, text);
        }
    }

    /**
     * タイプライター効果
     * @private
     */
    async animateTyping(element, text) {
        element.textContent = '';
        element.classList.add('animate-typing');
        
        return new Promise((resolve) => {
            let index = 0;
            const interval = setInterval(() => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(interval);
                    element.classList.remove('animate-typing');
                    resolve();
                }
            }, this.config.typingSpeed);
        });
    }

    /**
     * 単語ごとのフェードイン
     * @private
     */
    async animateWords(element, text) {
        const words = text.split(' ');
        element.innerHTML = '';
        element.classList.add('animate-words');
        
        // 単語をspan要素で囲む
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = word + (index < words.length - 1 ? ' ' : '');
            element.appendChild(span);
        });
        
        // アニメーション完了を待つ
        const totalDuration = words.length * this.config.wordDelay + 500;
        return new Promise(resolve => setTimeout(resolve, totalDuration));
    }

    /**
     * フェードイン効果
     * @private
     */
    async animateFadeIn(element, text) {
        element.textContent = text;
        element.classList.add('animate-fade-in');
        
        return new Promise(resolve => 
            setTimeout(resolve, this.config.defaultDuration)
        );
    }

    /**
     * 選択肢のアニメーション
     * @param {HTMLElement[]} choiceElements 選択肢要素配列
     * @param {string} type アニメーションタイプ
     * @returns {Promise} アニメーション完了Promise
     */
    async animateChoices(choiceElements, type = 'slide-in-up') {
        if (!this.config.enableAnimations) {
            return Promise.resolve();
        }

        const animations = choiceElements.map((element, index) => {
            if (!element) return Promise.resolve();
            
            this.clearAnimationClasses(element);
            
            return new Promise(resolve => {
                setTimeout(() => {
                    element.classList.add(`animate-${type}`);
                    setTimeout(resolve, this.config.defaultDuration);
                }, index * 100);
            });
        });

        return Promise.all(animations);
    }

    /**
     * 正解フィードバックアニメーション
     * @param {HTMLElement} element 対象要素
     * @returns {Promise} アニメーション完了Promise
     */
    async animateCorrectFeedback(element) {
        if (!this.config.enableAnimations) {
            return Promise.resolve();
        }

        element.classList.add('animate-correct');
        
        // パーティクル効果
        this.createParticleEffect(element, 'correct');
        
        return new Promise(resolve => setTimeout(resolve, 600));
    }

    /**
     * 不正解フィードバックアニメーション
     * @param {HTMLElement} element 対象要素
     * @returns {Promise} アニメーション完了Promise
     */
    async animateIncorrectFeedback(element) {
        if (!this.config.enableAnimations) {
            return Promise.resolve();
        }

        element.classList.add('animate-incorrect');
        
        // 振動効果（対応デバイスのみ）
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
        
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    /**
     * パーティクル効果の作成
     * @private
     */
    createParticleEffect(element, type = 'correct') {
        const colors = type === 'correct' ? 
            ['#10b981', '#34d399', '#6ee7b7'] : 
            ['#ef4444', '#f87171', '#fca5a5'];
        
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                this.createParticle(centerX, centerY, colors[Math.floor(Math.random() * colors.length)]);
            }, i * 50);
        }
    }

    /**
     * 個別パーティクルの作成
     * @private
     */
    createParticle(x, y, color) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 6px;
            height: 6px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(particle);
        
        // ランダムな方向に移動
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        particle.animate([
            { 
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).onfinish = () => {
            particle.remove();
        };
    }

    /**
     * 祝福アニメーション（高得点時）
     * @param {HTMLElement} container コンテナ要素
     * @returns {Promise} アニメーション完了Promise
     */
    async animateCelebration(container) {
        if (!this.config.enableAnimations) {
            return Promise.resolve();
        }

        // 紙吹雪効果
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'celebration-confetti';
        container.appendChild(confettiContainer);
        
        // 紙吹雪の作成
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createConfetti(confettiContainer);
            }, i * 100);
        }
        
        // 祝福音楽（オプション）
        this.playSuccessSound();
        
        return new Promise(resolve => {
            setTimeout(() => {
                confettiContainer.remove();
                resolve();
            }, 3000);
        });
    }

    /**
     * 紙吹雪の作成
     * @private
     */
    createConfetti(container) {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8', '#6c5ce7', '#a29bfe'];
        const confetti = document.createElement('div');
        
        confetti.className = 'confetti-piece';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        container.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }

    /**
     * プログレスバーアニメーション
     * @param {HTMLElement} progressElement プログレスバー要素
     * @param {number} progress 進捗率（0-100）
     * @returns {Promise} アニメーション完了Promise
     */
    async animateProgress(progressElement, progress) {
        if (!this.config.enableAnimations) {
            progressElement.style.width = progress + '%';
            return Promise.resolve();
        }

        progressElement.classList.add('animate-progress');
        progressElement.style.width = progress + '%';
        
        return new Promise(resolve => setTimeout(resolve, 800));
    }

    /**
     * カードフリップアニメーション
     * @param {HTMLElement} element 対象要素
     * @param {Function} contentUpdater コンテンツ更新関数
     * @returns {Promise} アニメーション完了Promise
     */
    async animateCardFlip(element, contentUpdater) {
        if (!this.config.enableAnimations) {
            contentUpdater();
            return Promise.resolve();
        }

        return new Promise(resolve => {
            element.style.transform = 'rotateY(90deg)';
            element.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                contentUpdater();
                element.style.transform = 'rotateY(0deg)';
                
                setTimeout(resolve, 300);
            }, 300);
        });
    }

    /**
     * モーダルアニメーション
     * @param {HTMLElement} modal モーダル要素
     * @param {boolean} show 表示/非表示
     * @returns {Promise} アニメーション完了Promise
     */
    async animateModal(modal, show = true) {
        if (!this.config.enableAnimations) {
            modal.style.display = show ? 'flex' : 'none';
            return Promise.resolve();
        }

        if (show) {
            modal.style.display = 'flex';
            modal.classList.add('animate-show');
            return new Promise(resolve => setTimeout(resolve, 300));
        } else {
            modal.classList.remove('animate-show');
            return new Promise(resolve => {
                setTimeout(() => {
                    modal.style.display = 'none';
                    resolve();
                }, 300);
            });
        }
    }

    /**
     * 画面遷移アニメーション
     * @param {HTMLElement} fromScreen 現在の画面
     * @param {HTMLElement} toScreen 遷移先画面
     * @param {string} direction 遷移方向
     * @returns {Promise} アニメーション完了Promise
     */
    async animateScreenTransition(fromScreen, toScreen, direction = 'left') {
        if (!this.config.enableAnimations) {
            fromScreen.classList.remove('active');
            toScreen.classList.add('active');
            return Promise.resolve();
        }

        const outClass = direction === 'left' ? 'animate-slide-out-left' : 'animate-fade-out';
        const inClass = direction === 'left' ? 'animate-slide-in-right' : 'animate-fade-in';
        
        fromScreen.classList.add(outClass);
        
        return new Promise(resolve => {
            setTimeout(() => {
                fromScreen.classList.remove('active', outClass);
                toScreen.classList.add('active', inClass);
                
                setTimeout(() => {
                    toScreen.classList.remove(inClass);
                    resolve();
                }, 300);
            }, 300);
        });
    }

    /**
     * ローディングアニメーション
     * @param {HTMLElement} element ローディング要素
     * @param {boolean} show 表示/非表示
     */
    animateLoading(element, show = true) {
        if (!element) return;
        
        if (show) {
            element.innerHTML = `
                <div class="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
        } else {
            element.innerHTML = '';
        }
    }

    /**
     * カウントアップアニメーション
     * @param {HTMLElement} element 対象要素
     * @param {number} endValue 最終値
     * @param {number} duration 継続時間（ミリ秒）
     * @returns {Promise} アニメーション完了Promise
     */
    async animateCountUp(element, endValue, duration = 1000) {
        if (!this.config.enableAnimations) {
            element.textContent = endValue;
            return Promise.resolve();
        }

        const startValue = 0;
        const startTime = performance.now();
        
        return new Promise(resolve => {
            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentValue = Math.round(startValue + (endValue - startValue) * this.easeOutQuart(progress));
                element.textContent = currentValue;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    resolve();
                }
            };
            
            requestAnimationFrame(updateCount);
        });
    }

    /**
     * 成功音の再生
     * @private
     */
    playSuccessSound() {
        if (!window.AudioContext) return;
        
        try {
            const audioContext = new AudioContext();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Audio not supported');
        }
    }

    /**
     * イージング関数
     * @private
     */
    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    /**
     * アニメーションクラスのクリア
     * @private
     */
    clearAnimationClasses(element) {
        const animationClasses = [
            'animate-typing', 'animate-fade-in', 'animate-words',
            'animate-slide-in-left', 'animate-slide-in-right', 'animate-slide-in-up',
            'animate-bounce-in', 'animate-correct', 'animate-incorrect',
            'animate-reveal-correct', 'animate-progress', 'animate-count'
        ];
        
        element.classList.remove(...animationClasses);
    }

    /**
     * アニメーション設定の更新
     * @param {Object} newConfig 新しい設定
     */
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        console.log('⚙️ Animation config updated:', this.config);
    }

    /**
     * アニメーションの一時停止/再開
     * @param {boolean} pause 一時停止するかどうか
     */
    pauseAnimations(pause = true) {
        const style = document.createElement('style');
        style.id = 'animation-pause';
        
        if (pause) {
            style.textContent = `
                *, *::before, *::after {
                    animation-play-state: paused !important;
                    transition: none !important;
                }
            `;
            document.head.appendChild(style);
        } else {
            const existingStyle = document.getElementById('animation-pause');
            if (existingStyle) {
                existingStyle.remove();
            }
        }
    }

    /**
     * パフォーマンス情報の取得
     * @returns {Object} パフォーマンス統計
     */
    getPerformanceStats() {
        return {
            reducedMotion: this.prefersReducedMotion,
            animationsEnabled: this.config.enableAnimations,
            queueLength: this.animationQueue.length,
            isAnimating: this.isAnimating
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuizAnimations;
}

// Global instance for browser usage
if (typeof window !== 'undefined') {
    window.QuizAnimations = QuizAnimations;
}