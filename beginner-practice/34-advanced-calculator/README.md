# ステップ18.2 - 中級計算機

## 🎯 学習目標

**実用的な計算機機能の実装とデータ管理**

- メモリ機能（M+、M-、MR、MC、MS）の実装を学ぶ
- 計算履歴システムの構築と表示を理解する
- パーセント計算の仕組みと実装方法を習得する
- 複雑なUIレイアウトとデータの連携を実装する

## 📖 このステップの内容

### 🔄 中級計算機の概念

このステップでは、基本計算機から**実用的な機能を追加した中級計算機**を学習します。

18.1の基本機能から、**メモリ管理、履歴保存、パーセント計算**などの実用的な機能へとレベルアップします。

中級計算機は「データの永続化、複雑な操作の履歴管理、高度な数学計算」を通じて、実際のビジネスアプリケーションに近い複雑さを持ちます。

### 📝 学習ポイント

#### 1. メモリ機能の実装
```javascript
// メモリ変数の管理
let memory = 0;

// メモリストア（MS）- 現在値をメモリに保存
function memoryStore() {
    memory = parseFloat(currentInput);
    updateMemoryDisplay();
}

// メモリリコール（MR）- メモリの値を呼び出し
function memoryRecall() {
    currentInput = memory.toString();
    updateMainDisplay();
}

// メモリ加算（M+）- メモリに現在値を加算
function memoryAdd() {
    memory += parseFloat(currentInput);
    updateMemoryDisplay();
}

// メモリ減算（M-）- メモリから現在値を減算
function memorySubtract() {
    memory -= parseFloat(currentInput);
    updateMemoryDisplay();
}
```

#### 2. 計算履歴システム
```javascript
// 履歴データの管理
let calculationHistory = [];

// 履歴への追加
function addToHistory(expression, result) {
    const historyItem = {
        expression: expression,
        result: result,
        timestamp: new Date().toLocaleTimeString()
    };
    
    calculationHistory.unshift(historyItem);
    
    // 最大20件まで保持
    if (calculationHistory.length > 20) {
        calculationHistory = calculationHistory.slice(0, 20);
    }
    
    updateHistoryDisplay();
}
```

#### 3. パーセント計算
```javascript
function percentage() {
    const current = parseFloat(currentInput);
    
    if (operator && previousInput !== null) {
        // 演算子がある場合：文脈に応じた計算
        let result;
        switch (operator) {
            case '+':
            case '-':
                // 100の20%増し → 100 + (100 * 20 / 100)
                result = (previousInput * current) / 100;
                break;
            case '*':
            case '/':
                // 100 × 20% → 100 × (20 / 100)
                result = current / 100;
                break;
        }
        currentInput = result.toString();
    } else {
        // 単純な百分率変換
        const result = current / 100;
        currentInput = result.toString();
    }
    
    updateMainDisplay();
}
```

#### 4. 高度なUI管理
```javascript
// 複数ディスプレイの同期
function updateAllDisplays() {
    updateMainDisplay();           // メイン表示
    updateSecondaryDisplay();      // 数式表示
    updateMemoryDisplay();         // メモリ状態
    updateHistoryDisplay();        // 履歴表示
    updateStatistics();            // 統計情報
}

// グリッドレイアウトによる複雑なUI
.calculator-container {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 20px;
}

.buttons-section {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
}
```

#### 5. 符号変更機能
```javascript
function toggleSign() {
    if (currentInput !== '0') {
        if (currentInput.startsWith('-')) {
            currentInput = currentInput.substring(1);
        } else {
            currentInput = '-' + currentInput;
        }
    }
    updateMainDisplay();
}
```

## 🧮 実装された機能

### メモリ管理システム

1. **💾 メモリストア（MS）**: 現在の値をメモリに保存
2. **📤 メモリリコール（MR）**: メモリの値を表示に呼び出し
3. **➕ メモリ加算（M+）**: メモリに現在値を加算
4. **➖ メモリ減算（M-）**: メモリから現在値を減算
5. **🗑️ メモリクリア（MC）**: メモリを0にリセット

### 履歴管理システム

6. **📝 計算履歴**: 実行した計算式と結果を自動保存
7. **🕐 タイムスタンプ**: 各計算の実行時刻を記録
8. **🔄 履歴選択**: クリックで過去の結果を表示に設定
9. **🗑️ 履歴クリア**: 全ての履歴を一括削除
10. **📊 履歴制限**: 最大20件の履歴を自動管理

### 高度な計算機能

11. **📈 パーセント計算**: 文脈に応じた%計算の自動判定
12. **±️ 符号変更**: 正負の符号をワンクリックで切替
13. **🔄 連続計算**: 演算子を続けて押した場合の自動計算
14. **🎯 精度管理**: 浮動小数点数の精度問題を自動補正

### UI・UX機能

15. **📱 レスポンシブ**: モバイルデバイスに自動対応
16. **🖥️ 2画面表示**: メイン表示と数式表示の分離
17. **📊 統計表示**: 各機能の使用回数を詳細記録
18. **⌨️ キーボード拡張**: %キーを含む全機能のショートカット

