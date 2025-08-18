/**
 * プログラミング問題データ
 * GitHub Pages用 JavaScript自動採点システム
 */

const PROBLEMS = {
  practice21: {
    id: "practice21",
    title: "練習問題21：電車の乗車券の料金計算",
    description: "電車の乗車券の料金を計算するプログラムを作成してください。",
    instructions: [
      "距離による基本料金を設定：",
      "- 10km以下は200円",
      "- 11km以上30km以下は300円", 
      "- 31km以上は500円",
      "",
      "大人は基本料金、子供は半額で計算してください。"
    ],
    template: `//電車の乗車券の料金を計算するプログラムを作成してください。
// 参照問題: practice2.js（年齢による料金判定）+ practice6.js（割引価格計算）
let distance = 25; // 走行距離（km）
let adultCount = 2; // 大人の人数
let childCount = 1; // 子供の人数
let basicFare; // 基本料金
let totalFare; // 合計料金

// 距離による基本料金を設定
// 10km以下は200円、11km以上30km以下は300円、31km以上は500円
if (distance <= 10) {
    /* ここに基本料金200円の代入を書く */
    basicFare = 
} else if (distance >= 11 && distance <= 30) {
    basicFare = 300;
} else {
    basicFare = 500;
}

// 大人は基本料金、子供は半額で計算
let adultFare = basicFare * adultCount;
let childFare = (basicFare/2) * childCount;
/* ここに合計料金の計算式を書く */
totalFare = 


console.log("走行距離: " + distance + "km");
console.log("基本料金: " + basicFare + "円");
console.log("大人" + adultCount + "人、子供" + childCount + "人");
console.log("合計料金: " + totalFare + "円");`,
    expectedOutput: "走行距離: 25km\\n基本料金: 300円\\n大人2人、子供1人\\n合計料金: 750円",
    testVariables: {
      distance: 25,
      adultCount: 2,
      childCount: 1
    },
    points: 100
  },

  practice22: {
    id: "practice22",
    title: "練習問題22：図書館延滞料金計算",
    description: "図書館で本を借りる期間と延滞料金を計算するプログラムを作成してください。",
    instructions: [
      "延滞日数を計算し、延滞している場合の処理を実装してください。",
      "延滞料金は1日につき10円です。"
    ],
    template: `//図書館で本を借りる期間と延滞料金を計算するプログラムを作成してください。
// 参照問題: practice7.js（成績判定）+ practice11.js（給料計算）
let borrowedDays = 18; // 借りていた日数
let standardPeriod = 14; // 標準貸出期間（日）
let overdueDays = 0; // 延滞日数
let fine = 0; // 延滞料金

console.log("=== 図書館延滞料金計算 ===");

// 延滞日数を計算（標準期間を超えた分）
if (borrowedDays > standardPeriod) {
    /* ここに延滞日数の計算式を書く */
    overdueDays = 
} else {
    overdueDays = 0;
}

// 延滞している場合の処理
/* ここに延滞判定のif文を書く（条件も含めて）*/
if () {
    // 延滞料金は1日につき10円
    fine = overdueDays * 10;
    console.log("延滞しています！");
} else {
    console.log("期限内の返却です。");
}

console.log("借用日数: " + borrowedDays + "日");
console.log("延滞日数: " + overdueDays + "日");
console.log("延滞料金: " + fine + "円");`,
    expectedOutput: "=== 図書館延滞料金計算 ===\\n延滞しています！\\n借用日数: 18日\\n延滞日数: 4日\\n延滞料金: 40円",
    testVariables: {
      borrowedDays: 18,
      standardPeriod: 14
    },
    points: 100
  },

  practice23: {
    id: "practice23", 
    title: "練習問題23：成績統計計算",
    description: "成績の統計を計算するプログラムを作成してください。",
    instructions: [
      "配列を使って合計点、平均点、80点以上の数をカウントしてください。"
    ],
    template: `//次の配列を使って成績の統計を計算してください。
// 参照問題: practice9.js（数値の合計計算）+ practice4.js（偶数の出力）+ practice3.js（配列の基本操作）
let scores = [85, 92, 78, 95, 88]; // テストの点数
let sum = 0; // 合計点
let average = 0; // 平均点
let highScoreCount = 0; // 80点以上の数

console.log("=== 成績統計 ===");
console.log("テスト点数: " + scores);

// 1. 合計点を計算
/* ここにfor文を使った合計計算のコード全体を書く */
for () {
  
}




// 2. 平均点を計算
average = sum / scores.length;

// 3. 80点以上の数をカウント
for (let i = 0; i < scores.length; i++) {
    /* ここに80点以上の判定と処理をif文で書く */
    if () {
      
    }
    
    
}

console.log("合計点: " + sum + "点");
console.log("平均点: " + average + "点");
console.log("80点以上: " + highScoreCount + "人");`,
    expectedOutput: "=== 成績統計 ===\\nテスト点数: 85,92,78,95,88\\n合計点: 438点\\n平均点: 87.6点\\n80点以上: 4人",
    testVariables: {
      scores: [85, 92, 78, 95, 88]
    },
    points: 100
  },

  practice24: {
    id: "practice24",
    title: "練習問題24：映画館座席予約システム",
    description: "映画館の座席予約システムを作成してください。",
    instructions: [
      "指定した座席が空席かどうかをチェックし、予約処理を実装してください。"
    ],
    template: `//映画館の座席予約システムを作成してください。
// 参照問題: practice8.js（配列の要素操作）+ practice13.js（配列の高度な操作）
let seats = ["空席", "空席", "予約済", "空席", "空席"]; // 座席状況
let requestedSeat = 2; // 予約したい座席番号（0から開始）
let reservationResult; // 予約結果

console.log("=== 映画館座席予約 ===");
console.log("現在の座席状況: " + seats);

// 指定した座席が空席かどうかチェック
let seatStatus = seats[requestedSeat];
/* ここに座席状況による分岐処理全体を書く（if-else文） */
if () {
  
  
} else {
  
}

console.log("予約したい座席: " + (requestedSeat + 1) + "番");
console.log("予約結果: " + reservationResult);
console.log("更新後の座席状況: " + seats);`,
    expectedOutput: "=== 映画館座席予約 ===\\n現在の座席状況: 空席,空席,予約済,空席,空席\\n予約したい座席: 3番\\n予約結果: 予約できませんでした\\n更新後の座席状況: 空席,空席,予約済,空席,空席",
    testVariables: {
      requestedSeat: 2
    },
    points: 100
  },

  practice25: {
    id: "practice25",
    title: "練習問題25：釣り銭計算プログラム",
    description: "釣り銭計算プログラムを作成してください。",
    instructions: [
      "100円玉、50円玉、10円玉の枚数を計算してください。",
      "while文を使って計算することが重要です。"
    ],
    template: `//釣り銭計算プログラムを作成してください。
// 参照問題: practice5.js（数値の連続除算）+ practice16.js（お菓子の分配計算）
let price = 1260; // 商品価格（円）
let payment = 2000; // 支払い金額（円）
let change = 0; // 釣り銭
let hundreds = 0; // 100円玉の枚数
let fifties = 0; // 50円玉の枚数
let tens = 0; // 10円玉の枚数

console.log("=== 釣り銭計算 ===");
console.log("商品価格: " + price + "円");
console.log("支払い金額: " + payment + "円");

// 釣り銭を計算
change = payment - price;

// 100円玉の枚数を計算
while (change >= 100) {
    hundreds += 1;
    change -= 100;
    /* ここに100円玉を1枚増やして釣り銭を100円減らすコードを書く */
}

// 残りの金額から50円玉の枚数を計算
/* ここに50円玉の計算をwhile文で書く */
while () {
    
    
}




// 残りの金額から10円玉の枚数を計算
tens = change / 10;


console.log("釣り銭: " + (payment - price) + "円");
console.log("100円玉: " + hundreds + "枚");
console.log("50円玉: " + fifties + "枚");
console.log("10円玉: " + tens + "枚");`,
    expectedOutput: "=== 釣り銭計算 ===\\n商品価格: 1260円\\n支払い金額: 2000円\\n釣り銭: 740円\\n100円玉: 7枚\\n50円玉: 0枚\\n10円玉: 4枚",
    testVariables: {
      price: 1260,
      payment: 2000
    },
    points: 100
  }
};

// 問題一覧を取得する関数
function getProblemList() {
  return Object.keys(PROBLEMS).map(key => ({
    id: key,
    title: PROBLEMS[key].title
  }));
}

// 特定の問題を取得する関数
function getProblem(problemId) {
  return PROBLEMS[problemId] || null;
}