// 商品データの定義
const products = [
    {
        id: 1,
        name: "プレミアムTシャツ",
        price: 2980,
        description: "高品質なコットン100%を使用した快適なTシャツです。",
        emoji: "👕"
    },
    {
        id: 2,
        name: "レザースニーカー",
        price: 8900,
        description: "本革を使用した高級感あふれるスニーカーです。",
        emoji: "👟"
    },
    {
        id: 3,
        name: "ワイヤレスイヤホン",
        price: 5480,
        description: "高音質でノイズキャンセリング機能付きイヤホンです。",
        emoji: "🎧"
    },
    {
        id: 4,
        name: "レザーバックパック",
        price: 12800,
        description: "丈夫で機能的な本革製のバックパックです。",
        emoji: "🎒"
    }
];

// グローバル変数
let cart = [];  // カートの中身を保存する配列
let isCartOpen = false;  // カートが開いているかの状態

// ページが読み込まれたときの初期化処理
document.addEventListener('DOMContentLoaded', function() {
    console.log('ページが読み込まれました');
    
    // LocalStorageからカートデータを読み込む
    loadCartFromStorage();
    
    // 商品を画面に表示
    displayProducts();
    
    // カートの表示を更新
    updateCartDisplay();
    
    console.log('初期化完了');
});

// LocalStorageからカートデータを読み込む関数
function loadCartFromStorage() {
    try {
        // LocalStorageから 'cart' という名前でデータを取得
        const savedCart = localStorage.getItem('cart');
        
        if (savedCart) {
            // データがある場合はJSONから配列に変換
            cart = JSON.parse(savedCart);
            console.log('カートデータを読み込みました:', cart);
        } else {
            // データがない場合は空の配列
            cart = [];
            console.log('新しいカートを作成しました');
        }
    } catch (error) {
        // エラーが発生した場合（データが壊れている等）
        console.error('カートデータの読み込みでエラーが発生しました:', error);
        cart = [];
    }
}

// カートデータをLocalStorageに保存する関数
function saveCartToStorage() {
    try {
        // カート配列をJSON文字列に変換してLocalStorageに保存
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('カートデータを保存しました');
    } catch (error) {
        console.error('カートデータの保存でエラーが発生しました:', error);
    }
}

// 商品一覧を画面に表示する関数
function displayProducts() {
    const productsContainer = document.getElementById('products');
    
    // 商品データから HTMLを生成
    const productsHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">¥${product.price.toLocaleString()}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    🛒 カートに追加
                </button>
            </div>
        </div>
    `).join('');
    
    // HTMLを画面に表示
    productsContainer.innerHTML = productsHTML;
}

// 商品をカートに追加する関数
function addToCart(productId) {
    console.log('商品ID', productId, 'をカートに追加します');
    
    // 商品IDから商品データを取得
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error('商品が見つかりません');
        return;
    }
    
    // カート内に同じ商品があるかチェック
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // 既に同じ商品がある場合は数量を1増やす
        existingItem.quantity += 1;
        console.log('既存商品の数量を増やしました:', existingItem);
        showMessage(`${product.name} の数量を増やしました（${existingItem.quantity}個）`);
    } else {
        // 新しい商品の場合はカートに追加
        const newItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: 1
        };
        cart.push(newItem);
        console.log('新しい商品をカートに追加しました:', newItem);
        showMessage(`${product.name} をカートに追加しました`);
    }
    
    // LocalStorageに保存
    saveCartToStorage();
    
    // 画面の表示を更新
    updateCartDisplay();
}

// カート内の商品数量を変更する関数
function changeQuantity(productId, change) {
    console.log('商品ID', productId, 'の数量を', change, '変更します');
    
    // カート内の該当商品を見つける
    const item = cart.find(item => item.id === productId);
    
    if (!item) {
        console.error('カート内に商品が見つかりません');
        return;
    }
    
    // 数量を変更
    item.quantity += change;
    
    // 数量が0以下になったらカートから削除
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    console.log('数量を変更しました:', item);
    
    // LocalStorageに保存
    saveCartToStorage();
    
    // 画面の表示を更新
    updateCartDisplay();
}

// カートから商品を削除する関数
function removeFromCart(productId) {
    console.log('商品ID', productId, 'をカートから削除します');
    
    // 削除する商品の名前を取得（メッセージ表示用）
    const item = cart.find(item => item.id === productId);
    const productName = item ? item.name : '商品';
    
    // 配列から該当商品を削除
    cart = cart.filter(item => item.id !== productId);
    
    console.log('商品を削除しました。現在のカート:', cart);
    showMessage(`${productName} をカートから削除しました`);
    
    // LocalStorageに保存
    saveCartToStorage();
    
    // 画面の表示を更新
    updateCartDisplay();
}

// カートの表示を更新する関数
function updateCartDisplay() {
    // カートバッジ（商品数表示）を更新
    updateCartBadge();
    
    // カートアイテムの表示を更新
    updateCartItems();
    
    // 合計金額の表示を更新
    updateCartSummary();
}

// カートバッジ（商品数表示）を更新する関数
function updateCartBadge() {
    const cartCountElement = document.getElementById('cart-count');
    
    // カート内の商品の総数を計算
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // バッジに数字を表示
    cartCountElement.textContent = totalItems;
    
    // 商品が0個の場合はバッジを非表示
    if (totalItems === 0) {
        cartCountElement.classList.add('zero');
    } else {
        cartCountElement.classList.remove('zero');
    }
}

// カートアイテムの表示を更新する関数
function updateCartItems() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartEmptyElement = document.getElementById('cart-empty');
    
    if (cart.length === 0) {
        // カートが空の場合
        cartItemsElement.innerHTML = '';
        cartEmptyElement.style.display = 'block';
    } else {
        // カートに商品がある場合
        cartEmptyElement.style.display = 'none';
        
        // カート内の各商品のHTMLを生成
        const cartHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.emoji}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">¥${item.price.toLocaleString()}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `).join('');
        
        cartItemsElement.innerHTML = cartHTML;
    }
}

