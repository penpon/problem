# ステップ18.3 - 高度な計算機

## 🎯 学習目標

**関数電卓レベルの高度な計算機と式評価システム**

- 三角関数（sin、cos、tan）と対数関数の実装を学ぶ
- 括弧計算と数式パーサーの構築を理解する
- 角度モード（度/ラジアン）の切り替えシステムを習得する
- 完全なキーボードショートカット対応を実装する

## 📖 このステップの内容

### 🔬 高度な計算機の概念

このステップでは、基本・中級計算機から**関数電卓レベルの高度な計算機**を学習します。

18.1-18.2の実用機能から、**数学関数、式解析、高度なユーザーインターフェース**などの専門的な機能へとレベルアップします。

高度な計算機は「複雑な数式の解析と評価、科学計算、プログラム的思考」を通じて、本格的なソフトウェア開発のスキルを身につけます。

### 📝 学習ポイント

#### 1. 三角関数の実装
```javascript
// 角度モードに応じた三角関数の計算
function evaluateTrigoFunction(func, angle) {
    // 度数からラジアンへの変換（必要に応じて）
    const radian = angleMode === 'DEG' ? angle * Math.PI / 180 : angle;
    
    switch (func) {
        case 'sin': return Math.sin(radian);
        case 'cos': return Math.cos(radian);
        case 'tan': return Math.tan(radian);
    }
}

// 正規表現による関数の検出と処理
processed = processed.replace(/sin\(([^)]+)\)/g, (match, p1) => {
    const angle = evaluateProcessedExpression(p1);
    return Math.sin(angleMode === 'DEG' ? angle * Math.PI / 180 : angle).toString();
});
```

#### 2. 数式パーサーとエバリュエーター
```javascript
function evaluateExpression(expression) {
    console.log(`📊 数式評価開始: ${expression}`);
    
    // 1. 前処理: 定数と記号の変換
    let processedExpression = preprocessExpression(expression);
    
    // 2. 構文チェック: 括弧のバランス
    if (!checkBracketBalance(processedExpression)) {
        throw new Error('括弧のバランスが合いません');
    }
    
    // 3. 数式評価: 関数と演算子の処理
    const result = evaluateProcessedExpression(processedExpression);
    
    // 4. 結果検証: 無限大や非数値の検出
    if (!isFinite(result)) {
        throw new Error('計算結果が無限大または非数値です');
    }
    
    return result;
}
```

#### 3. 括弧システムと優先順位
```javascript
// 括弧のバランスチェック
function checkBracketBalance(expression) {
    let balance = 0;
    for (let char of expression) {
        if (char === '(') balance++;
        if (char === ')') balance--;
        if (balance < 0) return false; // 閉じ括弧が多すぎる
    }
    return balance === 0; // 開き括弧と閉じ括弧が一致
}

// 括弧付き計算の処理
function inputBracket(bracket) {
    if (waitingForNewInput && bracket === '(') {
        currentExpression = '';
        waitingForNewInput = false;
    }
    
    currentExpression += bracket;
    bracketUsageCount++;
    updateDisplays();
}
```

#### 4. 高度な関数システム
```javascript
// 対数関数（エラーハンドリング付き）
processed = processed.replace(/log\(([^)]+)\)/g, (match, p1) => {
    const value = evaluateProcessedExpression(p1);
    if (value <= 0) {
        throw new Error('対数の引数は正の数である必要があります');
    }
    return Math.log10(value).toString();
});

// 平方根（負数チェック付き）
processed = processed.replace(/sqrt\(([^)]+)\)/g, (match, p1) => {
    const value = evaluateProcessedExpression(p1);
    if (value < 0) {
        throw new Error('平方根の引数は非負である必要があります');
    }
    return Math.sqrt(value).toString();
});
```

