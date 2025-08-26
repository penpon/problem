console.log("📋 配列基礎を開始します！");
console.log("=====================================");

// 学習用配列データ
let fruits = ["りんご", "バナナ", "オレンジ", "ぶどう"];
let colors = ["赤", "青", "緑", "黄色"];
let numbers = [10, 20, 30, 40, 50];

// 現在操作中の配列（初期設定）
let currentArray = [...fruits]; // fruitsのコピーを作成
let currentArrayName = "果物";

// DOM要素の取得
let contentDisplay = document.getElementById("content-display");
let currentArrayDisplay = document.getElementById("current-array");
let operationDetails = document.getElementById("operation-details");

// 配列表示を更新する関数
function updateArrayDisplays() {
    // メイン表示エリアの更新
    currentArrayDisplay.textContent = `[${currentArray.map(item => `"${item}"`).join(", ")}] (長さ: ${currentArray.length})`;
    
    // 各配列カードの更新
    document.getElementById("fruits-display").textContent = `[${fruits.map(item => `"${item}"`).join(", ")}]`;
    document.getElementById("fruits-length").textContent = fruits.length;
    
    document.getElementById("colors-display").textContent = `[${colors.map(item => `"${item}"`).join(", ")}]`;
    document.getElementById("colors-length").textContent = colors.length;
    
    document.getElementById("numbers-display").textContent = `[${numbers.join(", ")}]`;
    document.getElementById("numbers-length").textContent = numbers.length;
}

// 操作詳細を表示する関数
function showOperationDetails(operation, details) {
    operationDetails.innerHTML = `
        <strong>🔍 ${operation}の詳細:</strong><br>
        ${details}
    `;
}

// 1. 配列表示ボタン
document.getElementById("display-btn").addEventListener("click", function() {
    contentDisplay.innerHTML = `
        <h3 style="color: #4ecdc4; margin-top: 0;">📋 配列表示機能</h3>
        <div style="background: #e0f7fa; padding: 20px; border-radius: 10px; border-left: 4px solid #4ecdc4;">
            <h4>現在の${currentArrayName}配列:</h4>
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px 0; font-family: monospace;">
                [${currentArray.map(item => `"${item}"`).join(", ")}]
            </div>
            <div style="margin-top: 15px;">
                <h4>インデックス番号と要素:</h4>
                ${currentArray.map((item, index) => `
                    <div style="background: white; padding: 8px 12px; margin: 5px 0; border-radius: 6px; font-family: monospace;">
                        インデックス ${index} → "${item}"
                    </div>
                `).join('')}
            </div>
        </div>
        <p style="color: #7f8c8d; font-size: 0.9rem; margin-top: 15px;">
            💡 配列は0から始まるインデックス番号で各要素を管理します。
        </p>
    `;
    
    showOperationDetails("配列表示", `
        配列名: ${currentArrayName}配列<br>
        配列の長さ: ${currentArray.length}<br>
        各要素: ${currentArray.map((item, i) => `[${i}]="${item}"`).join(", ")}<br>
        配列の型: ${typeof currentArray} (object)
    `);
    
    console.log("📋 配列表示実行");
    console.log(`配列: [${currentArray.join(", ")}]`);
    console.log(`長さ: ${currentArray.length}`);
    console.log("インデックス詳細:", currentArray.map((item, i) => `[${i}] = "${item}"`));
});

// 2. 要素アクセスボタン
document.getElementById("access-btn").addEventListener("click", function() {
    // ランダムなインデックスを選択（0から配列長-1まで）
    let randomIndex = Math.floor(Math.random() * currentArray.length);
    let selectedElement = currentArray[randomIndex];
    
    // 最初と最後の要素も表示
    let firstElement = currentArray[0];
    let lastElement = currentArray[currentArray.length - 1];
    
    contentDisplay.innerHTML = `
        <h3 style="color: #ffa726; margin-top: 0;">🔍 要素アクセス機能</h3>
        <div style="background: #fff3e0; padding: 20px; border-radius: 10px; border-left: 4px solid #ffa726;">
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px; text-align: center;">
                <h4 style="color: #f57c00;">ランダム選択結果</h4>
                <div style="font-size: 1.5rem; color: #e65100; margin: 10px 0; font-family: monospace;">
                    ${currentArrayName}配列[${randomIndex}] = "${selectedElement}"
                </div>
                <p style="color: #bf360c; margin: 0;">
                    インデックス${randomIndex}の要素が選ばれました
                </p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                    <h5 style="color: #2e7d32; margin-bottom: 8px;">最初の要素</h5>
                    <div style="font-family: monospace; font-size: 1.1rem; color: #1b5e20;">
                        [0] = "${firstElement}"
                    </div>
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                    <h5 style="color: #c62828; margin-bottom: 8px;">最後の要素</h5>
                    <div style="font-family: monospace; font-size: 1.1rem; color: #b71c1c;">
                        [${currentArray.length - 1}] = "${lastElement}"
                    </div>
                </div>
            </div>
        </div>
        <p style="color: #7f8c8d; font-size: 0.9rem; margin-top: 15px;">
            🎯 ${currentArray.length}個の要素から インデックス${randomIndex} の要素にアクセスしました
        </p>
    `;
    
    showOperationDetails("要素アクセス", `
        選択されたインデックス: ${randomIndex}<br>
        選択された要素: "${selectedElement}"<br>
        最初の要素: [0] = "${firstElement}"<br>
        最後の要素: [${currentArray.length - 1}] = "${lastElement}"<br>
        アクセス方法: ${currentArrayName}配列[インデックス番号]
    `);
    
    console.log("🔍 要素アクセス実行");
    console.log(`選択インデックス: ${randomIndex}`);
    console.log(`選択要素: "${selectedElement}"`);
    console.log(`最初: [0] = "${firstElement}"`);
    console.log(`最後: [${currentArray.length - 1}] = "${lastElement}"`);
});

