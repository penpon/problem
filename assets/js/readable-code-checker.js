/**
 * リーダブルコード準拠の変数名チェッカー
 * 「リーダブルコード」書籍の原則に基づいた詳細な変数名品質検証
 */

const ReadableCodeChecker = {
    
    // 汎用的すぎる変数名のリスト
    genericNames: ['tmp', 'temp', 'data', 'val', 'value', 'info', 'obj', 'item', 'elem', 'res', 'result', 'stuff', 'thing', 'var'],
    
    // ループカウンタとして許可される短い変数名
    allowedShortNames: ['i', 'j', 'k', 'x', 'y', 'z', 'n', 'm'],
    
    // ブール値に適切なプレフィックス
    booleanPrefixes: ['is', 'has', 'can', 'should', 'will', 'did', 'was', 'were'],
    
    // 単位が必要な数値系の変数名
    numericPatterns: {
        time: ['time', 'delay', 'timeout', 'duration', 'interval'],
        size: ['size', 'width', 'height', 'length', 'count', 'limit', 'max', 'min']
    },
    
    // 推奨される単位サフィックス
    unitSuffixes: {
        time: ['ms', 'sec', 'min', 'hour'],
        size: ['px', 'em', 'rem', 'mb', 'kb', 'gb', 'bytes']
    },

    /**
     * 汎用的すぎる変数名をチェック
     */
    checkGenericNames(code) {
        const issues = [];
        const lines = code.split('\n');
        
        // let/const宣言での汎用名チェック
        const declarationPattern = /(?:let|const|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/g;
        
        lines.forEach((line, lineIndex) => {
            let match;
            while ((match = declarationPattern.exec(line)) !== null) {
                const varName = match[1];
                if (this.genericNames.includes(varName.toLowerCase())) {
                    issues.push({
                        line: lineIndex + 1,
                        variable: varName,
                        type: 'generic-name',
                        message: `変数名「${varName}」は汎用的すぎます。より具体的な名前を使用してください`,
                        suggestion: `例: userList, imageData, responseValue など具体的な名前に変更`,
                        severity: 'warning',
                        score: -10
                    });
                }
            }
        });
        
        return issues;
    },

    /**
     * 短すぎる変数名をチェック
     */
    checkShortNames(code) {
        const issues = [];
        const lines = code.split('\n');
        
        // let/const宣言での短い名前チェック
        const declarationPattern = /(?:let|const|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/g;
        
        lines.forEach((line, lineIndex) => {
            let match;
            while ((match = declarationPattern.exec(line)) !== null) {
                const varName = match[1];
                
                // 1-2文字で、許可されていない短い名前をチェック
                if (varName.length <= 2 && !this.allowedShortNames.includes(varName.toLowerCase())) {
                    issues.push({
                        line: lineIndex + 1,
                        variable: varName,
                        type: 'short-name',
                        message: `変数名「${varName}」が短すぎます。意味のある名前を使用してください`,
                        suggestion: `変数の用途を表す具体的な名前に変更してください`,
                        severity: 'warning',
                        score: -5
                    });
                }
            }
        });
        
        return issues;
    },

    /**
     * ブール値変数の命名規則をチェック
     */
    checkBooleanNaming(code) {
        const issues = [];
        const lines = code.split('\n');
        
        // true/falseを代入している変数をチェック
        const booleanAssignmentPattern = /(?:let|const|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(true|false|!|\w+\s*[<>=!]+)/g;
        
        lines.forEach((line, lineIndex) => {
            let match;
            while ((match = booleanAssignmentPattern.exec(line)) !== null) {
                const varName = match[1];
                const hasValidPrefix = this.booleanPrefixes.some(prefix => 
                    varName.toLowerCase().startsWith(prefix.toLowerCase())
                );
                
                if (!hasValidPrefix) {
                    issues.push({
                        line: lineIndex + 1,
                        variable: varName,
                        type: 'boolean-naming',
                        message: `ブール値変数「${varName}」には適切なプレフィックスを使用してください`,
                        suggestion: `例: is${varName.charAt(0).toUpperCase() + varName.slice(1)}, has${varName.charAt(0).toUpperCase() + varName.slice(1)} など`,
                        severity: 'warning',
                        score: -8
                    });
                }
            }
        });
        
        return issues;
    },

    /**
     * 配列変数の複数形チェック
     */
    checkArrayNaming(code) {
        const issues = [];
        const lines = code.split('\n');
        
        // 配列リテラルを代入している変数をチェック
        const arrayAssignmentPattern = /(?:let|const|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*\[/g;
        
        lines.forEach((line, lineIndex) => {
            let match;
            while ((match = arrayAssignmentPattern.exec(line)) !== null) {
                const varName = match[1];
                
                // 単数形であることを簡易的にチェック（sで終わらない、かつ一般的な複数形でない）
                const endsWithS = varName.endsWith('s') || varName.endsWith('es') || varName.endsWith('ies');
                const hasListSuffix = varName.toLowerCase().includes('list') || 
                                    varName.toLowerCase().includes('array') || 
                                    varName.toLowerCase().includes('items');
                
                if (!endsWithS && !hasListSuffix && varName.length > 3) {
                    issues.push({
                        line: lineIndex + 1,
                        variable: varName,
                        type: 'array-naming',
                        message: `配列変数「${varName}」は複数形または「List」「Array」などのサフィックスを使用してください`,
                        suggestion: `例: ${varName}s, ${varName}List, ${varName}Array など`,
                        severity: 'warning',
                        score: -8
                    });
                }
            }
        });
        
        return issues;
    },

    /**
     * 数値変数の単位チェック
     */
    checkNumericUnits(code) {
        const issues = [];
        const lines = code.split('\n');
        
        // 数値を代入している変数をチェック
        const numericAssignmentPattern = /(?:let|const|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(\d+(?:\.\d+)?)/g;
        
        lines.forEach((line, lineIndex) => {
            let match;
            while ((match = numericAssignmentPattern.exec(line)) !== null) {
                const varName = match[1].toLowerCase();
                const value = parseFloat(match[2]);
                
                // 時間系の変数名チェック
                const isTimeRelated = this.numericPatterns.time.some(pattern => varName.includes(pattern));
                const hasTimeUnit = this.unitSuffixes.time.some(unit => varName.includes(unit));
                
                if (isTimeRelated && !hasTimeUnit && value > 1) {
                    issues.push({
                        line: lineIndex + 1,
                        variable: match[1],
                        type: 'numeric-unit',
                        message: `時間関連の変数「${match[1]}」に単位を明記してください`,
                        suggestion: `例: ${match[1]}Ms, ${match[1]}Sec など単位を追加`,
                        severity: 'info',
                        score: -5
                    });
                }
                
                // サイズ系の変数名チェック
                const isSizeRelated = this.numericPatterns.size.some(pattern => varName.includes(pattern));
                const hasSizeUnit = this.unitSuffixes.size.some(unit => varName.includes(unit));
                
                if (isSizeRelated && !hasSizeUnit && value > 1) {
                    issues.push({
                        line: lineIndex + 1,
                        variable: match[1],
                        type: 'numeric-unit',
                        message: `サイズ関連の変数「${match[1]}」に単位を明記してください`,
                        suggestion: `例: ${match[1]}Px, ${match[1]}Mb など単位を追加`,
                        severity: 'info',
                        score: -5
                    });
                }
            }
        });
        
        return issues;
    },

    /**
     * 全てのチェックを統合して実行
     */
    analyze(code) {
        if (!code || typeof code !== 'string') {
            return {
                score: 50,
                status: 'UNKNOWN',
                message: 'リーダブルコードチェック: コードが無効です',
                issues: []
            };
        }

        // 各チェック機能を実行
        const allIssues = [
            ...this.checkGenericNames(code),
            ...this.checkShortNames(code),
            ...this.checkBooleanNaming(code),
            ...this.checkArrayNaming(code),
            ...this.checkNumericUnits(code)
        ];

        // スコア計算（50点満点）
        let totalDeduction = allIssues.reduce((sum, issue) => sum + Math.abs(issue.score), 0);
        let score = Math.max(0, 50 - totalDeduction);

        // ステータス判定
        let status, message;
        const errorCount = allIssues.filter(issue => issue.severity === 'error').length;
        const warningCount = allIssues.filter(issue => issue.severity === 'warning').length;
        const infoCount = allIssues.filter(issue => issue.severity === 'info').length;

        if (allIssues.length === 0) {
            status = 'PERFECT';
            message = 'リーダブルコード: 完璧な変数名です！';
        } else if (errorCount > 0) {
            status = 'NEEDS_IMPROVEMENT';
            message = `リーダブルコード: ${errorCount}個の重要な改善点があります（警告${warningCount}個、情報${infoCount}個）`;
        } else if (warningCount > 0) {
            status = 'GOOD_WITH_SUGGESTIONS';
            message = `リーダブルコード: ${warningCount}個の改善提案があります（情報${infoCount}個）`;
        } else {
            status = 'GOOD';
            message = `リーダブルコード: ${infoCount}個の参考情報があります`;
        }

        return {
            score: score,
            status: status,
            message: message,
            issues: allIssues,
            statistics: {
                totalIssues: allIssues.length,
                errorCount: errorCount,
                warningCount: warningCount,
                infoCount: infoCount,
                deduction: totalDeduction
            }
        };
    },

    /**
     * 日本語での詳細な改善提案を生成
     */
    generateImprovementSuggestions(issues) {
        const suggestions = [];
        const groupedIssues = {};

        // 種類別にグループ化
        issues.forEach(issue => {
            if (!groupedIssues[issue.type]) {
                groupedIssues[issue.type] = [];
            }
            groupedIssues[issue.type].push(issue);
        });

        // 種類別に改善提案を生成
        Object.entries(groupedIssues).forEach(([type, typeIssues]) => {
            switch (type) {
                case 'generic-name':
                    suggestions.push({
                        category: '具体的な命名',
                        title: '汎用的な変数名を具体的に',
                        description: `${typeIssues.length}個の汎用的な変数名があります。変数の用途を明確に表す名前に変更しましょう。`,
                        examples: 'data → userData, userList, imageData など'
                    });
                    break;
                case 'boolean-naming':
                    suggestions.push({
                        category: 'ブール値の命名',
                        title: 'ブール値変数にプレフィックスを追加',
                        description: `${typeIssues.length}個のブール値変数に適切なプレフィックスがありません。`,
                        examples: 'visible → isVisible, enabled → isEnabled'
                    });
                    break;
                case 'array-naming':
                    suggestions.push({
                        category: '配列の命名',
                        title: '配列変数を複数形に',
                        description: `${typeIssues.length}個の配列変数が単数形です。複数の要素を含むことを明示しましょう。`,
                        examples: 'user → users, item → items, itemList'
                    });
                    break;
            }
        });

        return suggestions;
    }
};

// Web Worker環境とブラウザ環境の両方に対応
if (typeof self !== 'undefined') {
    // Web Worker環境
    self.ReadableCodeChecker = ReadableCodeChecker;
} else if (typeof window !== 'undefined') {
    // ブラウザ環境
    window.ReadableCodeChecker = ReadableCodeChecker;
}