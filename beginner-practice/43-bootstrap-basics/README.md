# 20.0.1 Bootstrap基礎 - CDN導入と基本構造

## 📋 概要

Bootstrap 5の基礎を学習するための入門編です。CDNを使った導入方法から基本的なグリッドシステム、コンポーネントの使い方を体験します。

## 🎯 学習目標

- **Bootstrap 5の基本理解**: CDNでの導入方法をマスター
- **グリッドシステム**: 12カラムグリッドとレスポンシブの概念
- **基本コンポーネント**: ボタン、カード、アラートの使い方
- **ユーティリティクラス**: 余白、色、テキスト調整の効率化

## 🛠 技術スタック

- **Bootstrap 5.3.3**: CSS フレームワーク
- **Bootstrap Icons**: アイコンライブラリ
- **Vanilla JavaScript**: インタラクティブ機能
- **CSS3**: カスタムアニメーション

## 📁 ファイル構成

```
20.0.1-bootstrap-basics/
├── index.html          # メインHTML（Bootstrap CDN設定済み）
├── css/
│   └── style.css       # カスタムCSS（Bootstrap拡張）
├── js/
│   └── script.js       # インタラクティブ機能
└── README.md           # このファイル
```

## 🚀 使用方法

1. **ファイルを開く**
   ```bash
   # ブラウザでindex.htmlを開く
   open index.html
   # または
   python -m http.server 8000  # ローカルサーバー起動
   ```

2. **学習の進め方**
   - ページを上から順に確認
   - 各セクションでBootstrapクラスの使い方を理解
   - ブラウザの開発者ツールでレスポンシブ動作を確認
   - 実習課題に取り組む

## 🎨 主要な学習内容

### 1. CDNによるBootstrap導入
```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

### 2. グリッドシステム基礎
```html
<div class="container">
    <div class="row">
        <div class="col-md-8">メインコンテンツ</div>
        <div class="col-md-4">サイドバー</div>
    </div>
</div>
```

### 3. 基本コンポーネント
```html
<!-- ボタン -->
<button class="btn btn-primary">Primary</button>

<!-- カード -->
<div class="card">
    <div class="card-body">
        <h5 class="card-title">カードタイトル</h5>
        <p class="card-text">カード内容</p>
    </div>
</div>

<!-- アラート -->
<div class="alert alert-success" role="alert">
    成功メッセージ
</div>
```

### 4. ユーティリティクラス
```html
<!-- 余白調整 -->
<div class="p-3 m-2">パディング3、マージン2</div>

<!-- テキスト調整 -->
<div class="text-center text-primary fw-bold">中央寄せ、青色、太字</div>
```

## 💪 実習課題

### 課題1: プロフィールカード作成
以下の要素を含むプロフィールカードを作成してください：
- カードコンポーネント使用
- 人物アイコンまたは画像
- 名前、職業、説明文
- 2つのアクションボタン
- 適切な色とスタイリング

### 課題2: レスポンシブレイアウト
- デスクトップ: 3カラム表示
- タブレット: 2カラム表示  
- スマートフォン: 1カラム表示

## 🔍 インタラクティブ機能

このページには学習効果を高める以下の機能が含まれています：

- **レスポンシブヒント**: 画面サイズ変更時の表示切り替え
- **ホバーエフェクト**: グリッド要素にカーソルを当てるとクラス情報表示
- **クリックフィードバック**: ボタンクリック時のアニメーション
- **学習進度追跡**: インタラクション回数による進度管理
- **ツールチップ**: 要素の詳細情報表示

## 📱 レスポンシブ対応

### ブレークポイント
- **Extra small (xs)**: < 576px
- **Small (sm)**: ≥ 576px
- **Medium (md)**: ≥ 768px  
- **Large (lg)**: ≥ 992px
- **Extra large (xl)**: ≥ 1200px
- **Extra extra large (xxl)**: ≥ 1400px

### 確認方法
1. ブラウザの開発者ツールを開く（F12）
2. デバイスツールバーを有効化
3. 異なる画面サイズでレイアウトを確認

## ✅ 習得チェックリスト

- [ ] Bootstrap CDNの導入方法を理解した
- [ ] グリッドシステム（container, row, col）を理解した
- [ ] レスポンシブクラス（sm, md, lg）を使い分けできる
- [ ] 基本コンポーネント（btn, card, alert）を使える
- [ ] ユーティリティクラス（p-, m-, text-）を活用できる
- [ ] 実習課題を完了した
- [ ] ブラウザ開発者ツールでレスポンシブ確認ができる

## 🔗 次のステップ

- **20.0.2-component-intro**: コンポーネント詳細学習
- **20.0.3-responsive-system**: レスポンシブシステム深化  
- **20.0.4-utility-classes**: ユーティリティクラス完全活用

## 💡 参考リンク

- [Bootstrap 5 公式ドキュメント](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [MDN CSS Grid](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Grid_Layout)

---

**🎉 お疲れ様でした！** このページでBootstrapの基礎をしっかりマスターできたら、次の段階に進みましょう。