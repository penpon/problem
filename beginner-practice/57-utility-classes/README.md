# 20.7 スマホとPCで表示を変えよう

## 🎯 学習目標

**56番のカードの続きで、スマホでは1つずつ、PCでは3つ並べる方法を学ぼう**

- `col-12 col-md-4`を使った基本的なレスポンシブ対応
- スマホとPCで異なる表示を実現する
- ブラウザの幅を変えて確認する方法を覚える

## 📝 学習内容

### 今回作るもの

**レスポンシブな3商品カード**
- スマホ（小さい画面）：1つずつ縦に並ぶ
- PC（大きい画面）：3つ横に並ぶ
- 56番で学んだ3つのカードを使用

### 今回学ぶこと

- `col-12 col-md-4`の意味と使い方
- スマホとPCでの表示の違い
- ブラウザの幅を変えて確認する方法

## 🔍 詳細解説

### レスポンシブの仕組み

**col-12 col-md-4の意味**
- `col-12`: スマホなど小さい画面では12カラム分（全幅）を使用
- `col-md-4`: 中サイズ以上（PC）の画面では4カラム分を使用
- 結果：スマホでは1つずつ、PCでは3つ並ぶ

### レスポンシブ対応した3つのカード

**HTML（56番のコードを少し変更）**
```html
<h2>スマホとPCで表示が変わるカード</h2>
<p>ブラウザの幅を変えて確認してみましょう</p>

<div class="alert alert-warning" role="alert">
    ブラウザの幅を小さくしたり大きくしたりしてみてね！
</div>

<div class="row">
    <!-- 1番目のカード -->
    <div class="col-12 col-md-4 mb-3">
        <div class="card">
            <img src="https://via.placeholder.com/300x200/ff6b6b/white?text=商品1" class="card-img-top" alt="商品1">
            <div class="card-body">
                <h5 class="card-title">商品1</h5>
                <p class="card-text">美味しいリンゴです。</p>
                <a href="#" class="btn btn-danger">購入する</a>
            </div>
        </div>
    </div>
    
    <!-- 2番目のカード -->
    <div class="col-12 col-md-4 mb-3">
        <div class="card">
            <img src="https://via.placeholder.com/300x200/4ecdc4/white?text=商品2" class="card-img-top" alt="商品2">
            <div class="card-body">
                <h5 class="card-title">商品2</h5>
                <p class="card-text">新鮮なバナナです。</p>
                <a href="#" class="btn btn-warning">購入する</a>
            </div>
        </div>
    </div>
    
    <!-- 3番目のカード -->
    <div class="col-12 col-md-4 mb-3">
        <div class="card">
            <img src="https://via.placeholder.com/300x200/95e1d3/white?text=商品3" class="card-img-top" alt="商品3">
            <div class="card-body">
                <h5 class="card-title">商品3</h5>
                <p class="card-text">甘いオレンジです。</p>
                <a href="#" class="btn btn-success">購入する</a>
            </div>
        </div>
    </div>
</div>

<!-- 確認のための説明 -->
<h3 class="mt-4">確認方法</h3>
<div class="alert alert-info" role="alert">
    <strong>PCの場合：</strong>ブラウザの横幅をドラッグして小さくしてみてください<br>
    <strong>スマホの場合：</strong>画面を縦向きと横向きで確認してみてください
</div>
```

### 仕組みの説明

1. **col-12**: スマホでは12カラム分（全幅）なので1つずつ縦に並ぶ
2. **col-md-4**: PCでは4カラム分なので3つ横に並ぶ（4×3=12）
3. **mb-3**: カード間に余白を追加（特にスマホで見やすくなる）
4. **自動調整**: 画面サイズによって自動的に表示が切り替わる

## 💻 実習の進め方

1. **56番をコピー**: 前回の3つのカードをベースにする
2. **col-4をcol-12 col-md-4に変更**: レスポンシブ対応にする
3. **mb-3を追加**: カード間の余白を調整
4. **ブラウザで確認**: 幅を変えて表示の変化を確認

## 🎉 完成時の達成感

- ✅ **レスポンシブ**の基本が理解できた
- ✅ **スマホとPCの違い**を実感できた
- ✅ **1つのコードで2つの表示**を実現できた
- ✅ **次のステップ**（もっと実用的なカード）への準備ができた