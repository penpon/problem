# 23.2-image-gallery-basic: 画像ギャラリー基礎

## 🎯 今回学ぶたった1つの新しいこと
**配列インデックス操作** - 画像の配列を作成し、インデックス（番号）を使って「次へ」「前へ」ボタンで画像を切り替える方法

## 📖 前回までの復習
前回（23.1）では、商品の名前・価格・説明をオブジェクトで管理する方法を学びました。オブジェクトのプロパティにアクセスして、HTMLに情報を表示できるようになりました。

## 🚀 今回作るもの
前回の商品情報に加えて、画像ギャラリー機能を追加します：
- 複数の商品画像を配列で管理
- メイン画像の表示
- 「次へ」「前へ」ボタンで画像切り替え
- 現在何枚目かを示すインジケーター

## 💡 なぜこれが重要？
ECサイトでは商品を多角度から見せることが重要です。配列とインデックスの操作をマスターすることで、動的な画像切り替え機能を実装でき、より魅力的な商品ページを作成できます。

## 📝 ステップバイステップ解説

### Step 1: HTMLに画像ギャラリー要素を追加
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品情報表示 - 画像ギャラリー</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-body">
                        <!-- 画像ギャラリー部分 -->
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <div class="text-center">
                                    <img id="main-image" 
                                         src="https://via.placeholder.com/400x400?text=商品画像1" 
                                         alt="商品画像" 
                                         class="img-fluid rounded shadow">
                                </div>
                                <!-- 画像切り替えボタン -->
                                <div class="text-center mt-3">
                                    <button id="prev-btn" class="btn btn-outline-secondary me-2">
                                        ← 前へ
                                    </button>
                                    <span id="image-counter" class="mx-3 text-muted">1 / 3</span>
                                    <button id="next-btn" class="btn btn-outline-secondary ms-2">
                                        次へ →
                                    </button>
                                </div>
                            </div>
                            
                            <!-- 商品情報部分 -->
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

### Step 2: 商品データに画像配列を追加
```javascript
// 商品データオブジェクトを拡張
const productData = {
    name: "プレミアム コットンTシャツ",
    price: 2980,
    description: "上質なコットン100%を使用した、着心地の良いTシャツです。シンプルなデザインでどんなスタイルにも合わせやすく、普段使いからお出かけまで幅広くお使いいただけます。",
    // 新しく追加：画像配列
    images: [
        {
            url: "https://via.placeholder.com/400x400?text=商品画像1",
            alt: "商品正面画像"
        },
        {
            url: "https://via.placeholder.com/400x400?text=商品画像2", 
            alt: "商品サイド画像"
        },
        {
            url: "https://via.placeholder.com/400x400?text=商品画像3",
            alt: "商品バック画像"
        }
    ]
};

// 現在表示している画像のインデックス（0から始まる）
let currentImageIndex = 0;
```

### Step 3: 画像切り替え機能を実装
```javascript
// 画像を切り替える関数
function changeImage(direction) {
    // direction: 'next' または 'prev'
    
    if (direction === 'next') {
        currentImageIndex++;
        // 配列の最後に達したら最初に戻る
        if (currentImageIndex >= productData.images.length) {
            currentImageIndex = 0;
        }
    } else if (direction === 'prev') {
        currentImageIndex--;
        // 配列の最初より前に行ったら最後に戻る
        if (currentImageIndex < 0) {
            currentImageIndex = productData.images.length - 1;
        }
    }
    
    // 画像表示を更新
    updateImageDisplay();
}

// 画像表示を更新する関数
function updateImageDisplay() {
    const mainImage = document.getElementById('main-image');
    const imageCounter = document.getElementById('image-counter');
    
    // 現在のインデックスに対応する画像を表示
    const currentImage = productData.images[currentImageIndex];
    mainImage.src = currentImage.url;
    mainImage.alt = currentImage.alt;
    
    // カウンター表示を更新（1から始まる表示にする）
    imageCounter.textContent = `${currentImageIndex + 1} / ${productData.images.length}`;
}
```

