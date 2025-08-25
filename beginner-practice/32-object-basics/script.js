// 17.6 オブジェクト基礎 - データ構造管理の学習

console.log("🏗️ ステップ17.6: オブジェクトとデータ構造を開始します！");
console.log("============================================");

// 統計用変数
let totalOperations = 0;
let basicOperations = 0;
let methodOperations = 0;
let dynamicOperations = 0;
let createdObjects = 0;
let libraryOperations = 0;

// 図書管理システム用変数
let libraryBooks = [];
let bookIdCounter = 1;

// DOM要素の取得
const resultDisplay = document.getElementById("result-display");
const objectStatus = document.getElementById("object-status");
const objectContent = document.getElementById("object-content");
const librarySystem = document.getElementById("library-system");
const bookList = document.getElementById("book-list");

// 統計更新関数
function updateStats() {
    document.getElementById("total-operations").textContent = totalOperations;
    document.getElementById("basic-operations").textContent = basicOperations;
    document.getElementById("method-operations").textContent = methodOperations;
    document.getElementById("dynamic-operations").textContent = dynamicOperations;
    document.getElementById("created-objects").textContent = createdObjects;
    document.getElementById("library-operations").textContent = libraryOperations;
}

// オブジェクトを表示用に整形する関数
function displayObject(obj, title = "オブジェクト") {
    let html = `<div class="object-card">
        <h4>${title}</h4>`;
    
    for (let key in obj) {
        if (typeof obj[key] === 'function') {
            html += `<div class="object-property">${key}: [メソッド]</div>`;
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (Array.isArray(obj[key])) {
                html += `<div class="object-property">${key}: [配列: ${obj[key].length}個の要素]</div>`;
            } else {
                html += `<div class="object-property">${key}: [オブジェクト]</div>`;
                // ネストしたオブジェクトの中身も表示
                for (let nestedKey in obj[key]) {
                    html += `<div class="object-property" style="margin-left: 20px;">${nestedKey}: ${obj[key][nestedKey]}</div>`;
                }
            }
        } else {
            html += `<div class="object-property">${key}: ${obj[key]}</div>`;
        }
    }
    
    html += `</div>`;
    return html;
}

// 1. 基本オブジェクト
function createBasicObject() {
    console.log("👤 基本オブジェクトを作成中...");
    
    // 基本的なオブジェクトリテラル
    const person = {
        name: "田中太郎",
        age: 30,
        job: "Webデベロッパー",
        city: "東京",
        isWorking: true
    };
    
    resultDisplay.textContent = `${person.name}さん（${person.age}歳）`;
    objectStatus.textContent = `✅ ${person.job}の情報を作成しました`;
    objectContent.innerHTML = displayObject(person, "基本オブジェクト");
    
    console.log("✅ 基本オブジェクト作成完了:", person);
    
    // プロパティアクセスの例をコンソールで示す
    console.log("🔍 プロパティアクセス例:");
    console.log("  ドット記法: person.name =", person.name);
    console.log("  ブラケット記法: person['age'] =", person['age']);
    
    return person;
}

// 2. メソッド付きオブジェクト
function createMethodObject() {
    console.log("🎭 メソッド付きオブジェクトを作成中...");
    
    const person = {
        name: "佐藤花子",
        age: 28,
        job: "デザイナー",
        hobby: "読書",
        
        // メソッド（関数）の定義
        introduce() {
            return `こんにちは！${this.name}です。${this.age}歳の${this.job}をしています。`;
        },
        
        getHobbyMessage() {
            return `趣味は${this.hobby}です。`;
        },
        
        celebrateBirthday() {
            this.age++;
            return `🎉 お誕生日おめでとう！${this.age}歳になりました！`;
        }
    };
    
    // メソッドを実行
    const introMessage = person.introduce();
    const hobbyMessage = person.getHobbyMessage();
    
    resultDisplay.textContent = introMessage;
    objectStatus.textContent = `✅ ${person.name}さんのメソッドを実行しました`;
    
    let methodResults = `<div class="method-result">🎭 ${introMessage}</div>`;
    methodResults += `<div class="method-result">💝 ${hobbyMessage}</div>`;
    
    objectContent.innerHTML = displayObject(person, "メソッド付きオブジェクト") + methodResults;
    
    console.log("✅ メソッド付きオブジェクト作成完了:", person);
    console.log("🎭 メソッド実行結果:", introMessage);
    console.log("💡 thisの使用例:", person.introduce);
    
    return person;
}

