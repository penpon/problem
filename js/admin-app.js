/**
 * AdminApp - 管理画面メインアプリケーション
 * 全体制御とナビゲーション管理、UIイベント処理
 */

class AdminApp {
    constructor() {
        this.currentView = 'dashboard';
        this.isLoading = false;
        this.refreshInterval = null;
        this.initialized = false;
        
        // UI要素の参照
        this.elements = {};
        
        console.log('🎛️ AdminApp initializing...');
    }

    /**
     * アプリケーションの初期化
     */
    async initialize() {
        if (this.initialized) {
            console.warn('⚠️ AdminApp already initialized');
            return;
        }

        try {
            console.log('🚀 Starting AdminApp initialization...');
            this.showLoading(true);

            // DOM要素の取得
            this.cacheElements();
            
            // イベントリスナーの設定
            this.setupEventListeners();
            
            // 初期データの読み込み
            await this.loadInitialData();
            
            // ダッシュボードの表示
            await this.showDashboard();
            
            // 自動更新の設定
            this.setupAutoRefresh();
            
            this.initialized = true;
            this.showLoading(false);
            
            console.log('✅ AdminApp initialized successfully');
            this.showNotification('管理画面が正常に初期化されました', 'success');
            
        } catch (error) {
            console.error('❌ AdminApp initialization failed:', error);
            this.showLoading(false);
            this.showNotification(`初期化に失敗しました: ${error.message}`, 'error');
        }
    }

    /**
     * DOM要素の取得とキャッシュ
     */
    cacheElements() {
        console.log('📋 Caching DOM elements...');
        
        this.elements = {
            // レイアウト要素
            sidebar: document.getElementById('admin-sidebar'),
            sidebarToggle: document.getElementById('sidebar-toggle'),
            adminContent: document.getElementById('admin-content'),
            pageTitle: document.getElementById('page-title'),
            breadcrumbPath: document.getElementById('breadcrumb-path'),
            loadingOverlay: document.getElementById('loading-overlay'),
            modalOverlay: document.getElementById('modal-overlay'),
            modalContent: document.getElementById('modal-content'),
            
            // ヘッダー統計
            programmingCount: document.getElementById('programming-count'),
            quizCount: document.getElementById('quiz-count'),
            refreshDataBtn: document.getElementById('refresh-data'),
            
            // ダッシュボード要素
            totalProgrammingProblems: document.getElementById('total-programming-problems'),
            totalQuizQuestions: document.getElementById('total-quiz-questions'),
            totalCategories: document.getElementById('total-categories'),
            cacheSize: document.getElementById('cache-size'),
            categoryChart: document.getElementById('categoryChart'),
            recentActivities: document.getElementById('recent-activities'),
            initTime: document.getElementById('init-time'),
            
            // システム状況
            programmingSystemStatus: document.getElementById('programming-system-status'),
            quizSystemStatus: document.getElementById('quiz-system-status'),
            dataIntegrityStatus: document.getElementById('data-integrity-status'),
            storageStatus: document.getElementById('storage-status'),
            
            // プログラミング問題管理
            programmingProblemsTable: document.getElementById('programming-problems-table'),
            programmingCategoryFilter: document.getElementById('programming-category-filter'),
            programmingDifficultyFilter: document.getElementById('programming-difficulty-filter'),
            programmingSearch: document.getElementById('programming-search'),
            addProgrammingProblem: document.getElementById('add-programming-problem'),
            
            // クイズ問題管理
            quizQuestionsTable: document.getElementById('quiz-questions-table'),
            quizCategoryFilter: document.getElementById('quiz-category-filter'),
            quizLevelFilter: document.getElementById('quiz-level-filter'),
            quizSearch: document.getElementById('quiz-search'),
            addQuizQuestion: document.getElementById('add-quiz-question'),
            
            // カテゴリ管理
            categoriesGrid: document.getElementById('categories-grid'),
            addCategory: document.getElementById('add-category'),
            
            // インポート・エクスポート
            exportAllProgramming: document.getElementById('export-all-programming'),
            exportAllQuiz: document.getElementById('export-all-quiz'),
            exportCategories: document.getElementById('export-categories'),
            exportCompleteBackup: document.getElementById('export-complete-backup'),
            fileUploadArea: document.getElementById('file-upload-area'),
            importFile: document.getElementById('import-file'),
            validateData: document.getElementById('validate-data'),
            
            // システム情報
            systemInfo: document.getElementById('system-info'),
            
            // メニュー項目
            menuItems: document.querySelectorAll('.menu-item'),
            contentViews: document.querySelectorAll('.content-view')
        };
        
        console.log(`✅ Cached ${Object.keys(this.elements).length} DOM elements`);
    }

