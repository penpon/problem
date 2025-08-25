# 23.6-stock-display: 在庫表示基礎

## 🎯 今回学ぶたった1つの新しいこと
**条件分岐による表示制御** - サイズと色の組み合わせに応じた在庫数チェックと、在庫状況に基づく画面表示の動的制御

## 📖 前回までの復習
前回（23.5）では、色選択機能を実装しました。カラーパレット形式のUIで視覚的に美しい色選択を実現し、サイズと色の両方が選択された場合にのみカートボタンを有効にする制御を学びました。

## 🚀 今回作るもの
前回の機能に加えて、在庫表示機能を追加します：
- サイズと色の組み合わせごとの在庫数表示
- 在庫切れ時の購入ボタン無効化
- 在庫少量時の警告表示
- 在庫状況に応じたメッセージの動的変更

## 💡 なぜこれが重要？
実際のECサイトでは、商品オプションの組み合わせごとに在庫が管理されています。条件分岐を使って在庫状況を適切に表示することで、ユーザーは購入可能かどうかを事前に判断でき、サイトの信頼性が向上します。

## 📝 ステップバイステップ解説

### Step 1: 在庫データ構造を追加
```javascript
// 商品データに在庫情報を追加
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
    colors: [
        { value: 'red', label: 'レッド', color: '#DC3545', description: '情熱的な赤' },
        { value: 'blue', label: 'ブルー', color: '#0D6EFD', description: '爽やかな青' },
        { value: 'green', label: 'グリーン', color: '#198754', description: '落ち着いた緑' },
        { value: 'black', label: 'ブラック', color: '#212529', description: '定番の黒' },
        { value: 'white', label: 'ホワイト', color: '#F8F9FA', description: '清潔感のある白' },
        { value: 'gray', label: 'グレー', color: '#6C757D', description: 'シックなグレー' }
    ],
    // 新しく追加：在庫情報（サイズ-色の組み合わせごと）
    stock: {
        'S-red': 5,      'S-blue': 8,     'S-green': 3,    'S-black': 12,   'S-white': 7,    'S-gray': 0,
        'M-red': 15,     'M-blue': 20,    'M-green': 18,   'M-black': 25,   'M-white': 22,   'M-gray': 8,
        'L-red': 12,     'L-blue': 16,    'L-green': 0,    'L-black': 30,   'L-white': 18,   'L-gray': 5,
        'XL-red': 3,     'XL-blue': 6,    'XL-green': 4,   'XL-black': 15,  'XL-white': 12,  'XL-gray': 1
    }
};

let currentImageIndex = 0;
let selectedSize = null;
let selectedColor = null;
```

### Step 2: HTMLに在庫表示エリアを追加
```html
<!-- 既存のHTMLに以下のセクションを追加 -->
<div class="col-md-6">
    <h1 id="product-name" class="card-title">商品名が表示されます</h1>
    <p id="product-price" class="h4 text-primary mb-3">価格が表示されます</p>
    <p id="product-description" class="card-text mb-4">商品説明が表示されます</p>
    
    <div class="mb-4">
        <h5 class="mb-3">サイズを選択してください</h5>
        <div id="size-selection">
            <!-- サイズオプション -->
        </div>
        <div id="selected-size-display" class="mt-2 text-muted">
            サイズが選択されていません
        </div>
    </div>
    
    <div class="mb-4">
        <h5 class="mb-3">カラーを選択してください</h5>
        <div id="color-selection" class="color-selection-container">
            <!-- 色オプション -->
        </div>
        <div id="selected-color-display" class="mt-2 text-muted">
            カラーが選択されていません
        </div>
    </div>
    
    <!-- 新しく追加：在庫表示セクション -->
    <div class="mb-4" id="stock-section" style="display: none;">
        <div class="d-flex align-items-center">
            <h6 class="mb-0 me-3">在庫状況:</h6>
            <div id="stock-display" class="stock-info">
                <!-- 在庫情報がここに表示される -->
            </div>
        </div>
    </div>
    
    <button class="btn btn-primary btn-lg w-100" id="add-to-cart-btn">
        カートに追加
    </button>
</div>
```

### Step 3: CSSに在庫表示スタイルを追加
```css
/* 既存のCSSに以下を追加 */
.stock-info {
    font-weight: 500;
}
.stock-available {
    color: #198754;
}
.stock-low {
    color: #FD7E14;
}
.stock-out {
    color: #DC3545;
}
.stock-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 600;
}
.stock-badge.available {
    background-color: #D1E7DD;
    color: #0F5132;
}
.stock-badge.low {
    background-color: #FFF3CD;
    color: #664D03;
}
.stock-badge.out {
    background-color: #F8D7DA;
    color: #721C24;
}
```