## 🔍 コードの詳細解説

### メモリシステムの実装
```javascript
// メモリ状態の管理
let memory = 0;
let memoryUsageCount = 0;

// メモリ表示の動的更新
function updateMemoryDisplay() {
    memoryDisplay.textContent = memory;
    
    // メモリに値がある場合は視覚的に強調
    if (memory !== 0) {
        memoryDisplay.style.backgroundColor = '#e3f2fd';
        memoryDisplay.style.color = '#1976d2';
    } else {
        memoryDisplay.style.backgroundColor = '#f8f9fa';
        memoryDisplay.style.color = '#495057';
    }
}

// メモリ機能の統一的な処理
function memoryAdd() {
    console.log('📖 メモリ加算実行');
    
    const current = parseFloat(currentInput);
    memory += current;
    
    updateMemoryDisplay();
    memoryUsageCount++;
    updateMemoryUsage();
    updateButtonCount();
    updateStatus(`💾 メモリ加算: +${current} = ${memory}`);
    
    console.log(`✅ メモリ加算完了: ${memory}`);
}
```

### 履歴システムの高度な実装
```javascript
// 履歴データ構造
let calculationHistory = [];

// 履歴アイテムの構造化
function addToHistory(expression, result) {
    const historyItem = {
        expression: expression,    // 計算式
        result: result,           // 結果
        timestamp: new Date().toLocaleTimeString() // 時刻
    };
    
    // 最新を先頭に追加（LIFO）
    calculationHistory.unshift(historyItem);
    
    // 履歴サイズの制限管理
    if (calculationHistory.length > 20) {
        calculationHistory = calculationHistory.slice(0, 20);
    }
    
    updateHistoryDisplay();
    console.log('✅ 履歴追加:', historyItem);
}

// 履歴の動的表示生成
function updateHistoryDisplay() {
    historyList.innerHTML = '';
    
    if (calculationHistory.length === 0) {
        const emptyItem = document.createElement('div');
        emptyItem.className = 'history-item';
        emptyItem.innerHTML = '<span class="history-expression">履歴はここに表示されます</span>';
        historyList.appendChild(emptyItem);
        return;
    }
    
    calculationHistory.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <span class="history-expression">${item.expression}</span>
            <span class="history-result">${item.result}</span>
        `;
        
        // インタラクティブな履歴選択機能
        historyItem.style.cursor = 'pointer';
        historyItem.onclick = () => {
            currentInput = item.result.toString();
            updateMainDisplay();
            updateStatus(`履歴から選択: ${item.result}`);
        };
        
        historyList.appendChild(historyItem);
    });
}
```

### パーセント計算の智的判定
```javascript
function percentage() {
    console.log('📖 パーセント計算');
    
    const current = parseFloat(currentInput);
    
    if (operator && previousInput !== null) {
        // 文脈に応じた智的な%計算
        let result;
        switch (operator) {
            case '+':
            case '-':
                // 価格の%増減: 100 + 20% = 100 + (100 * 0.2)
                result = (previousInput * current) / 100;
                break;
            case '*':
            case '/':
                // 率計算: 100 × 20% = 100 × 0.2
                result = current / 100;
                break;
            default:
                result = current / 100;
        }
        currentInput = result.toString();
    } else {
        // 単純な%変換: 20% = 0.2
        const result = current / 100;
        currentInput = result.toString();
    }
    
    updateMainDisplay();
    percentUsageCount++;
    updatePercentUsage();
    updateButtonCount();
    updateStatus(`パーセント計算: ${current}% = ${currentInput}`);
    
    console.log(`✅ パーセント計算完了: ${currentInput}`);
}
```

### 統計システムの包括的な管理
```javascript
// 統計データの管理
let calculationCount = 0;      // 計算実行回数
let buttonClickCount = 0;      // 全ボタンクリック数
let memoryUsageCount = 0;      // メモリ機能使用回数
let percentUsageCount = 0;     // パーセント計算使用回数

// 統計更新の統一化
function updateButtonCount() {
    buttonClickCount++;
    buttonCountElement.textContent = buttonClickCount;
}

function updateCalculationCount() {
    calculationCountElement.textContent = calculationCount;
}

function updateMemoryUsage() {
    memoryUsageElement.textContent = memoryUsageCount;
}

function updatePercentUsage() {
    percentUsageElement.textContent = percentUsageCount;
}
```

### レスポンシブレイアウトの実装
```css
/* デスクトップレイアウト */
.calculator-container {
    display: grid;
    grid-template-columns: 1fr 350px;  /* メイン + サイドパネル */
    gap: 20px;
}

