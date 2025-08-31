/**
 * フロントエンド入門 - メインアプリケーション
 * 新レイアウト対応: HTML/CSS学習システム
 */

class AdvancedFrontendLearning {
    constructor() {
        this.currentProblem = null;
        this.isUpdating = false;
        this.previewUpdateTimeout = null;
        this.activeFileType = 'html';
        
        // マルチファイル管理
        this.fileContents = {
            html: '',
            css: '',
            js: ''
        };
        
        // 正解データ管理
        this.expectedFiles = {
            html: '',
            css: '',
            js: ''
        };
        
        // 全画面表示管理
        this.fullscreenActive = false;
        this.fullscreenType = '';
        
        // ヒントモーダル管理
        this.hintModalActive = false;
        
        // 結果表示タブ管理
        this.activeResultTab = 'summary';  // 'summary' または 'comparison'
        this.activeComparisonFile = 'html';  // 'html', 'css', 'js'
        
        this.initializeElements();
        this.setupEventListeners();
        this.loadProblems();
    }
    
    initializeElements() {
        // 問題選択関連
        this.tabNavigation = document.querySelector('.tab-navigation');
        this.problemList = document.getElementById('problem-list');
        this.problemDetails = document.getElementById('problem-details');
        
        // コードエディタ関連
        this.codeEditor = document.getElementById('code-editor');
        this.formatButton = document.getElementById('format-button');
        this.gradeButton = document.getElementById('grade-button');
        this.fileTabList = document.getElementById('file-tab-list');
        this.editorLabel = document.getElementById('editor-label');
        this.loading = document.getElementById('loading');
        
        // 正解パネル関連
        this.expectedPreviewTab = document.getElementById('expected-preview-tab');
        this.expectedCodeTab = document.getElementById('expected-code-tab');
        this.expectedPreviewView = document.getElementById('expected-preview-view');
        this.expectedCodeView = document.getElementById('expected-code-view');
        this.expectedPreview = document.getElementById('expected-preview');
        this.expectedFullscreenBtn = document.getElementById('expected-fullscreen-btn');
        
        // 正解コード表示関連
        this.expectedHtmlDisplay = document.getElementById('expected-html-display');
        this.expectedCssDisplay = document.getElementById('expected-css-display');
        this.expectedJsDisplay = document.getElementById('expected-js-display');
        
        // あなたパネル関連
        this.currentPreview = document.getElementById('current-preview');
        this.currentFullscreenBtn = document.getElementById('current-fullscreen-btn');
        
        // 採点結果関連
        this.resultArea = document.getElementById('result-area');
        this.noResult = document.getElementById('no-result');
        
        // コード比較関連
        this.resultTabNavigation = document.getElementById('result-tab-navigation');
        this.resultSummaryView = document.getElementById('result-summary-view');
        this.resultComparisonView = document.getElementById('result-comparison-view');
        this.comparisonFileTabs = document.querySelector('.comparison-file-tabs');
        this.expectedComparisonCode = document.getElementById('expected-comparison-code');
        this.userComparisonCode = document.getElementById('user-comparison-code');
        
        // プレビュー差分関連
        this.resultPreviewDiffView = document.getElementById('result-preview-diff-view');
        this.expectedDiffPreview = document.getElementById('expected-diff-preview');
        this.userDiffPreview = document.getElementById('user-diff-preview');
        
        // 全画面モーダル関連
        this.fullscreenModal = document.getElementById('fullscreen-modal');
        this.fullscreenTitle = document.getElementById('fullscreen-title');
        this.fullscreenBody = document.getElementById('fullscreen-body');
        this.fullscreenClose = document.getElementById('fullscreen-close');
        
        // ヒントモーダル関連
        this.hintModal = document.getElementById('hint-modal');
        this.hintModalTitle = document.getElementById('hint-modal-title');
        this.hintModalClose = document.getElementById('hint-modal-close');
        this.hintContent = document.getElementById('hint-content');
        this.hintLoading = document.getElementById('hint-loading');
        this.hintError = document.getElementById('hint-error');
        this.hintRetry = document.getElementById('hint-retry');
        
        // 現在アクティブな正解コード表示ファイル
        this.activeExpectedCodeFile = 'html';
    }
    
    setupEventListeners() {
        // コードエディタのリアルタイム更新
        this.codeEditor.addEventListener('input', () => {
            this.updateCurrentFileContent();
            this.schedulePreviewUpdate();
        });
        
        // フォーマットボタン
        this.formatButton.addEventListener('click', () => {
            this.formatCode();
        });
        
        // 採点ボタン
        this.gradeButton.addEventListener('click', () => {
            this.gradeCode();
        });
        
        // Ctrl+Enter で採点実行
        this.codeEditor.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.gradeCode();
            }
        });
        
        
        // 正解表示の切り替え
        if (this.expectedPreviewTab) {
            this.expectedPreviewTab.addEventListener('click', () => {
                this.showExpectedPreviewView();
            });
        }
        
        if (this.expectedCodeTab) {
            this.expectedCodeTab.addEventListener('click', () => {
                this.showExpectedCodeView();
            });
        }
        
        // ファイルタブの切り替え
        this.fileTabList.addEventListener('click', (e) => {
            const fileTab = e.target.closest('.file-tab');
            if (fileTab) {
                const fileType = fileTab.dataset.fileType;
                this.switchFileTab(fileType);
            }
        });
        
        // 正解コードファイルタブの切り替え
        document.addEventListener('click', (e) => {
            const codeFileTab = e.target.closest('.code-file-tab');
            if (codeFileTab) {
                const fileType = codeFileTab.dataset.codeFile;
                this.switchExpectedCodeFile(fileType);
            }
        });
        
        // 全画面表示ボタン
        if (this.expectedFullscreenBtn) {
            this.expectedFullscreenBtn.addEventListener('click', () => {
                this.openFullscreen('expected');
            });
        }
        
        if (this.currentFullscreenBtn) {
            this.currentFullscreenBtn.addEventListener('click', () => {
                this.openFullscreen('current');
            });
        }
        
        // 全画面モーダル閉じる
        if (this.fullscreenClose) {
            this.fullscreenClose.addEventListener('click', () => {
                this.closeFullscreen();
            });
        }
        
        // モーダル背景クリックで閉じる
        if (this.fullscreenModal) {
            this.fullscreenModal.addEventListener('click', (e) => {
                if (e.target === this.fullscreenModal) {
                    this.closeFullscreen();
                }
            });
        }
        
        // ESCキーでモーダルを閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.fullscreenActive) {
                    this.closeFullscreen();
                } else if (this.hintModalActive) {
                    this.closeHintModal();
                }
            }
        });
        
        // ヒントモーダル関連のイベントリスナー
        if (this.hintModalClose) {
            this.hintModalClose.addEventListener('click', () => {
                this.closeHintModal();
            });
        }
        
        // ヒントモーダル背景クリックで閉じる
        if (this.hintModal) {
            this.hintModal.addEventListener('click', (e) => {
                if (e.target === this.hintModal) {
                    this.closeHintModal();
                }
            });
        }
        
        // ヒント再試行ボタン
        if (this.hintRetry) {
            this.hintRetry.addEventListener('click', () => {
                if (this.currentProblem) {
                    this.loadHintContent(this.currentProblem.id);
                }
            });
        }
        
        // タブナビゲーションのクリックイベント（イベント委譲）
        this.tabNavigation.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-button')) {
                this.switchTab(e.target.dataset.category);
            }
        });
        
        // 問題リストのクリックイベント（イベント委譲）
        this.problemList.addEventListener('click', (e) => {
            const problemItem = e.target.closest('.problem-item');
            if (problemItem) {
                this.selectProblem(problemItem.dataset.problemId);
            }
        });
        
        // 結果タブナビゲーションのクリックイベント（イベント委譲）
        if (this.resultTabNavigation) {
            this.resultTabNavigation.addEventListener('click', (e) => {
                const resultTabButton = e.target.closest('.result-tab-button');
                if (resultTabButton) {
                    this.switchResultTab(resultTabButton.dataset.resultTab);
                }
            });
        }
        
        // コード比較ファイルタブのクリックイベント（イベント委譲）
        if (this.comparisonFileTabs) {
            this.comparisonFileTabs.addEventListener('click', (e) => {
                const comparisonTab = e.target.closest('.comparison-file-tab');
                if (comparisonTab) {
                    this.switchComparisonFile(comparisonTab.dataset.comparisonFile);
                }
            });
        }
    }
    
    async loadProblems() {
        try {
            // ローディング表示
            this.tabNavigation.innerHTML = '<div style="padding: 20px; text-align: center; color: #64748b;">問題を読み込み中...</div>';
            this.problemList.innerHTML = '';
            
            // フロントエンドインデックス情報を取得（カテゴリ詳細のため）
            this.frontendIndex = await problemLoader.loadFrontendIndex();
            
            // ProblemLoaderを使用してフロントエンド問題を読み込み
            const problems = await getFrontendProblemList();
            
            if (!problems || problems.length === 0) {
                throw new Error('フロントエンド問題データが見つかりません');
            }
            
            // カテゴリごとに問題をグループ化
            const problemsByCategory = {};
            problems.forEach(problem => {
                if (!problemsByCategory[problem.category]) {
                    problemsByCategory[problem.category] = [];
                }
                problemsByCategory[problem.category].push(problem);
            });
            
            // タブナビゲーションを生成
            this.createTabs(problemsByCategory);
            
            // 最初のカテゴリを選択
            const firstCategory = Object.keys(problemsByCategory)[0];
            if (firstCategory) {
                this.currentCategory = firstCategory;
                this.showProblemsForCategory(firstCategory, problemsByCategory[firstCategory]);
                
                // 最初のタブをアクティブにする
                const firstTab = this.tabNavigation.querySelector('.tab-button');
                if (firstTab) {
                    firstTab.classList.add('active');
                }
            }
            
            // 全問題データをキャッシュ
            this.problemsByCategory = problemsByCategory;
            this.allProblems = problems;
            
            console.log(`${problems.length}問の読み込み完了（${Object.keys(problemsByCategory).length}カテゴリ）`);
        } catch (error) {
            console.error('問題の読み込みに失敗しました:', error);
            this.tabNavigation.innerHTML = '<div class="error-message" style="padding: 20px; color: #ef4444;">問題の読み込みに失敗しました。ページを再読み込みしてください。</div>';
        }
    }
    
    /**
     * タブナビゲーションを生成
     */
    createTabs(problemsByCategory) {
        this.tabNavigation.innerHTML = '';
        
        // カテゴリ情報の定義（順序も含めて明確に）
        const categoryInfo = {
            'html-css-basics': { name: 'HTML/CSS基礎', icon: '🌐', order: 1 },
            'css-advanced': { name: 'CSS応用・モダンCSS', icon: '🎨', order: 2 },
            'javascript-dom': { name: 'JavaScript DOM操作', icon: '⚡', order: 3 },
            'javascript-advanced': { name: 'JavaScript応用', icon: '🔧', order: 4 },
            'practical-projects': { name: '実践プロジェクト', icon: '🚀', order: 5 }
        };
        
        // フロントエンドインデックスからカテゴリ情報を取得（優先）
        if (this.frontendIndex && this.frontendIndex.categories) {
            console.log('インデックスからカテゴリ情報を取得:', this.frontendIndex.categories);
            // index.jsonの順序でタブを作成
            this.frontendIndex.categories.forEach(categoryData => {
                const categoryId = categoryData.id;
                const problems = problemsByCategory[categoryId];
                
                console.log(`カテゴリ ${categoryId}: 問題数 ${problems ? problems.length : 0}`);
                
                if (problems && problems.length > 0) {
                    const tabButton = document.createElement('button');
                    tabButton.className = 'tab-button';
                    tabButton.dataset.category = categoryId;
                    
                    tabButton.innerHTML = `
                        ${categoryData.icon} ${categoryData.name}
                        <span class="problem-count">(${problems.length}問)</span>
                    `;
                    
                    this.tabNavigation.appendChild(tabButton);
                }
            });
        } else {
            console.log('フォールバック: 固定カテゴリ情報を使用');
            // フォールバック: 固定のカテゴリ情報を順序通りに使用
            Object.entries(categoryInfo)
                .sort(([,a], [,b]) => a.order - b.order)
                .forEach(([categoryId, info]) => {
                    const problems = problemsByCategory[categoryId];
                    
                    if (problems && problems.length > 0) {
                        const tabButton = document.createElement('button');
                        tabButton.className = 'tab-button';
                        tabButton.dataset.category = categoryId;
                        
                        tabButton.innerHTML = `
                            ${info.icon} ${info.name}
                            <span class="problem-count">(${problems.length}問)</span>
                        `;
                        
                        this.tabNavigation.appendChild(tabButton);
                    }
                });
        }
        
        // デバッグ: 作成されたタブ数を確認
        const tabCount = this.tabNavigation.querySelectorAll('.tab-button').length;
        console.log(`作成されたタブ数: ${tabCount}`);
    }

