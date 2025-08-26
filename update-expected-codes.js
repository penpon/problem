#!/usr/bin/env node

/**
 * 正解コード自動設定スクリプト
 * beginner-practiceディレクトリから実装ファイルを読み取り、
 * problems/frontend/の問題JSONファイルに正解コードを設定します
 */

const fs = require('fs');
const path = require('path');

// 設定
const BEGINNER_PRACTICE_DIR = './beginner-practice';
const PROBLEMS_FRONTEND_DIR = './problems/frontend';

// 問題IDとディレクトリ名のマッピング（problemLoader.jsから取得）
const DIRECTORY_MAP = {
    'practice01': '01-basic-html',
    'practice02': '02-add-heading', 
    'practice03': '03-add-image',
    'practice04': '04-add-link',
    'practice05': '05-add-list',
    'practice06': '06-first-css',
    'practice07': '07-spacing',
    'practice08': '08-borders',
    'practice09': '09-centering',
    'practice10': '10-layout-basics',
    'practice11': '11-shadows-corners',
    'practice12': '12-simple-animation',
    'practice13': '13-flexbox-intro',
    'practice14': '14-simple-card',
    'practice15': '15-hover-effects',
    'practice16': '16-first-javascript',
    'practice17': '17-javascript-hello',
    'practice18': '18-console-and-variables',
    'practice19': '19-basic-math',
    'practice20': '20-get-element',
    'practice21': '21-button-click',
    'practice22': '22-multiple-buttons',
    'practice23': '23-counter-basic',
    'practice24': '24-counter-enhanced',
    'practice25': '25-change-content',
    'practice26': '26-text-content-change',
    'practice27': '27-html-content-basic',
    'practice28': '28-random-basic',
    'practice29': '29-array-random-combo',
    'practice30': '30-array-basics',
    'practice31': '31-random-selection',
    'practice32': '32-timer-basics',
    'practice33': '33-timer-animation',
    'practice34': '34-function-practical',
    'practice35': '35-function-basics',
    'practice36': '36-function-systems',
    'practice37': '37-object-basics',
    'practice38': '38-mini-product-card',
    'practice39': '39-mini-product-card-bootstrap',
    'practice40': '40-basic-product-card',
    'practice41': '41-card-expansion',
    'practice42': '42-data-basic',
    'practice43': '43-data-management',
    'practice44': '44-advanced-interaction',
    'practice45': '45-ui-ux-completion',
    'practice46': '46-integrated-system',
    'practice47': '47-simple-calculator',
    'practice48': '48-simple-calculator-bootstrap',
    'practice49': '49-basic-calculator',
    'practice50': '50-advanced-calculator'
};

/**
 * ファイルを安全に読み込み
 */
function safeReadFile(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf8');
        }
        return '';
    } catch (error) {
        console.warn(`Warning: Failed to read ${filePath}:`, error.message);
        return '';
    }
}

/**
 * 実装ディレクトリからファイル内容を取得
 */
function getExpectedFilesFromDirectory(practiceDir) {
    const files = {
        html: { template: '', expected: '' },
        css: { template: '', expected: '' },
        js: { template: '', expected: '' }
    };

    // index.html
    const htmlPath = path.join(practiceDir, 'index.html');
    const htmlContent = safeReadFile(htmlPath);
    if (htmlContent) {
        files.html.expected = htmlContent;
        // テンプレート版を生成（簡素化）
        files.html.template = generateSimplifiedTemplate(htmlContent, 'html');
    }

    // style.css
    const cssPath = path.join(practiceDir, 'style.css');
    const cssContent = safeReadFile(cssPath);
    if (cssContent) {
        files.css.expected = cssContent;
        files.css.template = generateSimplifiedTemplate(cssContent, 'css');
    }

    // script.js
    const jsPath = path.join(practiceDir, 'script.js');
    const jsContent = safeReadFile(jsPath);
    if (jsContent) {
        files.js.expected = jsContent;
        files.js.template = generateSimplifiedTemplate(jsContent, 'js');
    }

    return files;
}

/**
 * 簡素化されたテンプレートを生成
 */
