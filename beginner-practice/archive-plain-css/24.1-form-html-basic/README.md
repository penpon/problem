# 24.1-form-html-basic：基本フォームHTML作成

## 🎯 学習目標
このステップでは、ユーザー情報を入力するためのHTMLフォームの基本構造を作成します。セマンティックなHTML、フォーム要素の正しい使い方、ラベルとの関連付けを学びます。

### 具体的に身につくスキル
- HTMLフォーム要素の基本構造
- `<input>`, `<label>`, `<form>`の正しい使い方
- フォームフィールドのアクセシビリティ対応
- 基本的なCSSでのフォームスタイリング

## 📖 学習内容

### 今回学ぶ新しい概念
**HTMLフォーム** - ユーザーからの入力を受け取る仕組み
- `<form>`要素でフォーム全体を囲む
- `<input>`要素で様々なタイプの入力フィールドを作成
- `<label>`要素で入力フィールドにわかりやすいラベルを付ける

**セマンティックHTML** - 意味のある HTML構造
- 各要素の役割を明確にする
- スクリーンリーダーなどの支援技術に対応
- 保守しやすいコード構造

### 実装する機能
1. **ユーザー情報入力フォーム**
   - 氏名入力フィールド
   - メールアドレス入力フィールド 
   - パスワード入力フィールド
   - 送信ボタン

2. **アクセシビリティ対応**
   - `<label>`と`<input>`の関連付け
   - 適切な`input type`の使用
   - フィールドの必須表示

## 📝 学習ポイント

### 💡 基本的なフォーム構造
```html
<form>
  <div class="form-group">
    <label for="name">氏名</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div class="form-group">
    <label for="email">メールアドレス</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <div class="form-group">
    <label for="password">パスワード</label>
    <input type="password" id="password" name="password" required>
  </div>
  
  <button type="submit">登録する</button>
</form>
```

### 💡 なぜ`<label>`が重要？
- **アクセシビリティ**: スクリーンリーダーが入力フィールドの説明を読み上げる
- **ユーザビリティ**: ラベルをクリックすると入力フィールドにフォーカスが移る
- **保守性**: HTMLの構造が明確になる

### 💡 `input type`の種類と使い分け
- `type="text"` - 一般的なテキスト入力
- `type="email"` - メールアドレス入力（自動検証機能付き）
- `type="password"` - パスワード入力（文字が隠される）

## 🔍 詳細解説

### Step 1: HTMLフォームの基本構造
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>24.1 基本フォーム作成</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>ユーザー登録フォーム</h1>
    
    <form class="registration-form">
      <div class="form-group">
        <label for="name">氏名 <span class="required">*</span></label>
        <input type="text" id="name" name="name" required>
      </div>
      
      <div class="form-group">
        <label for="email">メールアドレス <span class="required">*</span></label>
        <input type="email" id="email" name="email" required>
      </div>
      
      <div class="form-group">
        <label for="password">パスワード <span class="required">*</span></label>
        <input type="password" id="password" name="password" required>
      </div>
      
      <button type="submit" class="submit-btn">登録する</button>
    </form>
  </div>
</body>
</html>
```

### Step 2: 基本的なCSSスタイリング
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
}

.container {
  max-width: 400px;
  margin: 0 auto;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.required {
  color: #e74c3c;
}

input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

input:focus {
  border-color: #3498db;
  outline: none;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #2980b9;
}
```

## 🚀 実装のコツ

### 1. セマンティックHTML
- `<form>`で全体を囲む
- `<label>`と`<input>`を正しく関連付ける（`for`属性と`id`属性）
- 適切な`input type`を使う

### 2. アクセシビリティ
- 必須フィールドを明確に表示する
- フォーカス時の視覚的フィードバック
- キーボードで操作できる

### 3. ユーザビリティ
- 分かりやすいラベル
- 適切な入力フィールドサイズ
- モバイルフレンドリーなデザイン

## 🎨 スタイリングのポイント

### フォームデザインの基本
- 十分な余白（padding、margin）
- 見やすいフォントサイズ（16px以上推奨）
- コントラストの良い色使い
- ホバー・フォーカス状態の表現

### レスポンシブ対応
- `max-width`でコンテンツ幅を制限
- `viewport`メタタグでモバイル対応
- フレキシブルな幅設定

## ✅ 完成チェックリスト
- [ ] フォームが正しく表示される
- [ ] 各入力フィールドにラベルが関連付けられている
- [ ] 必須フィールドが明確に表示されている
- [ ] フォーカス時に視覚的フィードバックがある
- [ ] モバイルでも見やすく表示される
- [ ] ボタンのホバー効果が動作する

## 🔗 次のステップ
基本的なHTMLフォームをマスターしたら、次は「24.2-input-validation-basic」で入力値の基本チェック機能を学びます。空文字チェックやシンプルな形式チェックを実装していきます。

---
**💻 アクセシブルなフォーム作成はWebの基本です。ユーザー全員が使いやすいフォームを心がけましょう！**