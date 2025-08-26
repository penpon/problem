# 20.5 Bootstrapボタンの色を学ぼう

## 🎯 学習目標

**54番の商品カードの続きで、ボタンの色を変える方法を学ぼう**

- Bootstrapのボタンの色の種類を覚える
- 54番のカードのボタンを様々な色に変更する
- アラートの基本的な使い方を学ぶ

## 📝 学習内容

### 今回作るもの

**色とりどりのボタンがある商品カード**
- 54番の2つのカードはそのまま
- ボタンを様々な色に変更
- 簡単なアラートメッセージを追加

### 今回学ぶこと

- `btn-primary`, `btn-success`, `btn-danger`などの色の種類
- `alert`を使った簡単なメッセージ表示
- 54番の内容に少しだけ追加する方法

## 🔍 詳細解説

### ボタンの色の種類

**Bootstrapで使えるボタンの色**
```html
<button class="btn btn-primary">青いボタン (primary)</button>
<button class="btn btn-success">緑のボタン (success)</button>
<button class="btn btn-danger">赤いボタン (danger)</button>
<button class="btn btn-warning">黄色いボタン (warning)</button>
<button class="btn btn-info">水色のボタン (info)</button>
<button class="btn btn-secondary">グレーのボタン (secondary)</button>
```

### 54番のカードに色を追加する例

**HTML（54番のカードを少し変更）**
```html
<h2>カラフルなボタンの商品カード</h2>
<p>54番のカードのボタンに色をつけてみましょう</p>

<!-- アラートメッセージを追加 -->
<div class="alert alert-info" role="alert">
    ボタンの色が変わったよ！クリックしてみてね
</div>

<div class="row">
    <!-- 1番目のカード -->
    <div class="col-6">
        <div class="card">
            <img src="https://via.placeholder.com/300x200/ff6b6b/white?text=商品1" class="card-img-top" alt="商品1">
            <div class="card-body">
                <h5 class="card-title">商品1</h5>
                <p class="card-text">こちらは1番目の商品です。赤いボタンです。</p>
                <a href="#" class="btn btn-danger">購入する</a>
            </div>
        </div>
    </div>
    
    <!-- 2番目のカード -->
    <div class="col-6">
        <div class="card">
            <img src="https://via.placeholder.com/300x200/4ecdc4/white?text=商品2" class="card-img-top" alt="商品2">
            <div class="card-body">
                <h5 class="card-title">商品2</h5>
                <p class="card-text">こちらは2番目の商品です。緑のボタンです。</p>
                <a href="#" class="btn btn-success">購入する</a>
            </div>
        </div>
    </div>
</div>

<!-- いろんな色のボタンを練習 -->
<h3 class="mt-4">色々なボタンを試してみよう</h3>
<button class="btn btn-primary">青いボタン</button>
<button class="btn btn-warning">黄色いボタン</button>
<button class="btn btn-info">水色のボタン</button>
```

### 仕組みの説明

1. **btn-danger**: 赤いボタン（危険な操作用）
2. **btn-success**: 緑のボタン（成功・完了用）
3. **alert alert-info**: 水色のメッセージ枠
4. **54番の内容**: そのまま活用して少しだけ追加

## 💻 実習の進め方

1. **54番をコピー**: 前回のカードをそのまま使う
2. **ボタンの色を変える**: btn-primaryをbtn-dangerやbtn-successに変更
3. **アラートを追加**: ページの上にメッセージを表示
4. **色々試してみる**: 練習用のボタンを追加で作る

## 🎉 完成時の達成感

- ✅ **54番のカード**にカラフルなボタンができた
- ✅ **6種類の色**を覚えられた  
- ✅ **アラート**でメッセージが表示できた
- ✅ **次の学習**（もう少し詳しいBootstrap）への準備ができた