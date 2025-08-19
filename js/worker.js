/**
 * Web Worker for safe JavaScript code execution
 * JavaScript自動採点システム - セキュアな実行環境
 * 6項目600点満点システム: 実行結果5項目 + コード品質1項目
 */

// ESLint設定の読み込み（Web Worker環境でのグローバルアクセス）
try {
  importScripts('./eslint-config.js');
} catch (error) {
  console.warn('ESLint設定ファイルの読み込みに失敗しました:', error);
}

// ESLintインスタンスの初期化（遅延初期化）
let eslintInstance = null;

// console.logの出力をキャプチャするための配列
let capturedLogs = [];

// 元のconsole.logを保存
const originalConsoleLog = console.log;

// console.logを上書きして出力をキャプチャ
function setupConsoleCapture() {
  console.log = (...args) => {
    // 元のconsole.logも呼び出す（デバッグ用）
    originalConsoleLog.apply(console, args);
    
    // 引数を文字列に変換
    const logMessage = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        try {
          // 配列の場合は特別処理
          if (Array.isArray(arg)) {
            return arg.join(',');
          }
          return JSON.stringify(arg);
        } catch (e) {
          return '[Object]';
        }
      }
      return String(arg);
    }).join(' ');
    
    capturedLogs.push(logMessage);
  };
}

// console.logを元に戻す
function restoreConsole() {
  console.log = originalConsoleLog;
}

// 変数を置換する関数
function replaceVariables(code, variables) {
  let modifiedCode = code;
  
  // 各変数について置換を実行
  for (const [varName, value] of Object.entries(variables)) {
    // let変数の置換（= の後の値を置換）
    const letPattern = new RegExp(`(let\\s+${varName}\\s*=\\s*)[^;]+;`, 'g');
    const constPattern = new RegExp(`(const\\s+${varName}\\s*=\\s*)[^;]+;`, 'g');
    
    // 値を適切にフォーマット
    let formattedValue;
    if (Array.isArray(value)) {
      formattedValue = `[${value.map(v => typeof v === 'string' ? `"${v}"` : v).join(', ')}]`;
    } else if (typeof value === 'string') {
      formattedValue = `"${value}"`;
    } else if (typeof value === 'object' && value !== null) {
      // オブジェクトの場合はJSON.stringifyして適切にフォーマット
      formattedValue = JSON.stringify(value);
    } else {
      formattedValue = value;
    }
    
    // let文の置換
    modifiedCode = modifiedCode.replace(letPattern, `$1${formattedValue};`);
    // const文の置換
    modifiedCode = modifiedCode.replace(constPattern, `$1${formattedValue};`);
  }
  
  return modifiedCode;
}

// ユーザーコードを安全に実行する関数
function executeUserCode(code, variables = null) {
  // ログ配列をクリア
  capturedLogs = [];
  
  // console.logキャプチャを開始
  setupConsoleCapture();
  
  let result = null;
  let error = null;
  
  try {
    // 変数置換が必要な場合は実行
    let finalCode = code;
    if (variables) {
      finalCode = replaceVariables(code, variables);
    }
    
    // new Function()を使ってユーザーコードを実行
    // これにより、Worker内のグローバルスコープを汚染せずに実行できる
    const userFunction = new Function(`
      "use strict";
      ${finalCode}
      // 最後の式の値を返すため、returnは不要
    `);
    
    result = userFunction();
    
  } catch (e) {
    error = {
      name: e.name,
      message: e.message,
      stack: e.stack
    };
    // エラーもログに記録
    capturedLogs.push(`エラー: ${e.message}`);
  } finally {
    // console.logを元に戻す
    restoreConsole();
  }
  
  return {
    success: error === null,
    result: result,
    logs: capturedLogs,
    error: error
  };
}

// 出力を比較する関数
function compareOutput(expected, actual) {
  // 改行文字を統一
  const normalizeOutput = (str) => {
    return str.replace(/\\n/g, '\n').trim();
  };
  
  const expectedNormalized = normalizeOutput(expected);
  const actualNormalized = normalizeOutput(actual);
  
  if (expectedNormalized === actualNormalized) {
    return {
      isCorrect: true,
      message: "正解"
    };
  }
  
  // 行ごとに比較してより詳細な情報を提供
  const expectedLines = expectedNormalized.split('\n');
  const actualLines = actualNormalized.split('\n');
  
  if (expectedLines.length !== actualLines.length) {
    return {
      isCorrect: false,
      message: `出力行数が異なります（期待値: ${expectedLines.length}行, 実際: ${actualLines.length}行）`,
      expected: expectedNormalized,
      actual: actualNormalized
    };
  }
  
  // 最初に異なる行を見つける
  for (let i = 0; i < expectedLines.length; i++) {
    if (expectedLines[i].trim() !== actualLines[i].trim()) {
      return {
        isCorrect: false,
        message: `行${i + 1}が異なります`,
        expectedLine: expectedLines[i],
        actualLine: actualLines[i],
        expected: expectedNormalized,
        actual: actualNormalized
      };
    }
  }
  
  return {
    isCorrect: false,
    message: "出力が一致しません",
    expected: expectedNormalized,
    actual: actualNormalized
  };
}