// 3. 要素追加ボタン
document.getElementById("add-btn").addEventListener("click", function() {
    // 配列の種類に応じて適切な要素を追加
    let newElement;
    let oldLength = currentArray.length;
    
    if (currentArrayName === "果物") {
        let additionalFruits = ["いちご", "メロン", "パイナップル", "キウイ", "マンゴー"];
        newElement = additionalFruits[Math.floor(Math.random() * additionalFruits.length)];
    } else if (currentArrayName === "色") {
        let additionalColors = ["紫", "オレンジ", "ピンク", "茶色", "グレー"];
        newElement = additionalColors[Math.floor(Math.random() * additionalColors.length)];
    } else {
        // 数字の場合
        newElement = (currentArray.length + 1) * 10;
    }
    
    // 要素を配列の末尾に追加
    currentArray.push(newElement);
    let newLength = currentArray.length;
    
    contentDisplay.innerHTML = `
        <h3 style="color: #66bb6a; margin-top: 0;">➕ 要素追加機能</h3>
        <div style="background: #e8f5e9; padding: 20px; border-radius: 10px; border-left: 4px solid #66bb6a;">
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="color: #2e7d32;">要素追加結果</h4>
                <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 15px; align-items: center; margin: 15px 0;">
                    <div style="text-align: center;">
                        <h5 style="color: #757575; margin-bottom: 8px;">変更前</h5>
                        <div style="font-family: monospace; font-size: 0.9rem; padding: 10px; background: #f5f5f5; border-radius: 6px;">
                            [${currentArray.slice(0, -1).map(item => `"${item}"`).join(", ")}]
                        </div>
                        <div style="color: #757575; font-size: 0.8rem; margin-top: 5px;">
                            長さ: ${oldLength}
                        </div>
                    </div>
                    <div style="font-size: 2rem; color: #4caf50;">→</div>
                    <div style="text-align: center;">
                        <h5 style="color: #2e7d32; margin-bottom: 8px;">変更後</h5>
                        <div style="font-family: monospace; font-size: 0.9rem; padding: 10px; background: #c8e6c9; border-radius: 6px;">
                            [${currentArray.map(item => `"${item}"`).join(", ")}]
                        </div>
                        <div style="color: #2e7d32; font-size: 0.8rem; margin-top: 5px;">
                            長さ: ${newLength}
                        </div>
                    </div>
                </div>
                <div style="background: #c8e6c9; padding: 12px; border-radius: 8px; text-align: center;">
                    <strong>追加された要素: "${newElement}" (インデックス: ${newLength - 1})</strong>
                </div>
            </div>
        </div>
        <p style="color: #7f8c8d; font-size: 0.9rem; margin-top: 15px;">
            ✅ push()メソッドで配列の末尾に要素が追加されました
        </p>
    `;
    
    showOperationDetails("要素追加 (push)", `
        使用メソッド: ${currentArrayName}配列.push("${newElement}")<br>
        追加前の長さ: ${oldLength}<br>
        追加後の長さ: ${newLength}<br>
        追加された要素: "${newElement}"<br>
        追加位置: インデックス ${newLength - 1} (末尾)
    `);
    
    // 配列表示を更新
    updateArrayDisplays();
    
    console.log("➕ 要素追加実行");
    console.log(`追加要素: "${newElement}"`);
    console.log(`変更前: [${currentArray.slice(0, -1).join(", ")}] (長さ: ${oldLength})`);
    console.log(`変更後: [${currentArray.join(", ")}] (長さ: ${newLength})`);
});

