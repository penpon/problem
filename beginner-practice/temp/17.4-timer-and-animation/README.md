# ステップ17.4 - タイマーとアニメーション

## 🎯 学習目標

**時間ベースの動的コンテンツ操作**

- `setTimeout`と`setInterval`の使い方を学ぶ
- 時間ベースでのコンテンツ自動更新を理解する
- CSSアニメーションとJavaScriptの連携を習得する
- タイマー制御（開始・停止・リセット）システムを実装する

## 📖 このステップの内容

### ⏰ 時間制御システム

このステップでは、**時間の経過**に合わせてコンテンツを自動的に変更する高度なシステムを作成します。

これまで学んだユーザーのクリックによる変更から、**時間に基づく自動的な変更**へとレベルアップします。

### 📝 学習ポイント

#### 1. setTimeout（単発実行）
```javascript
// 3秒後に1回だけ実行
setTimeout(function() {
    console.log("3秒経過しました！");
}, 3000);

// アロー関数での書き方
setTimeout(() => {
    alert("5秒後に表示！");
}, 5000);
```

#### 2. setInterval（繰り返し実行）
```javascript
// 1秒ごとに繰り返し実行
let intervalId = setInterval(function() {
    console.log("1秒ごとに実行中...");
}, 1000);

// 停止する場合
clearInterval(intervalId);
```

#### 3. タイマーの制御
```javascript
let startTime = Date.now();
let timerInterval = null;

// 開始
function startTimer() {
    timerInterval = setInterval(function() {
        let elapsed = Date.now() - startTime;
        updateDisplay(elapsed);
    }, 100);
}

// 停止
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}
```

## ⏰ 実装されたタイマー機能

### 6つの時間制御システム

1. **▶️ 開始/再開**: タイマーを開始または一時停止から再開
2. **⏸️ 一時停止**: タイマーを一時停止（時間は保持）
3. **🔄 リセット**: タイマーを00:00:00に戻す
4. **⏳ カウントダウン**: 10秒からのカウントダウンタイマー
5. **🔔 定期実行**: 2秒ごとにアニメーション要素を移動
6. **🎨 自動変化**: 1秒ごとにテキスト・色・アニメーションを変更

### アニメーション連携機能

- **移動アニメーション**: 要素の位置を時間とともに変更
- **色変化**: 背景色のグラデーションを自動変更
- **テキスト切り替え**: 複数のメッセージをローテーション表示
- **CSSアニメーション**: bounce、rotate、pulseアニメーション

### 統計・進捗管理

- **総実行時間**: 累積実行時間の記録
- **操作回数統計**: 開始・停止・リセット回数
- **進捗バー**: 視覚的な進捗表示
- **リアルタイム状態**: 現在の動作状況表示

## 🔍 コードの詳細解説

### 基本タイマーシステム
```javascript
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime; // 一時停止からの再開に対応
        isRunning = true;
        
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            updateTimerDisplay();
        }, 100); // 0.1秒ごとに更新
    }
}

function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        timerInterval = null;
    }
}
```

### 時間フォーマット関数
```javascript
function formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
```

### カウントダウンシステム
```javascript
function startCountdown() {
    let countdown = 10;
    
    countdownInterval = setInterval(function() {
        countdown--;
        timerDisplay.textContent = "00:00:" + String(countdown).padStart(2, '0');
        
        // 進捗バー更新
        let progressPercent = ((10 - countdown) / 10) * 100;
        progressFill.style.width = progressPercent + '%';
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            countdownInterval = null;
            alert("⏰ タイマー終了！");
        }
    }, 1000);
}
```

### 定期実行システム
```javascript
function startPeriodicMovement() {
    movementInterval = setInterval(function() {
        // ランダムな位置に移動
        let maxX = animationArea.offsetWidth - 60;
        let maxY = animationArea.offsetHeight - 60;
        
        let randomX = Math.floor(Math.random() * maxX);
        let randomY = Math.floor(Math.random() * maxY);
        
        movingElement.style.left = randomX + 'px';
        movingElement.style.top = randomY + 'px';
        
        // 背景色もランダムに変更
        let colors = [
            'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
            'linear-gradient(135deg, #667eea, #764ba2)',
            // ... 他の色
        ];
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        movingElement.style.background = randomColor;
    }, 2000); // 2秒ごとに実行
}
```

### 自動変化システム
```javascript
function startAutoChange() {
    let changeCount = 0;
    
    autoChangeInterval = setInterval(function() {
        changeCount++;
        
        // テキスト変化
        let texts = ["✨ キラキラ効果中！", "🌈 虹色に変化中！", /* ... */];
        textChanger.textContent = texts[changeCount % texts.length];
        
        // 背景色変化
        let bgColors = [ /* 複数のグラデーション */ ];
        colorChanger.style.background = bgColors[changeCount % bgColors.length];
        
        // アニメーションクラス変化
        let animations = ['animate-bounce', 'animate-rotate', 'animate-pulse'];
        movingElement.className = 'moving-element ' + animations[changeCount % animations.length];
        
        // 10回で停止
        if (changeCount >= 10) {
            clearInterval(autoChangeInterval);
        }
    }, 1000);
}
```

### 安全なインターバル管理
```javascript
function clearAllIntervals() {
    if (timerInterval) clearInterval(timerInterval);
    if (countdownInterval) clearInterval(countdownInterval);
    if (movementInterval) clearInterval(movementInterval);
    if (autoChangeInterval) clearInterval(autoChangeInterval);
    
    // 変数をnullに設定
    timerInterval = null;
    countdownInterval = null;
    movementInterval = null;
    autoChangeInterval = null;
}
```

## 🏃‍♀️ 実行方法

