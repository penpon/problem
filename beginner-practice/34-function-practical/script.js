console.log("🔧 関数の実用応用を開始します！");

// DOM要素を取得
let contentDisplay = document.getElementById("content-display");

// パラメータを受け取って足し算をする関数
function addNumbers(a, b) {
    console.log(`addNumbers関数: ${a} + ${b} を計算中`);
    let result = a + b;
    return result; // 戻り値として結果を返す
}

// パラメータを受け取ってBMIを計算する関数
function calculateBMI(heightCm, weightKg) {
    console.log(`calculateBMI関数: 身長${heightCm}cm, 体重${weightKg}kg でBMI計算中`);
    
    // 身長をメートルに変換
    let heightM = heightCm / 100;
    
    // BMI = 体重(kg) ÷ (身長(m) × 身長(m))
    let bmi = weightKg / (heightM * heightM);
    
    return Math.round(bmi * 10) / 10; // 小数点1桁まで
}

// パラメータを受け取って挨拶メッセージを作る関数
function createGreeting(name) {
    console.log(`createGreeting関数: ${name}さんへの挨拶作成中`);
    let greeting = `こんにちは、${name}さん！プログラミング学習がんばってますね！`;
    return greeting;
}

// 足し算ボタンのイベント
document.getElementById("add-btn").addEventListener("click", function() {
    // フォームから値を取得
    let num1 = parseInt(document.getElementById("num1").value);
    let num2 = parseInt(document.getElementById("num2").value);
    
    console.log("足し算ボタンがクリックされました");
    
    // 関数を呼び出して戻り値を取得
    let sum = addNumbers(num1, num2);
    
    contentDisplay.innerHTML = `
        <h3 style="color: #27ae60; margin-top: 0;">🔢 足し算計算結果</h3>
        <div style="background: linear-gradient(135deg, #27ae60, #2ecc71); color: white; padding: 20px; border-radius: 10px; text-align: center;">
            <h2 style="margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                ${num1} + ${num2} = ${sum}
            </h2>
            <p style="margin: 10px 0 0 0;">addNumbers(${num1}, ${num2}) の実行結果</p>
        </div>
    `;
});

// BMI計算ボタンのイベント
document.getElementById("bmi-btn").addEventListener("click", function() {
    // フォームから値を取得
    let height = parseInt(document.getElementById("height").value);
    let weight = parseInt(document.getElementById("weight").value);
    
    console.log("BMI計算ボタンがクリックされました");
    
    // 関数を呼び出して戻り値を取得
    let bmi = calculateBMI(height, weight);
    
    // BMIの評価
    let evaluation = "";
    if (bmi < 18.5) {
        evaluation = "やせ";
    } else if (bmi < 25) {
        evaluation = "標準";
    } else {
        evaluation = "肥満";
    }
    
    contentDisplay.innerHTML = `
        <h3 style="color: #3498db; margin-top: 0;">💪 BMI計算結果</h3>
        <div style="background: linear-gradient(135deg, #3498db, #2980b9); color: white; padding: 20px; border-radius: 10px; text-align: center;">
            <h2 style="margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                BMI: ${bmi} (${evaluation})
            </h2>
            <p style="margin: 10px 0 0 0;">calculateBMI(${height}, ${weight}) の実行結果</p>
        </div>
    `;
});

// 挨拶作成ボタンのイベント
document.getElementById("greet-btn").addEventListener("click", function() {
    // フォームから値を取得
    let name = document.getElementById("name").value;
    
    console.log("挨拶作成ボタンがクリックされました");
    
    // 関数を呼び出して戻り値を取得
    let greeting = createGreeting(name);
    
    contentDisplay.innerHTML = `
        <h3 style="color: #e67e22; margin-top: 0;">👋 挨拶メッセージ</h3>
        <div style="background: linear-gradient(135deg, #e67e22, #f39c12); color: white; padding: 20px; border-radius: 10px; text-align: center;">
            <h2 style="margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                ${greeting}
            </h2>
            <p style="margin: 10px 0 0 0;">createGreeting("${name}") の実行結果</p>
        </div>
    `;
});

console.log("✅ 関数実用応用システムが初期化されました！");
console.log("🔧 定義された関数: addNumbers, calculateBMI, createGreeting");
console.log("💡 フォームに値を入力して、パラメータと戻り値を体験してください！");