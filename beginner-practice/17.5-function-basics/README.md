# ステップ17.5 - 関数の定義と呼び出し

## 🎯 学習目標

**関数の基本概念と実装**

- `function`宣言の基本構文と使い方を学ぶ
- アロー関数（ES6記法）の記述方法を習得する
- パラメータ（引数）と戻り値の概念を理解する
- スコープ（変数の有効範囲）の基本を理解する

## 📖 このステップの内容

### ⚡ 関数システムの理解

このステップでは、**関数**という重要なプログラミング概念を学習します。

これまで学んだ基本的なコードから、**再利用可能で整理された処理**へとレベルアップします。

関数は「特定の処理をまとめた箱」のような存在で、必要な時に呼び出して使用できます。

### 📝 学習ポイント

#### 1. function宣言（基本的な書き方）
```javascript
// 最もシンプルな関数
function sayHello() {
    console.log("こんにちは！");
}

// 関数を呼び出す
sayHello(); // "こんにちは！"が出力される
```

#### 2. パラメータ付き関数
```javascript
// パラメータ（引数）を受け取る関数
function greetingWithName(name) {
    console.log("こんにちは、" + name + "さん！");
}

// 異なる値で呼び出し
greetingWithName("田中"); // "こんにちは、田中さん！"
greetingWithName("佐藤"); // "こんにちは、佐藤さん！"
```

#### 3. 戻り値のある関数
```javascript
// 計算結果を返す関数
function calculateSquare(number) {
    const result = number * number;
    return result; // 結果を返す
}

// 戻り値を受け取って使用
let result = calculateSquare(5);
console.log(result); // 25
```

#### 4. アロー関数（ES6の新しい記法）
```javascript
// 従来の関数宣言
function add(a, b) {
    return a + b;
}

// アロー関数での書き方
const add = (a, b) => {
    return a + b;
};

// さらに短縮（1行の場合）
const add = (a, b) => a + b;
```

#### 5. 複数パラメータと複雑な処理
```javascript
function multiCalculation(num1, num2) {
    const addition = num1 + num2;
    const subtraction = num1 - num2;
    const multiplication = num1 * num2;
    const division = num2 !== 0 ? num1 / num2 : 0;
    
    return {
        add: addition,
        sub: subtraction,
        mul: multiplication,
        div: division
    };
}
```

## ⚡ 実装された関数機能

### 6つの関数学習システム

1. **👋 基本関数**: パラメータなし、戻り値なしの最もシンプルな関数
2. **📝 パラメータ付き**: 名前を受け取って個別挨拶を行う関数
3. **🔄 戻り値あり**: 数値を受け取って2乗を計算し結果を返す関数
4. **🏹 アロー関数**: ES6の新記法での関数定義とパラメータ処理
5. **🧮 複数パラメータ**: 2つの数値で四則演算を行う高度な関数
6. **📊 BMI計算システム**: 実用的な計算を行う関数の組み合わせ

### インタラクティブ入力機能

- **名前入力**: パラメータ付き関数で使用する名前
- **年齢入力**: 戻り値関数とアロー関数で使用する数値
- **計算エリア**: 複数パラメータ関数で使用する2つの数値
- **BMI計算**: 身長・体重を入力しての実用計算

### 統計・履歴管理

- **実行統計**: 各関数の呼び出し回数を記録
- **実行履歴**: 関数呼び出しの詳細ログを保存
- **パラメータ記録**: 入力値と結果の組み合わせを追跡
- **リアルタイム表示**: 現在の実行状況を随時更新

## 🔍 コードの詳細解説

### 基本的な関数宣言
```javascript
function basicGreeting() {
    console.log("📖 基本関数を実行中...");
    
    resultDisplay.textContent = "こんにちは！基本関数です！";
    functionStatus.textContent = "✅ 基本関数が実行されました";
    
    console.log("✅ 基本関数実行完了");
}
```

### パラメータを使った関数
```javascript
function greetingWithName(name) {
    console.log(`📖 パラメータ付き関数を実行中... (name: ${name})`);
    
    const message = `こんにちは、${name}さん！`;
    resultDisplay.textContent = message;
    functionStatus.textContent = `✅ ${name}さんに挨拶しました`;
    
    console.log(`✅ パラメータ付き関数実行完了: ${message}`);
    return message; // メッセージを返す
}
```

### 戻り値を持つ関数
```javascript
function calculateSquare(number) {
    console.log(`📖 戻り値関数を実行中... (number: ${number})`);
    
    const result = number * number;
    const message = `${number}の2乗は${result}です`;
    
    resultDisplay.textContent = message;
    functionStatus.textContent = `✅ 計算完了: ${number}² = ${result}`;
    
    console.log(`✅ 戻り値関数実行完了: ${result}`);
    return result; // 計算結果を返す
}
```

