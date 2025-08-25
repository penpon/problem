console.log("⚡ ステップ17.5: 関数の定義と呼び出しを開始します！");
console.log("============================================");

// 統計用変数
let totalCalls = 0;
let basicCalls = 0;
let paramCalls = 0;
let returnCalls = 0;
let arrowCalls = 0;
let multiCalls = 0;

// DOM要素の取得
const resultDisplay = document.getElementById("result-display");
const functionStatus = document.getElementById("function-status");
const nameInput = document.getElementById("name-input");
const ageInput = document.getElementById("age-input");
const num1Input = document.getElementById("num1-input");
const num2Input = document.getElementById("num2-input");
const heightInput = document.getElementById("height-input");
const weightInput = document.getElementById("weight-input");
const calcResult = document.getElementById("calc-result");
const bmiResult = document.getElementById("bmi-result");
const historyList = document.getElementById("history-list");

// 統計更新関数
function updateStats() {
    document.getElementById("total-calls").textContent = totalCalls;
    document.getElementById("basic-calls").textContent = basicCalls;
    document.getElementById("param-calls").textContent = paramCalls;
    document.getElementById("return-calls").textContent = returnCalls;
    document.getElementById("arrow-calls").textContent = arrowCalls;
    document.getElementById("multi-calls").textContent = multiCalls;
}

// 履歴追加関数
function addToHistory(functionName, params, result) {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    
    const timestamp = new Date().toLocaleTimeString();
    const paramsStr = params ? `(${params})` : "()";
    const resultStr = result !== undefined ? ` → ${result}` : "";
    
    historyItem.textContent = `[${timestamp}] ${functionName}${paramsStr}${resultStr}`;
    
    historyList.insertBefore(historyItem, historyList.firstChild);
    
    // 履歴が多くなりすぎないよう、10件を超えたら古いものを削除
    if (historyList.children.length > 10) {
        historyList.removeChild(historyList.lastChild);
    }
}

// 1. 基本関数（パラメータなし、戻り値なし）
function basicGreeting() {
    console.log("📖 基本関数を実行中...");
    
    resultDisplay.textContent = "こんにちは！基本関数です！";
    functionStatus.textContent = "✅ 基本関数が実行されました";
    
    console.log("✅ 基本関数実行完了");
}

// 2. パラメータ付き関数
function greetingWithName(name) {
    console.log(`📖 パラメータ付き関数を実行中... (name: ${name})`);
    
    const message = `こんにちは、${name}さん！`;
    resultDisplay.textContent = message;
    functionStatus.textContent = `✅ ${name}さんに挨拶しました`;
    
    console.log(`✅ パラメータ付き関数実行完了: ${message}`);
    return message;
}

// 3. 戻り値のある関数
function calculateSquare(number) {
    console.log(`📖 戻り値関数を実行中... (number: ${number})`);
    
    const result = number * number;
    const message = `${number}の2乗は${result}です`;
    
    resultDisplay.textContent = message;
    functionStatus.textContent = `✅ 計算完了: ${number}² = ${result}`;
    
    console.log(`✅ 戻り値関数実行完了: ${result}`);
    return result;
}

// 4. アロー関数
const arrowGreeting = (name, age) => {
    console.log(`📖 アロー関数を実行中... (name: ${name}, age: ${age})`);
    
    const message = `${name}さん（${age}歳）、アロー関数からこんにちは！`;
    resultDisplay.textContent = message;
    functionStatus.textContent = `✅ アロー関数で${name}さんに挨拶完了`;
    
    console.log(`✅ アロー関数実行完了: ${message}`);
    return message;
};

// 5. 複数パラメータ関数
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
    
    const message = `${num1} + ${num2} = ${addition}`;
    resultDisplay.textContent = message;
    functionStatus.textContent = `✅ 複数計算完了: 足し算結果 ${addition}`;
    
    calcResult.innerHTML = `
        <strong>📊 計算結果:</strong><br>
        足し算: ${num1} + ${num2} = ${addition}<br>
        引き算: ${num1} - ${num2} = ${subtraction}<br>
        掛け算: ${num1} × ${num2} = ${multiplication}<br>
        割り算: ${num1} ÷ ${num2} = ${division}
    `;
    
    console.log(`✅ 複数パラメータ関数実行完了:`, results);
    return results;
}

