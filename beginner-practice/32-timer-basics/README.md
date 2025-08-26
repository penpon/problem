# ステップ17.4a - タイマー基礎

## 🎯 学習目標

**setTimeout と setInterval の基本概念と基本操作**

- `setTimeout()` - 指定時間後に1回だけ実行
- `setInterval()` - 指定間隔で繰り返し実行  
- `clearTimeout()` / `clearInterval()` - タイマーの停止
- 基本的なタイマー管理 - 開始・停止・リセット

## 📖 このステップの内容

### ⏰ JavaScript の時間制御入門

このステップでは、JavaScriptの**時間制御**の基本である`setTimeout`と`setInterval`を学習します。

これまでのクリック操作による即座の変更から、**時間の経過**に基づく自動的な処理へとステップアップします。

### 📝 学習ポイント

#### 1. setTimeout（単発実行）
```javascript
// 基本的な使い方
setTimeout(function() {
    console.log("3秒後に実行されました");
}, 3000);

// アロー関数での書き方
setTimeout(() => {
    alert("5秒後にアラート表示");
}, 5000);

// 戻り値を使った停止
let timeoutId = setTimeout(() => {
    console.log("実行されるかもしれません");
}, 10000);

// 必要に応じて停止
clearTimeout(timeoutId);
```

#### 2. setInterval（繰り返し実行）
```javascript
// 1秒ごとに繰り返し実行
let intervalId = setInterval(function() {
    console.log("1秒ごとに実行: " + new Date().toLocaleTimeString());
}, 1000);

// 停止する場合
setTimeout(() => {
    clearInterval(intervalId);
    console.log("インターバル停止");
}, 10000); // 10秒後に停止
```

#### 3. 基本的なタイマー管理
```javascript
let startTime = Date.now();
let timerInterval = null;

// タイマー開始
function startTimer() {
    timerInterval = setInterval(function() {
        let elapsed = Date.now() - startTime;
        updateDisplay(elapsed);
    }, 1000); // 1秒ごとに更新
}

// タイマー停止
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}
```

## ⏰ 実装されている機能

### 4つの基本タイマー操作

1. **▶️ タイマー開始**: setIntervalで1秒ごとに時間を更新
2. **⏸️ タイマー停止**: clearIntervalでタイマーを停止
3. **🔄 リセット**: タイマーを00:00:00に戻す
4. **⏳ 3秒遅延実行**: setTimeoutで3秒後にメッセージ表示

## 🔍 コードの詳細解説

### 基本タイマーシステム
```javascript
// グローバル変数
let startTime = 0;        // 開始時刻
let elapsedTime = 0;      // 経過時間
let timerInterval = null; // インターバルID
let isRunning = false;    // 実行状態

// タイマー開始
function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime; // 再開時の時刻調整
        isRunning = true;
        
        // 1秒ごとにupdateTimerDisplay実行
        timerInterval = setInterval(updateTimerDisplay, 1000);
    }
}

// タイマー停止
function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        timerInterval = null;
    }
}
```

### 時間フォーマット
```javascript
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    // ゼロパディング（2桁表示）
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
```

### 遅延実行システム
```javascript
function delayedExecution() {
    // カウントダウン表示
    let countdown = 3;
    const countdownInterval = setInterval(() => {
        countdown--;
        updateCountdownDisplay(countdown);
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
    
    // 3秒後に実行
    setTimeout(() => {
        showMessage("3秒経過しました！");
        console.log("setTimeout による遅延実行完了");
    }, 3000);
}
```

## 🏃‍♀️ 実行方法

1. `index.html`をブラウザで開く
2. **タイマー開始**ボタンをクリックして時間が進むことを確認
3. **タイマー停止**ボタンで停止、再度開始で続きから再開
4. **リセット**ボタンで00:00:00に戻る
5. **3秒遅延実行**ボタンを複数回押してsetTimeoutの動作確認
6. 開発者ツール（F12）でConsoleタブのログを確認

## ✅ 確認ポイント

このステップが完了したら、以下を確認してください：

