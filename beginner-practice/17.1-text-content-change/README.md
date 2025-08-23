# ステップ17.1 - テキスト内容変更

## 🎯 学習目標

**textContentを使った動的テキスト操作**

- `textContent`プロパティの完全理解と活用
- 複数の異なるテキストの動的切り替え方法を学ぶ
- 時刻表示などの動的コンテンツ生成を理解する
- テキスト操作の統計管理と履歴追跡を習得する

## 📖 このステップの内容

### 📝 動的テキスト変更システム

このステップでは、`textContent`プロパティを使用して**動的にテキスト内容を変更**するシステムを作成します。

これまで学んだボタンクリックと組み合わせ、より実用的なテキスト操作を学習します。

### 📝 学習ポイント

#### 1. textContentプロパティの基本
```javascript
// テキスト内容を取得
let currentText = element.textContent;

// テキスト内容を設定
element.textContent = "新しいテキスト";

// 動的な内容生成
element.textContent = "現在時刻: " + getCurrentTime();
```

#### 2. 配列を使ったランダムメッセージ
```javascript
let messages = ["メッセージ1", "メッセージ2", "メッセージ3"];
let randomMessage = messages[Math.floor(Math.random() * messages.length)];
element.textContent = randomMessage;
```

#### 3. 時刻情報の動的生成
```javascript
function getCurrentTime() {
    let now = new Date();
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
```

## 🎪 実装された機能

### 6つのテキスト変更ボタン

1. **👋 挨拶メッセージ**: 4種類のランダム挨拶
2. **🕐 現在時刻表示**: リアルタイム時刻（時:分:秒）
3. **💪 やる気メッセージ**: 4種類のモチベーションメッセージ
4. **📖 学習メッセージ**: 4種類の学習励ましメッセージ
5. **📊 進捗メッセージ**: 4種類の進捗関連メッセージ
6. **🧹 クリア**: 表示エリアをクリア

### 統計機能

- **総変更回数**: 全ボタンのクリック合計
- **各ボタンの個別クリック数**: ボタンごとの使用回数
- **現在のテキスト表示**: 現在表示中のテキスト内容

### 動的コンテンツ生成

- **ランダム選択**: 複数のメッセージからランダムに選択
- **時刻更新**: クリックするたびに最新の時刻を表示
- **即座の反映**: クリック即座にテキスト内容が変更

## 🔍 コードの詳細解説

### テキスト変更の共通処理システム
```javascript
function changeText(newText, buttonType, buttonName) {
    // 古いテキストを保存（ログ用）
    let oldText = mainDisplay.textContent;
    
    // 新しいテキストを設定
    mainDisplay.textContent = newText;
    
    // 現在のテキスト表示を更新
    currentTextDisplay.textContent = `現在のテキスト: "${newText}"`;
    
    // 統計を更新
    totalChanges++;
    if (buttonType && buttonCounts.hasOwnProperty(buttonType)) {
        buttonCounts[buttonType]++;
    }
    
    updateStats();
    
    // 詳細ログ出力
    console.log(`${buttonName}: テキストを変更しました`);
    console.log(`旧: "${oldText}"`);
    console.log(`新: "${newText}"`);
}
```

### ランダムメッセージシステム
```javascript
document.getElementById("greeting-btn").addEventListener("click", function() {
    let greetings = [
        "👋 こんにちは！JavaScriptの学習お疲れ様です！",
        "😊 素晴らしい一日ですね！一緒に頑張りましょう！",
        "🌟 あなたの学習への取り組みは本当に素晴らしいです！",
        "🎉 プログラミングの世界へようこそ！楽しんでいきましょう！"
    ];
    let randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    changeText(randomGreeting, "greeting", "挨拶ボタン");
});
```

### 時刻表示システム
```javascript
function getCurrentTime() {
    let now = new Date();
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

document.getElementById("time-btn").addEventListener("click", function() {
    let currentTime = getCurrentTime();
    let timeMessage = `🕐 現在時刻: ${currentTime} - 今この瞬間も学習中！`;
    changeText(timeMessage, "time", "時刻ボタン");
});
```

### 統計管理システム
```javascript
let buttonCounts = {
    greeting: 0,
    time: 0,
    motivation: 0,
    learning: 0,
    progress: 0
};

function updateStats() {
    document.getElementById("total-changes").textContent = totalChanges;
    document.getElementById("greeting-count").textContent = buttonCounts.greeting;
    document.getElementById("time-count").textContent = buttonCounts.time;
    // ... 他の統計も同様に更新
}
```