### アロー関数の定義と使用
```javascript
const arrowGreeting = (name, age) => {
    console.log(`📖 アロー関数を実行中... (name: ${name}, age: ${age})`);
    
    const message = `${name}さん（${age}歳）、アロー関数からこんにちは！`;
    resultDisplay.textContent = message;
    functionStatus.textContent = `✅ アロー関数で${name}さんに挨拶完了`;
    
    console.log(`✅ アロー関数実行完了: ${message}`);
    return message;
};
```

### 複数パラメータと複雑な処理
```javascript
function multiCalculation(num1, num2) {
    console.log(`📖 複数パラメータ関数を実行中... (num1: ${num1}, num2: ${num2})`);
    
    const addition = num1 + num2;
    const subtraction = num1 - num2;
    const multiplication = num1 * num2;
    const division = num2 !== 0 ? (num1 / num2).toFixed(2) : "計算不可";
    
    const results = {
        addition,
        subtraction,
        multiplication,
        division
    };
    
    // 結果表示
    calcResult.innerHTML = `
        <strong>📊 計算結果:</strong><br>
        足し算: ${num1} + ${num2} = ${addition}<br>
        引き算: ${num1} - ${num2} = ${subtraction}<br>
        掛け算: ${num1} × ${num2} = ${multiplication}<br>
        割り算: ${num1} ÷ ${num2} = ${division}
    `;
    
    return results; // 複数の結果をオブジェクトで返す
}
```

### 関数の組み合わせ（BMI計算システム）
```javascript
// BMI計算の主関数
function calculateBMI(height, weight) {
    const heightInMeters = height / 100; // cm -> m変換
    const bmi = weight / (heightInMeters * heightInMeters);
    return Math.round(bmi * 10) / 10; // 小数点1桁で四捨五入
}

// BMI判定関数
function getBMICategory(bmi) {
    if (bmi < 18.5) return "低体重";
    if (bmi < 25) return "標準体重";
    if (bmi < 30) return "肥満（1度）";
    if (bmi < 35) return "肥満（2度）";
    return "肥満（3度）";
}

// 色判定関数
function getBMIColor(category) {
    const colors = {
        "低体重": "#3498db",
        "標準体重": "#27ae60",
        "肥満（1度）": "#f39c12",
        "肥満（2度）": "#e67e22",
        "肥満（3度）": "#e74c3c"
    };
    return colors[category] || "#7f8c8d";
}

// システム実行関数（複数関数の組み合わせ）
function runBMISystem() {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    
    const bmi = calculateBMI(height, weight);      // BMI計算
    const category = getBMICategory(bmi);          // 判定取得
    const color = getBMIColor(category);           // 色取得
    
    // 結果表示
    bmiResult.innerHTML = `
        <strong>📊 BMI計算結果:</strong><br>
        身長: ${height}cm / 体重: ${weight}kg<br>
        <span style="color: ${color}; font-size: 1.5rem;">BMI: ${bmi}</span><br>
        判定: <span style="color: ${color}; font-weight: bold;">${category}</span>
    `;
    
    return { bmi, category, height, weight };
}
```

### 履歴管理システム
```javascript
function addToHistory(functionName, params, result) {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    
    const timestamp = new Date().toLocaleTimeString();
    const paramsStr = params ? `(${params})` : "()";
    const resultStr = result !== undefined ? ` → ${result}` : "";
    
    historyItem.textContent = `[${timestamp}] ${functionName}${paramsStr}${resultStr}`;
    
    // 最新を上に表示
    historyList.insertBefore(historyItem, historyList.firstChild);
    
    // 10件を超えたら古いものを削除
    if (historyList.children.length > 10) {
        historyList.removeChild(historyList.lastChild);
    }
}
```

## 🏃‍♀️ 実行方法

1. `index.html`をブラウザで開く
2. 6つの関数ボタンをそれぞれ試す
3. 入力フィールドの値を変更してパラメータの影響を確認する
4. BMI計算で身長・体重を変更して実用的な計算を体験する
5. 実行履歴で関数呼び出しの記録を確認する
6. 統計情報で各関数の使用回数を確認する
7. 複数パラメータ関数で四則演算の結果を確認する
8. 開発者ツール（F12）でConsoleタブの詳細ログを確認

## ✅ 確認ポイント

このステップが完了したら、以下を確認してください：

- [ ] 6つの関数ボタンすべてを実行した
- [ ] 基本関数で最もシンプルな関数を理解した
- [ ] パラメータ付き関数で入力値による結果の違いを確認した
- [ ] 戻り値関数で計算結果が返されることを確認した
- [ ] アロー関数の新しい記法を体験した
- [ ] 複数パラメータ関数で四則演算を確認した
- [ ] BMI計算システムで実用的な関数の組み合わせを体験した
- [ ] 実行履歴で関数呼び出しが記録されることを確認した
- [ ] 統計情報が正しく更新されることを確認した
- [ ] コンソールで関数実行の詳細ログを確認した

