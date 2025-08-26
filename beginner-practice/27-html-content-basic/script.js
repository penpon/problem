console.log("🏗️ ステップ17.2: HTML内容変更入門を開始します！");
console.log("==========================================");

// 統計用変数
let totalGenerations = 0;
let generationCounts = {
    heading: 0,
    list: 0,
    card: 0,
    table: 0,
    form: 0
};

// DOM要素の取得
let contentDisplay = document.getElementById("content-display");

// HTML生成を処理する共通関数
function generateHTML(htmlContent, generationType, buttonName) {
    // HTMLコンテンツを設定
    contentDisplay.innerHTML = htmlContent;
    
    // 統計を更新
    totalGenerations++;
    if (generationType && generationCounts.hasOwnProperty(generationType)) {
        generationCounts[generationType]++;
    }
    
    updateStats();
    
    // ログ出力
    console.log(`${buttonName}: HTMLコンテンツを生成しました`);
    console.log("生成されたHTML:");
    console.log(htmlContent);
    console.log(`総生成回数: ${totalGenerations}`);
}

// 統計表示を更新する関数
function updateStats() {
    document.getElementById("total-generations").textContent = totalGenerations;
    document.getElementById("heading-count").textContent = generationCounts.heading;
    document.getElementById("list-count").textContent = generationCounts.list;
    document.getElementById("card-count").textContent = generationCounts.card;
    document.getElementById("table-count").textContent = generationCounts.table;
    document.getElementById("form-count").textContent = generationCounts.form;
}

// 見出しとテキストボタン
document.getElementById("heading-btn").addEventListener("click", function() {
    let headingHTML = `
        <h3 style="color: #3498db; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
            📝 動的に生成された見出し
        </h3>
        <p style="font-size: 1.1rem; line-height: 1.8;">
            これは<strong>innerHTML</strong>を使用して動的に生成されたコンテンツです。
            HTMLタグが実際に解釈され、装飾が適用されていることがわかります。
        </p>
        <p style="background: #e8f4f8; padding: 15px; border-radius: 8px; border-left: 4px solid #3498db;">
            💡 <strong>ポイント:</strong> HTMLタグが文字列ではなく、実際のHTML要素として表示されています。
        </p>
    `;
    generateHTML(headingHTML, "heading", "見出しボタン");
});

// リスト構造ボタン
document.getElementById("list-btn").addEventListener("click", function() {
    let listHTML = `
        <h3 style="color: #8e44ad;">📋 学習の進捗チェックリスト</h3>
        <ul style="list-style-type: none; padding: 0;">
            <li style="background: #d4edda; padding: 10px; margin: 5px 0; border-radius: 5px; border-left: 4px solid #28a745;">
                ✅ JavaScript基本構文の理解
            </li>
            <li style="background: #d4edda; padding: 10px; margin: 5px 0; border-radius: 5px; border-left: 4px solid #28a745;">
                ✅ DOM操作の基本
            </li>
            <li style="background: #fff3cd; padding: 10px; margin: 5px 0; border-radius: 5px; border-left: 4px solid #ffc107;">
                🔄 HTML動的生成（学習中）
            </li>
            <li style="background: #f8d7da; padding: 10px; margin: 5px 0; border-radius: 5px; border-left: 4px solid #dc3545;">
                ⏳ 高度な配列操作（未学習）
            </li>
        </ul>
        <p style="font-style: italic; color: #6c757d;">各項目の色分けで進捗状況を視覚的に表現しています。</p>
    `;
    generateHTML(listHTML, "list", "リストボタン");
});

// 情報カードボタン
document.getElementById("card-btn").addEventListener("click", function() {
    let cardHTML = `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
            <h3 style="margin-top: 0; color: #fff;">🎴 プロフィールカード</h3>
            <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
                <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                    👨‍💻
                </div>
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 10px 0;">未来のWeb開発者</h4>
                    <p style="margin: 5px 0;">📍 学習場所: プログラミングの世界</p>
                    <p style="margin: 5px 0;">💼 目標: フルスタック開発者</p>
                    <p style="margin: 5px 0;">🎯 現在のステップ: 17.2 HTML内容変更</p>
                </div>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin-top: 15px;">
                <strong>📈 進捗状況:</strong> JavaScriptの基本をマスターし、DOM操作を学習中！
            </div>
        </div>
    `;
    generateHTML(cardHTML, "card", "カードボタン");
});

