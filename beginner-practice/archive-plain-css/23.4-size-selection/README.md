# 23.4-size-selection: サイズ選択機能

## 🎯 今回学ぶたった1つの新しいこと
**ラジオボタンとフォーム処理** - S/M/L/XLのサイズオプションをラジオボタンで実装し、選択状態をJavaScriptで管理する方法

## 📖 前回までの復習
前回（23.3）では、サムネイル選択機能を実装しました。イベント委譲を使って動的に生成されたサムネイル画像をクリックし、メイン画像を直接選択できるようになりました。

## 🚀 今回作るもの
前回の機能に加えて、サイズ選択機能を追加します：
- S/M/L/XLのサイズオプションをラジオボタンで表示
- 選択されたサイズの状態管理
- 視覚的な選択フィードバック
- 選択状態の確認機能

## 💡 なぜこれが重要？
ECサイトでは商品オプションの選択が必須です。ラジオボタンの適切な実装により、ユーザーが一つのサイズを確実に選択でき、後の在庫チェックや購入処理にデータを活用できます。

## 📝 ステップバイステップ解説

### Step 1: HTMLにサイズ選択セクションを追加
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品情報表示 - サイズ選択</title>
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
        
        /* サイズ選択のスタイル */
        .size-option {
            margin-bottom: 10px;
        }
        .size-label {
            display: inline-block;
            padding: 8px 16px;
            border: 2px solid #dee2e6;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-right: 10px;
            min-width: 60px;
            text-align: center;
        }
        .size-label:hover {
            border-color: #0d6efd;
            background-color: #f8f9fa;
        }
        .size-label.selected {
            border-color: #0d6efd;
            background-color: #0d6efd;
            color: white;
        }
        .size-radio {
            display: none; /* ラジオボタン自体は隠す */
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
                                
                                <div class="text-center mt-3">
                                    <button id="prev-btn" class="btn btn-outline-secondary me-2">
                                        ← 前へ
                                    </button>
                                    <span id="image-counter" class="mx-3 text-muted">1 / 4</span>
                                    <button id="next-btn" class="btn btn-outline-secondary ms-2">
                                        次へ →
                                    </button>
                                </div>
                                
                                <div class="thumbnail-container" id="thumbnail-container">
                                    <!-- サムネイル画像 -->
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <h1 id="product-name" class="card-title">商品名が表示されます</h1>
                                <p id="product-price" class="h4 text-primary mb-3">価格が表示されます</p>
                                <p id="product-description" class="card-text mb-4">商品説明が表示されます</p>
                                
                                <!-- 新しく追加：サイズ選択セクション -->
                                <div class="mb-4">
                                    <h5 class="mb-3">サイズを選択してください</h5>
                                    <div id="size-selection">
                                        <!-- サイズオプションがJavaScriptで生成される -->
                                    </div>
                                    <div id="selected-size-display" class="mt-2 text-muted">
                                        サイズが選択されていません
                                    </div>
                                </div>
                                
                                <button class="btn btn-primary btn-lg w-100" id="add-to-cart-btn">
                                    カートに追加
                                </button>
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

### Step 2: 商品データにサイズ情報を追加
```javascript
// 商品データオブジェクトを拡張
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
    ],
    // 新しく追加：サイズオプション
    sizes: [
        { value: 'S', label: 'S', description: 'スモール' },
        { value: 'M', label: 'M', description: 'ミディアム' },
        { value: 'L', label: 'L', description: 'ラージ' },
        { value: 'XL', label: 'XL', description: 'エクストララージ' }
    ]
};

let currentImageIndex = 0;
let selectedSize = null; // 選択されたサイズを保存
```

### Step 3: サイズ選択UIを生成
```javascript
// サイズ選択UIを生成する関数
function generateSizeSelection() {
    const sizeSelectionContainer = document.getElementById('size-selection');
    sizeSelectionContainer.innerHTML = '';
    
    productData.sizes.forEach((size, index) => {
        // ラジオボタンを作成
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'size';
        radioInput.value = size.value;
        radioInput.id = `size-${size.value}`;
        radioInput.className = 'size-radio';
        
        // ラベルを作成
        const label = document.createElement('label');
        label.htmlFor = `size-${size.value}`;
        label.className = 'size-label';
        label.textContent = size.label;
        label.title = size.description; // ツールチップ表示
        
        // コンテナに追加
        sizeSelectionContainer.appendChild(radioInput);
        sizeSelectionContainer.appendChild(label);
    });
    
    console.log('サイズ選択UIを生成しました');
}
```

### Step 4: サイズ選択のイベント処理
```javascript
// サイズ選択のイベントハンドラーを設定
function setupSizeSelectionHandler() {
    const sizeSelectionContainer = document.getElementById('size-selection');
    
    sizeSelectionContainer.addEventListener('change', function(event) {
        if (event.target.type === 'radio' && event.target.name === 'size') {
            selectedSize = event.target.value;
            updateSizeDisplay();
            updateAddToCartButton();
            console.log('選択されたサイズ:', selectedSize);
        }
    });
    
    // ラベルクリックでも選択できるようにする
    sizeSelectionContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('size-label')) {
            const associatedRadio = document.getElementById(event.target.htmlFor);
            if (associatedRadio) {
                associatedRadio.checked = true;
                selectedSize = associatedRadio.value;
                updateSizeDisplay();
                updateAddToCartButton();
                console.log('ラベルクリックでサイズ選択:', selectedSize);
            }
        }
    });
    
    console.log('サイズ選択ハンドラーを設定しました');
}

// サイズ表示を更新する関数
function updateSizeDisplay() {
    // ラベルの見た目を更新
    const labels = document.querySelectorAll('.size-label');
    labels.forEach(label => {
        label.classList.remove('selected');
    });
    
    if (selectedSize) {
        const selectedLabel = document.querySelector(`label[for="size-${selectedSize}"]`);
        if (selectedLabel) {
            selectedLabel.classList.add('selected');
        }
        
        // 選択状態の表示を更新
        const selectedSizeDisplay = document.getElementById('selected-size-display');
        const selectedSizeInfo = productData.sizes.find(size => size.value === selectedSize);
        selectedSizeDisplay.textContent = `選択中: ${selectedSizeInfo.description} (${selectedSize})`;
        selectedSizeDisplay.className = 'mt-2 text-success';
    }
}
```

### Step 5: カートボタンの状態管理
```javascript
// カートに追加ボタンの状態を更新
function updateAddToCartButton() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    if (selectedSize) {
        addToCartBtn.disabled = false;
        addToCartBtn.textContent = 'カートに追加';
        addToCartBtn.className = 'btn btn-primary btn-lg w-100';
    } else {
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = 'サイズを選択してください';
        addToCartBtn.className = 'btn btn-secondary btn-lg w-100';
    }
}

// カートに追加のクリック処理
function setupAddToCartHandler() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    addToCartBtn.addEventListener('click', function() {
        if (selectedSize) {
            // 実際の処理では、ここでカートにアイテムを追加
            alert(`${productData.name} (サイズ: ${selectedSize}) をカートに追加しました！`);
            console.log('カートに追加:', {
                product: productData.name,
                size: selectedSize,
                price: productData.price
            });
        } else {
            alert('サイズを選択してください');
        }
    });
    
    console.log('カート追加ハンドラーを設定しました');
}
```

### Step 6: 初期化処理を更新
```javascript
// ギャラリーを初期化する関数（拡張版）
function initializeGallery() {
    displayProductInfo();
    generateThumbnails();
    generateSizeSelection();      // サイズ選択UI生成
    updateImageDisplay();
    updateAddToCartButton();      // 初期状態でボタンを無効化
    
    setupThumbnailClickHandler();
    setupSizeSelectionHandler(); // サイズ選択処理設定
    setupAddToCartHandler();     // カート追加処理設定
    
    // ボタンイベントリスナー
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

### 完成したscript.js全体の追加部分
```javascript
// 前回のコードに以下の関数を追加

// サイズ選択UIを生成する関数
function generateSizeSelection() {
    const sizeSelectionContainer = document.getElementById('size-selection');
    sizeSelectionContainer.innerHTML = '';
    
    productData.sizes.forEach((size, index) => {
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'size';
        radioInput.value = size.value;
        radioInput.id = `size-${size.value}`;
        radioInput.className = 'size-radio';
        
        const label = document.createElement('label');
        label.htmlFor = `size-${size.value}`;
        label.className = 'size-label';
        label.textContent = size.label;
        label.title = size.description;
        
        sizeSelectionContainer.appendChild(radioInput);
        sizeSelectionContainer.appendChild(label);
    });
    
    console.log('サイズ選択UIを生成しました');
}

function setupSizeSelectionHandler() {
    const sizeSelectionContainer = document.getElementById('size-selection');
    
    sizeSelectionContainer.addEventListener('change', function(event) {
        if (event.target.type === 'radio' && event.target.name === 'size') {
            selectedSize = event.target.value;
            updateSizeDisplay();
            updateAddToCartButton();
            console.log('選択されたサイズ:', selectedSize);
        }
    });
    
    sizeSelectionContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('size-label')) {
            const associatedRadio = document.getElementById(event.target.htmlFor);
            if (associatedRadio) {
                associatedRadio.checked = true;
                selectedSize = associatedRadio.value;
                updateSizeDisplay();
                updateAddToCartButton();
                console.log('ラベルクリックでサイズ選択:', selectedSize);
            }
        }
    });
    
    console.log('サイズ選択ハンドラーを設定しました');
}

