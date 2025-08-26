# 20.8 実用的な商品カードを作ろう

## 🎯 学習目標

**57番のカードの続きで、価格や評価などの実用的な情報を追加しよう**

- 商品価格やバッジ（セールなど）を表示する
- 星評価やレビュー数を追加する
- より実際のECサイトらしいカードデザインを作る

## 📝 学習内容

### 今回作るもの

**本格的な商品カード**
- 57番のレスポンシブカードをベースにする
- 価格、セールバッジ、星評価を追加
- より実用的で本格的な見た目にする

### 今回学ぶこと

- `badge`を使ったセール表示
- 価格表示の装飾方法
- 星評価の表現方法（文字で）

## 🔍 詳細解説

### 実用的な商品カードの例

**HTML（57番のコードを発展）**
```html
<h2>実用的な商品カード</h2>
<p>実際のネットショップのようなカードを作ってみましょう</p>

<div class="alert alert-success" role="alert">
    価格やセールバッジ、星評価が追加されました！
</div>

<div class="row">
    <!-- 1番目のカード（セール中） -->
    <div class="col-12 col-md-4 mb-3">
        <div class="card">
            <div class="position-relative">
                <img src="https://via.placeholder.com/300x200/ff6b6b/white?text=商品1" class="card-img-top" alt="商品1">
                <span class="badge bg-danger position-absolute top-0 start-0 m-2">セール中</span>
            </div>
            <div class="card-body">
                <h5 class="card-title">美味しいリンゴ</h5>
                <p class="card-text">新鮮で甘いリンゴです。農園直送。</p>
                
                <!-- 星評価 -->
                <div class="mb-2">
                    <span class="text-warning">★★★★☆</span>
                    <small class="text-muted">(128件のレビュー)</small>
                </div>
                
                <!-- 価格 -->
                <div class="mb-3">
                    <span class="text-muted text-decoration-line-through">¥1,200</span>
                    <span class="h5 text-danger ms-2">¥800</span>
                </div>
                
                <a href="#" class="btn btn-danger">カートに追加</a>
            </div>
        </div>
    </div>
    
    <!-- 2番目のカード（通常価格） -->
    <div class="col-12 col-md-4 mb-3">
        <div class="card">
            <div class="position-relative">
                <img src="https://via.placeholder.com/300x200/4ecdc4/white?text=商品2" class="card-img-top" alt="商品2">
                <span class="badge bg-info position-absolute top-0 start-0 m-2">人気</span>
            </div>
            <div class="card-body">
                <h5 class="card-title">新鮮なバナナ</h5>
                <p class="card-text">栄養満点のバナナです。朝食にぴったり。</p>
                
                <!-- 星評価 -->
                <div class="mb-2">
                    <span class="text-warning">★★★★★</span>
                    <small class="text-muted">(89件のレビュー)</small>
                </div>
                
                <!-- 価格 -->
                <div class="mb-3">
                    <span class="h5 text-dark">¥600</span>
                </div>
                
                <a href="#" class="btn btn-warning">カートに追加</a>
            </div>
        </div>
    </div>
    
    <!-- 3番目のカード（新商品） -->
    <div class="col-12 col-md-4 mb-3">
        <div class="card">
            <div class="position-relative">
                <img src="https://via.placeholder.com/300x200/95e1d3/white?text=商品3" class="card-img-top" alt="商品3">
                <span class="badge bg-success position-absolute top-0 start-0 m-2">新商品</span>
            </div>
            <div class="card-body">
                <h5 class="card-title">甘いオレンジ</h5>
                <p class="card-text">ビタミンC豊富なオレンジです。</p>
                
                <!-- 星評価 -->
                <div class="mb-2">
                    <span class="text-warning">★★★☆☆</span>
                    <small class="text-muted">(12件のレビュー)</small>
                </div>
                
                <!-- 価格 -->
                <div class="mb-3">
                    <span class="h5 text-dark">¥900</span>
                </div>
                
                <a href="#" class="btn btn-success">カートに追加</a>
            </div>
        </div>
    </div>
</div>

<!-- 新しく学んだ要素の説明 -->
<h3 class="mt-4">新しく使った部品</h3>
<div class="row">
    <div class="col-md-6">
        <h5>バッジ（ラベル）</h5>
        <span class="badge bg-danger">セール中</span>
        <span class="badge bg-info">人気</span>
        <span class="badge bg-success">新商品</span>
    </div>
    <div class="col-md-6">
        <h5>星評価の例</h5>
        <div class="text-warning">★★★★★ 満点</div>
        <div class="text-warning">★★★★☆ 4つ星</div>
        <div class="text-warning">★★★☆☆ 3つ星</div>
    </div>
</div>
```

### 新しく学んだ要素の説明

1. **badge**: `bg-danger`、`bg-info`、`bg-success`でカラフルなラベル
2. **position-relative/absolute**: バッジをカード画像の上に重ねる
3. **text-decoration-line-through**: 打ち消し線（元の価格）
4. **text-warning**: 星の色を黄色にする
5. **h5**: 価格を大きく表示する

## 💻 実習の進め方

1. **57番をベースにする**: レスポンシブカードをコピーする
2. **バッジを追加**: 画像の上にセールラベルなどを配置
3. **星評価を追加**: ★マークとレビュー数を表示
4. **価格を追加**: 通常価格とセール価格を表示
5. **内容をカスタマイズ**: 実際の商品情報に変更

## 🎉 完成時の達成感

- ✅ **本格的な商品カード**が完成した
- ✅ **バッジや星評価**を使えるようになった
- ✅ **実用的なECサイト風**の見た目になった
- ✅ **次のステップ**（より多くのカードを並べる）への準備ができた