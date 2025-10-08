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
    this.tabNavigation = document.querySelector('.tab-navigation');
    this.problemList = document.getElementById('problem-list');
    this.problemDetails = document.getElementById('problem-details');
    this.codeEditor = document.getElementById('code-editor');
    this.runButton = document.getElementById('run-button');
    this.resultArea = document.getElementById('result-area');
    this.loading = document.getElementById('loading');
    
    // タブ切り替え用の状態管理
    this.currentCategory = null;
    this.selectedProblemId = null;
  }
  
  initializeWorker() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker('/assets/js/worker.js');
      this.worker.onmessage = (e) => this.handleWorkerMessage(e);
      this.worker.onerror = (e) => this.handleWorkerError(e);
    } else {
      this.showError('お使いのブラウザはWeb Workerをサポートしていません。');
    }
  }
  
  setupEventListeners() {
    this.runButton.addEventListener('click', () => this.runCode());
    
    // コードエディタでCtrl+Enterで実行
    this.codeEditor.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        this.runCode();
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
      this.tabNavigation.innerHTML = '<div style="padding: 20px; text-align: center;">問題を読み込み中...</div>';
      this.problemList.innerHTML = '';
      
      // 問題インデックスを読み込み（カテゴリ情報付き）
      const problemIndex = await problemLoader.loadProblemIndex();
      
      // カテゴリごとに問題をグループ化
      const problemsByCategory = {};
      problemIndex.forEach(problem => {
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
      
      console.log(`${problemIndex.length}問の読み込み完了（${Object.keys(problemsByCategory).length}カテゴリ）`);
    } catch (error) {
      console.error('問題の読み込みに失敗しました:', error);
      this.showError('問題の読み込みに失敗しました。ページを再読み込みしてください。');
    }
  }
  
  /**
   * タブナビゲーションを生成
   */
  createTabs(problemsByCategory) {
    const categoryIcons = {
      '総合': '🌟',
      'オブジェクト': '📦',
      '関数': '⚡',
      '配列': '📋',
      '条件分岐': '🔀',
      'ループ': '🔄',
      '基本': '🎯'
    };
    
    this.tabNavigation.innerHTML = '';
    
    Object.entries(problemsByCategory).forEach(([category, problems]) => {
      const tabButton = document.createElement('button');
      tabButton.className = 'tab-button';
      tabButton.dataset.category = category;
      
      const icon = categoryIcons[category] || '📝';
      tabButton.innerHTML = `
        ${icon} ${category}
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
      problemItem.innerHTML = `
        <span class="problem-number">${problem.id.replace('practice', '#')}</span>
        <span class="problem-title">${problem.title.replace(/^(練習問題|問題)\d+[:：]\s*/, '')}</span>
      `;
      
      this.problemList.appendChild(problemItem);
    });
  }
  
  /**
   * タブを切り替え
   */
  switchTab(category) {
    // 現在のタブのアクティブ状態を削除
    this.tabNavigation.querySelectorAll('.tab-button').forEach(tab => {
      tab.classList.remove('active');
    });
    
    // 新しいタブをアクティブにする
    const newActiveTab = this.tabNavigation.querySelector(`[data-category="${category}"]`);
    if (newActiveTab) {
      newActiveTab.classList.add('active');
    }
    
    // 問題リストを更新
    this.currentCategory = category;
    const problems = this.problemsByCategory[category];
    if (problems) {
      this.showProblemsForCategory(category, problems);
    }
    
    // 問題詳細とコードエディタをクリア
    this.clearProblemSelection();
    
    console.log(`タブ切り替え: ${category} (${problems?.length || 0}問)`);
  }
  
  /**
   * 問題を選択
   */
  async selectProblem(problemId) {
    try {
      // スクロール位置を保存
      const scrollTop = this.problemList.scrollTop;
      
      // 現在選択中の問題のハイライトを削除
      this.problemList.querySelectorAll('.problem-item').forEach(item => {
        item.classList.remove('selected');
      });
      
      // 新しい問題をハイライト
      const selectedItem = this.problemList.querySelector(`[data-problem-id="${problemId}"]`);
      if (selectedItem) {
        selectedItem.classList.add('selected');
      }
      
      // ローディング表示
      this.problemDetails.innerHTML = '<div class="loading-message">問題の詳細を読み込み中...</div>';
      this.problemDetails.style.display = 'block';
      
      // 問題データを読み込み
      this.currentProblem = await getProblem(problemId);
      this.selectedProblemId = problemId;
      
      if (this.currentProblem) {
        this.displayProblem(this.currentProblem);
        this.codeEditor.value = this.currentProblem.template.replace(/\\n/g, '\n');
        this.clearResult();
        console.log(`問題 ${problemId} の詳細読み込み完了`);
        
        // スクロール位置を復元（少し遅延を入れてDOMの更新を待つ）
        setTimeout(() => {
          this.problemList.scrollTop = scrollTop;
          // スクロールイベントを強制的に有効にする
          this.problemList.style.overflowY = 'auto';
          this.problemList.style.pointerEvents = 'auto';
        }, 10);
      } else {
        throw new Error(`問題 ${problemId} が見つかりませんでした`);
      }
    } catch (error) {
      console.error(`問題 ${problemId} の読み込みに失敗:`, error);
      this.problemDetails.innerHTML = '<div class="error-message">問題の読み込みに失敗しました。他の問題を選択してください。</div>';
    }
  }
  
  /**
   * 問題選択状態をクリア
   */
  clearProblemSelection() {
    this.problemDetails.style.display = 'none';
    this.codeEditor.value = '';
    this.clearResult();
    this.selectedProblemId = null;
    this.currentProblem = null;
    
    // 問題リストの選択状態をクリア
    this.problemList.querySelectorAll('.problem-item').forEach(item => {
      item.classList.remove('selected');
    });
    
    // スクロール機能を確実に有効にする
    this.problemList.style.overflowY = 'auto';
    this.problemList.style.pointerEvents = 'auto';
  }
  
  displayProblem(problem) {
    // タイトルから「問題X: 」部分を除去
    const cleanTitle = problem.title.replace(/^問題\d+：?\s*/, '');
    
    // description に instructions を追記
    const descriptionHtml = [
      problem.description || '',
      ...((problem.instructions || []).map(i => i ? `・${i}` : '')).filter(Boolean)
    ].join('<br>');

    this.problemDetails.innerHTML = `
      <div class="problem-title">${cleanTitle}</div>
      <div class="problem-description">${descriptionHtml}</div>
      <div class="problem-instructions">
        <div class="instructions-header">💡 実装のポイント</div>
        <ul>
          ${(problem.implementationPoints || []).map(point => 
            point ? `<li>${point}</li>` : '<li style="list-style:none; height:5px;"></li>'
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
${result.logs.join('\n')}
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
      // コード品質チェック項目の判定
      const isQualityCheck = testResult.isQualityCheck === true;
      
      // ステータスクラスとアイコンの設定（品質チェック用の拡張）
      let testStatusClass, testStatusIcon;
      
      if (isQualityCheck) {
        // コード品質チェックの場合 - スコアベースで3段階評価（統一クラス使用）
        const score = testResult.score || 0;
        if (score === 100) {
          testStatusClass = 'test-accepted';
          testStatusIcon = '✅';
        } else if (score >= 50) {
          testStatusClass = 'test-error';
          testStatusIcon = '⚠️';
        } else {
          testStatusClass = 'test-wrong';
          testStatusIcon = '❌';
        }
      } else {
        // 通常のテストケースの場合
        testStatusClass = testResult.status === 'ACCEPTED' ? 'test-accepted' : 
                         testResult.status === 'WRONG_ANSWER' ? 'test-wrong' : 'test-error';
        testStatusIcon = testResult.status === 'ACCEPTED' ? '✅' : 
                        testResult.status === 'WRONG_ANSWER' ? '❌' : '⚠️';
      }
      
      resultHtml += `
        <div class="test-case ${testStatusClass}">
          <div class="test-case-header" onclick="this.parentElement.classList.toggle('expanded')">
            <div class="test-case-title">
              ${testStatusIcon} ${testResult.testCaseName}
              ${isQualityCheck ? '<span class="quality-badge">品質チェック</span>' : ''}
            </div>
            <div class="test-case-score">${testResult.score}/100点</div>
          </div>
          <div class="test-case-details">
            <div class="test-case-message">
              <strong>結果:</strong> ${testResult.message}
            </div>
      `;
      
      // 統合コード品質チェックの詳細表示（ESLint + リーダブルコード）
      if (isQualityCheck && testResult.qualityCheck) {
        const qc = testResult.qualityCheck;
        
        // スコア内訳を表示
        if (qc.breakdown) {
          resultHtml += `
            <div class="quality-breakdown">
              <h5>📊 品質チェック詳細:</h5>
              <div class="score-breakdown">
                <div class="score-item">
                  <span class="score-label">ESLint:</span>
                  <span class="score-value">${qc.breakdown.eslint}/50点</span>
                </div>
                <div class="score-item">
                  <span class="score-label">リーダブルコード:</span>
                  <span class="score-value">${qc.breakdown.readable}/50点</span>
                </div>
              </div>
            </div>
          `;
        }
        
        if (qc.issues && qc.issues.length > 0) {
          // ESLintとリーダブルコードの問題を分類
          const eslintIssues = qc.issues.filter(issue => issue.type === 'eslint');
          const readableIssues = qc.issues.filter(issue => issue.type === 'readable');
          
          resultHtml += `<div class="quality-issues">`;
          
          // ESLintの問題を表示
          if (eslintIssues.length > 0) {
            resultHtml += `
              <div class="eslint-section">
                <h6>🔧 ESLint チェック結果:</h6>
                <div class="issues-list">
            `;
            
            eslintIssues.forEach(issue => {
              const issueIcon = issue.severity === 2 ? '🚨' : '💡';
              const issueClass = issue.severity === 2 ? 'quality-error' : 'quality-warning';
              
              resultHtml += `
                <div class="quality-issue ${issueClass}">
                  <div class="issue-header">
                    ${issueIcon} 行${issue.line}:${issue.column} - ${issue.ruleId || '不明なルール'}
                  </div>
                  <div class="issue-message">
                    ${this.escapeHtml(issue.message)}
                  </div>
              `;
              
              if (issue.japaneseMessage) {
                resultHtml += `
                  <div class="issue-explanation">
                    <strong>説明:</strong> ${this.escapeHtml(issue.japaneseMessage.message)}
                    <br><strong>改善提案:</strong> ${this.escapeHtml(issue.japaneseMessage.suggestion)}
                  </div>
                `;
              }
              
              resultHtml += `</div>`;
            });
            
            resultHtml += `</div></div>`;
          }
          
          // リーダブルコードの問題を表示
          if (readableIssues.length > 0) {
            resultHtml += `
              <div class="readable-section">
                <h6>📚 リーダブルコード チェック結果:</h6>
                <div class="issues-list">
            `;
            
            readableIssues.forEach(issue => {
              const issueIcon = this.getReadableIssueIcon(issue.ruleId);
              const issueClass = 'readable-suggestion';
              
              resultHtml += `
                <div class="quality-issue ${issueClass}">
                  <div class="issue-header">
                    ${issueIcon} 行${issue.line} - 変数「${issue.variable || '不明'}」
                  </div>
                  <div class="issue-message">
                    ${this.escapeHtml(issue.message)}
                  </div>
              `;
              
              if (issue.japaneseMessage) {
                resultHtml += `
                  <div class="issue-explanation readable-explanation">
                    <strong>💡 改善提案:</strong> ${this.escapeHtml(issue.japaneseMessage.suggestion)}
                  </div>
                `;
              }
              
              resultHtml += `</div>`;
            });
            
            resultHtml += `</div></div>`;
          }
          
          resultHtml += `</div>`;
        } else if (qc.score === 100) {
          resultHtml += `
            <div class="quality-perfect">
              <div class="quality-celebration">
                🎉 <strong>素晴らしい！</strong> コードが全ての品質基準を満たしています！
              </div>
              <div class="quality-achievement">
                <ul>
                  <li>✨ ESLint規約に準拠（${qc.breakdown ? qc.breakdown.eslint : 50}/50点）</li>
                  <li>✨ リーダブルコード原則を実践（${qc.breakdown ? qc.breakdown.readable : 50}/50点）</li>
                  <li>✨ 変数名が明確で理解しやすい</li>
                  <li>✨ 潜在的なバグなし</li>
                </ul>
              </div>
            </div>
          `;
        }
      } else {
        // 通常のテストケースの場合：実行ログを表示
        if (testResult.logs && testResult.logs.length > 0) {
          resultHtml += `
            <div class="test-case-output">
              <strong>プログラムの出力:</strong>
              <div class="output-content">${this.escapeHtml(testResult.logs.join('\n'))}</div>
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
${logs.join('\n')}
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
  
  /**
   * リーダブルコード問題種別に応じたアイコンを取得
   */
  getReadableIssueIcon(ruleId) {
    if (!ruleId) return '📝';
    
    if (ruleId.includes('generic-name')) return '🔍';
    if (ruleId.includes('short-name')) return '📏';
    if (ruleId.includes('boolean-naming')) return '✅';
    if (ruleId.includes('array-naming')) return '📋';
    if (ruleId.includes('numeric-unit')) return '📊';
    
    return '💡';
  }
  
  /**
   * HTMLエスケープ処理
   */
  escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') return String(unsafe);
    
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
  window.autoGrader = new AutoGrader();
});