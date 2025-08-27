// === 19.1 メイン学習テーマ: オブジェクトによるデータ管理 ===

// 1. 商品データをオブジェクトで管理（これが今回のメインテーマ！）
// なぜオブジェクトを使うのか？
// → 関連する情報（商品名、価格、いいね数など）をひとまとめに管理できる
let productData = {
    name: "プレミアム Tシャツ",  // 商品名
    price: 2980,                // 価格
    likes: 0,                   // いいね数
    isLiked: false              // いいね状態（押されているかどうか）
};

// 2. HTMLの要素を取得（画面の要素を操作するため）
const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');
const totalLikes = document.getElementById('totalLikes');
const objectDisplay = document.getElementById('objectDisplay');
const resetBtn = document.getElementById('resetBtn');

// 3. オブジェクトの中身を画面に表示する関数
// なぜこの関数が必要？ → オブジェクトがどう変化するかを目で確認できる
function displayObjectData() {
    // オブジェクトを見やすい形で表示
    objectDisplay.innerHTML = `
        {<br>
        &nbsp;&nbsp;name: "${productData.name}",<br>
        &nbsp;&nbsp;price: ${productData.price},<br>
        &nbsp;&nbsp;likes: <span style="color: #e74c3c; font-weight: bold;">${productData.likes}</span>,<br>
        &nbsp;&nbsp;isLiked: <span style="color: #3498db; font-weight: bold;">${productData.isLiked}</span><br>
        }
    `;
}

// 4. 画面の表示を更新する関数
// オブジェクトが変更されたら、画面も更新する必要がある
function updateDisplay() {
    // いいねカウントを更新
    likeCount.textContent = productData.likes;
    totalLikes.textContent = productData.likes;
    
    // いいねボタンの見た目を更新
    if (productData.isLiked) {
        likeBtn.classList.add('liked');
        likeBtn.innerHTML = `❤️ いいね済み <span id="likeCount">${productData.likes}</span>`;
    } else {
        likeBtn.classList.remove('liked');
        likeBtn.innerHTML = `❤️ いいね <span id="likeCount">${productData.likes}</span>`;
    }
    
    // オブジェクトの中身を表示（学習のため）
    displayObjectData();
    
    // コンソールにも出力（F12で確認可能）
    console.log('📊 現在のproductData:', productData);
}

// 5. いいね機能（メインの学習ポイント！）
// オブジェクトの値を変更する基本的な方法を学ぶ
function handleLike() {
    if (productData.isLiked) {
        // いいね取り消し：オブジェクトの複数の値を同時に変更
        productData.isLiked = false;           // 状態を変更
        productData.likes = productData.likes - 1;  // 数を減らす
        console.log('💔 いいねを取り消しました');
    } else {
        // いいね追加：オブジェクトの値を更新
        productData.isLiked = true;            // 状態を変更
        productData.likes = productData.likes + 1;   // 数を増やす（productData.likes += 1 と同じ）
        console.log('❤️ いいねしました！');
    }
    
    updateDisplay(); // 変更を画面に反映
}

// 6. リセット機能
// オブジェクトを初期状態に戻す方法を学ぶ
function handleReset() {
    if (confirm('オブジェクトの中身をリセットしますか？')) {
        // オブジェクトの各プロパティを初期値に戻す
        productData.likes = 0;
        productData.isLiked = false;
        
        console.log('🔄 オブジェクトをリセットしました');
        updateDisplay(); // 変更を画面に反映
    }
}

// 7. ボタンがクリックされた時の処理を設定
likeBtn.addEventListener('click', handleLike);
resetBtn.addEventListener('click', handleReset);

// 8. ページが読み込まれた時の初期化
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== 19.1 オブジェクト学習モード開始 ===');
    console.log('今回のテーマ: オブジェクトによるデータ管理');
    console.log('学習のポイント: 関連する情報をひとまとめにして管理する方法');
    
    updateDisplay(); // 初期状態を表示
    
    console.log('🎯 いいねボタンを押して、オブジェクトの変化を観察してみましょう！');
});