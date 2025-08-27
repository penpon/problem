        // === 19.5 メイン学習テーマ: レスポンシブデザインとアクセシビリティ ===

        // 1. 商品データオブジェクト（19.4から拡張）
        let productData = {
            name: "プレミアム Tシャツ",
            price: 2980,
            likes: 0,
            isLiked: false,
            showDetails: false,
            inCart: false,
            detailViews: 0,
            cartActions: 0,
            imageChanges: 0,
            currentImage: 1,
            deviceType: 'desktop',      // レスポンシブ状態（新規追加）
            accessibilityMode: false,   // アクセシビリティモード（新規追加）
            lastUpdated: new Date().toISOString()
        };

        let actionHistory = [];

        // 2. DOM要素の取得
        const productImage = document.getElementById('productImage');
        const imageButtons = document.querySelectorAll('.image-btn');
        const likeBtn = document.getElementById('likeBtn');
        const detailsBtn = document.getElementById('detailsBtn');
        const cartBtn = document.getElementById('cartBtn');
        const productDetails = document.getElementById('productDetails');
        const notification = document.getElementById('notification');
        const liveRegion = document.getElementById('liveRegion');
        const likeCount = document.getElementById('likeCount');
        const totalLikes = document.getElementById('totalLikes');
        const totalViews = document.getElementById('totalViews');
        const totalCart = document.getElementById('totalCart');
        const totalImageChanges = document.getElementById('totalImageChanges');
        const responsiveDisplay = document.getElementById('responsiveDisplay');
        const objectDisplay = document.getElementById('objectDisplay');
        const resetBtn = document.getElementById('resetBtn');
        const accessibilityBtn = document.getElementById('accessibilityBtn');

        // 3. アクセシビリティ: スクリーンリーダー通知（新機能）
        function announceToScreenReader(message) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }

        // 4. 通知システム（アクセシビリティ強化）
        function showNotification(message, type = 'success') {
            notification.textContent = message;
            notification.className = `notification ${type} show`;
            notification.setAttribute('aria-label', message);
            
            // スクリーンリーダーにも通知
            announceToScreenReader(message);
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // 5. レスポンシブ状態検出（新機能 - メイン学習ポイント）
        function detectDeviceType() {
            const width = window.innerWidth;
            let deviceType = 'desktop';
            
            if (width <= 480) {
                deviceType = 'mobile-small';
            } else if (width <= 768) {
                deviceType = 'mobile';
            } else if (width <= 1024) {
                deviceType = 'tablet';
            }
            
            productData.deviceType = deviceType;
            updateResponsiveDisplay();
            
            console.log(`レスポンシブ: ${deviceType} (${width}px)`);
        }

        // 6. レスポンシブ表示の更新
        function updateResponsiveDisplay() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            responsiveDisplay.innerHTML = `
                デバイス: ${productData.deviceType}<br>
                画面: ${width} × ${height}px<br>
                向き: ${width > height ? '横' : '縦'}<br>
                更新: ${new Date().toLocaleTimeString()}
            `;
        }

        // 7. キーボード操作サポート（新機能）
        function handleKeyboardNavigation(event) {
            const key = event.key;
            const element = event.target;
            
            // Enterキーまたはスペースキーでボタン操作
            if (key === 'Enter' || key === ' ') {
                event.preventDefault();
                
                if (element.classList.contains('image-btn')) {
                    const imageNum = element.getAttribute('data-image');
                    changeImage(parseInt(imageNum));
                } else if (element.id === 'productImage') {
                    const nextImage = (productData.currentImage % 3) + 1;
                    changeImage(nextImage);
                }
            }
            
            // 矢印キーで画像切替
            if (element.id === 'productImage') {
                if (key === 'ArrowRight') {
                    event.preventDefault();
                    const nextImage = (productData.currentImage % 3) + 1;
                    changeImage(nextImage);
                } else if (key === 'ArrowLeft') {
                    event.preventDefault();
                    const prevImage = productData.currentImage === 1 ? 3 : productData.currentImage - 1;
                    changeImage(prevImage);
                }
            }
        }

        // 8. 画像切替システム（アクセシビリティ強化）
        function changeImage(imageNumber) {
            const images = ['👕', '👔', '🧥'];
            const imageClasses = ['image-1', 'image-2', 'image-3'];
            const imageNames = ['Tシャツ', 'ワイシャツ', 'ジャケット'];
            
            productImage.className = 'product-image';
            
            setTimeout(() => {
                productImage.className = `product-image ${imageClasses[imageNumber - 1]}`;
                productImage.textContent = images[imageNumber - 1];
                productImage.setAttribute('aria-label', `商品画像: ${imageNames[imageNumber - 1]}`);
                
                productData.currentImage = imageNumber;
                productData.imageChanges += 1;
                
                // ボタンのaria-pressed状態を更新
                imageButtons.forEach((btn, index) => {
                    const isActive = index + 1 === imageNumber;
                    btn.classList.toggle('active', isActive);
                    btn.setAttribute('aria-pressed', isActive.toString());
                });
                
                showNotification(`商品画像を${imageNames[imageNumber - 1]}に変更`, 'info');
                updateDisplay();
                saveData();
            }, 100);
        }

        // 9. データ保存・読み込み
        function saveData() {
            try {
                productData.lastUpdated = new Date().toISOString();
                localStorage.setItem('productCardData_v5', JSON.stringify(productData));
                localStorage.setItem('productCardHistory_v5', JSON.stringify(actionHistory));
            } catch (error) {
                showNotification('データ保存に失敗', 'error');
            }
        }

        function loadData() {
            try {
                const savedData = localStorage.getItem('productCardData_v5');
                if (savedData) {
                    const parsed = JSON.parse(savedData);
                    // 新しいプロパティのデフォルト値を設定
                    productData = Object.assign({
                        deviceType: 'desktop',
                        accessibilityMode: false
                    }, parsed);
                    showNotification('保存データを復元しました', 'success');
                }

                const savedHistory = localStorage.getItem('productCardHistory_v5');
                if (savedHistory) {
                    actionHistory = JSON.parse(savedHistory);
                }
            } catch (error) {
                showNotification('データ読み込みエラー', 'error');
                resetToDefaults();
            }
        }

        // 10. 表示更新（ARIA属性対応強化）
        function updateDisplay() {
            likeCount.textContent = productData.likes;
            
            // いいねボタンのARIA状態更新
            if (productData.isLiked) {
                likeBtn.classList.add('liked');
                likeBtn.setAttribute('aria-pressed', 'true');
                likeBtn.setAttribute('aria-label', 'いいねを取り消す');
            } else {
                likeBtn.classList.remove('liked');
                likeBtn.setAttribute('aria-pressed', 'false');
                likeBtn.setAttribute('aria-label', 'この商品にいいねする');
            }
            
            // 詳細表示のARIA状態更新
            if (productData.showDetails) {
                productDetails.classList.add('show');
                productDetails.setAttribute('aria-hidden', 'false');
                detailsBtn.innerHTML = '<span>📝 閉じる</span>';
                detailsBtn.setAttribute('aria-expanded', 'true');
                detailsBtn.setAttribute('aria-label', '商品詳細情報を閉じる');
            } else {
                productDetails.classList.remove('show');
                productDetails.setAttribute('aria-hidden', 'true');
                detailsBtn.innerHTML = '<span>📝 詳細</span>';
                detailsBtn.setAttribute('aria-expanded', 'false');
                detailsBtn.setAttribute('aria-label', '商品詳細情報を表示');
            }
            
            // カートボタンのARIA状態更新
            if (productData.inCart) {
                cartBtn.classList.add('in-cart');
                cartBtn.setAttribute('aria-pressed', 'true');
                cartBtn.setAttribute('aria-label', '商品をカートから削除');
                cartBtn.innerHTML = '<span>🛒 削除</span>';
            } else {
                cartBtn.classList.remove('in-cart');
                cartBtn.setAttribute('aria-pressed', 'false');
                cartBtn.setAttribute('aria-label', '商品をカートに追加');
                cartBtn.innerHTML = '<span>🛒 カート</span>';
            }

            // 統計更新
            totalLikes.textContent = productData.likes;
            totalViews.textContent = productData.detailViews;
            totalCart.textContent = productData.cartActions;
            totalImageChanges.textContent = productData.imageChanges;

            // オブジェクト表示更新
            objectDisplay.innerHTML = `
                likes: ${productData.likes}<br>
                currentImage: ${productData.currentImage}<br>
                deviceType: ${productData.deviceType}<br>
                inCart: ${productData.inCart}
            `;

            // 画像状態の復元
            if (productData.currentImage !== 1) {
                changeImage(productData.currentImage);
            }
        }

        // 11. いいね機能（アクセシビリティ強化）
        function handleLike() {
            productData.isLiked = !productData.isLiked;
            productData.likes += productData.isLiked ? 1 : -1;
            
            const message = productData.isLiked ? '❤️ いいねしました！' : '💔 いいねを取り消しました';
            addToHistory(productData.isLiked ? 'いいねしました' : 'いいねを取り消し');
            showNotification(message);
            
            updateDisplay();
            saveData();
        }

        // 12. 詳細表示機能（アクセシビリティ強化）
        function handleDetailsToggle() {
            productData.showDetails = !productData.showDetails;
            
            if (productData.showDetails) {
                productData.detailViews += 1;
                addToHistory('詳細情報を表示');
                showNotification('📝 詳細情報を表示しました');
                
                // フォーカスを詳細エリアに移動（アクセシビリティ）
                setTimeout(() => {
                    productDetails.focus();
                }, 100);
            } else {
                addToHistory('詳細情報を閉じる');
                showNotification('📝 詳細情報を閉じました');
            }
            
            updateDisplay();
            saveData();
        }

        // 13. カート機能（アクセシビリティ強化）
        function handleCart() {
            productData.inCart = !productData.inCart;
            productData.cartActions += 1;
            
            const message = productData.inCart ? '🛒 カートに追加しました！' : '🗑️ カートから削除しました';
            addToHistory(productData.inCart ? 'カートに追加' : 'カートから削除');
            showNotification(message);
            
            updateDisplay();
            saveData();
        }

        // 14. アクセシビリティテスト機能（新機能）
        function runAccessibilityTest() {
            productData.accessibilityMode = !productData.accessibilityMode;
            
            if (productData.accessibilityMode) {
                // アクセシビリティ強化モード
                document.body.style.fontSize = '18px';
                document.body.style.lineHeight = '1.6';
                showNotification('♿ アクセシビリティ強化モードON', 'info');
                announceToScreenReader('アクセシビリティ強化モードを有効にしました');
            } else {
                // 通常モード
                document.body.style.fontSize = '16px';
                document.body.style.lineHeight = '1.5';
                showNotification('♿ 通常モードに戻しました', 'info');
                announceToScreenReader('通常モードに戻しました');
            }
            
            saveData();
        }

        // 15. 履歴記録
        function addToHistory(action) {
            const timestamp = new Date().toLocaleTimeString();
            actionHistory.unshift(`${timestamp}: ${action}`);
            if (actionHistory.length > 5) {
                actionHistory = actionHistory.slice(0, 5);
            }
        }

        // 16. リセット機能
        function handleReset() {
            if (confirm('全てのデータをリセットしますか？')) {
                localStorage.removeItem('productCardData_v5');
                localStorage.removeItem('productCardHistory_v5');
                resetToDefaults();
                updateDisplay();
                showNotification('🔄 データをリセットしました', 'info');
                announceToScreenReader('データをリセットしました');
            }
        }

        function resetToDefaults() {
            productData = {
                name: "プレミアム Tシャツ",
                price: 2980,
                likes: 0,
                isLiked: false,
                showDetails: false,
                inCart: false,
                detailViews: 0,
                cartActions: 0,
                imageChanges: 0,
                currentImage: 1,
                deviceType: 'desktop',
                accessibilityMode: false,
                lastUpdated: new Date().toISOString()
            };
            actionHistory = [];
        }

        // 17. イベントリスナーの設定
        likeBtn.addEventListener('click', handleLike);
        detailsBtn.addEventListener('click', handleDetailsToggle);
        cartBtn.addEventListener('click', handleCart);
        resetBtn.addEventListener('click', handleReset);
        accessibilityBtn.addEventListener('click', runAccessibilityTest);

        // 画像切替ボタンのイベント設定
        imageButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => changeImage(index + 1));
            btn.addEventListener('keydown', handleKeyboardNavigation);
        });

        // 商品画像のキーボード操作
        productImage.addEventListener('keydown', handleKeyboardNavigation);
        productImage.addEventListener('click', () => {
            const nextImage = (productData.currentImage % 3) + 1;
            changeImage(nextImage);
        });

        // レスポンシブ対応: リサイズ検知
        window.addEventListener('resize', detectDeviceType);
        window.addEventListener('orientationchange', () => {
            setTimeout(detectDeviceType, 100);
        });

        // 18. 初期化処理
        document.addEventListener('DOMContentLoaded', function() {
            console.log('=== 19.5 UI/UX完成モード開始 ===');
            console.log('新しい学習テーマ: レスポンシブデザイン & アクセシビリティ');
            console.log('重要ポイント: 全デバイス・全ユーザー対応');
            
            loadData();
            detectDeviceType();
            updateDisplay();
            
            addToHistory('システム開始');
            showNotification('🎨 UI/UX完成モードへようこそ！', 'success');
            
            console.log('📱 画面サイズを変更してレスポンシブ動作を確認してください');
            console.log('⌨️ キーボードでの操作も可能です（Tab, Enter, Space, 矢印キー）');
        });