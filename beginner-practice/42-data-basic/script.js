console.log("📊 基本データ管理を開始します！");

// お気に入り商品を保存する配列
let favorites = [];

// DOM要素を取得
let favoritesList = document.getElementById("favorites-list");
let statsSection = document.getElementById("stats-section");

// お気に入りリストを表示する関数
function displayFavorites() {
    // 配列が空の場合
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="empty-message">まだお気に入り商品がありません</p>';
        return;
    }
    
    // 配列の内容をHTMLで表示
    let html = '';
    for (let i = 0; i < favorites.length; i++) {
        let product = favorites[i];
        html += `
            <div class="favorite-item">
                <span class="product-name">${product.name}</span>
                <span class="product-price">¥${product.price.toLocaleString()}</span>
                <button class="remove-btn" data-product="${product.name}">削除</button>
            </div>
        `;
    }
    favoritesList.innerHTML = html;
    
    // 削除ボタンにイベントリスナーを追加
    let removeButtons = document.querySelectorAll('.remove-btn');
    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', function() {
            let productName = this.getAttribute('data-product');
            removeFromFavorites(productName);
        });
    }
}

// 統計を表示する関数
function displayStats() {
    let itemCount = favorites.length;
    let totalPrice = 0;
    
    // 配列をループして合計金額を計算
    for (let i = 0; i < favorites.length; i++) {
        totalPrice += favorites[i].price;
    }
    
    // 平均価格を計算（商品がある場合のみ）
    let avgPrice = itemCount > 0 ? Math.round(totalPrice / itemCount) : 0;
    
    // 統計を画面に表示
    document.getElementById("item-count").textContent = itemCount;
    document.getElementById("total-price").textContent = `¥${totalPrice.toLocaleString()}`;
    document.getElementById("avg-price").textContent = `¥${avgPrice.toLocaleString()}`;
    
    console.log(`統計更新: 商品数${itemCount}, 合計¥${totalPrice}, 平均¥${avgPrice}`);
}

// お気に入りに追加する関数
function addToFavorites(name, price) {
    // 既に追加されているかチェック
    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].name === name) {
            alert(`${name}は既にお気に入りに追加されています`);
            return;
        }
    }
    
    // 新しい商品オブジェクトを作成
    let product = {
        name: name,
        price: price,
        addedTime: new Date().toLocaleTimeString()
    };
    
    // 配列に追加
    favorites.push(product);
    
    console.log(`お気に入りに追加: ${name} (¥${price})`);
    console.log("現在のお気に入り:", favorites);
    
    // 表示を更新
    displayFavorites();
    displayStats();
}

// お気に入りから削除する関数
function removeFromFavorites(name) {
    // 削除前の配列の長さを記録
    let beforeCount = favorites.length;
    
    // filter()を使って該当商品以外を残す
    favorites = favorites.filter(function(product) {
        return product.name !== name;
    });
    
    // 削除されたかチェック
    if (favorites.length < beforeCount) {
        console.log(`お気に入りから削除: ${name}`);
        console.log("現在のお気に入り:", favorites);
        
        // 表示を更新
        displayFavorites();
        displayStats();
    }
}

// 全て削除する関数
function clearAllFavorites() {
    if (favorites.length === 0) {
        alert("削除する商品がありません");
        return;
    }
    
    // 確認メッセージ
    if (confirm(`${favorites.length}個の商品をすべて削除しますか？`)) {
        favorites = []; // 配列を空にする
        console.log("すべてのお気に入りを削除しました");
        
        // 表示を更新
        displayFavorites();
        displayStats();
    }
}

// お気に入りボタンのイベントリスナー
let favButtons = document.querySelectorAll('.fav-btn');
for (let i = 0; i < favButtons.length; i++) {
    favButtons[i].addEventListener('click', function() {
        let productName = this.getAttribute('data-product');
        let productPrice = parseInt(this.getAttribute('data-price'));
        
        addToFavorites(productName, productPrice);
    });
}

// 全削除ボタンのイベントリスナー
document.getElementById("clear-btn").addEventListener('click', function() {
    clearAllFavorites();
});

// 統計表示ボタンのイベントリスナー
document.getElementById("show-stats-btn").addEventListener('click', function() {
    displayStats();
    alert(`現在のお気に入り数: ${favorites.length}個`);
});

// 初期表示
displayFavorites();
displayStats();

console.log("✅ 基本データ管理システムが初期化されました！");
console.log("📊 配列操作: push(), filter(), length プロパティ");
console.log("💡 商品をお気に入りに追加して、配列の変化を体験してください！");