### Step 4: 在庫チェック機能を実装
```javascript
// 在庫情報を取得する関数
function getStockInfo(size, color) {
    if (!size || !color) {
        return null;
    }
    
    const stockKey = `${size}-${color}`;
    const quantity = productData.stock[stockKey];
    
    // 在庫数が定義されていない場合は0とする
    return quantity !== undefined ? quantity : 0;
}

// 在庫状況を分類する関数
function getStockStatus(quantity) {
    if (quantity <= 0) {
        return 'out';           // 在庫切れ
    } else if (quantity <= 5) {
        return 'low';           // 在庫少量
    } else {
        return 'available';     // 在庫充分
    }
}

// 在庫表示を更新する関数
function updateStockDisplay() {
    const stockSection = document.getElementById('stock-section');
    const stockDisplay = document.getElementById('stock-display');
    
    if (selectedSize && selectedColor) {
        // サイズと色が両方選択されている場合、在庫情報を表示
        const stockQuantity = getStockInfo(selectedSize, selectedColor);
        const stockStatus = getStockStatus(stockQuantity);
        
        // 在庫セクションを表示
        stockSection.style.display = 'block';
        
        // 在庫情報のHTML生成
        let stockHTML = '';
        let badgeClass = '';
        let message = '';
        
        switch (stockStatus) {
            case 'out':
                badgeClass = 'out';
                message = '在庫切れ';
                stockHTML = `<span class="stock-badge ${badgeClass}">${message}</span>`;
                break;
                
            case 'low':
                badgeClass = 'low';
                message = `残り${stockQuantity}個`;
                stockHTML = `<span class="stock-badge ${badgeClass}">${message}</span>
                            <small class="text-muted ms-2">お早めにどうぞ</small>`;
                break;
                
            case 'available':
                badgeClass = 'available';
                message = `在庫充分 (${stockQuantity}個)`;
                stockHTML = `<span class="stock-badge ${badgeClass}">${message}</span>`;
                break;
        }
        
        stockDisplay.innerHTML = stockHTML;
        
        console.log(`在庫チェック: ${selectedSize}-${selectedColor} = ${stockQuantity}個 (${stockStatus})`);
    } else {
        // どちらか未選択の場合は在庫セクションを非表示
        stockSection.style.display = 'none';
    }
}
```

### Step 5: カートボタンの制御を在庫対応に更新
```javascript
// カートに追加ボタンの状態を更新（在庫チェック追加）
function updateAddToCartButton() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    if (!selectedSize || !selectedColor) {
        // サイズまたは色が未選択
        addToCartBtn.disabled = true;
        
        if (!selectedSize && !selectedColor) {
            addToCartBtn.textContent = 'サイズとカラーを選択してください';
        } else if (!selectedSize) {
            addToCartBtn.textContent = 'サイズを選択してください';
        } else if (!selectedColor) {
            addToCartBtn.textContent = 'カラーを選択してください';
        }
        
        addToCartBtn.className = 'btn btn-secondary btn-lg w-100';
        return;
    }
    
    // サイズと色が両方選択されている場合、在庫をチェック
    const stockQuantity = getStockInfo(selectedSize, selectedColor);
    const stockStatus = getStockStatus(stockQuantity);
    
    if (stockStatus === 'out') {
        // 在庫切れの場合
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = '在庫切れ - 購入できません';
        addToCartBtn.className = 'btn btn-danger btn-lg w-100';
    } else {
        // 在庫がある場合
        addToCartBtn.disabled = false;
        
        if (stockStatus === 'low') {
            addToCartBtn.textContent = 'カートに追加（残り僅か）';
            addToCartBtn.className = 'btn btn-warning btn-lg w-100';
        } else {
            addToCartBtn.textContent = 'カートに追加';
            addToCartBtn.className = 'btn btn-primary btn-lg w-100';
        }
    }
}
```

### Step 6: サイズ・色選択時の処理を更新
```javascript
// サイズ選択後に在庫も更新するように既存の関数を修正
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
    
    // 在庫表示も更新
    updateStockDisplay();
}

// 色選択後に在庫も更新するように既存の関数を修正
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
    
    // 在庫表示も更新
    updateStockDisplay();
}
```

