# ステップ18.1 - 基本計算機

## 🎯 学習目標

**基本的な計算機の実装と数値処理の基礎**

- 四則演算（+、-、×、÷）の基本実装を学ぶ
- 数字入力システムとディスプレイ表示を理解する
- クリア機能（C、CE）の違いと実装方法を習得する
- 基本的なエラーハンドリング（0除算など）を実装する

## 📖 このステップの内容

### 🧮 基本計算機の概念

このステップでは、**計算機**という身近で実用的なアプリケーションを通じて、JavaScriptの数値処理と状態管理を学習します。

これまで学んだ関数とオブジェクトの知識から、**実用的なアプリケーション開発**へとレベルアップします。

計算機は「ユーザーの入力を受け取り、処理し、結果を表示する」という基本的なアプリケーションパターンの完璧な例です。

### 📝 学習ポイント

#### 1. 四則演算の基本実装
```javascript
// 各演算子の処理
switch (operator) {
    case '+':
        result = prev + current;
        break;
    case '-':
        result = prev - current;
        break;
    case '*':
        result = prev * current;
        break;
    case '/':
        if (current === 0) {
            throw new Error('0で割ることはできません');
        }
        result = prev / current;
        break;
}
```

#### 2. 数字入力システム
```javascript
function inputNumber(number) {
    if (waitingForNewInput) {
        currentInput = number.toString();
        waitingForNewInput = false;
    } else {
        if (currentInput === '0') {
            currentInput = number.toString();
        } else {
            currentInput += number.toString();
        }
    }
}
```

#### 3. 状態管理
```javascript
// 計算機の主要な状態
let currentInput = '0';      // 現在の入力値
let previousInput = null;    // 前の値（演算子の左側）
let operator = null;         // 選択された演算子
let waitingForNewInput = false; // 新しい入力待ち状態
```

#### 4. クリア機能の実装
```javascript
// 全クリア（C）- すべてをリセット
function clearAll() {
    currentInput = '0';
    previousInput = null;
    operator = null;
    waitingForNewInput = false;
}

// エントリークリア（CE）- 現在の入力のみクリア
function clearEntry() {
    currentInput = '0';
    waitingForNewInput = false;
}
```

#### 5. エラーハンドリング
```javascript
function performCalculation() {
    try {
        // 計算処理
        switch (operator) {
            case '/':
                if (current === 0) {
                    throw new Error('0で割ることはできません');
                }
                result = prev / current;
                break;
            // その他の演算子...
        }
        return result;
    } catch (error) {
        showError(error.message);
        return null;
    }
}
```

## 🧮 実装された機能

### 基本計算機能

1. **🔢 数字入力**: 0-9の数字ボタンによる入力システム
2. **➕ 四則演算**: 加算、減算、乗算、除算の基本演算
3. **🔘 小数点**: 小数点を含む数値の入力と計算
4. **📟 ディスプレイ**: 計算結果と入力値のリアルタイム表示

### クリア機能

5. **🔄 全クリア（C）**: 計算機の完全な初期化
6. **⬅️ エントリークリア（CE）**: 現在の入力値のみをクリア

### ユーザビリティ機能

7. **⌨️ キーボード対応**: 数字キー、演算子キー、Enterキーでの操作
8. **📊 統計表示**: 計算回数、ボタンクリック回数の記録
9. **📝 状態表示**: 現在の操作状況のリアルタイム表示
10. **⚠️ エラー表示**: 不正な操作時の分かりやすいエラーメッセージ

## 🔍 コードの詳細解説

### 計算機の状態管理システム
```javascript
// グローバル変数での状態管理
let currentInput = '0';         // 現在ディスプレイに表示される値
let previousInput = null;       // 演算子の左オペランド
let operator = null;            // 現在選択されている演算子
let waitingForNewInput = false; // 次の数字入力で新しい数値を開始するか

// 統計情報の管理
let calculationCount = 0;       // 計算実行回数
let buttonClickCount = 0;       // ボタンクリック総数
```

