# 25.1-modal-display-basic：基本的なモーダル表示・非表示

## 🎯 学習目標
このステップでは、モーダルウィンドウ（ポップアップ）の基本的な表示・非表示機能を実装します。ボタンをクリックしてモーダルを開き、×ボタンで閉じる基本的な操作を学びます。

### 具体的に身につくスキル
- モーダルウィンドウの基本構造
- CSSでのオーバーレイ作成
- JavaScriptでの要素の表示・非表示制御
- `position: fixed`を使った画面固定レイアウト

## 📖 学習内容

### 今回学ぶ新しい概念
**モーダルウィンドウ** - 画面上に重なって表示されるポップアップ
- 他の操作をブロックする仕組み
- オーバーレイ（背景の半透明レイヤー）
- Z-index を使った重なり順の制御

**CSS Position** - 要素の配置方法
- `position: fixed` - 画面に固定
- `position: absolute` - 親要素を基準に配置
- `z-index` - 重なり順の指定

### 実装する機能
1. **モーダル表示ボタン**
   - ボタンクリックでモーダルを開く

2. **基本的なモーダル構造**
   - オーバーレイ（背景）
   - モーダル本体（コンテンツエリア）
   - ×ボタン（閉じるボタン）

3. **表示・非表示機能**
   - モーダルの表示と非表示の切り替え
   - スムーズなアニメーション効果

## 📝 学習ポイント

### 💡 モーダルの基本HTML構造
```html
<!-- モーダルを開くボタン -->
<button id="open-modal-btn" class="open-btn">モーダルを開く</button>

<!-- モーダル本体 -->
<div id="modal" class="modal" style="display: none;">
  <!-- オーバーレイ（背景） -->
  <div class="modal-overlay"></div>
  
  <!-- モーダルコンテンツ -->
  <div class="modal-content">
    <span class="close-btn">&times;</span>
    <h2>モーダルタイトル</h2>
    <p>ここにモーダルの内容が入ります。</p>
  </div>
</div>
```

### 💡 モーダル表示・非表示のJavaScript
```javascript
// モーダル要素を取得
const modal = document.getElementById('modal');
const openBtn = document.getElementById('open-modal-btn');
const closeBtn = document.querySelector('.close-btn');

// モーダルを開く
function openModal() {
  modal.style.display = 'block';
}

// モーダルを閉じる
function closeModal() {
  modal.style.display = 'none';
}

// イベントリスナーを設定
openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
```

### 💡 モーダルのCSS基本スタイル
```css
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}
```

## 🔍 詳細解説

### Step 1: 完全なHTML構造
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>25.1 基本モーダル表示</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>モーダルウィンドウの基本</h1>
    <p>下のボタンをクリックしてモーダルを表示してみましょう。</p>
    
    <button id="open-modal-btn" class="open-btn">📱 モーダルを開く</button>
  </div>

  <!-- モーダルウィンドウ -->
  <div id="modal" class="modal" style="display: none;">
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <h2>🎉 モーダルウィンドウ</h2>
      <p>これがモーダルウィンドウです！</p>
      <p>他の要素をクリックできなくなり、このウィンドウに集中できます。</p>
      <div class="modal-actions">
        <button class="btn-primary">OK</button>
        <button id="cancel-btn" class="btn-secondary">キャンセル</button>
      </div>
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>
```

### Step 2: モーダルのCSSスタイル
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #f0f2f5;
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

p {
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
}

.open-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.open-btn:hover {
  background-color: #2980b9;
}

/* モーダルのスタイル */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.modal.show {
  opacity: 1;
  visibility: visible;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  line-height: 1;
}

.close-btn:hover {
  color: #333;
}

.modal-content h2 {
  color: #333;
  margin-bottom: 15px;
}

.modal-content p {
  margin-bottom: 15px;
  text-align: left;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.btn-primary {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #229954;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}
```

### Step 3: JavaScriptでモーダル制御
```javascript
// DOM要素を取得
const modal = document.getElementById('modal');
const openBtn = document.getElementById('open-modal-btn');
const closeBtn = document.querySelector('.close-btn');
const cancelBtn = document.getElementById('cancel-btn');

// モーダルを開く関数
function openModal() {
  modal.style.display = 'block';
  // アニメーション用のクラスを追加（少し遅らせて）
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
  
  // bodyのスクロールを無効にする
  document.body.style.overflow = 'hidden';
}

// モーダルを閉じる関数
function closeModal() {
  modal.classList.remove('show');
  
  // アニメーション完了後にdisplay: noneにする
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
  
  // bodyのスクロールを有効にする
  document.body.style.overflow = 'auto';
}

// イベントリスナーを設定
openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

// ESCキーでモーダルを閉じる
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    closeModal();
  }
});
```

## 🚀 実装のコツ

### 1. レイアウト
- `position: fixed` でモーダルを画面に固定
- `z-index` でモーダルを最前面に表示
- `transform: translate(-50%, -50%)` で中央配置

### 2. ユーザビリティ
- アニメーションで滑らかな表示・非表示
- ESCキーでも閉じることができる
- bodyのスクロールを制御

### 3. アクセシビリティ
- 適切なフォーカス管理（今後のステップで詳しく学習）
- キーボード操作対応

## ✅ 完成チェックリスト
- [ ] ボタンクリックでモーダルが表示される
- [ ] ×ボタンでモーダルが閉じる
- [ ] キャンセルボタンでモーダルが閉じる
- [ ] ESCキーでモーダルが閉じる
- [ ] モーダル表示中は背景がスクロールしない
- [ ] アニメーション効果が正しく動作する
- [ ] レスポンシブデザインで表示される

## 🔗 次のステップ
基本的なモーダル表示をマスターしたら、次は「25.2-modal-background-close」で背景（オーバーレイ）をクリックしてモーダルを閉じる機能を学びます。より使いやすいモーダルUIを完成させていきます。

---
**💻 モーダルは現代のWebUIに欠かせない要素です。基本をしっかり押さえましょう！**