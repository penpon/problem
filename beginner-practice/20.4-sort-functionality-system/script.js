        // === 20.4 メイン学習テーマ: sort() による商品並び替え ===

        // 1. 拡張された商品データ配列（20.3の8商品から10商品に拡張）
        let products = [
            // 20.3からの8商品
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
            },
            // 20.4で新規追加の2商品
            {
                id: 9,
                name: "フィットネス マット",
                category: "sports",
                price: 3200,
                description: "滑り止め付きヨガ・エクササイズマット",
                emoji: "🧘‍♀️",
                likes: 0,
                isLiked: false
            },
            {
                id: 10,
                name: "ワイヤレス マウス",
                category: "electronics",
                price: 2800,
                description: "精密操作可能な無線光学マウス",
                emoji: "🖱️",
                likes: 0,
                isLiked: false
            }
        ];

        // 2. フィルタ・ソート状態管理（拡張！）
        let currentFilters = {
            category: 'all',
            price: 'all'
        };

        let currentSort = 'default';

        // 3. DOM要素の取得
        const productsGrid = document.getElementById('productsGrid');
        const systemStatus = document.getElementById('systemStatus');
        const processResults = document.getElementById('processResults');
        const processOrder = document.getElementById('processOrder');
        const displayedProducts = document.getElementById('displayedProducts');
        const totalProducts = document.getElementById('totalProducts');
        const totalLikes = document.getElementById('totalLikes');
        const activeOperations = document.getElementById('activeOperations');
        const sortSelect = document.getElementById('sortSelect');
        const sortIndicator = document.getElementById('sortIndicator');
        const sortSteps = document.getElementById('sortSteps');
        const sortStats = document.getElementById('sortStats');
        const sortInfo = document.getElementById('sortInfo');
        const resetAllBtn = document.getElementById('resetAll');

        // 4. 商品カードの生成（20.3から継続、ソート順序表示追加）
        function createProductCard(product, originalIndex, sortOrder) {
            console.log(`🏗️ ソート済み商品カード生成: ${product.name} (順位: ${sortOrder})`);
            
            const card = document.createElement('div');
            card.className = `product-card category-${product.category}`;
            card.setAttribute('data-product-id', product.id);
            card.setAttribute('data-sort-order', sortOrder);
            
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

        // 5. フィルタ関数（20.3から継続）
        function filterProducts() {
            console.log('🔍 フィルタリング開始:', currentFilters);
            
            let filteredProducts = products.filter(product => {
                if (currentFilters.category === 'all') return true;
                return product.category === currentFilters.category;
            });
            
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
            
            console.log(`フィルタ後: ${filteredProducts.length}商品`);
            return filteredProducts;
        }

        // 6. ソート関数（メイン学習ポイント！）
        function sortProducts(products) {
            console.log('📊 ソート処理開始:', currentSort);
            
            // 元配列を変更しないようにコピーを作成（重要ポイント！）
            const productsCopy = [...products];
            
            switch (currentSort) {
                case 'price-low':
                    // 価格昇順（安い順）
                    return productsCopy.sort((a, b) => a.price - b.price);
                
                case 'price-high':
                    // 価格降順（高い順）
                    return productsCopy.sort((a, b) => b.price - a.price);
                
                case 'likes':
                    // いいね数降順（多い順）
                    return productsCopy.sort((a, b) => b.likes - a.likes);
                
                case 'name':
                    // 名前昇順（あいうえお順）
                    return productsCopy.sort((a, b) => a.name.localeCompare(b.name, 'ja'));
                
                case 'default':
                default:
                    // デフォルト（ID順）
                    return productsCopy.sort((a, b) => a.id - b.id);
            }
        }

        // 7. フィルタ+ソート統合処理
        function processProducts() {
            console.log('🚀 フィルタ+ソート統合処理開始');
            
            // ステップ1: フィルタリング
            const filteredProducts = filterProducts();
            
            // ステップ2: ソート
            const sortedProducts = sortProducts(filteredProducts);
            
            console.log(`最終処理結果: ${sortedProducts.length}商品`);
            updateSortSteps(sortedProducts.length);
            
            return sortedProducts;
        }

        // 8. 処理結果の描画
        function renderProcessedProducts() {
            console.log('🚀 フィルタ+ソート結果の描画開始');
            
            productsGrid.innerHTML = '';
            const processedProducts = processProducts();
            
            if (processedProducts.length === 0) {
                const noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = `
                    <span class="no-results-emoji">🚫</span>
                    条件に合う商品が見つかりませんでした
                `;
                productsGrid.appendChild(noResults);
            } else {
                processedProducts.forEach((product, index) => {
                    const originalIndex = products.findIndex(p => p.id === product.id);
                    const card = createProductCard(product, originalIndex, index + 1);
                    productsGrid.appendChild(card);
                    
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        card.style.transition = 'all 0.5s ease';
                        
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    }, index * 80);
                });
            }
            
            updateUI();
            updateStats(processedProducts.length);
            console.log('🎉 フィルタ+ソート結果の描画完了');
        }

        // 9. UIの更新
        function updateUI() {
            // システム状態の表示
            let statusText = `10商品をフィルタ＆ソート処理中`;
            systemStatus.textContent = statusText;
            
            // 処理結果の表示
            const processedCount = processProducts().length;
            const processText = document.querySelector('.process-text');
            processText.textContent = `10商品中 ${processedCount}商品を表示（フィルタ + ソート適用済み）`;
            
            // ソート順序の表示
            const sortNames = {
                'default': '追加順',
                'price-low': '価格：安い順',
                'price-high': '価格：高い順',
                'likes': 'いいね順',
                'name': '名前順'
            };
            
            const currentSortName = sortNames[currentSort] || '追加順';
            processOrder.textContent = currentSortName;
            
            // ソートインジケータの更新
            const sortEmojis = {
                'default': '📋',
                'price-low': '💰⬆️',
                'price-high': '💰⬇️',
                'likes': '❤️',
                'name': '📝'
            };
            
            const emoji = sortEmojis[currentSort] || '📋';
            sortIndicator.textContent = `${emoji} ${currentSortName}で表示中`;
            
            // アクティブ操作数の計算
            let activeCount = 0;
            if (currentFilters.category !== 'all') activeCount++;
            if (currentFilters.price !== 'all') activeCount++;
            if (currentSort !== 'default') activeCount++;
            
            activeOperations.textContent = activeCount;
        }

        // 10. ソートステップの可視化
        function updateSortSteps(resultCount) {
            const steps = sortSteps.querySelectorAll('.process-step');
            steps.forEach((step, index) => {
                setTimeout(() => {
                    step.classList.add('active');
                }, index * 200);
            });
            
            setTimeout(() => {
                steps[steps.length - 1].textContent = `5. UI に並び替え結果を反映 (${resultCount}商品)`;
            }, (steps.length - 1) * 200);
        }

        // 11. いいね機能（20.3から継続）
        function handleLike(index) {
            const product = products[index];
            
            if (product.isLiked) {
                product.isLiked = false;
                product.likes = Math.max(0, product.likes - 1);
            } else {
                product.isLiked = true;
                product.likes += 1;
            }
            
            renderProcessedProducts();
            console.log(`💖 ${product.name}: ${product.likes}いいね`);
        }

        // 12. 統計情報の更新
        function updateStats(processedCount) {
            const total = products.reduce((sum, product) => sum + product.likes, 0);
            
            displayedProducts.textContent = processedCount;
            totalProducts.textContent = products.length;
            totalLikes.textContent = total;
            
            updateSortStats();
        }

        // 13. ソート統計の更新
        function updateSortStats() {
            const processedProducts = processProducts();
            
            sortStats.innerHTML = '';
            
            // 価格範囲
            if (processedProducts.length > 0) {
                const prices = processedProducts.map(p => p.price);
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                
                const priceRangeItem = document.createElement('div');
                priceRangeItem.className = 'sort-stat-item';
                priceRangeItem.innerHTML = `
                    <div class="stat-value">¥${minPrice.toLocaleString()} - ¥${maxPrice.toLocaleString()}</div>
                    <div class="stat-desc">価格範囲</div>
                `;
                sortStats.appendChild(priceRangeItem);
                
                // 平均価格
                const avgPrice = Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length);
                const avgPriceItem = document.createElement('div');
                avgPriceItem.className = 'sort-stat-item';
                avgPriceItem.innerHTML = `
                    <div class="stat-value">¥${avgPrice.toLocaleString()}</div>
                    <div class="stat-desc">平均価格</div>
                `;
                sortStats.appendChild(avgPriceItem);
            }
        }

        // 14. フィルタ・ソートボタンのイベント処理
        function initializeControls() {
            // カテゴリフィルタ（20.3から継続）
            const categoryButtons = document.querySelectorAll('#categoryFilters .filter-btn');
            categoryButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const category = btn.getAttribute('data-category');
                    currentFilters.category = category;
                    
                    categoryButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    renderProcessedProducts();
                    console.log(`カテゴリフィルタ設定: ${category}`);
                });
            });
            
            // 価格フィルタ（20.3から継続）
            const priceButtons = document.querySelectorAll('#priceFilters .filter-btn');
            priceButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const price = btn.getAttribute('data-price');
                    currentFilters.price = price;
                    
                    priceButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    renderProcessedProducts();
                    console.log(`価格フィルタ設定: ${price}`);
                });
            });
            
            // ソート選択（新機能！）
            sortSelect.addEventListener('change', (e) => {
                currentSort = e.target.value;
                renderProcessedProducts();
                console.log(`ソート設定: ${currentSort}`);
            });
        }

        // 15. すべてリセット機能（拡張！）
        function resetAll() {
            currentFilters.category = 'all';
            currentFilters.price = 'all';
            currentSort = 'default';
            
            // UI状態をリセット
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-category') === 'all' || 
                    btn.getAttribute('data-price') === 'all') {
                    btn.classList.add('active');
                }
            });
            
            sortSelect.value = 'default';
            
            renderProcessedProducts();
            console.log('🔄 全フィルタ・ソートをリセットしました');
        }

        // 16. データの保存・読み込み
        function saveData() {
            try {
                const dataToSave = {
                    products: products,
                    filters: currentFilters,
                    sort: currentSort
                };
                localStorage.setItem('productsData_v4', JSON.stringify(dataToSave));
            } catch (error) {
                console.error('データ保存エラー:', error);
            }
        }

        function loadData() {
            try {
                const savedData = localStorage.getItem('productsData_v4');
                if (savedData) {
                    const data = JSON.parse(savedData);
                    products = data.products || products;
                    currentFilters = data.filters || currentFilters;
                    currentSort = data.sort || currentSort;
                    
                    sortSelect.value = currentSort;
                    console.log('💾 保存されたデータ・フィルタ・ソート状態を復元');
                }
            } catch (error) {
                console.error('データ読み込みエラー:', error);
            }
        }

        // 17. イベントリスナーの設定
        resetAllBtn.addEventListener('click', resetAll);

        // 18. 初期化処理
        document.addEventListener('DOMContentLoaded', function() {
            console.log('=== 20.4 ソート機能システム学習モード開始 ===');
            console.log('新しい学習テーマ: sort() メソッドによる商品並び替え');
            console.log('重要ポイント: sort()、比較関数、フィルタとソートの組み合わせ');
            
            loadData();
            initializeControls();
            
            setTimeout(() => {
                renderProcessedProducts();
            }, 500);
            
            console.log('📊 10商品のフィルタ+ソートシステムが稼働中');
            console.log('💡 フィルタリングとソートを組み合わせた高度な検索ができます！');
        });

        // 19. 学習用のグローバル関数
        window.showSortProcess = function() {
            console.log('=== フィルタ+ソートプロセスの詳細 ===');
            console.log('1. filter() でフィルタリング実行');
            console.log('2. [...array] で配列をコピー');
            console.log('3. sort() で比較関数による並び替え');
            console.log('4. 元配列は保持、新しい順序の配列を作成');
            console.log('5. UIに最終結果を反映');
            console.log('現在のフィルタ:', currentFilters);
            console.log('現在のソート:', currentSort);
            console.log('処理結果数:', processProducts().length);
        };

        // 20. データ保存の定期実行
        setInterval(saveData, 5000);

        console.log('💡 コンソールで showSortProcess() を実行するとフィルタ+ソートプロセスの詳細が確認できます！');