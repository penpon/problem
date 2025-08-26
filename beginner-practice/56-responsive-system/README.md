# 20.6 3つのカードを並べよう

## 🎯 学習目標

**55番のカードの続きで、3つのカードを並べる方法を学ぼう**

- `col-4`を使って3つのカードを横に並べる
- 55番で学んだボタンの色を活用する
- 簡単なグリッドシステムの基本を理解する

## 📝 学習内容

### 今回作るもの

**3つの商品カードが横に並んだギャラリー**
- 55番で学んだカラフルなボタンを使用
- 3つのカードを綺麗に横に並べる
- 異なる商品情報で練習

### 今回学ぶこと

- `col-4`（12÷3=4）で3つのカードを等間隔に配置
- 55番で学んだ色の種類を活用
- カードの内容を変更する方法

## 🔍 詳細解説

### グリッドの計算

**Bootstrapは12カラムシステム**
- 54番: `col-6` + `col-6` = 6 + 6 = 12（2つ並び）
- 今回: `col-4` + `col-4` + `col-4` = 4 + 4 + 4 = 12（3つ並び）

### 3つのカードの例

**HTML（55番の内容を発展）**
```html
<h2>3つの商品カード</h2>
<p>55番で学んだ色とりどりのボタンで、3つの商品を並べてみましょう</p>

<!-- 55番のアラートはそのまま -->
<div class="alert alert-success" role="alert">
    今度は3つのカードが並んでいるよ！
</div>

<div class="row">
    <!-- 1番目のカード -->
    <div class="col-4">
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
    <div class="col-4">
        <div class="card">
            <img src="https://via.placeholder.com/300x200/4ecdc4/white?text=商品2" class="card-img-top" alt="商品2">
            <div class="card-body">
                <h5 class="card-title">商品2</h5>
                <p class="card-text">新鮮なバナナです。</p>
                <a href="#" class="btn btn-warning">購入する</a>
            </div>
        </div>
    </div>
    
    <!-- 3番目のカード（新しく追加） -->
    <div class="col-4">
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

<!-- 55番で学んだボタンも復習 -->
<h3 class="mt-4">色々なボタンを復習</h3>
<p>55番で学んだボタンの色を思い出そう</p>
<button class="btn btn-primary">青いボタン</button>
<button class="btn btn-info">水色のボタン</button>
<button class="btn btn-secondary">グレーのボタン</button>
```

### 仕組みの説明

1. **col-4**: 12カラムの中で4カラム分を使用（12÷3=4）
2. **3つのcol-4**: 4 + 4 + 4 = 12でちょうど一行に並ぶ
3. **55番の知識**: ボタンの色を自由に変更できる
4. **異なる商品**: それぞれ違う商品情報で練習

## 💻 実習の進め方

1. **55番をベースにする**: 前回のアラートやボタンの色はそのまま活用
2. **col-6をcol-4に変更**: 2つ並びから3つ並びに変更
3. **3番目のカードを追加**: 新しいカードを1つ追加
4. **内容をカスタマイズ**: 実際の商品名や色を自分で変更

## 🎉 完成時の達成感

- ✅ **3つのカード**が綺麗に並んだ
- ✅ **グリッドシステム**の基本が理解できた
- ✅ **55番の色の知識**を活用できた
- ✅ **次のステップ**（レスポンシブ対応）への準備ができた