## 🏃‍♀️ 実行方法

1. `index.html`をブラウザで開く
2. 6つのボタンをそれぞれクリックしてテキスト変更を確認
3. 時刻ボタンを複数回クリックして時刻の更新を確認
4. ランダムメッセージボタンを複数回クリックして異なるメッセージを確認
5. 統計情報の変化を観察
6. 開発者ツール（F12）でConsoleタブを確認してログを見る

## ✅ 確認ポイント

このステップが完了したら、以下を確認してください：

- [ ] 6つのボタンすべてを使用した
- [ ] 各ボタンで異なるテキストが表示された
- [ ] 時刻ボタンで実際の時刻が表示され、クリックごとに更新された
- [ ] ランダムメッセージボタンで異なるメッセージが表示された
- [ ] 統計情報が正しく更新された
- [ ] "現在のテキスト"表示が正しく更新された
- [ ] コンソールで変更ログを確認した

### 期待される動作例
- **挨拶ボタン**: 「👋 こんにちは！JavaScriptの学習お疲れ様です！」など4種類からランダム
- **時刻ボタン**: 「🕐 現在時刻: 14:25:30 - 今この瞬間も学習中！」など
- **やる気ボタン**: 「💪 あなたは必ずできます！一歩一歩前進していきましょう！」など4種類からランダム

## 🎨 試してみよう

慣れてきたら、以下にチャレンジしてみましょう：

1. **カスタムメッセージの追加**
   ```javascript
   // 開発者ツールのコンソールで実行
   changeText("自分だけのカスタムメッセージ！", null, "カスタム");
   ```

2. **日付情報の追加**
   ```javascript
   let today = new Date();
   let dateString = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
   changeText("今日の日付: " + dateString, null, "日付");
   ```

3. **カウンターとの組み合わせ**
   ```javascript
   let clickCount = 0;
   // ボタンクリックごとに
   clickCount++;
   changeText(`クリック回数: ${clickCount}回`, null, "カウンター");
   ```

4. **ユーザー入力の反映**
   ```javascript
   let userName = prompt("あなたの名前を入力してください");
   if (userName) {
       changeText(`こんにちは、${userName}さん！`, null, "パーソナライズ");
   }
   ```

## 💡 textContentの重要な特徴

### セキュリティ面での安全性
- **HTMLタグの無効化**: `textContent`はHTMLタグを文字列として扱う
- **XSS攻撃の防止**: 悪意のあるスクリプトの実行を防ぐ
- **確実なテキスト表示**: 意図しないHTML構造の変更を防ぐ

### innerHTML との違い
```javascript
// textContent（安全）
element.textContent = "<script>alert('危険')</script>";
// → 画面には「<script>alert('危険')</script>」と表示される

// innerHTML（危険な場合あり）
element.innerHTML = "<script>alert('危険')</script>";
// → スクリプトが実行される可能性がある
```

## 💡 実世界での応用例

このテキスト変更技術は以下で活用されます：

### ユーザーインターフェース
- **ステータス表示**: 「処理中...」→「完了」
- **エラーメッセージ**: フォーム入力エラーの表示
- **成功メッセージ**: 「保存しました」「送信完了」

### 動的コンテンツ
- **リアルタイム情報**: 時刻、日付、天気情報
- **ユーザー情報**: ログインユーザー名、プロフィール情報
- **カウンター**: いいね数、閲覧数、コメント数

### インタラクティブ要素
- **ボタンラベル**: 「開始」→「停止」
- **タブ切り替え**: アクティブタブの表示変更
- **モード切り替え**: 「編集モード」「表示モード」

## 📈 次のステップへ

素晴らしい！動的テキスト操作をマスターしました！🎉

次のステップ（17.2）では、**HTML内容変更入門**を学び、`innerHTML`を使ってより複雑なコンテンツ操作を学習します。

---

**💡 動的コンテンツの基礎をマスター**

今日学んだ`textContent`を使ったテキスト操作は、どんなWebアプリケーションでも必要不可欠な技術です。安全で確実なテキスト操作ができるようになったことで、あなたのWeb開発スキルはさらに実用的なレベルに到達しました。

静的なHTMLから動的なコンテンツへ—これがWebアプリケーションの本質です。

**あなたは確実に動的Web開発者へと成長しています！** 🚀