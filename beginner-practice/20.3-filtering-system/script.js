        // === 20.3 メイン学習テーマ: filter() による商品フィルタリング ===

        // 1. 拡張された商品データ配列（20.2の6商品から8商品に拡張）
        let products = [
            // 20.2からの6商品
            {
                id: 1,
                name: "プレミアム Tシャツ",
                category: "fashion",
                price: 2980,
                description: "肌触りの良い上質なコットン100%素材",
                emoji: "👕",
                likes: 0,
                isLiked: false
            },
            {
                id: 2,
                name: "ワイヤレス イヤホン",
                category: "electronics",
                price: 8900,
                description: "高音質・長時間バッテリーのプロ仕様",
                emoji: "🎧",
                likes: 0,
                isLiked: false
            },
            {
                id: 3,
                name: "ランニング シューズ",
                category: "sports",
                price: 12000,
                description: "軽量で足への負担を軽減する設計",
                emoji: "👟",
                likes: 0,
                isLiked: false
            },
            {
                id: 4,
                name: "レザー ウォレット",
                category: "accessories",
                price: 5500,
                description: "職人手作りの本革長財布",
                emoji: "👛",
                likes: 0,
                isLiked: false
            },
            {
                id: 5,
                name: "スマート ウォッチ",
                category: "electronics",
                price: 25000,
                description: "健康管理・通知機能搭載の多機能型",
                emoji: "⌚",
                likes: 0,
                isLiked: false
            },
            {
                id: 6,
                name: "デニム ジャケット",
                category: "fashion",
                price: 7800,
                description: "カジュアルからきれいめまで対応",
                emoji: "🧥",
                likes: 0,
                isLiked: false
            },
            // 20.3で新規追加の2商品
            {
                id: 7,
                name: "バックパック",
                category: "accessories",
                price: 6800,
                description: "通学・通勤に最適な大容量リュック",
                emoji: "🎒",
                likes: 0,
                isLiked: false
            },
            {
                id: 8,
                name: "Bluetooth スピーカー",
                category: "electronics",
                price: 4500,
                description: "高音質でポータブルなワイヤレススピーカー",
                emoji: "🔊",
                likes: 0,
                isLiked: false
            }
        ];

        // 2. フィルタ状態管理（新機能！）
        let currentFilters = {
            category: 'all',
            price: 'all'
        };

        // 3. DOM要素の取得
        const productsGrid = document.getElementById('productsGrid');
        const filterStatus = document.getElementById('filterStatus');
        const filterResults = document.getElementById('filterResults');
        const displayedProducts = document.getElementById('displayedProducts');
        const totalProducts = document.getElementById('totalProducts');
        const totalLikes = document.getElementById('totalLikes');
        const activeFilters = document.getElementById('activeFilters');
        const filterSteps = document.getElementById('filterSteps');
        const filterStats = document.getElementById('filterStats');
        const filterInfo = document.getElementById('filterInfo');
        const resetFiltersBtn = document.getElementById('resetFilters');

        // 4. 商品カードの生成（20.2から継続、フィルタ対応）
        function createProductCard(product, originalIndex) {
            console.log(`🏗️ フィルタされた商品カード生成: ${product.name}`);
            
            // 20.2と同じ商品カード生成ロジック
            const card = document.createElement('div');
            card.className = `product-card category-${product.category}`;
            card.setAttribute('data-product-id', product.id);
            
            const imageDiv = document.createElement('div');
            imageDiv.className = 'product-image';
            imageDiv.textContent = product.emoji;
            
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'product-category';
            categoryDiv.textContent = product.category;
            
            const nameH3 = document.createElement('h3');
            nameH3.className = 'product-name';
            nameH3.textContent = product.name;
            
            const descriptionP = document.createElement('p');
            descriptionP.className = 'product-description';
            descriptionP.textContent = product.description;
            
            const priceDiv = document.createElement('div');
            priceDiv.className = 'product-price';
            priceDiv.textContent = `¥${product.price.toLocaleString()}`;
            
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'product-actions';
            
            const likeBtn = document.createElement('button');
            likeBtn.className = `btn-like ${product.isLiked ? 'liked' : ''}`;
            likeBtn.innerHTML = `❤️ ${product.isLiked ? 'いいね済み' : 'いいね'} ${product.likes}`;
            
            // いいねボタンのイベント（元配列のインデックスを使用）
            likeBtn.addEventListener('click', () => handleLike(originalIndex));
            
            actionsDiv.appendChild(likeBtn);
            card.appendChild(imageDiv);
            card.appendChild(categoryDiv);
            card.appendChild(nameH3);
            card.appendChild(descriptionP);
            card.appendChild(priceDiv);
            card.appendChild(actionsDiv);
            
            return card;
        }

        // 5. フィルタ関数（メイン学習ポイント！）
        function filterProducts() {
            console.log('🔍 フィルタリング開始:', currentFilters);
            
            // ステップ1: カテゴリフィルタ
            let filteredProducts = products.filter(product => {
                if (currentFilters.category === 'all') return true;
                return product.category === currentFilters.category;
            });
            
            console.log(`カテゴリフィルタ後: ${filteredProducts.length}商品`);
            
            // ステップ2: 価格フィルタ
            filteredProducts = filteredProducts.filter(product => {
                if (currentFilters.price === 'all') return true;
                
                switch (currentFilters.price) {
                    case 'low':
                        return product.price <= 5000;
                    case 'mid':
                        return product.price > 5000 && product.price <= 10000;
                    case 'high':
                        return product.price > 10000;
                    default:
                        return true;
                }
            });
            
            console.log(`価格フィルタ後: ${filteredProducts.length}商品`);
            updateFilterSteps(filteredProducts.length);
            
            return filteredProducts;
        }

        // 6. フィルタ結果の描画
        function renderFilteredProducts() {
            console.log('🚀 フィルタリング結果の描画開始');
            
            // 既存の表示をクリア
            productsGrid.innerHTML = '';
            
            // フィルタ処理を実行
            const filteredProducts = filterProducts();
            
            if (filteredProducts.length === 0) {
                // 結果がない場合の表示
                const noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = `
                    <span class="no-results-emoji">🚫</span>
                    条件に合う商品が見つかりませんでした
                `;
                productsGrid.appendChild(noResults);
            } else {
                // フィルタ結果を表示
                filteredProducts.forEach((product, index) => {
                    // 元配列でのインデックスを取得
                    const originalIndex = products.findIndex(p => p.id === product.id);
                    const card = createProductCard(product, originalIndex);
                    productsGrid.appendChild(card);
                    
                    // アニメーション
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        card.style.transition = 'all 0.5s ease';
                        
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    }, index * 100);
                });
            }
            
            updateFilterUI();
            updateStats(filteredProducts.length);
            console.log('🎉 フィルタリング結果の描画完了');
        }

        // 7. フィルタUIの更新
        function updateFilterUI() {
            // フィルタ状態の表示更新
            const categoryText = currentFilters.category === 'all' ? 'なし' : currentFilters.category;
            const priceText = currentFilters.price === 'all' ? 'なし' : currentFilters.price;
            
            let statusText = `8商品を表示中`;
            if (currentFilters.category !== 'all' || currentFilters.price !== 'all') {
                statusText += ` （フィルタ適用中）`;
            } else {
                statusText += ` （フィルタ：なし）`;
            }
            
            filterStatus.textContent = statusText;
            
            // フィルタ結果数の更新
            const filteredCount = filterProducts().length;
            filterResults.textContent = `8商品中 ${filteredCount}商品を表示しています`;
            
            // アクティブフィルタ数の更新
            let activeCount = 0;
            if (currentFilters.category !== 'all') activeCount++;
            if (currentFilters.price !== 'all') activeCount++;
            
            activeFilters.textContent = activeCount;
        }

        // 8. フィルタステップの可視化
        function updateFilterSteps(resultCount) {
            const steps = filterSteps.querySelectorAll('.process-step');
            steps.forEach((step, index) => {
                setTimeout(() => {
                    step.classList.add('active');
                }, index * 200);
            });
            
            // 最後のステップで結果数を表示
            setTimeout(() => {
                steps[steps.length - 1].textContent = `5. UI に結果を反映 (${resultCount}商品)`;
            }, (steps.length - 1) * 200);
        }

        // 9. いいね機能（20.2から継続）
        function handleLike(index) {
            const product = products[index];
            
            if (product.isLiked) {
                product.isLiked = false;
                product.likes = Math.max(0, product.likes - 1);
            } else {
                product.isLiked = true;
                product.likes += 1;
            }
            
            // フィルタリング結果を再描画
            renderFilteredProducts();
            console.log(`💖 ${product.name}: ${product.likes}いいね`);
        }

        // 10. 統計情報の更新
        function updateStats(filteredCount) {
            const total = products.reduce((sum, product) => sum + product.likes, 0);
            
            displayedProducts.textContent = filteredCount;
            totalProducts.textContent = products.length;
            totalLikes.textContent = total;
            
            updateFilterStats();
        }

        // 11. フィルタ統計の更新
        function updateFilterStats() {
            const categories = [...new Set(products.map(p => p.category))];
            const filteredProducts = filterProducts();
            
            filterStats.innerHTML = '';
            
            // 各カテゴリの表示数
            categories.forEach(category => {
                const totalCount = products.filter(p => p.category === category).length;
                const filteredCount = filteredProducts.filter(p => p.category === category).length;
                
                const statItem = document.createElement('div');
                statItem.className = 'filter-stat-item';
                
                statItem.innerHTML = `
                    <div class="stat-value">${filteredCount} / ${totalCount}</div>
                    <div class="stat-desc">${category}</div>
                `;
                
                filterStats.appendChild(statItem);
            });
        }

        // 12. フィルタボタンのイベント処理
        function initializeFilterButtons() {
            // カテゴリフィルタボタン
            const categoryButtons = document.querySelectorAll('#categoryFilters .filter-btn');
            categoryButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const category = btn.getAttribute('data-category');
                    currentFilters.category = category;
                    
                    // ボタンの状態更新
                    categoryButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    renderFilteredProducts();
                    console.log(`カテゴリフィルタ設定: ${category}`);
                });
            });
            
            // 価格フィルタボタン
            const priceButtons = document.querySelectorAll('#priceFilters .filter-btn');
            priceButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const price = btn.getAttribute('data-price');
                    currentFilters.price = price;
                    
                    // ボタンの状態更新
                    priceButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    renderFilteredProducts();
                    console.log(`価格フィルタ設定: ${price}`);
                });
            });
        }

        // 13. フィルタリセット機能
        function resetAllFilters() {
            currentFilters.category = 'all';
            currentFilters.price = 'all';
            
            // ボタン状態をリセット
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-category') === 'all' || 
                    btn.getAttribute('data-price') === 'all') {
                    btn.classList.add('active');
                }
            });
            
            renderFilteredProducts();
            console.log('🔄 全フィルタをリセットしました');
        }

        // 14. データの保存・読み込み
        function saveData() {
            try {
                const dataToSave = {
                    products: products,
                    filters: currentFilters
                };
                localStorage.setItem('productsData_v3', JSON.stringify(dataToSave));
            } catch (error) {
                console.error('データ保存エラー:', error);
            }
        }

        function loadData() {
            try {
                const savedData = localStorage.getItem('productsData_v3');
                if (savedData) {
                    const data = JSON.parse(savedData);
                    products = data.products || products;
                    currentFilters = data.filters || currentFilters;
                    console.log('💾 保存されたデータとフィルタ状態を復元');
                }
            } catch (error) {
                console.error('データ読み込みエラー:', error);
            }
        }

        // 15. イベントリスナーの設定
        resetFiltersBtn.addEventListener('click', resetAllFilters);

        // 16. 初期化処理
        document.addEventListener('DOMContentLoaded', function() {
            console.log('=== 20.3 フィルタリングシステム学習モード開始 ===');
            console.log('新しい学習テーマ: filter() メソッドによる商品絞り込み');
            console.log('重要ポイント: filter()、条件関数、複合フィルタ');
            
            loadData();
            initializeFilterButtons();
            
            // 初期レンダリング
            setTimeout(() => {
                renderFilteredProducts();
            }, 500);
            
            console.log('🔍 8商品のフィルタリングシステムが稼働中');
            console.log('💡 カテゴリと価格でリアルタイム絞り込みができます！');
        });

        // 17. 学習用のグローバル関数
        window.showFilterProcess = function() {
            console.log('=== フィルタリングプロセスの詳細 ===');
            console.log('1. filter() メソッドで条件関数を実行');
            console.log('2. 各商品に対して条件をチェック');
            console.log('3. 条件に合う商品だけ新配列に収集');
            console.log('4. 元の配列は変更せず、新しい配列を返却');
            console.log('5. フィルタ結果をUIに反映');
            console.log('現在のフィルタ:', currentFilters);
            console.log('フィルタ結果数:', filterProducts().length);
        };

        // 18. データ保存の定期実行
        setInterval(saveData, 5000);

        console.log('💡 コンソールで showFilterProcess() を実行するとフィルタプロセスの詳細が確認できます！');