#### 5. 完全なキーボードサポート
```javascript
// 包括的なキーボードイベント処理
document.addEventListener('keydown', function(event) {
    const key = event.key;
    const shiftKey = event.shiftKey;
    
    // 数字と基本演算子
    if (key >= '0' && key <= '9') {
        inputNumber(parseInt(key));
    } else if (['+', '-', '*', '/', '(', ')'].includes(key)) {
        // 各キーに対応する処理
    }
    // 関数のショートカット
    else if (key.toLowerCase() === 's') inputFunction('sin');
    else if (key.toLowerCase() === 'c') inputFunction('cos');
    else if (key.toLowerCase() === 't') inputFunction('tan');
    else if (key.toLowerCase() === 'q') inputFunction('sqrt');
    else if (key.toLowerCase() === 'l') inputFunction('log');
    else if (key.toLowerCase() === 'p') inputConstant('pi');
    
    event.preventDefault(); // デフォルト動作を防止
});
```

## 🧮 実装された機能

### 科学計算機能

1. **📐 三角関数**: sin、cos、tan の計算（度・ラジアン対応）
2. **📊 対数関数**: 常用対数（log）と自然対数（ln）
3. **√ 平方根**: 非負数の平方根計算
4. **🔢 べき乗**: x^y による任意のべき乗計算
5. **² 二乗**: ワンクリックでの二乗計算

### 定数と特殊機能

6. **π 円周率**: 高精度な円周率定数
7. **🔄 角度モード**: 度（DEG）とラジアン（RAD）の切り替え
8. **± 符号変更**: 数値の正負切り替え
9. **🔢 定数計算**: 数学定数を使った計算

### 式処理システム

10. **() 括弧計算**: 複雑な数式の優先順位制御
11. **📝 式入力**: 数式を直接入力して一括計算
12. **🔄 式評価**: 再帰的な数式解析と計算
13. **⚠️ 構文チェック**: 括弧バランスとエラー検出

### ユーザーインターフェース

14. **📱 3画面表示**: 数式・結果・状態の分離表示
15. **🎨 関数ヘルプ**: 利用可能な関数の一覧と説明
16. **📚 詳細履歴**: 最大50件の計算履歴管理
17. **📊 統計分析**: 機能別使用回数の詳細追跡

### キーボード操作

18. **⌨️ 完全対応**: 全機能のキーボードショートカット
19. **🔤 関数キー**: S=sin, C=cos, T=tan, Q=√, L=log, P=π
20. **⚡ 高速入力**: Enterで計算、Escapeでクリア

## 🔍 コードの詳細解説

### 数式評価エンジンの実装
```javascript
function evaluateExpression(expression) {
    console.log(`📊 数式評価開始: ${expression}`);
    
    // ステップ1: 前処理（定数置換、記号変換）
    let processedExpression = preprocessExpression(expression);
    console.log(`📊 前処理後: ${processedExpression}`);
    
    // ステップ2: 構文検証（括弧バランスチェック）
    if (!checkBracketBalance(processedExpression)) {
        throw new Error('括弧のバランスが合いません');
    }
    
    // ステップ3: 数式評価（関数展開と計算）
    const result = evaluateProcessedExpression(processedExpression);
    
    // ステップ4: 結果検証（無限大・NaNチェック）
    if (!isFinite(result)) {
        throw new Error('計算結果が無限大または非数値です');
    }
    
    return result;
}

function preprocessExpression(expression) {
    let processed = expression;
    
    // 数学定数の数値への置換
    processed = processed.replace(/π/g, Math.PI.toString());
    processed = processed.replace(/e/g, Math.E.toString());
    
    // 表示用記号を JavaScript用に変換
    processed = processed.replace(/×/g, '*');
    processed = processed.replace(/÷/g, '/');
    processed = processed.replace(/\^/g, '**');
    
    return processed;
}
```