1. `index.html`をブラウザで開く
2. 6つのタイマーボタンをそれぞれ試す
3. 開始→停止→再開の流れを確認する
4. カウントダウン完了時のアラート表示を確認する
5. 定期実行での要素移動を観察する
6. 自動変化での複数同時アニメーションを確認する
7. 進捗バーと統計情報の更新を観察する
8. 開発者ツール（F12）でConsoleタブのタイマーログを確認

## ✅ 確認ポイント

このステップが完了したら、以下を確認してください：

- [ ] 6つのタイマー機能すべてを使用した
- [ ] 開始・停止・再開・リセットの基本操作を確認した
- [ ] カウントダウンが正常に動作し、完了時にアラートが表示された
- [ ] 定期実行で要素が2秒ごとに移動することを確認した
- [ ] 自動変化で複数要素が1秒ごとに変化することを確認した
- [ ] 進捗バーが時間に応じて更新されることを確認した
- [ ] 統計情報が正しく記録されることを確認した
- [ ] コンソールでタイマー処理のログを確認した

### 期待される動作例
- **開始/再開**: 「00:00:01」「00:00:02」と時間が進む
- **一時停止**: 時間が止まり、再開で続きから始まる
- **カウントダウン**: 「00:00:10」から「00:00:00」まで減る
- **定期実行**: 🚀アイコンが2秒ごとに画面内でランダム移動
- **自動変化**: テキスト・背景色・アニメーションが同時に1秒ごとに変化

## 🎨 試してみよう

慣れてきたら、以下にチャレンジしてみましょう：

1. **カスタムタイマー**
   ```javascript
   // 開発者ツールのコンソールで実行
   let customTimer = setTimeout(() => {
       alert("カスタム5秒タイマー完了！");
   }, 5000);
   ```

2. **独自の定期実行**
   ```javascript
   let myInterval = setInterval(() => {
       console.log("独自の定期実行: " + new Date().toLocaleTimeString());
   }, 2000);
   
   // 停止する場合
   setTimeout(() => {
       clearInterval(myInterval);
       console.log("定期実行を停止しました");
   }, 10000);
   ```

3. **要素の自動フェード**
   ```javascript
   let element = document.getElementById("text-changer");
   let opacity = 1;
   
   let fadeInterval = setInterval(() => {
       opacity -= 0.1;
       element.style.opacity = opacity;
       
       if (opacity <= 0) {
           clearInterval(fadeInterval);
           element.style.opacity = 1; // リセット
       }
   }, 200);
   ```

4. **プログレスバーアニメーション**
   ```javascript
   let progressBar = document.getElementById("progress-fill");
   let progress = 0;
   
   let progressInterval = setInterval(() => {
       progress += 5;
       progressBar.style.width = progress + '%';
       
       if (progress >= 100) {
           clearInterval(progressInterval);
           console.log("プログレス完了！");
       }
   }, 100);
   ```

## 💡 setTimeout と setInterval の重要な特徴

### 実行タイミングの理解
```javascript
console.log("1. 即座に実行");

setTimeout(() => {
    console.log("3. 1秒後に実行");
}, 1000);

console.log("2. これも即座に実行");

// 出力順序: 1 → 2 → 3
```

### メモリリーク防止
```javascript
// 🚨 危険な例（停止処理なし）
let badInterval = setInterval(() => {
    // 重い処理
}, 100);

// ✅ 正しい例（適切な停止処理）
let goodInterval = setInterval(() => {
    // 処理
}, 100);

// 必要に応じて停止
clearInterval(goodInterval);
```

## 💡 実世界での応用例

このタイマー技術は以下で活用されます：

### Webアプリケーション
- **リアルタイム時計**: 現在時刻の1秒ごと更新
- **自動保存**: 5分ごとにデータを自動保存
- **セッション管理**: 一定時間後の自動ログアウト
- **通知システム**: 定期的な新着情報チェック

### ゲーム開発
- **ゲームループ**: 60FPSでの画面更新
- **タイマー機能**: 制限時間、クールダウン
- **アニメーション**: キャラクターの動き、エフェクト

### ユーザーインターフェース
- **スライドショー**: 画像の自動切り替え
- **プログレスバー**: 処理進捗の視覚化
- **ローディング**: アニメーション付き読み込み画面
- **ツールチップ**: 一定時間後の自動非表示

### データ処理
- **定期データ取得**: APIからの定期的なデータ更新
- **バックアップ処理**: 定期的なデータバックアップ
- **ログ出力**: 定期的なシステム状態記録

## 📈 次のステップへ

おめでとうございます！時間ベースの動的コンテンツ操作をマスターしました！🎉

動的コンテンツ段階（17.1-17.4）が完了しました。次は**関数とデータ構造段階（17.5-17.6）**に進み、より高度なプログラミング概念を学習します。

---

**💡 時間制御システムの習得完了**

今日学んだ`setTimeout`と`setInterval`は、動的Webアプリケーションの核心技術です。ユーザーの操作に依存しない自動的な処理、リアルタイムな更新、魅力的なアニメーション—これらすべてを実現する力を身につけました。

時間という次元をプログラムで制御する。これにより、あなたのWebアプリケーションは生き生きとした動的なシステムになりました。

非同期処理、イベントループ、タイマー管理—これらの概念は、現代的なJavaScript開発の基礎です。

**あなたは時間をコントロールできる開発者になりました！** 🚀

## 🎓 動的コンテンツ段階 完了

ステップ17.1から17.4まで、お疲れ様でした！

あなたが学んだスキル：
- ✅ テキスト内容の動的変更（17.1）
- ✅ HTML構造の動的生成（17.2）
- ✅ 配列とランダム選択（17.3）
- ✅ タイマーとアニメーション（17.4）

次の段階では、関数とデータ構造をより深く学習します！