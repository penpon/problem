console.log("🎲 ランダム選択システムを開始します！");
console.log("====================================================");

// 学習用データ配列
const gameData = {
    fruits: ["りんご", "バナナ", "オレンジ", "ぶどう", "いちご"],
    colors: [
        { name: "夕焼けオレンジ", code: "#ff6b6b", bg: "linear-gradient(135deg, #ff6b6b, #ffa726)" },
        { name: "海の青", code: "#4ecdc4", bg: "linear-gradient(135deg, #4ecdc4, #44a08d)" },
        { name: "森の緑", code: "#56ab2f", bg: "linear-gradient(135deg, #56ab2f, #a8e6cf)" },
        { name: "ラベンダー紫", code: "#667eea", bg: "linear-gradient(135deg, #667eea, #764ba2)" },
        { name: "ピンクローズ", code: "#fa709a", bg: "linear-gradient(135deg, #fa709a, #fee140)" },
        { name: "ゴールド", code: "#f7b801", bg: "linear-gradient(135deg, #f7b801, #f18701)" }
    ],
    music: ["ポップス", "ジャズ", "クラシック", "ロック", "エレクトロニカ"]
};

// 統計データ
let selectionStats = {
    fruits: 0,
    colors: 0,
    music: 0,
    mixed: 0,
    total: 0
};

// DOM要素の取得
let contentDisplay = document.getElementById("content-display");
let randomResult = document.getElementById("random-result");
let processDetails = document.getElementById("process-details");

// ランダム選択の共通処理関数
function performRandomSelection(array, categoryName, displayType) {
    // ステップ1: 0以上1未満のランダムな小数生成
    let randomFloat = Math.random();
    
    // ステップ2: 配列の長さと掛け算
    let scaledValue = randomFloat * array.length;
    
    // ステップ3: 整数インデックスに変換
    let randomIndex = Math.floor(scaledValue);
    
    // ステップ4: ランダムな要素を取得
    let selectedItem = array[randomIndex];
    
    // 統計更新
    selectionStats[displayType]++;
    selectionStats.total++;
    
    // 処理詳細の表示
    showProcessDetails(categoryName, randomFloat, scaledValue, randomIndex, selectedItem, array.length);
    
    // 統計表示の更新
    updateStatsDisplay();
    
    // コンソールログ
    console.log(`🎯 ${categoryName}選択実行:`);
    console.log(`  生成された乱数: ${randomFloat.toFixed(6)}`);
    console.log(`  スケール後の値: ${scaledValue.toFixed(6)}`);
    console.log(`  選択インデックス: ${randomIndex}`);
    console.log(`  選択された要素: ${JSON.stringify(selectedItem)}`);
    console.log(`  配列長: ${array.length}`);
    
    return { selectedItem, randomIndex, randomFloat, scaledValue, arrayLength: array.length };
}

// 処理詳細を表示する関数
function showProcessDetails(categoryName, randomFloat, scaledValue, randomIndex, selectedItem, arrayLength) {
    processDetails.innerHTML = `
        <strong>🔍 ${categoryName}ランダム処理の詳細:</strong><br><br>
        <strong>ステップ1:</strong> Math.random() = ${randomFloat.toFixed(6)} (0以上1未満の小数)<br>
        <strong>ステップ2:</strong> ${randomFloat.toFixed(6)} × ${arrayLength} = ${scaledValue.toFixed(6)} (配列長との掛け算)<br>
        <strong>ステップ3:</strong> Math.floor(${scaledValue.toFixed(6)}) = ${randomIndex} (整数インデックス)<br>
        <strong>ステップ4:</strong> 配列[${randomIndex}] = "${typeof selectedItem === 'object' ? selectedItem.name : selectedItem}" (要素取得)<br><br>
        <strong>結果:</strong> ${arrayLength}個の要素から ${randomIndex + 1}番目が選択されました
    `;
    
    // アニメーション効果
    processDetails.classList.add('slide-in');
    setTimeout(() => {
        processDetails.classList.remove('slide-in');
    }, 500);
}

// 統計表示を更新する関数
function updateStatsDisplay() {
    document.getElementById("total-selections").textContent = selectionStats.total;
    document.getElementById("fruit-count").textContent = selectionStats.fruits;
    document.getElementById("color-count").textContent = selectionStats.colors;
    document.getElementById("music-count").textContent = selectionStats.music;
    document.getElementById("mixed-count").textContent = selectionStats.mixed;
}

