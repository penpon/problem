# 20.3 フィルタリングシステム - 条件による商品絞り込み入門

## 🎯 学習目標

**20.2の動的HTML生成技術を基盤として、JavaScriptのfilter()メソッドによる商品フィルタリング機能を習得**

20.2で身につけた「動的HTML生成技術」を活用し、今度は「条件に応じて表示する商品を絞り込む技術」を学習します。6商品から8商品への拡張と、カテゴリ別・価格帯別のフィルタリング機能を通じて、実際のECサイトで使われる商品検索システムの基礎を確実に身につけます。

## 📖 学習内容

### ✨ 実装する10の機能（20.2 + 新機能2つ）

#### 20.2から継続する機能
1. **動的HTML生成システム** - テンプレート関数による商品カード自動作成（基盤）
2. **商品データ拡張管理** - 8商品の効率的な表示・管理（拡張）
3. **統計の集約表示** - 全商品・フィルタ結果の情報統合（基盤）
4. **データ永続化** - フィルタ状態の保存・読み込み（基盤）
5. **個別いいね機能** - 各商品独立のいいね操作（基盤）
6. **レスポンシブ対応** - 画面サイズに応じた最適な表示（基盤）
7. **カテゴリ統計表示** - カテゴリ別商品数の表示（基盤）
8. **リセット機能** - データの初期化（基盤）

#### 今回の新機能（フィルタリング）
9. **カテゴリフィルタシステム** - カテゴリ別の商品絞り込み機能
10. **価格帯フィルタシステム** - 価格範囲による商品絞り込み機能

### 🎨 デザインの特徴

- **直感的なフィルタUI**: ボタン式の分かりやすいフィルタ操作
- **リアルタイム更新**: フィルタ選択と同時に結果が更新
- **視覚的フィードバック**: 選択中のフィルタが一目で分かる
- **結果数表示**: フィルタ結果の商品数を明確に表示

## 📝 学習ポイント

### 🔧 今回のメイン学習テーマ: filter()によるデータフィルタリング

1. **フィルタリングとは何か？**
   - 大量のデータから「条件に合う」ものだけを選び出す技術
   - `products.filter(product => product.category === 'fashion')` で条件に合う商品のみ取得
   - 元のデータは変更せず、新しい配列を作成

2. **なぜフィルタリングを使うのか？**
   - **利便性**: ユーザーが欲しい商品を素早く見つけられる
   - **実用性**: 実際のECサイトでは必須の機能
   - **効率性**: 大量の商品から目的のものを効率的に発見

3. **filter()メソッドの基本パターン**
   ```javascript
   // 1. カテゴリでフィルタ
   const fashionItems = products.filter(product => product.category === 'fashion');
   
   // 2. 価格でフィルタ
   const cheapItems = products.filter(product => product.price <= 5000);
   
   // 3. 複数条件でフィルタ
   const expensiveFashion = products.filter(product => 
       product.category === 'fashion' && product.price > 5000
   );
   ```

### 💡 20.2からの発展ポイント

- **動的HTML生成（20.2）** + **データフィルタリング（20.3）** = **動的検索システム**
- **6商品システム** → **8商品の多様なフィルタリング**
- **基本表示** → **条件に応じた動的表示切り替え**

## 🔍 詳細解説

### 🏗️ 20.2から20.3への技術発展

**20.2の基本的な表示：**
```javascript
// 全商品を表示
function renderAllProducts() {
    products.forEach(product => {
        const card = createProductCard(product);
        productsGrid.appendChild(card);
    });
}
```

**20.3のフィルタ表示：**
```javascript
// 条件に合う商品のみ表示
function renderFilteredProducts(filterFunction) {
    const filteredProducts = products.filter(filterFunction);
    
    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        productsGrid.appendChild(card);
    });
}
```

### 🎯 フィルタリングの3つの主要技術

1. **条件関数の作成**
   ```javascript
   // カテゴリフィルタ関数
   const filterByCategory = (category) => {
       return product => product.category === category;
   };
   
   // 価格フィルタ関数
   const filterByPrice = (minPrice, maxPrice) => {
       return product => product.price >= minPrice && product.price <= maxPrice;
   };
   ```

2. **フィルタの適用**
   ```javascript
   // フィルタ適用とレンダリング
   function applyFilter(filterType, filterValue) {
       let filteredProducts;
       
       if (filterType === 'category') {
           filteredProducts = products.filter(p => p.category === filterValue);
       } else if (filterType === 'price') {
           filteredProducts = products.filter(p => p.price <= filterValue);
       }
       
       renderProducts(filteredProducts);
   }
   ```

3. **UIとの連動**
   ```javascript
   // フィルタボタンのイベント処理
   filterButton.addEventListener('click', () => {
       applyFilter('category', 'fashion');
       updateFilterUI(filterButton);
   });
   ```

### 🚀 実用的なフィルタシステムの特徴

- **多重フィルタ**: カテゴリと価格を同時にフィルタ可能
- **状態管理**: 現在のフィルタ状態を保持・表示
- **パフォーマンス**: 効率的なフィルタ処理
- **ユーザビリティ**: 直感的で分かりやすい操作

### 💡 フィルタリングによるUX向上

1. **検索効率の向上**
   - 8商品から目的の商品を素早く発見
   - カテゴリと価格の組み合わせで精密な絞り込み

2. **視覚的分かりやすさ**
   - 選択中のフィルタがハイライト表示
   - フィルタ結果数の即座な表示

3. **操作の直感性**
   - ワンクリックでフィルタ適用
   - 「すべて」ボタンで簡単にリセット

### 🎨 8商品システムの特徴

```javascript
// 20.3での商品データ構造（2商品追加）
const products = [
    // 20.2からの6商品 + 新規2商品
    {
        id: 7,
        name: "バックパック",
        category: "accessories", 
        price: 6800,
        description: "通学・通勤に最適な大容量リュック",
        emoji: "🎒"
    },
    {
        id: 8,
        name: "Bluetooth スピーカー", 
        category: "electronics",
        price: 4500,
        description: "高音質でポータブルなワイヤレススピーカー",
        emoji: "🔊"
    }
];
```

---

### 💻 実習の進め方

1. **20.2の復習**: 動的HTML生成システムの確認
2. **filter()体験**: コンソールでフィルタ操作を実際に体験
3. **カテゴリフィルタ**: カテゴリ別の商品絞り込みを操作
4. **価格フィルタ**: 価格帯による絞り込みを体験
5. **組み合わせ**: カテゴリ + 価格での複合フィルタを確認
6. **結果確認**: フィルタ結果数と統計情報の変化を観察

**重要**: 今回は「filter()によるデータフィルタリング」に集中し、20.2の動的HTML生成知識を確実に活用しながら新しい技術を習得しましょう！

---

## 🎉 完成時の達成感

- ✅ **filter()メソッド**をマスターし、条件に応じたデータ絞り込みが可能に
- ✅ **20.2の動的生成 + 20.3のフィルタリング**で本格的な商品検索システムの基盤を構築
- ✅ **8商品システム**による多様なフィルタリング体験
- ✅ **カテゴリ×価格の複合フィルタ**で実用的な検索機能を実装
- ✅ **20.4でのソート機能**への確実な準備が完了
- ✅ **実際のECサイトと同じ検索体験**を提供できる満足感