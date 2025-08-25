console.log("🎯 ステップ15.4: 要素取得入門を開始します！");
console.log("==================================");

// 1. 要素を取得
console.log("📍 要素を取得中...");
let demoElement = document.getElementById("demo-element");
let welcomeElement = document.getElementById("welcome-message");

// 2. 取得できたか確認
console.log("取得した要素:", demoElement);
console.log("要素の元の内容:", demoElement.textContent);

// 3. 内容を変更
console.log("🔄 内容を変更中...");
demoElement.textContent = "🎉 JavaScriptで変更されました！";
welcomeElement.textContent = "ようこそ！要素取得の世界へ！";

// 4. 変更後の確認
console.log("変更後の内容:", demoElement.textContent);
console.log("✅ 要素の内容変更が完了しました！");

console.log("");
console.log("🌟 HTMLとJavaScriptが連携できるようになりました！");