function updateSizeDisplay() {
    const labels = document.querySelectorAll('.size-label');
    labels.forEach(label => {
        label.classList.remove('selected');
    });
    
    if (selectedSize) {
        const selectedLabel = document.querySelector(`label[for="size-${selectedSize}"]`);
        if (selectedLabel) {
            selectedLabel.classList.add('selected');
        }
        
        const selectedSizeDisplay = document.getElementById('selected-size-display');
        const selectedSizeInfo = productData.sizes.find(size => size.value === selectedSize);
        selectedSizeDisplay.textContent = `選択中: ${selectedSizeInfo.description} (${selectedSize})`;
        selectedSizeDisplay.className = 'mt-2 text-success';
    }
}

function updateAddToCartButton() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    if (selectedSize) {
        addToCartBtn.disabled = false;
        addToCartBtn.textContent = 'カートに追加';
        addToCartBtn.className = 'btn btn-primary btn-lg w-100';
    } else {
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = 'サイズを選択してください';
        addToCartBtn.className = 'btn btn-secondary btn-lg w-100';
    }
}

function setupAddToCartHandler() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    addToCartBtn.addEventListener('click', function() {
        if (selectedSize) {
            alert(`${productData.name} (サイズ: ${selectedSize}) をカートに追加しました！`);
            console.log('カートに追加:', {
                product: productData.name,
                size: selectedSize,
                price: productData.price
            });
        } else {
            alert('サイズを選択してください');
        }
    });
    
    console.log('カート追加ハンドラーを設定しました');
}
```

## ⚠️ よくあるエラーと対処法

### エラー1: ラジオボタンが選択できない
**原因**: name属性が同じになっていない、またはイベントリスナーの設定漏れ
```javascript
// 全てのラジオボタンのname属性を同じにする
radioInput.name = 'size'; // 全て同じ名前