    /**
     * イベントリスナーの設定
     */
    setupEventListeners() {
        console.log('🎧 Setting up event listeners...');
        
        // サイドバートグル
        if (this.elements.sidebarToggle) {
            this.elements.sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // メニューナビゲーション
        this.elements.menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = item.dataset.view;
                if (view) {
                    this.showView(view);
                }
            });
        });

        // データ更新ボタン
        if (this.elements.refreshDataBtn) {
            this.elements.refreshDataBtn.addEventListener('click', () => {
                this.refreshData();
            });
        }

        // エクスポートボタン
        this.setupExportListeners();
        
        // インポート機能
        this.setupImportListeners();
        
        // フィルター機能
        this.setupFilterListeners();
        
        // モーダル機能
        this.setupModalListeners();
        
        // レスポンシブ機能
        this.setupResponsiveListeners();
        
        console.log('✅ Event listeners set up successfully');
    }

    /**
     * エクスポート機能のイベントリスナー設定
     */
    setupExportListeners() {
        if (this.elements.exportAllProgramming) {
            this.elements.exportAllProgramming.addEventListener('click', async () => {
                await this.exportProgrammingProblems();
            });
        }

        if (this.elements.exportAllQuiz) {
            this.elements.exportAllQuiz.addEventListener('click', async () => {
                await this.exportQuizQuestions();
            });
        }

        if (this.elements.exportCategories) {
            this.elements.exportCategories.addEventListener('click', async () => {
                await this.exportCategories();
            });
        }

        if (this.elements.exportCompleteBackup) {
            this.elements.exportCompleteBackup.addEventListener('click', async () => {
                await this.exportCompleteBackup();
            });
        }
    }

    /**
     * インポート機能のイベントリスナー設定
     */
    setupImportListeners() {
        // ファイルドロップエリア
        if (this.elements.fileUploadArea) {
            this.elements.fileUploadArea.addEventListener('click', () => {
                this.elements.importFile.click();
            });

            this.elements.fileUploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                this.elements.fileUploadArea.classList.add('dragover');
            });

            this.elements.fileUploadArea.addEventListener('dragleave', () => {
                this.elements.fileUploadArea.classList.remove('dragover');
            });

            this.elements.fileUploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                this.elements.fileUploadArea.classList.remove('dragover');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFileImport(files[0]);
                }
            });
        }

        // ファイル選択
        if (this.elements.importFile) {
            this.elements.importFile.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.handleFileImport(file);
                }
            });
        }

        // データ検証
        if (this.elements.validateData) {
            this.elements.validateData.addEventListener('click', async () => {
                await this.validateDataIntegrity();
            });
        }
    }

    /**
     * フィルター機能のイベントリスナー設定
     */
    setupFilterListeners() {
        // プログラミング問題フィルター
        [this.elements.programmingCategoryFilter, 
         this.elements.programmingDifficultyFilter,
         this.elements.programmingSearch].forEach(element => {
            if (element) {
                element.addEventListener('change', () => {
                    this.filterProgrammingProblems();
                });
                if (element.type === 'text') {
                    element.addEventListener('keyup', this.debounce(() => {
                        this.filterProgrammingProblems();
                    }, 300));
                }
            }
        });

        // クイズ問題フィルター
        [this.elements.quizCategoryFilter,
         this.elements.quizLevelFilter,
         this.elements.quizSearch].forEach(element => {
            if (element) {
                element.addEventListener('change', () => {
                    this.filterQuizQuestions();
                });
                if (element.type === 'text') {
                    element.addEventListener('keyup', this.debounce(() => {
                        this.filterQuizQuestions();
                    }, 300));
                }
            }
        });
    }

    /**
     * モーダル機能のイベントリスナー設定
     */
    setupModalListeners() {
        if (this.elements.modalOverlay) {
            this.elements.modalOverlay.addEventListener('click', (e) => {
                if (e.target === this.elements.modalOverlay) {
                    this.hideModal();
                }
            });
        }

        // ESCキーでモーダルを閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.elements.modalOverlay.classList.contains('active')) {
                this.hideModal();
            }
        });
    }

    /**
     * レスポンシブ機能のイベントリスナー設定
     */
    setupResponsiveListeners() {
        // ウィンドウリサイズ対応
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // モバイル用サイドバー
        if (window.innerWidth <= 768) {
            document.addEventListener('click', (e) => {
                if (!this.elements.sidebar.contains(e.target) && 
                    !this.elements.sidebarToggle.contains(e.target) &&
                    this.elements.sidebar.classList.contains('mobile-open')) {
                    this.elements.sidebar.classList.remove('mobile-open');
                }
            });
        }
    }

    /**
     * 初期データの読み込み
     */
    async loadInitialData() {
        console.log('📊 Loading initial data...');
        
        try {
            // 統計データの読み込み
            const stats = await adminStatistics.getOverallStats();
            
            // ヘッダー統計の更新
            this.updateHeaderStats(stats);
            
            // フィルターオプションの読み込み
            await this.loadFilterOptions();
            
            console.log('✅ Initial data loaded successfully');
            
        } catch (error) {
            console.error('❌ Failed to load initial data:', error);
            throw error;
        }
    }

    /**
     * ヘッダー統計の更新
     * @param {Object} stats 統計データ
     */
    updateHeaderStats(stats) {
        if (this.elements.programmingCount) {
            this.elements.programmingCount.textContent = stats.programming.totalProblems || '0';
        }
        
        if (this.elements.quizCount) {
            this.elements.quizCount.textContent = stats.quiz.totalQuestions || '0';
        }
    }

    /**
     * フィルターオプションの読み込み
     */
    async loadFilterOptions() {
        try {
            const options = await adminQuestionManager.getFilterOptions();
            
            // プログラミング問題フィルター
            if (this.elements.programmingCategoryFilter) {
                this.populateSelect(this.elements.programmingCategoryFilter, options.programming.categories);
            }
            
            // クイズ問題フィルター
            if (this.elements.quizCategoryFilter) {
                this.populateSelect(this.elements.quizCategoryFilter, options.quiz.categories);
            }
            
        } catch (error) {
            console.warn('⚠️ Failed to load filter options:', error);
        }
    }

    /**
     * セレクトボックスにオプションを追加
     * @param {HTMLSelectElement} select セレクト要素
     * @param {Array} options オプション配列
     */
    populateSelect(select, options) {
        // 既存のオプションをクリア（最初のdefaultオプションを除く）
        while (select.children.length > 1) {
            select.removeChild(select.lastChild);
        }
        
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            select.appendChild(optionElement);
        });
    }

    /**
     * ビューの表示切り替え
     * @param {string} viewName ビュー名
     */
    async showView(viewName) {
        if (this.isLoading) {
            console.log('⏳ Already loading, ignoring view change request');
            return;
        }
        
        console.log(`🔄 Switching to view: ${viewName}`);
        this.currentView = viewName;
        
        // メニュー項目の状態更新
        this.elements.menuItems.forEach(item => {
            item.classList.toggle('active', item.dataset.view === viewName);
        });
        
        // コンテンツビューの表示切り替え
        this.elements.contentViews.forEach(view => {
            view.classList.toggle('active', view.id === `${viewName}-view`);
        });
        
        // ページタイトルとブレッドクラムの更新
        this.updatePageHeader(viewName);
        
        // ビュー固有のデータ読み込み
        await this.loadViewData(viewName);
        
        // モバイル環境ではサイドバーを閉じる
        if (window.innerWidth <= 768) {
            this.elements.sidebar.classList.remove('mobile-open');
        }
        
        console.log(`✅ View switched to: ${viewName}`);
    }

    /**
     * ページヘッダーの更新
     * @param {string} viewName ビュー名
     */
    updatePageHeader(viewName) {
        const viewTitles = {
            'dashboard': 'ダッシュボード',
            'programming-problems': 'プログラミング問題管理',
            'quiz-questions': '4択クイズ問題管理',
            'categories': 'カテゴリ管理',
            'import-export': 'データインポート・エクスポート',
            'backup': 'バックアップ管理',
            'settings': '設定',
            'system-info': 'システム情報'
        };
        
        const title = viewTitles[viewName] || viewName;
        
        if (this.elements.pageTitle) {
            this.elements.pageTitle.textContent = title;
        }
        
        if (this.elements.breadcrumbPath) {
            this.elements.breadcrumbPath.textContent = `管理画面 > ${title}`;
        }
    }

    /**
     * ビュー固有のデータ読み込み
     * @param {string} viewName ビュー名
     */
    async loadViewData(viewName) {
        try {
            switch (viewName) {
                case 'dashboard':
                    await this.showDashboard();
                    break;
                case 'programming-problems':
                    await this.loadProgrammingProblems();
                    break;
                case 'quiz-questions':
                    await this.loadQuizQuestions();
                    break;
                case 'categories':
                    await this.loadCategories();
                    break;
                case 'system-info':
                    await this.loadSystemInfo();
                    break;
                default:
                    console.log(`📄 View ${viewName} has no specific data loading`);
            }
        } catch (error) {
            console.error(`❌ Failed to load data for view ${viewName}:`, error);
            this.showNotification(`${viewName}のデータ読み込みに失敗しました`, 'error');
        }
    }

    /**
     * ダッシュボードの表示
     */
    async showDashboard() {
        console.log('📊 Loading dashboard...');
        
        try {
            const stats = await adminStatistics.getOverallStats();
            
            // 統計カードの更新
            this.updateStatisticsCards(stats);
            
            // チャートの生成
            this.generateCharts(stats);
            
            // アクティビティログの更新
            this.updateActivityLog();
            
            // システム状況の更新
            this.updateSystemStatus(stats.system);
            
            // 初期化時刻の表示
            if (this.elements.initTime) {
                this.elements.initTime.textContent = new Date().toLocaleString('ja-JP');
            }
            
        } catch (error) {
            console.error('❌ Failed to load dashboard:', error);
            this.showNotification('ダッシュボードの読み込みに失敗しました', 'error');
        }
    }

    /**
     * 統計カードの更新
     * @param {Object} stats 統計データ
     */
    updateStatisticsCards(stats) {
        const elements = [
            { element: this.elements.totalProgrammingProblems, value: stats.programming.totalProblems },
            { element: this.elements.totalQuizQuestions, value: stats.quiz.totalQuestions },
            { element: this.elements.totalCategories, value: stats.categories.totalCategories },
            { element: this.elements.cacheSize, value: `${stats.system.storageUsage.usedKB}KB` }
        ];

        elements.forEach(({ element, value }) => {
            if (element) {
                this.animateNumberChange(element, value);
            }
        });
    }

    /**
     * 数値の変化をアニメーション付きで表示
     * @param {HTMLElement} element 対象要素
     * @param {number|string} newValue 新しい値
     */
    animateNumberChange(element, newValue) {
        const oldValue = parseInt(element.textContent) || 0;
        const numericNewValue = parseInt(newValue) || 0;
        
        if (isNaN(numericNewValue)) {
            element.textContent = newValue;
            return;
        }
        
        const diff = numericNewValue - oldValue;
        const steps = 20;
        const stepValue = diff / steps;
        let currentValue = oldValue;
        
        const animate = () => {
            currentValue += stepValue;
            if ((stepValue > 0 && currentValue >= numericNewValue) ||
                (stepValue < 0 && currentValue <= numericNewValue)) {
                element.textContent = newValue;
                return;
            }
            
            element.textContent = Math.round(currentValue);
            requestAnimationFrame(animate);
        };
        
        if (diff !== 0) {
            animate();
        }
    }

    /**
     * チャートの生成
     * @param {Object} stats 統計データ
     */
    generateCharts(stats) {
        if (this.elements.categoryChart && typeof Chart !== 'undefined') {
            adminStatistics.generateCategoryChart(this.elements.categoryChart, stats.categories);
        }
    }

    /**
     * アクティビティログの更新
     */
    updateActivityLog() {
        if (!this.elements.recentActivities) return;
        
        const activities = adminStatistics.generateActivityLog();
        
        this.elements.recentActivities.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-message">${activity.message}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
        `).join('');
    }

    /**
     * システム状況の更新
     * @param {Object} systemStats システム統計
     */
    updateSystemStatus(systemStats) {
        const statusElements = [
            { element: this.elements.programmingSystemStatus, status: systemStats.systemStatus.programmingSystem },
            { element: this.elements.quizSystemStatus, status: systemStats.systemStatus.quizSystem },
            { element: this.elements.dataIntegrityStatus, status: 'ok' }, // デフォルト
            { element: this.elements.storageStatus, status: systemStats.systemStatus.localStorage }
        ];

        statusElements.forEach(({ element, status }) => {
            if (element) {
                element.textContent = status === 'ok' ? '正常' : 'エラー';
                element.className = `status-badge status-${status}`;
            }
        });
    }

    /**
     * プログラミング問題の読み込み
     */
    async loadProgrammingProblems() {
        console.log('📝 Loading programming problems...');
        
        try {
            const filters = this.getCurrentProgrammingFilters();
            const result = await adminQuestionManager.getProgrammingProblems(filters);
            
            this.renderProgrammingProblemsTable(result.problems);
            
        } catch (error) {
            console.error('❌ Failed to load programming problems:', error);
            this.showNotification('プログラミング問題の読み込みに失敗しました', 'error');
        }
    }

    /**
     * クイズ問題の読み込み
     */
    async loadQuizQuestions() {
        console.log('❓ Loading quiz questions...');
        
        try {
            const filters = this.getCurrentQuizFilters();
            const result = await adminQuestionManager.getQuizQuestions(filters);
            
            this.renderQuizQuestionsTable(result.questions);
            
        } catch (error) {
            console.error('❌ Failed to load quiz questions:', error);
            this.showNotification('クイズ問題の読み込みに失敗しました', 'error');
        }
    }

    /**
     * カテゴリの読み込み
     */
    async loadCategories() {
        console.log('📁 Loading categories...');
        
        try {
            const categories = await adminQuestionManager.getCategories();
            this.renderCategoriesGrid(categories.combined);
            
        } catch (error) {
            console.error('❌ Failed to load categories:', error);
            this.showNotification('カテゴリの読み込みに失敗しました', 'error');
        }
    }

    /**
     * システム情報の読み込み
     */
    async loadSystemInfo() {
        console.log('ℹ️ Loading system info...');
        
        try {
            const systemInfo = await adminImportExport.getSystemInfo();
            this.renderSystemInfo(systemInfo);
            
        } catch (error) {
            console.error('❌ Failed to load system info:', error);
            this.showNotification('システム情報の読み込みに失敗しました', 'error');
        }
    }

    /**
     * プログラミング問題テーブルの描画
     * @param {Array} problems 問題配列
     */
    renderProgrammingProblemsTable(problems) {
        if (!this.elements.programmingProblemsTable) return;
        
        const tbody = this.elements.programmingProblemsTable.querySelector('tbody');
        if (!tbody) return;
        
        tbody.innerHTML = problems.map(problem => `
            <tr>
                <td><code>${problem.id}</code></td>
                <td>${problem.title || '無題'}</td>
                <td><span class="badge">${problem.category || '未分類'}</span></td>
                <td><span class="badge badge-${this.getDifficultyClass(problem.difficulty)}">${problem.difficulty || '未設定'}</span></td>
                <td>${problem.points || 0}pt</td>
                <td class="actions">
                    <button class="btn btn-sm btn-secondary" onclick="adminApp.viewProblemDetail('${problem.id}')">
                        <i class="fas fa-eye"></i> 表示
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="adminApp.editProblem('${problem.id}')">
                        <i class="fas fa-edit"></i> 編集
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="adminApp.deleteProblem('${problem.id}')">
                        <i class="fas fa-trash"></i> 削除
                    </button>
                </td>
            </tr>
        `).join('');
    }

    /**
     * クイズ問題テーブルの描画
     * @param {Array} questions 問題配列
     */
    renderQuizQuestionsTable(questions) {
        if (!this.elements.quizQuestionsTable) return;
        
        const tbody = this.elements.quizQuestionsTable.querySelector('tbody');
        if (!tbody) return;
        
        tbody.innerHTML = questions.map(question => `
            <tr>
                <td><code>${question.id}</code></td>
                <td class="question-text">${this.truncateText(question.question || '質問文なし', 100)}</td>
                <td><span class="badge">${question.categoryName || '未分類'}</span></td>
                <td><span class="badge badge-${this.getLevelClass(question.level)}">${this.getLevelLabel(question.level)}</span></td>
                <td>${question.tags ? question.tags.join(', ') : '無し'}</td>
                <td class="actions">
                    <button class="btn btn-sm btn-secondary" onclick="adminApp.viewQuestionDetail('${question.id}')">
                        <i class="fas fa-eye"></i> 表示
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="adminApp.editQuestion('${question.id}')">
                        <i class="fas fa-edit"></i> 編集
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="adminApp.deleteQuestion('${question.id}')">
                        <i class="fas fa-trash"></i> 削除
                    </button>
                </td>
            </tr>
        `).join('');
    }

    /**
     * カテゴリグリッドの描画
     * @param {Array} categories カテゴリ配列
     */
    renderCategoriesGrid(categories) {
        if (!this.elements.categoriesGrid) return;
        
        this.elements.categoriesGrid.innerHTML = categories.map(category => `
            <div class="category-card">
                <div class="category-header">
                    <div class="category-icon" style="background-color: ${category.color || '#667eea'}">
                        ${category.icon || '📚'}
                    </div>
                    <div>
                        <h3 class="category-name">${category.name}</h3>
                        <span class="category-type">${category.types.join(' + ')}</span>
                    </div>
                </div>
                <p class="category-description">${category.description || 'カテゴリの説明がありません'}</p>
                <div class="category-stats">
                    <span>プログラミング: ${category.programmingCount}問</span>
                    <span>クイズ: ${category.quizCount}問</span>
                </div>
                <div class="category-actions">
                    <button class="btn btn-sm btn-secondary" onclick="adminApp.viewCategory('${category.id}')">
                        <i class="fas fa-eye"></i> 表示
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="adminApp.editCategory('${category.id}')">
                        <i class="fas fa-edit"></i> 編集
                    </button>
                </div>
            </div>
        `).join('');
    }

    /**
     * システム情報の描画
     * @param {Object} systemInfo システム情報
     */
    renderSystemInfo(systemInfo) {
        if (!this.elements.systemInfo) return;
        
        this.elements.systemInfo.innerHTML = `
            <div class="system-info-grid">
                <div class="info-section">
                    <h4>ブラウザ情報</h4>
                    <p><strong>User Agent:</strong> ${systemInfo.userAgent}</p>
                    <p><strong>URL:</strong> ${systemInfo.url}</p>
                </div>
                
                <div class="info-section">
                    <h4>ストレージ情報</h4>
                    <p><strong>利用可能:</strong> ${systemInfo.localStorage.available ? 'Yes' : 'No'}</p>
                    <p><strong>使用量:</strong> ${systemInfo.localStorage.usage.usedKB}KB</p>
                    <p><strong>キー数:</strong> ${systemInfo.localStorage.usage.keys}</p>
                </div>
                
                <div class="info-section">
                    <h4>機能サポート</h4>
                    <p><strong>Chart.js:</strong> ${systemInfo.features.chartJs ? 'Yes' : 'No'}</p>
                    <p><strong>ProblemLoader:</strong> ${systemInfo.features.problemLoader ? 'Yes' : 'No'}</p>
                    <p><strong>QuizLoader:</strong> ${systemInfo.features.quizLoader ? 'Yes' : 'No'}</p>
                </div>
                
                <div class="info-section">
                    <h4>タイムスタンプ</h4>
                    <p><strong>生成時刻:</strong> ${new Date(systemInfo.timestamp).toLocaleString('ja-JP')}</p>
                </div>
            </div>
        `;
    }

    /**
     * 現在のプログラミング問題フィルターを取得
     * @returns {Object} フィルター設定
     */
    getCurrentProgrammingFilters() {
        return {
            category: this.elements.programmingCategoryFilter?.value || '',
            difficulty: this.elements.programmingDifficultyFilter?.value || '',
            search: this.elements.programmingSearch?.value || ''
        };
    }

    /**
     * 現在のクイズ問題フィルターを取得
     * @returns {Object} フィルター設定
     */
    getCurrentQuizFilters() {
        return {
            category: this.elements.quizCategoryFilter?.value || '',
            level: this.elements.quizLevelFilter?.value || '',
            search: this.elements.quizSearch?.value || ''
        };
    }

    /**
     * プログラミング問題のフィルタリング実行
     */
    async filterProgrammingProblems() {
        if (this.currentView !== 'programming-problems') return;
        await this.loadProgrammingProblems();
    }

    /**
     * クイズ問題のフィルタリング実行
     */
    async filterQuizQuestions() {
        if (this.currentView !== 'quiz-questions') return;
        await this.loadQuizQuestions();
    }

    /**
     * データの更新
     */
    async refreshData() {
        console.log('🔄 Refreshing data...');
        
        try {
            this.showLoading(true);
            
            // キャッシュをクリア
            adminStatistics.clearStatsCache();
            if (typeof problemLoader !== 'undefined') {
                problemLoader.clearCache();
            }
            
            // 初期データを再読み込み
            await this.loadInitialData();
            
            // 現在のビューを再読み込み
            await this.loadViewData(this.currentView);
            
            this.showNotification('データを更新しました', 'success');
            
        } catch (error) {
            console.error('❌ Failed to refresh data:', error);
            this.showNotification(`データ更新に失敗しました: ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * エクスポート機能
     */
    async exportProgrammingProblems() {
        try {
            this.showLoading(true);
            const data = await adminImportExport.exportProgrammingProblems();
            const filename = adminImportExport.generateBackupFilename('programming');
            adminImportExport.downloadAsJSON(data, filename);
            this.showNotification('プログラミング問題をエクスポートしました', 'success');
        } catch (error) {
            this.showNotification(`エクスポートに失敗しました: ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async exportQuizQuestions() {
        try {
            this.showLoading(true);
            const data = await adminImportExport.exportQuizQuestions();
            const filename = adminImportExport.generateBackupFilename('quiz');
            adminImportExport.downloadAsJSON(data, filename);
            this.showNotification('クイズ問題をエクスポートしました', 'success');
        } catch (error) {
            this.showNotification(`エクスポートに失敗しました: ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async exportCategories() {
        try {
            this.showLoading(true);
            const data = await adminImportExport.exportCategories();
            const filename = adminImportExport.generateBackupFilename('categories');
            adminImportExport.downloadAsJSON(data, filename);
            this.showNotification('カテゴリ情報をエクスポートしました', 'success');
        } catch (error) {
            this.showNotification(`エクスポートに失敗しました: ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async exportCompleteBackup() {
        try {
            this.showLoading(true);
            const data = await adminImportExport.exportAllData();
            const filename = adminImportExport.generateBackupFilename('complete');
            adminImportExport.downloadAsJSON(data, filename);
            this.showNotification('完全バックアップを作成しました', 'success');
        } catch (error) {
            this.showNotification(`バックアップ作成に失敗しました: ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * ファイルインポートの処理
     * @param {File} file ファイルオブジェクト
     */
    async handleFileImport(file) {
        try {
            this.showLoading(true);
            const result = await adminImportExport.importFromJSON(file);
            this.showImportResult(result);
        } catch (error) {
            this.showNotification(`インポートに失敗しました: ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * データ整合性の検証
     */
    async validateDataIntegrity() {
        try {
            this.showLoading(true);
            const result = await adminImportExport.validateDataIntegrity();
            this.showValidationResult(result);
        } catch (error) {
            this.showNotification(`データ検証に失敗しました: ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * インポート結果の表示
     * @param {Object} result インポート結果
     */
    showImportResult(result) {
        const message = `
            <h3>インポート結果</h3>
            <p><strong>処理済み:</strong> ${result.processed} 件</p>
            <p><strong>エラー:</strong> ${result.errors} 件</p>
            ${result.warnings.length > 0 ? `
                <h4>警告:</h4>
                <ul>${result.warnings.map(w => `<li>${w}</li>`).join('')}</ul>
            ` : ''}
        `;
        
        this.showModal('インポート結果', message);
    }

    /**
     * 検証結果の表示
     * @param {Object} result 検証結果
     */
    showValidationResult(result) {
        const statusIcon = result.valid ? '✅' : '❌';
        const statusText = result.valid ? '正常' : '問題あり';
        
        const message = `
            <h3>${statusIcon} データ整合性チェック結果</h3>
            <p><strong>ステータス:</strong> ${statusText}</p>
            
            ${result.issues.length > 0 ? `
                <h4>🚨 重大な問題:</h4>
                <ul>${result.issues.map(issue => `<li>${issue}</li>`).join('')}</ul>
            ` : ''}
            
            ${result.warnings.length > 0 ? `
                <h4>⚠️ 警告:</h4>
                <ul>${result.warnings.map(warning => `<li>${warning}</li>`).join('')}</ul>
            ` : ''}
            
            <h4>📊 統計:</h4>
            <p><strong>プログラミング問題:</strong> ${result.stats.programming.checked}/${result.stats.programming.total} 件検証 (エラー: ${result.stats.programming.errors}件)</p>
            <p><strong>クイズ問題:</strong> ${result.stats.quiz.checked}/${result.stats.quiz.total} 件検証 (エラー: ${result.stats.quiz.errors}件)</p>
        `;
        
        this.showModal('データ整合性チェック', message);
    }

    /**
     * サイドバーのトグル
     */
    toggleSidebar() {
        if (window.innerWidth <= 768) {
            this.elements.sidebar.classList.toggle('mobile-open');
        } else {
            this.elements.sidebar.classList.toggle('collapsed');
        }
    }

    /**
     * ローディング表示の制御
     * @param {boolean} show 表示するかどうか
     */
    showLoading(show) {
        this.isLoading = show;
        if (this.elements.loadingOverlay) {
            this.elements.loadingOverlay.classList.toggle('hidden', !show);
        }
        
        // ボタンの無効化/有効化
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.disabled = show;
        });
    }

    /**
     * 通知の表示
     * @param {string} message メッセージ
     * @param {string} type 通知タイプ (success, error, warning, info)
     */
    showNotification(message, type = 'info') {
        console.log(`📢 Notification (${type}): ${message}`);
        
        // 簡易的な通知表示（実際の実装ではより洗練されたUIを使用）
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // 5秒後に自動削除
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    /**
     * モーダルの表示
     * @param {string} title タイトル
     * @param {string} content コンテンツHTML
     */
    showModal(title, content) {
        if (!this.elements.modalOverlay || !this.elements.modalContent) return;
        
        this.elements.modalContent.innerHTML = `
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="adminApp.hideModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="adminApp.hideModal()">閉じる</button>
            </div>
        `;
        
        this.elements.modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * モーダルの非表示
     */
    hideModal() {
        if (this.elements.modalOverlay) {
            this.elements.modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    /**
     * 自動更新の設定
     */
    setupAutoRefresh() {
        // 5分ごとに統計を自動更新
        this.refreshInterval = setInterval(async () => {
            if (this.currentView === 'dashboard' && !this.isLoading) {
                console.log('🔄 Auto-refreshing dashboard...');
                try {
                    await this.showDashboard();
                } catch (error) {
                    console.warn('⚠️ Auto-refresh failed:', error);
                }
            }
        }, 5 * 60 * 1000);
        
        console.log('⏰ Auto-refresh set up (5 minutes interval)');
    }

    /**
     * ウィンドウリサイズの処理
     */
    handleResize() {
        // チャートのリサイズ
        if (adminStatistics.chartInstances.size > 0) {
            adminStatistics.chartInstances.forEach(chart => {
                chart.resize();
            });
        }
        
        // レスポンシブ調整
        if (window.innerWidth > 768 && this.elements.sidebar.classList.contains('mobile-open')) {
            this.elements.sidebar.classList.remove('mobile-open');
        }
    }

    /**
     * アプリケーションの破棄
     */
    destroy() {
        console.log('🗑️ Destroying AdminApp...');
        
        // インターバルのクリア
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
        
        // チャートの破棄
        if (adminStatistics) {
            adminStatistics.destroyCharts();
        }
        
        // イベントリスナーの削除は省略（ページ離脱時に自動削除される）
        
        this.initialized = false;
        console.log('✅ AdminApp destroyed');
    }

    /**
     * ユーティリティメソッド
     */
    
    debounce(func, wait) {
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

    truncateText(text, length) {
        if (!text || text.length <= length) return text;
        return text.substring(0, length) + '...';
    }

    getDifficultyClass(difficulty) {
        const classes = {
            '初級': 'success',
            '中級': 'warning',
            '上級': 'danger'
        };
        return classes[difficulty] || 'secondary';
    }

    getLevelClass(level) {
        const classes = {
            'basic': 'success',
            'intermediate': 'warning',
            'advanced': 'danger'
        };
        return classes[level] || 'secondary';
    }

    getLevelLabel(level) {
        const labels = {
            'basic': '基礎',
            'intermediate': '中級',
            'advanced': '上級'
        };
        return labels[level] || level;
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    getNotificationColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        return colors[type] || '#3b82f6';
    }

    // プレースホルダーメソッド（実際の実装では詳細な機能を追加）
    viewProblemDetail(problemId) {
        console.log(`📖 View problem detail: ${problemId}`);
        this.showNotification('問題詳細表示機能は開発中です', 'info');
    }

    editProblem(problemId) {
        console.log(`✏️ Edit problem: ${problemId}`);
        this.showNotification('問題編集機能は開発中です', 'info');
    }

    deleteProblem(problemId) {
        console.log(`🗑️ Delete problem: ${problemId}`);
        this.showNotification('問題削除機能は開発中です', 'info');
    }

    viewQuestionDetail(questionId) {
        console.log(`📖 View question detail: ${questionId}`);
        this.showNotification('問題詳細表示機能は開発中です', 'info');
    }

    editQuestion(questionId) {
        console.log(`✏️ Edit question: ${questionId}`);
        this.showNotification('問題編集機能は開発中です', 'info');
    }

    deleteQuestion(questionId) {
        console.log(`🗑️ Delete question: ${questionId}`);
        this.showNotification('問題削除機能は開発中です', 'info');
    }

    viewCategory(categoryId) {
        console.log(`📁 View category: ${categoryId}`);
        this.showNotification('カテゴリ表示機能は開発中です', 'info');
    }

    editCategory(categoryId) {
        console.log(`✏️ Edit category: ${categoryId}`);
        this.showNotification('カテゴリ編集機能は開発中です', 'info');
    }
}

// グローバルインスタンス作成
const adminApp = new AdminApp();

// DOMContentLoaded時に初期化
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded, initializing AdminApp...');
    adminApp.initialize().catch(error => {
        console.error('❌ Critical error during AdminApp initialization:', error);
    });
});

// ページ離脱時のクリーンアップ
window.addEventListener('beforeunload', () => {
    if (adminApp) {
        adminApp.destroy();
    }
});