/**
 * 問題IDから適切な番号を抽出する
 */
extractProblemNumber(problemId, categoryId) {
    // 各カテゴリごとのプレフィックスを定義
    const prefixMap = {
        'html-css-basics': 'html-css-',
        'javascript-basics': 'js-basic-',
        'javascript-advanced': 'js-advanced-',
        'bootstrap-calculator': 'bootstrap-',
        'ec-project': 'ec-project-'
    };

    const prefix = prefixMap[categoryId];
    if (prefix && problemId.startsWith(prefix)) {
        const numberPart = problemId.replace(prefix, '');
        return numberPart.padStart(2, '0'); // 01, 02 形式にする
        }
        
        // フォールバック: 最後のハイフン以降の部分を抽出
        const lastDashIndex = problemId.lastIndexOf('-');
        if (lastDashIndex !== -1) {
            const numberPart = problemId.substring(lastDashIndex + 1);
            return numberPart.padStart(2, '0');
        }
        
        return problemId;
    }
    
    /**
     * 問題タイトルから古い番号形式を除去する
     */
    cleanProblemTitle(title) {
        // 「番号: タイトル」形式から番号部分を除去（小数点付きにも対応）
        // 例: "10: ..." や "10.1: ..." を除去
        return title.replace(/^\d+(?:\.\d+)?:\s*/, '');
    }
    
    /**
     * カテゴリの問題リストを表示
     */
    showProblemsForCategory(category, problems) {
        this.problemList.innerHTML = '';
        
        problems.forEach((problem, index) => {
            const problemItem = document.createElement('button');
            problemItem.className = 'problem-item';
            problemItem.dataset.problemId = problem.id;
            
            // 問題IDから番号を抽出（小数点付きにも対応）。失敗時はフォールバックでインデックス番号。
            const problemNumber = this.extractProblemNumber(problem.id, category) || String(index + 1).padStart(2, '0');
            // タイトルから古い番号を除去
            const cleanTitle = this.cleanProblemTitle(problem.title);
            
            problemItem.innerHTML = `
                <div class="problem-info">
                    <span class="problem-number">#${problemNumber}</span>
                    <span class="problem-title">${problemNumber}: ${cleanTitle}</span>
                </div>
            `;
            
            this.problemList.appendChild(problemItem);
        });
    }
    
    /**
     * タブを切り替える
     */
    switchTab(category) {
        // アクティブなタブボタンを切り替え
        this.tabNavigation.querySelectorAll('.tab-button').forEach(tab => {
            tab.classList.remove('active');
        });
        const activeTab = this.tabNavigation.querySelector(`[data-category="${category}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // カテゴリの問題を表示
        const problems = this.problemsByCategory[category];
        if (problems) {
            this.currentCategory = category;
            this.showProblemsForCategory(category, problems);
        }
    }
    
    async selectProblem(problemId) {
        try {
            console.groupCollapsed(`[selectProblem] start problemId=${problemId}`);
            this.problemList.querySelectorAll('.problem-item').forEach(item => {
                item.classList.remove('selected');
            });
            
            const selectedItem = this.problemList.querySelector(`[data-problem-id="${problemId}"]`);
            if (selectedItem) {
                selectedItem.classList.add('selected');
            }
            
            // ProblemLoaderから詳細な問題データを取得
            console.debug('[selectProblem] fetching problem via getFrontendProblem()', { problemId });
            this.currentProblem = await getFrontendProblem(problemId);
            console.debug('[selectProblem] fetch completed', {
                problemId,
                hasProblem: !!this.currentProblem,
                type: typeof this.currentProblem,
                keys: this.currentProblem ? Object.keys(this.currentProblem) : null
            });
            
            if (this.currentProblem) {
                console.debug('[selectProblem] displaying problem details');
                this.displayProblemDetails(this.currentProblem);
                console.debug('[selectProblem] loading templates');
                this.loadProblemTemplate(this.currentProblem);
                console.debug('[selectProblem] loading expected data');
                this.loadExpectedData(this.currentProblem);
                this.clearResults();
                
                console.log(`問題 ${problemId} を選択しました`);
            } else {
                console.warn('[selectProblem] currentProblem is null/undefined', { problemId });
                throw new Error(`問題 ${problemId} が見つかりませんでした`);
            }
        } catch (error) {
            console.error(`問題 ${problemId} の選択に失敗:`, error);
            if (error && error.stack) {
                console.error('[selectProblem] stack:', error.stack);
            }
            console.groupEnd?.();
            this.showError('問題の選択に失敗しました。');
        }
        finally {
            // ensure group ends in success path as well
            console.groupEnd?.();
        }
    }
    
    displayProblemDetails(problem) {
        const cleanTitle = problem.title?.replace(/^問題\d+：?\s*/, '') || '無題';
        
        this.problemDetails.innerHTML = `
            <div class="problem-title-display">
                <h3>${cleanTitle}</h3>
                <button id="hint-button" class="hint-button">💡 ヒントを見る</button>
            </div>
            <div class="problem-description">${problem.description || ''}</div>
            <div class="problem-instructions">
                <div class="instructions-header">💡 実装のポイント</div>
                <ul>
                    ${(problem.instructions || []).map(instruction => 
                        instruction ? `<li>${instruction}</li>` : '<li style="list-style:none; height:5px;"></li>'
                    ).join('')}
                </ul>
            </div>
        `;
        this.problemDetails.style.display = 'block';
        
        // ヒントボタンの動的イベントリスナーを設定
        this.initializeHintButton();
    }
    
    loadProblemTemplate(problem) {
        // 複数ファイルのテンプレートを設定
        this.fileContents = {
            html: problem.files?.html?.template || this.getDefaultTemplate(),
            css: problem.files?.css?.template || '',
            js: problem.files?.js?.template || ''
        };
        
        // 現在のアクティブタブの内容をエディタに表示
        this.codeEditor.value = this.fileContents[this.activeFileType].replace(/\\n/g, '\n');
        this.updateEditorLabel();
        this.schedulePreviewUpdate();
    }
    
    async loadExpectedData(problem) {
        // 期待される結果を複数ファイルで取得（__INCLUDE__: パス 対応）
        const rawHtml = problem.files?.html?.expected || '';
        const rawCss = problem.files?.css?.expected || '';
        const rawJs = problem.files?.js?.expected || '';

        // __INCLUDE__ ディレクティブを解決
        const [resolvedHtml, resolvedCss, resolvedJs] = await Promise.all([
            this.loadExpectedContent(rawHtml),
            this.loadExpectedContent(rawCss),
            this.loadExpectedContent(rawJs)
        ]);

        this.expectedFiles = {
            html: resolvedHtml || '<html><body><p>期待される結果</p></body></html>',
            css: resolvedCss || '',
            js: resolvedJs || ''
        };

        // 統合HTML生成してプレビュー表示
        const combinedExpectedHtml = this.generateExpectedCombinedHtml();
        this.displayPreview(this.expectedPreview, combinedExpectedHtml);

        // 正解コード表示を更新
        this.updateExpectedCodeDisplays();

        // デフォルトでプレビュー表示
        this.showExpectedPreviewView();
    }

    async loadExpectedContent(content) {
        const str = content || '';
        if (typeof str === 'string' && str.trim().startsWith('__INCLUDE__:')) {
            const path = str.split(':')[1]?.trim() || '';
            if (!path) return '';
            try {
                const res = await fetch(path, { cache: 'no-cache' });
                if (!res.ok) throw new Error(`Failed to fetch include: ${path} (${res.status})`);
                return await res.text();
            } catch (e) {
                console.error('expected include の読み込みに失敗:', e);
                return '';
            }
        }
        return str;
    }
    
    generateExpectedCombinedHtml() {
        const htmlContent = this.expectedFiles.html || '';
        const cssContent = this.expectedFiles.css || '';
        const jsContent = this.expectedFiles.js || '';
        
        // HTMLが空の場合はデフォルトテンプレート
        if (!htmlContent.trim()) {
            return this.getDefaultTemplate();
        }
        
        // 期待プレビュー時は外部参照<link rel="stylesheet">や<script src>を除去（404防止）
        let combinedHtml = htmlContent
            // 外部CSSリンクを除去
            .replace(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi, '')
            // 外部JS読み込みを除去
            .replace(/<script[^>]*src=[^>]*><\s*\/script>/gi, '');
        
        // CSS を <style> タグとして挿入
        if (cssContent.trim()) {
            const styleTag = `\n<style>\n${cssContent}\n</style>`;
            
            if (combinedHtml.includes('</head>')) {
                combinedHtml = combinedHtml.replace('</head>', `${styleTag}\n</head>`);
            } else {
                combinedHtml = `<head>${styleTag}\n</head>\n${combinedHtml}`;
            }
        }
        
        // JavaScript を <script> タグとして挿入
        if (jsContent.trim()) {
            const scriptTag = `\n<script>\n${jsContent}\n</script>`;
            
            if (combinedHtml.includes('</body>')) {
                combinedHtml = combinedHtml.replace('</body>', `${scriptTag}\n</body>`);
            } else {
                combinedHtml = `${combinedHtml}\n${scriptTag}`;
            }
        }
        
        return combinedHtml;
    }
    
    updateExpectedCodeDisplays() {
        this.expectedHtmlDisplay.textContent = this.expectedFiles.html || '';
        this.expectedCssDisplay.textContent = this.expectedFiles.css || '';
        this.expectedJsDisplay.textContent = this.expectedFiles.js || '';
        
        // 初期表示はHTML
        this.switchExpectedCodeFile('html');
    }
    
    getDefaultTemplate() {
        return `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <!-- ここにコンテンツを追加してください -->
</body>
</html>`;
    }
    
    // ファイルタブ切り替え機能
    switchFileTab(fileType) {
        if (fileType === this.activeFileType) return;
        
        // 現在編集中の内容を保存
        this.updateCurrentFileContent();
        
        // アクティブタブを切り替え
        this.activeFileType = fileType;
        
        // UIを更新
        this.updateTabActiveState();
        this.updateEditorContent();
        this.updateEditorLabel();
        
        // プレビューを更新
        this.schedulePreviewUpdate();
    }
    
    switchExpectedCodeFile(fileType) {
        this.activeExpectedCodeFile = fileType;
        
        // コードファイルタブの切り替え
        document.querySelectorAll('.code-file-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`.code-file-tab[data-code-file="${fileType}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // コード表示の切り替え
        this.expectedHtmlDisplay.style.display = fileType === 'html' ? 'block' : 'none';
        this.expectedCssDisplay.style.display = fileType === 'css' ? 'block' : 'none';
        this.expectedJsDisplay.style.display = fileType === 'js' ? 'block' : 'none';
    }
    
    updateCurrentFileContent() {
        this.fileContents[this.activeFileType] = this.codeEditor.value;
    }
    
    updateTabActiveState() {
        this.fileTabList.querySelectorAll('.file-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTab = this.fileTabList.querySelector(`[data-file-type="${this.activeFileType}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }
    
    updateEditorContent() {
        this.codeEditor.value = this.fileContents[this.activeFileType] || '';
    }
    
    updateEditorLabel() {
        const labels = {
            html: 'HTMLを入力してください：',
            css: 'CSSを入力してください：',
            js: 'JavaScriptを入力してください：'
        };
        
        this.editorLabel.textContent = labels[this.activeFileType] || 'コードを入力してください：';
    }
    
    schedulePreviewUpdate() {
        if (this.previewUpdateTimeout) {
            clearTimeout(this.previewUpdateTimeout);
        }
        
        this.previewUpdateTimeout = setTimeout(() => {
            this.updateCurrentPreview();
        }, 500);
    }
    
    updateCurrentPreview() {
        this.updateCurrentFileContent();
        const combinedHtml = this.generateCombinedHtml();
        this.displayPreview(this.currentPreview, combinedHtml);
    }
    
    generateCombinedHtml() {
        const htmlContent = this.fileContents.html || '';
        const cssContent = this.fileContents.css || '';
        const jsContent = this.fileContents.js || '';
        
        if (!htmlContent.trim()) {
            return this.getDefaultTemplate();
        }
        
        // 外部<link rel="stylesheet">や<script src>は除去（ローカル404防止）
        let combinedHtml = htmlContent
            .replace(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi, '')
            .replace(/<script[^>]*src=[^>]*><\s*\/script>/gi, '');
        
        // CSS を <style> タグとして挿入
        if (cssContent.trim()) {
            const styleTag = `\n<style>\n${cssContent}\n</style>`;
            
            if (combinedHtml.includes('</head>')) {
                combinedHtml = combinedHtml.replace('</head>', `${styleTag}\n</head>`);
            } else {
                combinedHtml = `<head>${styleTag}\n</head>\n${combinedHtml}`;
            }
        }
        
        // JavaScript を <script> タグとして挿入
        if (jsContent.trim()) {
            const scriptTag = `\n<script>\n${jsContent}\n</script>`;
            
            if (combinedHtml.includes('</body>')) {
                combinedHtml = combinedHtml.replace('</body>', `${scriptTag}\n</body>`);
            } else {
                combinedHtml = `${combinedHtml}\n${scriptTag}`;
            }
        }
        
        return combinedHtml;
    }
    
    displayPreview(iframe, htmlCode) {
        if (!iframe || !htmlCode) return;
        
        try {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(htmlCode);
            doc.close();
        } catch (error) {
            console.error('プレビューの表示に失敗:', error);
        }
    }
    
    formatCode() {
        const code = this.codeEditor.value;
        
        let formatted;
        switch (this.activeFileType) {
            case 'html':
                formatted = this.formatHtml(code);
                break;
            case 'css':
                formatted = this.formatCss(code);
                break;
            case 'js':
                formatted = this.formatJs(code);
                break;
            default:
                formatted = code;
        }
        
        this.codeEditor.value = formatted;
        this.schedulePreviewUpdate();
    }
    
    formatHtml(html) {
        let formatted = html
            .replace(/></g, '>\n<')
            .replace(/^\s+|\s+$/gm, '');
        
        const lines = formatted.split('\n');
        let indentLevel = 0;
        const indentSize = 4;
        
        return lines.map(line => {
            const trimmed = line.trim();
            if (!trimmed) return '';
            
            if (trimmed.startsWith('</')) {
                indentLevel = Math.max(0, indentLevel - 1);
            }
            
            const indentedLine = ' '.repeat(indentLevel * indentSize) + trimmed;
            
            if (trimmed.match(/<[^/>]+[^/]>$/)) {
                indentLevel++;
            }
            
            return indentedLine;
        }).join('\n');
    }
    
    formatCss(css) {
        return css
            .replace(/\{/g, ' {\n    ')
            .replace(/\}/g, '\n}\n')
            .replace(/;/g, ';\n    ')
            .replace(/,/g, ',\n')
            .replace(/\n\s*\n/g, '\n')
            .trim();
    }
    
    formatJs(js) {
        // 簡単なJavaScript整形
        return js
            .replace(/\{/g, ' {\n    ')
            .replace(/\}/g, '\n}\n')
            .replace(/;/g, ';\n    ')
            .replace(/\n\s*\n/g, '\n')
            .trim();
    }
    
    // 正解表示切り替え
    showExpectedPreviewView() {
        this.expectedPreviewTab.classList.add('active');
        this.expectedCodeTab.classList.remove('active');
        this.expectedPreviewView.style.display = 'block';
        this.expectedCodeView.style.display = 'none';
    }
    
    showExpectedCodeView() {
        this.expectedPreviewTab.classList.remove('active');
        this.expectedCodeTab.classList.add('active');
        this.expectedPreviewView.style.display = 'none';
        this.expectedCodeView.style.display = 'block';
    }
    
    // 全画面表示機能
    openFullscreen(type) {
        this.fullscreenActive = true;
        this.fullscreenType = type;
        
        if (type === 'expected') {
            this.fullscreenTitle.textContent = '正解プレビュー - 全画面表示';
            
            // 期待されるHTMLを全画面表示
            const expectedCombined = this.generateExpectedCombinedHtml();
            this.fullscreenBody.innerHTML = `<iframe style="width: 100%; height: 100%; border: none; border-radius: 8px;"></iframe>`;
            const iframe = this.fullscreenBody.querySelector('iframe');
            this.displayPreview(iframe, expectedCombined);
            
        } else if (type === 'current') {
            this.fullscreenTitle.textContent = 'あなたのプレビュー - 全画面表示';
            
            // 現在のHTMLを全画面表示
            const currentCombined = this.generateCombinedHtml();
            this.fullscreenBody.innerHTML = `<iframe style="width: 100%; height: 100%; border: none; border-radius: 8px;"></iframe>`;
            const iframe = this.fullscreenBody.querySelector('iframe');
            this.displayPreview(iframe, currentCombined);
        }
        
        this.fullscreenModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    closeFullscreen() {
        this.fullscreenActive = false;
        this.fullscreenType = '';
        this.fullscreenModal.classList.remove('show');
        document.body.style.overflow = '';
        this.fullscreenBody.innerHTML = '';
    }
    
    // 採点機能（grader.html の結果表示ロジックを統合）
    async gradeCode() {
        if (!this.currentProblem) {
            this.showError('問題を選択してください。');
            return;
        }
        
        this.updateCurrentFileContent();
        
        const hasContent = Object.values(this.fileContents).some(content => content.trim());
        if (!hasContent) {
            this.showError('コードを入力してください。');
            return;
        }
        
        this.startGrading();
        
        try {
            const result = await this.analyzeCode();
            this.displayResults(result);
        } catch (error) {
            console.error('採点中にエラーが発生:', error);
            this.showError('採点中にエラーが発生しました。');
        } finally {
            this.stopGrading();
        }
    }
    
    async analyzeCode() {
        const combinedHtml = this.generateCombinedHtml();
        const parser = new DOMParser();
        const doc = parser.parseFromString(combinedHtml, 'text/html');
        
        const checks = this.getChecksForProblem(this.currentProblem.id);
        const results = [];
        let totalScore = 0;
        let maxScore = checks.length * 10;
        
        for (const check of checks) {
            const result = await this.runCheck(doc, check, combinedHtml);
            results.push(result);
            if (result.passed) {
                totalScore += 10;
            }
        }
        
        // 追加の複数ファイル評価
        const additionalResults = await this.runAdditionalFileChecks();
        results.push(...additionalResults);
        maxScore += additionalResults.length * 10;
        
        additionalResults.forEach(result => {
            if (result.passed) {
                totalScore += 10;
            }
        });
        
        return {
            score: totalScore,
            maxScore: maxScore,
            checks: results,
            status: totalScore === maxScore ? 'PERFECT' : totalScore > 0 ? 'PARTIAL' : 'FAILED',
            fileContents: this.fileContents
        };
    }
    
    async runAdditionalFileChecks() {
        const additionalChecks = [];
        
        // CSS関連のチェック
        const cssContent = this.fileContents.css?.trim();
        if (cssContent) {
            additionalChecks.push({
                id: 'css-content',
                name: 'CSSスタイル',
                type: 'css',
                passed: cssContent.length > 0,
                message: 'CSSが記述されています'
            });
            
            const hasValidCss = this.validateCssBasics(cssContent);
            additionalChecks.push({
                id: 'css-syntax',
                name: 'CSS構文',
                type: 'css',
                passed: hasValidCss,
                message: hasValidCss ? 'CSS構文が正常です' : 'CSS構文にエラーがあります'
            });
        }
        
        // JavaScript関連のチェック
        const jsContent = this.fileContents.js?.trim();
        if (jsContent) {
            additionalChecks.push({
                id: 'js-content',
                name: 'JavaScript',
                type: 'js',
                passed: jsContent.length > 0,
                message: 'JavaScriptが記述されています'
            });
            
            const hasValidJs = this.validateJsBasics(jsContent);
            additionalChecks.push({
                id: 'js-syntax',
                name: 'JavaScript構文',
                type: 'js',
                passed: hasValidJs,
                message: hasValidJs ? 'JavaScript構文が正常です' : 'JavaScript構文にエラーがあります'
            });
        }
        
        return additionalChecks;
    }
    
    validateCssBasics(cssContent) {
        try {
            const hasSelector = /[a-zA-Z#.\-_\[\]:\s]+\s*\{[\s\S]*?\}/.test(cssContent);
            return hasSelector;
        } catch (error) {
            return false;
        }
    }
    
    validateJsBasics(jsContent) {
        try {
            const hasFunction = /function\s+\w+\s*\([\s\S]*?\)\s*\{/.test(jsContent) ||
                              /\w+\s*=\s*function\s*\([\s\S]*?\)\s*\{/.test(jsContent) ||
                              /\w+\s*=\s*\([\s\S]*?\)\s*=>\s*\{/.test(jsContent) ||
                              /const\s+\w+\s*=/.test(jsContent) ||
                              /let\s+\w+\s*=/.test(jsContent) ||
                              /var\s+\w+\s*=/.test(jsContent);
            
            const hasControl = /if\s*\([\s\S]*?\)\s*\{/.test(jsContent) ||
                             /for\s*\([\s\S]*?\)\s*\{/.test(jsContent) ||
                             /while\s*\([\s\S]*?\)\s*\{/.test(jsContent);
            
            return hasFunction || hasControl || jsContent.includes('console.log');
        } catch (error) {
            return false;
        }
    }
    
    getChecksForProblem(problemId) {
        if (this.currentProblem && this.currentProblem.checks) {
            return this.currentProblem.checks;
        }
        
        return [
            { id: 'doctype', name: 'DOCTYPE宣言', type: 'structure', message: 'DOCTYPE html宣言が必要です' },
            { id: 'html', name: '<html>タグ', type: 'structure', message: '<html>タグが必要です' },
            { id: 'head', name: '<head>セクション', type: 'structure', message: '<head>セクションが必要です' },
            { id: 'body', name: '<body>セクション', type: 'structure', message: '<body>セクションが必要です' },
            { id: 'title', name: '<title>タグ', type: 'structure', message: '<title>タグと内容が必要です' }
        ];
    }
    
    async runCheck(doc, check, originalHtml = '') {
        try {
            switch (check.id) {
                case 'doctype': {
                    const hasDoctype = originalHtml.toLowerCase().includes('<!doctype html>') ||
                        originalHtml.toLowerCase().includes('<!doctype html ') ||
                        /<!doctype\s+html\s*>/i.test(originalHtml);
                    return { ...check, passed: hasDoctype, message: 'DOCTYPE html宣言が必要です' };
                }

                case 'html':
                    return { ...check, passed: doc.querySelector('html') !== null, message: '<html>タグが必要です' };

                case 'head':
                    return { ...check, passed: doc.querySelector('head') !== null, message: '<head>セクションが必要です' };

                case 'body':
                    return { ...check, passed: doc.querySelector('body') !== null, message: '<body>セクションが必要です' };

                case 'title': {
                    const title = doc.querySelector('title');
                    return { ...check, passed: title !== null && title.textContent.trim() !== '', message: '<title>タグと内容が必要です' };
                }

                case 'h1': {
                    const h1 = doc.querySelector('h1');
                    return { ...check, passed: h1 !== null && h1.textContent.trim() !== '', message: '<h1>見出しと内容が必要です' };
                }

                // CSS 基本
                case 'css-content': {
                    const cssContent = (this.fileContents.css || '').trim();
                    const hasCss = cssContent.length > 0;
                    return { ...check, passed: hasCss, message: hasCss ? 'CSSが記述されています' : (check.message || 'CSSでスタイルを設定してください') };
                }

                case 'css-syntax': {
                    const cssContent = (this.fileContents.css || '').trim();
                    const hasValidCss = this.validateCssBasics(cssContent);
                    return { ...check, passed: hasValidCss, message: hasValidCss ? 'CSS構文が正常です' : 'CSS構文にエラーがあります' };
                }

                case 'css-margin': {
                    const css = (this.fileContents.css || '').toLowerCase();
                    const hasMargin = /\bmargin\s*:/i.test(css) || /\bmargin-(top|right|bottom|left)\s*:/i.test(css);
                    return { ...check, passed: hasMargin, message: hasMargin ? 'marginが設定されています' : (check.message || 'marginプロパティで外側余白を設定してください') };
                }

                case 'css-padding': {
                    const css = (this.fileContents.css || '').toLowerCase();
                    const hasPadding = /\bpadding\s*:/i.test(css) || /\bpadding-(top|right|bottom|left)\s*:/i.test(css);
                    return { ...check, passed: hasPadding, message: hasPadding ? 'paddingが設定されています' : (check.message || 'paddingプロパティで内側余白を設定してください') };
                }

                // CSS 応用（#15）
                case 'hover-effects': {
                    const css = (this.fileContents.css || '');
                    const hasHover = /:\s*hover\s*\{/i.test(css) || /:\s*hover\b/i.test(css);
                    return { ...check, passed: !!hasHover, message: hasHover ? ':hover セレクタが実装されています' : (check.message || ':hover セレクタでホバー時のスタイルを設定してください') };
                }

                case 'transform-properties': {
                    const css = (this.fileContents.css || '').toLowerCase();
                    const hasTransform = /\btransform\s*:/i.test(css) || /\b(scale|rotate|translate|skew)\s*\(/i.test(css);
                    return { ...check, passed: !!hasTransform, message: hasTransform ? 'transformが設定されています' : (check.message || 'transform: scale()/rotate()/translate() などを設定してください') };
                }

                case 'transition-animations': {
                    const css = (this.fileContents.css || '').toLowerCase();
                    const hasTransition = /\btransition\s*:/i.test(css) || /\btransition-(property|duration|timing-function|delay)\s*:/i.test(css);
                    return { ...check, passed: !!hasTransition, message: hasTransition ? 'transitionが設定されています' : (check.message || 'transitionプロパティで変化のアニメーションを設定してください') };
                }

                default:
                    return { ...check, passed: false, message: 'チェック項目が不明です' };
            }
        } catch (error) {
            return { ...check, passed: false, message: `チェック中にエラーが発生: ${error.message}` };
        }
    }
    
    // grader.html スタイルの採点結果表示（強化版）
    displayResults(result) {
        const percentage = Math.round((result.score / result.maxScore) * 100);
        
        const statusClass = result.status === 'PERFECT' ? 'status-accepted' : 
                          result.status === 'PARTIAL' ? 'status-partial' : 'status-wrong';
        
        const statusIcon = result.status === 'PERFECT' ? '🎉' : 
                          result.status === 'PARTIAL' ? '🟡' : '❌';
        
        const statusText = result.status === 'PERFECT' ? '完璧です！' : 
                          result.status === 'PARTIAL' ? '部分的に正解' : '要改善';
        
        const baseScore = 10;
        
        let resultHtml = `
            <div class="result-content">
                <div class="result-header ${statusClass}">
                    <div class="status-indicator">
                        <span class="status-icon">${statusIcon}</span>
                        <span class="status-text">${statusText}</span>
                    </div>
                    <div class="percentage-display">
                        ${percentage}%
                    </div>
                </div>
                
                <div class="score-overview">
                    <div class="total-score-display">
                        <span class="score-label">総合得点:</span>
                        <span class="score-value">${result.score}/${result.maxScore}点</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar">
                            <div class="progress-fill ${statusClass}" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                    <div class="progress-text">
                        ${result.checks.filter(c => c.passed).length}/${result.checks.length} チェック項目通過
                    </div>
                </div>
                
                <div class="detailed-results">
                    <div class="results-title">📊 採点結果詳細</div>
                    <div class="test-cases">
        `;
        
        result.checks.forEach((check, index) => {
            const checkScore = check.passed ? baseScore : 0;
            const checkPercentage = check.passed ? 100 : 0;
            const itemClass = check.passed ? 'test-case-passed' : 'test-case-failed';
            const icon = check.passed ? '✅' : '❌';
            
            const displayName = this.escapeHtml(check.name);
            const displayMessage = this.escapeHtml(check.message);
            
            resultHtml += `
                <div class="test-case ${itemClass}">
                    <div class="test-case-header">
                        <div class="test-info">
                            <span class="test-icon">${icon}</span>
                            <span class="test-name">${displayName}</span>
                        </div>
                        <div class="test-score">
                            <span class="score-fraction">${checkScore}/${baseScore}点</span>
                            <span class="score-percentage">${checkPercentage}%</span>
                        </div>
                    </div>
                    <div class="test-message">
                        ${displayMessage}
                    </div>
                    
                    <!-- 詳細なエラー情報 -->
                    ${!check.passed && check.details ? `
                        <div class="error-details">
                            <div class="error-details-header">🔍 詳細な解析結果</div>
                            <div class="error-details-content">${this.escapeHtml(check.details)}</div>
                        </div>
                    ` : ''}
                    
                    <!-- 期待値と実際の値の比較 -->
                    ${!check.passed && check.expected && check.actual ? `
                        <div class="output-comparison">
                            <div class="output-box expected-output">
                                <h4>期待される結果</h4>
                                <div class="output-content">${this.escapeHtml(check.expected)}</div>
                            </div>
                            <div class="output-box actual-output">
                                <h4>実際の結果</h4>
                                <div class="output-content">${this.escapeHtml(check.actual)}</div>
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="test-progress">
                        <div class="test-progress-bar">
                            <div class="test-progress-fill ${itemClass}" style="width: ${checkPercentage}%"></div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        // ファイル別サマリー表示
        const fileTypeCounts = {
            html: { total: 0, passed: 0 },
            css: { total: 0, passed: 0 },
            js: { total: 0, passed: 0 },
            structure: { total: 0, passed: 0 }
        };
        
        result.checks.forEach(check => {
            const type = check.type || 'structure';
            if (fileTypeCounts[type]) {
                fileTypeCounts[type].total++;
                if (check.passed) {
                    fileTypeCounts[type].passed++;
                }
            }
        });
        
        resultHtml += `
                    </div>
                    
                    <!-- ファイル別サマリー -->
                    <div class="file-summary">
                        <div class="results-title">📁 ファイル別結果</div>
                        <div class="file-summary-grid">
        `;
        
        Object.entries(fileTypeCounts).forEach(([type, counts]) => {
            if (counts.total > 0) {
                const typePercentage = Math.round((counts.passed / counts.total) * 100);
                const typeClass = typePercentage === 100 ? 'summary-perfect' : 
                                typePercentage > 0 ? 'summary-partial' : 'summary-zero';
                const typeIcon = type === 'html' ? '🌐' : 
                               type === 'css' ? '🎨' : 
                               type === 'js' ? '⚙️' : '🏗️';
                const typeName = type === 'html' ? 'HTML' : 
                               type === 'css' ? 'CSS' : 
                               type === 'js' ? 'JavaScript' : '構造';
                
                resultHtml += `
                    <div class="file-summary-item ${typeClass}">
                        <div class="file-summary-header">
                            <span class="file-summary-icon">${typeIcon}</span>
                            <span class="file-summary-name">${typeName}</span>
                        </div>
                        <div class="file-summary-score">
                            ${counts.passed}/${counts.total} (${typePercentage}%)
                        </div>
                        <div class="file-summary-progress">
                            <div class="file-summary-progress-bar">
                                <div class="file-summary-progress-fill ${typeClass}" style="width: ${typePercentage}%"></div>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
        
        resultHtml += `
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.resultArea.innerHTML = resultHtml;
        this.resultArea.style.display = 'block';
        this.noResult.style.display = 'none';
        
        // 結果エリアにスムーズスクロール
        this.resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // プレビューにハイライト効果
        const previewContainer = this.currentPreview.closest('.preview-container');
        if (result.status === 'PERFECT') {
            previewContainer.classList.add('preview-success');
            setTimeout(() => previewContainer.classList.remove('preview-success'), 2000);
        } else if (result.status === 'FAILED') {
            previewContainer.classList.add('preview-error');
            setTimeout(() => previewContainer.classList.remove('preview-error'), 2000);
        }
        
        // 結果通知音（オプション）
        this.playNotificationSound(result.status);
        
        // コード比較機能を初期化
        this.initializeCodeComparison();
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    startGrading() {
        this.gradeButton.disabled = true;
        this.gradeButton.textContent = '採点中...';
        this.loading.classList.add('show');
    }
    
    stopGrading() {
        this.gradeButton.disabled = false;
        this.gradeButton.textContent = '📊 採点実行';
        this.loading.classList.remove('show');
    }
    
    clearResults() {
        this.resultArea.style.display = 'none';
        this.noResult.style.display = 'block';
    }
    
    showError(message) {
        this.resultArea.innerHTML = `
            <div class="error-display">
                <div class="error-title">⚠️ エラー</div>
                <div>${message}</div>
            </div>
        `;
        this.resultArea.style.display = 'block';
        this.noResult.style.display = 'none';
    }
    
    // 結果通知音（オプション機能）
    playNotificationSound(status) {
        if (!window.speechSynthesis) return;
        
        try {
            let message = '';
            switch (status) {
                case 'PERFECT':
                    message = '採点完了。完璧です！';
                    break;
                case 'PARTIAL':
                    message = '採点完了。部分的に正解です。';
                    break;
                default:
                    message = '採点完了。要改善です。';
            }
            
            // 簡単な音声通知（ユーザー設定で無効化可能）
            const utterance = new SpeechSynthesisUtterance(message);
            utterance.lang = 'ja-JP';
            utterance.volume = 0.3;
            utterance.rate = 1.2;
            
            // ユーザーの設定で音声通知が有効な場合のみ再生
            const soundEnabled = localStorage.getItem('advancedFrontend.soundEnabled');
            if (soundEnabled !== 'false') {
                window.speechSynthesis.speak(utterance);
            }
        } catch (error) {
            console.log('音声通知の再生に失敗しました:', error);
        }
    }
    
    // ==========================================
    // コード比較機能
    // ==========================================
    
    /**
     * 結果タブを切り替え（採点結果 ↔ コード比較）
     * @param {string} resultTab - 'summary' または 'comparison'
     */
    switchResultTab(resultTab) {
        if (resultTab === this.activeResultTab) return;
        
        this.activeResultTab = resultTab;
        this.updateResultTabState();
        this.updateResultView();
        
        // コード比較タブがアクティブになった時にコード比較を更新
        if (resultTab === 'comparison') {
            this.updateCodeComparison();
        }
        
        // プレビュー差分タブがアクティブになった時にプレビュー差分を更新
        if (resultTab === 'preview-diff') {
            this.updatePreviewDiff();
        }
    }
    
    /**
     * コード比較ファイルタブを切り替え（HTML/CSS/JS）
     * @param {string} fileType - 'html', 'css', 'js'
     */
    switchComparisonFile(fileType) {
        if (fileType === this.activeComparisonFile) return;
        
        this.activeComparisonFile = fileType;
        this.updateComparisonFileTabState();
        this.updateCodeComparison();
    }
    
    /**
     * 結果タブの表示状態を更新
     */
    updateResultTabState() {
        if (!this.resultTabNavigation) return;
        
        // 全てのタブからactiveクラスを削除
        const tabs = this.resultTabNavigation.querySelectorAll('.result-tab-button');
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // アクティブなタブにactiveクラスを追加
        const activeTab = this.resultTabNavigation.querySelector(
            `.result-tab-button[data-result-tab="${this.activeResultTab}"]`
        );
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }
    
    /**
     * 結果ビューの表示切り替え
     */
    updateResultView() {
        if (this.resultSummaryView) {
            this.resultSummaryView.style.display = 
                this.activeResultTab === 'summary' ? 'block' : 'none';
        }
        
        if (this.resultComparisonView) {
            this.resultComparisonView.style.display = 
                this.activeResultTab === 'comparison' ? 'block' : 'none';
        }
        
        if (this.resultPreviewDiffView) {
            this.resultPreviewDiffView.style.display = 
                this.activeResultTab === 'preview-diff' ? 'block' : 'none';
        }
    }
    
    /**
     * コード比較ファイルタブの表示状態を更新
     */
    updateComparisonFileTabState() {
        if (!this.comparisonFileTabs) return;
        
        // 全てのタブからactiveクラスを削除
        const tabs = this.comparisonFileTabs.querySelectorAll('.comparison-file-tab');
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // アクティブなタブにactiveクラスを追加
        const activeTab = this.comparisonFileTabs.querySelector(
            `.comparison-file-tab[data-comparison-file="${this.activeComparisonFile}"]`
        );
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }
    
    /**
     * コード比較表示を更新
     */
    updateCodeComparison() {
        if (!this.expectedComparisonCode || !this.userComparisonCode) return;
        
        const expectedCode = this.getExpectedCodeForFile(this.activeComparisonFile);
        const userCode = this.getUserCodeForFile(this.activeComparisonFile);
        
        if (!expectedCode && !userCode) {
            // 両方とも空の場合
            this.displayEmptyComparison();
            return;
        }
        
        // 差分ハイライト付きでコードを表示
        const expectedHtml = this.generateCodeWithDiff(expectedCode || '', userCode || '', 'expected');
        const userHtml = this.generateCodeWithDiff(userCode || '', expectedCode || '', 'user');
        
        this.expectedComparisonCode.innerHTML = expectedHtml;
        this.userComparisonCode.innerHTML = userHtml;
        
        // 行番号クラスを追加
        this.expectedComparisonCode.classList.add('with-line-numbers');
        this.userComparisonCode.classList.add('with-line-numbers');
    }
    
    /**
     * 指定ファイルタイプの正解コードを取得
     * @param {string} fileType - 'html', 'css', 'js'
     * @returns {string} 正解コード
     */
    getExpectedCodeForFile(fileType) {
        if (!this.expectedFiles || !this.expectedFiles[fileType]) {
            return '';
        }
        return this.expectedFiles[fileType];
    }
    
    /**
     * 指定ファイルタイプのユーザーコードを取得
     * @param {string} fileType - 'html', 'css', 'js'
     * @returns {string} ユーザーコード
     */
    getUserCodeForFile(fileType) {
        if (!this.fileContents || !this.fileContents[fileType]) {
            return '';
        }
        return this.fileContents[fileType];
    }
    
    /**
     * 差分ハイライト付きのコードHTMLを生成
     * @param {string} code - 表示するコード
     * @param {string} compareCode - 比較対象のコード
     * @param {string} type - 'expected' または 'user'
     * @returns {string} ハイライト付きのHTML
     */
    generateCodeWithDiff(code, compareCode, type) {
        const codeLines = code.split('\n');
        const compareLines = compareCode.split('\n');
        
        let html = '<div class="line-numbers">';
        for (let i = 1; i <= codeLines.length; i++) {
            html += `<div>${i}</div>`;
        }
        html += '</div><div class="code-content">';
        
        for (let i = 0; i < codeLines.length; i++) {
            const line = codeLines[i];
            const compareLine = compareLines[i] || '';
            
            let lineClass = '';
            let processedLine = this.escapeHtml(line);
            
            if (i >= compareLines.length) {
                // 比較対象にない行 = 追加された行
                lineClass = type === 'expected' ? 'added' : 'added';
            } else if (line !== compareLine) {
                // 内容が異なる行 = 変更された行
                lineClass = 'modified';
                processedLine = this.highlightCharDifferences(line, compareLine, type);
            }
            
            html += `<div class="code-line ${lineClass}">${processedLine}</div>`;
        }
        
        // 比較対象の方が長い場合（削除された行）
        if (compareLines.length > codeLines.length) {
            for (let i = codeLines.length; i < compareLines.length; i++) {
                const deletedLine = this.escapeHtml(compareLines[i]);
                html += `<div class="code-line removed">${deletedLine}</div>`;
            }
        }
        
        html += '</div>';
        return html;
    }
    
    /**
     * 文字レベルの差分をハイライト
     * @param {string} line - 現在の行
     * @param {string} compareLine - 比較対象の行
     * @param {string} type - 'expected' または 'user'
     * @returns {string} ハイライト付きの行HTML
     */
    highlightCharDifferences(line, compareLine, type) {
        if (line === compareLine) return this.escapeHtml(line);
        
        // 簡単な文字差分実装（完全一致チェック）
        let result = '';
        const maxLength = Math.max(line.length, compareLine.length);
        
        for (let i = 0; i < maxLength; i++) {
            const char = line[i] || '';
            const compareChar = compareLine[i] || '';
            
            if (char === compareChar) {
                result += this.escapeHtml(char);
            } else {
                if (char && !compareChar) {
                    // 追加された文字
                    result += `<span class="diff-char added">${this.escapeHtml(char)}</span>`;
                } else if (!char && compareChar) {
                    // 削除された文字（比較対象にのみ存在）
                    if (type === 'expected') {
                        result += `<span class="diff-char removed">${this.escapeHtml(compareChar)}</span>`;
                    }
                } else {
                    // 変更された文字
                    result += `<span class="diff-char modified">${this.escapeHtml(char)}</span>`;
                }
            }
        }
        
        return result;
    }
    
    /**
     * 空のコード比較状態を表示
     */
    displayEmptyComparison() {
        const emptyMessage = `
            <div class="comparison-empty-state">
                <h3>コード比較</h3>
                <p>問題を選択して採点を実行すると、<br>正解コードとあなたのコードを比較できます。</p>
            </div>
        `;
        
        this.expectedComparisonCode.innerHTML = emptyMessage;
        this.userComparisonCode.innerHTML = emptyMessage;
    }
    
    /**
     * プレビュー差分表示を更新
     */
    updatePreviewDiff() {
        if (!this.expectedDiffPreview || !this.userDiffPreview) return;
        
        // 正解のプレビューを生成・表示
        const expectedCombinedHtml = this.generateExpectedCombinedHtml();
        this.displayPreview(this.expectedDiffPreview, expectedCombinedHtml);
        
        // ユーザーのプレビューを生成・表示
        const userCombinedHtml = this.generateCombinedHtml();
        this.displayPreview(this.userDiffPreview, userCombinedHtml);
        
        // プレビュー表示後、差分を強調表示
        setTimeout(() => {
            this.highlightPreviewDifferences();
        }, 200); // iframeの読み込み完了を待つ
    }
    
    /**
     * プレビュー差分を強調表示
     */
    highlightPreviewDifferences() {
        try {
            const expectedDoc = this.expectedDiffPreview.contentDocument;
            const userDoc = this.userDiffPreview.contentDocument;
            
            if (!expectedDoc || !userDoc) {
                console.warn('iframe document not available');
                return;
            }
            
            // 差分強調用スタイルを両方のiframeに注入
            this.injectDiffStyles(expectedDoc);
            this.injectDiffStyles(userDoc);
            // 検出した差分を強調表示
            this.markDifferences(expectedDoc, userDoc, differences);
            
        } catch (error) {
            console.error('差分強調表示エラー:', error);
        }
    }
    
    /**
     * iframe内に差分強調用CSSを注入
     */
    injectDiffStyles(doc) {
        const styleElement = doc.createElement('style');
        styleElement.innerHTML = `
            .diff-missing {
                border: 2px dashed #ef4444 !important;
                background: rgba(239, 68, 68, 0.1) !important;
                animation: diffPulse 2s infinite;
                position: relative;
            }
            
            .diff-missing::before {
                content: "不足";
                position: absolute;
                top: -20px;
                left: -1px;
                background: #ef4444;
                color: white;
                padding: 2px 6px;
                font-size: 11px;
                border-radius: 3px;
                font-weight: bold;
                z-index: 1000;
            }
            
            .diff-extra {
                border: 2px solid #22c55e !important;
                background: rgba(34, 197, 94, 0.1) !important;
                animation: diffPulse 2s infinite;
                position: relative;
            }
            
            .diff-extra::before {
                content: "余分";
                position: absolute;
                top: -20px;
                left: -1px;
                background: #22c55e;
                color: white;
                padding: 2px 6px;
                font-size: 11px;
                border-radius: 3px;
                font-weight: bold;
                z-index: 1000;
            }
            
            .diff-changed {
                border: 2px solid #fbbf24 !important;
                background: rgba(251, 191, 36, 0.1) !important;
                animation: diffPulse 2s infinite;
                position: relative;
            }
            
            .diff-changed::before {
                content: "変更";
                position: absolute;
                top: -20px;
                left: -1px;
                background: #fbbf24;
                color: white;
                padding: 2px 6px;
                font-size: 11px;
                border-radius: 3px;
                font-weight: bold;
                z-index: 1000;
            }
            
            @keyframes diffPulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
        `;
        doc.head.appendChild(styleElement);
    }
    
    /**
     * DOM要素を再帰的に比較
     */
    compareDOMElements(expectedElement, userElement) {
        const differences = {
            missing: [], // 正解にあってユーザーにない
            extra: [],   // ユーザーにあって正解にない
            changed: []  // 内容が異なる
        };
        
        this.compareElementsRecursive(expectedElement, userElement, differences, 'expected');
        this.compareElementsRecursive(userElement, expectedElement, differences, 'user');
        
        return differences;
    }
    
    /**
     * 要素を再帰的に比較（内部関数）
     */
    compareElementsRecursive(sourceElement, targetElement, differences, type) {
        if (!sourceElement || !targetElement) return;
        
        // テキストノードの比較
        if (sourceElement.nodeType === Node.TEXT_NODE) {
            if (sourceElement.textContent.trim() !== targetElement.textContent.trim()) {
                if (type === 'expected') {
                    differences.changed.push({
                        element: sourceElement.parentElement,
                        type: 'text',
                        expected: sourceElement.textContent,
                        actual: targetElement.textContent
                    });
                }
            }
            return;
        }
        
        // 要素ノードの比較
        if (sourceElement.nodeType === Node.ELEMENT_NODE) {
            const sourceChildren = Array.from(sourceElement.children);
            const targetChildren = Array.from(targetElement.children);
            
            // 子要素の比較
            sourceChildren.forEach((sourceChild, index) => {
                const targetChild = targetChildren[index];
                const matchingChild = this.findMatchingElement(sourceChild, targetChildren);
                
                if (!matchingChild) {
                    // マッチする要素が見つからない = 不足または余分
                    if (type === 'expected') {
                        differences.missing.push({
                            element: sourceChild,
                            parent: sourceElement,
                            index: index
                        });
                    } else {
                        differences.extra.push({
                            element: sourceChild,
                            parent: sourceElement,
                            index: index
                        });
                    }
                } else {
                    // 要素は存在するが内容が異なるかチェック
                    if (!this.elementsEqual(sourceChild, matchingChild)) {
                        differences.changed.push({
                            element: type === 'expected' ? sourceChild : matchingChild,
                            type: 'element'
                        });
                    }
                    
                    // 再帰的に子要素をチェック
                    this.compareElementsRecursive(sourceChild, matchingChild, differences, type);
                }
            });
        }
    }
    
    /**
     * 対応する要素を検索
     */
    findMatchingElement(sourceElement, targetElements) {
        return targetElements.find(target => 
            target.tagName === sourceElement.tagName &&
            target.className === sourceElement.className &&
            target.id === sourceElement.id
        );
    }
    
    /**
     * 要素が等しいかチェック
     */
    elementsEqual(element1, element2) {
        if (element1.tagName !== element2.tagName) return false;
        if (element1.className !== element2.className) return false;
        if (element1.id !== element2.id) return false;
        if (element1.textContent.trim() !== element2.textContent.trim()) return false;
        return true;
    }
    
    /**
     * 検出した差分を要素にマーク
     */
    markDifferences(expectedDoc, userDoc, differences) {
        // 不足要素（正解側に表示）
        differences.missing.forEach(diff => {
            if (diff.element) {
                diff.element.classList.add('diff-missing');
            }
        });
        
        // 余分要素（ユーザー側に表示）
        differences.extra.forEach(diff => {
            if (diff.element) {
                diff.element.classList.add('diff-extra');
            }
        });
        
        // 変更要素（両方に表示）
        differences.changed.forEach(diff => {
            if (diff.element) {
                diff.element.classList.add('diff-changed');
            }
        });
    }
    
    /**
     * コード比較機能を初期化
     * displayResults()から呼び出される
     */
    initializeCodeComparison() {
        if (!this.resultTabNavigation) return;
        
        // 採点結果がある時のみタブナビゲーションを表示
        this.resultTabNavigation.style.display = 'flex';
        
        // デフォルトは採点結果タブを表示
        this.switchResultTab('summary');
        this.switchComparisonFile('html');
    }
    
    // ===== ヒント機能関連メソッド =====
    
    /**
     * ヒントボタンの動的イベントリスナーを初期化
     */
    initializeHintButton() {
        const hintButton = document.getElementById('hint-button');
        if (hintButton) {
            hintButton.addEventListener('click', () => {
                this.openHintModal();
            });
        }
    }
    
    /**
     * ヒントモーダルを開く
     */
    async openHintModal() {
        if (!this.currentProblem || !this.hintModal) return;
        
        this.hintModalActive = true;
        this.hintModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        // ヒントモーダル内のスクロール対象要素にフォーカスを当ててスクロールを有効化
        const modalBody = this.hintModal.querySelector('.hint-modal-body');
        if (modalBody) {
            // 明示的に縦スクロールを許可
            modalBody.style.overflowY = 'auto';
            // キーボード/ホイールスクロールを有効にするためフォーカス可能に
            if (!modalBody.hasAttribute('tabindex')) {
                modalBody.setAttribute('tabindex', '-1');
            }
            // 少し遅らせてからフォーカス（描画完了後）
            setTimeout(() => {
                try { modalBody.focus({ preventScroll: true }); } catch (_) { modalBody.focus(); }
            }, 0);
        }
        
        // モーダルのタイトルを設定
        if (this.hintModalTitle) {
            this.hintModalTitle.textContent = `💡 ${this.currentProblem.title} - ヒント`;
        }
        
        // ローディング表示
        this.showHintLoading();
        
        try {
            await this.loadHintContent(this.currentProblem.id);
        } catch (error) {
            console.error('ヒントの読み込みに失敗:', error);
            this.showHintError();
        }
    }
    
    /**
     * ヒントモーダルを閉じる
     */
    closeHintModal() {
        if (!this.hintModal) return;
        
        this.hintModalActive = false;
        this.hintModal.classList.remove('show');
        document.body.style.overflow = '';
        // フォーカス/スタイルの後始末
        const modalBody = this.hintModal.querySelector('.hint-modal-body');
        if (modalBody) {
            // スタイルは他用途に影響しないよう残しても良いが、明示的にクリア
            // modalBody.style.overflowY = '';
            // 必要なら tabindex は残して問題なし（将来のオープンでも利用）
        }
        
        // スクロール指標を非表示
        const scrollIndicator = document.getElementById('hint-scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.display = 'none';
        }
        
        // コンテンツをクリア
        if (this.hintContent) {
            this.hintContent.innerHTML = '';
        }
    }
    
    /**
     * ヒントコンテンツを読み込み
     */
    async loadHintContent(problemId) {
        try {
            console.log(`ヒント読み込み開始: ${problemId}`);
            const markdownContent = await loadProblemReadme(problemId);
            
            if (markdownContent && markdownContent.trim()) {
                console.log(`Markdown取得成功 (${markdownContent.length}文字): ${problemId}`);
                const htmlContent = this.renderMarkdown(markdownContent);
                this.showHintContent(htmlContent);
                console.log(`ヒント表示完了: ${problemId}`);
            } else {
                throw new Error('ヒントが見つかりませんでした。');
            }
        } catch (error) {
            console.error(`ヒント読み込みエラー (${problemId}):`, error);
            
            // より詳細なエラーメッセージでユーザーに通知
            const errorMessage = this.getDetailedErrorMessage(error, problemId);
            this.showDetailedHintError(errorMessage, problemId);
            throw error;
        }
    }

    /**
     * 詳細なエラーメッセージを生成
     * @param {Error} error - エラーオブジェクト
     * @param {string} problemId - 問題ID
     * @returns {string} 詳細なエラーメッセージ
     */
    getDetailedErrorMessage(error, problemId) {
        if (error.message.includes('HTTP 404')) {
            return `問題「${problemId}」のヒントファイルが見つかりませんでした。\n\n考えられる原因:\n• ファイルが存在しない\n• パスの指定に誤りがある`;
        } else if (error.message.includes('Failed to fetch') || error.message.includes('Network')) {
            return `ヒントファイルの読み込みに失敗しました。\n\nネットワーク接続を確認してください。\n\n技術的詳細: ${error.message}`;
        } else if (error.message.includes('Empty') || error.message.includes('no content')) {
            return `問題「${problemId}」のヒントファイルは空です。\n\n管理者にお問い合わせください。`;
        } else {
            return `予期しないエラーが発生しました。\n\n問題ID: ${problemId}\nエラー: ${error.message}`;
        }
    }

    /**
     * 詳細なエラー表示（改良版）
     * @param {string} message - エラーメッセージ
     * @param {string} problemId - 問題ID
     */
    showDetailedHintError(message, problemId) {
        if (this.hintError) {
            this.hintError.innerHTML = `
                <div class="detailed-error-content">
                    <h4>⚠️ ヒント取得エラー</h4>
                    <div class="error-message">${message.replace(/\n/g, '<br>')}</div>
                    <div class="error-actions">
                        <button id="hint-retry-detailed" class="hint-retry-btn">🔄 再試行</button>
                        <button id="hint-fallback" class="hint-fallback-btn">📝 基本情報を表示</button>
                    </div>
                    <div class="error-technical-details">
                        <details>
                            <summary>技術的詳細</summary>
                            <p>問題ID: <code>${problemId}</code></p>
                            <p>タイムスタンプ: ${new Date().toLocaleString('ja-JP')}</p>
                        </details>
                    </div>
                </div>
            `;
            this.hintError.style.display = 'block';
            
            // 再試行ボタンのイベント設定
            const retryBtn = document.getElementById('hint-retry-detailed');
            if (retryBtn) {
                retryBtn.addEventListener('click', () => {
                    this.loadHintContent(problemId);
                });
            }
            
            // フォールバック表示ボタンのイベント設定
            const fallbackBtn = document.getElementById('hint-fallback');
            if (fallbackBtn) {
                fallbackBtn.addEventListener('click', () => {
                    this.showFallbackHint(problemId);
                });
            }
        }
        
        if (this.hintLoading) this.hintLoading.style.display = 'none';
        if (this.hintContent) this.hintContent.style.display = 'none';
    }

    /**
     * フォールバックヒント表示
     * @param {string} problemId - 問題ID
     */
    async showFallbackHint(problemId) {
        try {
            this.showHintLoading();
            
            const fallbackContent = `
# ${this.currentProblem?.title || problemId} - 基本情報

## 問題について
${this.currentProblem?.description || '問題の詳細情報を確認してください。'}

## 実装のポイント
${(this.currentProblem?.instructions || []).map((instruction, index) => `${index + 1}. ${instruction}`).join('\n') || '• 問題の要件を満たすコードを書いてください'}

## ヒント
- エディタでコードを書いて、プレビューで結果を確認しましょう
- 正解と見比べながら実装してください
- エラーが発生したら、採点結果を参考に修正してください

---
*詳細なヒントが利用できない場合の基本情報です*
            `;
            
            const htmlContent = this.renderMarkdown(fallbackContent);
            this.showHintContent(htmlContent);
            
        } catch (error) {
            console.error('フォールバックヒント表示エラー:', error);
            this.showHintError();
        }
    }
    
    /**
     * MarkdownをHTMLに変換
     */
    renderMarkdown(markdown) {
        try {
            // marked.jsがロードされているかチェック
            if (typeof marked !== 'undefined') {
                // marked.jsを使用してレンダリング
                return marked.parse(markdown);
            } else {
                // フォールバック: 簡易Markdownレンダリング
                return this.simpleMarkdownRenderer(markdown);
            }
        } catch (error) {
            console.error('Markdownレンダリングエラー:', error);
            return this.simpleMarkdownRenderer(markdown);
        }
    }
    
    /**
     * 簡易Markdownレンダラー（フォールバック）
     */
    simpleMarkdownRenderer(markdown) {
        return markdown
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^# (.+)$/gm, '<h1>$1</h1>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/```([^`]+)```/gs, '<pre><code>$1</code></pre>')
            .replace(/^\- (.+)$/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(.+)$/gm, '<p>$1</p>')
            .replace(/<p><h/g, '<h')
            .replace(/<\/h(\d)><\/p>/g, '</h$1>')
            .replace(/<p><ul>/g, '<ul>')
            .replace(/<\/ul><\/p>/g, '</ul>')
            .replace(/<p><pre>/g, '<pre>')
            .replace(/<\/pre><\/p>/g, '</pre>');
    }
    
    /**
     * ローディング表示
     */
    showHintLoading() {
        if (this.hintLoading) this.hintLoading.style.display = 'block';
        if (this.hintContent) this.hintContent.style.display = 'none';
        if (this.hintError) this.hintError.style.display = 'none';
    }
    
    /**
     * ヒントコンテンツ表示
     */
    showHintContent(htmlContent) {
        if (this.hintContent) {
            this.hintContent.innerHTML = htmlContent;
            this.hintContent.style.display = 'block';
            
            // シンタックスハイライト適用
            this.applySyntaxHighlight();
            
            // ヒント描画直後にスクロール対象を再設定
            const modalBody = this.hintModal?.querySelector('.hint-modal-body');
            if (modalBody) {
                // 念のためoverflowを明示し、先頭から開始
                modalBody.style.overflowY = 'auto';
                modalBody.scrollTop = 0;
                if (!modalBody.hasAttribute('tabindex')) {
                    modalBody.setAttribute('tabindex', '-1');
                }
                // フォーカスしてキーボード/ホイール/タッチスクロールを確実に有効化
                try { modalBody.focus({ preventScroll: true }); } catch (_) { modalBody.focus(); }
            }

            // スクロール指標の表示制御
            setTimeout(() => {
                this.updateScrollIndicator();
            }, 100); // DOM更新完了を待つ
        }
        
        if (this.hintLoading) this.hintLoading.style.display = 'none';
        if (this.hintError) this.hintError.style.display = 'none';
    }
    
    /**
     * エラー表示（シンプル版 - 後方互換性のため保持）
     */
    showHintError() {
        if (this.hintError) {
            // デフォルトのシンプルなエラーメッセージ
            this.hintError.innerHTML = `
                <div class="simple-error-content">
                    <h4>⚠️ ヒントの読み込みに失敗しました</h4>
                    <p>しばらく時間をおいて再試行してください。</p>
                    <button id="hint-retry-simple" class="hint-retry-btn">再試行</button>
                </div>
            `;
            this.hintError.style.display = 'block';
            
            // 再試行ボタンのイベント設定
            const retryBtn = document.getElementById('hint-retry-simple');
            if (retryBtn) {
                retryBtn.addEventListener('click', () => {
                    if (this.currentProblem) {
                        this.loadHintContent(this.currentProblem.id);
                    }
                });
            }
        }
        if (this.hintLoading) this.hintLoading.style.display = 'none';
        if (this.hintContent) this.hintContent.style.display = 'none';
    }
    
    /**
     * シンタックスハイライト適用
     */
    applySyntaxHighlight() {
        if (typeof hljs !== 'undefined') {
            try {
                // コードブロックにシンタックスハイライトを適用
                this.hintContent.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
            } catch (error) {
                console.warn('シンタックスハイライトの適用に失敗:', error);
            }
        }
    }
    
    /**
     * スクロール指標の表示制御
     */
    updateScrollIndicator() {
        const modalBody = document.querySelector('.hint-modal-body');
        const scrollIndicator = document.getElementById('hint-scroll-indicator');
        
        if (!modalBody || !scrollIndicator) return;
        
        // スクロール可能かチェック
        const isScrollable = modalBody.scrollHeight > modalBody.clientHeight;
        
        if (isScrollable) {
            scrollIndicator.style.display = 'block';
            
            // スクロール位置を監視して指標を制御
            const handleScroll = () => {
                const scrollTop = modalBody.scrollTop;
                const scrollHeight = modalBody.scrollHeight;
                const clientHeight = modalBody.clientHeight;
                
                // 下部に近づいたら指標を非表示
                if (scrollTop + clientHeight >= scrollHeight - 50) {
                    scrollIndicator.style.display = 'none';
                } else {
                    scrollIndicator.style.display = 'block';
                }
            };
            
            // スクロールイベントリスナーを追加（重複を避けるため一度削除）
            modalBody.removeEventListener('scroll', handleScroll);
            modalBody.addEventListener('scroll', handleScroll);
        } else {
            scrollIndicator.style.display = 'none';
        }
    }
    
    // ==========================================
    // 自動化ユーティリティ: expected自動貼付→採点 / 404チェック
    // ==========================================
    
    /**
     * 現在問題のユーザーコードを正解コードに置き換える
     */
    setUserCodeToExpected() {
        if (!this.expectedFiles) return;
        this.fileContents.html = this.expectedFiles.html || '';
        this.fileContents.css = this.expectedFiles.css || '';
        this.fileContents.js = this.expectedFiles.js || '';
        this.updateEditorContent();
        this.schedulePreviewUpdate();
    }
    
    /**
     * 指定IDの問題を開き、expectedを貼付して採点
     */
    async autoPasteExpectedAndGradeById(problemId) {
        await this.selectProblem(problemId);
        if (this.currentProblem && this.currentProblem.id === problemId) {
            await this.loadExpectedData(this.currentProblem);
        }
        this.setUserCodeToExpected();
        await this.gradeCode();
    }
    
    /**
     * 現在カテゴリの問題インデックス範囲で一括実行（1始まり）
     */
    async autoPasteExpectedAndGradeRange(startIndex, endIndex) {
        const list = this.problemsByCategory?.[this.currentCategory] || [];
        const s = Math.max(1, startIndex|0);
        const e = Math.min(list.length, endIndex|0);
        for (let i = s; i <= e; i++) {
            const p = list[i - 1];
            if (!p) continue;
            console.log(`[auto-grade] ${i}/${list.length}: ${p.id}`);
            await this.autoPasteExpectedAndGradeById(p.id);
        }
        console.log('[auto-grade] 完了');
    }
    
    /**
     * 問題ID配列で一括実行
     */
    async autoPasteExpectedAndGradeIds(ids = []) {
        for (const id of ids) {
            console.log(`[auto-grade] ${id}`);
            await this.autoPasteExpectedAndGradeById(id);
        }
        console.log('[auto-grade] 完了');
    }
    
    /**
     * HTMLから外部リソースのURLを抽出
     */
    extractResourceUrlsFromHtml(html) {
        const urls = new Set();
        try {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const add = (u) => { if (u) urls.add(u); };
            doc.querySelectorAll('[src]').forEach(el => add(el.getAttribute('src')));
            doc.querySelectorAll('link[rel="stylesheet"]').forEach(el => add(el.getAttribute('href')));
            doc.querySelectorAll('a[href]').forEach(el => add(el.getAttribute('href')));
        } catch (e) {
            console.warn('extractResourceUrlsFromHtml failed:', e);
        }
        return Array.from(urls);
    }
    
    /**
     * 相対URLをページ基準で解決
     */
    resolveUrl(u) {
        try {
            return new URL(u, window.location.href).toString();
        } catch {
            return u;
        }
    }
    
    /**
     * 指定HTMLの参照リソースに対してHTTP存在確認を行う
     */
    async checkResourceLinks(html) {
        const urls = this.extractResourceUrlsFromHtml(html)
            .map(u => this.resolveUrl(u))
            .filter(u => /^https?:\/\//.test(u));
        const results = [];
        await Promise.all(urls.map(async (url) => {
            try {
                const res = await fetch(url, { method: 'HEAD' });
                results.push({ url, ok: res.ok, status: res.status });
            } catch (e) {
                results.push({ url, ok: false, status: 0, error: String(e) });
            }
        }));
        return results;
    }
    
    /**
     * 現在問題のexpected結合HTMLで404健全性チェック
     */
    async checkExpectedResourcesForCurrent() {
        const html = this.generateExpectedCombinedHtml();
        const results = await this.checkResourceLinks(html);
        const missing = results.filter(r => !r.ok);
        console.table(results);
        if (missing.length) {
            console.warn('[resource-check] 参照不整合があります:', missing);
        } else {
            console.log('[resource-check] 参照は全て到達可能です');
        }
        return { results, missing };
    }
    
    /**
     * 現在のユーザー結合HTMLで404健全性チェック
     */
    async checkUserResourcesForCurrent() {
        const html = this.generateCombinedHtml();
        const results = await this.checkResourceLinks(html);
        const missing = results.filter(r => !r.ok);
        console.table(results);
        if (missing.length) {
            console.warn('[resource-check] 参照不整合があります:', missing);
        } else {
            console.log('[resource-check] 参照は全て到達可能です');
        }
        return { results, missing };
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    window.advancedFrontendLearning = new AdvancedFrontendLearning();
    // 開発者向けユーティリティ公開（UI非侵襲）
    window.aflTools = {
        gradeRange: (s, e) => window.advancedFrontendLearning.autoPasteExpectedAndGradeRange(s, e),
        gradeIds: (ids) => window.advancedFrontendLearning.autoPasteExpectedAndGradeIds(ids),
        checkExpected: () => window.advancedFrontendLearning.checkExpectedResourcesForCurrent(),
        checkUser: () => window.advancedFrontendLearning.checkUserResourcesForCurrent(),
        pasteExpected: () => window.advancedFrontendLearning.setUserCodeToExpected(),
    };
});