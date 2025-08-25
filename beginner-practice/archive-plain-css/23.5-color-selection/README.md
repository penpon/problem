# 23.5-color-selection: 色選択機能

## 🎯 今回学ぶたった1つの新しいこと
**選択状態のCSS制御** - カラーパレット形式の色選択UIを作成し、視覚的なフィードバックで選択状態を美しく表現する方法

## 📖 前回までの復習
前回（23.4）では、ラジオボタンとフォーム処理を学び、S/M/L/XLのサイズ選択機能を実装しました。選択状態の管理と視覚的フィードバックの基本を理解しました。

## 🚀 今回作るもの
前回の機能に加えて、色選択機能を追加します：
- カラーパレット形式の色選択UI
- 色ごとの視覚的な表示（実際の色を表示）
- 選択された色のハイライト表示
- サイズと色の両方が選択された状態の管理

## 💡 なぜこれが重要？
色選択は視覚的な要素が重要なため、ユーザーが直感的に理解できるUIが必要です。CSS制御を駆使した美しいインターフェースにより、ユーザーエクスペリエンスが大幅に向上し、購入意欲の向上につながります。

## 📝 ステップバイステップ解説

### Step 1: HTMLに色選択セクションを追加
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品情報表示 - 色選択</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        /* 既存のスタイル */
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
            display: none;
        }
        
        /* 新しく追加：色選択のスタイル */
        .color-selection-container {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-top: 10px;
        }
        .color-option {
            position: relative;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 3px solid transparent;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .color-option:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .color-option.selected {
            border-color: #0d6efd;
            transform: scale(1.15);
            box-shadow: 0 4px 16px rgba(13,110,253,0.4);
        }
        .color-option.selected::after {
            content: '✓';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-weight: bold;
            font-size: 18px;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }
        .color-radio {
            display: none;
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
                                
                                <!-- サイズ選択セクション -->
                                <div class="mb-4">
                                    <h5 class="mb-3">サイズを選択してください</h5>
                                    <div id="size-selection">
                                        <!-- サイズオプション -->
                                    </div>
                                    <div id="selected-size-display" class="mt-2 text-muted">
                                        サイズが選択されていません
                                    </div>
                                </div>
                                
                                <!-- 新しく追加：色選択セクション -->
                                <div class="mb-4">
                                    <h5 class="mb-3">カラーを選択してください</h5>
                                    <div id="color-selection" class="color-selection-container">
                                        <!-- 色オプションがJavaScriptで生成される -->
                                    </div>
                                    <div id="selected-color-display" class="mt-2 text-muted">
                                        カラーが選択されていません
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

### Step 2: 商品データに色情報を追加
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
    sizes: [
        { value: 'S', label: 'S', description: 'スモール' },
        { value: 'M', label: 'M', description: 'ミディアム' },
        { value: 'L', label: 'L', description: 'ラージ' },
        { value: 'XL', label: 'XL', description: 'エクストララージ' }
    ],
    // 新しく追加：色オプション
    colors: [
        { value: 'red', label: 'レッド', color: '#DC3545', description: '情熱的な赤' },
        { value: 'blue', label: 'ブルー', color: '#0D6EFD', description: '爽やかな青' },
        { value: 'green', label: 'グリーン', color: '#198754', description: '落ち着いた緑' },
        { value: 'black', label: 'ブラック', color: '#212529', description: '定番の黒' },
        { value: 'white', label: 'ホワイト', color: '#F8F9FA', description: '清潔感のある白' },
        { value: 'gray', label: 'グレー', color: '#6C757D', description: 'シックなグレー' }
    ]
};

let currentImageIndex = 0;
let selectedSize = null;
let selectedColor = null; // 選択された色を保存
```

### Step 3: 色選択UIを生成
```javascript
// 色選択UIを生成する関数
function generateColorSelection() {
    const colorSelectionContainer = document.getElementById('color-selection');
    colorSelectionContainer.innerHTML = '';
    
    productData.colors.forEach((color, index) => {
        // ラジオボタンを作成（隠しinput）
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'color';
        radioInput.value = color.value;
        radioInput.id = `color-${color.value}`;
        radioInput.className = 'color-radio';
        
        // 色オプションの円を作成
        const colorCircle = document.createElement('div');
        colorCircle.className = 'color-option';
        colorCircle.style.backgroundColor = color.color;
        colorCircle.title = color.description; // ツールチップ
        colorCircle.setAttribute('data-color', color.value);
        
        // 白の場合は境界線を薄く表示
        if (color.value === 'white') {
            colorCircle.style.border = '3px solid #dee2e6';
        }
        
        // コンテナに追加
        colorSelectionContainer.appendChild(radioInput);
        colorSelectionContainer.appendChild(colorCircle);
    });
    
    console.log('色選択UIを生成しました');
}
```

### Step 4: 色選択のイベント処理
```javascript
// 色選択のイベントハンドラーを設定
function setupColorSelectionHandler() {
    const colorSelectionContainer = document.getElementById('color-selection');
    
    colorSelectionContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('color-option')) {
            const colorValue = event.target.getAttribute('data-color');
            
            // 対応するラジオボタンを選択
            const associatedRadio = document.getElementById(`color-${colorValue}`);
            if (associatedRadio) {
                associatedRadio.checked = true;
                selectedColor = colorValue;
                updateColorDisplay();
                updateAddToCartButton();
                console.log('選択された色:', selectedColor);
            }
        }
    });
    
    console.log('色選択ハンドラーを設定しました');
}

