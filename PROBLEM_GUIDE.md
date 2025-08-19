# 📝 問題追加ガイド

## 📁 ファイル構造

```
problems/
├── index.json              # 問題一覧メタデータ
├── object/                 # オブジェクト問題（practice1-5）
├── function/               # 関数問題（practice1-20）
└── array/                  # 配列問題（practice1-10）
```

## 🆕 既存カテゴリに問題を追加

### 手順1: 問題ファイルの作成

```bash
# 配列カテゴリに11番目の問題を追加する例
# まず現在の問題数を確認
ls problems/array/ | wc -l  # 現在10問

# 新しい問題ファイルを作成（11番目）
touch problems/array/practice11.json
```

### 手順2: 問題内容の作成

```json
{
  "id": "array/practice11",
  "title": "練習問題36：sortメソッドの基本",
  // タイトル番号の計算: オブジェクト5問 + 関数20問 + 配列10問 + 新問題1 = 36
  "description": "配列を並び替えるsortメソッドの使い方を学習します。",
  "instructions": [
    "sortメソッドは配列の要素を並び替えます。",
    "numbers.sort()で昇順に並び替えられます。"
  ],
  "template": "// 問題11: sortメソッドの基本\\n// 配列 numbers を昇順に並び替えてください\\n\\nlet numbers = [3, 1, 4, 1, 5];\\n\\n// ここにコードを書いてください\\n// sortメソッドを使って並び替え\\n\\nconsole.log(numbers);",
  "testCases": [
    {
      "name": "基本ケース",
      "variables": { "numbers": [3, 1, 4, 1, 5] },
      "expectedOutput": "[1,1,3,4,5]"
    },
    {
      "name": "異なる数値の場合",
      "variables": { "numbers": [9, 2, 5, 8] },
      "expectedOutput": "[2,5,8,9]"
    }
  ],
  "expectedOutput": "[1,1,3,4,5]",
  "testVariables": { "numbers": [3, 1, 4, 1, 5] },
  "points": 100
}
```

### 手順3: index.jsonの更新

```json
{
  "version": "1.0.0",
  "problems": [
    // 既存の問題...
    {
      "id": "array/practice11",
      "title": "練習問題36：sortメソッドの基本",
      "category": "配列",
      "difficulty": "初級",
      "points": 100
    }
  ]
}
```

## 🆕 新しいカテゴリを追加

### 手順1: カテゴリディレクトリの作成

```bash
# 条件分岐カテゴリを追加する例
mkdir problems/conditional
```

### 手順2: 最初の問題ファイルの作成

```json
{
  "id": "conditional/practice1",
  "title": "練習問題37：if文の基本",
  "description": "if文を使った条件分岐の基本を学習します。",
  "instructions": [
    "if文は条件に応じて処理を分岐させます。",
    "if (条件) { 処理 } の形で記述します。"
  ],
  "template": "// 問題1: if文の基本\\n// 年齢が18歳以上かどうかを判定してください\\n\\nlet age = 20;\\n\\n// ここにコードを書いてください\\n// if文を使って判定\\n\\nif (/* ここに条件を書く */) {\\n    console.log(\"成人です\");\\n} else {\\n    console.log(\"未成年です\");\\n}",
  "testCases": [
    {
      "name": "成人の場合",
      "variables": { "age": 20 },
      "expectedOutput": "成人です"
    },
    {
      "name": "未成年の場合",
      "variables": { "age": 15 },
      "expectedOutput": "未成年です"
    }
  ],
  "expectedOutput": "成人です",
  "testVariables": { "age": 20 },
  "points": 100
}
```

### 手順3: index.jsonに新カテゴリを追加

```json
{
  "version": "1.0.0",
  "problems": [
    // 既存の問題...
    {
      "id": "conditional/practice1",
      "title": "練習問題37：if文の基本",
      "category": "条件分岐",
      "difficulty": "初級",
      "points": 100
    }
  ]
}
```

## 📋 問題作成時のルール

### 必須フィールド
- `id`: カテゴリ名/practice番号
- `title`: 問題のタイトル
- `description`: 問題の説明
- `instructions`: 実装のポイント（配列）
- `template`: コードテンプレート
- `testCases`: テストケース（最大5個）
- `expectedOutput`: 期待される出力
- `testVariables`: テスト用変数
- `points`: 配点（通常100）

### 命名規則
- **IDフォーマット**: `カテゴリ名/practice番号`
- **連番管理**: 各カテゴリ内で1から連番
- **ファイル名**: `practice番号.json`

### 🚨 表記統一ルール（重要）

#### titleフィールドの表記
- **必須**: 「問題X」形式を使用（「練習問題X」は禁止）
- **形式**: `"title": "問題X：具体的なタイトル"`
- **問題番号**: ファイル名の番号と一致させる
  ```json
  // practice1.json の場合
  "title": "問題1：関数の基本呼び出し"  // ✅ 正しい
  "title": "練習問題1：関数の基本呼び出し"  // ❌ 禁止
  ```

#### templateフィールドの表記
- **コメント行**: 「// 問題X:」形式を使用
- **問題番号**: ファイル名の番号と一致させる
- **titleとの整合性**: titleの番号と必ず一致させる
  ```json
  // practice1.json の場合
  "template": "// 問題1: 関数の基本呼び出し\\n..."  // ✅ 正しい
  "template": "// 問題6: 関数の基本呼び出し\\n..."  // ❌ 禁止
  ```

#### 番号統一チェックリスト
- [ ] ファイル名（practiceX.json）の番号
- [ ] titleの問題番号
- [ ] templateのコメント番号
- [ ] 上記3つが全て同一の番号になっている

#### カテゴリ別の番号ルール
- **object**: practice1.json → 問題1, practice2.json → 問題2...
- **function**: practice1.json → 問題1, practice2.json → 問題2...
- **array**: practice1.json → 問題1, practice2.json → 問題2...
- **general**: practice1.json → 問題1, practice2.json → 問題2...

### テストケース作成のポイント
1. **基本ケース**: 標準的な入力での動作確認
2. **境界値ケース**: エッジケースでの動作確認
3. **異なるデータケース**: 様々な入力パターンでの動作確認
4. **エラーケース**: 異常系での動作確認（必要に応じて）

## 🚀 デプロイ手順

```bash
# 1. ファイルをGitに追加
git add problems/

# 2. コミット
git commit -m "Add new problem: [問題名]"

# 3. プッシュ
git push

# 4. GitHub Pagesで自動的に反映される
```

## ⚡ 自動反映システム

- 新しいカテゴリは自動的にタブとして表示される
- 問題はカテゴリ内で自動的にリスト表示される
- ブラウザキャッシュの影響で反映が遅れる場合は、キャッシュをクリアする

## 🔍 動作確認

1. **ローカル確認**: `grader.html`をブラウザで開いて動作確認
2. **カテゴリ表示**: 新しいタブが表示されることを確認
3. **問題実行**: 問題が正しく実行されることを確認
4. **テストケース**: 全てのテストケースが通ることを確認

## ❗ 注意事項

- **index.json更新必須**: 問題ファイルを作成しただけでは表示されない
- **IDの重複禁止**: 既存のIDと重複しないよう注意
- **文字エスケープ**: templateフィールドでは`\\n`で改行を表現
  ```
  実際の改行 → \\n
  例: "let x = 1;\nconsole.log(x);" → "let x = 1;\\nconsole.log(x);"
  ```
- **JSONフォーマット**: 正しいJSON形式で記述（最後のカンマに注意）
- **問題番号計算**: タイトルの練習問題番号 = 全カテゴリの累計問題数 + 1