// データ配列表示を更新する関数
function displayDataArrays() {
    // 果物配列表示
    document.getElementById("fruits-data").textContent = `[${gameData.fruits.map(item => `"${item}"`).join(", ")}]`;
    document.getElementById("fruits-count").textContent = gameData.fruits.length;
    
    // 色配列表示（名前のみ）
    document.getElementById("colors-data").textContent = `[${gameData.colors.map(item => `"${item.name}"`).join(", ")}]`;
    document.getElementById("colors-count").textContent = gameData.colors.length;
    
    // 音楽配列表示
    document.getElementById("music-data").textContent = `[${gameData.music.map(item => `"${item}"`).join(", ")}]`;
    document.getElementById("music-count").textContent = gameData.music.length;
}

// 1. 果物ランダムボタン
document.getElementById("fruit-btn").addEventListener("click", function() {
    let result = performRandomSelection(gameData.fruits, "果物", "fruits");
    
    contentDisplay.innerHTML = `
        <h3 style="color: #ff6b6b; margin-top: 0;">🍎 果物ランダム選択</h3>
        <div style="background: #fff5f5; padding: 25px; border-radius: 15px; border-left: 4px solid #ff6b6b;">
            <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 15px;">
                <div style="font-size: 4rem; margin: 15px 0;">🍎</div>
                <h2 style="color: #e53e3e; margin: 15px 0; font-size: 1.8rem;">
                    ${result.selectedItem}
                </h2>
                <p style="color: #c53030; margin: 0; font-size: 1.1rem;">
                    今日のおすすめフルーツです！
                </p>
            </div>
            <div style="background: #fed7d7; padding: 15px; border-radius: 8px; text-align: center;">
                <strong>選択過程: Math.random()=${result.randomFloat.toFixed(4)} → インデックス=${result.randomIndex} → "${result.selectedItem}"</strong>
            </div>
        </div>
        <p style="color: #7f8c8d; font-size: 0.9rem; margin-top: 15px;">
            🎯 ${result.arrayLength}種類の果物から ${result.randomIndex + 1} 番目が選択されました
        </p>
    `;
    
    randomResult.style.display = "block";
    randomResult.textContent = `選択結果: ${result.selectedItem}`;
    randomResult.classList.add('pulse');
    setTimeout(() => randomResult.classList.remove('pulse'), 1500);
});

// 2. 色ランダムボタン
document.getElementById("color-btn").addEventListener("click", function() {
    let result = performRandomSelection(gameData.colors, "色", "colors");
    let colorObj = result.selectedItem;
    
    contentDisplay.style.background = colorObj.bg;
    contentDisplay.innerHTML = `
        <h3 style="color: white; margin-top: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">🎨 色ランダム選択</h3>
        <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 25px; border-radius: 15px; border: 2px solid rgba(255,255,255,0.3);">
            <div style="background: rgba(255,255,255,0.2); padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 15px;">
                <div style="font-size: 4rem; margin: 15px 0;">🎨</div>
                <h2 style="color: white; margin: 15px 0; font-size: 1.8rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                    ${colorObj.name}
                </h2>
                <p style="color: rgba(255,255,255,0.9); margin: 5px 0; font-family: monospace; font-size: 1.1rem;">
                    カラーコード: ${colorObj.code}
                </p>
                <p style="color: rgba(255,255,255,0.8); margin: 0; font-style: italic;">
                    美しい色彩があなたを包みます
                </p>
            </div>
            <div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px; text-align: center;">
                <strong style="color: white;">選択過程: Math.random()=${result.randomFloat.toFixed(4)} → インデックス=${result.randomIndex} → "${colorObj.name}"</strong>
            </div>
        </div>
        <p style="color: rgba(255,255,255,0.9); font-size: 0.9rem; margin-top: 15px; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
            🌈 ${result.arrayLength}色から ${result.randomIndex + 1} 番目の色が選択され、背景も変化しました
        </p>
    `;
    
    randomResult.style.display = "block";
    randomResult.textContent = `選択結果: ${colorObj.name} (${colorObj.code})`;
    randomResult.style.background = colorObj.bg;
    randomResult.style.color = "white";
    randomResult.classList.add('pulse');
    setTimeout(() => randomResult.classList.remove('pulse'), 1500);
});