// 色表示を更新する関数
function updateColorDisplay() {
    // 全ての色オプションから選択状態を削除
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    if (selectedColor) {
        // 選択された色オプションにselectedクラスを追加
        const selectedColorOption = document.querySelector(`[data-color="${selectedColor}"]`);
        if (selectedColorOption) {
            selectedColorOption.classList.add('selected');
        }
        
        // 選択状態の表示を更新
        const selectedColorDisplay = document.getElementById('selected-color-display');
        const selectedColorInfo = productData.colors.find(color => color.value === selectedColor);
        selectedColorDisplay.textContent = `選択中: ${selectedColorInfo.label}`;
        selectedColorDisplay.className = 'mt-2 text-success';
        
        // 色サンプルも表示
        const colorSample = document.createElement('span');
        colorSample.style.display = 'inline-block';
        colorSample.style.width = '20px';
        colorSample.style.height = '20px';
        colorSample.style.backgroundColor = selectedColorInfo.color;
        colorSample.style.borderRadius = '50%';
        colorSample.style.marginLeft = '8px';
        colorSample.style.verticalAlign = 'middle';
        colorSample.style.border = '2px solid #dee2e6';
        
        selectedColorDisplay.appendChild(colorSample);
    }
}
```

### Step 5: カートボタンの条件を更新
```javascript
// カートに追加ボタンの状態を更新（サイズと色の両方チェック）
function updateAddToCartButton() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    if (selectedSize && selectedColor) {
        // 両方選択されている場合
        addToCartBtn.disabled = false;
        addToCartBtn.textContent = 'カートに追加';
        addToCartBtn.className = 'btn btn-primary btn-lg w-100';
    } else {
        // どちらか未選択の場合
        addToCartBtn.disabled = true;
        
        if (!selectedSize && !selectedColor) {
            addToCartBtn.textContent = 'サイズとカラーを選択してください';
        } else if (!selectedSize) {
            addToCartBtn.textContent = 'サイズを選択してください';
        } else if (!selectedColor) {
            addToCartBtn.textContent = 'カラーを選択してください';
        }
        
        addToCartBtn.className = 'btn btn-secondary btn-lg w-100';
    }
}

// カートに追加のクリック処理を更新
function setupAddToCartHandler() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    addToCartBtn.addEventListener('click', function() {
        if (selectedSize && selectedColor) {
            const selectedSizeInfo = productData.sizes.find(size => size.value === selectedSize);
            const selectedColorInfo = productData.colors.find(color => color.value === selectedColor);
            
            alert(`${productData.name}\nサイズ: ${selectedSizeInfo.description}\nカラー: ${selectedColorInfo.label}\nをカートに追加しました！`);
            
            console.log('カートに追加:', {
                product: productData.name,
                size: selectedSize,
                color: selectedColor,
                price: productData.price
            });
        } else {
            let message = 'まず選択してください:\n';
            if (!selectedSize) message += '• サイズ\n';
            if (!selectedColor) message += '• カラー\n';
            alert(message);
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
    generateSizeSelection();
    generateColorSelection();      // 色選択UI生成
    updateImageDisplay();
    updateAddToCartButton();       // 初期状態でボタンを無効化
    
    setupThumbnailClickHandler();
    setupSizeSelectionHandler();
    setupColorSelectionHandler(); // 色選択処理設定
    setupAddToCartHandler();
    
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
// productDataに colors配列を追加
// selectedColor 変数を追加

// 色選択UIを生成する関数
function generateColorSelection() {
    const colorSelectionContainer = document.getElementById('color-selection');
    colorSelectionContainer.innerHTML = '';
    
    productData.colors.forEach((color, index) => {
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'color';
        radioInput.value = color.value;
        radioInput.id = `color-${color.value}`;
        radioInput.className = 'color-radio';
        
        const colorCircle = document.createElement('div');
        colorCircle.className = 'color-option';
        colorCircle.style.backgroundColor = color.color;
        colorCircle.title = color.description;
        colorCircle.setAttribute('data-color', color.value);
        
        if (color.value === 'white') {
            colorCircle.style.border = '3px solid #dee2e6';
        }
        
        colorSelectionContainer.appendChild(radioInput);
        colorSelectionContainer.appendChild(colorCircle);
    });
    
    console.log('色選択UIを生成しました');
}

function setupColorSelectionHandler() {
    const colorSelectionContainer = document.getElementById('color-selection');
    
    colorSelectionContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('color-option')) {
            const colorValue = event.target.getAttribute('data-color');
            const associatedRadio = document.getElementById(`color-${colorValue}`);
            
            if (associatedRadio) {
                associatedRadio.checked = true;
                selectedColor = colorValue;
                updateColorDisplay();
                updateAddToCartButton();
                console.log('選択された色:', selectedColor);
            }
        }
    });
    
    console.log('色選択ハンドラーを設定しました');
}