// 6. BMI計算システム（複数の関数を組み合わせ）
function calculateBMI(height, weight) {
    console.log(`📖 BMI計算開始... (height: ${height}cm, weight: ${weight}kg)`);
    
    // 身長をメートルに変換
    const heightInMeters = height / 100;
    
    // BMI計算
    const bmi = weight / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(bmi * 10) / 10;
    
    return roundedBMI;
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return "低体重";
    if (bmi < 25) return "標準体重";
    if (bmi < 30) return "肥満（1度）";
    if (bmi < 35) return "肥満（2度）";
    return "肥満（3度）";
}

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

function runBMISystem() {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        bmiResult.innerHTML = '<span style="color: #e74c3c;">正しい数値を入力してください</span>';
        return;
    }
    
    const bmi = calculateBMI(height, weight);
    const category = getBMICategory(bmi);
    const color = getBMIColor(category);
    
    const message = `BMI: ${bmi} (${category})`;
    resultDisplay.textContent = message;
    functionStatus.textContent = `✅ BMI計算完了: ${category}`;
    
    bmiResult.innerHTML = `
        <strong>📊 BMI計算結果:</strong><br>
        身長: ${height}cm / 体重: ${weight}kg<br>
        <span style="color: ${color}; font-size: 1.5rem;">BMI: ${bmi}</span><br>
        判定: <span style="color: ${color}; font-weight: bold;">${category}</span>
    `;
    
    console.log(`✅ BMI計算システム実行完了: BMI=${bmi}, カテゴリ=${category}`);
    
    return { bmi, category, height, weight };
}

// ボタンイベントリスナー

// 1. 基本関数ボタン
document.getElementById("basic-btn").addEventListener("click", function() {
    console.log("👋 基本関数ボタンがクリックされました");
    
    totalCalls++;
    basicCalls++;
    
    basicGreeting();
    addToHistory("basicGreeting", "", "実行完了");
    updateStats();
});

// 2. パラメータ付き関数ボタン
document.getElementById("param-btn").addEventListener("click", function() {
    console.log("📝 パラメータ付き関数ボタンがクリックされました");
    
    totalCalls++;
    paramCalls++;
    
    const name = nameInput.value || "ゲスト";
    const result = greetingWithName(name);
    addToHistory("greetingWithName", name, result);
    updateStats();
});

// 3. 戻り値関数ボタン
document.getElementById("return-btn").addEventListener("click", function() {
    console.log("🔄 戻り値関数ボタンがクリックされました");
    
    totalCalls++;
    returnCalls++;
    
    const age = parseInt(ageInput.value) || 20;
    const result = calculateSquare(age);
    addToHistory("calculateSquare", age, result);
    updateStats();
});

// 4. アロー関数ボタン
document.getElementById("arrow-btn").addEventListener("click", function() {
    console.log("🏹 アロー関数ボタンがクリックされました");
    
    totalCalls++;
    arrowCalls++;
    
    const name = nameInput.value || "ゲスト";
    const age = parseInt(ageInput.value) || 20;
    const result = arrowGreeting(name, age);
    addToHistory("arrowGreeting", `${name}, ${age}`, result);
    updateStats();
});

// 5. 複数パラメータ関数ボタン
document.getElementById("multi-btn").addEventListener("click", function() {
    console.log("🧮 複数パラメータ関数ボタンがクリックされました");
    
    totalCalls++;
    multiCalls++;
    
    const num1 = parseFloat(num1Input.value) || 0;
    const num2 = parseFloat(num2Input.value) || 0;
    const results = multiCalculation(num1, num2);
    addToHistory("multiCalculation", `${num1}, ${num2}`, `加算: ${results.addition}`);
    updateStats();
});

// 6. BMI計算システムボタン
document.getElementById("calculator-btn").addEventListener("click", function() {
    console.log("📊 BMI計算システムボタンがクリックされました");
    
    totalCalls++;
    
    const result = runBMISystem();
    if (result) {
        addToHistory("BMI計算システム", `${result.height}cm, ${result.weight}kg`, `BMI: ${result.bmi}`);
    }
    updateStats();
});

// 初期化
updateStats();

console.log("✅ 関数システムが初期化されました！");
console.log("⚡ 関数の基本概念:");
console.log("  - function宣言: 最も基本的な関数定義方法");
console.log("  - パラメータ: 関数に渡される入力値");
console.log("  - 戻り値: 関数が返す結果");
console.log("  - アロー関数: ES6の新しい関数記法");
console.log("💡 各ボタンをクリックして、異なる種類の関数を体験してください！");

// 実行時に自動でデモンストレーション
setTimeout(() => {
    console.log("🎯 関数デモンストレーション:");
    console.log("  基本関数の例:", basicGreeting);
    console.log("  アロー関数の例:", arrowGreeting);
    console.log("🎪 すべての関数ボタンを試してみてください！");
}, 2000);