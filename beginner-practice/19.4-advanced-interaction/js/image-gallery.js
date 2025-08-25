/* ===== IMAGE GALLERY SYSTEM - 画像切替・ギャラリー機能 ===== */

// 画像切替システム（新機能 - メイン学習ポイント）
function changeImage(imageNumber) {
    const images = ['👕', '👔', '🧥']; // 3種類の商品画像
    const imageClasses = ['image-1', 'image-2', 'image-3'];
    const productImage = document.getElementById('productImage');
    const imageButtons = document.querySelectorAll('.image-btn');
    
    // 現在の画像クラスを削除
    productImage.className = 'product-image';
    
    // 新しい画像を設定（アニメーション付き）
    setTimeout(() => {
        productImage.className = `product-image ${imageClasses[imageNumber - 1]}`;
        productImage.textContent = images[imageNumber - 1];
        productData.currentImage = imageNumber;
        productData.imageChanges += 1;
        
        // ボタンのactive状態を更新
        imageButtons.forEach((btn, index) => {
            btn.classList.toggle('active', index + 1 === imageNumber);
        });
        
        logAnimation(`画像を ${imageNumber} 番に切替`);
        showNotification(`商品画像を変更しました`, 'info');
        updateDisplay();
        saveData();
    }, 100);
}

// 画像切替ボタンのイベント設定関数
function setupImageGallery() {
    const imageButtons = document.querySelectorAll('.image-btn');
    imageButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => changeImage(index + 1));
    });
}