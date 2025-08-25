# Fashion ECサイト制作のための段階的学習サイト

## 📋 概要

このプロジェクトは、本格的なECサイト制作に必要な技術を段階的に学ぶための練習用サイト集です。10個の練習サイトを通じて、HTML/CSS/JavaScriptの基礎から高度なEC機能の実装まで、体系的に学習できます。

## 🎯 目標

`fashion-ec-site/` ディレクトリにある本格的なECサイトと同等の技術レベルに到達すること

## 📚 学習の進め方

### 基礎編（1-3週目）
1. **01-simple-product-card** - HTML/CSS基礎、商品カードコンポーネント
2. **02-responsive-grid** - Bootstrap Grid、レスポンシブデザイン
3. **03-interactive-navigation** - JavaScript基礎、動的ナビゲーション

### 動的機能編（4-6週目）
4. **04-product-data-system** - JavaScript配列、動的HTML生成
5. **05-search-gallery** - フィルター機能、リアルタイム検索
6. **06-modal-details** - Bootstrap Modal、データ連携

### 高度機能編（7-9週目）
7. **07-favorites-feature** - LocalStorage、データ永続化
8. **08-simple-cart** - ショッピングカート基本機能
9. **09-price-sort-filter** - 複合フィルター、ソート機能

### 統合編（10週目）
10. **10-mini-ecommerce** - 全機能統合、UX改善

## 🛠 技術スタック

- **HTML5** - セマンティックマークアップ
- **CSS3** - Flexbox、Grid、CSS変数、アニメーション
- **Bootstrap 5** - レスポンシブデザイン、UIコンポーネント
- **JavaScript ES6** - モダンな構文、DOM操作、状態管理
- **LocalStorage** - データ永続化

## 📁 ディレクトリ構造

```
practice-sites/
├── README.md                    # このファイル
├── shared/                      # 共通リソース
│   └── images/                  # 練習用画像（SVG形式）
├── 01-simple-product-card/      # 練習1: 商品カード
│   ├── css/style.css           # 完全独立のCSS
│   ├── js/script.js            # JavaScript機能
│   └── index.html              # メインHTML
├── 02-responsive-grid/          # 練習2: レスポンシブグリッド
│   ├── css/style.css           # 完全独立のCSS（Bootstrap統合）
│   ├── js/script.js            # JavaScript機能
│   └── index.html              # メインHTML
├── 03-interactive-navigation/   # 練習3: インタラクティブナビ
│   ├── css/style.css           # 完全独立のCSS（Bootstrap統合）
│   ├── js/script.js            # JavaScript機能
│   └── index.html              # メインHTML
├── 04-product-data-system/      # 練習4: データ管理システム
├── 05-search-gallery/           # 練習5: 検索ギャラリー
├── 06-modal-details/            # 練習6: モーダル詳細表示
├── 07-favorites-feature/        # 練習7: お気に入り機能
├── 08-simple-cart/              # 練習8: シンプルカート
├── 09-price-sort-filter/        # 練習9: ソート・フィルター
└── 10-mini-ecommerce/           # 練習10: 統合ECサイト
```

### 💡 独立構成の特徴

各練習問題は**完全に独立**して動作します：
- ✅ **個別CSS**: 各練習のstyle.cssに必要なスタイルを全て含有
- ✅ **独立学習**: 他の練習問題に依存せず単体で学習可能
- ✅ **移植性**: ファイル一式をコピーすれば他の環境でも動作
- ✅ **学習効率**: 一つのファイルで学習内容を完結して把握可能

## 🚀 開始方法

1. まず `01-simple-product-card/` から始めてください
2. 各ディレクトリの `README.md` で学習目標を確認
3. `index.html` でサイトを確認
4. コードを分析して理解を深める
5. 次の練習サイトに進む

## ✅ 学習チェックポイント

各練習サイト完了後、以下を確認してください：
- [ ] HTMLの構造を理解できた
- [ ] CSSのスタイリング手法を把握できた  
- [ ] JavaScriptの動作を説明できる
- [ ] レスポンシブ対応を確認できた
- [ ] 目標サイトとの関連性を理解できた

## 🎓 修了後の次のステップ

全10サイトを完了したら：
1. `fashion-ec-site/` の実装に挑戦
2. 独自機能の追加
3. 他のフレームワーク（React、Vue.js等）への移行

## 📖 参考資料

- [MDN Web Docs](https://developer.mozilla.org/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0/)
- [JavaScript.info](https://javascript.info/)

---

**がんばって学習を進めましょう！各ステップで確実にスキルを身につけていけば、必ず目標サイトを制作できるようになります。**