### 数字入力の高度な処理
```javascript
function inputNumber(number) {
    console.log(`📖 数字入力: ${number}`);
    
    // 新しい数値入力を待っている場合
    if (waitingForNewInput) {
        currentInput = number.toString();
        waitingForNewInput = false;
    } else {
        // 既存の入力に追加
        if (currentInput === '0') {
            // 先頭の0を置き換え（ただし0.xxxの場合は除く）
            currentInput = number.toString();
        } else {
            // 既存の数値に桁を追加
            currentInput += number.toString();
        }
    }
    
    updateDisplay();
    updateButtonCount();
    updateStatus(`数字 "${number}" を入力しました`);
    
    console.log(`✅ 現在の入力: ${currentInput}`);
}
```

### 演算子処理と連続計算
```javascript
function inputOperator(op) {
    console.log(`📖 演算子入力: ${op}`);
    
    const current = parseFloat(currentInput);
    
    if (previousInput === null) {
        // 最初の数値を設定
        previousInput = current;
    } else if (operator && !waitingForNewInput) {
        // 連続計算の実行
        const result = performCalculation();
        if (result === null) return; // エラー時は処理中止
        
        currentInput = result.toString();
        previousInput = result;
        updateDisplay();
        calculationCount++;
        updateCalculationCount();
    }
    
    operator = op;
    waitingForNewInput = true;
    
    const operatorNames = {
        '+': '足し算', '-': '引き算', 
        '*': '掛け算', '/': '割り算'
    };
    
    updateStatus(`${operatorNames[op]}を選択しました`);
}
```

### エラーハンドリングシステム
```javascript
function performCalculation() {
    const prev = previousInput;
    const current = parseFloat(currentInput);
    
    console.log(`📊 計算実行: ${prev} ${operator} ${current}`);
    
    try {
        let result;
        switch (operator) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/':
                if (current === 0) {
                    throw new Error('0で割ることはできません');
                }
                result = prev / current;
                break;
            default:
                throw new Error('不明な演算子です');
        }
        
        // 浮動小数点の精度問題を解決
        result = Math.round(result * 10000000000) / 10000000000;
        
        return result;
    } catch (error) {
        console.error('❌ 計算エラー:', error.message);
        showError(error.message);
        return null;
    }
}

function showError(message) {
    display.textContent = `エラー: ${message}`;
    display.classList.add('error');
    
    // 3秒後に自動復旧
    setTimeout(() => {
        clearAll();
    }, 3000);
}
```

### キーボードサポート
```javascript
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // 数字キー（0-9）
    if (key >= '0' && key <= '9') {
        inputNumber(parseInt(key));
        event.preventDefault();
    }
    // 演算子キー
    else if (['+', '-', '*', '/'].includes(key)) {
        inputOperator(key);
        event.preventDefault();
    }
    // 特殊キー
    else if (key === 'Enter' || key === '=') {
        calculate();
        event.preventDefault();
    } else if (key === 'Escape') {
        clearAll();
        event.preventDefault();
    } else if (key === 'Backspace') {
        clearEntry();
        event.preventDefault();
    } else if (key === '.') {
        inputDecimal();
        event.preventDefault();
    }
});
```

## 🏃‍♀️ 実行方法

1. `index.html`をブラウザで開く
2. 計算機のボタンをクリックして基本操作を確認する
3. キーボードからの数字・演算子入力を試す
4. エラー処理を確認する（例：5÷0を実行）
5. CとCEボタンの違いを体験する
6. 統計情報の変化を確認する
7. 開発者ツール（F12）でConsoleタブのログを確認

## ✅ 確認ポイント

このステップが完了したら、以下を確認してください：

