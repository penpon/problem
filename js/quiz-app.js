/**
 * QuizApp - メインアプリケーション
 * エンジニア初心者向け4択クイズのコントローラー
 */

class QuizApp {
    constructor() {
        this.loader = null;
        this.storage = null;
        this.animations = null;
        
        // 状態管理
        this.currentScreen = 'category';
        this.currentCategory = null;
        this.currentLevel = 'basic';
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.currentQuestion = null;
        this.selectedAnswer = null;
        this.isAnswered = false;
        this.startTime = null;
        this.sessionStats = {
            correct: 0,
            incorrect: 0,
            totalTime: 0,
            answers: []
        };
        
        // UI要素
        this.elements = {};
        this.touchHandler = null;
        
        // 設定
        this.config = {
            questionCount: 20,
            timeLimit: null, // 制限時間なし（初心者向け）
            showHints: true,
            enableAnimations: true,
            autoAdvance: false
        };
        
        console.log('🎮 QuizApp initialized');
    }

    /**
     * アプリケーションの初期化
     */
    async initialize() {
        try {
            console.log('🚀 Starting QuizApp initialization...');
            
            // ローディング画面表示
            this.showLoadingScreen();
            
            // 必要なクラスの初期化
            this.loader = new QuizLoader();
            this.storage = new QuizStorage();
            this.animations = new QuizAnimations();
            
            // UI要素の取得
            this.setupUIElements();
            
            // イベントリスナーの設定
            this.setupEventListeners();
            
            // タッチハンドラーの初期化
            this.setupTouchHandlers();
            
            // データの読み込み
            await this.loader.initialize();
            
            // カテゴリ選択画面の初期化
            await this.initializeCategoryScreen();
            
            // ローディング画面を非表示
            this.hideLoadingScreen();
            
            console.log('✅ QuizApp initialization completed');
            
        } catch (error) {
            console.error('❌ Failed to initialize QuizApp:', error);
            this.showError('アプリケーションの初期化に失敗しました。ページを再読み込みしてください。');
        }
    }

    /**
     * UI要素の取得
     * @private
     */
    setupUIElements() {
        this.elements = {
            // メイン
            loadingScreen: document.getElementById('loadingScreen'),
            quizContainer: document.getElementById('quizContainer'),
            
            // プログレス
            progressBar: document.getElementById('progressBar'),
            progressFill: document.getElementById('progressFill'),
            progressText: document.getElementById('progressText'),
            
            // カテゴリ選択
            categoryScreen: document.getElementById('categoryScreen'),
            categoryGrid: document.getElementById('categoryGrid'),
            statsSummary: document.getElementById('statsSummary'),
            totalQuestions: document.getElementById('totalQuestions'),
            overallAccuracy: document.getElementById('overallAccuracy'),
            
            // クイズ画面
            quizScreen: document.getElementById('quizScreen'),
            categoryBadge: document.getElementById('categoryBadge'),
            difficultyBadge: document.getElementById('difficultyBadge'),
            questionText: document.getElementById('questionText'),
            questionVisual: document.getElementById('questionVisual'),
            questionHint: document.getElementById('questionHint'),
            choicesContainer: document.getElementById('choicesContainer'),
            
            // 選択肢
            choiceA: document.getElementById('choiceA'),
            choiceB: document.getElementById('choiceB'),
            choiceC: document.getElementById('choiceC'),
            choiceD: document.getElementById('choiceD'),
            
            // アクションボタン
            hintBtn: document.getElementById('hintBtn'),
            skipBtn: document.getElementById('skipBtn'),
            
            // 結果画面
            resultScreen: document.getElementById('resultScreen'),
            resultIcon: document.getElementById('resultIcon'),
            resultTitle: document.getElementById('resultTitle'),
            scoreValue: document.getElementById('scoreValue'),
            correctCount: document.getElementById('correctCount'),
            totalCount: document.getElementById('totalCount'),
            correctQuestions: document.getElementById('correctQuestions'),
            incorrectQuestions: document.getElementById('incorrectQuestions'),
            
            // 結果画面ボタン
            reviewBtn: document.getElementById('reviewBtn'),
            retryBtn: document.getElementById('retryBtn'),
            homeBtn: document.getElementById('homeBtn'),
            
            // モーダル
            explanationModal: document.getElementById('explanationModal'),
            explanationContent: document.getElementById('explanationContent'),
            closeExplanation: document.getElementById('closeExplanation'),
            nextQuestionBtn: document.getElementById('nextQuestionBtn'),
            
            // メニュー
            menuBtn: document.getElementById('menuBtn')
        };
    }

