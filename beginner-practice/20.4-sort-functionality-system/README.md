# 20.4 ソート機能システム - データ並び替え入門

## 🎯 学習目標

**20.3のフィルタリング技術を基盤として、JavaScriptのsort()メソッドによる商品並び替え機能を習得**

20.3で身につけた「filter()による商品絞り込み技術」を活用し、今度は「表示する商品の順序を変更する技術」を学習します。8商品から10商品への拡張と、価格順・いいね順・名前順など多様なソート機能を通じて、実際のECサイトで使われる商品並び替えシステムの基礎を確実に身につけます。

## 📖 学習内容

### ✨ 実装する12の機能（20.3 + 新機能2つ）

#### 20.3から継続する機能
1. **動的HTML生成システム** - テンプレート関数による商品カード自動作成（基盤）
2. **商品データ拡張管理** - 10商品の効率的な表示・管理（拡張）
3. **カテゴリフィルタシステム** - カテゴリ別の商品絞り込み機能（基盤）
4. **価格帯フィルタシステム** - 価格範囲による商品絞り込み機能（基盤）
5. **統計の集約表示** - 全商品・フィルタ結果の情報統合（基盤）
6. **データ永続化** - フィルタ・ソート状態の保存・読み込み（拡張）
7. **個別いいね機能** - 各商品独立のいいね操作（基盤）
8. **レスポンシブ対応** - 画面サイズに応じた最適な表示（基盤）
9. **フィルタ統計表示** - フィルタ結果の詳細統計（基盤）
10. **リセット機能** - フィルタ・ソート状態の初期化（拡張）

#### 今回の新機能（ソート）
11. **価格ソートシステム** - 価格の安い順・高い順での並び替え
12. **多軸ソートシステム** - いいね順・名前順・追加順での並び替え

### 🎨 デザインの特徴

- **直感的なソートUI**: ドロップダウン式の分かりやすいソート操作
- **フィルタ+ソート連動**: フィルタリングとソートの同時適用
- **視覚的ソート表示**: 現在のソート状態が一目で分かる
- **リアルタイム並び替え**: ソート選択と同時に結果が更新

## 📝 学習ポイント

### 🔧 今回のメイン学習テーマ: sort()によるデータソート

1. **ソートとは何か？**
   - データを特定の順序で並び替える技術
   - `products.sort((a, b) => a.price - b.price)` で価格の安い順に並び替え
   - 元の配列の順序を変更する（フィルタとは異なる）

2. **なぜソートを使うのか？**
   - **利便性**: ユーザーが好みの順序で商品を確認できる
   - **比較性**: 価格比較や人気比較が容易になる
   - **実用性**: 実際のECサイトでは必須の機能

3. **sort()メソッドの基本パターン**
   ```javascript
   // 1. 数値の昇順ソート
   products.sort((a, b) => a.price - b.price);
   
   // 2. 数値の降順ソート
   products.sort((a, b) => b.price - a.price);
   
   // 3. 文字列のソート
   products.sort((a, b) => a.name.localeCompare(b.name));
   ```

### 💡 20.3からの発展ポイント

- **フィルタリング（20.3）** + **ソート（20.4）** = **高度な商品検索システム**
- **8商品システム** → **10商品の多様なソート体験**
- **絞り込み機能** → **絞り込み + 並び替えの複合機能**

## 🔍 詳細解説

### 🏗️ 20.3から20.4への技術発展

**20.3の基本的なフィルタ表示：**
```javascript
// フィルタされた商品をそのまま表示
function renderFilteredProducts() {
    const filteredProducts = products.filter(filterFunction);
    filteredProducts.forEach(product => renderCard(product));
}
```

**20.4のフィルタ+ソート表示：**
```javascript
// フィルタ後にソートして表示
function renderSortedAndFilteredProducts() {
    const filteredProducts = products.filter(filterFunction);
    const sortedProducts = [...filteredProducts].sort(sortFunction);
    sortedProducts.forEach(product => renderCard(product));
}
```

### 🎯 ソートの4つの主要技術

