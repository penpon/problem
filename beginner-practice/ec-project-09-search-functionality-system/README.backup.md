# 20.5 検索機能システム - テキスト検索入門

## 🎯 学習目標

**20.4のソート技術を基盤として、JavaScriptのincludes()メソッドによるテキスト検索機能を習得**

20.4で身につけた「フィルタ + ソート技術」を活用し、今度は「キーワードによる商品検索技術」を学習します。10商品から12商品への拡張と、商品名・説明文での部分一致検索機能を通じて、実際のECサイトで使われる商品検索システムの基礎を確実に身につけます。

## 📖 学習内容

### ✨ 実装する14の機能（20.4 + 新機能2つ）

#### 20.4から継続する機能
1. **動的HTML生成システム** - テンプレート関数による商品カード自動作成（基盤）
2. **商品データ拡張管理** - 12商品の効率的な表示・管理（拡張）
3. **カテゴリフィルタシステム** - カテゴリ別の商品絞り込み機能（基盤）
4. **価格帯フィルタシステム** - 価格範囲による商品絞り込み機能（基盤）
5. **価格ソートシステム** - 価格の安い順・高い順での並び替え（基盤）
6. **多軸ソートシステム** - いいね順・名前順・追加順での並び替え（基盤）
7. **統計の集約表示** - 全商品・処理結果の情報統合（基盤）
8. **データ永続化** - フィルタ・ソート・検索状態の保存・読み込み（拡張）
9. **個別いいね機能** - 各商品独立のいいね操作（基盤）
10. **レスポンシブ対応** - 画面サイズに応じた最適な表示（基盤）
11. **処理統計表示** - 複合処理結果の詳細統計（基盤）
12. **リセット機能** - 全処理状態の初期化（基盤）

#### 今回の新機能（検索）
13. **テキスト検索システム** - 商品名・説明文での部分一致検索
14. **リアルタイム検索システム** - 入力と同時に検索結果が更新

### 🎨 デザインの特徴

- **直感的な検索UI**: 検索ボックスによる分かりやすい検索操作
- **3つの機能連動**: フィルタ・ソート・検索の同時適用
- **リアルタイム更新**: 入力と同時に検索結果が更新
- **検索結果ハイライト**: 検索キーワードの強調表示

## 📝 学習ポイント

### 🔧 今回のメイン学習テーマ: includes()によるテキスト検索

1. **テキスト検索とは何か？**
   - 文字列の中から指定したキーワードを見つける技術
   - `product.name.includes('キーワード')` で商品名にキーワードが含まれるか判定
   - 大文字・小文字を区別しない検索も可能

2. **なぜテキスト検索を使うのか？**
   - **利便性**: 商品名や特徴から目的の商品を素早く発見
   - **柔軟性**: 部分的な記憶でも商品を見つけられる
   - **実用性**: 実際のECサイトでは最も重要な機能の一つ

3. **includes()メソッドの基本パターン**
   ```javascript
   // 1. 基本的な検索
   const found = product.name.includes('Tシャツ');
   
   // 2. 大文字・小文字を無視した検索
   const foundIgnoreCase = product.name.toLowerCase().includes('tシャツ'.toLowerCase());
   
   // 3. 複数フィールドでの検索
   const foundInMultiple = product.name.includes(keyword) || 
                          product.description.includes(keyword);
   ```

### 💡 20.4からの発展ポイント

- **フィルタ+ソート（20.4）** + **テキスト検索（20.5）** = **完全な商品検索システム**
- **10商品システム** → **12商品の多様な検索体験**
- **カテゴリ・価格による絞り込み** → **キーワードによる自由な商品発見**

## 🔍 詳細解説

### 🏗️ 20.4から20.5への技術発展

**20.4の基本的なフィルタ+ソート：**
```javascript
// フィルタリング後にソート
function processProducts() {
    const filtered = products.filter(filterFunction);
    const sorted = filtered.sort(sortFunction);
    return sorted;
}
```

**20.5のフィルタ+ソート+検索：**
```javascript
// フィルタリング、検索、ソートの統合処理
function processProducts() {
    let processed = products.filter(filterFunction);
    processed = processed.filter(searchFunction);
    processed = processed.sort(sortFunction);
    return processed;
}
```

### 🎯 テキスト検索の4つの主要技術

1. **基本検索関数の作成**
   ```javascript
   // 商品名での検索
   const searchByName = (keyword) => {
       return product => product.name.toLowerCase().includes(keyword.toLowerCase());
   };
   
   // 説明文での検索
   const searchByDescription = (keyword) => {
       return product => product.description.toLowerCase().includes(keyword.toLowerCase());
   };
   ```

