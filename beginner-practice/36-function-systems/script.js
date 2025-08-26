console.log("🚀 ステップ17.5b: 関数実用システムを開始します！");
console.log("=============================================");

// 統計用変数
let bmiCalls = 0;
let arrowCalls = 0;
let comprehensiveCalls = 0;
let chainCalls = 0;

// DOM要素の取得
const resultDisplay = document.getElementById("result-display");
const functionStatus = document.getElementById("function-status");
const heightInput = document.getElementById("height-input");
const weightInput = document.getElementById("weight-input");
const num1Input = document.getElementById("num1-input");
const num2Input = document.getElementById("num2-input");
const nameInput = document.getElementById("name-input");
const ageInput = document.getElementById("age-input");
const bmiResult = document.getElementById("bmi-result");
const calcResult = document.getElementById("calc-result");

// 統計更新関数
function updateStats() {
    document.getElementById("bmi-calls").textContent = bmiCalls;
    document.getElementById("arrow-calls").textContent = arrowCalls;
    document.getElementById("comprehensive-calls").textContent = comprehensiveCalls;
    document.getElementById("chain-calls").textContent = chainCalls;
}

// ========================================
// BMI計算システム（複数の関数を連携）
// ========================================

// 1. BMI値を計算する関数
function calculateBMI(height, weight) {
    console.log(`📊 BMI計算開始... (height: ${height}cm, weight: ${weight}kg)`);
    
    // 身長をメートルに変換
    const heightInMeters = height / 100;
    
    // BMI計算: 体重(kg) ÷ (身長(m) × 身長(m))
    const bmi = weight / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(bmi * 10) / 10; // 小数点第1位まで
    
    console.log(`  計算結果: BMI = ${roundedBMI}`);
    return roundedBMI;
}

// 2. BMI値から判定を決める関数
function getBMICategory(bmi) {
    console.log(`📋 BMI判定中... (BMI: ${bmi})`);
    
    let category;
    if (bmi < 18.5) {
        category = "低体重";
    } else if (bmi < 25) {
        category = "標準体重";
    } else if (bmi < 30) {
        category = "肥満（1度）";
    } else if (bmi < 35) {
        category = "肥満（2度）";
    } else {
        category = "肥満（3度）";
    }
    
    console.log(`  判定結果: ${category}`);
    return category;
}

// 3. 判定に応じた色を決める関数
function getBMIColor(category) {
    console.log(`🎨 色を決定中... (category: ${category})`);
    
    const colors = {
        "低体重": "#3498db",
        "標準体重": "#27ae60", 
        "肥満（1度）": "#f39c12",
        "肥満（2度）": "#e67e22",
        "肥満（3度）": "#e74c3c"
    };
    
    const color = colors[category] || "#7f8c8d";
    console.log(`  色決定: ${color}`);
    return color;
}

// 4. BMIシステム全体を統合する関数
function runBMISystem() {
    console.log("🏥 BMIシステム全体を実行開始...");
    
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    
    // 入力値チェック
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        bmiResult.innerHTML = '<span style="color: #e74c3c;">正しい数値を入力してください</span>';
        return null;
    }
    
    // 関数を順次呼び出し（関数連携）
    const bmi = calculateBMI(height, weight);
    const category = getBMICategory(bmi);
    const color = getBMIColor(category);
    
    // 結果表示
    const message = `BMI: ${bmi} (${category})`;
    resultDisplay.textContent = message;
    functionStatus.textContent = `✅ BMI計算システム完了: ${category}`;
    
    bmiResult.innerHTML = `
        <strong>📊 BMI計算システム結果:</strong><br>
        身長: ${height}cm / 体重: ${weight}kg<br>
        <span style="color: ${color}; font-size: 1.8rem;">BMI: ${bmi}</span><br>
        判定: <span style="color: ${color}; font-weight: bold;">${category}</span>
    `;
    
    console.log(`🎉 BMIシステム完了: BMI=${bmi}, カテゴリ=${category}`);
    
    return { bmi, category, height, weight, color };
}

// ========================================
// アロー関数のデモ
// ========================================

// 従来の関数
function traditionalGreeting(name, age) {
    return `こんにちは、${name}さん（${age}歳）！従来の関数からの挨拶です。`;
}

// アロー関数（基本形）
const arrowGreeting = (name, age) => {
    return `こんにちは、${name}さん（${age}歳）！アロー関数からの挨拶です。`;
};

// アロー関数（短縮形）
const shortArrowGreeting = (name, age) => `${name}さん（${age}歳）、アロー関数は簡潔ですね！`;

// ========================================
// 総合計算システム
// ========================================

// 基本計算関数群（アロー関数で実装）
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b !== 0 ? (a / b) : null;
const power = (a, b) => Math.pow(a, b);
const average = (a, b) => (a + b) / 2;

