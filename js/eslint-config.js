/**
 * JavaScript学習サイト用ESLint設定
 * 初学者向けの段階的なコード品質チェック設定
 */

// レベル1: 基本的なエラー回避（重要度：高）
const basicRules = {
    // 構文エラー・ランタイムエラー回避
    'no-undef': 'error',           // 未定義変数の使用禁止
    'no-unused-vars': 'warn',      // 未使用変数の検出（警告レベル）
    'no-dupe-args': 'error',       // 重複引数の禁止
    'no-dupe-keys': 'error',       // オブジェクト内の重複キーの禁止
    'no-unreachable': 'error',     // 到達不可能コードの検出
    
    // 基本的なコードスタイル
    'semi': ['error', 'always'],   // セミコロンの強制
    'quotes': ['warn', 'single'],  // シングルクォートの推奨
    'no-trailing-spaces': 'warn', // 行末の不要な空白
};

// レベル2: ベストプラクティス（重要度：中）
const intermediateRules = {
    ...basicRules,
    
    // 変数宣言の改善
    'prefer-const': 'warn',        // 再代入しない変数はconstを推奨
    'no-var': 'warn',             // varの代わりにletを推奨
    'block-scoped-var': 'warn',   // ブロックスコープの適切な使用
    
    // 関数の品質
    'no-redeclare': 'warn',       // 変数の再宣言を警告
    'no-shadow': 'warn',          // 外部スコープ変数の隠蔽を警告
    'camelcase': ['warn', { 'properties': 'never' }], // キャメルケース命名規則
    
    // コードの可読性
    'brace-style': ['warn', '1tbs'], // ブレーススタイル統一
    'indent': ['warn', 2],        // インデント2スペース
    'space-before-function-paren': ['warn', 'never'], // 関数名と括弧の間にスペースなし
};

// レベル3: 高度な品質チェック（重要度：低、学習効果：高）
const advancedRules = {
    ...intermediateRules,
    
    // コードの複雑度
    'complexity': ['warn', 10],    // 循環的複雑度の制限
    'max-lines-per-function': ['warn', 50], // 関数の行数制限
    'max-depth': ['warn', 4],     // ネストの深さ制限
    
    // より良いコーディング慣行
    'no-magic-numbers': ['warn', { 'ignore': [0, 1, -1] }], // マジックナンバー回避
    'consistent-return': 'warn',  // 一貫したreturn文
    'no-console': 'warn',        // console.logの使用を警告（学習段階では必要なので警告レベル）
    
    // ES6+の活用
    'prefer-arrow-callback': 'warn', // アロー関数の推奨
    'prefer-template': 'warn',    // テンプレートリテラルの推奨
};

// 日本語によるエラーメッセージとフィードバック
const errorMessages = {
    'no-undef': {
        message: '変数 "{0}" が定義されていません',
        suggestion: '変数を使用する前に、let、const、またはvarで宣言してください'
    },
    'no-unused-vars': {
        message: '変数 "{0}" が定義されましたが使用されていません',
        suggestion: '不要な変数を削除するか、実際に使用してください'
    },
    'semi': {
        message: '文の終わりにセミコロン(;)が必要です',
        suggestion: 'JavaScript文の終わりには必ずセミコロンを付けましょう'
    },
    'prefer-const': {
        message: '再代入されない変数はconstを使用してください',
        suggestion: 'letではなくconstを使うことで、意図しない変更を防げます'
    },
    'no-var': {
        message: 'varではなくletまたはconstを使用してください',
        suggestion: 'varは古い書き方です。letやconstを使いましょう'
    },
    'no-console': {
        message: 'console.logの使用は本番環境では避けましょう',
        suggestion: '学習中は問題ありませんが、実際のアプリでは適切なログシステムを使いましょう'
    },
    'camelcase': {
        message: 'キャメルケース（例：userName）で命名してください',
        suggestion: 'JavaScriptでは変数名にキャメルケースを使うのが一般的です'
    },
    // リーダブルコードチェック用のメッセージ
    'readable-generic-name': {
        message: '変数名 "{0}" は汎用的すぎます',
        suggestion: 'より具体的で意味のある名前を使用してください（例：userData, imageList）'
    },
    'readable-short-name': {
        message: '変数名 "{0}" が短すぎます',
        suggestion: '変数の用途を表すより長い名前を使用してください'
    },
    'readable-boolean-naming': {
        message: 'ブール値変数 "{0}" には適切なプレフィックスを使用してください',
        suggestion: 'is, has, can, should などを使用してください（例：isVisible, hasData）'
    },
    'readable-array-naming': {
        message: '配列変数 "{0}" は複数形にしてください',
        suggestion: '配列には複数形を使用してください（例：users, items, dataList）'
    },
    'readable-numeric-unit': {
        message: '数値変数 "{0}" に単位を明記してください',
        suggestion: '時間やサイズの変数には単位を追加してください（例：delayMs, widthPx）'
    }
};

