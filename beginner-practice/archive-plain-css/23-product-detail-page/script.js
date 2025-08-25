// 商品データの定義
const productData = {
    id: 1,
    name: "プレミアムTシャツ",
    description: "高品質なコットン100%を使用した、着心地抜群のプレミアムTシャツです。柔らかな肌触りと優れた耐久性を両立し、長くご愛用いただけます。",
    originalPrice: 3980,
    currentPrice: 2980,
    rating: 4.8,
    reviewCount: 124,
    
    // 商品画像（実際のECサイトでは画像URLを使用）
    images: [
        { id: 1, url: "data:image/svg+xml;base64," + btoa('<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="400" fill="#f0f0f0"/><text x="200" y="180" text-anchor="middle" font-size="60" fill="#666">👕</text><text x="200" y="240" text-anchor="middle" font-size="20" fill="#666">メイン画像</text></svg>'), alt: "メイン画像" },
        { id: 2, url: "data:image/svg+xml;base64," + btoa('<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="400" fill="#e8e8e8"/><text x="200" y="180" text-anchor="middle" font-size="60" fill="#666">📏</text><text x="200" y="240" text-anchor="middle" font-size="20" fill="#666">サイズ詳細</text></svg>'), alt: "サイズ詳細" },
        { id: 3, url: "data:image/svg+xml;base64," + btoa('<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="400" fill="#d8d8d8"/><text x="200" y="180" text-anchor="middle" font-size="60" fill="#666">🧵</text><text x="200" y="240" text-anchor="middle" font-size="20" fill="#666">生地詳細</text></svg>'), alt: "生地詳細" },
        { id: 4, url: "data:image/svg+xml;base64," + btoa('<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="400" fill="#c8c8c8"/><text x="200" y="180" text-anchor="middle" font-size="60" fill="#666">👤</text><text x="200" y="240" text-anchor="middle" font-size="20" fill="#666">着用イメージ</text></svg>'), alt: "着用イメージ" }
    ],
    
    // 色とサイズの在庫データ
    stock: {
        'S-white': 8, 'M-white': 12, 'L-white': 15, 'XL-white': 5,
        'S-black': 10, 'M-black': 20, 'L-black': 18, 'XL-black': 7,
        'S-navy': 6, 'M-navy': 14, 'L-navy': 16, 'XL-navy': 9,
        'S-gray': 4, 'M-gray': 11, 'L-gray': 13, 'XL-gray': 6,
        'S-red': 0, 'M-red': 2, 'L-red': 8, 'XL-red': 3
    },
    
    // カラー情報
    colors: {
        'white': { name: 'ホワイト', hex: '#ffffff' },
        'black': { name: 'ブラック', hex: '#000000' },
        'navy': { name: 'ネイビー', hex: '#1a237e' },
        'gray': { name: 'グレー', hex: '#616161' },
        'red': { name: 'レッド', hex: '#d32f2f' }
    }
};

// 選択状態を管理するオブジェクト
let selectedOptions = {
    size: null,
    color: null,
    quantity: 1,
    imageIndex: 0
};

// お気に入り状態
let isFavorited = false;

// レビューデータ
const reviewsData = [
    {
        id: 1,
        reviewer: "田中太郎",
        avatar: "田",
        rating: 5,
        date: "2024-01-15",
        content: "生地がとても柔らかく、着心地が抜群です！色落ちもなく、何度洗濯しても型崩れしません。リピート購入を検討中です。"
    },
    {
        id: 2,
        reviewer: "山田花子",
        avatar: "山",
        rating: 4,
        date: "2024-01-12",
        content: "サイズ感が丁度良く、シルエットがきれいです。ただ、思っていたより薄手でした。夏には良いですが、冬は重ね着が必要そうです。"
    },
    {
        id: 3,
        reviewer: "佐藤次郎",
        avatar: "佐",
        rating: 5,
        date: "2024-01-10",
        content: "コスパ最高！この価格でこの品質は素晴らしいです。色味も写真通りで、梱包も丁寧でした。友人にもおすすめしたいです。"
    },
    {
        id: 4,
        reviewer: "鈴木三郎",
        avatar: "鈴",
        rating: 4,
        date: "2024-01-08",
        content: "デザインがシンプルで使い勝手が良いです。生地の質感も良く、長く使えそうです。配送も早くて満足しています。"
    }
];

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    console.log('商品詳細ページを初期化中...');
    
    // 商品情報の表示
    displayProductInfo();
    
    // 画像ギャラリーの初期化
    initializeImageGallery();
    
    // レビューの表示
    displayReviews();
    
    console.log('初期化完了');
});