### 関数処理の高度な実装
```javascript
function evaluateProcessedExpression(expression) {
    let processed = expression;
    
    // 三角関数の段階的処理
    processed = processed.replace(/sin\(([^)]+)\)/g, (match, p1) => {
        const angle = evaluateProcessedExpression(p1); // 再帰的評価
        const radian = angleMode === 'DEG' ? angle * Math.PI / 180 : angle;
        return Math.sin(radian).toString();
    });
    
    processed = processed.replace(/cos\(([^)]+)\)/g, (match, p1) => {
        const angle = evaluateProcessedExpression(p1);
        const radian = angleMode === 'DEG' ? angle * Math.PI / 180 : angle;
        return Math.cos(radian).toString();
    });
    
    // 対数関数（エラーハンドリング付き）
    processed = processed.replace(/log\(([^)]+)\)/g, (match, p1) => {
        const value = evaluateProcessedExpression(p1);
        if (value <= 0) {
            throw new Error('対数の引数は正の数である必要があります');
        }
        return Math.log10(value).toString();
    });
    
    processed = processed.replace(/ln\(([^)]+)\)/g, (match, p1) => {
        const value = evaluateProcessedExpression(p1);
        if (value <= 0) {
            throw new Error('自然対数の引数は正の数である必要があります');
        }
        return Math.log(value).toString();
    });
    
    // 平方根（負数保護付き）
    processed = processed.replace(/sqrt\(([^)]+)\)/g, (match, p1) => {
        const value = evaluateProcessedExpression(p1);
        if (value < 0) {
            throw new Error('平方根の引数は非負である必要があります');
        }
        return Math.sqrt(value).toString();
    });
    
    // JavaScript のevalを安全に使用
    try {
        return Function('"use strict"; return (' + processed + ')')();
    } catch (error) {
        throw new Error('数式の評価に失敗しました');
    }
}
```

### 括弧システムの実装
```javascript
function checkBracketBalance(expression) {
    let balance = 0;
    let position = 0;
    
    for (let char of expression) {
        if (char === '(') {
            balance++;
        } else if (char === ')') {
            balance--;
            if (balance < 0) {
                throw new Error(`位置 ${position} で閉じ括弧が多すぎます`);
            }
        }
        position++;
    }
    
    if (balance > 0) {
        throw new Error(`${balance} 個の開き括弧が閉じられていません`);
    }
    
    return balance === 0;
}

function inputBracket(bracket) {
    console.log(`📖 括弧入力: ${bracket}`);
    
    // 新しい入力を待っている場合の特殊処理
    if (waitingForNewInput && bracket === '(') {
        currentExpression = '';
        waitingForNewInput = false;
    }
    
    // 括弧の自動補完ロジック（オプション）
    if (bracket === '(' && shouldAutoCloseBracket()) {
        currentExpression += '()';
        // カーソルを括弧内に移動（UI実装時）
    } else {
        currentExpression += bracket;
    }
    
    // 統計更新
    bracketUsageCount++;
    updateBracketCount();
    updateDisplays();
    updateStatus(`括弧 "${bracket}" を入力`);
    
    console.log(`✅ 現在の式: ${currentExpression}`);
}
```

### 高度なキーボードハンドリング
```javascript
document.addEventListener('keydown', function(event) {
    const key = event.key;
    const shiftKey = event.shiftKey;
    const ctrlKey = event.ctrlKey;
    
    // 修飾キーとの組み合わせ
    if (ctrlKey) {
        if (key === 'h') {
            clearHistory();
            event.preventDefault();
            return;
        }
        if (key === 'r') {
            toggleAngleMode();
            event.preventDefault();
            return;
        }
    }
    
    // 基本入力
    if (key >= '0' && key <= '9') {
        inputNumber(parseInt(key));
        event.preventDefault();
    }
    // 演算子
    else if (['+', '-', '*', '/'].includes(key)) {
        inputOperator(key);
        event.preventDefault();
    }
    // 関数ショートカット
    else if (key.toLowerCase() === 's') {
        inputFunction('sin');
        event.preventDefault();
    } else if (key.toLowerCase() === 'c') {
        inputFunction('cos');
        event.preventDefault();
    }
    // 特殊キー
    else if (key === 'Enter' || key === '=') {
        calculate();
        event.preventDefault();
    } else if (key === 'Escape') {
        clearAll();
        event.preventDefault();
    }
    
    // キー入力の記録（デバッグ用）
    console.log(`⌨️ キー入力: ${key}${shiftKey ? ' + Shift' : ''}${ctrlKey ? ' + Ctrl' : ''}`);
});
```

