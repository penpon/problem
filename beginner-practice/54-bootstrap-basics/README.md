# 20.4 Bootstrapカードを並べる

## 🎯 学習目標

**53番のカードの続きで、2つのカードを並べて表示してみよう**

- 2つの商品カードを横に並べる
- シンプルなグリッドレイアウトを学ぶ
- 簡単な商品ギャラリーの作り方を理解する

## 📝 学習内容

### 今回作るもの

**2商品ギャラリー**
- 左側に1番目の商品カード
- 右側に2番目の商品カード
- 横並びのシンプルなレイアウト

### 今回学ぶこと

- `row`と`col-6`を使った2カラムレイアウト
- 複数のカードを綺麗に並べる方法
- Bootstrapで簡単に作る商品ギャラリー

## 🔍 詳細解説

### コード例（2つのカードを並べる）

**HTML**
```html
<h2>2つの商品カード</h2>
<p>53番のカードを使って、2つ並べてみましょう</p>

<div class="row">
    <!-- 1番目のカード -->
    <div class="col-6">
        <div class="card">
            <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="商品1">
            <div class="card-body">
                <h5 class="card-title">商品1</h5>
                <p class="card-text">こちらは1番目の商品です。</p>
                <a href="#" class="btn btn-primary">詳細を見る</a>
            </div>
        </div>
    </div>
    
    <!-- 2番目のカード -->
    <div class="col-6">
        <div class="card">
            <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="商品2">
            <div class="card-body">
                <h5 class="card-title">商品2</h5>
                <p class="card-text">こちらは2番目の商品です。</p>
                <a href="#" class="btn btn-success">詳細を見る</a>
            </div>
        </div>
    </div>
</div>
```

### 仕組みの説明

1. **rowクラス**: カードを横に並べるための行
2. **col-6クラス**: 全体12カラムのうち6カラム（半分）を使用
3. **2個のcol-6**: 6 + 6 = 12でちょうど横一列に並ぶ
4. **簡単なギャラリー**: 2個の商品が綺麗に並んだ状態

## 💻 実習の進め方

1. **HTMLを書く**: 2つのカードをrowとcol-6で並べる
2. **ブラウザで確認**: カードが横に並んで表示されるかチェック
3. **内容を変更**: 実際の商品情報でカスタマイズ
4. **ボタンの色を変える**: btn-primaryやbtn-successを試す

## 🎉 完成時の達成感

- ✅ **2つのカード**が綺麗に並んだ
- ✅ **シンプルなギャラリー**が完成した
- ✅ **次の学習**（さらに多くのカードを並べる）への準備ができた