function updateColorDisplay() {
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    if (selectedColor) {
        const selectedColorOption = document.querySelector(`[data-color="${selectedColor}"]`);
        if (selectedColorOption) {
            selectedColorOption.classList.add('selected');
        }
        
        const selectedColorDisplay = document.getElementById('selected-color-display');
        const selectedColorInfo = productData.colors.find(color => color.value === selectedColor);
        selectedColorDisplay.innerHTML = `選択中: ${selectedColorInfo.label}`;
        selectedColorDisplay.className = 'mt-2 text-success';
        
        const colorSample = document.createElement('span');
        colorSample.style.display = 'inline-block';
        colorSample.style.width = '20px';
        colorSample.style.height = '20px';
        colorSample.style.backgroundColor = selectedColorInfo.color;
        colorSample.style.borderRadius = '50%';
        colorSample.style.marginLeft = '8px';
        colorSample.style.verticalAlign = 'middle';
        colorSample.style.border = '2px solid #dee2e6';
        
        selectedColorDisplay.appendChild(colorSample);
    }
}

// updateAddToCartButton() と setupAddToCartHandler() を上記のように更新
```

## ⚠️ よくあるエラーと対処法

### エラー1: 色の円がクリックできない
**原因**: CSSのpointer-eventsが無効になっているか、イベントハンドラーが正しく設定されていない
```javascript
// 色選択要素にcursorが設定されているか確認
.color-option {
    cursor: pointer; /* これが必要 */
}

// イベントハンドラーでのデバッグ
colorSelectionContainer.addEventListener('click', function(event) {
    console.log('クリックされた要素:', event.target);
    console.log('クラス名:', event.target.className);
});
```

### エラー2: 選択状態の視覚効果が表示されない
**原因**: CSSの擬似要素（::after）や変形（transform）が正しく適用されていない
```css
/* 選択状態のチェックマークが表示されない場合 */
.color-option.selected::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    font-size: 18px;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    z-index: 1; /* 前面に表示 */
}
```

### エラー3: 白色が見えない
**原因**: 背景と同化して見えない
```javascript
// 白色の場合は特別な境界線を設定
if (color.value === 'white') {
    colorCircle.style.border = '3px solid #dee2e6';
    colorCircle.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'; // より目立つ影
}
```

## ✅ 完成チェックリスト
- [ ] 6色のカラーパレットが円形で表示される
- [ ] 白色には薄いグレーの境界線がある
- [ ] 色をクリックすると青い境界線と白いチェックマークが表示される
- [ ] 選択中の色名が「選択中: レッド」のように表示される
- [ ] 色名の横に小さな色サンプルが表示される
- [ ] サイズと色の両方を選択すると「カートに追加」ボタンが有効になる
- [ ] どちらか未選択の場合、適切なメッセージが表示される
- [ ] 「カートに追加」でサイズと色の両方の情報がアラートに表示される

### 動作確認方法
1. ページを開く → サイズと色の両方が未選択で「サイズとカラーを選択してください」
2. Mサイズを選択 → 「カラーを選択してください」に変化
3. 赤色を選択 → 「カートに追加」ボタンが青色で有効になる
4. 「カートに追加」クリック → サイズと色の詳細が表示されたアラート
5. 別の色に変更 → 前の色の選択が解除され、新しい色が選択状態に

## 🔗 次回予告
次回「23.6-stock-display」では、在庫表示機能を実装します。**条件分岐による表示制御**を学び、サイズと色の組み合わせに応じた在庫数の表示と、在庫切れ時の購入ボタン無効化機能を追加します。これまで学んだ全ての技術を統合した、実用的な商品詳細ページが完成します！