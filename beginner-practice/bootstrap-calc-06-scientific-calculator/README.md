# 20.1 Bootstrapとは何か

## 🎯 学習目標

**Bootstrapというツールを知って、最初のBootstrapボタンを作ろう**

- Bootstrapが何かを理解する
- CDNで簡単に読み込む方法を学ぶ
- 普通のボタンとBootstrapボタンの違いを体験する

## 📝 学習内容

### Bootstrapって何？

**Bootstrap**は、Webサイトを簡単にきれいに作れるツールです。
- 他の人が作ったCSSを借りて使える
- ボタンやカードなど、よく使うパーツが最初から用意されている
- プロが作ったようなデザインが簡単にできる

### 今回学ぶこと

- BootstrapのCDNを読み込む方法
- `btn btn-primary` というクラス名の意味
- 普通のボタンとの見た目の違い

## 🔍 詳細解説

### BootstrapのCDN読み込み

**HTML**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap初体験</title>
    
    <!-- Bootstrapを読み込む（CDN） -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h2>ボタンの比較</h2>
        
        <!-- 普通のボタン -->
        <button>普通のボタン</button>
        
        <!-- Bootstrapボタン -->
        <button class="btn btn-primary">Bootstrapボタン</button>
    </div>
</body>
</html>
```

### 違いを体験してみよう

1. **普通のボタン**: 地味なグレーの見た目
2. **Bootstrapボタン**: 青くてきれいな見た目

### `btn btn-primary`の意味

- `btn`: 「これはBootstrapのボタンです」という意味
- `btn-primary`: 「メインの青いボタンです」という意味

### 他のBootstrapボタン

```html
<button class="btn btn-success">緑色ボタン</button>
<button class="btn btn-danger">赤色ボタン</button>
<button class="btn btn-warning">黄色ボタン</button>
```

### CDNって何？

**CDN**は、インターネット上に置いてあるファイルを読み込む方法です。
- 自分でCSSファイルを作らなくてよい
- インターネットからBootstrapを読み込むだけ
- とても簡単！

## 💻 実習の進め方

1. **HTMLファイルを作る**: 上のコード例をコピーして使う
2. **ブラウザで開く**: 普通のボタンとBootstrapボタンの違いを確認
3. **色を変えてみる**: `btn-success`、`btn-danger`なども試す

## 🎉 完成時の達成感

- ✅ **Bootstrap**の存在を知った
- ✅ **CDN読み込み**ができるようになった
- ✅ **Bootstrapボタン**の美しさを体験した
