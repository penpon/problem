/**
 * Web Worker for safe JavaScript code execution
 * JavaScript自動採点システム - セキュアな実行環境
 */

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

// 複数テストケースを実行する関数
function runMultipleTestCases(code, testCases) {
  const results = [];
  let totalScore = 0;
  let maxTotalScore = 0;
  
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
  
  return {
    results: results,
    totalScore: totalScore,
    maxTotalScore: maxTotalScore,
    passedCount: results.filter(r => r.isCorrect).length,
    totalCount: results.length
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
      
      // 結果をメインスレッドに送信
      self.postMessage({
        success: true,
        isMultipleTests: true,
        testResults: multiTestResult.results,
        status: multiTestResult.passedCount === multiTestResult.totalCount ? 'ALL_ACCEPTED' : 'PARTIAL_ACCEPTED',
        message: `${multiTestResult.passedCount}/${multiTestResult.totalCount} テストケースが成功しました`,
        score: multiTestResult.totalScore,
        maxScore: multiTestResult.maxTotalScore,
        passedCount: multiTestResult.passedCount,
        totalCount: multiTestResult.totalCount
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