2. **複合検索の実装**
   ```javascript
   // 複数フィールドでの検索
   function createSearchFunction(keyword) {
       if (!keyword.trim()) return () => true;
       
       const normalizedKeyword = keyword.toLowerCase().trim();
       
       return product => {
           return product.name.toLowerCase().includes(normalizedKeyword) ||
                  product.description.toLowerCase().includes(normalizedKeyword) ||
                  product.category.toLowerCase().includes(normalizedKeyword);
       };
   }
   ```

3. **リアルタイム検索の実装**
   ```javascript
   // 入力イベントでリアルタイム検索
   searchInput.addEventListener('input', (e) => {
       currentSearch = e.target.value;
       debounceSearch();
   });
   
   // デバウンス処理で性能向上
   function debounceSearch() {
       clearTimeout(searchTimeout);
       searchTimeout = setTimeout(() => {
           renderProcessedProducts();
       }, 300);
   }
   ```

4. **検索結果のハイライト**
   ```javascript
   // 検索キーワードをハイライト表示
   function highlightKeyword(text, keyword) {
       if (!keyword.trim()) return text;
       
       const regex = new RegExp(keyword, 'gi');
       return text.replace(regex, `<mark>${keyword}</mark>`);
   }
   ```

### 🚀 実用的な検索システムの特徴

- **トリプル処理**: フィルタ・検索・ソートの統合適用
- **部分一致**: キーワードの一部でも検索可能
- **大文字小文字無視**: ユーザーフレンドリーな検索
- **複数フィールド**: 名前・説明・カテゴリでの横断検索

### 💡 検索によるUX向上

1. **発見の容易性**
   - 「イヤホン」で音楽関連商品を検索
   - 「軽量」で軽い商品を検索

2. **記憶に頼らない検索**
   - 商品名を正確に覚えていなくても発見可能
   - 特徴や用途からの検索

3. **効率的な商品選択**
   - フィルタで絞り込み、検索で特定、ソートで最適化
   - 3段階の検索プロセス

### 🎨 12商品システムの特徴

```javascript
// 20.5での商品データ構造（2商品追加）
const products = [
    // 20.4からの10商品 + 新規2商品
    {
        id: 11,
        name: "モバイル バッテリー",
        category: "electronics",
        price: 3800,
        description: "大容量10000mAh急速充電対応ポータブル充電器",
        emoji: "🔋"
    },
    {
        id: 12,
        name: "カシミア マフラー",
        category: "fashion",
        price: 9800,
        description: "上質なカシミア100%の暖かいマフラー",
        emoji: "🧣"
    }
];
```

### 🎯 検索機能の特徴

1. **商品名検索**
   - 「バッグ」→「バックパック」がヒット
   - 「マウス」→「ワイヤレス マウス」がヒット

2. **説明文検索**
   - 「軽量」で該当商品を検索
   - 「高音質」で音楽関連商品を検索

3. **カテゴリ検索**
   - 「electronics」でカテゴリ検索
   - 「fashion」でファッション商品検索

4. **部分一致検索**
   - 「シャツ」で「Tシャツ」を発見
   - 「イヤ」で「イヤホン」を発見

---

### 💻 実習の進め方

1. **20.4の復習**: フィルタ+ソート機能の確認
2. **includes()体験**: コンソールで検索操作を実際に体験
3. **商品名検索**: 商品名での部分一致検索を操作
4. **説明文検索**: 商品説明での特徴検索を体験
5. **複合処理**: フィルタ+検索+ソートの組み合わせを確認
6. **リアルタイム**: 入力と同時の検索結果更新を体験

**重要**: 今回は「includes()によるテキスト検索」に集中し、20.4のフィルタ+ソート知識を確実に活用しながら新しい技術を習得しましょう！

---

## 🎉 完成時の達成感

- ✅ **includes()メソッド**をマスターし、自由なキーワード検索が可能に
- ✅ **20.4のフィルタ+ソート + 20.5のテキスト検索**で本格的な商品検索システムを完成
- ✅ **12商品システム**による多様な検索体験
- ✅ **フィルタ×ソート×検索の3軸処理**で実用的な検索機能を実装
- ✅ **20.6での統合ギャラリーシステム**への確実な準備が完了
- ✅ **実際のECサイトと同レベルの検索機能**を提供できる満足感