// changeイベントで選択を検知
element.addEventListener('change', function(event) {
    if (event.target.type === 'radio' && event.target.name === 'size') {
        // 処理
    }
});
```

### エラー2: 選択状態の見た目が更新されない
**原因**: CSSクラスの更新処理が正しく動作していない
```javascript
// 全てのラベルからselectedクラスを削除してから追加
const labels = document.querySelectorAll('.size-label');
console.log('ラベル数:', labels.length);

labels.forEach(label => {
    label.classList.remove('selected');
});

// 選択されたラベルにselectedクラスを追加
const selectedLabel = document.querySelector(`label[for="size-${selectedSize}"]`);
if (selectedLabel) {
    selectedLabel.classList.add('selected');
    console.log('選択状態を更新:', selectedSize);
}
```

### エラー3: カートボタンの状態が変わらない
**原因**: selectedSize変数が正しく更新されていない
```javascript
// デバッグ用のログを追加
function updateAddToCartButton() {
    console.log('現在選択されているサイズ:', selectedSize);
    
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    if (selectedSize) {
        console.log('ボタンを有効化');
        addToCartBtn.disabled = false;
    } else {
        console.log('ボタンを無効化');
        addToCartBtn.disabled = true;
    }
}
```

## ✅ 完成チェックリスト
- [ ] ページ右側にS/M/L/XLのサイズオプションが表示される
- [ ] 初期状態ではどのサイズも選択されていない
- [ ] サイズをクリックすると青い背景で選択状態が表示される
- [ ] 他のサイズを選択すると前の選択が解除される（一つだけ選択可能）
- [ ] 選択中のサイズが「選択中: ミディアム (M)」として表示される
- [ ] サイズ未選択時は「カートに追加」ボタンが無効（グレー）
- [ ] サイズ選択後は「カートに追加」ボタンが有効（青）
- [ ] 「カートに追加」をクリックするとアラートが表示される

### 動作確認方法
1. ページを開く → 「カートに追加」ボタンがグレーで「サイズを選択してください」と表示
2. Mサイズをクリック → 青い背景になり、ボタンが青色の「カートに追加」に変化
3. Lサイズをクリック → Mの選択が解除され、Lが選択状態に
4. 「カートに追加」をクリック → 選択したサイズが含まれたアラートが表示

## 🔗 次回予告
次回「23.5-color-selection」では、色選択機能を実装します。**選択状態のCSS制御**を学び、カラーパレットから色を選択する機能を追加します。サイズ選択と同様の仕組みを使いながら、視覚的により魅力的なインターフェースを作成していきます！