// 合計金額の表示を更新する関数
function updateCartSummary() {
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    
    // 小計を計算（税抜き）
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // 消費税を計算（10%）
    const tax = Math.floor(subtotal * 0.1);
    
    // 合計金額を計算（税込み）
    const total = subtotal + tax;
    
    // 画面に表示
    subtotalElement.textContent = `¥${subtotal.toLocaleString()}`;
    taxElement.textContent = `¥${tax.toLocaleString()}`;
    totalElement.textContent = `¥${total.toLocaleString()}`;
}

// カートの表示/非表示を切り替える関数
function toggleCart() {
    const cartArea = document.getElementById('cart-area');
    isCartOpen = !isCartOpen;
    
    if (isCartOpen) {
        cartArea.classList.add('active');
        console.log('カートを開きました');
    } else {
        cartArea.classList.remove('active');
        console.log('カートを閉じました');
    }
}

// 成功メッセージを表示する関数
function showMessage(text) {
    const messageElement = document.getElementById('success-message');
    const messageTextElement = messageElement.querySelector('.message-text');
    
    // メッセージテキストを設定
    messageTextElement.textContent = text;
    
    // メッセージを表示
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

// チェックアウト処理（今回は模擬的な処理）
function checkout() {
    if (cart.length === 0) {
        showMessage('カートが空です');
        return;
    }
    
    // 合計金額を計算
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = Math.floor(subtotal * 0.1);
    const total = subtotal + tax;
    
    // 確認ダイアログを表示
    const confirmed = confirm(`合計 ¥${total.toLocaleString()} でレジに進みますか？\\n\\n※これは練習用の模擬的な処理です。`);
    
    if (confirmed) {
        showMessage('ご注文ありがとうございました！');
        
        // カートを空にする
        cart = [];
        saveCartToStorage();
        updateCartDisplay();
        
        // カートを閉じる
        toggleCart();
        
        console.log('チェックアウト完了');
    }
}

// デバッグ用：現在のカート状態をコンソールに出力
function debugCart() {
    console.log('=== 現在のカート状態 ===');
    console.log('カート内容:', cart);
    console.log('商品数:', cart.reduce((total, item) => total + item.quantity, 0));
    console.log('小計:', cart.reduce((total, item) => total + (item.price * item.quantity), 0));
    console.log('========================');
}

// エラーハンドリング：予期しないエラーをキャッチ
window.addEventListener('error', function(event) {
    console.error('JavaScript エラーが発生しました:', event.error);
});