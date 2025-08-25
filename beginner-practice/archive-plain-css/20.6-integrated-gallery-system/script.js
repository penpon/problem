        // === 20.6 メイン学習テーマ: レイアウト切り替えとモーダル表示による統合ギャラリーシステム ===

        // 1. 拡張された商品データ配列（20.5の12商品から15商品に拡張）
        let products = [
            // 20.5からの12商品
            {
                id: 1,
                name: "プレミアム Tシャツ",
                category: "fashion",
                price: 2980,
                description: "肌触りの良い上質なコットン100%素材",
                emoji: "👕",
                likes: 0,
                isLiked: false,
                tags: ["コットン", "プレミアム", "快適"]
            },
            {
                id: 2,
                name: "ワイヤレス イヤホン",
                category: "electronics",
                price: 8900,
                description: "高音質・長時間バッテリーのプロ仕様",
                emoji: "🎧",
                likes: 0,
                isLiked: false,
                tags: ["ワイヤレス", "高音質", "長時間"]
            },
            {
                id: 3,
                name: "ランニング シューズ",
                category: "sports",
                price: 12000,
                description: "軽量で足への負担を軽減する設計",
                emoji: "👟",
                likes: 0,
                isLiked: false,
                tags: ["軽量", "ランニング", "負担軽減"]
            },
            {
                id: 4,
                name: "レザー ウォレット",
                category: "accessories",
                price: 5500,
                description: "職人手作りの本革長財布",
                emoji: "👛",
                likes: 0,
                isLiked: false,
                tags: ["本革", "職人", "長財布"]
            },
            {
                id: 5,
                name: "スマート ウォッチ",
                category: "electronics",
                price: 25000,
                description: "健康管理・通知機能搭載の多機能型",
                emoji: "⌚",
                likes: 0,
                isLiked: false,
                tags: ["スマート", "健康管理", "多機能"]
            },
            {
                id: 6,
                name: "デニム ジャケット",
                category: "fashion",
                price: 7800,
                description: "カジュアルからきれいめまで対応",
                emoji: "🧥",
                likes: 0,
                isLiked: false,
                tags: ["デニム", "カジュアル", "きれいめ"]
            },
            {
                id: 7,
                name: "バックパック",
                category: "accessories",
                price: 6800,
                description: "通学・通勤に最適な大容量リュック",
                emoji: "🎒",
                likes: 0,
                isLiked: false,
                tags: ["大容量", "通学", "通勤"]
            },
            {
                id: 8,
                name: "Bluetooth スピーカー",
                category: "electronics",
                price: 4500,
                description: "高音質でポータブルなワイヤレススピーカー",
                emoji: "🔊",
                likes: 0,
                isLiked: false,
                tags: ["Bluetooth", "ポータブル", "ワイヤレス"]
            },
            {
                id: 9,
                name: "フィットネス マット",
                category: "sports",
                price: 3200,
                description: "滑り止め付きヨガ・エクササイズマット",
                emoji: "🧘‍♀️",
                likes: 0,
                isLiked: false,
                tags: ["ヨガ", "滑り止め", "エクササイズ"]
            },
            {
                id: 10,
                name: "ワイヤレス マウス",
                category: "electronics",
                price: 2800,
                description: "精密操作可能な無線光学マウス",
                emoji: "🖱️",
                likes: 0,
                isLiked: false,
                tags: ["無線", "精密操作", "光学"]
            },
            {
                id: 11,
                name: "モバイル バッテリー",
                category: "electronics",
                price: 3800,
                description: "大容量10000mAh急速充電対応ポータブル充電器",
                emoji: "🔋",
                likes: 0,
                isLiked: false,
                tags: ["大容量", "急速充電", "ポータブル"]
            },
            {
                id: 12,
                name: "カシミア マフラー",
                category: "fashion",
                price: 9800,
                description: "上質なカシミア100%の暖かいマフラー",
                emoji: "🧣",
                likes: 0,
                isLiked: false,
                tags: ["カシミア", "暖かい", "上質"]
            },
            // 20.6で新規追加の3商品
            {
                id: 13,
                name: "ゲーミング キーボード",
                category: "electronics",
                price: 15800,
                description: "メカニカルスイッチ採用RGB光るゲーミングキーボード",
                emoji: "⌨️",
                likes: 0,
                isLiked: false,
                tags: ["ゲーミング", "RGB", "メカニカル"]
            },
            {
                id: 14,
                name: "アウトドア ジャケット",
                category: "fashion",
                price: 18500,
                description: "防水・透湿機能付き本格アウトドアジャケット",
                emoji: "🧥",
                likes: 0,
                isLiked: false,
                tags: ["アウトドア", "防水", "透湿"]
            },
            {
                id: 15,
                name: "ヨガ ブロック",
                category: "sports",
                price: 1800,
                description: "ヨガポーズをサポートする軽量EVAブロック",
                emoji: "🧘",
                likes: 0,
                isLiked: false,
                tags: ["ヨガ", "軽量", "サポート"]
            }
        ];

        // 2. 統合システム状態管理（拡張！）
        let currentFilters = {
            category: 'all',
            price: 'all'
        };

        let currentSort = 'default';
        let currentSearch = '';
        let currentLayout = 'grid'; // 新機能：レイアウト状態
        let searchTimeout;

        // 3. DOM要素の取得
        const productsGrid = document.getElementById('productsGrid');
        const systemStatus = document.getElementById('systemStatus');
        const searchInput = document.getElementById('searchInput');
        const searchResultsInfo = document.getElementById('searchResultsInfo');
        const gridLayoutBtn = document.getElementById('gridLayoutBtn');
        const listLayoutBtn = document.getElementById('listLayoutBtn');
        const processResults = document.getElementById('processResults');
        const processInfo = document.getElementById('processInfo');
        const searchStatus = document.getElementById('searchStatus');
        const layoutStatus = document.getElementById('layoutStatus');
        const displayedProducts = document.getElementById('displayedProducts');
        const totalProducts = document.getElementById('totalProducts');
        const totalLikes = document.getElementById('totalLikes');
        const activeOperations = document.getElementById('activeOperations');
        const sortSelect = document.getElementById('sortSelect');
        const sortIndicator = document.getElementById('sortIndicator');
        const integrationSteps = document.getElementById('integrationSteps');
        const advancedStats = document.getElementById('advancedStats');
        const integrationInfo = document.getElementById('integrationInfo');
        const resetAllBtn = document.getElementById('resetAll');
        const productModal = document.getElementById('productModal');
        const modalClose = document.getElementById('modalClose');
        const modalProductContent = document.getElementById('modalProductContent');

        // 4. 商品カードの生成（レイアウト対応 + モーダル対応）
        function createProductCard(product, originalIndex, sortOrder) {
            console.log(`🏗️ 統合商品カード生成: ${product.name} (${currentLayout}レイアウト)`);
            
            const card = document.createElement('div');
            card.className = `product-card category-${product.category}`;
            card.setAttribute('data-product-id', product.id);
            card.setAttribute('data-sort-order', sortOrder);
            
            if (currentLayout === 'grid') {
                // グリッドレイアウト用のカード構造
                card.innerHTML = `
                    <div class="product-image">${product.emoji}</div>
                    <div class="product-category">${highlightKeyword(product.category, currentSearch)}</div>
                    <h3 class="product-name">${highlightKeyword(product.name, currentSearch)}</h3>
                    <p class="product-description">${highlightKeyword(product.description, currentSearch)}</p>
                    <div class="product-price">¥${product.price.toLocaleString()}</div>
                    <div class="product-actions">
                        <button class="btn-like ${product.isLiked ? 'liked' : ''}">
                            ❤️ ${product.isLiked ? 'いいね済み' : 'いいね'} ${product.likes}
                        </button>
                        <button class="btn-detail">📱 詳細</button>
                    </div>
                `;
            } else {
                // リストレイアウト用のカード構造
                card.innerHTML = `
                    <div class="product-image">${product.emoji}</div>
                    <div class="product-details">
                        <div class="product-category">${highlightKeyword(product.category, currentSearch)}</div>
                        <h3 class="product-name">${highlightKeyword(product.name, currentSearch)}</h3>
                        <p class="product-description">${highlightKeyword(product.description, currentSearch)}</p>
                    </div>
                    <div class="product-price">¥${product.price.toLocaleString()}</div>
                    <div class="product-actions">
                        <button class="btn-like ${product.isLiked ? 'liked' : ''}">
                            ❤️ ${product.likes}
                        </button>
                        <button class="btn-detail">詳細</button>
                    </div>
                `;
            }
            
            // イベントリスナー設定
            const likeBtn = card.querySelector('.btn-like');
            const detailBtn = card.querySelector('.btn-detail');
            
            likeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                handleLike(originalIndex);
            });
            
            detailBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showProductModal(product, originalIndex);
            });
            
            // カード全体をクリックでもモーダル表示
            card.addEventListener('click', () => {
                showProductModal(product, originalIndex);
            });
            
            return card;
        }

        // 5. レイアウト切り替え関数（新機能！）
        function switchLayout(layout) {
            console.log(`📱 レイアウト切り替え: ${layout}`);
            
            currentLayout = layout;
            
            // グリッドのクラスを更新
            productsGrid.className = `products-grid ${layout}-layout`;
            
            // ボタンの状態を更新
            document.querySelectorAll('.layout-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`[data-layout="${layout}"]`).classList.add('active');
            
            // 商品を再描画
            renderProcessedProducts();
        }

        // 6. 商品詳細モーダル表示（新機能！）
        function showProductModal(product, originalIndex) {
            console.log(`📱 モーダル表示: ${product.name}`);
            
            modalProductContent.innerHTML = `
                <div class="modal-product-image category-${product.category}">
                    <div class="product-image">${product.emoji}</div>
                </div>
                <h2 class="modal-product-name">${product.name}</h2>
                <div class="modal-product-category">${product.category}</div>
                <div class="modal-product-price">¥${product.price.toLocaleString()}</div>
                <p class="modal-product-description">${product.description}</p>
                ${product.tags ? `<div class="modal-product-tags">タグ: ${product.tags.join(', ')}</div>` : ''}
                <div class="modal-actions">
                    <button class="modal-btn modal-btn-like ${product.isLiked ? 'liked' : ''}" data-index="${originalIndex}">
                        ❤️ ${product.isLiked ? 'いいね済み' : 'いいね'} ${product.likes}
                    </button>
                    <button class="modal-btn modal-btn-close">閉じる</button>
                </div>
            `;
            
            // モーダル内ボタンのイベント設定
            const modalLikeBtn = modalProductContent.querySelector('.modal-btn-like');
            const modalCloseBtn = modalProductContent.querySelector('.modal-btn-close');
            
            modalLikeBtn.addEventListener('click', () => {
                handleLike(originalIndex);
                hideProductModal();
            });
            
            modalCloseBtn.addEventListener('click', hideProductModal);
            
            // モーダル表示
            productModal.style.display = 'flex';
            
            // ESCキーでモーダルを閉じる
            document.addEventListener('keydown', handleModalEscape);
        }

        // 7. モーダルを閉じる
        function hideProductModal() {
            productModal.style.display = 'none';
            document.removeEventListener('keydown', handleModalEscape);
        }

        // 8. ESCキーでモーダルを閉じる処理
        function handleModalEscape(event) {
            if (event.key === 'Escape') {
                hideProductModal();
            }
        }

        // 9. 検索キーワードハイライト関数（20.5から継続）
        function highlightKeyword(text, keyword) {
            if (!keyword.trim()) return text;
            
            const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedKeyword})`, 'gi');
            
            return text.replace(regex, '<mark>$1</mark>');
        }

        // 10. フィルタ関数（20.5から継続）
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

        // 11. 検索関数（20.5から継続）
        function searchProducts(products) {
            console.log('🔎 検索処理開始:', currentSearch);
            
            if (!currentSearch.trim()) {
                return products;
            }
            
            const normalizedKeyword = currentSearch.toLowerCase().trim();
            
            const searchResults = products.filter(product => {
                const nameMatch = product.name.toLowerCase().includes(normalizedKeyword);
                const descMatch = product.description.toLowerCase().includes(normalizedKeyword);
                const categoryMatch = product.category.toLowerCase().includes(normalizedKeyword);
                const tagsMatch = product.tags && product.tags.some(tag => 
                    tag.toLowerCase().includes(normalizedKeyword)
                );
                
                return nameMatch || descMatch || categoryMatch || tagsMatch;
            });
            
            console.log(`検索後: ${searchResults.length}商品`);
            return searchResults;
        }

        // 12. ソート関数（20.5から継続）
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

        // 13. 統合処理（フィルタ+検索+ソート）
        function processProducts() {
            console.log('🚀 4軸統合処理開始');
            
            // ステップ1: フィルタリング
            const filteredProducts = filterProducts();
            
            // ステップ2: 検索
            const searchedProducts = searchProducts(filteredProducts);
            
            // ステップ3: ソート
            const sortedProducts = sortProducts(searchedProducts);
            
            console.log(`最終処理結果: ${sortedProducts.length}商品`);
            updateIntegrationSteps(sortedProducts.length);
            
            return sortedProducts;
        }

        // 14. 統合処理結果の描画
        function renderProcessedProducts() {
            console.log('🚀 統合システム結果の描画開始');
            
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
                    
                    // レイアウトに応じたアニメーション
                    const delay = currentLayout === 'grid' ? index * 50 : index * 30;
                    
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = currentLayout === 'grid' 
                            ? 'translateY(20px) scale(0.9)' 
                            : 'translateX(-20px)';
                        card.style.transition = 'all 0.6s ease';
                        
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) translateX(0) scale(1)';
                        });
                    }, delay);
                });
            }
            
            updateUI();
            updateStats(processedProducts.length);
            console.log('🎉 統合システム結果の描画完了');
        }

        // 15. UIの更新
        function updateUI() {
            // システム状態の表示
            systemStatus.textContent = `15商品を完全統合処理中...`;
            
            // 処理結果の表示
            const processedCount = processProducts().length;
            const processText = document.querySelector('.process-text');
            processText.textContent = `15商品中 ${processedCount}商品を表示（全機能統合適用済み）`;
            
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
            
            // レイアウト状態の表示
            const layoutNames = {
                'grid': 'グリッド表示',
                'list': 'リスト表示'
            };
            layoutStatus.textContent = layoutNames[currentLayout];
            
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
            if (currentLayout !== 'grid') activeCount++;
            
            activeOperations.textContent = activeCount;
        }

        // 16. 統合ステップの可視化
        function updateIntegrationSteps(resultCount) {
            const steps = integrationSteps.querySelectorAll('.process-step');
            steps.forEach((step, index) => {
                setTimeout(() => {
                    step.classList.add('active');
                }, index * 120);
            });
            
            setTimeout(() => {
                steps[steps.length - 1].textContent = `5. モーダル対応で詳細表示準備 (${resultCount}商品)`;
            }, (steps.length - 1) * 120);
        }

        // 17. いいね機能（20.5から継続）
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

        // 18. 統計情報の更新
        function updateStats(processedCount) {
            const total = products.reduce((sum, product) => sum + product.likes, 0);
            
            displayedProducts.textContent = processedCount;
            totalProducts.textContent = products.length;
            totalLikes.textContent = total;
            
            updateAdvancedStats();
        }

        // 19. 高度統計の更新
        function updateAdvancedStats() {
            const processedProducts = processProducts();
            
            advancedStats.innerHTML = '';
            
            // 統合処理効率
            const efficiency = products.length > 0 ? 
                Math.round((processedProducts.length / products.length) * 100) : 0;
            
            const efficiencyItem = document.createElement('div');
            efficiencyItem.className = 'stat-advanced-item';
            efficiencyItem.innerHTML = `
                <div class="stat-value">${efficiency}%</div>
                <div class="stat-desc">処理効率</div>
            `;
            advancedStats.appendChild(efficiencyItem);
            
            // 平均価格
            if (processedProducts.length > 0) {
                const avgPrice = Math.round(
                    processedProducts.reduce((sum, p) => sum + p.price, 0) / processedProducts.length
                );
                const avgPriceItem = document.createElement('div');
                avgPriceItem.className = 'stat-advanced-item';
                avgPriceItem.innerHTML = `
                    <div class="stat-value">¥${avgPrice.toLocaleString()}</div>
                    <div class="stat-desc">平均価格</div>
                `;
                advancedStats.appendChild(avgPriceItem);
            }
            
            // カテゴリ多様性
            const categories = [...new Set(processedProducts.map(p => p.category))];
            const diversityItem = document.createElement('div');
            diversityItem.className = 'stat-advanced-item';
            diversityItem.innerHTML = `
                <div class="stat-value">${categories.length}</div>
                <div class="stat-desc">カテゴリ数</div>
            `;
            advancedStats.appendChild(diversityItem);
            
            // レイアウト表示
            const layoutItem = document.createElement('div');
            layoutItem.className = 'stat-advanced-item';
            layoutItem.innerHTML = `
                <div class="stat-value">${currentLayout}</div>
                <div class="stat-desc">レイアウト</div>
            `;
            advancedStats.appendChild(layoutItem);
        }

        // 20. 検索入力のデバウンス処理
        function handleSearchInput() {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() => {
                currentSearch = searchInput.value;
                renderProcessedProducts();
                console.log(`🔎 統合検索実行: "${currentSearch}"`);
            }, 300);
        }

        // 21. 全コントロールの初期化
        function initializeControls() {
            // カテゴリフィルタ
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
            
            // 価格フィルタ
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
            
            // ソート選択
            sortSelect.addEventListener('change', (e) => {
                currentSort = e.target.value;
                renderProcessedProducts();
                console.log(`ソート設定: ${currentSort}`);
            });
            
            // 検索入力
            searchInput.addEventListener('input', handleSearchInput);
            
            // レイアウト切り替え（新機能！）
            gridLayoutBtn.addEventListener('click', () => switchLayout('grid'));
            listLayoutBtn.addEventListener('click', () => switchLayout('list'));
            
            // モーダル関連（新機能！）
            modalClose.addEventListener('click', hideProductModal);
            productModal.addEventListener('click', (e) => {
                if (e.target === productModal) {
                    hideProductModal();
                }
            });
        }

        // 22. すべてリセット機能
        function resetAll() {
            currentFilters.category = 'all';
            currentFilters.price = 'all';
            currentSort = 'default';
            currentSearch = '';
            currentLayout = 'grid';
            
            // UI状態をリセット
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-category') === 'all' || 
                    btn.getAttribute('data-price') === 'all') {
                    btn.classList.add('active');
                }
            });
            
            document.querySelectorAll('.layout-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            gridLayoutBtn.classList.add('active');
            
            sortSelect.value = 'default';
            searchInput.value = '';
            
            switchLayout('grid');
            console.log('🔄 統合システム全体をリセットしました');
        }

        // 23. データの保存・読み込み
        function saveData() {
            try {
                const dataToSave = {
                    products: products,
                    filters: currentFilters,
                    sort: currentSort,
                    search: currentSearch,
                    layout: currentLayout
                };
                localStorage.setItem('productsData_v6', JSON.stringify(dataToSave));
            } catch (error) {
                console.error('データ保存エラー:', error);
            }
        }

        function loadData() {
            try {
                const savedData = localStorage.getItem('productsData_v6');
                if (savedData) {
                    const data = JSON.parse(savedData);
                    products = data.products || products;
                    currentFilters = data.filters || currentFilters;
                    currentSort = data.sort || currentSort;
                    currentSearch = data.search || '';
                    currentLayout = data.layout || 'grid';
                    
                    sortSelect.value = currentSort;
                    searchInput.value = currentSearch;
                    
                    // レイアウトボタンの状態復元
                    document.querySelectorAll('.layout-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    document.querySelector(`[data-layout="${currentLayout}"]`).classList.add('active');
                    
                    productsGrid.className = `products-grid ${currentLayout}-layout`;
                    
                    console.log('💾 統合システムの全状態を復元');
                }
            } catch (error) {
                console.error('データ読み込みエラー:', error);
            }
        }

        // 24. イベントリスナーの設定
        resetAllBtn.addEventListener('click', resetAll);

        // 25. 初期化処理
        document.addEventListener('DOMContentLoaded', function() {
            console.log('=== 20.6 統合ギャラリーシステム学習モード開始 ===');
            console.log('新しい学習テーマ: レイアウト切り替え + モーダル表示 + 4軸統合処理');
            console.log('重要ポイント: グリッド/リスト切り替え、モーダルUI、統合システム設計');
            
            loadData();
            initializeControls();
            
            setTimeout(() => {
                renderProcessedProducts();
            }, 500);
            
            console.log('🏪 15商品の統合ギャラリーシステムが稼働中');
            console.log('💡 フィルタ・ソート・検索・レイアウト・モーダルを統合した最高レベルのシステムです！');
        });

        // 26. 学習用のグローバル関数
        window.showIntegrationProcess = function() {
            console.log('=== 統合ギャラリーシステムプロセスの詳細 ===');
            console.log('1. filter() でカテゴリ・価格フィルタリング');
            console.log('2. includes() でキーワード検索実行');
            console.log('3. sort() で比較関数による並び替え');
            console.log('4. レイアウトシステムでグリッド/リスト切り替え');
            console.log('5. モーダルシステムで詳細表示');
            console.log('現在のフィルタ:', currentFilters);
            console.log('現在のソート:', currentSort);
            console.log('現在の検索:', currentSearch);
            console.log('現在のレイアウト:', currentLayout);
            console.log('処理結果数:', processProducts().length);
            console.log('=== 20段階の技術統合完成 ===');
        };

        // 27. データ保存の定期実行
        setInterval(saveData, 5000);

        console.log('💡 コンソールで showIntegrationProcess() を実行すると統合システムの詳細が確認できます！');
        console.log('🎉 20段階のHTML・CSS・JavaScript学習が完成しました！');