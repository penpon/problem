// ===== 基本的なページ交互作用の学習 =====

// いいねの数を記録する変数
let likeCount = 0;
let isLiked = false;

// 詳細表示の状態を記録する変数
let isDetailsShown = false;

// メッセージを表示する関数
function showMessage(message) {
    const messageDisplay = document.getElementById('messageDisplay');
    messageDisplay.textContent = message;
    
    // 少し時間が経ったら元のメッセージに戻る
    setTimeout(function() {
        messageDisplay.textContent = 'ボタンを押すとメッセージが表示されます';
    }, 3000); // 3秒後
}

// いいねボタンが押された時の処理
function handleLikeClick() {
    const likeBtn = document.getElementById('likeBtn');
    const likeCountDisplay = document.getElementById('likeCount');
    
    if (isLiked) {
        // すでにいいねしている場合：いいねを取り消す
        isLiked = false;
        likeCount = likeCount - 1;
        likeBtn.classList.remove('liked'); // 赤い色を削除
        showMessage('いいねを取り消しました');
    } else {
        // まだいいねしていない場合：いいねする
        isLiked = true;
        likeCount = likeCount + 1;
        likeBtn.classList.add('liked'); // 赤い色を追加
        showMessage('❤️ いいねしました！ありがとうございます');
    }
    
    // 画面の数字を更新
    likeCountDisplay.textContent = likeCount;
}

// 詳細ボタンが押された時の処理
function handleDetailClick() {
    const detailBtn = document.getElementById('detailBtn');
    const productDetails = document.getElementById('productDetails');
    
    if (isDetailsShown) {
        // 詳細が表示されている場合：隠す
        isDetailsShown = false;
        productDetails.style.display = 'none';
        detailBtn.textContent = '詳細を見る';
        showMessage('商品詳細を隠しました');
    } else {
        // 詳細が隠れている場合：表示する
        isDetailsShown = true;
        productDetails.style.display = 'block';
        detailBtn.textContent = '詳細を隠す';
        showMessage('📝 商品詳細を表示しました');
    }
}

// ページが読み込まれた時の初期設定
document.addEventListener('DOMContentLoaded', function() {
    // いいねボタンにクリックイベントを追加
    const likeBtn = document.getElementById('likeBtn');
    likeBtn.addEventListener('click', handleLikeClick);
    
    // 詳細ボタンにクリックイベントを追加
    const detailBtn = document.getElementById('detailBtn');
    detailBtn.addEventListener('click', handleDetailClick);
    
    // 最初のメッセージを表示
    showMessage('ページが読み込まれました！ボタンを試してみてください');
    
    console.log('=== ステップ44: 基本的なページ交互作用 ===');
    console.log('学習ポイント：');
    console.log('1. ボタンクリックで表示・非表示を切り替え');
    console.log('2. CSSクラスの追加・削除で見た目を変更');
    console.log('3. 変数で状態を管理');
    console.log('4. メッセージでユーザーに操作結果を伝える');
});