// 商品情報を画面に表示する関数
function displayProductInfo() {
    // 基本情報の表示
    document.getElementById('product-title').textContent = productData.name;
    document.getElementById('product-description').textContent = productData.description;
    document.getElementById('current-price').textContent = `¥${productData.currentPrice.toLocaleString()}`;
    document.getElementById('original-price').textContent = `¥${productData.originalPrice.toLocaleString()}`;
    
    // 評価情報の表示
    document.getElementById('rating-score').textContent = productData.rating;
    document.getElementById('review-count').textContent = productData.reviewCount;
    
    // 星評価の表示
    displayStars('rating-stars', productData.rating);
    
    console.log('商品情報を表示しました');
}

// 画像ギャラリーを初期化する関数
function initializeImageGallery() {
    // メイン画像を設定
    const mainImage = document.getElementById('main-image');
    mainImage.src = productData.images[0].url;
    mainImage.alt = productData.images[0].alt;
    
    // サムネイル画像を生成
    const thumbnailList = document.getElementById('thumbnail-list');
    const thumbnailsHTML = productData.images.map((image, index) => `
        <div class="thumbnail-item ${index === 0 ? 'active' : ''}" onclick="changeImage(${index})">
            <img src="${image.url}" alt="${image.alt}">
        </div>
    `).join('');
    
    thumbnailList.innerHTML = thumbnailsHTML;
    
    console.log('画像ギャラリーを初期化しました');
}