function generateSimplifiedTemplate(content, fileType) {
    switch (fileType) {
        case 'html':
            // HTMLの簡素化版を生成
            if (content.includes('<!DOCTYPE html>')) {
                return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>課題実装</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>課題を実装してください</h1>
        <!-- ここに実装してください -->
    </div>
    
    <script src="script.js"></script>
</body>
</html>`;
            }
            return content;

        case 'css':
            // CSSの簡素化版
            return `/* 基本的なスタイル */
body {
    font-family: Arial, sans-serif;
    margin: 40px;
    background: #f5f5f5;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* ここに実装してください */`;

        case 'js':
            // JavaScriptの簡素化版
            return `// JavaScript実装エリア

// ここに実装してください
console.log('課題実装を開始してください');`;

        default:
            return content;
    }
}

/**
 * 基本的なチェック項目を生成
 */
function generateBasicChecks(practiceId, files) {
    const checks = [
        {
            "id": "doctype",
            "name": "DOCTYPE宣言",
            "type": "structure",
            "message": "DOCTYPE html宣言が必要です"
        },
        {
            "id": "html",
            "name": "<html>タグ",
            "type": "structure",
            "message": "<html>タグが必要です"
        },
        {
            "id": "head",
            "name": "<head>セクション",
            "type": "structure",
            "message": "<head>セクションが必要です"
        },
        {
            "id": "body",
            "name": "<body>セクション",
            "type": "structure",
            "message": "<body>セクションが必要です"
        },
        {
            "id": "title",
            "name": "<title>タグ",
            "type": "structure",
            "message": "<title>タグと内容が必要です"
        }
    ];

    // CSSがある場合
    if (files.css.expected) {
        checks.push({
            "id": "css-content",
            "name": "CSSスタイル",
            "type": "css",
            "message": "CSSでスタイルを設定してください"
        });
    }

    // JavaScriptがある場合  
    if (files.js.expected) {
        checks.push({
            "id": "js-content",
            "name": "JavaScript",
            "type": "js",
            "message": "JavaScriptで動的な動作を実装してください"
        });
    }

    return checks;
}

/**
 * 問題JSONファイルを更新
 */
function updateProblemFile(practiceId) {
    const problemFilePath = path.join(PROBLEMS_FRONTEND_DIR, `${practiceId}.json`);
    const directoryName = DIRECTORY_MAP[practiceId];
    
    if (!directoryName) {
        console.warn(`Warning: No directory mapping found for ${practiceId}`);
        return false;
    }

    const practiceDir = path.join(BEGINNER_PRACTICE_DIR, directoryName);
    
    if (!fs.existsSync(practiceDir)) {
        console.warn(`Warning: Directory not found: ${practiceDir}`);
        return false;
    }

    if (!fs.existsSync(problemFilePath)) {
        console.warn(`Warning: Problem file not found: ${problemFilePath}`);
        return false;
    }

    try {
        // 既存の問題ファイルを読み込み
        const problemData = JSON.parse(fs.readFileSync(problemFilePath, 'utf8'));
        
        // 実装ファイルからコンテンツを取得
        const files = getExpectedFilesFromDirectory(practiceDir);
        
        // 問題ファイルを更新
        problemData.files = files;
        problemData.checks = generateBasicChecks(practiceId, files);
        
        // ファイルに書き戻し
        fs.writeFileSync(problemFilePath, JSON.stringify(problemData, null, 2), 'utf8');
        
        console.log(`✅ Updated ${practiceId} (${directoryName})`);
        return true;
    } catch (error) {
        console.error(`❌ Failed to update ${practiceId}:`, error.message);
        return false;
    }
}

/**
 * メイン処理
 */
function main() {
    console.log('🚀 正解コード自動設定を開始します...\n');

    let successCount = 0;
    let failCount = 0;

    // practice21は既に設定済みなのでスキップ（または上書き確認）
    const skipPractice21 = process.argv.includes('--skip-practice21');

    for (const practiceId of Object.keys(DIRECTORY_MAP)) {
        if (skipPractice21 && practiceId === 'practice21') {
            console.log(`⏭️  Skipped ${practiceId} (already configured)`);
            continue;
        }

        const success = updateProblemFile(practiceId);
        if (success) {
            successCount++;
        } else {
            failCount++;
        }
    }

    console.log('\n📊 処理結果:');
    console.log(`✅ 成功: ${successCount}問`);
    console.log(`❌ 失敗: ${failCount}問`);

    if (failCount === 0) {
        console.log('\n🎉 すべての問題の正解コード設定が完了しました！');
    } else {
        console.log('\n⚠️  一部の問題で設定に失敗しました。ログを確認してください。');
        process.exit(1);
    }
}

// スクリプト実行
if (require.main === module) {
    main();
}

module.exports = { updateProblemFile, getExpectedFilesFromDirectory };