console.log("⚡ ステップ17.5a: 関数基礎を開始します！");
console.log("========================================");

// 統計用変数
let basicCalls = 0;
let paramCalls = 0;
let returnCalls = 0;
let calcCalls = 0;

// DOM要素の取得
const resultDisplay = document.getElementById("result-display");
const functionStatus = document.getElementById("function-status");
const nameInput = document.getElementById("name-input");
const numberInput = document.getElementById("number-input");

// 統計更新関数
function updateStats() {
    document.getElementById("basic-calls").textContent = basicCalls;
    document.getElementById("param-calls").textContent = paramCalls;
    document.getElementById("return-calls").textContent = returnCalls;
    document.getElementById("calc-calls").textContent = calcCalls;
}

// 1. 基本関数（パラメータなし、戻り値なし）
function basicGreeting() {
    console.log("📖 基本関数を実行中...");
    
    // メイン表示を更新
    resultDisplay.textContent = "こんにちは！基本関数です！";
    functionStatus.textContent = "✅ 基本関数が実行されました";
    
    console.log("✅ 基本関数実行完了");
}

// 2. パラメータ付き関数
function greetingWithName(name) {
    console.log(`📖 パラメータ関数を実行中... (name: ${name})`);
    
    // 挨拶メッセージを作成
    const message = `こんにちは、${name}さん！`;
    
    // 画面に表示
    resultDisplay.textContent = message;
    functionStatus.textContent = `✅ ${name}さんに挨拶しました`;
    
    console.log(`✅ パラメータ関数実行完了: ${message}`);
    
    // 戻り値を返す（この関数では使わないが、概念として）
    return message;
}

// 3. 戻り値のある関数
function calculateSquare(number) {
    console.log(`📖 戻り値関数を実行中... (number: ${number})`);
    
    // 2乗を計算
    const result = number * number;
    const message = `${number}の2乗は${result}です`;
    
    // 画面に表示
    resultDisplay.textContent = message;
    functionStatus.textContent = `✅ 計算完了: ${number}² = ${result}`;
    
    console.log(`✅ 戻り値関数実行完了: ${result}`);
    
    // 計算結果を戻り値として返す
    return result;
}

// 4. 簡単な計算関数
function simpleCalculation(number) {
    console.log(`📖 簡単な計算を実行中... (number: ${number})`);
    
    // いくつかの簡単な計算
    const double = number * 2;
    const triple = number * 3;
    const plusTen = number + 10;
    
    const message = `${number} × 2 = ${double}`;
    
    // 画面に表示
    resultDisplay.textContent = message;
    functionStatus.textContent = `✅ 計算完了: ${number}を2倍、3倍、+10しました`;
    
    console.log(`✅ 簡単な計算実行完了:`);
    console.log(`  ${number} × 2 = ${double}`);
    console.log(`  ${number} × 3 = ${triple}`);
    console.log(`  ${number} + 10 = ${plusTen}`);
    
    // 計算結果を戻り値として返す
    return { double, triple, plusTen };
}

// ボタンイベントリスナー

// 1. 基本関数ボタン
document.getElementById("basic-btn").addEventListener("click", function() {
    console.log("👋 基本関数ボタンがクリックされました");
    
    basicCalls++;
    basicGreeting(); // 基本関数を呼び出し
    updateStats();
});

// 2. パラメータ関数ボタン
document.getElementById("param-btn").addEventListener("click", function() {
    console.log("📝 パラメータ関数ボタンがクリックされました");
    
    paramCalls++;
    
    // 入力フィールドから名前を取得
    const name = nameInput.value || "ゲスト";
    greetingWithName(name); // 名前を引数として渡す
    updateStats();
});

// 3. 戻り値関数ボタン
document.getElementById("return-btn").addEventListener("click", function() {
    console.log("🔄 戻り値関数ボタンがクリックされました");
    
    returnCalls++;
    
    // 入力フィールドから数値を取得
    const number = parseInt(numberInput.value) || 5;
    
    // 戻り値を受け取る
    const squareResult = calculateSquare(number);
    console.log(`戻り値として受け取った値: ${squareResult}`);
    
    updateStats();
});

// 4. 簡単な計算ボタン
document.getElementById("simple-calc-btn").addEventListener("click", function() {
    console.log("🧮 簡単な計算ボタンがクリックされました");
    
    calcCalls++;
    
    // 入力フィールドから数値を取得
    const number = parseInt(numberInput.value) || 5;
    
    // 戻り値を受け取る
    const calcResults = simpleCalculation(number);
    console.log("計算結果:", calcResults);
    
    updateStats();
});

// 初期化
updateStats();

console.log("✅ 関数基礎システムが初期化されました！");
console.log("⚡ 関数の基本概念:");
console.log("  - 関数定義: function 関数名() { }");
console.log("  - パラメータ: 関数に渡す値");
console.log("  - 戻り値: 関数が返す結果");
console.log("💡 各ボタンをクリックして、関数の動作を確認してください！");

// 実行時に自動でデモンストレーション
setTimeout(() => {
    console.log("🎯 関数デモンストレーション:");
    console.log("  関数とは:", "特定の処理をまとめたもの");
    console.log("  利点:", "同じ処理を何度でも使える");
    console.log("🎪 すべての関数ボタンを試してみてください！");
}, 1000);