function comprehensiveCalculation(num1, num2) {
    console.log(`🧮 総合計算システム実行中... (num1: ${num1}, num2: ${num2})`);
    
    // 各アロー関数を使って計算
    const results = {
        addition: add(num1, num2),
        subtraction: subtract(num1, num2),
        multiplication: multiply(num1, num2),
        division: divide(num1, num2),
        power: power(num1, 2), // num1の2乗
        average: average(num1, num2)
    };
    
    console.log("計算結果:", results);
    
    const message = `${num1} と ${num2} の総合計算完了`;
    resultDisplay.textContent = message;
    functionStatus.textContent = `✅ 総合計算システム完了: 6種類の計算実行`;
    
    calcResult.innerHTML = `
        <strong>🧮 総合計算システム結果:</strong><br>
        足し算: ${num1} + ${num2} = ${results.addition}<br>
        引き算: ${num1} - ${num2} = ${results.subtraction}<br>
        掛け算: ${num1} × ${num2} = ${results.multiplication}<br>
        割り算: ${num1} ÷ ${num2} = ${results.division !== null ? results.division.toFixed(2) : '計算不可'}<br>
        ${num1}の2乗: ${num1}² = ${results.power}<br>
        平均値: (${num1} + ${num2}) ÷ 2 = ${results.average}
    `;
    
    return results;
}

// ========================================
// 関数連携デモ
// ========================================

// データ処理関数群
const validateInput = (value) => {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
};

const formatNumber = (num) => {
    return num.toLocaleString(); // 3桁区切り
};

const calculateTax = (amount) => {
    return Math.round(amount * 0.1); // 10%の税金
};

const calculateTotal = (amount, tax) => {
    return amount + tax;
};

function runChainDemo() {
    console.log("🔄 関数連携デモ実行中...");
    
    const inputValue = num1Input.value;
    
    // 関数を連鎖的に呼び出し
    if (!validateInput(inputValue)) {
        resultDisplay.textContent = "正しい数値を入力してください";
        functionStatus.textContent = "❌ 入力値検証でエラー";
        return;
    }
    
    const amount = parseFloat(inputValue);
    const tax = calculateTax(amount);
    const total = calculateTotal(amount, tax);
    
    const formattedAmount = formatNumber(amount);
    const formattedTax = formatNumber(tax);
    const formattedTotal = formatNumber(total);
    
    const message = `金額: ${formattedAmount}円 → 総額: ${formattedTotal}円`;
    resultDisplay.textContent = message;
    functionStatus.textContent = `✅ 関数連携完了: 5つの関数が連携動作`;
    
    console.log(`関数連携結果:`);
    console.log(`  入力検証: ${inputValue} → 有効`);
    console.log(`  金額: ${amount}円`);
    console.log(`  税金: ${tax}円`);
    console.log(`  総額: ${total}円`);
    
    return { amount, tax, total };
}

// ========================================
// ボタンイベントリスナー
// ========================================

// 1. BMI計算システムボタン
document.getElementById("bmi-btn").addEventListener("click", function() {
    console.log("📊 BMI計算システムボタンがクリックされました");
    
    bmiCalls++;
    runBMISystem();
    updateStats();
});

// 2. アロー関数デモボタン
document.getElementById("arrow-btn").addEventListener("click", function() {
    console.log("🏹 アロー関数デモボタンがクリックされました");
    
    arrowCalls++;
    
    const name = nameInput.value || "ゲスト";
    const age = parseInt(ageInput.value) || 25;
    
    // 従来の関数とアロー関数を比較実行
    const traditionalResult = traditionalGreeting(name, age);
    const arrowResult = arrowGreeting(name, age);
    const shortResult = shortArrowGreeting(name, age);
    
    console.log("従来の関数:", traditionalResult);
    console.log("アロー関数:", arrowResult);
    console.log("短縮アロー関数:", shortResult);
    
    resultDisplay.textContent = shortResult;
    functionStatus.textContent = `✅ アロー関数デモ完了: 3種類の関数記法を比較実行`;
    
    updateStats();
});

// 3. 総合計算システムボタン
document.getElementById("comprehensive-btn").addEventListener("click", function() {
    console.log("🧮 総合計算システムボタンがクリックされました");
    
    comprehensiveCalls++;
    
    const num1 = parseFloat(num1Input.value) || 0;
    const num2 = parseFloat(num2Input.value) || 0;
    
    comprehensiveCalculation(num1, num2);
    updateStats();
});

// 4. 関数連携デモボタン
document.getElementById("chain-btn").addEventListener("click", function() {
    console.log("🔄 関数連携デモボタンがクリックされました");
    
    chainCalls++;
    runChainDemo();
    updateStats();
});

// ========================================
// 初期化
// ========================================

updateStats();

console.log("✅ 関数実用システムが初期化されました！");
console.log("🚀 このシステムの特徴:");
console.log("  - 複数関数の連携（BMI計算システム）");
console.log("  - アロー関数の活用（ES6記法）");
console.log("  - 関数の再利用性（総合計算システム）");
console.log("  - システム設計（関数分割）");
console.log("💡 各ボタンをクリックして、実用的な関数システムを体験してください！");

// 実行時に自動でデモンストレーション
setTimeout(() => {
    console.log("🎯 関数システムデモンストレーション:");
    console.log("  BMI計算システム: 4つの関数が連携");
    console.log("  アロー関数: ES6の新記法");
    console.log("  総合計算: 6種類のアロー関数活用");
    console.log("  関数連携: 5つの関数がチェーン動作");
    console.log("🎪 すべてのシステムボタンを試してみてください！");
}, 1500);