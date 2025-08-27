# 基本計算

## 🎯 学習目標

**JavaScriptで数学計算をマスターする**

- 数値変数の作成と使用方法を学ぶ
- JavaScriptでの四則演算（+ - * /）を理解する
- 計算結果をコンソールに表示する方法を覚える

## 📖 この学習の内容

### 🧮 JavaScriptで計算しよう！

この学習では、JavaScriptを使って基本的な数学計算を行います。

プログラミングでは、数値の計算が非常に重要な要素の一つです。

### 📝 学習ポイント

#### 1. 数値変数
```javascript
let number1 = 10;
let number2 = 3;
```
- `let`を使って数値を保存できる
- 文字列（`"..."`）と違って、数値には引用符を付けない
- 変数名は分かりやすい名前にする

#### 2. 四則演算の記号
```javascript
let addition = 5 + 3;        // 足し算 +
let subtraction = 10 - 4;    // 引き算 -
let multiplication = 6 * 7;  // 掛け算 *
let division = 15 / 3;       // 割り算 /
```

#### 3. 計算結果の表示
```javascript
console.log("計算結果: " + addition);
```
- `console.log()`で結果を確認
- 文字列と数値を`+`で繋げて表示

## 🔍 コードの詳細解説

### この学習で実行されるコード
```javascript
// 数値を変数に保存
let number1 = 10;
let number2 = 3;

// 四則演算を実行
let addition = number1 + number2;        // 10 + 3 = 13
let subtraction = number1 - number2;     // 10 - 3 = 7
let multiplication = number1 * number2;   // 10 × 3 = 30
let division = number1 / number2;        // 10 ÷ 3 = 3.33...

// 結果をコンソールに表示
console.log("足し算: " + number1 + " + " + number2 + " = " + addition);
console.log("引き算: " + number1 + " - " + number2 + " = " + subtraction);
console.log("掛け算: " + number1 + " × " + number2 + " = " + multiplication);
console.log("割り算: " + number1 + " ÷ " + number2 + " = " + division.toFixed(2));
```

**解説：**
- `let number1 = 10` - 数値10を変数に保存
- `number1 + number2` - 変数同士を計算
- `division.toFixed(2)` - 小数点以下2桁で表示
- 文字列結合で計算過程を分かりやすく表示

## 🔢 JavaScriptの算術演算子

| 演算子 | 意味 | 例 | 結果 |
|--------|------|----|----- |
| `+` | 足し算 | `7 + 3` | `10` |
| `-` | 引き算 | `7 - 3` | `4` |
| `*` | 掛け算 | `7 * 3` | `21` |
| `/` | 割り算 | `7 / 2` | `3.5` |

## 🏃‍♀️ 実行方法

1. `index.html`をブラウザで開く
2. 開発者ツール（F12またはCmd+Option+I）を開く
3. 「Console」タブをクリック
4. 計算結果がコンソールとページの両方に表示される

## ✅ 確認ポイント

この学習が完了したら、以下を確認してください：

- [ ] ページに4つの計算結果が表示された
- [ ] コンソールに詳しい計算過程が表示された
- [ ] 四則演算の記号を覚えた
- [ ] 数値変数の作成方法を理解した

### 期待される結果
```
足し算: 10 + 3 = 13
引き算: 10 - 3 = 7
掛け算: 10 × 3 = 30
割り算: 10 ÷ 3 = 3.33
```

## 🎨 試してみよう

慣れてきたら、以下にチャレンジしてみましょう：

1. **異なる数値で計算**
   ```javascript
   let myNumber1 = 25;
   let myNumber2 = 4;
   let result = myNumber1 * myNumber2;
   console.log(result); // 100
   ```

2. **より複雑な計算**
   ```javascript
   let result = (10 + 5) * 2; // 括弧を使った計算
   console.log(result); // 30
   ```

3. **年齢計算**
   ```javascript
   let currentYear = 2024;
   let birthYear = 2000;
   let age = currentYear - birthYear;
   console.log("年齢: " + age + "歳");
   ```

## 💡 プログラミングでの計算の重要性

プログラミングでは、計算は至る所で使われます：
- **ECサイト**: 商品の合計金額計算
- **ゲーム**: スコア計算、HP計算
- **アプリ**: データ分析、統計計算
- **Webサイト**: 割引率計算、税込価格計算

## 📈 次の学習へ

お疲れ様でした！JavaScriptの基本計算をマスターしました！🎉

次の学習では、ついに**HTML要素の取得**を学び、Webページを動的に変更する方法を学習します。

---

**💡 数学がプログラムを動かす**

コンピューターの中では、すべてが数値で処理されています。今日学んだ基本計算は、どんなに複雑なプログラムの基礎にもなっています。

**あなたは着実にプログラマーの基礎を身につけています！** 🚀