1. **比較関数の作成**
   ```javascript
   // 価格での昇順比較関数
   const priceAscending = (a, b) => a.price - b.price;
   
   // 価格での降順比較関数
   const priceDescending = (a, b) => b.price - a.price;
   
   // 名前での比較関数
   const nameSort = (a, b) => a.name.localeCompare(b.name);
   ```

2. **ソート処理の実行**
   ```javascript
   // 配列のコピーを作成してソート（元配列は保持）
   function applySorting(products, sortType) {
       const productsCopy = [...products];
       
       switch (sortType) {
           case 'price-low':
               return productsCopy.sort((a, b) => a.price - b.price);
           case 'price-high':
               return productsCopy.sort((a, b) => b.price - a.price);
           case 'likes':
               return productsCopy.sort((a, b) => b.likes - a.likes);
           default:
               return productsCopy;
       }
   }
   ```

3. **フィルタとソートの組み合わせ**
   ```javascript
   // フィルタリング後にソート適用
   function getProcessedProducts() {
       let processed = products.filter(applyFilters);
       processed = applySorting(processed, currentSort);
       return processed;
   }
   ```

4. **UIとの連動**
   ```javascript
   // ソート選択のイベント処理
   sortSelect.addEventListener('change', (e) => {
       currentSort = e.target.value;
       renderProcessedProducts();
       updateSortUI();
   });
   ```

### 🚀 実用的なソートシステムの特徴

- **複合処理**: フィルタリング後にソート適用
- **状態保持**: 現在のソート条件を記憶
- **パフォーマンス**: 効率的なソート処理
- **ユーザビリティ**: 直感的で分かりやすいソート選択

### 💡 ソートによるUX向上

1. **比較の容易性**
   - 価格順で予算に合う商品を素早く発見
   - 人気順で評判の良い商品を確認

2. **ユーザー体験の向上**
   - 個人の優先順位に応じた表示
   - ストレスのない商品選択

3. **検索効率の向上**
   - フィルタで絞り込み、ソートで最適化
   - 目的の商品への最短アクセス

### 🎨 10商品システムの特徴

```javascript
// 20.4での商品データ構造（2商品追加）
const products = [
    // 20.3からの8商品 + 新規2商品
    {
        id: 9,
        name: "フィットネス マット",
        category: "sports",
        price: 3200,
        description: "滑り止め付きヨガ・エクササイズマット",
        emoji: "🧘‍♀️"
    },
    {
        id: 10,
        name: "ワイヤレス マウス",
        category: "electronics",
        price: 2800,
        description: "精密操作可能な無線光学マウス",
        emoji: "🖱️"
    }
];
```

### 🎯 ソート機能の種類

1. **価格ソート**
   - 安い順（昇順）
   - 高い順（降順）

2. **人気ソート**
   - いいね数の多い順

3. **名前ソート**
   - あいうえお順（アルファベット順）

4. **追加順**
   - 新しく追加された順
   - デフォルト順（ID順）

---

### 💻 実習の進め方

1. **20.3の復習**: フィルタリング機能の確認
2. **sort()体験**: コンソールでソート操作を実際に体験
3. **価格ソート**: 安い順・高い順での並び替えを操作
4. **複合ソート**: いいね順・名前順などを体験
5. **フィルタ+ソート**: フィルタリング後のソートを確認
6. **状態保持**: ソート状態の保存・読み込みを確認

**重要**: 今回は「sort()によるデータソート」に集中し、20.3のフィルタリング知識を確実に活用しながら新しい技術を習得しましょう！

---

## 🎉 完成時の達成感

- ✅ **sort()メソッド**をマスターし、データの自由な並び替えが可能に
- ✅ **20.3のフィルタリング + 20.4のソート**で本格的な商品検索・表示システムを構築
- ✅ **10商品システム**による多様なソート体験
- ✅ **フィルタ×ソートの複合処理**で実用的な検索機能を実装
- ✅ **20.5での検索機能**への確実な準備が完了
- ✅ **実際のECサイトと同レベルの並び替え機能**を提供できる満足感