// 3. 音楽ランダムボタン
document.getElementById("music-btn").addEventListener("click", function() {
    let result = performRandomSelection(gameData.music, "音楽", "music");
    
    // 背景色をデフォルトに戻す
    contentDisplay.style.background = "white";
    
    contentDisplay.innerHTML = `
        <h3 style="color: #9b59b6; margin-top: 0;">🎵 音楽ランダム選択</h3>
        <div style="background: #f4ecf7; padding: 25px; border-radius: 15px; border-left: 4px solid #9b59b6;">
            <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 15px;">
                <div style="font-size: 4rem; margin: 15px 0;">🎵</div>
                <h2 style="color: #7b1fa2; margin: 15px 0; font-size: 1.8rem;">
                    ${result.selectedItem}
                </h2>
                <p style="color: #8e24aa; margin: 0; font-size: 1.1rem;">
                    今日はこのジャンルを聴いてみませんか？
                </p>
            </div>
            <div style="background: #e1bee7; padding: 15px; border-radius: 8px; text-align: center;">
                <strong>選択過程: Math.random()=${result.randomFloat.toFixed(4)} → インデックス=${result.randomIndex} → "${result.selectedItem}"</strong>
            </div>
        </div>
        <p style="color: #7f8c8d; font-size: 0.9rem; margin-top: 15px;">
            🎶 ${result.arrayLength}つの音楽ジャンルから ${result.randomIndex + 1} 番目が選択されました
        </p>
    `;
    
    randomResult.style.display = "block";
    randomResult.textContent = `選択結果: ${result.selectedItem}`;
    randomResult.style.background = "#e3f2fd";
    randomResult.style.color = "#1976d2";
    randomResult.classList.add('pulse');
    setTimeout(() => randomResult.classList.remove('pulse'), 1500);
});

// 4. 全混合ランダムボタン
document.getElementById("mixed-btn").addEventListener("click", function() {
    // 全配列を統合
    let mixedArray = [
        ...gameData.fruits.map(item => ({ category: "果物", value: item, icon: "🍎" })),
        ...gameData.colors.map(item => ({ category: "色", value: item.name, icon: "🎨", colorData: item })),
        ...gameData.music.map(item => ({ category: "音楽", value: item, icon: "🎵" }))
    ];
    
    let result = performRandomSelection(mixedArray, "全混合", "mixed");
    let selectedObj = result.selectedItem;
    
    // 色が選ばれた場合は背景を変更、それ以外はデフォルト
    if (selectedObj.category === "色" && selectedObj.colorData) {
        contentDisplay.style.background = selectedObj.colorData.bg;
    } else {
        contentDisplay.style.background = "white";
    }
    
    let textColor = selectedObj.category === "色" ? "white" : "#e67e22";
    let bgColor = selectedObj.category === "色" ? "rgba(255,255,255,0.15)" : "#fef5e7";
    let borderColor = selectedObj.category === "色" ? "rgba(255,255,255,0.3)" : "#e67e22";
    
    contentDisplay.innerHTML = `
        <h3 style="color: ${textColor}; margin-top: 0; ${selectedObj.category === "色" ? "text-shadow: 2px 2px 4px rgba(0,0,0,0.5);" : ""}">🎯 全混合ランダム選択</h3>
        <div style="background: ${bgColor}; ${selectedObj.category === "色" ? "backdrop-filter: blur(10px);" : ""} padding: 25px; border-radius: 15px; border: 2px solid ${borderColor};">
            <div style="background: ${selectedObj.category === "色" ? "rgba(255,255,255,0.2)" : "white"}; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 15px;">
                <div style="background: ${selectedObj.category === "色" ? "rgba(255,255,255,0.2)" : "#f8f9fa"}; padding: 10px; border-radius: 8px; margin-bottom: 15px;">
                    <strong style="color: ${textColor};">カテゴリ: ${selectedObj.category}</strong>
                </div>
                <div style="font-size: 4rem; margin: 15px 0;">${selectedObj.icon}</div>
                <h2 style="color: ${textColor}; margin: 15px 0; font-size: 1.8rem; ${selectedObj.category === "色" ? "text-shadow: 2px 2px 4px rgba(0,0,0,0.5);" : ""}">
                    ${selectedObj.value}
                </h2>
                <p style="color: ${selectedObj.category === "色" ? "rgba(255,255,255,0.8)" : "#bf6900"}; margin: 0; font-size: 1.1rem; ${selectedObj.category === "色" ? "font-style: italic;" : ""}">
                    全${result.arrayLength}個のアイテムから選択！
                </p>
            </div>
            <div style="background: ${selectedObj.category === "色" ? "rgba(0,0,0,0.2)" : "#fed7aa"}; padding: 15px; border-radius: 8px; text-align: center;">
                <strong style="color: ${textColor};">選択過程: Math.random()=${result.randomFloat.toFixed(4)} → インデックス=${result.randomIndex} → [${selectedObj.category}] "${selectedObj.value}"</strong>
            </div>
        </div>
        <p style="color: ${selectedObj.category === "色" ? "rgba(255,255,255,0.9)" : "#7f8c8d"}; font-size: 0.9rem; margin-top: 15px; ${selectedObj.category === "色" ? "text-shadow: 1px 1px 2px rgba(0,0,0,0.5);" : ""}">
            🌟 全${result.arrayLength}個のアイテム（果物${gameData.fruits.length}個 + 色${gameData.colors.length}個 + 音楽${gameData.music.length}個）から ${result.randomIndex + 1} 番目が選択されました
        </p>
    `;
    
    randomResult.style.display = "block";
    randomResult.textContent = `選択結果: [${selectedObj.category}] ${selectedObj.value}`;
    if (selectedObj.category === "色" && selectedObj.colorData) {
        randomResult.style.background = selectedObj.colorData.bg;
        randomResult.style.color = "white";
    } else {
        randomResult.style.background = "#e3f2fd";
        randomResult.style.color = "#1976d2";
    }
    randomResult.classList.add('pulse');
    setTimeout(() => randomResult.classList.remove('pulse'), 1500);
});