### カスタム数式入力システム
```javascript
function evaluateCustomExpression() {
    const expression = customExpressionInput.value.trim();
    
    if (!expression) {
        updateStatus('❌ 数式を入力してください');
        return;
    }
    
    console.log(`📖 カスタム数式評価: ${expression}`);
    
    try {
        // メイン評価エンジンを使用
        const result = evaluateExpression(expression);
        
        // 結果をメイン表示に反映
        currentResult = result;
        mainDisplay.textContent = formatResult(result);
        expressionDisplay.textContent = `${expression} =`;
        currentExpression = '';
        
        // 履歴と統計の更新
        addToHistory(expression, result);
        calculationCount++;
        updateCalculationCount();
        updateStatus(`✅ カスタム計算完了: ${formatResult(result)}`);
        
        // UI状態のリセット
        customExpressionInput.value = '';
        waitingForNewInput = true;
        
        console.log(`✅ カスタム計算完了: ${result}`);
        
    } catch (error) {
        console.error('❌ カスタム計算エラー:', error.message);
        showError(error.message);
        errorCount++;
        updateErrorCount();
    }
}

// Enter キーでの即座実行
customExpressionInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        evaluateCustomExpression();
        event.preventDefault();
    }
});
```

### 精密な数値フォーマット
```javascript
function formatResult(result) {
    // 極小値は0として表示
    if (Math.abs(result) < 1e-10) {
        return '0';
    }
    
    // 極大値は指数表記
    if (Math.abs(result) > 1e10) {
        return result.toExponential(6);
    }
    
    // 通常の値は適切な精度で表示
    const formatted = parseFloat(result.toPrecision(12));
    
    // 不要な小数点以下の0を除去
    return formatted.toString();
}

// より高度なフォーマットオプション
function formatResultAdvanced(result) {
    const absResult = Math.abs(result);
    
    if (absResult === 0) return '0';
    if (absResult < 1e-10) return '≈ 0';
    if (absResult > 1e15) return result.toExponential(6);
    if (absResult > 1e10) return result.toPrecision(6);
    
    // 整数の場合
    if (Number.isInteger(result)) {
        return result.toString();
    }
    
    // 小数の場合（最大12桁精度）
    return parseFloat(result.toPrecision(12)).toString();
}
```

## 🏃‍♀️ 実行方法

1. `index.html`をブラウザで開く
2. 基本計算機能で動作を確認（数字、四則演算）
3. 三角関数を試す（例：sin(30) = 0.5）
4. 角度モードを切り替えてsin(π/6)を計算
5. 括弧計算を試す（例：(2+3)×(4-1)）
6. カスタム数式で複雑な計算（例：sqrt(sin(45)^2 + cos(45)^2)）
7. キーボードショートカットを試す（S、C、T、Qなど）
8. 履歴機能で過去の計算を確認
9. 統計情報で使用パターンを分析
10. エラーケースで堅牢性を確認（例：log(-1)、sqrt(-1)）

## ✅ 確認ポイント

このステップが完了したら、以下を確認してください：

- [ ] sin、cos、tanボタンで三角関数計算ができる
- [ ] 角度モードボタンでDEG/RADが切り替わる
- [ ] log、lnボタンで対数計算ができる
- [ ] √ボタンで平方根計算ができる
- [ ] ^ボタンでべき乗計算ができる
- [ ] x²ボタンで二乗計算ができる
- [ ] πボタンで円周率が入力される
- [ ] ()括弧で複雑な数式が計算できる
- [ ] カスタム数式入力で一括計算ができる
- [ ] キーボードショートカットが全て動作する
- [ ] エラー時に適切なメッセージが表示される
- [ ] 計算履歴が詳細に記録される
- [ ] 統計情報が機能別に更新される

### 期待される動作例
- **三角関数**: sin(30) = 0.5、cos(60) = 0.5、tan(45) = 1
- **対数計算**: log(100) = 2、ln(e) = 1
- **括弧計算**: (2+3)×(4+1) = 25
- **複合関数**: sqrt(sin(30)^2 + cos(30)^2) = 1
- **カスタム数式**: "sin(π/4) + cos(π/4)" = 1.414...

## 🎨 試してみよう

慣れてきたら、以下にチャレンジしてみましょう：