    /**
     * イベントリスナーの設定
     * @private
     */
    setupEventListeners() {
        // アクションボタン
        this.elements.hintBtn?.addEventListener('click', () => this.showHint());
        this.elements.skipBtn?.addEventListener('click', () => this.skipQuestion());
        
        // 結果画面ボタン
        this.elements.reviewBtn?.addEventListener('click', () => this.startReviewMode());
        this.elements.retryBtn?.addEventListener('click', () => this.retryQuiz());
        this.elements.homeBtn?.addEventListener('click', () => this.goHome());
        
        // モーダル
        this.elements.closeExplanation?.addEventListener('click', () => this.hideExplanation());
        this.elements.nextQuestionBtn?.addEventListener('click', () => this.nextQuestion());
        
        // キーボードショートカット
        document.addEventListener('keydown', (e) => this.handleKeyboardInput(e));
        
        // ページ離脱時の確認
        window.addEventListener('beforeunload', (e) => {
            if (this.currentScreen === 'quiz' && this.currentQuestions.length > 0) {
                e.preventDefault();
                e.returnValue = 'クイズが進行中です。本当にページを離れますか？';
            }
        });
    }

    /**
     * タッチハンドラーの設定
     * @private
     */
    setupTouchHandlers() {
        // 選択肢のタッチイベント
        const choices = [this.elements.choiceA, this.elements.choiceB, this.elements.choiceC, this.elements.choiceD];
        
        choices.forEach(choice => {
            if (!choice) return;
            
            // タッチ開始時のリップル効果
            choice.addEventListener('touchstart', (e) => this.createRippleEffect(e, choice), { passive: true });
            choice.addEventListener('click', (e) => this.handleChoiceSelect(e));
            
            // ホバー効果の代替（タッチデバイス用）
            choice.addEventListener('touchstart', () => choice.classList.add('touch-active'), { passive: true });
            choice.addEventListener('touchend', () => choice.classList.remove('touch-active'), { passive: true });
        });
        
        // スワイプジェスチャー（画面遷移用）
        this.setupSwipeGestures();
    }