// 3. ネストしたオブジェクト
function createNestedObject() {
    console.log("🏠 ネストしたオブジェクトを作成中...");
    
    const person = {
        name: "山田次郎",
        age: 35,
        contact: {
            email: "yamada@example.com",
            phone: "090-1234-5678",
            social: {
                twitter: "@yamada_jiro",
                linkedin: "yamada-jiro"
            }
        },
        address: {
            prefecture: "神奈川県",
            city: "横浜市",
            ward: "港北区",
            postalCode: "222-0001"
        },
        skills: ["JavaScript", "Python", "React", "Node.js"],
        
        getFullAddress() {
            return `${this.address.prefecture}${this.address.city}${this.address.ward}`;
        },
        
        getContactInfo() {
            return `📧 ${this.contact.email} 📱 ${this.contact.phone}`;
        }
    };
    
    const address = person.getFullAddress();
    const contact = person.getContactInfo();
    
    resultDisplay.textContent = `${person.name}さん（${address}在住）`;
    objectStatus.textContent = `✅ ネストしたオブジェクト構造を作成しました`;
    
    let nestedInfo = `<div class="method-result">🏠 住所: ${address}</div>`;
    nestedInfo += `<div class="method-result">📞 連絡先: ${contact}</div>`;
    nestedInfo += `<div class="method-result">💻 スキル: ${person.skills.join(", ")}</div>`;
    
    objectContent.innerHTML = displayObject(person, "ネストしたオブジェクト") + nestedInfo;
    
    console.log("✅ ネストしたオブジェクト作成完了:", person);
    console.log("🏠 ネストしたプロパティアクセス例:");
    console.log("  person.address.city =", person.address.city);
    console.log("  person.contact.social.twitter =", person.contact.social.twitter);
    
    return person;
}

// 4. オブジェクト配列
function createObjectArray() {
    console.log("👥 オブジェクト配列を作成中...");
    
    const team = [
        {
            id: 1,
            name: "田中リーダー",
            role: "プロジェクトマネージャー",
            experience: 8,
            skills: ["管理", "企画", "JavaScript"]
        },
        {
            id: 2,
            name: "佐藤エンジニア",
            role: "フロントエンドエンジニア",
            experience: 5,
            skills: ["React", "Vue.js", "CSS"]
        },
        {
            id: 3,
            name: "山田デザイナー",
            role: "UIデザイナー",
            experience: 3,
            skills: ["Figma", "Photoshop", "UXデザイン"]
        }
    ];
    
    // チーム情報を処理
    const totalExperience = team.reduce((sum, member) => sum + member.experience, 0);
    const averageExperience = (totalExperience / team.length).toFixed(1);
    
    resultDisplay.textContent = `チーム${team.length}名（平均経験${averageExperience}年）`;
    objectStatus.textContent = `✅ ${team.length}人のチームオブジェクト配列を作成しました`;
    
    let teamInfo = `<div class="object-card">
        <h4>👥 チーム構成</h4>
        <div class="method-result">総メンバー: ${team.length}名</div>
        <div class="method-result">平均経験年数: ${averageExperience}年</div>
        <div class="method-result">総経験年数: ${totalExperience}年</div>
    </div>`;
    
    team.forEach((member, index) => {
        teamInfo += displayObject(member, `メンバー${index + 1}: ${member.name}`);
    });
    
    objectContent.innerHTML = teamInfo;
    
    console.log("✅ オブジェクト配列作成完了:", team);
    console.log("👥 配列内オブジェクトアクセス例:");
    console.log("  team[0].name =", team[0].name);
    console.log("  team[1].skills =", team[1].skills);
    
    return team;
}