// テーブル表示ボタン
document.getElementById("table-btn").addEventListener("click", function() {
    let tableHTML = `
        <h3 style="color: #e67e22;">📊 学習統計テーブル</h3>
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                <thead>
                    <tr style="background: #34495e; color: white;">
                        <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">ステップ</th>
                        <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">学習内容</th>
                        <th style="padding: 12px; border: 1px solid #ddd; text-align: center;">進捗</th>
                        <th style="padding: 12px; border: 1px solid #ddd; text-align: center;">難易度</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background: #f8f9fa;">
                        <td style="padding: 10px; border: 1px solid #ddd;">15.1-15.5</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">JavaScript導入</td>
                        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">✅ 完了</td>
                        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">⭐⭐</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;">16.1-16.3</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">DOM操作</td>
                        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">✅ 完了</td>
                        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">⭐⭐⭐</td>
                    </tr>
                    <tr style="background: #fff3cd;">
                        <td style="padding: 10px; border: 1px solid #ddd;">17.1-17.4</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">動的コンテンツ</td>
                        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">🔄 学習中</td>
                        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">⭐⭐⭐</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p style="font-size: 0.9rem; color: #6c757d; font-style: italic;">
            このテーブルは動的に生成されており、実際のプロジェクトでは データベースから取得した情報を表示することができます。
        </p>
    `;
    generateHTML(tableHTML, "table", "テーブルボタン");
});

// フォーム要素ボタン
document.getElementById("form-btn").addEventListener("click", function() {
    let formHTML = `
        <h3 style="color: #16a085;">📝 学習フィードバックフォーム</h3>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 2px solid #16a085;">
            <div style="margin-bottom: 15px;">
                <label style="display: block; font-weight: bold; margin-bottom: 5px; color: #2c3e50;">
                    🎯 今日の学習満足度:
                </label>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <input type="radio" id="rating1" name="rating" value="1">
                    <label for="rating1">⭐</label>
                    <input type="radio" id="rating2" name="rating" value="2">
                    <label for="rating2">⭐⭐</label>
                    <input type="radio" id="rating3" name="rating" value="3" checked>
                    <label for="rating3">⭐⭐⭐</label>
                    <input type="radio" id="rating4" name="rating" value="4">
                    <label for="rating4">⭐⭐⭐⭐</label>
                    <input type="radio" id="rating5" name="rating" value="5">
                    <label for="rating5">⭐⭐⭐⭐⭐</label>
                </div>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; font-weight: bold; margin-bottom: 5px; color: #2c3e50;">
                    📚 学習したい次のトピック:
                </label>
                <select style="width: 100%; padding: 8px; border: 2px solid #bdc3c7; border-radius: 5px;">
                    <option>配列操作</option>
                    <option>関数の作成</option>
                    <option>オブジェクト操作</option>
                    <option>イベント処理</option>
                </select>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; font-weight: bold; margin-bottom: 5px; color: #2c3e50;">
                    💭 感想やコメント:
                </label>
                <textarea style="width: 100%; height: 60px; padding: 8px; border: 2px solid #bdc3c7; border-radius: 5px; resize: vertical;" placeholder="学習の感想をお聞かせください..."></textarea>
            </div>
            
            <button style="background: linear-gradient(135deg, #16a085, #3498db); color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;" onclick="alert('フォームの送信機能は次のステップで学習します！')">
                📤 フィードバック送信
            </button>
        </div>
        <p style="font-size: 0.9rem; color: #e67e22; font-style: italic;">
            ⚠️ これは表示のみのデモです。実際の送信機能は後のステップで学習します。
        </p>
    `;
    generateHTML(formHTML, "form", "フォームボタン");
});

// クリアボタン
document.getElementById("clear-btn").addEventListener("click", function() {
    let clearHTML = `
        <h3 style="color: #6c757d;">🧹 コンテンツがクリアされました</h3>
        <p style="color: #6c757d; text-align: center; font-style: italic;">
            表示エリアがリセットされました。上のボタンから新しいコンテンツを生成してください。
        </p>
        <div style="text-align: center; margin: 20px 0;">
            <div style="font-size: 3rem;">🆕</div>
            <p style="margin-top: 10px;">新しいスタート！</p>
        </div>
    `;
    generateHTML(clearHTML, null, "クリアボタン");
});

// 初期統計表示
updateStats();

console.log("✅ HTML動的生成システムが初期化されました！");
console.log("💡 各ボタンをクリックして、HTMLコンテンツがどのように生成されるか確認してください！");
console.log("🔍 開発者ツールのElementsタブでHTML構造の変化も確認してみてください！");