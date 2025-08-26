console.log("🎬 ステップ17.4b: タイマーアニメーションを開始します！");
console.log("===============================================");

// 統計用変数
let bounceCount = 0;
let moveCount = 0;  
let colorCount = 0;
let comboCount = 0;

// アニメーション制御用変数
let bounceInterval = null;
let moveInterval = null;
let colorInterval = null;
let comboInterval = null;

// DOM要素の取得
const bouncingBall = document.getElementById("bouncing-ball");
const movingRocket = document.getElementById("moving-rocket");
const colorBox = document.getElementById("color-box");
const textDisplay = document.getElementById("text-display");
const animationArea = document.getElementById("animation-area");

const bounceBtn = document.getElementById("bounce-btn");
const moveBtn = document.getElementById("move-btn");
const colorBtn = document.getElementById("color-btn");
const comboBtn = document.getElementById("combo-btn");

// 統計更新関数
function updateStats() {
    document.getElementById("bounce-count").textContent = bounceCount;
    document.getElementById("move-count").textContent = moveCount;
    document.getElementById("color-count").textContent = colorCount;
    document.getElementById("combo-count").textContent = comboCount;
}

// バウンスアニメーション
bounceBtn.addEventListener("click", function() {
    console.log("🏀 バウンスアニメーション開始");
    
    // 既存のアニメーションがあれば停止
    if (bounceInterval) {
        clearInterval(bounceInterval);
    }
    
    bounceCount++;
    textDisplay.textContent = "🏀 バウンスアニメーション実行中... (3秒間)";
    
    let bounceStep = 0;
    const maxSteps = 6; // 3秒間 = 0.5秒 × 6回
    
    bouncingBall.classList.remove("bounce-animation");
    
    bounceInterval = setInterval(() => {
        bounceStep++;
        
        // バウンスクラスを交互にオン/オフ
        bouncingBall.classList.toggle("bounce-animation");
        
        console.log(`バウンス ${bounceStep}回目 (${bounceStep * 0.5}秒経過)`);
        
        if (bounceStep >= maxSteps) {
            clearInterval(bounceInterval);
            bounceInterval = null;
            bouncingBall.classList.remove("bounce-animation");
            
            textDisplay.textContent = "🏀 バウンスアニメーション完了！";
            console.log("✅ バウンスアニメーション完了");
            
            // 2秒後にメッセージをクリア
            setTimeout(() => {
                textDisplay.textContent = "ここにアニメーション情報が表示されます";
            }, 2000);
        }
    }, 500); // 0.5秒ごと
    
    updateStats();
});

// 移動アニメーション  
moveBtn.addEventListener("click", function() {
    console.log("🚀 移動アニメーション開始");
    
    // 既存のアニメーションがあれば停止
    if (moveInterval) {
        clearInterval(moveInterval);
    }
    
    moveCount++;
    textDisplay.textContent = "🚀 移動アニメーション実行中... (4秒間)";
    
    let moveStep = 0;
    const maxMoves = 4; // 4秒間 = 1秒 × 4回
    
    // 初期位置に戻す
    movingRocket.style.left = "20px";
    movingRocket.style.top = "80px";
    
    moveInterval = setInterval(() => {
        moveStep++;
        
        // ランダムな位置を計算
        const areaWidth = animationArea.offsetWidth - 80;  // パディングを考慮
        const areaHeight = 150; // アニメーションエリアの高さを制限
        
        const randomX = Math.floor(Math.random() * areaWidth) + 20;
        const randomY = Math.floor(Math.random() * areaHeight) + 80;
        
        // 移動アニメーション
        movingRocket.style.left = randomX + "px";
        movingRocket.style.top = randomY + "px";
        
        console.log(`移動 ${moveStep}回目: 位置(${randomX}, ${randomY})`);
        
        if (moveStep >= maxMoves) {
            clearInterval(moveInterval);
            moveInterval = null;
            
            textDisplay.textContent = "🚀 移動アニメーション完了！";
            console.log("✅ 移動アニメーション完了");
            
            // 2秒後にメッセージをクリア
            setTimeout(() => {
                textDisplay.textContent = "ここにアニメーション情報が表示されます";
            }, 2000);
        }
    }, 1000); // 1秒ごと
    
    updateStats();
});

// 色変化アニメーション
colorBtn.addEventListener("click", function() {
    console.log("🌈 色変化アニメーション開始");
    
    // 既存のアニメーションがあれば停止
    if (colorInterval) {
        clearInterval(colorInterval);
    }
    
    colorCount++;
    textDisplay.textContent = "🌈 色変化アニメーション実行中... (5秒間)";
    
    let colorStep = 0;
    const maxColors = 6; // 5秒間 = 0.8秒 × 6回
    
    const colors = [
        'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
        'linear-gradient(135deg, #667eea, #764ba2)',
        'linear-gradient(135deg, #fa709a, #fee140)',
        'linear-gradient(135deg, #a8edea, #fed6e3)',
        'linear-gradient(135deg, #ff9a9e, #fecfef)',
        'linear-gradient(135deg, #89f7fe, #66a6ff)'
    ];
    
    colorInterval = setInterval(() => {
        colorStep++;
        
        const currentColor = colors[colorStep % colors.length];
        colorBox.style.background = currentColor;
        
        console.log(`色変化 ${colorStep}回目: ${currentColor.slice(0, 50)}...`);
        
        if (colorStep >= maxColors) {
            clearInterval(colorInterval);
            colorInterval = null;
            
            // 元の色に戻す
            colorBox.style.background = '#f8f9fa';
            
            textDisplay.textContent = "🌈 色変化アニメーション完了！";
            console.log("✅ 色変化アニメーション完了");
            
            // 2秒後にメッセージをクリア
            setTimeout(() => {
                textDisplay.textContent = "ここにアニメーション情報が表示されます";
            }, 2000);
        }
    }, 800); // 0.8秒ごと
    
    updateStats();
});

