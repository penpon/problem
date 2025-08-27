# 20.9 6つの商品を並べたギャラリーを作ろう

## 🎯 学習目標

**58番のカードの続きで、6つの商品カードを並べた本格的なギャラリーを作ろう**

- 58番で学んだ実用的なカードを6つ並べる
- 2行3列のレイアウトで商品ギャラリーを作る
- より多くの商品を見やすく表示する方法を学ぶ

## 📝 学習内容

### 今回作るもの

**6商品ギャラリー**
- 58番で作った実用的なカードを6つ使用
- スマホでは1列、PCでは3列で表示
- 実際のECサイトのような商品一覧ページ

### 今回学ぶこと

- 複数の商品カードをきれいに並べる方法
- タイトルやナビゲーションを追加する
- より本格的なECサイトのような見た目にする

## 🔍 詳細解説

### 6商品ギャラリーの例

**HTML（58番のカードを6つ並べる）**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>フルーツショップ - 商品一覧</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <!-- ナビゲーション -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="#">🍎 フルーツショップ</a>
        </div>
    </nav>

    <div class="container py-4">
        <!-- ページタイトル -->
        <div class="text-center mb-5">
            <h1>新鮮なフルーツをお届け</h1>
            <p class="text-muted">農園直送の美味しいフルーツをお楽しみください</p>
        </div>

        <!-- 商品ギャラリー -->
        <div class="row">
            <!-- 商品1: セール中のリンゴ -->
            <div class="col-12 col-md-4 mb-4">
                <div class="card h-100">
                    <div class="position-relative">
                        <img src="https://via.placeholder.com/300x200/ff6b6b/white?text=リンゴ" class="card-img-top" alt="リンゴ">
                        <span class="badge bg-danger position-absolute top-0 start-0 m-2">セール中</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">美味しいリンゴ</h5>
                        <p class="card-text">新鮮で甘いリンゴです。農園直送。</p>
                        <div class="mb-2">
                            <span class="text-warning">★★★★☆</span>
                            <small class="text-muted">(128件)</small>
                        </div>
                        <div class="mb-3">
                            <span class="text-muted text-decoration-line-through">¥1,200</span>
                            <span class="h5 text-danger ms-2">¥800</span>
                        </div>
                        <a href="#" class="btn btn-danger w-100">カートに追加</a>
                    </div>
                </div>
            </div>

            <!-- 商品2: 人気のバナナ -->
            <div class="col-12 col-md-4 mb-4">
                <div class="card h-100">
                    <div class="position-relative">
                        <img src="https://via.placeholder.com/300x200/ffd93d/white?text=バナナ" class="card-img-top" alt="バナナ">
                        <span class="badge bg-info position-absolute top-0 start-0 m-2">人気</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">新鮮なバナナ</h5>
                        <p class="card-text">栄養満点のバナナです。朝食にぴったり。</p>
                        <div class="mb-2">
                            <span class="text-warning">★★★★★</span>
                            <small class="text-muted">(89件)</small>
                        </div>
                        <div class="mb-3">
                            <span class="h5 text-dark">¥600</span>
                        </div>
                        <a href="#" class="btn btn-warning w-100">カートに追加</a>
                    </div>
                </div>
            </div>

            <!-- 商品3: 新商品のオレンジ -->
            <div class="col-12 col-md-4 mb-4">
                <div class="card h-100">
                    <div class="position-relative">
                        <img src="https://via.placeholder.com/300x200/ff8c42/white?text=オレンジ" class="card-img-top" alt="オレンジ">
                        <span class="badge bg-success position-absolute top-0 start-0 m-2">新商品</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">甘いオレンジ</h5>
                        <p class="card-text">ビタミンC豊富なオレンジです。</p>
                        <div class="mb-2">
                            <span class="text-warning">★★★☆☆</span>
                            <small class="text-muted">(12件)</small>
                        </div>
                        <div class="mb-3">
                            <span class="h5 text-dark">¥900</span>
                        </div>
                        <a href="#" class="btn btn-success w-100">カートに追加</a>
                    </div>
                </div>
            </div>

            <!-- 商品4: グレープフルーツ -->
            <div class="col-12 col-md-4 mb-4">
                <div class="card h-100">
                    <div class="position-relative">
                        <img src="https://via.placeholder.com/300x200/ff6b9d/white?text=グレープフルーツ" class="card-img-top" alt="グレープフルーツ">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">さっぱりグレープフルーツ</h5>
                        <p class="card-text">酸味と甘みのバランスが絶妙です。</p>
                        <div class="mb-2">
                            <span class="text-warning">★★★★☆</span>
                            <small class="text-muted">(67件)</small>
                        </div>
                        <div class="mb-3">
                            <span class="h5 text-dark">¥750</span>
                        </div>
                        <a href="#" class="btn btn-primary w-100">カートに追加</a>
                    </div>
                </div>
            </div>

            <!-- 商品5: ぶどう -->
            <div class="col-12 col-md-4 mb-4">
                <div class="card h-100">
                    <div class="position-relative">
                        <img src="https://via.placeholder.com/300x200/9b59b6/white?text=ぶどう" class="card-img-top" alt="ぶどう">
                        <span class="badge bg-warning position-absolute top-0 start-0 m-2">期間限定</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">甘いぶどう</h5>
                        <p class="card-text">種無しで食べやすい高級ぶどうです。</p>
                        <div class="mb-2">
                            <span class="text-warning">★★★★★</span>
                            <small class="text-muted">(156件)</small>
                        </div>
                        <div class="mb-3">
                            <span class="h5 text-dark">¥1,500</span>
                        </div>
                        <a href="#" class="btn btn-secondary w-100">カートに追加</a>
                    </div>
                </div>
            </div>

            <!-- 商品6: いちご -->
            <div class="col-12 col-md-4 mb-4">
                <div class="card h-100">
                    <div class="position-relative">
                        <img src="https://via.placeholder.com/300x200/e74c3c/white?text=いちご" class="card-img-top" alt="いちご">
                        <span class="badge bg-danger position-absolute top-0 start-0 m-2">限定品</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">甘いいちご</h5>
                        <p class="card-text">春の味覚、甘くて美味しいいちごです。</p>
                        <div class="mb-2">
                            <span class="text-warning">★★★★★</span>
                            <small class="text-muted">(234件)</small>
                        </div>
                        <div class="mb-3">
                            <span class="h5 text-dark">¥1,200</span>
                        </div>
                        <a href="#" class="btn btn-info w-100">カートに追加</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- フッター情報 -->
        <div class="text-center mt-5">
            <p class="text-muted">🚚 全国送料無料 | 📞 お問い合わせ: 0120-123-456</p>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### 新しく学んだ要素の説明

1. **h-100**: カードの高さを揃える（重要！）
2. **w-100**: ボタンを全幅にする
3. **py-4**: 上下の余白を追加
4. **navbar**: シンプルなナビゲーション
5. **完整なHTMLページ**: head、bodyタグも含めた完全なページ

## 💻 実習の進め方

1. **58番をコピー**: 実用的なカードをベースにする
2. **6つに増やす**: 商品を6種類用意する
3. **ナビゲーションを追加**: ページ上部にお店の名前を表示
4. **高さを揃える**: h-100クラスでカードの高さを統一
5. **完全なページにする**: HTMLタグも含めた完整なページを作成

## 🎉 完成時の達成感

- ✅ **6商品のギャラリー**が完成した
- ✅ **本格的なECサイト**のような見た目になった
- ✅ **Bootstrapの基本**をマスターできた
- ✅ **次の学習**（もっと高度な機能）への準備ができた