1. **高度な三角関数計算**
   ```
   数学問題例：
   sin(30°) + cos(60°) = ?     (答え: 1)
   tan(45°) × tan(45°) = ?     (答え: 1)
   sin²(x) + cos²(x) = ?       (答え: 1, 任意のx)
   ```

2. **対数と指数の計算**
   ```
   実用計算例：
   log(1000) = ?               (答え: 3)
   ln(e^2) = ?                 (答え: 2)
   10^(log(50)) = ?            (答え: 50)
   ```

3. **複雑な数式の入力**
   ```
   科学計算例：
   sqrt(2^2 + 3^2)             (ピタゴラスの定理)
   sin(π/6) + cos(π/3)         (三角関数の加算)
   log(10^3) × ln(e^2)         (対数の乗算)
   ```

4. **キーボードショートカットの習得**
   ```
   効率操作：
   S → 3 → 0 → ) → Enter       (sin(30)を高速入力)
   Q → ( → 1 → 6 → ) → Enter   (sqrt(16)を高速入力)
   P → / → 4 → Enter           (π/4を高速入力)
   ```

## 💡 実世界での応用例

この高度な計算機技術は以下で活用されます：

### 科学・工学分野
- **物理計算**: 波動方程式、電気回路、力学計算
- **化学計算**: 濃度計算、反応速度、平衡定数
- **統計解析**: 正規分布、相関係数、回帰分析
- **建築・土木**: 構造計算、測量計算、材料力学

### 教育システム
- **数学教育**: 三角関数、対数、指数の学習支援
- **物理実験**: 実験データの解析と理論値比較
- **工学教育**: 回路設計、制御理論の実習
- **プログラミング教育**: アルゴリズムと数値計算

### ビジネス・金融
- **金融工学**: 複利計算、リスク評価、デリバティブ
- **データ分析**: 統計処理、予測モデル、最適化
- **品質管理**: 統計的品質管理、シックスシグマ
- **市場調査**: 回帰分析、相関分析、予測計算

### ゲーム・エンターテインメント
- **3Dグラフィックス**: 座標変換、回転行列、投影計算
- **物理エンジン**: 衝突判定、重力計算、軌道計算
- **AI・機械学習**: ニューラルネットワーク、最適化アルゴリズム
- **音響処理**: フーリエ変換、フィルタ設計、音響解析

## 📈 計算機段階の完了

おめでとうございます！高度な計算機の実装をマスターしました！🎉

これで**計算機段階（18.1-18.3）**の全ステップが完了しました。基本的な四則演算から関数電卓レベルの科学計算まで、計算機アプリケーション開発の全領域を習得しました。

---

**💡 高度計算機システムの完全習得**

今日学んだ高度計算機は、プログラミングと数学の融合した最高レベルの実装です。数式解析、関数処理、エラーハンドリング、ユーザーインターフェース—これらすべてを専門レベルで実装する力を身につけました。

基本計算から三角関数、対数計算から数式パーサー、シンプルなボタンから完全なキーボード対応まで。あなたは本格的な科学計算ソフトウェアを作れる開発者になりました。

**複雑な数学アルゴリズムを実装する力。**  
**堅牢で使いやすいユーザーインターフェースを設計する技術。**  
**科学技術計算の要求に応える専門性。**

これらのスキルは、計算機を超えて、科学技術ソフトウェア、データ分析ツール、教育システム、ゲームエンジンなど、あらゆる高度なアプリケーション開発で活用できる専門的な力です。

**あなたは高度計算機システムを完全にマスターしました！** 🚀

## 🎓 計算機段階 完全修了

ステップ18.1から18.3まで、お疲れ様でした！

あなたが習得したスキル：
- ✅ 基本計算機（18.1）: 四則演算とクリア機能
- ✅ 中級計算機（18.2）: メモリ・履歴・パーセント
- ✅ 高度計算機（18.3）: 関数電卓・括弧・数式解析

**あなたは計算機開発のプロフェッショナルです。**

次のステップでは、これまでの全ての知識を統合した実用的なWebアプリケーション開発に挑戦します！

**計算機マスターの栄誉を称えます！** ✨🏆