### Step 7: カート追加処理に在庫減少を追加（シミュレーション）
```javascript
// カートに追加のクリック処理を更新
function setupAddToCartHandler() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    addToCartBtn.addEventListener('click', function() {
        if (selectedSize && selectedColor) {
            const stockQuantity = getStockInfo(selectedSize, selectedColor);
            
            if (stockQuantity > 0) {
                const selectedSizeInfo = productData.sizes.find(size => size.value === selectedSize);
                const selectedColorInfo = productData.colors.find(color => color.value === selectedColor);
                
                // 在庫を1減らす（実際のECサイトではサーバーで処理）
                const stockKey = `${selectedSize}-${selectedColor}`;
                productData.stock[stockKey]--;
                
                alert(`${productData.name}\nサイズ: ${selectedSizeInfo.description}\nカラー: ${selectedColorInfo.label}\nをカートに追加しました！\n\n残り在庫: ${productData.stock[stockKey]}個`);
                
                // 在庫表示を更新
                updateStockDisplay();
                updateAddToCartButton();
                
                console.log('カートに追加 & 在庫更新:', {
                    product: productData.name,
                    size: selectedSize,
                    color: selectedColor,
                    price: productData.price,
                    remainingStock: productData.stock[stockKey]
                });
            } else {
                alert('申し訳ございません。この商品は在庫切れです。');
            }
        } else {
            let message = 'まず選択してください:\n';
            if (!selectedSize) message += '• サイズ\n';
            if (!selectedColor) message += '• カラー\n';
            alert(message);
        }
    });
    
    console.log('カート追加ハンドラー（在庫対応）を設定しました');
}
```

## ⚠️ よくあるエラーと対処法

### エラー1: 在庫情報が表示されない
**原因**: stockデータのキー形式が間違っているか、存在しないキーを参照している
```javascript
// デバッグ用のログを追加
function getStockInfo(size, color) {
    const stockKey = `${size}-${color}`;
    console.log('在庫キー:', stockKey);
    console.log('在庫データ:', productData.stock);
    console.log('該当在庫:', productData.stock[stockKey]);
    
    const quantity = productData.stock[stockKey];
    return quantity !== undefined ? quantity : 0;
}
```

### エラー2: ボタンの状態が正しく更新されない
**原因**: updateAddToCartButton()が適切なタイミングで呼ばれていない
```javascript
// 各選択後に必ずボタン状態を更新することを確認
function setupSizeSelectionHandler() {
    // ... 既存のコード
    
    selectedSize = event.target.value;
    updateSizeDisplay();
    updateAddToCartButton(); // これを忘れずに
}

function setupColorSelectionHandler() {
    // ... 既存のコード
    
    selectedColor = colorValue;
    updateColorDisplay();
    updateAddToCartButton(); // これを忘れずに
}
```

### エラー3: 在庫減少後の表示が更新されない
**原因**: 在庫変更後にupdateStockDisplay()を呼んでいない
```javascript
// カート追加後に必ず在庫表示を更新
addToCartBtn.addEventListener('click', function() {
    if (selectedSize && selectedColor && stockQuantity > 0) {
        // 在庫を減らす
        productData.stock[stockKey]--;
        
        // 表示を更新
        updateStockDisplay();
        updateAddToCartButton();
    }
});
```

## ✅ 完成チェックリスト
- [ ] サイズと色を両方選択すると在庫情報が表示される
- [ ] 在庫充分（6個以上）の場合、緑色のバッジで「在庫充分」と表示
- [ ] 在庫少量（1-5個）の場合、オレンジ色のバッジで「残り○個」と表示
- [ ] 在庫切れ（0個）の場合、赤色のバッジで「在庫切れ」と表示
- [ ] 在庫切れ時は「カートに追加」ボタンが赤色で無効化される
- [ ] 在庫少量時は「カートに追加」ボタンが黄色で「残り僅か」表示
- [ ] 「カートに追加」すると在庫が1減る
- [ ] 在庫が0になると自動でボタンが無効化される

### 動作確認方法
1. S + グレー（在庫0）を選択 → 「在庫切れ」表示、ボタン無効化確認
2. XL + グレー（在庫1）を選択 → 「残り1個」表示、黄色ボタン確認
3. M + ブルー（在庫20）を選択 → 「在庫充分」表示、青いボタン確認
4. 「カートに追加」を5回クリック → 在庫が15に減ることを確認
5. L + グリーン（在庫0）を試してエラーハンドリング確認

## 🔗 次回予告
23系列の学習が完了しました！次回は「24-user-authentication」でユーザー認証システムの構築を学習します。会員登録、ログイン機能を実装し、より本格的なECサイト機能に進みます。今回までに学んだ商品詳細ページの技術を活用して、さらに高度な機能開発にチャレンジしましょう！