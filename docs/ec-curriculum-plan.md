# ECカリキュラム計画（学習曲線1.1倍・約20題）

本ドキュメントは EC 系の段階学習（約20題）構成を示すドラフトです。各課題は最小・直接的な解答原則で設計し、滑らかな負荷上昇（学習曲線1.1倍）を目指します。

## 1. マイルストーン構成（5題 × 4段）

- M1: 基礎UIと配列処理（EC-01〜05）
  - 目標: Bootstrapグリッド/基本カード、`map()` による一覧生成、軽微な `filter/sort` 導入
  - チェック例: `#list` + `.col-12.col-sm-6.col-lg-4`、`map()` の使用
- M2: フィルタ/ソートと状態（EC-06〜10）
  - 目標: `filter/sort` の複合、在庫/価格レンジ/送料無料、イベント委譲
  - チェック例: `#category/#sort/#inStock/#priceMin/#priceMax` のDOM存在と反映
- M3: カートと画面遷移（EC-11〜15）
  - 目標: カート配列、`render*` 再描画関数、`showView()` で `catalog/checkout/complete` 遷移
  - チェック例: 件数`#cartCount`/合計`#miniCartTotal`、`#cartList/#totalCheckout`、完了`#orderNo`
- M4: 認証/管理・ログ（EC-16〜20）
  - 目標: 簡易認証（localStorage）、管理ビュー、購入ログ、入力バリデーション
  - チェック例: `#viewAuth/#loginEmail/#loginBtn`、`#viewAdmin/#adminTableBody`、ログテーブル生成

## 2. 学習要素の導入順

1. HTML/Bootstrap 基本（カード/グリッド）
2. `map()` による描画、`filter/sort` の導入
3. イベント委譲・状態配列の更新と再描画
4. 画面遷移（`d-none` 切替）
5. 入力/認証/簡易DB（localStorage）
6. 管理ビューとログ可視化

## 3. 出題・採点ポリシー

- 期待解答は HTML/CSS/JS の3分割 + `__INCLUDE__`
- ID/クラスは EC標準IDセットに準拠
- Checks はテンプレ共通化し段階的に評価

## 4. 成果指標（提案）

- 合格率、平均解答時間、再学習率
- M1→M4 の移行時に指標を確認し、必要に応じ課題の粒度調整

## 5. 今後の拡張

- 遅延/空状態/エラーハンドリングの強化を上級編に分離
- アクセシビリティ/国際化は別マイルストーンで段階導入