- [ ] 数字ボタン（0-9）で正しく数値入力できる
- [ ] 小数点ボタンで小数を入力できる
- [ ] 四則演算（+、-、×、÷）が正しく動作する
- [ ] イコール（=）ボタンで計算結果が表示される
- [ ] Cボタンで全ての値がリセットされる
- [ ] CEボタンで現在の入力のみがクリアされる
- [ ] 0で割った時にエラーメッセージが表示される
- [ ] キーボードから数字と演算子で操作できる
- [ ] 統計情報（計算回数、ボタンクリック回数）が更新される
- [ ] 操作状況が下部に表示される

### 期待される動作例
- **基本計算**: 「5 + 3 =」で8が表示される
- **連続計算**: 「10 + 5 - 3 =」で12が表示される
- **小数計算**: 「3.5 × 2 =」で7が表示される
- **エラー処理**: 「10 ÷ 0 =」で「エラー: 0で割ることはできません」が表示される
- **クリア機能**: Cで完全リセット、CEで入力のみクリア

## 🎨 試してみよう

慣れてきたら、以下にチャレンジしてみましょう：

1. **複雑な計算**
   ```
   計算例：
   123.45 + 67.89 = ?
   999 ÷ 3 ÷ 3 = ?  (連続計算)
   0.1 + 0.2 = ?    (浮動小数点の精度)
   ```

2. **エラーケースの確認**
   ```
   エラー例：
   - 5 ÷ 0 を実行
   - 演算子を連続で押す
   - 小数点を複数回押す
   ```

3. **キーボード操作**
   ```
   キーボードショートカット：
   - 数字キー: 0-9
   - 演算子: +, -, *, /
   - Enter: 計算実行
   - Escape: 全クリア
   - Backspace: エントリークリア
   ```

4. **開発者ツールでの確認**
   ```javascript
   // コンソールでの状態確認
   console.log('現在の入力:', currentInput);
   console.log('前の値:', previousInput);
   console.log('演算子:', operator);
   console.log('計算回数:', calculationCount);
   ```

## 💡 実世界での応用例

この基本計算機技術は以下で活用されます：

### Webアプリケーション
- **価格計算**: 商品価格、税込み価格、割引計算
- **フォーム計算**: 数量×単価、合計金額の自動計算
- **ダッシュボード**: 売上高、利益率などの数値表示
- **設定画面**: 数値入力とリアルタイム反映

### ビジネスシステム
- **見積もり作成**: 項目別価格計算と総額算出
- **在庫管理**: 入出庫数量の計算と残高更新
- **給与計算**: 基本給、手当、控除額の計算
- **経費精算**: 交通費、会議費などの合計計算

### ゲーム開発
- **スコア計算**: ポイント加算、ボーナス計算
- **パラメータ管理**: HP、MP、経験値の増減
- **リソース管理**: アイテム個数、所持金の管理
- **難易度調整**: ダメージ計算、確率計算

### 教育アプリケーション
- **数学学習**: 四則演算の練習問題
- **計算ドリル**: 自動採点システム
- **統計表示**: 正解率、学習進度の可視化
- **理科実験**: 実験データの計算と分析

## 📈 次のステップへ

おめでとうございます！基本計算機の実装をマスターしました！🎉

これで**計算機段階**の第1ステップが完了しました。次は**ステップ18.2 - 中級計算機**に進み、メモリ機能、履歴表示、パーセント計算などの実用的な機能を追加します。

---

**💡 基本計算機システムの習得完了**

今日学んだ基本計算機は、ユーザーインタラクティブアプリケーションの基盤となる重要な概念です。数値処理、状態管理、エラーハンドリング—これらすべてを実用的な形で実装する力を身につけました。

数字入力から四則演算、クリア機能からキーボード対応まで。あなたは計算機アプリケーションを作れる開発者になりました。

**ユーザーの入力を適切に処理する力。**  
**アプリケーションの状態を管理する技術。**  
**エラーを予測し、適切に対応する思考力。**

これらのスキルは、電卓だけでなく、あらゆるインタラクティブWebアプリケーションで活用できる普遍的な力です。

**あなたは基本計算機の力をマスターしました！** 🚀