- [ ] タイマー開始で時間が1秒ごとに進むことを確認した
- [ ] タイマー停止で時間が止まることを確認した  
- [ ] 停止後に開始すると続きから再開することを確認した
- [ ] リセットで時間が00:00:00に戻ることを確認した
- [ ] 3秒遅延実行でカウントダウンと実行メッセージを確認した
- [ ] 3秒遅延実行を連続で押した時の動作を確認した
- [ ] コンソールでタイマー処理のログを確認した

### 期待される動作例
- **タイマー開始**: 「00:00:01」「00:00:02」と時間が進む
- **タイマー停止**: 時間が停止し、メッセージが「停止中」に変わる
- **リセット**: 時間が「00:00:00」に戻り、停止状態になる
- **3秒遅延実行**: カウントダウン「3→2→1→完了」後にメッセージ表示

## 🎨 追加で試してみよう

慣れてきたら、開発者ツールのコンソールで以下を実行してみましょう：

### 1. カスタムタイマー
```javascript
// 5秒後にアラート
let customAlert = setTimeout(() => {
    alert("カスタム5秒タイマー完了！");
}, 5000);

// キャンセルしたい場合
// clearTimeout(customAlert);
```

### 2. 現在時刻表示
```javascript
let timeInterval = setInterval(() => {
    console.log("現在時刻: " + new Date().toLocaleTimeString());
}, 1000);

// 10秒後に停止
setTimeout(() => {
    clearInterval(timeInterval);
    console.log("時刻表示を停止しました");
}, 10000);
```

### 3. カウントアップ
```javascript
let count = 0;
let countInterval = setInterval(() => {
    count++;
    console.log(`カウント: ${count}`);
    
    if (count >= 5) {
        clearInterval(countInterval);
        console.log("カウント完了");
    }
}, 1000);
```

## 💡 setTimeout と setInterval の重要なポイント

### 実行タイミング
```javascript
console.log("1. 即座に実行");

setTimeout(() => {
    console.log("3. 1秒後に実行");
}, 1000);

console.log("2. これも即座に実行");

// 出力順序: 1 → 2 → 3
```

### 戻り値の活用
```javascript
// IDを保存して後で停止可能
let timerId = setTimeout(() => {
    console.log("このメッセージは表示されません");
}, 5000);

// 2秒後に停止
setTimeout(() => {
    clearTimeout(timerId);
    console.log("タイマーをキャンセルしました");
}, 2000);
```

### インターバル管理の重要性
```javascript
// ✅ 正しい方法
let intervalId = setInterval(() => {
    // 処理
}, 1000);

// 必ず適切なタイミングで停止
setTimeout(() => {
    clearInterval(intervalId);
}, 10000);

// 🚨 間違った方法（停止処理なし）
// メモリリークの原因になる
setInterval(() => {
    // 処理
}, 100); // 永続的に実行され続ける
```

## 💡 実世界での活用例

### Webアプリケーション
- **時計表示**: 1秒ごとに現在時刻更新
- **自動保存**: 30秒ごとにデータ保存
- **セッション管理**: 30分後に自動ログアウト
- **ポーリング**: 5秒ごとに新着データチェック

### ユーザーインターフェース
- **ツールチップ**: 2秒後に自動非表示
- **自動スクロール**: 3秒ごとに次のコンテンツ表示
- **プログレスバー**: 0.1秒ごとに進捗更新
- **フラッシュメッセージ**: 5秒後に自動消去

## 📈 次のステップ（17.4b）への準備

このステップをマスターしたら、次は**17.4b-timer-animation**に進みます：

- タイマーとCSSアニメーションの組み合わせ
- 視覚的なアニメーション効果
- より複雑なタイミング制御
- 17.4aで学んだ基礎知識の応用

---

**💡 基本タイマー操作の習得完了**

`setTimeout`と`setInterval`はJavaScript開発の基礎中の基礎です。

これらの概念を理解することで：
- 非同期処理の基本的な考え方が身につく
- イベント駆動プログラミングの理解が深まる  
- リアルタイムなWebアプリケーションの実装が可能になる

**時間をコントロールする力を手に入れました！** 次のステップでは、この知識をベースにより魅力的なアニメーション機能を実装していきます。