### Step 4: ボタンのイベントリスナーを追加
```javascript
// 初期化関数
function initializeGallery() {
    // 商品情報を表示
    displayProductInfo();
    
    // 初期画像を表示
    updateImageDisplay();
    
    // ボタンにイベントリスナーを追加
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.addEventListener('click', function() {
        changeImage('prev');
    });
    
    nextBtn.addEventListener('click', function() {
        changeImage('next');
    });
}

// 商品情報を表示する関数（前回と同じ）
function displayProductInfo() {
    const nameElement = document.getElementById('product-name');
    const priceElement = document.getElementById('product-price');
    const descriptionElement = document.getElementById('product-description');
    
    nameElement.textContent = productData.name;
    priceElement.textContent = '¥' + productData.price.toLocaleString();
    descriptionElement.textContent = productData.description;
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
            url: "https://via.placeholder.com/400x400?text=商品画像1&style=filled",
            alt: "商品正面画像"
        },
        {
            url: "https://via.placeholder.com/400x400?text=商品画像2&style=filled",
            alt: "商品サイド画像"
        },
        {
            url: "https://via.placeholder.com/400x400?text=商品画像3&style=filled",
            alt: "商品バック画像"
        }
    ]
};

// 現在表示中の画像インデックス
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

// 画像表示を更新する関数
function updateImageDisplay() {
    const mainImage = document.getElementById('main-image');
    const imageCounter = document.getElementById('image-counter');
    
    const currentImage = productData.images[currentImageIndex];
    mainImage.src = currentImage.url;
    mainImage.alt = currentImage.alt;
    
    imageCounter.textContent = `${currentImageIndex + 1} / ${productData.images.length}`;
    
    console.log(`画像を切り替えました: ${currentImageIndex + 1}枚目`);
}

// 画像を切り替える関数
function changeImage(direction) {
    if (direction === 'next') {
        currentImageIndex++;
        if (currentImageIndex >= productData.images.length) {
            currentImageIndex = 0; // 最後まで行ったら最初に戻る
        }
    } else if (direction === 'prev') {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = productData.images.length - 1; // 最初より前なら最後に戻る
        }
    }
    
    updateImageDisplay();
}

// ギャラリーを初期化する関数
function initializeGallery() {
    displayProductInfo();
    updateImageDisplay();
    
    // ボタンのイベントリスナー設定
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

### エラー1: 「Cannot read property 'length' of undefined」
**原因**: 画像配列が正しく定義されていない
```javascript
// ❌ 間違い
const productData = {
    name: "商品名",
    image: "画像URL" // 単一の画像
};

// ✅ 正しい
const productData = {
    name: "商品名", 
    images: [        // 配列で複数画像
        { url: "画像URL1", alt: "説明1" },
        { url: "画像URL2", alt: "説明2" }
    ]
};
```

### エラー2: 画像が表示されない
**原因**: インデックスが配列の範囲外、または画像URLが不正
```javascript
// デバッグ用のログを追加
function updateImageDisplay() {
    console.log('現在のインデックス:', currentImageIndex);
    console.log('画像配列の長さ:', productData.images.length);
    console.log('現在の画像:', productData.images[currentImageIndex]);
    
    // 安全性チェックを追加
    if (currentImageIndex >= 0 && currentImageIndex < productData.images.length) {
        const currentImage = productData.images[currentImageIndex];
        // ... 画像更新処理
    }
}
```

### エラー3: ボタンを押しても反応しない
**原因**: イベントリスナーが正しく設定されていない
```javascript
// DOMContentLoadedの中でイベントリスナーを設定することを確認
document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // 要素が存在するかチェック
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            changeImage('prev');
        });
        
        nextBtn.addEventListener('click', function() {
            changeImage('next');
        });
    } else {
        console.error('ボタン要素が見つかりません');
    }
});
```

## ✅ 完成チェックリスト
- [ ] ページを開くと最初の画像（1枚目）が表示される
- [ ] 「次へ」ボタンで2枚目、3枚目に切り替わる
- [ ] 3枚目で「次へ」を押すと1枚目に戻る
- [ ] 「前へ」ボタンで前の画像に戻る
- [ ] 1枚目で「前へ」を押すと3枚目に戻る
- [ ] カウンター表示が「1 / 3」「2 / 3」「3 / 3」と正しく変化する
- [ ] 開発者ツールのコンソールで切り替え状況を確認できる

### 動作確認方法
1. ブラウザでindex.htmlを開く
2. 「次へ」ボタンを3回クリック（1→2→3→1 の順に変化）
3. 「前へ」ボタンを3回クリック（1→3→2→1 の順に変化）
4. F12でコンソールを開き、切り替え時のログを確認

## 🔗 次回予告
次回「23.3-thumbnail-selection」では、サムネイル画像を一覧表示し、**イベント委譲とクリック処理**を使ってサムネイルをクリックすることで画像を直接選択する機能を実装します。配列の操作に加えて、より直感的なユーザーインターフェースを作成していきます！