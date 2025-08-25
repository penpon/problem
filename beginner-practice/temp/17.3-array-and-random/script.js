        console.log("🎲 ステップ17.3: 配列とランダムを開始します！");
        console.log("=====================================");
        
        // データ配列の定義
        const dataArrays = {
            quotes: [
                "成功は偶然ではない。それは努力、準備、継続学習の結果です。",
                "プログラミングを学ぶことは、考え方を学ぶことです。",
                "最も困難な道が、最も美しい目的地に続いている。",
                "今日の成果は、昨日の努力の結果です。",
                "コードは詩であり、論理は音楽です。",
                "エラーは失敗ではなく、学習の機会です。",
                "小さな一歩が大きな変化を生み出します。",
                "夢を持ち、学び続け、決して諦めない。"
            ],
            colors: [
                { name: "夕焼けオレンジ", code: "#ff6b6b", bg: "linear-gradient(135deg, #ff6b6b, #ffa726)" },
                { name: "海の青", code: "#4ecdc4", bg: "linear-gradient(135deg, #4ecdc4, #44a08d)" },
                { name: "森の緑", code: "#56ab2f", bg: "linear-gradient(135deg, #56ab2f, #a8e6cf)" },
                { name: "ラベンダー紫", code: "#667eea", bg: "linear-gradient(135deg, #667eea, #764ba2)" },
                { name: "ピンクローズ", code: "#fa709a", bg: "linear-gradient(135deg, #fa709a, #fee140)" },
                { name: "ミントグリーン", code: "#a8edea", bg: "linear-gradient(135deg, #a8edea, #fed6e3)" }
            ],
            animals: [
                "🐶 忠実なコーギー", "🐱 優雅なペルシャ猫", "🐰 ふわふわうさぎ",
                "🦊 賢いキツネ", "🐻 穏やかなパンダ", "🐨 のんびりコアラ",
                "🦁 勇敢なライオン", "🐯 美しいトラ", "🐸 元気なカエル",
                "🦋 美しい蝶々", "🐧 愛らしいペンギン", "🦄 幻想的なユニコーン"
            ],
            foods: [
                "🍕 チーズピザ", "🍔 ジューシーハンバーガー", "🍜 温かいラーメン",
                "🍣 新鮮な寿司", "🍰 甘いケーキ", "🍦 冷たいアイスクリーム",
                "🥘 スパイシーカレー", "🍓 甘酸っぱいイチゴ", "🥗 フレッシュサラダ",
                "🍪 サクサククッキー", "🥐 バターたっぷりクロワッサン", "🍯 天然ハチミツ"
            ],
            hobbies: [
                "📚 読書で知識を深める", "🎵 音楽を楽しむ", "🎨 絵を描く",
                "📷 写真撮影", "🏃‍♀️ ランニング", "🧘‍♀️ ヨガで心を整える",
                "🌱 ガーデニング", "🍳 料理を作る", "✈️ 旅行で新しい場所を発見",
                "🎯 新しいスキル学習", "📝 ブログを書く", "🎮 ゲームを楽しむ"
            ],
            numbers: Array.from({length: 20}, (_, i) => i * 5 + 1) // [1, 6, 11, 16, ..., 96]
        };
        
        // 統計用変数
        let totalSelections = 0;
        let selectionCounts = {
            quote: 0, color: 0, animal: 0, food: 0, hobby: 0, number: 0, all: 0
        };
        
        // DOM要素の取得
        let contentDisplay = document.getElementById("content-display");
        let currentSelection = document.getElementById("current-selection");
        let randomProcess = document.getElementById("random-process");
        
        // ランダム選択を処理する共通関数
        function performRandomSelection(arrayKey, displayType, buttonName) {
            let selectedArray = dataArrays[arrayKey];
            let randomIndex = Math.floor(Math.random() * selectedArray.length);
            let selectedItem = selectedArray[randomIndex];
            
            // 統計を更新
            totalSelections++;
            if (selectionCounts.hasOwnProperty(displayType)) {
                selectionCounts[displayType]++;
            }
            
            // 処理詳細を表示
            randomProcess.innerHTML = `
                <strong>🔍 ランダム処理詳細:</strong><br>
                配列: ${arrayKey} (長さ: ${selectedArray.length})<br>
                生成された乱数: ${Math.random().toFixed(4)}<br>
                インデックス: ${randomIndex}<br>
                選択された要素: "${typeof selectedItem === 'object' ? selectedItem.name : selectedItem}"
            `;
            
            updateStats();
            
            // ログ出力
            console.log(`${buttonName}: ランダム選択実行`);
            console.log(`配列: ${arrayKey}, インデックス: ${randomIndex}, 選択: ${JSON.stringify(selectedItem)}`);
            
            return { selectedItem, randomIndex, arrayLength: selectedArray.length };
        }
        
        // 統計表示を更新する関数
        function updateStats() {
            document.getElementById("total-selections").textContent = totalSelections;
            document.getElementById("quote-count").textContent = selectionCounts.quote;
            document.getElementById("color-count").textContent = selectionCounts.color;
            document.getElementById("animal-count").textContent = selectionCounts.animal;
            document.getElementById("food-count").textContent = selectionCounts.food;
            document.getElementById("hobby-count").textContent = selectionCounts.hobby;
            document.getElementById("number-count").textContent = selectionCounts.number;
            document.getElementById("all-count").textContent = selectionCounts.all;
        }
        
        // 配列表示を更新する関数
        function displayArrays() {
            document.getElementById("quotes-display").textContent = `[${dataArrays.quotes.slice(0, 3).map(q => `"${q.substring(0, 20)}..."`).join(", ")}] (${dataArrays.quotes.length}個)`;
            document.getElementById("colors-display").textContent = `[${dataArrays.colors.slice(0, 3).map(c => c.name).join(", ")}] (${dataArrays.colors.length}個)`;
            document.getElementById("animals-display").textContent = `[${dataArrays.animals.slice(0, 6).join(", ")}] (${dataArrays.animals.length}個)`;
            document.getElementById("foods-display").textContent = `[${dataArrays.foods.slice(0, 6).join(", ")}] (${dataArrays.foods.length}個)`;
            document.getElementById("hobbies-display").textContent = `[${dataArrays.hobbies.slice(0, 4).join(", ")}] (${dataArrays.hobbies.length}個)`;
            document.getElementById("numbers-display").textContent = `[${dataArrays.numbers.slice(0, 8).join(", ")}...] (${dataArrays.numbers.length}個)`;
        }
        
        // 名言ランダムボタン
        document.getElementById("quote-btn").addEventListener("click", function() {
            let result = performRandomSelection("quotes", "quote", "名言ボタン");
            
            contentDisplay.innerHTML = `
                <h3 style="color: #27ae60; margin-top: 0;">💬 今日の名言</h3>
                <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; border-left: 4px solid #27ae60;">
                    <p style="font-size: 1.2rem; font-style: italic; margin: 0; color: #2c3e50;">
                        "${result.selectedItem}"
                    </p>
                </div>
                <p style="color: #7f8c8d; font-size: 0.9rem; margin-top: 15px;">
                    📍 配列の ${result.randomIndex + 1} 番目の名言が選ばれました（全${result.arrayLength}個中）
                </p>
            `;
            
            currentSelection.style.display = "block";
            currentSelection.textContent = `選択: ${result.selectedItem.substring(0, 30)}...`;
        });
        
        // 色ランダムボタン
        document.getElementById("color-btn").addEventListener("click", function() {
            let result = performRandomSelection("colors", "color", "色ボタン");
            let colorObj = result.selectedItem;
            
            contentDisplay.innerHTML = `
                <h3 style="color: #8e44ad; margin-top: 0;">🎨 ランダムカラー</h3>
                <div style="background: ${colorObj.bg}; color: white; padding: 25px; border-radius: 15px; text-align: center;">
                    <h2 style="margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                        ${colorObj.name}
                    </h2>
                    <p style="font-family: monospace; font-size: 1.1rem; margin: 10px 0;">
                        カラーコード: ${colorObj.code}
                    </p>
                </div>
                <p style="color: #7f8c8d; font-size: 0.9rem; margin-top: 15px;">
                    🎯 ${result.arrayLength}色の中から ${result.randomIndex + 1} 番目の色が選ばれました
                </p>
            `;
            
            currentSelection.style.display = "block";
            currentSelection.textContent = `選択: ${colorObj.name}`;
            currentSelection.style.background = colorObj.bg;
        });
        
        // 動物ランダムボタン
        document.getElementById("animal-btn").addEventListener("click", function() {
            let result = performRandomSelection("animals", "animal", "動物ボタン");
            
            contentDisplay.innerHTML = `
                <h3 style="color: #f39c12; margin-top: 0;">🐾 今日の動物パートナー</h3>
                <div style="background: linear-gradient(135deg, #f39c12, #f1c40f); color: white; padding: 25px; border-radius: 15px; text-align: center;">
                    <div style="font-size: 4rem; margin: 10px 0;">
                        ${result.selectedItem.charAt(0)}
                    </div>
                    <h2 style="margin: 10px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                        ${result.selectedItem.substring(2)}
                    </h2>
                    <p style="font-style: italic; margin: 0;">
                        あなたの今日の動物パートナーです！
                    </p>
                </div>
                <p style="color: #7f8c8d; font-size: 0.9rem; margin-top: 15px;">
                    🎲 ${result.arrayLength}匹の中から ${result.randomIndex + 1} 番目の動物が選ばれました
                </p>
            `;
            
            currentSelection.style.display = "block";
            currentSelection.textContent = `選択: ${result.selectedItem}`;
        });
        
        // 食べ物ランダムボタン
        document.getElementById("food-btn").addEventListener("click", function() {
            let result = performRandomSelection("foods", "food", "食べ物ボタン");
            
            contentDisplay.innerHTML = `
                <h3 style="color: #e67e22; margin-top: 0;">🍕 今日のおすすめグルメ</h3>
                <div style="background: linear-gradient(135deg, #e67e22, #f39c12); color: white; padding: 25px; border-radius: 15px; text-align: center;">
                    <div style="font-size: 4rem; margin: 10px 0;">
                        ${result.selectedItem.charAt(0)}
                    </div>
                    <h2 style="margin: 10px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                        ${result.selectedItem.substring(2)}
                    </h2>
                    <p style="font-style: italic; margin: 0;">
                        今日はこれを食べてみませんか？
                    </p>
                </div>
                <p style="color: #7f8c8d; font-size: 0.9rem; margin-top: 15px;">
                    🎯 ${result.arrayLength}種類の中から ${result.randomIndex + 1} 番目の食べ物が選ばれました
                </p>
            `;
            
            currentSelection.style.display = "block";
            currentSelection.textContent = `選択: ${result.selectedItem}`;
        });
        
        // 趣味ランダムボタン
        document.getElementById("hobby-btn").addEventListener("click", function() {
            let result = performRandomSelection("hobbies", "hobby", "趣味ボタン");
            
            contentDisplay.innerHTML = `
                <h3 style="color: #9b59b6; margin-top: 0;">🎯 今日の趣味提案</h3>
                <div style="background: linear-gradient(135deg, #9b59b6, #8e44ad); color: white; padding: 25px; border-radius: 15px; text-align: center;">
                    <div style="font-size: 4rem; margin: 10px 0;">
                        ${result.selectedItem.charAt(0)}
                    </div>
                    <h2 style="margin: 10px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                        ${result.selectedItem.substring(2)}
                    </h2>
                    <p style="font-style: italic; margin: 0;">
                        新しい趣味を始めてみませんか？
                    </p>
                </div>
                <p style="color: #7f8c8d; font-size: 0.9rem; margin-top: 15px;">
                    ✨ ${result.arrayLength}個の趣味から ${result.randomIndex + 1} 番目が選ばれました
                </p>
            `;
            
            currentSelection.style.display = "block";
            currentSelection.textContent = `選択: ${result.selectedItem}`;
        });
        
        // 数字ランダムボタン
        document.getElementById("number-btn").addEventListener("click", function() {
            let result = performRandomSelection("numbers", "number", "数字ボタン");
            
            contentDisplay.innerHTML = `
                <h3 style="color: #3498db; margin-top: 0;">🔢 ラッキーナンバー</h3>
                <div style="background: linear-gradient(135deg, #3498db, #2980b9); color: white; padding: 25px; border-radius: 15px; text-align: center;">
                    <div style="font-size: 5rem; font-weight: bold; margin: 20px 0; text-shadow: 3px 3px 6px rgba(0,0,0,0.3);">
                        ${result.selectedItem}
                    </div>
                    <h3 style="margin: 10px 0;">あなたの今日のラッキーナンバー！</h3>
                    <p style="font-style: italic; margin: 0;">
                        この数字が幸運を運んでくるかも！
                    </p>
                </div>
                <p style="color: #7f8c8d; font-size: 0.9rem; margin-top: 15px;">
                    🎲 1-100の数字から ${result.selectedItem} が選ばれました（インデックス: ${result.randomIndex}）
                </p>
            `;
            
            currentSelection.style.display = "block";
            currentSelection.textContent = `選択: ${result.selectedItem}`;
        });
        
        // 全混合ランダムボタン
        document.getElementById("all-btn").addEventListener("click", function() {
            // 全配列を統合
            let allItems = [
                ...dataArrays.quotes.map(item => ({ type: "名言", content: item })),
                ...dataArrays.colors.map(item => ({ type: "色", content: item.name })),
                ...dataArrays.animals.map(item => ({ type: "動物", content: item })),
                ...dataArrays.foods.map(item => ({ type: "食べ物", content: item })),
                ...dataArrays.hobbies.map(item => ({ type: "趣味", content: item })),
                ...dataArrays.numbers.map(item => ({ type: "数字", content: item }))
            ];
            
            let randomIndex = Math.floor(Math.random() * allItems.length);
            let selectedItem = allItems[randomIndex];
            
            totalSelections++;
            selectionCounts.all++;
            
            contentDisplay.innerHTML = `
                <h3 style="color: #e74c3c; margin-top: 0;">🌟 全混合ランダム選択</h3>
                <div style="background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; padding: 25px; border-radius: 15px; text-align: center;">
                    <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 10px; margin-bottom: 15px;">
                        <strong>カテゴリ: ${selectedItem.type}</strong>
                    </div>
                    <h2 style="margin: 10px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                        ${typeof selectedItem.content === 'string' ? selectedItem.content : selectedItem.content}
                    </h2>
                    <p style="font-style: italic; margin: 0;">
                        全${allItems.length}個のアイテムから選択！
                    </p>
                </div>
                <p style="color: #7f8c8d; font-size: 0.9rem; margin-top: 15px;">
                    🎯 ${allItems.length}個の全アイテムから ${randomIndex + 1} 番目が選ばれました
                </p>
            `;
            
            randomProcess.innerHTML = `
                <strong>🔍 全混合ランダム処理詳細:</strong><br>
                統合配列サイズ: ${allItems.length}<br>
                選択されたインデックス: ${randomIndex}<br>
                カテゴリ: ${selectedItem.type}<br>
                内容: "${selectedItem.content}"
            `;
            
            currentSelection.style.display = "block";
            currentSelection.textContent = `選択: [${selectedItem.type}] ${selectedItem.content}`;
            
            updateStats();
        });
        
        // 配列シャッフルボタン
        document.getElementById("shuffle-btn").addEventListener("click", function() {
            // 動物配列をシャッフルして表示
            let shuffledAnimals = [...dataArrays.animals];
            
            // Fisher-Yatesシャッフルアルゴリズム
            for (let i = shuffledAnimals.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [shuffledAnimals[i], shuffledAnimals[j]] = [shuffledAnimals[j], shuffledAnimals[i]];
            }
            
            contentDisplay.innerHTML = `
                <h3 style="color: #95a5a6; margin-top: 0;">🔄 配列シャッフル結果</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 2px solid #95a5a6; color: #2c3e50;">
                    <h4>元の配列:</h4>
                    <div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin: 10px 0; font-family: monospace; word-break: break-all;">
                        [${dataArrays.animals.join(", ")}]
                    </div>
                    <h4>シャッフル後:</h4>
                    <div style="background: #d4edda; padding: 15px; border-radius: 5px; margin: 10px 0; font-family: monospace; word-break: break-all;">
                        [${shuffledAnimals.join(", ")}]
                    </div>
                </div>
                <p style="color: #7f8c8d; font-size: 0.9rem; margin-top: 15px;">
                    🔀 Fisher-Yatesアルゴリズムを使用して配列をシャッフルしました
                </p>
            `;
            
            randomProcess.innerHTML = `
                <strong>🔍 シャッフル処理詳細:</strong><br>
                使用アルゴリズム: Fisher-Yates<br>
                配列長: ${dataArrays.animals.length}<br>
                シャッフル回数: ${dataArrays.animals.length - 1}<br>
                結果: 完全にランダムな順序
            `;
            
            currentSelection.style.display = "block";
            currentSelection.textContent = `シャッフル完了: ${shuffledAnimals.length}要素`;
            
            console.log("🔄 配列シャッフル実行");
            console.log("元の配列:", dataArrays.animals);
            console.log("シャッフル後:", shuffledAnimals);
        });
        
        // 初期化処理
        displayArrays();
        updateStats();
        
        console.log("✅ 配列とランダムシステムが初期化されました！");
        console.log("📊 使用可能な配列:", Object.keys(dataArrays));
        console.log("🎲 Math.random()の動作テスト:", Math.random());
        console.log("💡 各ボタンをクリックして、ランダム選択を体験してください！");