# 23.3-thumbnail-selection: サムネイル選択

## 🎯 今回学ぶたった1つの新しいこと
**イベント委譲とクリック処理** - 動的に生成されたサムネイル画像をクリックして、メイン画像を直接選択する仕組みの実装

## 📖 前回までの復習
前回（23.2）では、画像配列とインデックス操作を学び、「次へ」「前へ」ボタンで画像を順次切り替える機能を実装しました。配列の範囲チェックや循環表示もマスターしました。

## 🚀 今回作るもの
前回の機能に加えて、サムネイル画像一覧を追加します：
- 全ての商品画像をサムネイル形式で一覧表示
- サムネイルをクリックして直接その画像を選択
- 選択中のサムネイルをハイライト表示
- ボタン操作とサムネイル操作の両方に対応

## 💡 なぜこれが重要？
ユーザビリティの向上には直感的な操作が不可欠です。サムネイル選択により、見たい画像に素早くアクセスでき、ECサイトの使い勝手が大幅に改善されます。イベント委譲を理解することで、動的なコンテンツに対応できます。

## 📝 ステップバイステップ解説

### Step 1: HTMLにサムネイル表示エリアを追加
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品情報表示 - サムネイル選択</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .thumbnail-container {
            display: flex;
            gap: 10px;
            margin-top: 15px;
            justify-content: center;
        }
        .thumbnail {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        .thumbnail:hover {
            transform: scale(1.05);
            border-color: #0d6efd;
        }
        .thumbnail.active {
            border-color: #0d6efd;
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-body">
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <div class="text-center">
                                    <img id="main-image" 
                                         src="https://via.placeholder.com/400x400?text=商品画像1" 
                                         alt="商品画像" 
                                         class="img-fluid rounded shadow">
                                </div>
                                
                                <!-- 既存の次へ/前へボタン -->
                                <div class="text-center mt-3">
                                    <button id="prev-btn" class="btn btn-outline-secondary me-2">
                                        ← 前へ
                                    </button>
                                    <span id="image-counter" class="mx-3 text-muted">1 / 3</span>
                                    <button id="next-btn" class="btn btn-outline-secondary ms-2">
                                        次へ →
                                    </button>
                                </div>
                                
                                <!-- 新しく追加：サムネイル一覧 -->
                                <div class="thumbnail-container" id="thumbnail-container">
                                    <!-- サムネイル画像がJavaScriptで動的に生成される -->
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <h1 id="product-name" class="card-title">商品名が表示されます</h1>
                                <p id="product-price" class="h4 text-primary mb-3">価格が表示されます</p>
                                <p id="product-description" class="card-text">商品説明が表示されます</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
```

### Step 2: サムネイル生成機能を実装
```javascript
// サムネイル画像を生成する関数
function generateThumbnails() {
    const thumbnailContainer = document.getElementById('thumbnail-container');
    
    // 既存のサムネイルをクリア
    thumbnailContainer.innerHTML = '';
    
    // 各画像のサムネイルを生成
    productData.images.forEach((image, index) => {
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = image.url;
        thumbnailImg.alt = image.alt;
        thumbnailImg.className = 'thumbnail';
        
        // data属性でインデックスを保存
        thumbnailImg.setAttribute('data-index', index);
        
        // 最初の画像をアクティブにする
        if (index === currentImageIndex) {
            thumbnailImg.classList.add('active');
        }
        
        thumbnailContainer.appendChild(thumbnailImg);
    });
    
    console.log('サムネイルを生成しました');
}
```

### Step 3: サムネイルのアクティブ状態管理
```javascript
// アクティブなサムネイルを更新する関数
function updateActiveThumbnail() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // 全てのサムネイルからactiveクラスを削除
    thumbnails.forEach(thumbnail => {
        thumbnail.classList.remove('active');
    });
    
    // 現在のインデックスに対応するサムネイルにactiveクラスを追加
    if (thumbnails[currentImageIndex]) {
        thumbnails[currentImageIndex].classList.add('active');
    }
}

// 画像表示を更新する関数（前回から拡張）
function updateImageDisplay() {
    const mainImage = document.getElementById('main-image');
    const imageCounter = document.getElementById('image-counter');
    
    const currentImage = productData.images[currentImageIndex];
    mainImage.src = currentImage.url;
    mainImage.alt = currentImage.alt;
    
    imageCounter.textContent = `${currentImageIndex + 1} / ${productData.images.length}`;
    
    // サムネイルのアクティブ状態も更新
    updateActiveThumbnail();
    
    console.log(`画像を切り替えました: ${currentImageIndex + 1}枚目`);
}
```

### Step 4: イベント委譲でクリック処理を実装
```javascript
// サムネイルクリックのイベント処理
function setupThumbnailClickHandler() {
    const thumbnailContainer = document.getElementById('thumbnail-container');
    
    // イベント委譲を使用：コンテナにイベントリスナーを設定
    thumbnailContainer.addEventListener('click', function(event) {
        // クリックされた要素がサムネイル画像か確認
        if (event.target.classList.contains('thumbnail')) {
            // data-index属性からインデックスを取得
            const clickedIndex = parseInt(event.target.getAttribute('data-index'));
            
            // インデックスが有効か確認
            if (!isNaN(clickedIndex) && clickedIndex >= 0 && clickedIndex < productData.images.length) {
                currentImageIndex = clickedIndex;
                updateImageDisplay();
                console.log(`サムネイル${clickedIndex + 1}がクリックされました`);
            }
        }
    });
    
    console.log('サムネイルクリックハンドラーを設定しました');
}
```

### Step 5: 初期化処理を更新
```javascript
// ギャラリーを初期化する関数（拡張版）
function initializeGallery() {
    displayProductInfo();
    generateThumbnails();      // サムネイル生成
    updateImageDisplay();
    setupThumbnailClickHandler(); // サムネイルクリック処理設定
    
    // 既存のボタンイベントリスナー
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.addEventListener('click', function() {
        changeImage('prev');
    });
    
    nextBtn.addEventListener('click', function() {
        changeImage('next');
    });
}
```

### 完成したscript.js全体
```javascript
// 商品データオブジェクト
const productData = {
    name: "プレミアム コットンTシャツ",
    price: 2980,
    description: "上質なコットン100%を使用した、着心地の良いTシャツです。シンプルなデザインでどんなスタイルにも合わせやすく、普段使いからお出かけまで幅広くお使いいただけます。",
    images: [
        {
            url: "https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=正面",
            alt: "商品正面画像"
        },
        {
            url: "https://via.placeholder.com/400x400/4ECDC4/FFFFFF?text=サイド",
            alt: "商品サイド画像"
        },
        {
            url: "https://via.placeholder.com/400x400/45B7D1/FFFFFF?text=バック",
            alt: "商品バック画像"
        },
        {
            url: "https://via.placeholder.com/400x400/F9CA24/FFFFFF?text=詳細",
            alt: "商品詳細画像"
        }
    ]
};

let currentImageIndex = 0;

// 商品情報を表示する関数
function displayProductInfo() {
    const nameElement = document.getElementById('product-name');
    const priceElement = document.getElementById('product-price');
    const descriptionElement = document.getElementById('product-description');
    
    nameElement.textContent = productData.name;
    priceElement.textContent = '¥' + productData.price.toLocaleString();
    descriptionElement.textContent = productData.description;
    
    console.log('商品情報を表示しました:', productData);
}

// サムネイル画像を生成する関数
function generateThumbnails() {
    const thumbnailContainer = document.getElementById('thumbnail-container');
    thumbnailContainer.innerHTML = '';
    
    productData.images.forEach((image, index) => {
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = image.url;
        thumbnailImg.alt = image.alt;
        thumbnailImg.className = 'thumbnail';
        thumbnailImg.setAttribute('data-index', index);
        
        if (index === currentImageIndex) {
            thumbnailImg.classList.add('active');
        }
        
        thumbnailContainer.appendChild(thumbnailImg);
    });
    
    console.log('サムネイルを生成しました');
}

// アクティブなサムネイルを更新する関数
function updateActiveThumbnail() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.classList.remove('active');
    });
    
    if (thumbnails[currentImageIndex]) {
        thumbnails[currentImageIndex].classList.add('active');
    }
}

