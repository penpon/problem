# 20.0.2 Bootstrapコンポーネント導入 - UI部品の完全活用

## 📋 概要

Bootstrap 5の主要コンポーネントの使い方を実践的に学習します。ナビゲーション、モーダル、ドロップダウン、フォーム、テーブルなど、実際のWebサイトで使用される重要な部品の実装方法をマスターします。

## 🎯 学習目標

- **ナビゲーション**: レスポンシブナビバー、サイドバー、タブナビゲーション
- **モーダルとオーバーレイ**: モーダルダイアログ、トースト、オフキャンバス
- **インタラクティブ要素**: ドロップダウン、アコーディオン、カルーセル
- **データ表示**: テーブル、バッジ、プログレスバー、カード
- **フォーム**: 入力フィールド、選択肢、バリデーション表示

## 🛠 技術スタック

- **Bootstrap 5.3.3**: UI コンポーネントフレームワーク
- **Bootstrap JavaScript**: インタラクティブ機能
- **Bootstrap Icons**: アイコンライブラリ
- **CSS3**: カスタムアニメーションとスタイリング
- **JavaScript ES6+**: 動的コンポーネント制御

## 📁 ファイル構成

```
20.0.2-component-intro/
├── index.html          # メインHTML（コンポーネントデモページ）
├── css/
│   └── style.css       # カスタムCSS（コンポーネント拡張）
├── js/
│   └── script.js       # コンポーネント制御スクリプト
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
   - 各コンポーネントセクションを上から順に確認
   - 実際にボタンをクリックして動作を確認
   - 開発者ツールでHTML構造を調査
   - カスタマイズ例を試す

## 🎨 主要な学習内容

### 1. ナビゲーションバー
```html
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">ブランド名</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link active" href="#">ホーム</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                        サービス
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">サービス1</a></li>
                        <li><a class="dropdown-item" href="#">サービス2</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
```

### 2. モーダルダイアログ
```html
<!-- モーダルトリガー -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    モーダルを開く
</button>

<!-- モーダル本体 -->
<div class="modal fade" id="exampleModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">モーダルタイトル</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                モーダルの内容がここに入ります。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">閉じる</button>
                <button type="button" class="btn btn-primary">保存</button>
            </div>
        </div>
    </div>
</div>
```

### 3. カルーセル（スライダー）
```html
<div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" class="active"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
    </div>
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="image1.jpg" class="d-block w-100" alt="画像1">
        </div>
        <div class="carousel-item">
            <img src="image2.jpg" class="d-block w-100" alt="画像2">
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
    </button>
</div>
```

### 4. フォームコンポーネント
```html
<form>
    <div class="mb-3">
        <label for="email" class="form-label">メールアドレス</label>
        <input type="email" class="form-control" id="email" required>
        <div class="valid-feedback">正しいメールアドレスです。</div>
        <div class="invalid-feedback">有効なメールアドレスを入力してください。</div>
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">パスワード</label>
        <input type="password" class="form-control" id="password" required>
    </div>
    <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="remember">
        <label class="form-check-label" for="remember">
            ログイン状態を保持する
        </label>
    </div>
    <button type="submit" class="btn btn-primary">ログイン</button>
</form>
```

### 5. アコーディオン
```html
<div class="accordion" id="accordionExample">
    <div class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                アコーディオンアイテム #1
            </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                アコーディオンの内容がここに表示されます。
            </div>
        </div>
    </div>