// 画像を切り替える関数
function changeImage(imageIndex) {
    console.log(`画像を ${imageIndex} に切り替えます`);
    
    // 選択状態を更新
    selectedOptions.imageIndex = imageIndex;
    
    // メイン画像を更新
    const mainImage = document.getElementById('main-image');
    mainImage.src = productData.images[imageIndex].url;
    mainImage.alt = productData.images[imageIndex].alt;
    
    // サムネイルのアクティブ状態を更新
    document.querySelectorAll('.thumbnail-item').forEach((item, index) => {
        if (index === imageIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// サイズを選択する関数
function selectSize(size) {
    console.log(`サイズ ${size} を選択しました`);
    
    selectedOptions.size = size;
    
    // サイズボタンの表示を更新
    document.querySelectorAll('.size-btn').forEach(btn => {
        if (btn.dataset.size === size) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
    
    // 在庫情報と購入ボタンを更新
    updateStockInfo();
    updatePurchaseButton();
}

// 色を選択する関数
function selectColor(color) {
    console.log(`色 ${color} を選択しました`);
    
    selectedOptions.color = color;
    
    // 色ボタンの表示を更新
    document.querySelectorAll('.color-btn').forEach(btn => {
        if (btn.dataset.color === color) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
    
    // 選択した色の名前を表示
    const colorName = productData.colors[color].name;
    document.getElementById('selected-color-name').textContent = `選択中: ${colorName}`;
    
    // 在庫情報と購入ボタンを更新
    updateStockInfo();
    updatePurchaseButton();
}

// 在庫情報を更新する関数
function updateStockInfo() {
    const stockSection = document.querySelector('.stock-section');
    const stockInfo = document.getElementById('stock-info');
    const stockText = stockInfo.querySelector('.stock-text');
    
    if (!selectedOptions.size || !selectedOptions.color) {
        stockText.textContent = 'サイズとカラーを選択してください';
        stockSection.className = 'stock-section';
        return;
    }
    
    // 在庫キーを生成
    const stockKey = `${selectedOptions.size}-${selectedOptions.color}`;
    const stockQuantity = productData.stock[stockKey];
    
    if (stockQuantity === 0) {
        // 在庫切れ
        stockText.textContent = '申し訳ございません。選択された組み合わせは在庫切れです';
        stockSection.className = 'stock-section out-of-stock';
    } else if (stockQuantity <= 3) {
        // 残りわずか
        stockText.textContent = `残りわずか！あと${stockQuantity}点です`;
        stockSection.className = 'stock-section low-stock';
    } else {
        // 在庫あり
        stockText.textContent = `在庫あり（${stockQuantity}点以上）`;
        stockSection.className = 'stock-section';
    }
    
    console.log(`在庫情報を更新: ${stockKey} = ${stockQuantity}`);
}

// 購入ボタンの状態を更新する関数
function updatePurchaseButton() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    if (!selectedOptions.size || !selectedOptions.color) {
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = 'サイズとカラーを選択してください';
        return;
    }
    
    const stockKey = `${selectedOptions.size}-${selectedOptions.color}`;
    const stockQuantity = productData.stock[stockKey];
    
    if (stockQuantity === 0) {
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = '在庫切れ';
    } else {
        addToCartBtn.disabled = false;
        addToCartBtn.textContent = '🛒 カートに追加';
    }
}

// 数量を変更する関数
function changeQuantity(change) {
    const newQuantity = selectedOptions.quantity + change;
    
    if (newQuantity < 1) {
        showMessage('数量は1以上を選択してください');
        return;
    }
    
    // 在庫制限チェック
    if (selectedOptions.size && selectedOptions.color) {
        const stockKey = `${selectedOptions.size}-${selectedOptions.color}`;
        const stockQuantity = productData.stock[stockKey];
        
        if (newQuantity > stockQuantity) {
            showMessage(`申し訳ございません。在庫は${stockQuantity}点までです`);
            return;
        }
    }
    
    selectedOptions.quantity = newQuantity;
    document.getElementById('quantity-display').textContent = selectedOptions.quantity;
    
    console.log(`数量を ${selectedOptions.quantity} に変更しました`);
}

// カートに追加する関数
function addToCart() {
    if (!selectedOptions.size || !selectedOptions.color) {
        showMessage('サイズとカラーを選択してください');
        return;
    }
    
    const cartItem = {
        id: productData.id,
        name: productData.name,
        price: productData.currentPrice,
        size: selectedOptions.size,
        color: productData.colors[selectedOptions.color].name,
        quantity: selectedOptions.quantity,
        image: productData.images[0].url
    };
    
    // 実際のECサイトでは、ここでカート機能と連携
    console.log('カートに追加されました:', cartItem);
    
    const colorName = productData.colors[selectedOptions.color].name;
    showMessage(`${cartItem.name}（${selectedOptions.size}・${colorName}）を${selectedOptions.quantity}点カートに追加しました`);
    
    // カートバッジを更新（簡易実装）
    const cartBadge = document.querySelector('.cart-badge');
    const currentCount = parseInt(cartBadge.textContent) || 0;
    cartBadge.textContent = currentCount + selectedOptions.quantity;
}

// お気に入りを切り替える関数
function toggleFavorite() {
    isFavorited = !isFavorited;
    const favoriteIcon = document.getElementById('favorite-icon');
    
    if (isFavorited) {
        favoriteIcon.textContent = '❤️';
        showMessage('お気に入りに追加しました');
    } else {
        favoriteIcon.textContent = '🤍';
        showMessage('お気に入りから削除しました');
    }
    
    console.log(`お気に入り状態: ${isFavorited}`);
}

// レビューを表示する関数
function displayReviews() {
    const reviewsList = document.getElementById('reviews-list');
    
    const reviewsHTML = reviewsData.map(review => `
        <div class="review-item">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${review.avatar}</div>
                    <div>
                        <div class="reviewer-name">${review.reviewer}</div>
                        <div class="review-date">${formatDate(review.date)}</div>
                    </div>
                </div>
                <div class="review-rating">${generateStars(review.rating)}</div>
            </div>
            <div class="review-content">
                ${review.content}
            </div>
        </div>
    `).join('');
    
    reviewsList.innerHTML = reviewsHTML;
    
    console.log('レビューを表示しました');
}

// 星評価を表示する関数
function displayStars(elementId, rating) {
    const starsElement = document.getElementById(elementId);
    starsElement.innerHTML = generateStars(rating);
}

// 星評価のHTMLを生成する関数
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    // 満点の星
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '⭐';
    }
    
    // 半分の星（簡易実装では表示しない）
    if (hasHalfStar) {
        starsHTML += '⭐';
    }
    
    return starsHTML;
}

// 日付をフォーマットする関数
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP');
}

// サイズガイドを表示する関数
function showSizeGuide() {
    const modal = document.getElementById('size-guide-modal');
    modal.classList.add('active');
    console.log('サイズガイドを表示しました');
}

// サイズガイドを閉じる関数
function closeSizeGuide() {
    const modal = document.getElementById('size-guide-modal');
    modal.classList.remove('active');
    console.log('サイズガイドを閉じました');
}

// 前のページに戻る関数
function goBack() {
    // 実際のECサイトでは履歴機能を使用
    showMessage('商品一覧ページに戻ります');
    console.log('前のページに戻る処理');
}

// 成功メッセージを表示する関数
function showMessage(text) {
    const messageElement = document.getElementById('success-message');
    const messageTextElement = messageElement.querySelector('.message-text');
    
    messageTextElement.textContent = text;
    messageElement.classList.add('show');
    
    // 3秒後に自動的に非表示
    setTimeout(() => {
        hideMessage();
    }, 3000);
}

// メッセージを非表示にする関数
function hideMessage() {
    const messageElement = document.getElementById('success-message');
    messageElement.classList.remove('show');
}

// キーボードイベントの処理
document.addEventListener('keydown', function(event) {
    // ESCキーでモーダルを閉じる
    if (event.key === 'Escape') {
        const modal = document.getElementById('size-guide-modal');
        if (modal.classList.contains('active')) {
            closeSizeGuide();
        }
    }
    
    // 矢印キーで画像を切り替え
    if (event.key === 'ArrowLeft' && selectedOptions.imageIndex > 0) {
        changeImage(selectedOptions.imageIndex - 1);
    } else if (event.key === 'ArrowRight' && selectedOptions.imageIndex < productData.images.length - 1) {
        changeImage(selectedOptions.imageIndex + 1);
    }
});

// エラーハンドリング
window.addEventListener('error', function(event) {
    console.error('エラーが発生しました:', event.error);
    showMessage('エラーが発生しました。ページを再読み込みしてください。');
});

// 画像読み込みエラーの処理
document.addEventListener('error', function(event) {
    if (event.target.tagName === 'IMG') {
        console.warn('画像の読み込みに失敗しました:', event.target.src);
        event.target.style.display = 'none';
    }
}, true);

// デバッグ用：現在の選択状態を表示
function debugCurrentSelection() {
    console.log('=== 現在の選択状態 ===');
    console.log('サイズ:', selectedOptions.size);
    console.log('カラー:', selectedOptions.color);
    console.log('数量:', selectedOptions.quantity);
    console.log('画像インデックス:', selectedOptions.imageIndex);
    console.log('お気に入り:', isFavorited);
    console.log('=====================');
}

// ページの可視性が変わった時の処理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('ページが非表示になりました');
    } else {
        console.log('ページが表示されました');
    }
});