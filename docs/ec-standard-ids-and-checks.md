# EC標準IDセットとChecks内規（ドラフト）

本ドキュメントは、EC系課題群におけるHTML要素IDの標準化と、採点Checksの共通テンプレートを定義します。最小・直接的な解答原則を前提に、段階学習の滑らかな進行を支援します。

## 1. 標準IDセット

- ヘッダー/共通
  - `#goAdmin`, `#goCart`, `#cartCount`, `#authArea`
- カタログビュー
  - `#viewCatalog`, `#list`
  - フィルタ/ソート: `#category`, `#sort`, `#inStock`, `#freeShip`, `#priceMin`, `#priceMax`
  - カードボタン: `.add-to-cart`（`data-id`属性で商品ID）
  - グリッド: `#list` 直下の各要素に `col-12 col-sm-6 col-lg-4`
- ミニカート
  - `#miniCartList`, `#miniCartTotal`, `#goCheckoutMini`
- チェックアウト
  - `#viewCheckout`, `#cartList`, `#totalCheckout`, `#backToCatalog`, `#completeBtn`
- 完了画面
  - `#viewComplete`, `#orderNo`, `#backHome`
- 認証
  - `#viewAuth`, `#loginEmail`, `#loginPassword`, `#loginBtn`, `#registerBtn`
- 管理
  - `#viewAdmin`, `#adminTableBody`

補足:
- 追加的に `#total` を用いる場合があるが、現行Checksの必須対象ではない。
- ID命名は lowerCamelCase、複数要素コンテナはリスト系ID（例: `#miniCartList`, `#cartList`）。

## 2. Checksテンプレート

- 構造（HTML/CSS）
  - `layout-header-footer` (html): `<header>` と `<footer>` の存在
  - `views` (html): `#viewCatalog`, `#viewCheckout`, `#viewComplete` の存在
  - `controls` (html): `#category`, `#sort`, `#inStock`, `#miniCartTotal`, `#list`, `#goCheckoutMini` の存在
  - `grid-classes` (css): `#list` 直下に `col-12 col-sm-6 col-lg-4` を持つ要素が並ぶ
- 挙動（JS）
  - `uses-array-methods` (js): `filter/sort/map` を用いた一覧生成
  - `cart-and-checkout` (js):
    - `.add-to-cart` クリックで `#cartCount` と `#miniCartTotal` が更新
    - `#viewCheckout` で `#cartList` と `#totalCheckout` が表示更新
    - `#completeBtn` で `#viewComplete` に遷移し、`#orderNo` を表示

## 3. 実装ガイド

- DOM生成: `map().join('')` を基本、状態は配列と再描画関数で管理
- 画面遷移: `showView()` + `d-none` 切替のみで簡潔に
- 段階化: HTML存在 → 配列処理 → 画面遷移 → 合計/件数更新 → 完了番号表示

## 4. テスト観点（例）

- `.add-to-cart` クリックで `#cartCount` が +1、`#miniCartTotal` が合計額に同期
- `#goCheckoutMini` クリックで `#viewCheckout` が可視化
- `#completeBtn` クリックで `#viewComplete` に遷移し、`#orderNo` が英数字6桁相当で表示

## 5. 運用

- 既存課題のChecksは本テンプレに短文化・統合
- 新規課題は本標準IDセットとテンプレに準拠