// 5. 動的オブジェクト生成
function createDynamicObject() {
    console.log("⚡ 動的オブジェクト生成中...");
    
    // 入力値を取得
    const name = document.getElementById("person-name").value;
    const age = parseInt(document.getElementById("person-age").value);
    const job = document.getElementById("person-job").value;
    const city = document.getElementById("person-city").value;
    const hobby = document.getElementById("person-hobby").value;
    
    // 動的にオブジェクトを作成
    const dynamicPerson = {
        name: name,
        age: age,
        job: job,
        location: {
            city: city,
            country: "日本"
        },
        hobby: hobby,
        created: new Date().toLocaleString(),
        
        // 動的に生成されたメソッド
        introduce() {
            return `はじめまして！${this.name}と申します。${this.location.city}で${this.job}をしている${this.age}歳です。`;
        },
        
        getHobbyInfo() {
            return `趣味は${this.hobby}で、とても楽しんでいます！`;
        },
        
        getAge() {
            const currentYear = new Date().getFullYear();
            return `現在${this.age}歳です。`;
        }
    };
    
    // メソッドを実行
    const intro = dynamicPerson.introduce();
    const hobbyInfo = dynamicPerson.getHobbyInfo();
    
    resultDisplay.textContent = `${dynamicPerson.name}さんのオブジェクトを作成`;
    objectStatus.textContent = `✅ 入力値から動的オブジェクトを生成しました`;
    
    let dynamicResults = `<div class="method-result">🎭 ${intro}</div>`;
    dynamicResults += `<div class="method-result">🎯 ${hobbyInfo}</div>`;
    dynamicResults += `<div class="method-result">📅 作成日時: ${dynamicPerson.created}</div>`;
    
    objectContent.innerHTML = displayObject(dynamicPerson, "動的生成オブジェクト") + dynamicResults;
    
    console.log("✅ 動的オブジェクト生成完了:", dynamicPerson);
    console.log("⚡ 動的プロパティ設定例:");
    console.log("  動的な値設定:", { name, age, job, city, hobby });
    
    return dynamicPerson;
}

// 6. 図書管理システム
class Book {
    constructor(title, author, genre, pages) {
        this.id = bookIdCounter++;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pages = pages;
        this.isAvailable = true;
        this.borrowedDate = null;
        this.addedDate = new Date().toLocaleDateString();
    }
    
    // 貸出処理
    borrow() {
        if (this.isAvailable) {
            this.isAvailable = false;
            this.borrowedDate = new Date().toLocaleDateString();
            return `📖 「${this.title}」を貸し出しました。`;
        } else {
            return `❌ 「${this.title}」は貸し出し中です。`;
        }
    }
    
    // 返却処理
    return() {
        if (!this.isAvailable) {
            this.isAvailable = true;
            this.borrowedDate = null;
            return `📚 「${this.title}」が返却されました。`;
        } else {
            return `❓ 「${this.title}」は既に返却されています。`;
        }
    }
    
    // 書籍情報
    getInfo() {
        const status = this.isAvailable ? "在庫あり" : `貸出中（${this.borrowedDate}から）`;
        return `📖 ${this.title} | 著者: ${this.author} | ${this.pages}ページ | ${status}`;
    }
}

function initLibrarySystem() {
    console.log("📚 図書管理システムを初期化中...");
    
    librarySystem.style.display = "block";
    
    // サンプル書籍を追加
    if (libraryBooks.length === 0) {
        libraryBooks.push(new Book("JavaScript完全ガイド", "田中太郎", "プログラミング", 450));
        libraryBooks.push(new Book("Web デザインの基礎", "佐藤花子", "デザイン", 320));
        libraryBooks.push(new Book("データベース設計入門", "山田次郎", "技術書", 280));
    }
    
    resultDisplay.textContent = `図書館に${libraryBooks.length}冊登録済み`;
    objectStatus.textContent = `✅ 図書管理システムを開始しました`;
    
    updateBookList();
    
    let systemInfo = `<div class="object-card">
        <h4>📚 図書管理システム</h4>
        <div class="method-result">📖 総書籍数: ${libraryBooks.length}冊</div>
        <div class="method-result">📚 利用可能: ${libraryBooks.filter(book => book.isAvailable).length}冊</div>
        <div class="method-result">📝 貸出中: ${libraryBooks.filter(book => !book.isAvailable).length}冊</div>
    </div>`;
    
    objectContent.innerHTML = systemInfo;
    
    console.log("✅ 図書管理システム初期化完了:", libraryBooks);
}

function updateBookList() {
    bookList.innerHTML = '';
    
    libraryBooks.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-item';
        
        const statusColor = book.isAvailable ? '#27ae60' : '#e74c3c';
        const statusText = book.isAvailable ? '在庫あり' : '貸出中';
        
        bookElement.innerHTML = `
            <h5>${book.title}</h5>
            <p><strong>著者:</strong> ${book.author} | <strong>ジャンル:</strong> ${book.genre} | <strong>ページ:</strong> ${book.pages}</p>
            <p style="color: ${statusColor};"><strong>状態:</strong> ${statusText}</p>
            <p><strong>追加日:</strong> ${book.addedDate}</p>
            <div class="book-actions">
                <button class="book-btn" onclick="borrowBook(${book.id})">📖 貸出</button>
                <button class="book-btn" onclick="returnBook(${book.id})">📚 返却</button>
                <button class="book-btn" onclick="showBookInfo(${book.id})">ℹ️ 詳細</button>
            </div>
        `;
        
        bookList.appendChild(bookElement);
    });
}