// ランダムテスト機能（隠し機能：コンソールから使用可能）
function randomTest(category, times = 10) {
    console.log(`🧪 ${category}のランダムテストを${times}回実行:`);
    let results = {};
    let targetArray;
    
    switch(category.toLowerCase()) {
        case "fruits":
        case "fruit":
        case "果物":
            targetArray = gameData.fruits;
            break;
        case "colors":
        case "color":
        case "色":
            targetArray = gameData.colors.map(c => c.name);
            break;
        case "music":
        case "音楽":
            targetArray = gameData.music;
            break;
        default:
            console.log("❌ 無効なカテゴリです。使用可能: 'fruits', 'colors', 'music'");
            return;
    }
    
    // テスト実行
    for (let i = 0; i < times; i++) {
        let randomIndex = Math.floor(Math.random() * targetArray.length);
        let selectedItem = targetArray[randomIndex];
        results[selectedItem] = (results[selectedItem] || 0) + 1;
    }
    
    console.table(results);
    console.log(`📊 各要素の選択回数を確認できます`);
}

// Math.randomの詳細分析機能（隠し機能：コンソールから使用可能）
function analyzeRandom(samples = 1000) {
    console.log(`🔍 Math.random()の分析（サンプル数: ${samples}）:`);
    let values = [];
    let distribution = { "0-0.2": 0, "0.2-0.4": 0, "0.4-0.6": 0, "0.6-0.8": 0, "0.8-1.0": 0 };
    
    for (let i = 0; i < samples; i++) {
        let rand = Math.random();
        values.push(rand);
        
        if (rand < 0.2) distribution["0-0.2"]++;
        else if (rand < 0.4) distribution["0.2-0.4"]++;
        else if (rand < 0.6) distribution["0.4-0.6"]++;
        else if (rand < 0.8) distribution["0.6-0.8"]++;
        else distribution["0.8-1.0"]++;
    }
    
    let min = Math.min(...values);
    let max = Math.max(...values);
    let avg = values.reduce((a, b) => a + b) / values.length;
    
    console.log(`最小値: ${min.toFixed(6)}`);
    console.log(`最大値: ${max.toFixed(6)}`);
    console.log(`平均値: ${avg.toFixed(6)}`);
    console.log(`分布:`, distribution);
    console.log(`📈 理想的には各区間が約${samples/5}回ずつになるはずです`);
}

// 初期化処理
displayDataArrays();
updateStatsDisplay();

// ヘルプ情報をコンソールに出力
console.log("✅ ランダム選択システムが初期化されました！");
console.log("📊 使用可能なデータ:");
console.log(`  果物: [${gameData.fruits.join(", ")}] (${gameData.fruits.length}個)`);
console.log(`  色: [${gameData.colors.map(c => c.name).join(", ")}] (${gameData.colors.length}個)`);
console.log(`  音楽: [${gameData.music.join(", ")}] (${gameData.music.length}個)`);
console.log(`  全混合: ${gameData.fruits.length + gameData.colors.length + gameData.music.length}個`);
console.log("🔧 Math.randomの範囲: 0 ≤ Math.random() < 1");
console.log("💡 隠し機能:");
console.log("  randomTest('fruits', 20) - 指定回数のランダムテスト");
console.log("  analyzeRandom(1000) - Math.random()の分析");
console.log("🎯 各ボタンをクリックして、ランダム選択システムを体験してください！");