# 23.1-product-info-display: 商品情報表示

## 🎯 今回学ぶたった1つの新しいこと
**オブジェクト構造でのデータ管理** - 商品の名前、価格、説明をひとつのオブジェクトにまとめて管理する方法

## 📖 前回までの復習
前回（23-product-detail-page）では、商品詳細ページの全体像を理解しました。複数の機能が組み合わされた複雑なページでしたが、実際の実装では小さな機能を一つずつ積み重ねていきます。

## 🚀 今回作るもの
シンプルな商品情報表示画面を作成します：
- 商品名の表示
- 価格の表示
- 商品説明の表示
- 全ての情報がJavaScriptオブジェクトから自動的に表示される仕組み

## 💡 なぜこれが重要？
実際のECサイトでは、商品データはデータベースから取得します。そのデータは「オブジェクト」という形式で提供されることが多いため、オブジェクトの扱い方をマスターすることで、実際の開発により近い体験ができます。

## 📝 ステップバイステップ解説

### Step 1: HTMLの基本構造を作る
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>商品情報表示</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <!-- 商品情報が表示される場所 -->
                        <h1 id="product-name" class="card-title">商品名が表示されます</h1>
                        <p id="product-price" class="h4 text-primary mb-3">価格が表示されます</p>
                        <p id="product-description" class="card-text">商品説明が表示されます</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
```

### Step 2: 商品データオブジェクトを作成
```javascript
// 商品データをオブジェクトとして定義
const productData = {
    name: "プレミアム コットンTシャツ",
    price: 2980,
    description: "上質なコットン100%を使用した、着心地の良いTシャツです。シンプルなデザインでどんなスタイルにも合わせやすく、普段使いからお出かけまで幅広くお使いいただけます。"
};

// ページが読み込まれたときに商品情報を表示
document.addEventListener('DOMContentLoaded', function() {
    displayProductInfo();
});
```

### Step 3: 表示関数を作成
```javascript
// 商品情報をHTML要素に表示する関数
function displayProductInfo() {
    // IDを指定してHTML要素を取得
    const nameElement = document.getElementById('product-name');
    const priceElement = document.getElementById('product-price');
    const descriptionElement = document.getElementById('product-description');
    
    // オブジェクトのプロパティを使って内容を更新
    nameElement.textContent = productData.name;
    priceElement.textContent = '¥' + productData.price.toLocaleString();
    descriptionElement.textContent = productData.description;
}
```

### Step 4: オブジェクトの理解を深める
```javascript
// なぜオブジェクトを使うのか？
// ❌ 悪い例: 別々の変数で管理
const productName = "プレミアム コットンTシャツ";
const productPrice = 2980;
const productDescription = "上質なコットン100%を使用した...";

// ✅ 良い例: オブジェクトでまとめて管理
const productData = {
    name: "プレミアム コットンTシャツ",
    price: 2980,
    description: "上質なコットン100%を使用した...",
    // 将来的に他の情報も追加しやすい
    category: "Tシャツ",
    brand: "ファッションブランド"
};

// オブジェクトのプロパティにアクセスする方法
console.log(productData.name);        // ドット記法
console.log(productData['price']);    // ブラケット記法
```

### 完成したscript.js全体
```javascript
// 商品データオブジェクト
const productData = {
    name: "プレミアム コットンTシャツ",
    price: 2980,
    description: "上質なコットン100%を使用した、着心地の良いTシャツです。シンプルなデザインでどんなスタイルにも合わせやすく、普段使いからお出かけまで幅広くお使いいただけます。",
    category: "Tシャツ",
    brand: "ファッションブランド"
};

// 商品情報を表示する関数
function displayProductInfo() {
    const nameElement = document.getElementById('product-name');
    const priceElement = document.getElementById('product-price');
    const descriptionElement = document.getElementById('product-description');
    
    nameElement.textContent = productData.name;
    priceElement.textContent = '¥' + productData.price.toLocaleString();
    descriptionElement.textContent = productData.description;
    
    // コンソールにも情報を出力（開発者ツールで確認可能）
    console.log('商品情報を表示しました:', productData);
}

// ページ読み込み完了時に実行
document.addEventListener('DOMContentLoaded', function() {
    displayProductInfo();
});
```

## ⚠️ よくあるエラーと対処法

### エラー1: 「Cannot read property 'textContent' of null」
**原因**: HTMLの要素IDとJavaScriptのgetElementByIdの値が一致していない
```javascript
// ❌ 間違い
const nameElement = document.getElementById('product-title'); // HTMLには'product-name'がある

// ✅ 正しい
const nameElement = document.getElementById('product-name');
```

### エラー2: 価格に「NaN」と表示される
**原因**: priceプロパティが文字列になっている
```javascript
// ❌ 間違い
const productData = {
    price: "2980"  // 文字列
};

// ✅ 正しい
const productData = {
    price: 2980    // 数値
};
```

### エラー3: 「productData is not defined」
**原因**: オブジェクトが関数内で定義されているか、スコープの問題
```javascript
// ❌ 間違い - 関数内で定義
function displayProductInfo() {
    const productData = { /* データ */ };
}
// 他の場所からproductDataにアクセスできない

// ✅ 正しい - グローバルスコープで定義
const productData = { /* データ */ };
```

## ✅ 完成チェックリスト
- [ ] ページを開くと商品名が表示される
- [ ] 価格が「¥2,980」のように適切にフォーマットされて表示される
- [ ] 商品説明が全文表示される
- [ ] 開発者ツール（F12）のコンソールに商品情報が出力される
- [ ] オブジェクトのプロパティを変更すると、表示も自動的に変わる

### 動作確認方法
1. ブラウザでindex.htmlを開く
2. 開発者ツール（F12）でコンソールを開く
3. script.jsのproductDataの値を変更してページをリロード
4. 表示内容が変更されることを確認

## 🔗 次回予告
次回「23.2-image-gallery-basic」では、商品の画像を配列で管理し、「次へ」「前へ」ボタンで画像を切り替える**配列インデックス操作**を学びます。今回学んだオブジェクトに画像配列を追加して、より実用的な商品表示を作成していきます！