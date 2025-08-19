/**
 * JavaScript自動採点システム - メインアプリケーション
 * GitHub Pages版
 */

class AutoGrader {
  constructor() {
    this.worker = null;
    this.currentProblem = null;
    this.isRunning = false;
    
    this.initializeElements();
    this.initializeWorker();
    this.setupEventListeners();
    this.loadProblems();
  }
  
  initializeElements() {
    this.problemSelect = document.getElementById('problem-select');
    this.problemDetails = document.getElementById('problem-details');
    this.codeEditor = document.getElementById('code-editor');
    this.runButton = document.getElementById('run-button');
    this.resultArea = document.getElementById('result-area');
    this.loading = document.getElementById('loading');
  }
  
  initializeWorker() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker('js/worker.js');
      this.worker.onmessage = (e) => this.handleWorkerMessage(e);
      this.worker.onerror = (e) => this.handleWorkerError(e);
    } else {
      this.showError('お使いのブラウザはWeb Workerをサポートしていません。');
    }
  }
  
  setupEventListeners() {
    this.problemSelect.addEventListener('change', () => this.onProblemChange());
    this.runButton.addEventListener('click', () => this.runCode());
    
    // コードエディタでCtrl+Enterで実行
    this.codeEditor.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        this.runCode();
      }
    });
  }
  
  async loadProblems() {
    try {
      // ローディング表示
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = '問題を読み込み中...';
      this.problemSelect.appendChild(defaultOption);
      
      const problems = await getProblemList();
      
      // ローディングオプションを削除
      this.problemSelect.innerHTML = '';
      
      // デフォルトオプション
      const newDefaultOption = document.createElement('option');
      newDefaultOption.value = '';
      newDefaultOption.textContent = '問題を選択してください';
      this.problemSelect.appendChild(newDefaultOption);
      
      // 問題をオプションとして追加
      problems.forEach(problem => {
        const option = document.createElement('option');
        option.value = problem.id;
        option.textContent = problem.title;
        this.problemSelect.appendChild(option);
      });
      
      console.log(`${problems.length}問の読み込み完了`);
    } catch (error) {
      console.error('問題の読み込みに失敗しました:', error);
      this.showError('問題の読み込みに失敗しました。ページを再読み込みしてください。');
    }
  }
  
  async onProblemChange() {
    const selectedId = this.problemSelect.value;
    
    if (!selectedId) {
      this.problemDetails.style.display = 'none';
      this.codeEditor.value = '';
      this.clearResult();
      return;
    }
    
    try {
      // ローディング表示
      this.problemDetails.innerHTML = '<div class="loading-message">問題の詳細を読み込み中...</div>';
      this.problemDetails.style.display = 'block';
      
      this.currentProblem = await getProblem(selectedId);
      
      if (this.currentProblem) {
        this.displayProblem(this.currentProblem);
        this.codeEditor.value = this.currentProblem.template.replace(/\\n/g, '\n');
        this.clearResult();
        console.log(`問題 ${selectedId} の詳細読み込み完了`);
      } else {
        throw new Error(`問題 ${selectedId} が見つかりませんでした`);
      }
    } catch (error) {
      console.error(`問題 ${selectedId} の読み込みに失敗:`, error);
      this.problemDetails.innerHTML = '<div class="error-message">問題の読み込みに失敗しました。他の問題を選択してください。</div>';
    }
  }
  
  displayProblem(problem) {
    this.problemDetails.innerHTML = `
      <div class="problem-title">${problem.title}</div>
      <div class="problem-description">${problem.description}</div>
      <div class="problem-instructions">
        <strong>実装のポイント：</strong>
        <ul>
          ${problem.instructions.map(instruction => 
            instruction ? `<li>${instruction}</li>` : '<li style="list-style:none; height:5px;"></li>'
          ).join('')}
        </ul>
      </div>
    `;
    this.problemDetails.style.display = 'block';
  }
  
  runCode() {
    if (this.isRunning) return;
    
    if (!this.currentProblem) {
      this.showError('問題を選択してください。');
      return;
    }
    
    const code = this.codeEditor.value.trim();
    if (!code) {
      this.showError('コードを入力してください。');
      return;
    }
    
    this.startExecution();
    
    // タイムアウト設定（5秒）
    const timeout = setTimeout(() => {
      this.terminateExecution();
      this.showError('実行時間制限を超過しました（5秒）。無限ループが発生していないか確認してください。');
    }, 5000);
    
    // Workerにコードと問題データを送信
    this.worker.postMessage({
      code: code,
      problem: this.currentProblem
    });
    
    // 正常終了時はタイムアウトをクリア
    this.worker.onmessage = (e) => {
      clearTimeout(timeout);
      this.handleWorkerMessage(e);
    };
  }
  
  startExecution() {
    this.isRunning = true;
    this.runButton.disabled = true;
    this.runButton.textContent = '実行中...';
    this.loading.classList.add('show');
    this.clearResult();
  }
  
  terminateExecution() {
    this.isRunning = false;
    this.runButton.disabled = false;
    this.runButton.textContent = '🚀 コードを実行して採点';
    this.loading.classList.remove('show');
    
    // Workerを再初期化
    if (this.worker) {
      this.worker.terminate();
      this.initializeWorker();
    }
  }
  
  handleWorkerMessage(e) {
    this.terminateExecution();
    
    const result = e.data;
    
    if (!result.success) {
      this.showError(result.message, result.logs);
      return;
    }
    
    this.displayResult(result);
  }
  
  handleWorkerError(e) {
    this.terminateExecution();
    this.showError(`Worker エラー: ${e.message}`);
  }
  
  displayResult(result) {
    // 複数テストケースの場合
    if (result.isMultipleTests) {
      this.displayMultipleTestResults(result);
      return;
    }
    
    // 従来の単一テストケース
    const statusClass = result.status === 'ACCEPTED' ? 'status-accepted' : 
                       result.status === 'WRONG_ANSWER' ? 'status-wrong' : 'status-error';
    
    const statusIcon = result.status === 'ACCEPTED' ? '✅' : 
                      result.status === 'WRONG_ANSWER' ? '❌' : '⚠️';
    
    const scoreClass = result.score === result.maxScore ? 'score-perfect' : 'score-zero';
    
    let resultHtml = `
      <div class="result-status ${statusClass}">
        ${statusIcon} ${result.status}
      </div>
      <div class="score-display ${scoreClass}">
        得点: ${result.score}/${result.maxScore}点
      </div>
      <div><strong>結果:</strong> ${result.message}</div>
    `;
    
    // console.logの出力を表示
    if (result.logs && result.logs.length > 0) {
      resultHtml += `
        <div style="margin-top: 20px;">
          <strong>プログラムの出力:</strong>
          <div class="result-area" style="margin-top: 10px; background: #2d3748; color: #e2e8f0;">
${result.logs.join('\\n')}
          </div>
        </div>
      `;
    }
    
    // 不正解の場合は期待値と実際の値を比較表示
    if (result.status === 'WRONG_ANSWER' && result.comparison) {
      resultHtml += `
        <div class="output-comparison">
          <div class="output-box expected-output">
            <h4>期待される出力</h4>
            <div class="output-content">${this.escapeHtml(result.expectedOutput)}</div>
          </div>
          <div class="output-box actual-output">
            <h4>実際の出力</h4>
            <div class="output-content">${this.escapeHtml(result.actualOutput)}</div>
          </div>
        </div>
      `;
      
      if (result.comparison.expectedLine && result.comparison.actualLine) {
        resultHtml += `
          <div style="margin-top: 15px; padding: 10px; background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 4px;">
            <strong>詳細な差異:</strong><br>
            期待値: <code>${this.escapeHtml(result.comparison.expectedLine)}</code><br>
            実際の値: <code>${this.escapeHtml(result.comparison.actualLine)}</code>
          </div>
        `;
      }
    }
    
    // 可視化ボタンを追加
    resultHtml += this.getVisualizeButtonHTML();
    
    this.resultArea.innerHTML = resultHtml;
    this.resultArea.style.display = 'block';
    
    // 結果エリアにスクロール
    this.resultArea.scrollIntoView({ behavior: 'smooth' });
  }
  
  displayMultipleTestResults(result) {
    const overallStatusClass = result.status === 'ALL_ACCEPTED' ? 'status-accepted' : 
                              result.status === 'PARTIAL_ACCEPTED' ? 'status-partial' : 'status-error';
    
    const overallStatusIcon = result.status === 'ALL_ACCEPTED' ? '✅' : 
                             result.status === 'PARTIAL_ACCEPTED' ? '🟡' : '❌';
    
    const scoreClass = result.score === result.maxScore ? 'score-perfect' : 
                      result.score > 0 ? 'score-partial' : 'score-zero';
    
    let resultHtml = `
      <div class="result-status ${overallStatusClass}">
        ${overallStatusIcon} ${result.status === 'ALL_ACCEPTED' ? 'ALL ACCEPTED' : result.status}
      </div>
      <div class="score-display ${scoreClass}">
        総合得点: ${result.score}/${result.maxScore}点
      </div>
      <div class="test-summary">
        <strong>結果:</strong> ${result.message}
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${(result.passedCount / result.totalCount) * 100}%"></div>
      </div>
      <div class="progress-text">${result.passedCount}/${result.totalCount} テストケース成功</div>
    `;
    
    // 各テストケースの結果を表示
    resultHtml += `<div class="test-cases-container">`;
    
    result.testResults.forEach((testResult, index) => {
      const testStatusClass = testResult.status === 'ACCEPTED' ? 'test-accepted' : 
                             testResult.status === 'WRONG_ANSWER' ? 'test-wrong' : 'test-error';
      
      const testStatusIcon = testResult.status === 'ACCEPTED' ? '✅' : 
                            testResult.status === 'WRONG_ANSWER' ? '❌' : '⚠️';
      
      resultHtml += `
        <div class="test-case ${testStatusClass}">
          <div class="test-case-header" onclick="this.parentElement.classList.toggle('expanded')">
            <div class="test-case-title">
              ${testStatusIcon} ${testResult.testCaseName}
            </div>
            <div class="test-case-score">${testResult.score}/100点</div>
          </div>
          <div class="test-case-details">
            <div class="test-case-message">
              <strong>結果:</strong> ${testResult.message}
            </div>
      `;
      
      // 実行ログを表示
      if (testResult.logs && testResult.logs.length > 0) {
        resultHtml += `
          <div class="test-case-output">
            <strong>プログラムの出力:</strong>
            <div class="output-content">${this.escapeHtml(testResult.logs.join('\\n'))}</div>
          </div>
        `;
      }
      
      // 不正解の場合は比較表示
      if (testResult.status === 'WRONG_ANSWER' && testResult.comparison) {
        resultHtml += `
          <div class="test-case-comparison">
            <div class="comparison-expected">
              <h5>期待される出力:</h5>
              <div class="output-content">${this.escapeHtml(testResult.expectedOutput)}</div>
            </div>
            <div class="comparison-actual">
              <h5>実際の出力:</h5>
              <div class="output-content">${this.escapeHtml(testResult.actualOutput)}</div>
            </div>
          </div>
        `;
        
        if (testResult.comparison.expectedLine && testResult.comparison.actualLine) {
          resultHtml += `
            <div class="test-case-diff">
              <strong>詳細な差異:</strong><br>
              期待値: <code>${this.escapeHtml(testResult.comparison.expectedLine)}</code><br>
              実際の値: <code>${this.escapeHtml(testResult.comparison.actualLine)}</code>
            </div>
          `;
        }
      }
      
      resultHtml += `
          </div>
        </div>
      `;
    });
    
    resultHtml += `</div>`;
    
    // 可視化ボタンを追加
    resultHtml += this.getVisualizeButtonHTML();
    
    this.resultArea.innerHTML = resultHtml;
    this.resultArea.style.display = 'block';
    
    // 結果エリアにスクロール
    this.resultArea.scrollIntoView({ behavior: 'smooth' });
  }
  
  showError(message, logs = null) {
    let errorHtml = `
      <div class="result-status status-error">⚠️ エラー</div>
      <div><strong>エラー内容:</strong> ${this.escapeHtml(message)}</div>
    `;
    
    if (logs && logs.length > 0) {
      errorHtml += `
        <div style="margin-top: 20px;">
          <strong>実行ログ:</strong>
          <div class="result-area" style="margin-top: 10px; background: #2d3748; color: #e2e8f0;">
${logs.join('\\n')}
          </div>
        </div>
      `;
    }
    
    this.resultArea.innerHTML = errorHtml;
    this.resultArea.style.display = 'block';
  }
  
  clearResult() {
    this.resultArea.style.display = 'none';
    this.resultArea.innerHTML = '';
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  getVisualizeButtonHTML() {
    return `
      <div class="visualize-section" style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 10px; border: 2px solid #e9ecef;">
        <h3 style="margin: 0 0 15px 0; color: #2d3748; display: flex; align-items: center;">
          <span style="margin-right: 10px;">🔍</span>
          コードの動作を詳しく確認
        </h3>
        <p style="margin: 0 0 15px 0; color: #718096; line-height: 1.6;">
          このコードがどのように実行されるかを、ステップごとに可視化して確認できます。
          変数の変化や処理の流れを直感的に理解しましょう。
        </p>
        <button 
          class="visualize-button" 
          onclick="autoGrader.onVisualizeButtonClick()"
          style="
            background: linear-gradient(145deg, #ed8936, #dd6b20);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1em;
          "
          onmouseover="this.style.background='linear-gradient(145deg, #dd6b20, #c05621)'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 5px 15px rgba(237, 137, 54, 0.4)'"
          onmouseout="this.style.background='linear-gradient(145deg, #ed8936, #dd6b20)'; this.style.transform='translateY(0)'; this.style.boxShadow='none'"
        >
          <span>🔍</span>
          <span>コードを可視化ツールで確認</span>
        </button>
      </div>
    `;
  }
  
  onVisualizeButtonClick() {
    const currentCode = this.codeEditor.value.trim();
    
    if (!currentCode) {
      if (window.showNotification) {
        window.showNotification('可視化するコードがありません。', 'warning');
      } else {
        alert('可視化するコードがありません。');
      }
      return;
    }
    
    // navigation.jsの関数を使用してコードを共有
    if (window.shareCodeToVisualizer) {
      window.shareCodeToVisualizer(currentCode);
      
      if (window.showNotification) {
        window.showNotification('コードを可視化ツールに送信しました！', 'success');
      }
    } else {
      console.error('ナビゲーション機能が読み込まれていません。');
      alert('可視化機能の初期化に失敗しました。ページを再読み込みしてください。');
    }
  }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
  window.autoGrader = new AutoGrader();
});