function addBook() {
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const genre = document.getElementById("book-genre").value;
    const pages = parseInt(document.getElementById("book-pages").value);
    
    if (title && author && pages > 0) {
        const newBook = new Book(title, author, genre, pages);
        libraryBooks.push(newBook);
        
        updateBookList();
        
        resultDisplay.textContent = `「${title}」を追加しました`;
        objectStatus.textContent = `✅ 新しい書籍をライブラリに追加完了`;
        
        // 入力フィールドをクリア
        document.getElementById("book-title").value = "";
        document.getElementById("book-author").value = "";
        document.getElementById("book-pages").value = "300";
        
        console.log("📖 書籍追加完了:", newBook);
    }
}

// グローバル関数（HTML から呼び出されるため）
window.borrowBook = function(bookId) {
    const book = libraryBooks.find(b => b.id === bookId);
    if (book) {
        const message = book.borrow();
        alert(message);
        updateBookList();
        console.log("📖 貸出処理:", message);
    }
};

window.returnBook = function(bookId) {
    const book = libraryBooks.find(b => b.id === bookId);
    if (book) {
        const message = book.return();
        alert(message);
        updateBookList();
        console.log("📚 返却処理:", message);
    }
};

window.showBookInfo = function(bookId) {
    const book = libraryBooks.find(b => b.id === bookId);
    if (book) {
        const info = book.getInfo();
        alert(info);
        console.log("ℹ️ 書籍詳細:", info);
    }
};

// ボタンイベントリスナー

// 1. 基本オブジェクトボタン
document.getElementById("basic-btn").addEventListener("click", function() {
    console.log("👤 基本オブジェクトボタンがクリックされました");
    
    totalOperations++;
    basicOperations++;
    createdObjects++;
    
    createBasicObject();
    updateStats();
});

// 2. メソッド付きオブジェクトボタン
document.getElementById("method-btn").addEventListener("click", function() {
    console.log("🎭 メソッド付きオブジェクトボタンがクリックされました");
    
    totalOperations++;
    methodOperations++;
    createdObjects++;
    
    createMethodObject();
    updateStats();
});

// 3. ネストオブジェクトボタン
document.getElementById("nested-btn").addEventListener("click", function() {
    console.log("🏠 ネストオブジェクトボタンがクリックされました");
    
    totalOperations++;
    createdObjects++;
    
    createNestedObject();
    updateStats();
});

// 4. オブジェクト配列ボタン
document.getElementById("array-btn").addEventListener("click", function() {
    console.log("👥 オブジェクト配列ボタンがクリックされました");
    
    totalOperations++;
    createdObjects += 3; // 3人のチームメンバー
    
    createObjectArray();
    updateStats();
});

// 5. 動的生成ボタン
document.getElementById("dynamic-btn").addEventListener("click", function() {
    console.log("⚡ 動的生成ボタンがクリックされました");
    
    totalOperations++;
    dynamicOperations++;
    createdObjects++;
    
    createDynamicObject();
    updateStats();
});

// 6. 図書管理システムボタン
document.getElementById("system-btn").addEventListener("click", function() {
    console.log("📚 図書管理システムボタンがクリックされました");
    
    totalOperations++;
    libraryOperations++;
    
    initLibrarySystem();
    updateStats();
});

// 書籍追加ボタン
document.getElementById("add-book-btn").addEventListener("click", function() {
    console.log("📖 書籍追加ボタンがクリックされました");
    
    createdObjects++;
    addBook();
    updateStats();
});

// 初期化
updateStats();

console.log("✅ オブジェクトシステムが初期化されました！");
console.log("🏗️ オブジェクトの基本概念:");
console.log("  - オブジェクトリテラル: 基本的なオブジェクト作成方法");
console.log("  - プロパティ: オブジェクトが持つデータ");
console.log("  - メソッド: オブジェクトが持つ関数");
console.log("  - this: オブジェクト自身を参照するキーワード");
console.log("💡 各ボタンをクリックして、オブジェクトの様々な使い方を体験してください！");

// オブジェクトの例をコンソールに表示
setTimeout(() => {
    console.log("🎯 オブジェクトデモンストレーション:");
    const demoObject = {
        name: "デモオブジェクト",
        getValue() { return "メソッドの戻り値"; }
    };
    console.log("  サンプルオブジェクト:", demoObject);
    console.log("  プロパティアクセス:", demoObject.name);
    console.log("  メソッド実行:", demoObject.getValue());
}, 2000);