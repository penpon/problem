/**
 * フロントエンド入門 - メインアプリケーション
 * HTML/CSSリアルタイムプレビューと採点システム
 */

class FrontendLearning {
    constructor() {
        this.currentProblem = null;
        this.isUpdating = false;
        this.previewUpdateTimeout = null;
        
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
        
        // 切り替え機能の要素
        this.previewTab = document.getElementById('preview-tab');
        this.codeTab = document.getElementById('code-tab');
        this.expectedPreviewView = document.getElementById('expected-preview-view');
        this.expectedCodeView = document.getElementById('expected-code-view');
        this.expectedCodeDisplay = document.getElementById('expected-code-display');
        this.previewInfoText = document.getElementById('preview-info-text');
    }
    
    setupEventListeners() {
        // コードエディタのリアルタイム更新
        this.codeEditor.addEventListener('input', () => {
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
    }
    
    async loadProblems() {
        try {
            this.problemList.innerHTML = '<div style="padding: 20px; text-align: center;">問題を読み込み中...</div>';
            
            // 問題データを直接定義（file://プロトコル対応）
            const problems = [
                {
                    id: 'practice01',
                    title: '01: 基本的なHTML',
                    description: 'HTMLの基本構造を学習し、最初のWebページを作成しましょう。',
                    instructions: [
                        'DOCTYPE宣言を追加してください',
                        'html、head、bodyタグを使用してください',
                        'titleタグでページタイトルを設定してください',
                        'bodyの中に「Hello, World!」を表示するpタグを追加してください'
                    ],
                    template: `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <!-- ここにコンテンツを追加してください -->
</body>
</html>`
                },
                {
                    id: 'practice02',
                    title: '02: 見出しの追加',
                    description: '見出しタグ（h1）を使用して、ページに構造を持たせましょう。',
                    instructions: [
                        'h1タグを使用してメインタイトルを追加してください',
                        '見出しは「メインタイトル」にしてください',
                        '既存のpタグは残しておいてください'
                    ],
                    template: `<!DOCTYPE html>
<html>
<head>
    <title>見出しのページ</title>
</head>
<body>
    <!-- メインタイトル（h1）を追加してください -->
    <p>Hello, World!</p>
</body>
</html>`
                },
                {
                    id: 'practice03',
                    title: '03: 画像の表示',
                    description: 'imgタグを使用して画像を表示する方法を学習しましょう。',
                    instructions: [
                        'h1タグで「画像表示」の見出しを追加してください',
                        'imgタグを使用して画像を表示してください',
                        'src属性に「../shared/images/simple-product.svg」を設定してください',
                        'alt属性に「商品画像」を設定してください',
                        'pタグで説明文を追加してください'
                    ],
                    template: `<!DOCTYPE html>
<html>
<head>
    <title>画像のページ</title>
</head>
<body>
    <h1>画像表示</h1>
    <!-- 画像（img）を追加してください -->
    <!-- src="../shared/images/simple-product.svg" を使用 -->
    <p>商品の説明テキスト</p>
</body>
</html>`
                },
                {
                    id: 'practice04',
                    title: '04: リンクの作成',
                    description: 'aタグを使用してリンクを作成する方法を学習しましょう。',
                    instructions: [
                        'h1タグで「リンクの練習」の見出しを追加してください',
                        'aタグを使用してリンクを作成してください',
                        'href属性に「https://www.example.com」を設定してください',
                        'リンクテキストは「外部リンク」にしてください',
                        'pタグでリンクを囲んでください'
                    ],
                    template: `<!DOCTYPE html>
<html>
<head>
    <title>リンクのページ</title>
</head>
<body>
    <h1>リンクの練習</h1>
    <!-- リンク（a）を追加してください -->
    <p>リンクを作成しました。</p>
</body>
</html>`
                },
                {
                    id: 'practice05',
                    title: '05: リストの作成',
                    description: 'ulとolタグを使用してリストを作成する方法を学習しましょう。',
                    instructions: [
                        'h1タグで「リスト表示」のメインタイトルを追加してください',
                        'h2タグで「順序なしリスト」のサブタイトルを追加してください',
                        'ulタグとliタグで順序なしリストを作成してください（3つの項目）',
                        'h2タグで「順序付きリスト」のサブタイトルを追加してください',
                        'olタグとliタグで順序付きリストを作成してください（3つの項目）'
                    ],
                    template: `<!DOCTYPE html>
<html>
<head>
    <title>リストのページ</title>
</head>
<body>
    <h1>リスト表示</h1>
    <h2>順序なしリスト</h2>
    <!-- 順序なしリスト（ul/li）を追加してください -->
    
    <h2>順序付きリスト</h2>
    <!-- 順序付きリスト（ol/li）を追加してください -->
</body>
</html>`
                }
            ];
            
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
            problemItem.innerHTML = `
                <span class="problem-number">#${problem.id.replace('practice', '')}</span>
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
            
            // 問題データを取得
            this.currentProblem = this.allProblems.find(p => p.id === problemId);
            
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
        // HTMLテンプレートを設定
        const template = problem.template || this.getDefaultTemplate();
        this.codeEditor.value = template.replace(/\\n/g, '\n');
        this.schedulePreviewUpdate();
    }
    
    async loadExpectedPreview(problem) {
        // 期待される結果を生成して表示
        const expectedHtml = this.createExpectedHtml(problem);
        this.displayPreview(this.expectedPreview, expectedHtml);
        
        // コード表示用にも保存
        this.currentExpectedHtml = expectedHtml;
        this.expectedCodeDisplay.textContent = expectedHtml.trim();
        
        // デフォルトでプレビュー表示
        this.showPreviewView();
    }
    
    createExpectedHtml(problem) {
        const problemId = problem.id;
        
        switch (problemId) {
            case 'practice01':
                return `
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <p>Hello, World!</p>
</body>
</html>`;
                
            case 'practice02':
                return `
<!DOCTYPE html>
<html>
<head>
    <title>見出しのページ</title>
</head>
<body>
    <h1>メインタイトル</h1>
    <p>Hello, World!</p>
</body>
</html>`;
                
            case 'practice03':
                return `
<!DOCTYPE html>
<html>
<head>
    <title>画像のページ</title>
</head>
<body>
    <h1>画像表示</h1>
    <img src="../shared/images/simple-product.svg" alt="商品画像">
    <p>商品の説明テキスト</p>
</body>
</html>`;
                
            case 'practice04':
                return `
<!DOCTYPE html>
<html>
<head>
    <title>リンクのページ</title>
</head>
<body>
    <h1>リンクの練習</h1>
    <p><a href="https://www.example.com">外部リンク</a></p>
    <p>リンクを作成しました。</p>
</body>
</html>`;
                
            case 'practice05':
                return `
<!DOCTYPE html>
<html>
<head>
    <title>リストのページ</title>
</head>
<body>
    <h1>リスト表示</h1>
    <h2>順序なしリスト</h2>
    <ul>
        <li>項目1</li>
        <li>項目2</li>
        <li>項目3</li>
    </ul>
    <h2>順序付きリスト</h2>
    <ol>
        <li>最初</li>
        <li>次に</li>
        <li>最後に</li>
    </ol>
</body>
</html>`;
                
            default:
                return '<html><body><p>期待される結果</p></body></html>';
        }
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
    
    schedulePreviewUpdate() {
        if (this.previewUpdateTimeout) {
            clearTimeout(this.previewUpdateTimeout);
        }
        
        this.previewUpdateTimeout = setTimeout(() => {
            this.updateCurrentPreview();
        }, 500); // 0.5秒の遅延
    }
    
    updateCurrentPreview() {
        const code = this.codeEditor.value;
        this.displayPreview(this.currentPreview, code);
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
        
        const code = this.codeEditor.value.trim();
        if (!code) {
            this.showError('コードを入力してください。');
            return;
        }
        
        this.startGrading();
        
        try {
            const result = await this.analyzeHtml(code);
            this.displayResults(result);
        } catch (error) {
            console.error('採点中にエラーが発生:', error);
            this.showError('採点中にエラーが発生しました。');
        } finally {
            this.stopGrading();
        }
    }
    
    async analyzeHtml(htmlCode) {
        // HTML解析と採点ロジック
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlCode, 'text/html');
        
        const checks = this.getChecksForProblem(this.currentProblem.id);
        const results = [];
        let totalScore = 0;
        let maxScore = checks.length * 10;
        
        for (const check of checks) {
            const result = await this.runCheck(doc, check, htmlCode);
            results.push(result);
            if (result.passed) {
                totalScore += 10;
            }
        }
        
        return {
            score: totalScore,
            maxScore: maxScore,
            checks: results,
            status: totalScore === maxScore ? 'PERFECT' : totalScore > 0 ? 'PARTIAL' : 'FAILED'
        };
    }
    
    getChecksForProblem(problemId) {
        const commonChecks = [
            { id: 'doctype', name: 'DOCTYPE宣言', type: 'structure' },
            { id: 'html', name: '<html>タグ', type: 'structure' },
            { id: 'head', name: '<head>セクション', type: 'structure' },
            { id: 'body', name: '<body>セクション', type: 'structure' },
            { id: 'title', name: '<title>タグ', type: 'structure' }
        ];
        
        const specificChecks = {
            'practice01': [],
            'practice02': [
                { id: 'h1', name: 'メインタイトル(h1)', type: 'content' }
            ],
            'practice03': [
                { id: 'h1', name: '見出し(h1)', type: 'content' },
                { id: 'img', name: '画像(img)', type: 'content' },
                { id: 'img-alt', name: '画像のalt属性', type: 'attribute' }
            ],
            'practice04': [
                { id: 'h1', name: '見出し(h1)', type: 'content' },
                { id: 'a', name: 'リンク(a)', type: 'content' },
                { id: 'a-href', name: 'リンクのhref属性', type: 'attribute' }
            ],
            'practice05': [
                { id: 'h1', name: 'メインタイトル(h1)', type: 'content' },
                { id: 'ul', name: '順序なしリスト(ul)', type: 'content' },
                { id: 'ol', name: '順序付きリスト(ol)', type: 'content' },
                { id: 'li', name: 'リスト項目(li)', type: 'content' }
            ]
        };
        
        return [...commonChecks, ...(specificChecks[problemId] || [])];
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
    
    displayResults(result) {
        const statusClass = result.status === 'PERFECT' ? 'status-accepted' : 
                          result.status === 'PARTIAL' ? 'status-partial' : 'status-wrong';
        
        const statusIcon = result.status === 'PERFECT' ? '🎉' : 
                          result.status === 'PARTIAL' ? '🟡' : '❌';
        
        const statusText = result.status === 'PERFECT' ? '完璧です！' : 
                          result.status === 'PARTIAL' ? '部分的に正解' : '要改善';
        
        let resultHtml = `
            <div class="frontend-result">
                <div class="result-status ${statusClass}">
                    ${statusIcon} ${statusText}
                </div>
                <div class="score-display">
                    得点: ${result.score}/${result.maxScore}点
                </div>
                <div class="check-results">
                    <h4>チェック結果:</h4>
                    <ul class="check-list">
        `;
        
        result.checks.forEach(check => {
            const iconClass = check.passed ? 'check-passed' : 'check-failed';
            const icon = check.passed ? '✅' : '❌';
            
            resultHtml += `
                <li class="check-item">
                    <span class="check-icon ${iconClass}">${icon}</span>
                    <span class="check-description">
                        ${check.name}: ${check.message}
                    </span>
                </li>
            `;
        });
        
        resultHtml += `
                    </ul>
                </div>
            </div>
        `;
        
        this.resultArea.innerHTML = resultHtml;
        this.resultArea.style.display = 'block';
        this.noResult.style.display = 'none';
        
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
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    window.frontendLearning = new FrontendLearning();
});