// 組み合わせアニメーション
comboBtn.addEventListener("click", function() {
    console.log("✨ 組み合わせアニメーション開始");
    
    // 既存のアニメーションがあれば停止
    if (comboInterval) {
        clearInterval(comboInterval);
    }
    
    comboCount++;
    textDisplay.textContent = "✨ 組み合わせアニメーション実行中... (6秒間)";
    
    let comboStep = 0;
    const maxComboSteps = 10; // 6秒間 = 0.6秒 × 10回
    
    const messages = [
        "✨ 魔法の効果が発動！",
        "🌟 キラキラ効果中！", 
        "🎭 変身エフェクト！",
        "🎪 サーカスショー開始！",
        "🎨 アートが生まれる！",
        "🎵 リズムに合わせて！",
        "🌈 虹色の世界！",
        "⭐ 星空のダンス！",
        "🎯 完璧なハーモニー！",
        "🎉 グランドフィナーレ！"
    ];
    
    const comboColors = [
        'linear-gradient(135deg, #ff416c, #ff4b2b)',
        'linear-gradient(135deg, #12c2e9, #c471ed, #f64f59)',
        'linear-gradient(135deg, #f093fb, #f5576c)',
        'linear-gradient(135deg, #4facfe, #00f2fe)',
        'linear-gradient(135deg, #43e97b, #38f9d7)',
        'linear-gradient(135deg, #fa709a, #fee140)'
    ];
    
    // 初期位置設定
    bouncingBall.classList.remove("bounce-animation");
    movingRocket.style.left = "20px";
    movingRocket.style.top = "80px";
    colorBox.style.background = '#f8f9fa';
    
    comboInterval = setInterval(() => {
        comboStep++;
        
        // 複数のアニメーションを同時実行
        
        // 1. バウンス効果
        bouncingBall.classList.toggle("bounce-animation");
        
        // 2. 移動効果
        const areaWidth = animationArea.offsetWidth - 80;
        const areaHeight = 120;
        const randomX = Math.floor(Math.random() * areaWidth) + 20;
        const randomY = Math.floor(Math.random() * areaHeight) + 80;
        movingRocket.style.left = randomX + "px";
        movingRocket.style.top = randomY + "px";
        
        // 3. 色変化効果
        const currentColor = comboColors[comboStep % comboColors.length];
        colorBox.style.background = currentColor;
        
        // 4. メッセージ変化
        textDisplay.textContent = messages[comboStep - 1] || "✨ 組み合わせアニメーション実行中...";
        
        console.log(`組み合わせ ${comboStep}回目: ${messages[comboStep - 1]} 位置(${randomX}, ${randomY})`);
        
        if (comboStep >= maxComboSteps) {
            clearInterval(comboInterval);
            comboInterval = null;
            
            // 全て初期状態に戻す
            bouncingBall.classList.remove("bounce-animation");
            movingRocket.style.left = "20px";  
            movingRocket.style.top = "80px";
            colorBox.style.background = '#f8f9fa';
            
            textDisplay.textContent = "🎉 組み合わせアニメーション完了！全ての効果が同時に実行されました";
            console.log("✅ 組み合わせアニメーション完了");
            
            // 3秒後にメッセージをクリア
            setTimeout(() => {
                textDisplay.textContent = "ここにアニメーション情報が表示されます";
            }, 3000);
        }
    }, 600); // 0.6秒ごと
    
    updateStats();
});

// 初期化処理
console.log("✅ タイマーアニメーションシステムが初期化されました！");
console.log("🎬 アニメーション機能:");
console.log("  - バウンス: CSS transition + classList toggle");
console.log("  - 移動: スタイル直接変更 + transition効果");
console.log("  - 色変化: background変更 + グラデーション");
console.log("  - 組み合わせ: 複数アニメーションの同期実行");
console.log("💡 各ボタンをクリックして、タイマー連動アニメーションを体験してください！");

// 初期統計表示
updateStats();

// ウェルカムアニメーション（3秒後）
setTimeout(() => {
    console.log("🎉 ウェルカム！タイマーアニメーションの世界へようこそ");
    textDisplay.textContent = "🎉 ウェルカム！各ボタンでアニメーションをお試しください";
    
    setTimeout(() => {
        textDisplay.textContent = "ここにアニメーション情報が表示されます";
    }, 3000);
}, 3000);