// 学習レベルに応じたルールセットを取得する関数
function getRulesetForLevel(level = 'basic') {
    switch (level) {
        case 'basic':
            return basicRules;
        case 'intermediate':
            return intermediateRules;
        case 'advanced':
            return advancedRules;
        default:
            return basicRules;
    }
}

// ESLint設定オブジェクトを生成する関数
function createESLintConfig(level = 'basic') {
    return {
        env: {
            browser: true,
            es2021: true
        },
        parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'script'
        },
        rules: getRulesetForLevel(level),
        // Web Worker環境で必要なグローバル変数
        globals: {
            self: 'readonly',
            console: 'readonly'
        }
    };
}

// エラーメッセージを日本語で取得する関数
function getJapaneseErrorMessage(ruleId, messageData = []) {
    const errorInfo = errorMessages[ruleId];
    if (!errorInfo) {
        return {
            message: `ルール "${ruleId}" に違反しています`,
            suggestion: 'コードを見直してください'
        };
    }
    
    let message = errorInfo.message;
    // プレースホルダーを実際の値で置換
    messageData.forEach((data, index) => {
        message = message.replace(`{${index}}`, data);
    });
    
    return {
        message: message,
        suggestion: errorInfo.suggestion
    };
}

// 学習進度に応じた推奨レベルを決定する関数
function getRecommendedLevel(userCode) {
    // シンプルなヒューリスティックで適切なレベルを判定
    const hasAdvancedFeatures = /=&gt;|template|class\s+\w+/.test(userCode);
    const hasBasicFunctions = /function\s+\w+|let\s+\w+|const\s+\w+/.test(userCode);
    
    if (hasAdvancedFeatures) {
        return 'advanced';
    } else if (hasBasicFunctions) {
        return 'intermediate';
    }
    return 'basic';
}

// リーダブルコードチェック用の特別なメッセージ処理
function getReadableCodeMessage(issueType, variableName) {
    const ruleId = `readable-${issueType}`;
    const errorInfo = errorMessages[ruleId];
    if (!errorInfo) {
        return {
            message: `リーダブルコードチェック: "${issueType}" に問題があります`,
            suggestion: 'コードの可読性を向上させてください'
        };
    }
    
    let message = errorInfo.message.replace('{0}', variableName || '');
    return {
        message: message,
        suggestion: errorInfo.suggestion
    };
}

// エクスポート（Web Worker環境では、グローバルオブジェクトに設定）
if (typeof self !== 'undefined') {
    // Web Worker環境
    self.ESLintConfig = {
        createConfig: createESLintConfig,
        getJapaneseMessage: getJapaneseErrorMessage,
        getReadableCodeMessage: getReadableCodeMessage,
        getRecommendedLevel: getRecommendedLevel,
        getRuleset: getRulesetForLevel
    };
} else if (typeof window !== 'undefined') {
    // ブラウザ環境
    window.ESLintConfig = {
        createConfig: createESLintConfig,
        getJapaneseMessage: getJapaneseErrorMessage,
        getReadableCodeMessage: getReadableCodeMessage,
        getRecommendedLevel: getRecommendedLevel,
        getRuleset: getRulesetForLevel
    };
}