// 4. 要素削除ボタン
document.getElementById("remove-btn").addEventListener("click", function() {
    if (currentArray.length === 0) {
        contentDisplay.innerHTML = `
            <h3 style="color: #ef5350; margin-top: 0;">➖ 要素削除機能</h3>
            <div style="background: #ffebee; padding: 20px; border-radius: 10px; border-left: 4px solid #ef5350;">
                <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 3rem; color: #ef5350;">⚠️</div>
                    <h4 style="color: #c62828; margin: 15px 0;">配列が空です</h4>
                    <p style="color: #d32f2f; margin: 0;">
                        削除する要素がありません。まず要素を追加してください。
                    </p>
                </div>
            </div>
        `;
        
        showOperationDetails("要素削除エラー", `
            エラー: 空の配列からは要素を削除できません<br>
            現在の配列長: ${currentArray.length}<br>
            対処方法: 先に要素を追加してから削除を試してください
        `);
        
        console.log("⚠️ 削除エラー: 配列が空です");
        return;
    }
    
    let oldLength = currentArray.length;
    let removedElement = currentArray.pop(); // 末尾の要素を削除
    let newLength = currentArray.length;
    
    contentDisplay.innerHTML = `
        <h3 style="color: #ef5350; margin-top: 0;">➖ 要素削除機能</h3>
        <div style="background: #ffebee; padding: 20px; border-radius: 10px; border-left: 4px solid #ef5350;">
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="color: #c62828;">要素削除結果</h4>
                <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 15px; align-items: center; margin: 15px 0;">
                    <div style="text-align: center;">
                        <h5 style="color: #757575; margin-bottom: 8px;">変更前</h5>
                        <div style="font-family: monospace; font-size: 0.9rem; padding: 10px; background: #f5f5f5; border-radius: 6px;">
                            [${[...currentArray, removedElement].map(item => `"${item}"`).join(", ")}]
                        </div>
                        <div style="color: #757575; font-size: 0.8rem; margin-top: 5px;">
                            長さ: ${oldLength}
                        </div>
                    </div>
                    <div style="font-size: 2rem; color: #f44336;">→</div>
                    <div style="text-align: center;">
                        <h5 style="color: #c62828; margin-bottom: 8px;">変更後</h5>
                        <div style="font-family: monospace; font-size: 0.9rem; padding: 10px; background: #ffcdd2; border-radius: 6px;">
                            ${currentArray.length > 0 ? `[${currentArray.map(item => `"${item}"`).join(", ")}]` : '[ ] (空の配列)'}
                        </div>
                        <div style="color: #c62828; font-size: 0.8rem; margin-top: 5px;">
                            長さ: ${newLength}
                        </div>
                    </div>
                </div>
                <div style="background: #ffcdd2; padding: 12px; border-radius: 8px; text-align: center;">
                    <strong>削除された要素: "${removedElement}" (元インデックス: ${oldLength - 1})</strong>
                </div>
            </div>
        </div>
        <p style="color: #7f8c8d; font-size: 0.9rem; margin-top: 15px;">
            ✅ pop()メソッドで配列の末尾から要素が削除されました
        </p>
    `;
    
    showOperationDetails("要素削除 (pop)", `
        使用メソッド: ${currentArrayName}配列.pop()<br>
        削除前の長さ: ${oldLength}<br>
        削除後の長さ: ${newLength}<br>
        削除された要素: "${removedElement}"<br>
        削除位置: インデックス ${oldLength - 1} (末尾)
    `);
    
    // 配列表示を更新
    updateArrayDisplays();
    
    console.log("➖ 要素削除実行");
    console.log(`削除要素: "${removedElement}"`);
    console.log(`変更前: [${[...currentArray, removedElement].join(", ")}] (長さ: ${oldLength})`);
    console.log(`変更後: [${currentArray.join(", ")}] (長さ: ${newLength})`);
});

// 配列切り替え機能（隠し機能：コンソールから使用可能）
function switchArray(arrayName) {
    switch(arrayName.toLowerCase()) {
        case "fruit":
        case "fruits":
        case "果物":
            currentArray = [...fruits];
            currentArrayName = "果物";
            break;
        case "color":
        case "colors":
        case "色":
            currentArray = [...colors];
            currentArrayName = "色";
            break;
        case "number":
        case "numbers":
        case "数字":
            currentArray = [...numbers];
            currentArrayName = "数字";
            break;
        default:
            console.log("❌ 無効な配列名です。使用可能: 'fruits', 'colors', 'numbers'");
            return;
    }
    
    updateArrayDisplays();
    console.log(`✅ 配列を${currentArrayName}配列に切り替えました`);
    console.log(`現在の配列: [${currentArray.join(", ")}]`);
}

// 初期化処理
updateArrayDisplays();

// ヘルプ情報をコンソールに出力
console.log("✅ 配列基礎システムが初期化されました！");
console.log("📊 使用可能な配列:", { fruits, colors, numbers });
console.log("🔧 配列操作メソッド:", ["push()", "pop()", "length", "インデックスアクセス[i]"]);
console.log("💡 隠し機能: switchArray('fruits')で配列切り替え可能");
console.log("🎯 各ボタンをクリックして、配列の基本操作を学習してください！");