    /**
     * スワイプジェスチャーの設定
     * @private
     */
    setupSwipeGestures() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            this.handleSwipe(startX, startY, endX, endY);
        }, { passive: true });
    }

    /**
     * リップル効果の作成
     * @private
     */
    createRippleEffect(event, element) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left - size / 2;
        const y = (event.touches ? event.touches[0].clientY : event.clientY) - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    /**
     * ローディング画面の表示
     * @private
     */
    showLoadingScreen() {
        if (this.elements.loadingScreen) {
            this.elements.loadingScreen.style.display = 'flex';
        }
        if (this.elements.quizContainer) {
            this.elements.quizContainer.style.display = 'none';
        }
    }

    /**
     * ローディング画面の非表示
     * @private
     */
    hideLoadingScreen() {
        setTimeout(() => {
            if (this.elements.loadingScreen) {
                this.elements.loadingScreen.style.display = 'none';
            }
            if (this.elements.quizContainer) {
                this.elements.quizContainer.style.display = 'block';
            }
            this.showScreen('category');
        }, 500);
    }

    /**
     * カテゴリ選択画面の初期化
     * @private
     */
    async initializeCategoryScreen() {
        const categories = this.loader.getAllCategories();
        const globalStats = this.storage.getGlobalStats();
        
        // カテゴリカードの生成
        this.elements.categoryGrid.innerHTML = '';
        
        categories.forEach(category => {
            const categoryCard = this.createCategoryCard(category);
            this.elements.categoryGrid.appendChild(categoryCard);
        });
        
        // 統計情報の更新
        if (this.elements.totalQuestions) {
            this.elements.totalQuestions.textContent = this.loader.manifest.totalQuestions;
        }
        if (this.elements.overallAccuracy) {
            this.elements.overallAccuracy.textContent = globalStats.accuracy ? 
                `${globalStats.accuracy.toFixed(1)}%` : 'まだ記録なし';
        }
    }

    /**
     * カテゴリカードの作成
     * @private
     */
    createCategoryCard(category) {
        const card = document.createElement('button');
        card.className = 'category-card';
        card.style.setProperty('--category-color', category.color);
        
        const categoryStats = this.storage.getCategoryStats(category.id);
        const totalAttempts = categoryStats ? 
            categoryStats.totalCorrect + categoryStats.totalIncorrect : 0;
        const accuracy = totalAttempts > 0 ? 
            (categoryStats.totalCorrect / totalAttempts * 100).toFixed(1) : 0;
        
        card.innerHTML = `
            <div class="category-header">
                <div class="category-icon">${category.icon}</div>
                <h3 class="category-title">${category.name}</h3>
            </div>
            <p class="category-description">${category.description}</p>
            <div class="category-stats">
                <div class="category-stat">
                    <span>📊</span>
                    <span>正解率: ${accuracy}%</span>
                </div>
                <div class="category-stat">
                    <span>📝</span>
                    <span>問題数: ${category.questionCount}</span>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => this.selectCategory(category));
        
        return card;
    }

    /**
     * カテゴリの選択
     * @param {Object} category カテゴリデータ
     */
    async selectCategory(category) {
        try {
            this.currentCategory = category;
            console.log(`📂 Selected category: ${category.name}`);
            
            // 問題を読み込み
            await this.loadQuestions();
            
            // クイズ開始
            this.startQuiz();
            
        } catch (error) {
            console.error('❌ Failed to select category:', error);
            this.showError('カテゴリの読み込みに失敗しました。');
        }
    }

    /**
     * 問題の読み込み
     * @private
     */
    async loadQuestions() {
        const questions = await this.loader.getRandomQuestions(
            this.currentCategory.id, 
            this.currentLevel, 
            this.config.questionCount
        );
        
        if (questions.length === 0) {
            throw new Error('問題が見つかりませんでした');
        }
        
        this.currentQuestions = questions;
        this.currentQuestionIndex = 0;
        
        console.log(`📚 Loaded ${questions.length} questions`);
    }

    /**
     * クイズの開始
     * @private
     */
    startQuiz() {
        // セッション統計をリセット
        this.sessionStats = {
            correct: 0,
            incorrect: 0,
            totalTime: 0,
            answers: []
        };
        
        this.startTime = Date.now();
        this.showScreen('quiz');
        this.loadCurrentQuestion();
    }

    /**
     * 現在の問題を読み込み
     * @private
     */
    async loadCurrentQuestion() {
        if (this.currentQuestionIndex >= this.currentQuestions.length) {
            this.showResults();
            return;
        }
        
        this.currentQuestion = this.currentQuestions[this.currentQuestionIndex];
        this.selectedAnswer = null;
        this.isAnswered = false;
        
        // プログレスバーの更新
        this.updateProgress();
        
        // バッジの更新
        this.updateBadges();
        
        // 問題の表示
        await this.displayQuestion();
        
        // 選択肢の表示
        this.displayChoices();
        
        // タイマー開始
        this.questionStartTime = Date.now();
    }

    /**
     * プログレスバーの更新
     * @private
     */
    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.currentQuestions.length) * 100;
        
        if (this.elements.progressFill) {
            this.elements.progressFill.style.width = `${progress}%`;
            this.elements.progressFill.classList.add('animate-progress');
        }
        
        if (this.elements.progressText) {
            this.elements.progressText.textContent = 
                `問題 ${this.currentQuestionIndex + 1} / ${this.currentQuestions.length}`;
            this.elements.progressText.classList.add('animate-count');
        }
    }

    /**
     * バッジの更新
     * @private
     */
    updateBadges() {
        if (this.elements.categoryBadge) {
            this.elements.categoryBadge.textContent = this.currentCategory.name;
        }
        
        if (this.elements.difficultyBadge) {
            const levelNames = { basic: '基礎', intermediate: '中級', advanced: '上級' };
            this.elements.difficultyBadge.textContent = levelNames[this.currentLevel] || this.currentLevel;
        }
    }

    /**
     * 問題の表示
     * @private
     */
    async displayQuestion() {
        const question = this.currentQuestion.question;
        
        // 問題文のアニメーション
        if (this.elements.questionText) {
            await this.animations.animateQuestionText(this.elements.questionText, question.text, question.animation?.type || 'fade-in');
        }
        
        // ビジュアルエイドの表示
        if (question.visual && this.elements.questionVisual) {
            this.displayVisualAid(question.visual);
        }
        
        // ヒントボタンの表示/非表示
        if (this.elements.hintBtn) {
            this.elements.hintBtn.style.display = question.hint ? 'flex' : 'none';
        }
    }

    /**
     * ビジュアルエイドの表示
     * @private
     */
    displayVisualAid(visual) {
        this.elements.questionVisual.className = `question-visual animate-${visual.type}`;
        this.elements.questionVisual.innerHTML = visual.content || '';
        this.elements.questionVisual.style.display = 'block';
    }

    /**
     * 選択肢の表示
     * @private
     */
    displayChoices() {
        const choices = this.currentQuestion.choices;
        const choiceElements = [
            this.elements.choiceA,
            this.elements.choiceB, 
            this.elements.choiceC,
            this.elements.choiceD
        ];
        
        choices.forEach((choice, index) => {
            const element = choiceElements[index];
            if (!element) return;
            
            // リセット
            element.className = 'choice-btn';
            element.disabled = false;
            
            // テキスト設定
            const textElement = element.querySelector('.choice-text');
            if (textElement) {
                textElement.textContent = choice.text;
            }
            
            // アニメーション
            setTimeout(() => {
                const animationType = choice.animation || 'slide-in-up';
                element.classList.add(`animate-${animationType}`);
            }, index * 100);
        });
    }

    /**
     * 選択肢の選択処理
     * @param {Event} event クリックイベント
     */
    async handleChoiceSelect(event) {
        if (this.isAnswered) return;
        
        const choiceElement = event.currentTarget;
        const choiceId = choiceElement.dataset.choice;
        
        this.selectedAnswer = choiceId;
        this.isAnswered = true;
        
        // 選択状態の表示
        choiceElement.classList.add('selected');
        
        // 他の選択肢を無効化
        const allChoices = document.querySelectorAll('.choice-btn');
        allChoices.forEach(choice => {
            choice.disabled = true;
        });
        
        // 回答時間の計算
        const answerTime = (Date.now() - this.questionStartTime) / 1000;
        
        // 正解判定
        const isCorrect = choiceId === this.currentQuestion.correct;
        
        // フィードバックアニメーション
        await this.showAnswerFeedback(choiceElement, isCorrect);
        
        // 回答記録
        this.recordAnswer(isCorrect, answerTime);
        
        // 解説表示
        setTimeout(() => {
            this.showExplanation();
        }, 1500);
    }

    /**
     * 回答フィードバックの表示
     * @private
     */
    async showAnswerFeedback(selectedElement, isCorrect) {
        // 選択した選択肢のフィードバック
        if (isCorrect) {
            selectedElement.classList.add('correct', 'animate-correct');
        } else {
            selectedElement.classList.add('incorrect', 'animate-incorrect');
            
            // 正解の選択肢を表示
            const correctChoice = document.querySelector(`[data-choice="${this.currentQuestion.correct}"]`);
            if (correctChoice) {
                correctChoice.classList.add('correct', 'animate-reveal-correct');
            }
        }
        
        // 他の選択肢をフェードアウト
        const allChoices = document.querySelectorAll('.choice-btn');
        allChoices.forEach(choice => {
            if (choice !== selectedElement && !choice.classList.contains('correct')) {
                choice.style.opacity = '0.3';
            }
        });
    }

    /**
     * 回答の記録
     * @private
     */
    recordAnswer(isCorrect, answerTime) {
        // セッション統計の更新
        if (isCorrect) {
            this.sessionStats.correct++;
        } else {
            this.sessionStats.incorrect++;
        }
        
        this.sessionStats.totalTime += answerTime;
        this.sessionStats.answers.push({
            questionId: this.currentQuestion.id,
            selectedAnswer: this.selectedAnswer,
            correctAnswer: this.currentQuestion.correct,
            isCorrect,
            timeSpent: answerTime,
            timestamp: new Date().toISOString()
        });
        
        // ストレージに記録
        this.storage.recordAnswer(
            this.currentQuestion.id,
            this.currentCategory.id,
            this.currentLevel,
            isCorrect,
            answerTime,
            this.selectedAnswer,
            this.currentQuestion.correct
        );
        
        console.log(`📝 Answer recorded: ${isCorrect ? 'correct' : 'incorrect'} (${answerTime.toFixed(2)}s)`);
    }

    /**
     * 解説の表示
     * @private
     */
    showExplanation() {
        const explanation = this.currentQuestion.explanation;
        if (!explanation || !this.elements.explanationModal) return;
        
        this.elements.explanationContent.innerHTML = `
            <h4>解説</h4>
            <p>${explanation.text}</p>
            ${explanation.example ? `<pre><code>${explanation.example}</code></pre>` : ''}
            ${explanation.relatedCommands ? `
                <h4>関連コマンド</h4>
                <p>${explanation.relatedCommands.join(', ')}</p>
            ` : ''}
        `;
        
        this.elements.explanationModal.classList.add('active', 'animate-show');
    }

    /**
     * 解説の非表示
     * @private
     */
    hideExplanation() {
        if (this.elements.explanationModal) {
            this.elements.explanationModal.classList.remove('active');
        }
    }

    /**
     * 次の問題へ
     * @private
     */
    nextQuestion() {
        this.hideExplanation();
        this.currentQuestionIndex++;
        this.loadCurrentQuestion();
    }

    /**
     * ヒントの表示
     * @private
     */
    showHint() {
        const hint = this.currentQuestion.question.hint;
        if (!hint || !this.elements.questionHint) return;
        
        this.elements.questionHint.textContent = hint;
        this.elements.questionHint.style.display = 'block';
        this.elements.hintBtn.disabled = true;
        this.elements.hintBtn.style.opacity = '0.5';
    }

    /**
     * 問題のスキップ
     * @private
     */
    skipQuestion() {
        // スキップを記録（不正解として扱う）
        this.recordAnswer(false, 0);
        this.nextQuestion();
    }

    /**
     * 結果の表示
     * @private
     */
    showResults() {
        const totalQuestions = this.sessionStats.correct + this.sessionStats.incorrect;
        const accuracy = totalQuestions > 0 ? (this.sessionStats.correct / totalQuestions) * 100 : 0;
        
        // 結果アイコンとタイトルの設定
        let resultIcon = '🎉';
        let resultTitle = 'お疲れさまでした！';
        
        if (accuracy >= 90) {
            resultIcon = '🏆';
            resultTitle = '素晴らしい結果です！';
        } else if (accuracy >= 70) {
            resultIcon = '🎯';
            resultTitle = 'よくできました！';
        } else if (accuracy >= 50) {
            resultIcon = '📈';
            resultTitle = '頑張りました！';
        } else {
            resultIcon = '💪';
            resultTitle = '復習して再挑戦しましょう！';
        }
        
        // 結果画面の更新
        if (this.elements.resultIcon) this.elements.resultIcon.textContent = resultIcon;
        if (this.elements.resultTitle) this.elements.resultTitle.textContent = resultTitle;
        if (this.elements.scoreValue) this.elements.scoreValue.textContent = Math.round(accuracy);
        if (this.elements.correctCount) this.elements.correctCount.textContent = this.sessionStats.correct;
        if (this.elements.totalCount) this.elements.totalCount.textContent = totalQuestions;
        if (this.elements.correctQuestions) this.elements.correctQuestions.textContent = `${this.sessionStats.correct}問`;
        if (this.elements.incorrectQuestions) this.elements.incorrectQuestions.textContent = `${this.sessionStats.incorrect}問`;
        
        // 復習ボタンの表示/非表示
        if (this.elements.reviewBtn) {
            this.elements.reviewBtn.style.display = this.sessionStats.incorrect > 0 ? 'flex' : 'none';
        }
        
        this.showScreen('result');
        console.log(`🏁 Quiz completed: ${this.sessionStats.correct}/${totalQuestions} (${accuracy.toFixed(1)}%)`);
    }

    /**
     * 復習モードの開始
     * @private
     */
    async startReviewMode() {
        const incorrectQuestions = this.sessionStats.answers
            .filter(answer => !answer.isCorrect)
            .map(answer => answer.questionId);
        
        if (incorrectQuestions.length === 0) return;
        
        // 間違えた問題を再取得
        const reviewQuestions = [];
        for (const questionId of incorrectQuestions) {
            const question = await this.loader.getQuestionById(questionId);
            if (question) {
                reviewQuestions.push(question);
            }
        }
        
        this.currentQuestions = reviewQuestions;
        this.currentQuestionIndex = 0;
        this.sessionStats = { correct: 0, incorrect: 0, totalTime: 0, answers: [] };
        
        this.showScreen('quiz');
        this.loadCurrentQuestion();
    }

    /**
     * クイズの再挑戦
     * @private
     */
    async retryQuiz() {
        await this.loadQuestions();
        this.startQuiz();
    }

    /**
     * ホームに戻る
     * @private
     */
    goHome() {
        this.currentCategory = null;
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.showScreen('category');
        this.initializeCategoryScreen();
    }

    /**
     * 画面の切り替え
     * @private
     */
    showScreen(screenName) {
        const screens = ['category', 'quiz', 'result'];
        
        screens.forEach(screen => {
            const element = this.elements[`${screen}Screen`];
            if (element) {
                element.classList.toggle('active', screen === screenName);
            }
        });
        
        this.currentScreen = screenName;
        console.log(`🖥️ Screen changed to: ${screenName}`);
    }

    /**
     * キーボード入力の処理
     * @private
     */
    handleKeyboardInput(event) {
        if (this.currentScreen !== 'quiz' || this.isAnswered) return;
        
        const keyMap = {
            '1': 'A',
            '2': 'B', 
            '3': 'C',
            '4': 'D'
        };
        
        const choice = keyMap[event.key];
        if (choice) {
            const choiceElement = document.querySelector(`[data-choice="${choice}"]`);
            if (choiceElement) {
                choiceElement.click();
            }
        }
    }

    /**
     * スワイプジェスチャーの処理
     * @private
     */
    handleSwipe(startX, startY, endX, endY) {
        const diffX = endX - startX;
        const diffY = endY - startY;
        const minSwipeDistance = 100;
        
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
            if (diffX > 0) {
                // 右スワイプ - 前の問題（実装しない）
            } else {
                // 左スワイプ - 次の問題
                if (this.currentScreen === 'quiz' && this.isAnswered) {
                    this.nextQuestion();
                }
            }
        }
    }

    /**
     * エラーの表示
     * @private
     */
    showError(message) {
        // 簡易的なエラー表示
        alert(message);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuizApp;
}

// Global instance for browser usage
if (typeof window !== 'undefined') {
    window.QuizApp = QuizApp;
}