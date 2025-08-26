console.log("🎲 ランダムの基本を開始します！");

// ランダム選択用の配列を定義
let animals = ["🐶 犬", "🐱 猫", "🐰 うさぎ", "🐸 カエル", "🐧 ペンギン", "🐻 クマ"];
let numbers = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

// DOM要素を取得
let contentDisplay = document.getElementById("content-display");
let processDisplay = document.getElementById("process-display");

// 配列を表示する関数
function displayArrays() {
    document.getElementById("animals-display").textContent = `[${animals.join(", ")}] (${animals.length}個)`;
    document.getElementById("numbers-display").textContent = `[${numbers.join(", ")}] (${numbers.length}個)`;
}

// ランダム選択を行う共通関数
function randomSelect(array, arrayName) {
    // 1. ランダム数を生成（0～1未満）
    let randomNumber = Math.random();
    
    // 2. 配列の長さをかける
    let scaled = randomNumber * array.length;
    
    // 3. 小数点を切り捨ててインデックスにする
    let randomIndex = Math.floor(scaled);
    
    // 4. 配列から要素を取得
    let selectedItem = array[randomIndex];
    
    // 処理詳細を表示
    processDisplay.innerHTML = `
        <h4>📊 ランダム処理の詳細</h4>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; font-family: monospace;">
            <p><strong>1. ランダム数生成:</strong> ${randomNumber.toFixed(4)}</p>
            <p><strong>2. 配列長をかける:</strong> ${randomNumber.toFixed(4)} × ${array.length} = ${scaled.toFixed(4)}</p>
            <p><strong>3. 小数点切り捨て:</strong> Math.floor(${scaled.toFixed(4)}) = ${randomIndex}</p>
            <p><strong>4. 配列から取得:</strong> ${arrayName}[${randomIndex}] = "${selectedItem}"</p>
        </div>
    `;
    
    // コンソールにも表示
    console.log(`${arrayName}からランダム選択:`);
    console.log(`ランダム数: ${randomNumber}`);
    console.log(`インデックス: ${randomIndex}`);
    console.log(`選択された要素: ${selectedItem}`);
    
    return { selectedItem, randomIndex, randomNumber, scaled };
}

// 動物ランダム選択ボタン
document.getElementById("animal-btn").addEventListener("click", function() {
    console.log("🐾 動物ランダム選択が押されました");
    
    let result = randomSelect(animals, "animals");
    
    contentDisplay.innerHTML = `
        <h3 style="color: #f39c12; margin-top: 0;">🐾 選ばれた動物</h3>
        <div style="background: linear-gradient(135deg, #f39c12, #f1c40f); color: white; padding: 25px; border-radius: 15px; text-align: center;">
            <div style="font-size: 4rem; margin: 10px 0;">
                ${result.selectedItem.charAt(0)}
            </div>
            <h2 style="margin: 10px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                ${result.selectedItem.substring(2)}
            </h2>
        </div>
        <p style="color: #7f8c8d; margin-top: 15px;">
            📍 ${animals.length}匹の動物の中から ${result.randomIndex + 1} 番目が選ばれました
        </p>
    `;
});

// 数字ランダム選択ボタン
document.getElementById("number-btn").addEventListener("click", function() {
    console.log("🔢 数字ランダム選択が押されました");
    
    let result = randomSelect(numbers, "numbers");
    
    contentDisplay.innerHTML = `
        <h3 style="color: #3498db; margin-top: 0;">🔢 選ばれた数字</h3>
        <div style="background: linear-gradient(135deg, #3498db, #2980b9); color: white; padding: 25px; border-radius: 15px; text-align: center;">
            <div style="font-size: 5rem; font-weight: bold; margin: 20px 0; text-shadow: 3px 3px 6px rgba(0,0,0,0.3);">
                ${result.selectedItem}
            </div>
            <h3 style="margin: 10px 0;">ラッキーナンバー！</h3>
        </div>
        <p style="color: #7f8c8d; margin-top: 15px;">
            📍 ${numbers.length}個の数字の中から ${result.randomIndex + 1} 番目が選ばれました
        </p>
    `;
});

// 初期化処理
displayArrays();

console.log("✅ ランダム選択システムが初期化されました！");
console.log("🎲 Math.random()のテスト:", Math.random());
console.log("💡 ボタンをクリックして、ランダム選択を体験してください！");