/* モバイル対応 */
@media (max-width: 768px) {
    .calculator-container {
        grid-template-columns: 1fr;  /* 縦一列に変更 */
    }
    
    .buttons-section {
        grid-template-columns: 1fr;  /* ボタン領域も縦一列 */
    }
    
    .advanced-buttons {
        grid-template-columns: repeat(4, 1fr);  /* 高度ボタンは横4列維持 */
    }
}
```

## 🏃‍♀️ 実行方法

1. `index.html`をブラウザで開く
2. 基本計算機能を確認（数字、四則演算、=）
3. メモリ機能を体験（MS、MR、M+、M-、MC）
4. パーセント計算を試す（例：100 + 20% = 120）
5. 符号変更ボタン（±）を試す
6. 計算履歴の蓄積と選択機能を確認
7. 統計情報の変化を観察
8. モバイル表示での動作を確認（画面サイズ変更）
9. キーボードショートカット（%キー含む）を試す
10. 開発者ツール（F12）でConsoleタブの詳細ログを確認

## ✅ 確認ポイント

このステップが完了したら、以下を確認してください：

- [ ] MSボタンで現在値がメモリに保存される
- [ ] MRボタンでメモリの値が表示される
- [ ] M+ボタンでメモリに値が加算される
- [ ] M-ボタンでメモリから値が減算される
- [ ] MCボタンでメモリがクリアされる
- [ ] メモリ表示エリアに現在のメモリ値が表示される
- [ ] %ボタンでパーセント計算が正しく動作する
- [ ] ±ボタンで符号が切り替わる
- [ ] 計算履歴が右パネルに表示される
- [ ] 履歴アイテムをクリックすると値が表示に設定される
- [ ] 履歴クリアボタンで履歴がすべて削除される
- [ ] 統計情報が各機能の使用に応じて更新される
- [ ] 画面サイズを変更するとレスポンシブに対応する
- [ ] キーボードの%キーでパーセント計算が実行される

### 期待される動作例
- **メモリ操作**: 「123 MS」→「456 M+」→「MR」で579が表示される
- **パーセント計算**: 「100 + 20%」で120が表示される
- **履歴機能**: 計算実行後に右パネルに「100 + 20 = 120」が追加される
- **符号変更**: 「123 ±」で-123が表示される
- **連続計算**: 「10 + 5 + 3 =」で18が表示され、途中計算も履歴に残る

## 🎨 試してみよう

慣れてきたら、以下にチャレンジしてみましょう：

1. **メモリを使った複雑な計算**
   ```
   計算例：
   123.45 MS          // メモリに保存
   67.89 M+           // メモリに加算（191.34）
   MR × 2 =           // メモリ値の2倍（382.68）
   ```

2. **パーセント計算の応用**
   ```
   実用例：
   1000 + 8% =        // 消費税計算（1080）
   5000 - 20% =       // 割引計算（4000）
   150 × 30% =        // 歩合計算（45）
   ```

3. **履歴を活用した検証**
   ```
   検証手順：
   1. 複数の計算を実行
   2. 履歴で過去の結果を確認
   3. 履歴から値を選択して再計算
   4. 履歴クリアで初期化
   ```

4. **統計情報の確認**
   ```
   分析項目：
   - どの機能を最も多く使うか
   - メモリ機能の利用頻度
   - パーセント計算の使用パターン
   - 全体の操作効率性
   ```

## 💡 実世界での応用例

この中級計算機技術は以下で活用されます：

### ビジネスアプリケーション
- **売上管理**: 月間売上、前年比、成長率の計算
- **在庫計算**: 入荷数量、出荷数量、残高の管理
- **価格計算**: 原価、利益率、販売価格の算出
- **予算管理**: 予算、実績、差異の分析

### 家計管理アプリ
- **家計簿**: 収入、支出、残高の記録
- **ローン計算**: 元本、金利、返済額の計算
- **貯蓄計画**: 目標金額、月額積立、達成期間
- **投資計算**: 元本、利回り、複利効果

### 教育システム
- **数学学習**: 段階的な計算問題の提供
- **統計分析**: 成績データの集計と分析
- **進度管理**: 学習時間、正解率、習熟度
- **個人レポート**: 学習履歴と成果の可視化

### ECサイト・ショッピングカート
- **商品価格計算**: 単価、数量、小計の自動計算
- **割引計算**: クーポン、セール価格、会員割引
- **配送料計算**: 重量、距離、配送オプション
- **税金計算**: 消費税、地方税、海外税の自動適用

## 📈 次のステップへ

おめでとうございます！中級計算機の実装をマスターしました！🎉

これで**計算機段階**の第2ステップが完了しました。次は**ステップ18.3 - 高度な計算機**に進み、関数電卓レベルの数学関数、括弧計算、キーボード完全対応などの専門的な機能を実装します。

---

**💡 中級計算機システムの習得完了**

今日学んだ中級計算機は、実用的なアプリケーション開発の重要な要素を全て含んでいます。データの永続化、複雑なUI管理、ユーザーエクスペリエンスの向上—これらすべてを実践的な形で実装する力を身につけました。

メモリ管理から履歴システム、パーセント計算から統計管理まで。あなたは本格的な計算アプリケーションを作れる開発者になりました。

**複雑な状態を適切に管理する力。**  
**ユーザーのワークフローを理解し、支援する思考力。**  
**実用性と使いやすさを両立させる技術。**

これらのスキルは、計算機だけでなく、あらゆる業務システム、管理アプリケーション、データ処理システムで活用できる普遍的な力です。

**あなたは中級計算機の力をマスターしました！** 🚀