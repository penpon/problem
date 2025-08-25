console.log("📚 ステップ17.3-1: 配列の基本を開始します！");

// 基本的な配列を定義
let fruits = ["りんご", "バナナ", "オレンジ", "ぶどう"];
let colors = ["赤", "青", "緑", "黄色"];
let numbers = [10, 20, 30, 40, 50];

// DOM要素を取得
let contentDisplay = document.getElementById("content-display");

// 果物配列ボタン
document.getElementById("fruits-btn").addEventListener("click", function() {
    console.log("🍎 果物配列が選択されました");
    console.log("fruits配列:", fruits);
    console.log("配列の長さ:", fruits.length);
    
    contentDisplay.innerHTML = `
        <h3 style="color: #27ae60; margin-top: 0;">🍎 果物配列</h3>
        <div style="background: #e8f5e8; padding: 20px; border-radius: 10px;">
            <p><strong>配列:</strong> [${fruits.join(", ")}]</p>
            <p><strong>配列の長さ:</strong> ${fruits.length}</p>
            <p><strong>最初の要素:</strong> ${fruits[0]}</p>
            <p><strong>最後の要素:</strong> ${fruits[fruits.length - 1]}</p>
        </div>
    `;
});

// 色配列ボタン
document.getElementById("colors-btn").addEventListener("click", function() {
    console.log("🌈 色配列が選択されました");
    console.log("colors配列:", colors);
    console.log("配列の長さ:", colors.length);
    
    contentDisplay.innerHTML = `
        <h3 style="color: #8e44ad; margin-top: 0;">🌈 色配列</h3>
        <div style="background: #f4e6ff; padding: 20px; border-radius: 10px;">
            <p><strong>配列:</strong> [${colors.join(", ")}]</p>
            <p><strong>配列の長さ:</strong> ${colors.length}</p>
            <p><strong>最初の要素:</strong> ${colors[0]}</p>
            <p><strong>最後の要素:</strong> ${colors[colors.length - 1]}</p>
        </div>
    `;
});

// 数字配列ボタン
document.getElementById("numbers-btn").addEventListener("click", function() {
    console.log("🔢 数字配列が選択されました");
    console.log("numbers配列:", numbers);
    console.log("配列の長さ:", numbers.length);
    
    contentDisplay.innerHTML = `
        <h3 style="color: #3498db; margin-top: 0;">🔢 数字配列</h3>
        <div style="background: #e8f4fd; padding: 20px; border-radius: 10px;">
            <p><strong>配列:</strong> [${numbers.join(", ")}]</p>
            <p><strong>配列の長さ:</strong> ${numbers.length}</p>
            <p><strong>最初の要素:</strong> ${numbers[0]}</p>
            <p><strong>最後の要素:</strong> ${numbers[numbers.length - 1]}</p>
        </div>
    `;
});

console.log("✅ 配列基本システムが初期化されました！");
console.log("📚 使用可能な配列:", "fruits, colors, numbers");
console.log("💡 各ボタンをクリックして、配列の基本操作を体験してください！");