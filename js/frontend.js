/**
 * フロントエンド入門 - メインアプリケーション
 * HTML/CSSリアルタイムプレビューと採点システム
 */

class FrontendLearning {
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
        
        this.initializeElements();
        this.setupEventListeners();
        this.loadProblems();
    }
    
    initializeElements() {
        this.problemList = document.getElementById('problem-list');
        this.problemDetails = document.getElementById('problem-details');
        this.codeEditor = document.getElementById('code-editor');
        this.formatButton = document.getElementById('format-button');
        this.gradeButton = document.getElementById('grade-button');
        this.expectedPreview = document.getElementById('expected-preview');
        this.currentPreview = document.getElementById('current-preview');
        this.resultArea = document.getElementById('result-area');
        this.noResult = document.getElementById('no-result');
        this.loading = document.getElementById('loading');
        
        // 正解パネルの切り替え機能の要素
        this.previewTab = document.getElementById('preview-tab');
        this.codeTab = document.getElementById('code-tab');
        this.expectedPreviewView = document.getElementById('expected-preview-view');
        this.expectedCodeView = document.getElementById('expected-code-view');
        this.expectedCodeDisplay = document.getElementById('expected-code-display');
        this.previewInfoText = document.getElementById('preview-info-text');
        
        // あなたパネルの切り替え機能の要素
        this.currentPreviewTab = document.getElementById('current-preview-tab');
        this.currentResultTab = document.getElementById('current-result-tab');
        this.currentPreviewView = document.getElementById('current-preview-view');
        this.currentResultView = document.getElementById('current-result-view');
        
        // ファイルタブ関連の要素
        this.fileTabList = document.getElementById('file-tab-list');
        this.editorLabel = document.getElementById('editor-label');
        this.htmlTabName = document.getElementById('html-tab-name');
        this.cssTabName = document.getElementById('css-tab-name');
        this.jsTabName = document.getElementById('js-tab-name');
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
        
        // 問題リストのクリック
        this.problemList.addEventListener('click', (e) => {
            const problemItem = e.target.closest('.problem-item');
            if (problemItem) {
                this.selectProblem(problemItem.dataset.problemId);
            }
        });
        
        // 正解表示の切り替え
        this.previewTab.addEventListener('click', () => {
            this.showPreviewView();
        });
        
        this.codeTab.addEventListener('click', () => {
            this.showCodeView();
        });
        
        // あなたパネルの切り替え
        this.currentPreviewTab.addEventListener('click', () => {
            this.showCurrentPreviewView();
        });
        
        this.currentResultTab.addEventListener('click', () => {
            this.showCurrentResultView();
        });
        
        // ファイルタブの切り替え
        this.fileTabList.addEventListener('click', (e) => {
            const fileTab = e.target.closest('.file-tab');
            if (fileTab) {
                const fileType = fileTab.dataset.fileType;
                this.switchFileTab(fileType);
            }
        });
    }
    
    async loadProblems() {
        try {
            this.problemList.innerHTML = '<div style="padding: 20px; text-align: center;">問題を読み込み中...</div>';
            
            // ProblemLoaderを使用してフロントエンド問題を読み込み
            const problems = await getFrontendProblemList();
            
            if (!problems || problems.length === 0) {
                throw new Error('フロントエンド問題データが見つかりません');
            }
            
            this.displayProblems(problems);
            this.allProblems = problems;
            
            console.log(`${problems.length}問の読み込み完了`);
        } catch (error) {
            console.error('問題の読み込みに失敗しました:', error);
            this.problemList.innerHTML = '<div class="error-message">問題の読み込みに失敗しました。ページを再読み込みしてください。</div>';
        }
    }
    
    displayProblems(problems) {        
        this.problemList.innerHTML = '';
        
        problems.forEach(problem => {
            const problemItem = document.createElement('button');
            problemItem.className = 'problem-item';
            problemItem.dataset.problemId = problem.id;
            
            // 問題番号を取得（practice01 -> 01 形式）
            const problemNumber = problem.id.replace('practice', '');
            
            problemItem.innerHTML = `
                <span class="problem-number">#${problemNumber}</span>
                <span class="problem-title">${problem.title}</span>
            `;
            this.problemList.appendChild(problemItem);
        });
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
                this.loadExpectedPreview(this.currentProblem);
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
            <div class="problem-title">${cleanTitle}</div>
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
    
    async loadExpectedPreview(problem) {
        // 期待される結果をJSONデータから取得
        const expectedHtml = problem.files?.html?.expected || '<html><body><p>期待される結果</p></body></html>';
        this.displayPreview(this.expectedPreview, expectedHtml);
        
        // コード表示用にも保存
        this.currentExpectedHtml = expectedHtml;
        this.expectedCodeDisplay.textContent = expectedHtml.trim();
        
        // デフォルトでプレビュー表示
        this.showPreviewView();
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
    
    updateCurrentFileContent() {
        // 現在エディタにある内容を対応するファイルに保存
        this.fileContents[this.activeFileType] = this.codeEditor.value;
    }
    
    updateTabActiveState() {
        // すべてのタブからactiveクラスを削除
        this.fileTabList.querySelectorAll('.file-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // アクティブなタブにactiveクラスを追加
        const activeTab = this.fileTabList.querySelector(`[data-file-type="${this.activeFileType}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }
    
    updateEditorContent() {
        // アクティブなファイルの内容をエディタに表示
        this.codeEditor.value = this.fileContents[this.activeFileType] || '';
    }
    
    updateEditorLabel() {
        // エディタのラベルを更新
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
        }, 500); // 0.5秒の遅延
    }
    
    updateCurrentPreview() {
        // 現在編集中の内容を保存
        this.updateCurrentFileContent();
        
        // 複数ファイルを統合したHTMLを生成
        const combinedHtml = this.generateCombinedHtml();
        this.displayPreview(this.currentPreview, combinedHtml);
    }
    
    generateCombinedHtml() {
        const htmlContent = this.fileContents.html || '';
        const cssContent = this.fileContents.css || '';
        const jsContent = this.fileContents.js || '';
        
        // HTMLが空の場合はデフォルトテンプレート
        if (!htmlContent.trim()) {
            return this.getDefaultTemplate();
        }
        
        // CSS と JS を HTML に挿入
        let combinedHtml = htmlContent;
        
        // CSS を <style> タグとして挿入
        if (cssContent.trim()) {
            const styleTag = `\n<style>\n${cssContent}\n</style>`;
            
            // </head> の前に CSS を挿入
            if (combinedHtml.includes('</head>')) {
                combinedHtml = combinedHtml.replace('</head>', `${styleTag}\n</head>`);
            } else {
                // head タグがない場合は HTML の先頭に追加
                combinedHtml = `<head>${styleTag}\n</head>\n${combinedHtml}`;
            }
        }
        
        // JavaScript を <script> タグとして挿入
        if (jsContent.trim()) {
            const scriptTag = `\n<script>\n${jsContent}\n</script>`;
            
            // </body> の前に JavaScript を挿入
            if (combinedHtml.includes('</body>')) {
                combinedHtml = combinedHtml.replace('</body>', `${scriptTag}\n</body>`);
            } else {
                // body タグがない場合は HTML の末尾に追加
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
        const formatted = this.formatHtml(code);
        this.codeEditor.value = formatted;
        this.schedulePreviewUpdate();
    }
    
    formatHtml(html) {
        // シンプルなHTML整形
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
    
    async gradeCode() {
        if (!this.currentProblem) {
            this.showError('問題を選択してください。');
            return;
        }
        
        // 現在編集中の内容を保存
        this.updateCurrentFileContent();
        
        // すべてのファイルが空でないかチェック
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
        // 複数ファイルの解析と採点ロジック
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
            
            // 基本的なCSS構文チェック
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
            
            // 基本的なJavaScript構文チェック
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
            // 基本的なCSS構文チェック
            // セレクタと波括弧のペアがあるかチェック
            const hasSelector = /[a-zA-Z#.\-_\[\]:\s]+\s*\{[\s\S]*?\}/.test(cssContent);
            return hasSelector;
        } catch (error) {
            return false;
        }
    }
    
    validateJsBasics(jsContent) {
        try {
            // 基本的なJavaScript構文チェック
            // 簡単な構文解析（完全ではないが基本的なエラーを検出）
            const hasFunction = /function\s+\w+\s*\([\s\S]*?\)\s*\{/.test(jsContent) ||
                              /\w+\s*=\s*function\s*\([\s\S]*?\)\s*\{/.test(jsContent) ||
                              /\w+\s*=\s*\([\s\S]*?\)\s*=>\s*\{/.test(jsContent) ||
                              /const\s+\w+\s*=/.test(jsContent) ||
                              /let\s+\w+\s*=/.test(jsContent) ||
                              /var\s+\w+\s*=/.test(jsContent);
            
            // 基本的な制御構造
            const hasControl = /if\s*\([\s\S]*?\)\s*\{/.test(jsContent) ||
                             /for\s*\([\s\S]*?\)\s*\{/.test(jsContent) ||
                             /while\s*\([\s\S]*?\)\s*\{/.test(jsContent);
            
            return hasFunction || hasControl || jsContent.includes('console.log');
        } catch (error) {
            return false;
        }
    }
    
    getChecksForProblem(problemId) {
        // 現在の問題からチェック項目を取得
        if (this.currentProblem && this.currentProblem.checks) {
            return this.currentProblem.checks;
        }
        
        // フォールバック: 基本的なチェック項目
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
            const htmlString = doc.documentElement.outerHTML;
            
            switch (check.id) {
                case 'doctype':
                    // 元のHTML文字列で直接チェック
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
                    
                case 'img':
                    return {
                        ...check,
                        passed: doc.querySelector('img') !== null,
                        message: '<img>タグが必要です'
                    };
                    
                case 'img-alt':
                    const img = doc.querySelector('img');
                    return {
                        ...check,
                        passed: img !== null && img.hasAttribute('alt'),
                        message: '画像にalt属性が必要です'
                    };
                    
                case 'a':
                    const a = doc.querySelector('a');
                    return {
                        ...check,
                        passed: a !== null && a.textContent.trim() !== '',
                        message: '<a>リンクと内容が必要です'
                    };
                    
                case 'a-href':
                    const link = doc.querySelector('a');
                    return {
                        ...check,
                        passed: link !== null && link.hasAttribute('href'),
                        message: 'リンクにhref属性が必要です'
                    };
                    
                case 'ul':
                    return {
                        ...check,
                        passed: doc.querySelector('ul') !== null,
                        message: '<ul>順序なしリストが必要です'
                    };
                    
                case 'ol':
                    return {
                        ...check,
                        passed: doc.querySelector('ol') !== null,
                        message: '<ol>順序付きリストが必要です'
                    };
                    
                case 'li':
                    const li = doc.querySelectorAll('li');
                    return {
                        ...check,
                        passed: li.length >= 2,
                        message: '最低2つの<li>項目が必要です'
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
    
    // HTMLエスケープ用ヘルパー関数を追加
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    displayResults(result) {
        // パーセンテージ計算
        const percentage = Math.round((result.score / result.maxScore) * 100);
        
        const statusClass = result.status === 'PERFECT' ? 'status-accepted' : 
                          result.status === 'PARTIAL' ? 'status-partial' : 'status-wrong';
        
        const statusIcon = result.status === 'PERFECT' ? '🎉' : 
                          result.status === 'PARTIAL' ? '🟡' : '❌';
        
        const statusText = result.status === 'PERFECT' ? '完璧です！' : 
                          result.status === 'PARTIAL' ? '部分的に正解' : '要改善';
        
        // 各チェック項目の配点を動的に計算（10点ずつ均等配分）
        const checkCount = result.checks.length;
        const baseScore = 10; // 各項目10点固定
        
        // 青枠内に直接表示するレイアウト
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
            
            // チェック項目名をHTMLエスケープして表示
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
                    <div class="test-progress">
                        <div class="test-progress-bar">
                            <div class="test-progress-fill ${itemClass}" style="width: ${checkPercentage}%"></div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        resultHtml += `
                    </div>
                </div>
            </div>
        `;
        
        this.resultArea.innerHTML = resultHtml;
        this.resultArea.style.display = 'block';
        this.noResult.style.display = 'none';
        
        // 採点結果表示後、自動的に「採点結果」タブに切り替え
        this.showCurrentResultView();
        
        // プレビューにハイライト効果
        const previewContainer = this.currentPreview.closest('.preview-container');
        if (result.status === 'PERFECT') {
            previewContainer.classList.add('preview-success');
            setTimeout(() => previewContainer.classList.remove('preview-success'), 2000);
        } else if (result.status === 'FAILED') {
            previewContainer.classList.add('preview-error');
            setTimeout(() => previewContainer.classList.remove('preview-error'), 2000);
        }
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
    
    showPreviewView() {
        // ボタンの状態を切り替え
        this.previewTab.classList.add('active');
        this.codeTab.classList.remove('active');
        
        // 表示を切り替え
        this.expectedPreviewView.style.display = 'block';
        this.expectedCodeView.style.display = 'none';
        
        // 情報テキストを更新
        this.previewInfoText.textContent = '📌 この見た目を目指してコードを書いてください';
    }
    
    showCodeView() {
        // ボタンの状態を切り替え
        this.previewTab.classList.remove('active');
        this.codeTab.classList.add('active');
        
        // 表示を切り替え
        this.expectedPreviewView.style.display = 'none';
        this.expectedCodeView.style.display = 'block';
        
        // 情報テキストを更新
        this.previewInfoText.textContent = '📋 正解のHTMLコードを参考にしてください';
    }
    
    showCurrentPreviewView() {
        // ボタンの状態を切り替え
        this.currentPreviewTab.classList.add('active');
        this.currentResultTab.classList.remove('active');
        
        // 表示を切り替え
        this.currentPreviewView.style.display = 'block';
        this.currentResultView.style.display = 'none';
    }
    
    showCurrentResultView() {
        // ボタンの状態を切り替え
        this.currentPreviewTab.classList.remove('active');
        this.currentResultTab.classList.add('active');
        
        // 表示を切り替え
        this.currentPreviewView.style.display = 'none';
        this.currentResultView.style.display = 'block';
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    window.frontendLearning = new FrontendLearning();
});