</div>
```

## 💪 実習課題

### 課題1: レスポンシブナビゲーション作成
以下の機能を持つナビゲーションバーを作成してください：
- ロゴ・ブランド名表示
- メニューアイテム（ホーム、サービス、会社情報、お問い合わせ）
- ドロップダウンメニュー（サービス内のサブメニュー）
- モバイル時のハンバーガーメニュー
- 検索フォーム

### 課題2: 商品カード with モーダル
- カードコンポーネントで商品を表示
- 「詳細を見る」ボタンでモーダル表示
- モーダル内に商品詳細情報
- カルーセルで商品画像を複数表示

### 課題3: お問い合わせフォーム
- フォームバリデーション機能付き
- 必須項目とオプション項目
- 選択肢（ラジオボタン・チェックボックス）
- 送信完了時のトースト表示

### 課題4: ダッシュボード風レイアウト
- サイドバーナビゲーション
- プログレスバーで進捗表示
- テーブルでデータ一覧
- バッジで状態表示

## 🔍 インタラクティブ機能

このページには学習効果を高める以下の機能が含まれています：

- **ライブプレビュー**: 各コンポーネントの実働デモ
- **コード表示切り替え**: HTML/CSS/JSコードの表示・非表示
- **カスタマイゼーション例**: 色・サイズ・スタイルの変更例
- **レスポンシブ確認**: 画面サイズ変更での動作確認
- **アクセシビリティ対応**: キーボード操作・スクリーンリーダー対応

## 📱 レスポンシブ対応

### コンポーネント別レスポンシブ要素
- **ナビバー**: モバイル時のハンバーガーメニュー
- **カルーセル**: 画像サイズ・インジケーターの調整
- **モーダル**: 小画面での全画面表示
- **フォーム**: 入力フィールドの幅調整
- **テーブル**: 横スクロール・レスポンシブテーブル

### 確認ポイント
- タッチデバイスでの操作性
- 小画面での可読性
- ナビゲーションの使いやすさ

## 🎨 カスタマイゼーション

### CSS変数を使った色の変更
```css
:root {
    --bs-primary: #6366f1;
    --bs-success: #10b981;
    --bs-danger: #ef4444;
}
```

### JavaScript API の活用
```javascript
// モーダルの制御
const myModal = new bootstrap.Modal(document.getElementById('myModal'))
myModal.show()

// トーストの表示
const toastLiveExample = document.getElementById('liveToast')
const toast = new bootstrap.Toast(toastLiveExample)
toast.show()
```

## ✅ 習得チェックリスト

### 基本コンポーネント
- [ ] ナビゲーションバーの作成と設定
- [ ] モーダルダイアログの実装
- [ ] ドロップダウンメニューの使用
- [ ] カルーセル（スライダー）の設定
- [ ] アコーディオンの実装

### フォーム関連
- [ ] フォームコンポーネントの使用
- [ ] バリデーション表示の実装
- [ ] 選択肢コンポーネント（チェック・ラジオ）

### データ表示
- [ ] レスポンシブテーブルの作成
- [ ] バッジとプログレスバーの使用
- [ ] トースト通知の実装

### レスポンシブ対応
- [ ] モバイルファーストの考え方理解
- [ ] 各コンポーネントのレスポンシブ動作確認
- [ ] タッチデバイスでの操作性確認

### JavaScript連携
- [ ] Bootstrap JavaScript APIの使用
- [ ] イベントリスナーの設定
- [ ] 動的コンポーネント制御

## 🔗 次のステップ

- **20.0.3-responsive-system**: レスポンシブシステムの深化学習
- **20.0.4-utility-classes**: ユーティリティクラスの完全活用
- **20.1-bootstrap-product-gallery**: 実践的な商品ギャラリー制作

## 💡 参考リンク

- [Bootstrap Components](https://getbootstrap.com/docs/5.3/components/alerts/)
- [Bootstrap JavaScript](https://getbootstrap.com/docs/5.3/getting-started/javascript/)
- [Bootstrap Examples](https://getbootstrap.com/docs/5.3/examples/)
- [Accessibility Guidelines](https://getbootstrap.com/docs/5.3/getting-started/accessibility/)

---

**🎉 お疲れ様でした！** Bootstrapの主要コンポーネントをマスターできたら、次はレスポンシブシステムの詳細学習に進みましょう。実際のWebサイト制作で必要な部品をすべて使えるようになります！