// 画像表示を更新する関数
function updateImageDisplay() {
    const mainImage = document.getElementById('main-image');
    const imageCounter = document.getElementById('image-counter');
    
    const currentImage = productData.images[currentImageIndex];
    mainImage.src = currentImage.url;
    mainImage.alt = currentImage.alt;
    
    imageCounter.textContent = `${currentImageIndex + 1} / ${productData.images.length}`;
    
    updateActiveThumbnail();
    
    console.log(`画像を切り替えました: ${currentImageIndex + 1}枚目`);
}

// 画像を切り替える関数
function changeImage(direction) {
    if (direction === 'next') {
        currentImageIndex++;
        if (currentImageIndex >= productData.images.length) {
            currentImageIndex = 0;
        }
    } else if (direction === 'prev') {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = productData.images.length - 1;
        }
    }
    
    updateImageDisplay();
}

// サムネイルクリックのイベント処理
function setupThumbnailClickHandler() {
    const thumbnailContainer = document.getElementById('thumbnail-container');
    
    thumbnailContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('thumbnail')) {
            const clickedIndex = parseInt(event.target.getAttribute('data-index'));
            
            if (!isNaN(clickedIndex) && clickedIndex >= 0 && clickedIndex < productData.images.length) {
                currentImageIndex = clickedIndex;
                updateImageDisplay();
                console.log(`サムネイル${clickedIndex + 1}がクリックされました`);
            }
        }
    });
    
    console.log('サムネイルクリックハンドラーを設定しました');
}

