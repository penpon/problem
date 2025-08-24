        // === 20.5 メイン学習テーマ: includes() によるテキスト検索 ===

        // 1. 拡張された商品データ配列（20.4の10商品から12商品に拡張）
        let products = [
            // 20.4からの10商品
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
            },
            // 20.5で新規追加の2商品
            {
                id: 11,
                name: "モバイル バッテリー",
                category: "electronics",
                price: 3800,
                description: "大容量10000mAh急速充電対応ポータブル充電器",
                emoji: "🔋",
                likes: 0,
                isLiked: false
            },
            {
                id: 12,
                name: "カシミア マフラー",
                category: "fashion",
                price: 9800,
                description: "上質なカシミア100%の暖かいマフラー",
                emoji: "🧣",
                likes: 0,
                isLiked: false
            }
        ];

        // 2. フィルタ・ソート・検索状態管理（拡張！）
        let currentFilters = {
            category: 'all',
            price: 'all'
        };

        let currentSort = 'default';
        let currentSearch = '';
        let searchTimeout;

        // 3. DOM要素の取得
        const productsGrid = document.getElementById('productsGrid');
        const systemStatus = document.getElementById('systemStatus');
        const searchInput = document.getElementById('searchInput');
        const searchResultsInfo = document.getElementById('searchResultsInfo');
        const processResults = document.getElementById('processResults');
        const processInfo = document.getElementById('processInfo');
        const searchStatus = document.getElementById('searchStatus');
        const displayedProducts = document.getElementById('displayedProducts');
        const totalProducts = document.getElementById('totalProducts');
        const totalLikes = document.getElementById('totalLikes');
        const activeOperations = document.getElementById('activeOperations');
        const sortSelect = document.getElementById('sortSelect');
        const sortIndicator = document.getElementById('sortIndicator');
        const searchSteps = document.getElementById('searchSteps');
        const searchStats = document.getElementById('searchStats');
        const searchInfo = document.getElementById('searchInfo');
        const resetAllBtn = document.getElementById('resetAll');

        // 4. 商品カードの生成（検索ハイライト対応）
        function createProductCard(product, originalIndex, sortOrder) {
            console.log(`🏗️ 検索対応商品カード生成: ${product.name} (順位: ${sortOrder})`);
            
            const card = document.createElement('div');
            card.className = `product-card category-${product.category}`;
            card.setAttribute('data-product-id', product.id);
            card.setAttribute('data-sort-order', sortOrder);
            
            const imageDiv = document.createElement('div');
            imageDiv.className = 'product-image';
            imageDiv.textContent = product.emoji;
            
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'product-category';
            categoryDiv.innerHTML = highlightKeyword(product.category, currentSearch);
            
            const nameH3 = document.createElement('h3');
            nameH3.className = 'product-name';
            nameH3.innerHTML = highlightKeyword(product.name, currentSearch);
            
            const descriptionP = document.createElement('p');
            descriptionP.className = 'product-description';
            descriptionP.innerHTML = highlightKeyword(product.description, currentSearch);
            
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

        // 5. 検索キーワードハイライト関数（新機能！）
        function highlightKeyword(text, keyword) {
            if (!keyword.trim()) return text;
            
            // HTMLエスケープを考慮した安全なハイライト
            const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedKeyword})`, 'gi');
            
            return text.replace(regex, '<mark>$1</mark>');
        }

        // 6. フィルタ関数（20.4から継続）
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

        // 7. 検索関数（メイン学習ポイント！）
        function searchProducts(products) {
            console.log('🔎 検索処理開始:', currentSearch);
            
            // 検索キーワードが空の場合は全商品を返す
            if (!currentSearch.trim()) {
                console.log('検索キーワードなし: 全商品を返す');
                return products;
            }
            
            // 検索キーワードを正規化（小文字変換、前後空白削除）
            const normalizedKeyword = currentSearch.toLowerCase().trim();
            
            // 各商品で複数フィールドでの検索
            const searchResults = products.filter(product => {
                const nameMatch = product.name.toLowerCase().includes(normalizedKeyword);
                const descMatch = product.description.toLowerCase().includes(normalizedKeyword);
                const categoryMatch = product.category.toLowerCase().includes(normalizedKeyword);
                
                return nameMatch || descMatch || categoryMatch;
            });
            
            console.log(`検索後: ${searchResults.length}商品（キーワード: "${currentSearch}"）`);
            return searchResults;
        }

        // 8. ソート関数（20.4から継続）
        function sortProducts(products) {
            console.log('📊 ソート処理開始:', currentSort);
            
            const productsCopy = [...products];
            
            switch (currentSort) {
                case 'price-low':
                    return productsCopy.sort((a, b) => a.price - b.price);
                case 'price-high':
                    return productsCopy.sort((a, b) => b.price - a.price);
                case 'likes':
                    return productsCopy.sort((a, b) => b.likes - a.likes);
                case 'name':
                    return productsCopy.sort((a, b) => a.name.localeCompare(b.name, 'ja'));
                case 'default':
                default:
                    return productsCopy.sort((a, b) => a.id - b.id);
            }
        }

        // 9. フィルタ+検索+ソート統合処理
        function processProducts() {
            console.log('🚀 フィルタ+検索+ソート統合処理開始');
            
            // ステップ1: フィルタリング
            const filteredProducts = filterProducts();
            
            // ステップ2: 検索
            const searchedProducts = searchProducts(filteredProducts);
            
            // ステップ3: ソート
            const sortedProducts = sortProducts(searchedProducts);
            
            console.log(`最終処理結果: ${sortedProducts.length}商品`);
            updateSearchSteps(sortedProducts.length);
            
            return sortedProducts;
        }

        // 10. 処理結果の描画
        function renderProcessedProducts() {
            console.log('🚀 フィルタ+検索+ソート結果の描画開始');
            
            productsGrid.innerHTML = '';
            const processedProducts = processProducts();
            
            if (processedProducts.length === 0) {
                const noResults = document.createElement('div');
                noResults.className = 'no-results';
                
                let message = '条件に合う商品が見つかりませんでした';
                if (currentSearch.trim()) {
                    message = `「${currentSearch}」に一致する商品が見つかりませんでした`;
                }
                
                noResults.innerHTML = `
                    <span class="no-results-emoji">🚫</span>
                    ${message}
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
                    }, index * 60);
                });
            }
            
            updateUI();
            updateStats(processedProducts.length);
            console.log('🎉 フィルタ+検索+ソート結果の描画完了');
        }

        // 11. UIの更新
        function updateUI() {
            // システム状態の表示
            systemStatus.textContent = `12商品をフィルタ＆ソート＆検索処理中`;
            
            // 処理結果の表示
            const processedCount = processProducts().length;
            const processText = document.querySelector('.process-text');
            processText.textContent = `12商品中 ${processedCount}商品を表示（フィルタ + ソート + 検索適用済み）`;
            
            // ソート順序の表示
            const sortNames = {
                'default': '追加順',
                'price-low': '価格：安い順',
                'price-high': '価格：高い順',
                'likes': 'いいね順',
                'name': '名前順'
            };
            
            const currentSortName = sortNames[currentSort] || '追加順';
            processInfo.textContent = currentSortName;
            
            // 検索状態の表示
            if (currentSearch.trim()) {
                searchStatus.textContent = `「${currentSearch}」で検索中`;
            } else {
                searchStatus.textContent = '検索なし';
            }
            
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
            
            // 検索結果情報の更新
            if (currentSearch.trim()) {
                const matchCount = processProducts().length;
                searchResultsInfo.textContent = `「${currentSearch}」の検索結果: ${matchCount}件`;
            } else {
                searchResultsInfo.textContent = '検索を開始すると、リアルタイムで結果が表示されます';
            }
            
            // アクティブ操作数の計算
            let activeCount = 0;
            if (currentFilters.category !== 'all') activeCount++;
            if (currentFilters.price !== 'all') activeCount++;
            if (currentSort !== 'default') activeCount++;
            if (currentSearch.trim()) activeCount++;
            
            activeOperations.textContent = activeCount;
        }

        // 12. 検索ステップの可視化
        function updateSearchSteps(resultCount) {
            const steps = searchSteps.querySelectorAll('.process-step');
            steps.forEach((step, index) => {
                setTimeout(() => {
                    step.classList.add('active');
                }, index * 150);
            });
            
            setTimeout(() => {
                steps[steps.length - 1].textContent = `5. ソート処理後UI反映 (${resultCount}商品)`;
            }, (steps.length - 1) * 150);
        }

        // 13. いいね機能（20.4から継続）
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

        // 14. 統計情報の更新
        function updateStats(processedCount) {
            const total = products.reduce((sum, product) => sum + product.likes, 0);
            
            displayedProducts.textContent = processedCount;
            totalProducts.textContent = products.length;
            totalLikes.textContent = total;
            
            updateSearchStats();
        }

        // 15. 検索統計の更新
        function updateSearchStats() {
            const processedProducts = processProducts();
            
            searchStats.innerHTML = '';
            
            // 検索マッチ率
            const matchRate = products.length > 0 ? 
                Math.round((processedProducts.length / products.length) * 100) : 0;
            
            const matchRateItem = document.createElement('div');
            matchRateItem.className = 'search-stat-item';
            matchRateItem.innerHTML = `
                <div class="stat-value">${matchRate}%</div>
                <div class="stat-desc">マッチ率</div>
            `;
            searchStats.appendChild(matchRateItem);
            
            // 検索実行数（仮想的な値）
            const searchCount = currentSearch.trim() ? currentSearch.length : 0;
            const searchCountItem = document.createElement('div');
            searchCountItem.className = 'search-stat-item';
            searchCountItem.innerHTML = `
                <div class="stat-value">${searchCount}</div>
                <div class="stat-desc">検索文字数</div>
            `;
            searchStats.appendChild(searchCountItem);
        }

        // 16. 検索入力のデバウンス処理（新機能！）
        function handleSearchInput() {
            // 前のタイマーをクリア
            clearTimeout(searchTimeout);
            
            // 少し遅延させてからリアルタイム検索実行
            searchTimeout = setTimeout(() => {
                currentSearch = searchInput.value;
                renderProcessedProducts();
                console.log(`🔎 リアルタイム検索実行: "${currentSearch}"`);
            }, 300); // 300ms後に検索実行
        }

        // 17. フィルタ・ソート・検索コントロールの初期化
        function initializeControls() {
            // カテゴリフィルタ（20.4から継続）
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
            
            // 価格フィルタ（20.4から継続）
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
            
            // ソート選択（20.4から継続）
            sortSelect.addEventListener('change', (e) => {
                currentSort = e.target.value;
                renderProcessedProducts();
                console.log(`ソート設定: ${currentSort}`);
            });
            
            // 検索入力（新機能！）
            searchInput.addEventListener('input', handleSearchInput);
            
            // 検索フィールドのフォーカス管理
            searchInput.addEventListener('focus', () => {
                searchInput.parentElement.style.transform = 'scale(1.02)';
            });
            
            searchInput.addEventListener('blur', () => {
                searchInput.parentElement.style.transform = 'scale(1)';
            });
        }

        // 18. すべてリセット機能（拡張！）
        function resetAll() {
            currentFilters.category = 'all';
            currentFilters.price = 'all';
            currentSort = 'default';
            currentSearch = '';
            
            // UI状態をリセット
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-category') === 'all' || 
                    btn.getAttribute('data-price') === 'all') {
                    btn.classList.add('active');
                }
            });
            
            sortSelect.value = 'default';
            searchInput.value = '';
            
            renderProcessedProducts();
            console.log('🔄 全フィルタ・ソート・検索をリセットしました');
        }

        // 19. データの保存・読み込み
        function saveData() {
            try {
                const dataToSave = {
                    products: products,
                    filters: currentFilters,
                    sort: currentSort,
                    search: currentSearch
                };
                localStorage.setItem('productsData_v5', JSON.stringify(dataToSave));
            } catch (error) {
                console.error('データ保存エラー:', error);
            }
        }

        function loadData() {
            try {
                const savedData = localStorage.getItem('productsData_v5');
                if (savedData) {
                    const data = JSON.parse(savedData);
                    products = data.products || products;
                    currentFilters = data.filters || currentFilters;
                    currentSort = data.sort || currentSort;
                    currentSearch = data.search || '';
                    
                    sortSelect.value = currentSort;
                    searchInput.value = currentSearch;
                    console.log('💾 保存されたデータ・フィルタ・ソート・検索状態を復元');
                }
            } catch (error) {
                console.error('データ読み込みエラー:', error);
            }
        }

        // 20. イベントリスナーの設定
        resetAllBtn.addEventListener('click', resetAll);

        // 21. 初期化処理
        document.addEventListener('DOMContentLoaded', function() {
            console.log('=== 20.5 検索機能システム学習モード開始 ===');
            console.log('新しい学習テーマ: includes() メソッドによるテキスト検索');
            console.log('重要ポイント: includes()、デバウンス、ハイライト、複合検索処理');
            
            loadData();
            initializeControls();
            
            setTimeout(() => {
                renderProcessedProducts();
            }, 500);
            
            console.log('🔎 12商品のフィルタ+ソート+検索システムが稼働中');
            console.log('💡 フィルタリング・ソート・検索を組み合わせた完全な商品検索ができます！');
        });

        // 22. 学習用のグローバル関数
        window.showSearchProcess = function() {
            console.log('=== フィルタ+検索+ソートプロセスの詳細 ===');
            console.log('1. filter() でカテゴリ・価格フィルタリング');
            console.log('2. includes() でテキスト検索実行');
            console.log('3. toLowerCase() で大文字小文字無視');
            console.log('4. sort() で比較関数による並び替え');
            console.log('5. UIにハイライト付きで結果を反映');
            console.log('現在のフィルタ:', currentFilters);
            console.log('現在のソート:', currentSort);
            console.log('現在の検索:', currentSearch);
            console.log('処理結果数:', processProducts().length);
        };

        // 23. データ保存の定期実行
        setInterval(saveData, 5000);

        console.log('💡 コンソールで showSearchProcess() を実行するとフィルタ+検索+ソートプロセスの詳細が確認できます！');