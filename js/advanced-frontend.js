/**
 * アドバンスド フロントエンド学習 - メインアプリケーション
 * 新レイアウト対応: HTML/CSS/JavaScript統合学習システム
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
        
        // 全画面モーダル関連
        this.fullscreenModal = document.getElementById('fullscreen-modal');
        this.fullscreenTitle = document.getElementById('fullscreen-title');
        this.fullscreenBody = document.getElementById('fullscreen-body');
        this.fullscreenClose = document.getElementById('fullscreen-close');
        
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
        
        // ESCキーで全画面モーダルを閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.fullscreenActive) {
                this.closeFullscreen();
            }
        });
        
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
    }
    
    async loadProblems() {
        try {
            // ローディング表示
            this.tabNavigation.innerHTML = '<div style="padding: 20px; text-align: center; color: #64748b;">問題を読み込み中...</div>';
            this.problemList.innerHTML = '';
            
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
        const categoryInfo = {
            'html-basics': { name: 'HTML基礎', icon: '🏗️' },
            'css-foundation': { name: 'CSS基本・レイアウト', icon: '🎨' },
            'css-advanced': { name: 'CSS応用・モダン', icon: '✨' },
            'javascript-foundation': { name: 'JavaScript基礎', icon: '⚡' },
            'javascript-dom': { name: 'JavaScript応用', icon: '🎯' }
        };
        
        this.tabNavigation.innerHTML = '';
        
        Object.entries(problemsByCategory).forEach(([category, problems]) => {
            const tabButton = document.createElement('button');
            tabButton.className = 'tab-button';
            tabButton.dataset.category = category;
            
            const info = categoryInfo[category] || { name: category, icon: '📝' };
            tabButton.innerHTML = `
                ${info.icon} ${info.name}
                <span class="problem-count">(${problems.length}問)</span>
            `;
            
            this.tabNavigation.appendChild(tabButton);
        });
    }
    
    /**
     * カテゴリの問題リストを表示
     */
    showProblemsForCategory(category, problems) {
        this.problemList.innerHTML = '';
        
        problems.forEach(problem => {
            const problemItem = document.createElement('button');
            problemItem.className = 'problem-item';
            problemItem.dataset.problemId = problem.id;
            
            // 問題番号を取得（practice01 -> 01 形式）
            const problemNumber = problem.id.replace('practice', '').replace('_', '.');
            
            problemItem.innerHTML = `
                <div class="problem-info">
                    <span class="problem-number">#${problemNumber}</span>
                    <span class="problem-title">${problem.title}</span>
                </div>
                <div class="problem-difficulty">
                    ${'★'.repeat(problem.difficulty || 1)}
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
            // 現在選択中の問題のハイライトを削除
            this.problemList.querySelectorAll('.problem-item').forEach(item => {
                item.classList.remove('selected');
            });
            
            // 新しい問題をハイライト
            const selectedItem = this.problemList.querySelector(`[data-problem-id="${problemId}"]`);
            if (selectedItem) {
                selectedItem.classList.add('selected');
            }
            
            // ProblemLoaderから詳細な問題データを取得
            this.currentProblem = await getFrontendProblem(problemId);
            
            if (this.currentProblem) {
                this.displayProblemDetails(this.currentProblem);
                this.loadProblemTemplate(this.currentProblem);
                this.loadExpectedData(this.currentProblem);
                this.clearResults();
                
                console.log(`問題 ${problemId} を選択しました`);
            } else {
                throw new Error(`問題 ${problemId} が見つかりませんでした`);
            }
        } catch (error) {
            console.error(`問題 ${problemId} の選択に失敗:`, error);
            this.showError('問題の選択に失敗しました。');
        }
    }
    
    displayProblemDetails(problem) {
        const cleanTitle = problem.title?.replace(/^問題\d+：?\s*/, '') || '無題';
        
        this.problemDetails.innerHTML = `
            <div class="problem-title-display">
                <h3>${cleanTitle}</h3>
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
        // 期待される結果を複数ファイルで取得
        this.expectedFiles = {
            html: problem.files?.html?.expected || '<html><body><p>期待される結果</p></body></html>',
            css: problem.files?.css?.expected || '',
            js: problem.files?.js?.expected || ''
        };
        
        // 統合HTML生成してプレビュー表示
        const combinedExpectedHtml = this.generateExpectedCombinedHtml();
        this.displayPreview(this.expectedPreview, combinedExpectedHtml);
        
        // 正解コード表示を更新
        this.updateExpectedCodeDisplays();
        
        // デフォルトでプレビュー表示
        this.showExpectedPreviewView();
    }
    
    generateExpectedCombinedHtml() {
        const htmlContent = this.expectedFiles.html || '';
        const cssContent = this.expectedFiles.css || '';
        const jsContent = this.expectedFiles.js || '';
        
        // HTMLが空の場合はデフォルトテンプレート
        if (!htmlContent.trim()) {
            return this.getDefaultTemplate();
        }
        
        // CSS と JS を HTML に挿入
        let combinedHtml = htmlContent;
        
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
        
        let combinedHtml = htmlContent;
        
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
                case 'doctype':
                    const hasDoctype = originalHtml.toLowerCase().includes('<!doctype html>') || 
                                     originalHtml.toLowerCase().includes('<!doctype html ') ||
                                     /<!doctype\s+html\s*>/i.test(originalHtml);
                    return {
                        ...check,
                        passed: hasDoctype,
                        message: 'DOCTYPE html宣言が必要です'
                    };
                    
                case 'html':
                    return {
                        ...check,
                        passed: doc.querySelector('html') !== null,
                        message: '<html>タグが必要です'
                    };
                    
                case 'head':
                    return {
                        ...check,
                        passed: doc.querySelector('head') !== null,
                        message: '<head>セクションが必要です'
                    };
                    
                case 'body':
                    return {
                        ...check,
                        passed: doc.querySelector('body') !== null,
                        message: '<body>セクションが必要です'
                    };
                    
                case 'title':
                    const title = doc.querySelector('title');
                    return {
                        ...check,
                        passed: title !== null && title.textContent.trim() !== '',
                        message: '<title>タグと内容が必要です'
                    };
                    
                case 'h1':
                    const h1 = doc.querySelector('h1');
                    return {
                        ...check,
                        passed: h1 !== null && h1.textContent.trim() !== '',
                        message: '<h1>見出しと内容が必要です'
                    };
                    
                default:
                    return {
                        ...check,
                        passed: false,
                        message: 'チェック項目が不明です'
                    };
            }
        } catch (error) {
            return {
                ...check,
                passed: false,
                message: `チェック中にエラーが発生: ${error.message}`
            };
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
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    window.advancedFrontendLearning = new AdvancedFrontendLearning();
});