// ギャラリーを初期化する関数
function initializeGallery() {
    displayProductInfo();
    generateThumbnails();
    updateImageDisplay();
    setupThumbnailClickHandler();
    
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.addEventListener('click', function() {
        changeImage('prev');
    });
    
    nextBtn.addEventListener('click', function() {
        changeImage('next');
    });
}

// ページ読み込み完了時に実行
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
});
```

## ⚠️ よくあるエラーと対処法

### エラー1: サムネイルがクリックできない
**原因**: イベントリスナーが正しく設定されていない
```javascript
// ❌ 間違い：各サムネイルに個別にイベントを設定
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', ...); // 動的要素には効かない
});

// ✅ 正しい：イベント委譲を使用
const container = document.getElementById('thumbnail-container');
container.addEventListener('click', function(event) {
    if (event.target.classList.contains('thumbnail')) {
        // 処理
    }
});
```

### エラー2: アクティブ状態が正しく更新されない
**原因**: CSSクラスの追加・削除が適切に行われていない
```javascript
// デバッグ用のログを追加
function updateActiveThumbnail() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    console.log('サムネイル数:', thumbnails.length);
    console.log('現在のインデックス:', currentImageIndex);
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.classList.remove('active');
        if (index === currentImageIndex) {
            thumbnail.classList.add('active');
            console.log(`サムネイル${index}をアクティブにしました`);
        }
    });
}
```

### エラー3: data-index属性が取得できない
**原因**: 属性の設定や取得方法に問題がある
```javascript
// 属性設定時の確認
thumbnailImg.setAttribute('data-index', index);
console.log('設定したdata-index:', thumbnailImg.getAttribute('data-index'));

// 取得時の確認
const clickedIndex = parseInt(event.target.getAttribute('data-index'));
console.log('クリックされたインデックス:', clickedIndex);
```

## ✅ 完成チェックリスト
- [ ] ページ下部にサムネイル画像が4つ横並びで表示される
- [ ] 最初のサムネイルが青い枠でハイライトされる
- [ ] サムネイルをクリックするとメイン画像が切り替わる
- [ ] クリックしたサムネイルがアクティブ（青い枠）になる
- [ ] 「次へ」「前へ」ボタンでもサムネイルのアクティブ状態が変わる
- [ ] サムネイルにマウスを乗せると少し拡大される
- [ ] 全てのサムネイルが正しくクリックできる

### 動作確認方法
1. ブラウザでindex.htmlを開く
2. サムネイル3つ目をクリック → メイン画像が3枚目に変わることを確認
3. 「次へ」ボタンを押す → 4枚目に変わり、対応するサムネイルがアクティブになることを確認
4. F12でコンソールを開き、クリック時のログを確認

## 🔗 次回予告
次回「23.4-size-selection」では、サイズ選択機能を実装します。**ラジオボタンとフォーム処理**を学び、S/M/L/XLのサイズオプションを選択できる機能を追加します。選択されたサイズをJavaScriptで管理し、ユーザーの選択状態を適切に保持する方法を学習します！