# 20.2 Bootstrapボタンの色変更

## 🎯 学習目標

**51番のBootstrap導入の続きで、ボタンの色を変更してみよう**

- Bootstrapの基本的なボタンクラスを学ぶ
- 色違いのボタンを複数作ってみる
- どの色がどんな用途に使われるか理解する

## 📝 学習内容

### 今回学ぶBootstrapボタン

**基本的なボタンの色**
- 青いボタン（primary）
- 緑のボタン（success）
- 赤いボタン（danger）
- 黄色のボタン（warning）

### 今回学ぶこと

- `btn-primary`、`btn-success`などのクラス名
- 色ごとの使い分け（OK、危険、警告など）
- 複数のボタンを並べる方法


## 🔍 詳細解説

### コード例（色違いのボタン）

**HTML**
```html
<h2>Bootstrapボタンの色変更</h2>
<p>51番で読み込んだBootstrapを使って、色違いのボタンを作ってみましょう</p>

<div class="buttons">
    <button class="btn btn-primary">青いボタン</button>
    <button class="btn btn-success">緑のボタン</button>
    <button class="btn btn-danger">赤いボタン</button>
    <button class="btn btn-warning">黄色のボタン</button>
</div>
```

### 色の意味と使い分け

- **btn-primary**（青）: メインのアクション（「保存」「送信」など）
- **btn-success**（緑）: 成功・完了のアクション（「完了」「OK」など）
- **btn-danger**（赤）: 危険なアクション（「削除」「キャンセル」など）
- **btn-warning**（黄）: 注意が必要なアクション（「確認」「注意」など）

### 仕組みの説明

1. **CDN読み込み**: 51番で読み込んだBootstrapが有効
2. **btnクラス**: 基本的なボタンのスタイル
3. **色クラス**: btn-primaryなどで色を指定
4. **美しい見た目**: 自分でCSSを書かなくても綺麗


## 💻 実習の進め方

1. **HTMLを書く**: 4色のボタンを並べて作る
2. **ブラウザで確認**: 色が違って表示されるかチェック
3. **違いを確認**: 自分でCSSを書いた場合と比較してみる
4. **他の色も試す**: btn-secondary、btn-lightなど

## 🎉 完成時の達成感

- ✅ **色違いのボタン**が簡単に作れた
- ✅ **Bootstrapの便利さ**を実感できた
- ✅ **次の学習**（カードの作成）への準備ができた