// ESLintを使用してコード品質をチェックする関数
function checkCodeQuality(code) {
  try {
    // ESLintインスタンスの遅延初期化
    if (!eslintInstance && typeof ESLint !== 'undefined') {
      const level = self.ESLintConfig ? self.ESLintConfig.getRecommendedLevel(code) : 'basic';
      const config = self.ESLintConfig ? self.ESLintConfig.createConfig(level) : {
        env: { browser: true, es2021: true },
        parserOptions: { ecmaVersion: 'latest', sourceType: 'script' },
        rules: {
          'no-undef': 'error',
          'no-unused-vars': 'warn',
          'semi': ['error', 'always'],
          'prefer-const': 'warn'
        }
      };
      
      eslintInstance = new ESLint({ 
        baseConfig: config,
        useEslintrc: false 
      });
    }

    if (!eslintInstance) {
      return {
        score: 100, // ESLintが利用できない場合は満点
        status: 'UNAVAILABLE',
        message: 'ESLint機能は現在利用できません',
        issues: []
      };
    }

    // ESLintでコードを解析
    const results = eslintInstance.lintText(code, { filePath: 'user-code.js' });
    
    if (!results || results.length === 0) {
      return {
        score: 100,
        status: 'PASSED',
        message: 'コード品質チェック: 完璧です！',
        issues: []
      };
    }

    const result = results[0];
    const { messages } = result;
    
    if (messages.length === 0) {
      return {
        score: 100,
        status: 'PASSED', 
        message: 'コード品質チェック: 完璧です！',
        issues: []
      };
    }

    // エラーと警告を分類して点数を計算
    let errorCount = 0;
    let warningCount = 0;
    const issues = [];

    messages.forEach(msg => {
      const issue = {
        line: msg.line,
        column: msg.column,
        ruleId: msg.ruleId,
        severity: msg.severity, // 1=warning, 2=error
        message: msg.message,
        japaneseMessage: null
      };

      // 日本語メッセージを追加
      if (self.ESLintConfig && msg.ruleId) {
        const japaneseInfo = self.ESLintConfig.getJapaneseMessage(msg.ruleId, [msg.nodeType]);
        issue.japaneseMessage = japaneseInfo;
      }

      issues.push(issue);

      if (msg.severity === 2) {
        errorCount++;
      } else if (msg.severity === 1) {
        warningCount++;
      }
    });

    // 点数計算（エラー1個につき-20点、警告1個につき-5点、最低0点）
    let score = 100 - (errorCount * 20) - (warningCount * 5);
    score = Math.max(0, score);

    let status, message;
    if (errorCount > 0) {
      status = 'ERROR';
      message = `コード品質: ${errorCount}個のエラーがあります（警告${warningCount}個）`;
    } else if (warningCount > 0) {
      status = 'WARNING';
      message = `コード品質: ${warningCount}個の改善点があります`;
    } else {
      status = 'PASSED';
      message = 'コード品質: 完璧です！';
    }

    return {
      score: score,
      status: status,
      message: message,
      issues: issues,
      errorCount: errorCount,
      warningCount: warningCount
    };
    
  } catch (error) {
    // ESLintエラーの場合は部分点を与える
    return {
      score: 50,
      status: 'ERROR',
      message: `コード品質チェックでエラーが発生しました: ${error.message}`,
      issues: [],
      error: error.message
    };
  }
}