### 期待される動作例
- **基本関数**: "こんにちは！基本関数です！"が表示される
- **パラメータ付き**: "こんにちは、田中さん！"のように名前が反映される
- **戻り値関数**: "20の2乗は400です"のように計算結果が表示される
- **アロー関数**: "田中さん（25歳）、アロー関数からこんにちは！"が表示される
- **複数パラメータ**: 四則演算の結果が詳細に表示される
- **BMI計算**: BMI値と健康判定が色付きで表示される

## 🎨 試してみよう

慣れてきたら、以下にチャレンジしてみましょう：

1. **独自の挨拶関数**
   ```javascript
   // 開発者ツールのコンソールで実行
   function myGreeting(name, hobby) {
       return `${name}さんの趣味は${hobby}ですね！`;
   }
   
   console.log(myGreeting("田中", "読書"));
   ```

2. **時刻を返す関数**
   ```javascript
   const getCurrentTime = () => {
       const now = new Date();
       return now.toLocaleTimeString();
   };
   
   console.log("現在時刻: " + getCurrentTime());
   ```

3. **条件分岐付き関数**
   ```javascript
   function checkAge(age) {
       if (age >= 20) {
           return "大人です";
       } else {
           return "未成年です";
       }
   }
   
   console.log(checkAge(18)); // "未成年です"
   console.log(checkAge(25)); // "大人です"
   ```

4. **配列を処理する関数**
   ```javascript
   function getArraySum(numbers) {
       let sum = 0;
       for (let num of numbers) {
           sum += num;
       }
       return sum;
   }
   
   const numbers = [1, 2, 3, 4, 5];
   console.log(`配列の合計: ${getArraySum(numbers)}`); // 15
   ```

## 💡 関数の重要な特徴

### 再利用性
```javascript
function greet(name) {
    return `こんにちは、${name}さん！`;
}

// 同じ関数を何度でも使用可能
console.log(greet("田中"));
console.log(greet("佐藤"));
console.log(greet("山田"));
```

### スコープ（変数の有効範囲）
```javascript
let globalVar = "グローバル変数";

function testScope() {
    let localVar = "ローカル変数";
    console.log(globalVar);  // アクセス可能
    console.log(localVar);   // アクセス可能
}

testScope();
console.log(globalVar);  // アクセス可能
// console.log(localVar); // エラー！関数外からはアクセス不可
```

### 関数の引数（パラメータ）
```javascript
// デフォルト引数
function greetWithDefault(name = "ゲスト") {
    return `こんにちは、${name}さん！`;
}

console.log(greetWithDefault());        // "こんにちは、ゲストさん！"
console.log(greetWithDefault("田中"));  // "こんにちは、田中さん！"
```

## 💡 実世界での応用例

この関数技術は以下で活用されます：

### Webアプリケーション
- **入力バリデーション**: ユーザー入力の検証を行う関数
- **データ変換**: APIから取得したデータを画面表示用に変換
- **イベント処理**: ボタンクリックなどのユーザー操作への対応
- **計算処理**: 価格計算、税金計算などのビジネスロジック

### システム開発
- **モジュール化**: 機能ごとに分割された再利用可能なコード
- **エラー処理**: 例外的な状況への対応を標準化
- **データ処理**: データベースとの連携、ファイル操作
- **API連携**: 外部システムとの通信処理

### ゲーム開発
- **キャラクター制御**: 移動、攻撃、スキル発動の処理
- **スコア計算**: ポイント加算、ランキング処理
- **衝突判定**: オブジェクト同士の当たり判定
- **アニメーション**: キャラクターや背景の動きの制御

### データ分析・計算
- **統計計算**: 平均、標準偏差、相関係数の計算
- **データクレンジング**: データの整理、不正値の除去
- **レポート生成**: 集計結果の可視化、グラフ作成
- **予測モデル**: 機械学習アルゴリズムの実装

## 📈 次のステップへ

おめでとうございます！関数の基本概念と実装をマスターしました！🎉

これで**関数とデータ構造段階**の前半が完了しました。次は**ステップ17.6 - オブジェクトとデータ構造**に進み、オブジェクト指向プログラミングの入門概念を学習します。

---

**💡 関数システムの習得完了**

今日学んだ関数は、プログラミングの最も重要な概念の一つです。コードの再利用、保守性の向上、複雑な処理の分割—これらすべてを実現する力を身につけました。

function宣言からアロー関数、パラメータから戻り値、単純な処理から複雑なシステムまで。あなたは関数を使いこなせる開発者になりました。

**コードを整理し、再利用可能にする力。**  
**複雑な問題を小さな部品に分解する思考力。**  
**効率的で読みやすいプログラムを書く技術。**

これらのスキルは、あらゆるプログラミング言語、あらゆるプロジェクトで活用できる普遍的な力です。

**あなたは関数の力をマスターしました！** 🚀