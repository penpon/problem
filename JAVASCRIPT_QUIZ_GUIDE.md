# JavaScriptクイズ問題作成ガイドライン

## 📋 概要

このドキュメントは、quiz-data/categories/javascript配下でJavaScriptクイズ問題を作成・編集する際のコードフォーマットルールと品質基準を定めています。

## 🎯 基本原則

### 1. **視認性の最優先**
- 学習者がコードの構造を一目で理解できること
- 適切な改行とインデントにより、コードの階層構造を明確にすること

### 2. **学習効果の重視**
- 正しいコーディング習慣を身につけられる形式にすること
- 実際の開発で使用される標準的なフォーマットに準拠すること

### 3. **一貫性の維持**
- 全ての問題で統一されたフォーマット規則を適用すること

## 📏 コードフォーマット規則

### 🔧 基本ルール

#### 1. **ブロック文の改行**
```json
// ❌ 悪い例
"text": "if (condition) { statement1; statement2; }"

// ✅ 良い例  
"text": "if (condition) {\n    statement1;\n    statement2;\n}"
```

#### 2. **インデント**
- **スペース4個**を使用
- タブ文字は使用しない

#### 3. **改行が必要なパターン**

**if文:**
```json
"text": "if (score >= 80) {\n    console.log('合格');\n}"
```

**for文:**
```json
"text": "for (let i = 0; i < 5; i++) {\n    console.log(i);\n}"
```

**while文:**
```json
"text": "while (i <= 5) {\n    console.log(i);\n    i++;\n}"
```

**function定義:**
```json
"text": "function greet(name) {\n    return 'Hello, ' + name;\n}"
```

**複数ステートメント:**
```json
"text": "let sum = 0;\nfor (let i = 0; i < numbers.length; i++) {\n    sum += numbers[i];\n}\nconsole.log(sum);"
```

### 🎨 フィールド別ガイドライン

#### 1. **choices[].text**（最重要）
選択肢のコードは学習者が最も注目する部分です。

```json
"choices": [
  {
    "id": "A",
    "text": "for (let i = 0; i < array.length; i++) {\n    console.log(array[i]);\n}"
  },
  {
    "id": "B", 
    "text": "for (let i = 1; i <= array.length; i++) {\n    console.log(array[i]);\n}"
  }
]
```

#### 2. **explanation.example**
詳細な解説では、より実践的な例を示します。

```json
"example": "const numbers = [1, 2, 3, 4, 5];\nlet sum = 0;\n\nfor (let i = 0; i < numbers.length; i++) {\n    sum += numbers[i];\n    // 各ステップで合計を更新\n}\n\nconsole.log('合計:', sum);\n// 合計: 15"
```

#### 3. **question.visual.content**
問題文内のコード例も適切に改行します。

```json
"visual": {
  "type": "code_editor",
  "content": "const products = [\n  { name: 'ペン', price: 500 },\n  { name: 'ノート', price: 1200 }\n];\n\n// 価格が1000円以上の商品を表示\n_"
}
```

## 🚫 避けるべきパターン

### 1. **1行にまとめられた複雑なコード**
```json
// ❌ 絶対に避ける
"text": "for (let i = 0; i < data.length; i++) { if (data[i].price >= 1000) { console.log(data[i].name); } }"

// ✅ 正しい形式
"text": "for (let i = 0; i < data.length; i++) {\n    if (data[i].price >= 1000) {\n        console.log(data[i].name);\n    }\n}"
```

### 2. **不一貫なインデント**
```json
// ❌ 悪い例
"text": "if (condition) {\nconsole.log('test');\n  return true;\n}"

// ✅ 良い例
"text": "if (condition) {\n    console.log('test');\n    return true;\n}"
```

## ✅ 品質チェックリスト

新しい問題を作成・編集する際は、以下を確認してください：

### 📝 必須チェック項目

- [ ] **複数行コード**: セミコロンが2個以上ある場合は改行されているか
- [ ] **ブロック構文**: `{}`を含むif/for/while/function文が適切に改行されているか  
- [ ] **インデント**: 4スペースで統一されているか
- [ ] **一貫性**: 同じレベルの問題で同じフォーマット規則が適用されているか

### 🎯 推奨チェック項目

- [ ] **可読性**: 初心者でもコードの構造が理解しやすいか
- [ ] **実用性**: 実際の開発でも使用される標準的な書き方か
- [ ] **学習効果**: 正しいコーディング習慣が身につく形式か

## 🔧 レベル別の特別な考慮事項

### Basic レベル
- 単純な構文でも改行を徹底
- 学習者が構文の構造を理解しやすいように

```json
// Basic: シンプルなif文でも改行
"text": "if (age >= 18) {\n    console.log('大人');\n}"
```

### Intermediate レベル  
- より複雑な処理でも見やすく
- ネストした構造も適切にインデント

```json
// Intermediate: コールバック関数も改行
"text": "processData(10, function(result) {\n    console.log(result);\n});"
```

### Advanced レベル
- 実践的なコード例を意識
- 複数の概念が組み合わさった場合も明確に

```json
// Advanced: 複雑な処理も構造化
"text": "cart.filter(item => item.price > 1000)\n    .map(item => ({\n        name: item.name,\n        discountPrice: item.price * 0.9\n    }));"
```

## 🛠️ ツールとヘルパー

### JSONエスケープ
改行文字 `\n` を忘れずに使用してください。

```json
// 改行を含むテキストのJSONエスケープ例
"text": "for (let i = 0; i < 5; i++) {\n    console.log(i);\n}"
```

### エディタ設定推奨
- インデント: スペース4個
- 改行コード: LF
- 文字コード: UTF-8

## 📚 参考資料

- [JavaScript Standard Style](https://standardjs.com/)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Prettier Code Formatter](https://prettier.io/)

## 🔄 継続的改善

このガイドラインは、学習者からのフィードバックや新しいベストプラクティスに基づいて定期的に更新されます。

問題作成時に疑問が生じた場合は、**学習者の視認性と理解しやすさを最優先**に判断してください。

---

📅 作成日: 2025-08-22  
📝 最終更新: 2025-08-22  
🎯 対象: quiz-data/categories/javascript配下の全問題