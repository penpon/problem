console.log("🧮 ステップ15.3: 基本計算を開始します！");
console.log("================================");

// 基本の四則演算
let number1 = 10;
let number2 = 3;

console.log("使用する数値:");
console.log("number1 = " + number1);
console.log("number2 = " + number2);
console.log("");

// 足し算
let addition = number1 + number2;
console.log("足し算: " + number1 + " + " + number2 + " = " + addition);

// 引き算
let subtraction = number1 - number2;
console.log("引き算: " + number1 + " - " + number2 + " = " + subtraction);

// 掛け算
let multiplication = number1 * number2;
console.log("掛け算: " + number1 + " × " + number2 + " = " + multiplication);

// 割り算
let division = number1 / number2;
console.log("割り算: " + number1 + " ÷ " + number2 + " = " + division.toFixed(2));

console.log("");
console.log("🎉 すべての計算が完了しました！");

// 計算結果をページにも表示
document.getElementById('calculation-results').innerHTML = `
    <div class="result-display">足し算: ${number1} + ${number2} = ${addition}</div>
    <div class="result-display">引き算: ${number1} - ${number2} = ${subtraction}</div>
    <div class="result-display">掛け算: ${number1} × ${number2} = ${multiplication}</div>
    <div class="result-display">割り算: ${number1} ÷ ${number2} = ${division.toFixed(2)}</div>
`;