// 複数テストケースを実行する関数（6項目対応）
function runMultipleTestCases(code, testCases) {
  const results = [];
  let totalScore = 0;
  let maxTotalScore = 0;
  
  // 実行結果テスト（5項目 × 100点）
  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    maxTotalScore += 100; // 各テストケース100点とする
    
    // テストケースを実行
    const executionResult = executeUserCode(code, testCase.variables);
    
    if (!executionResult.success) {
      // 実行エラーの場合
      results.push({
        testCaseName: testCase.name,
        status: 'RUNTIME_ERROR',
        message: `実行時エラー: ${executionResult.error.message}`,
        logs: executionResult.logs,
        error: executionResult.error,
        score: 0,
        isCorrect: false
      });
      continue;
    }
    
    // 出力を比較
    const actualOutput = executionResult.logs.join('\n');
    const comparison = compareOutput(testCase.expectedOutput, actualOutput);
    
    const testScore = comparison.isCorrect ? 100 : 0;
    totalScore += testScore;
    
    results.push({
      testCaseName: testCase.name,
      status: comparison.isCorrect ? 'ACCEPTED' : 'WRONG_ANSWER',
      isCorrect: comparison.isCorrect,
      message: comparison.message,
      score: testScore,
      logs: executionResult.logs,
      actualOutput: actualOutput,
      expectedOutput: testCase.expectedOutput.replace(/\\n/g, '\n'),
      comparison: comparison
    });
  }
  
  // コード品質チェック（6項目目 × 100点）
  const qualityCheck = checkCodeQuality(code);
  maxTotalScore += 100; // コード品質チェック100点を追加
  totalScore += qualityCheck.score;
  
  // コード品質結果を追加
  results.push({
    testCaseName: 'コード品質チェック (ESLint)',
    status: qualityCheck.status === 'PASSED' ? 'ACCEPTED' : 
            qualityCheck.status === 'WARNING' ? 'WARNING' : 'CODE_QUALITY_ISSUE',
    isCorrect: qualityCheck.score === 100,
    message: qualityCheck.message,
    score: qualityCheck.score,
    qualityCheck: qualityCheck, // 詳細な品質情報
    isQualityCheck: true // 品質チェック項目であることを示すフラグ
  });
  
  return {
    results: results,
    totalScore: totalScore,
    maxTotalScore: maxTotalScore,
    passedCount: results.filter(r => r.isCorrect).length,
    totalCount: results.length,
    qualityScore: qualityCheck.score, // 品質チェックの点数
    hasQualityCheck: true // 品質チェックが含まれていることを示すフラグ
  };
}

// メインスレッドからのメッセージを処理
self.onmessage = function(e) {
  const { code, problem } = e.data;
  
  if (!code || !problem) {
    self.postMessage({
      success: false,
      error: "コードまたは問題データが不正です"
    });
    return;
  }
  
  try {
    // 新しいテストケース形式があるかチェック
    if (problem.testCases && Array.isArray(problem.testCases)) {
      // 複数テストケースを実行
      const multiTestResult = runMultipleTestCases(code, problem.testCases);
      
      // 6項目600点満点システムの結果をメインスレッドに送信
      self.postMessage({
        success: true,
        isMultipleTests: true,
        testResults: multiTestResult.results,
        status: multiTestResult.passedCount === multiTestResult.totalCount ? 'ALL_ACCEPTED' : 'PARTIAL_ACCEPTED',
        message: `${multiTestResult.passedCount}/${multiTestResult.totalCount} 項目が成功しました（コード品質チェック含む）`,
        score: multiTestResult.totalScore,
        maxScore: multiTestResult.maxTotalScore,
        passedCount: multiTestResult.passedCount,
        totalCount: multiTestResult.totalCount,
        qualityScore: multiTestResult.qualityScore,
        hasQualityCheck: multiTestResult.hasQualityCheck,
        is600PointSystem: true // 600点満点システムである事を示すフラグ
      });
    } else {
      // 従来の単一テストケース
      const executionResult = executeUserCode(code);
      
      if (!executionResult.success) {
        // 実行エラーの場合
        self.postMessage({
          success: false,
          status: 'RUNTIME_ERROR',
          message: `実行時エラー: ${executionResult.error.message}`,
          logs: executionResult.logs,
          error: executionResult.error
        });
        return;
      }
      
      // 出力を比較
      const actualOutput = executionResult.logs.join('\n');
      const comparison = compareOutput(problem.expectedOutput, actualOutput);
      
      // 結果をメインスレッドに送信
      self.postMessage({
        success: true,
        isMultipleTests: false,
        status: comparison.isCorrect ? 'ACCEPTED' : 'WRONG_ANSWER',
        isCorrect: comparison.isCorrect,
        message: comparison.message,
        score: comparison.isCorrect ? problem.points : 0,
        maxScore: problem.points,
        logs: executionResult.logs,
        actualOutput: actualOutput,
        expectedOutput: problem.expectedOutput.replace(/\\n/g, '\n'),
        comparison: comparison
      });
    }
    
  } catch (error) {
    // Worker内でのエラー
    self.postMessage({
      success: false,
      status: 'SYSTEM_ERROR',
      message: `システムエラー: ${error.message}`,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      }
    });
  }
};