# ステップ17.6 - オブジェクトとデータ構造

## 🎯 学習目標

**オブジェクト指向プログラミングの入門**

- オブジェクトリテラルの基本構文と作成方法を学ぶ
- プロパティアクセス（ドット記法とブラケット記法）を習得する
- メソッド（オブジェクトに属する関数）の定義と実行を理解する
- thisの基本概念と使い方を理解する

## 📖 このステップの内容

### 🏗️ オブジェクト指向の基礎

このステップでは、**オブジェクト**という重要なプログラミング概念を学習します。

これまで学んだ変数と関数から、**関連するデータと処理をまとめた構造体**へとレベルアップします。

オブジェクトは「現実世界の物事をプログラムで表現する方法」として、現代プログラミングの中心的概念です。

### 📝 学習ポイント

#### 1. オブジェクトリテラル（基本的な作り方）
```javascript
// 最もシンプルなオブジェクト
const person = {
    name: "田中太郎",
    age: 30,
    job: "エンジニア"
};

console.log(person.name); // "田中太郎"
console.log(person.age);  // 30
```

#### 2. プロパティアクセス
```javascript
const person = {
    name: "田中太郎",
    age: 30
};

// ドット記法
console.log(person.name); // "田中太郎"

// ブラケット記法
console.log(person['age']); // 30

// 動的なプロパティ名
const propertyName = "name";
console.log(person[propertyName]); // "田中太郎"
```

#### 3. メソッド（オブジェクトの関数）
```javascript
const person = {
    name: "田中太郎",
    age: 30,
    
    // メソッドの定義
    introduce() {
        return `こんにちは、${this.name}です。`;
    },
    
    celebrateBirthday() {
        this.age++;
        return `${this.age}歳になりました！`;
    }
};

// メソッドの実行
console.log(person.introduce());           // "こんにちは、田中太郎です。"
console.log(person.celebrateBirthday());   // "31歳になりました！"
```

#### 4. thisの使用
```javascript
const calculator = {
    value: 0,
    
    add(number) {
        this.value += number;
        return this;
    },
    
    multiply(number) {
        this.value *= number;
        return this;
    },
    
    getResult() {
        return this.value;
    }
};

// メソッドチェーン
const result = calculator.add(5).multiply(3).getResult();
console.log(result); // 15
```

#### 5. ネストしたオブジェクト
```javascript
const person = {
    name: "田中太郎",
    address: {
        city: "東京",
        prefecture: "東京都",
        postalCode: "100-0001"
    },
    contact: {
        email: "tanaka@example.com",
        phone: "090-1234-5678"
    }
};

// ネストしたプロパティへのアクセス
console.log(person.address.city);          // "東京"
console.log(person.contact.email);         // "tanaka@example.com"
```

## 🏗️ 実装されたオブジェクト機能

### 6つのオブジェクト学習システム

1. **👤 基本オブジェクト**: 人物情報をプロパティで管理する基本形
2. **🎭 メソッド付き**: 自己紹介機能を持つオブジェクトとthisの使用
3. **🏠 ネストオブジェクト**: 住所情報などの階層構造を持つ複雑な構造
4. **👥 オブジェクト配列**: 複数人のデータを配列で管理するチーム構成
5. **⚡ 動的生成**: ユーザー入力を基にリアルタイムでオブジェクト作成
6. **📚 図書管理システム**: 実用的なオブジェクトシステムとクラス活用

### インタラクティブ入力機能

- **人物情報入力**: 名前、年齢、職業、都市の設定
- **趣味選択**: ドロップダウンでの趣味選択機能
- **図書情報入力**: タイトル、著者、ジャンル、ページ数の管理
- **リアルタイム反映**: 入力値に基づく即座のオブジェクト生成

### 高度な機能システム

- **メソッド実行**: オブジェクト内関数の動的実行
- **ネスト構造表示**: 階層化されたデータの視覚的表示
- **配列処理**: 複数オブジェクトの統計計算と管理
- **クラスシステム**: ES6クラス構文を使った書籍管理

## 🔍 コードの詳細解説

### 基本オブジェクトリテラル
```javascript
function createBasicObject() {
    // オブジェクトリテラル記法
    const person = {
        name: "田中太郎",
        age: 30,
        job: "Webデベロッパー",
        city: "東京",
        isWorking: true
    };
    
    // プロパティアクセスの例
    console.log("ドット記法: person.name =", person.name);
    console.log("ブラケット記法: person['age'] =", person['age']);
    
    return person;
}
```

### メソッド付きオブジェクト
```javascript
function createMethodObject() {
    const person = {
        name: "佐藤花子",
        age: 28,
        job: "デザイナー",
        hobby: "読書",
        
        // メソッドの定義（ES6記法）
        introduce() {
            return `こんにちは！${this.name}です。${this.age}歳の${this.job}をしています。`;
        },
        
        getHobbyMessage() {
            return `趣味は${this.hobby}です。`;
        },
        
        // thisを使ったプロパティの変更
        celebrateBirthday() {
            this.age++;
            return `🎉 お誕生日おめでとう！${this.age}歳になりました！`;
        }
    };
    
    // メソッド実行
    const introMessage = person.introduce();
    const hobbyMessage = person.getHobbyMessage();
    
    return person;
}
```

### ネストしたオブジェクト構造
```javascript
function createNestedObject() {
    const person = {
        name: "山田次郎",
        age: 35,
        
        // ネストしたオブジェクト：連絡先情報
        contact: {
            email: "yamada@example.com",
            phone: "090-1234-5678",
            social: {
                twitter: "@yamada_jiro",
                linkedin: "yamada-jiro"
            }
        },
        
        // ネストしたオブジェクト：住所情報
        address: {
            prefecture: "神奈川県",
            city: "横浜市",
            ward: "港北区",
            postalCode: "222-0001"
        },
        
        // 配列プロパティ
        skills: ["JavaScript", "Python", "React", "Node.js"],
        
        // ネストしたプロパティを使うメソッド
        getFullAddress() {
            return `${this.address.prefecture}${this.address.city}${this.address.ward}`;
        },
        
        getContactInfo() {
            return `📧 ${this.contact.email} 📱 ${this.contact.phone}`;
        }
    };
    
    // ネストしたプロパティへのアクセス例
    console.log("person.address.city =", person.address.city);
    console.log("person.contact.social.twitter =", person.contact.social.twitter);
    
    return person;
}
```

### オブジェクト配列の処理
```javascript
function createObjectArray() {
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
    
    // 配列内オブジェクトの集計処理
    const totalExperience = team.reduce((sum, member) => sum + member.experience, 0);
    const averageExperience = (totalExperience / team.length).toFixed(1);
    
    // 配列内オブジェクトへのアクセス例
    console.log("team[0].name =", team[0].name);
    console.log("team[1].skills =", team[1].skills);
    
    return team;
}
```

### 動的オブジェクト生成
```javascript
function createDynamicObject() {
    // HTMLフォームから値を取得
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
        }
    };
    
    return dynamicPerson;
}
```

### ES6クラスを使った図書管理システム
```javascript
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
    
    // 貸出処理メソッド
    borrow() {
        if (this.isAvailable) {
            this.isAvailable = false;
            this.borrowedDate = new Date().toLocaleDateString();
            return `📖 「${this.title}」を貸し出しました。`;
        } else {
            return `❌ 「${this.title}」は貸し出し中です。`;
        }
    }
    
    // 返却処理メソッド
    return() {
        if (!this.isAvailable) {
            this.isAvailable = true;
            this.borrowedDate = null;
            return `📚 「${this.title}」が返却されました。`;
        } else {
            return `❓ 「${this.title}」は既に返却されています。`;
        }
    }
    
    // 書籍情報取得メソッド
    getInfo() {
        const status = this.isAvailable ? "在庫あり" : `貸出中（${this.borrowedDate}から）`;
        return `📖 ${this.title} | 著者: ${this.author} | ${this.pages}ページ | ${status}`;
    }
}

// クラスのインスタンス化と使用
function addBook() {
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const genre = document.getElementById("book-genre").value;
    const pages = parseInt(document.getElementById("book-pages").value);
    
    // 新しいBookオブジェクトを作成
    const newBook = new Book(title, author, genre, pages);
    libraryBooks.push(newBook);
    
    console.log("📖 書籍追加完了:", newBook);
}
```

### オブジェクト表示システム
```javascript
function displayObject(obj, title = "オブジェクト") {
    let html = `<div class="object-card"><h4>${title}</h4>`;
    
    // オブジェクトのプロパティを動的に表示
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
```

## 🏃‍♀️ 実行方法

1. `index.html`をブラウザで開く
2. 6つのオブジェクトボタンをそれぞれ試す
3. 基本オブジェクトでプロパティアクセスを確認する
4. メソッド付きオブジェクトでthisの動作を確認する
5. ネストオブジェクトで階層構造を理解する
6. オブジェクト配列でチーム管理を体験する
7. 動的生成で入力フィールドの値を変更して結果の違いを確認する
8. 図書管理システムで実用的なオブジェクトシステムを体験する
9. 統計情報で各操作の実行回数を確認する
10. 開発者ツール（F12）でConsoleタブのオブジェクト詳細ログを確認

## ✅ 確認ポイント

このステップが完了したら、以下を確認してください：

- [ ] 6つのオブジェクト機能すべてを実行した
- [ ] 基本オブジェクトでプロパティの値が表示されることを確認した
- [ ] メソッド付きオブジェクトで自己紹介メッセージが表示されることを確認した
- [ ] ネストオブジェクトで住所情報が階層的に表示されることを確認した
- [ ] オブジェクト配列でチーム構成と統計情報が表示されることを確認した
- [ ] 動的生成で入力値に基づくオブジェクト作成ができることを確認した
- [ ] 図書管理システムで書籍の追加・貸出・返却が動作することを確認した
- [ ] 各オブジェクトの構造が詳細表示エリアで確認できることを確認した
- [ ] 統計情報が正しく更新されることを確認した
- [ ] コンソールでオブジェクトの詳細構造を確認した

### 期待される動作例
- **基本オブジェクト**: "田中太郎さん（30歳）"が表示され、プロパティが一覧される
- **メソッド付き**: "こんにちは！佐藤花子です。28歳のデザイナーをしています。"が表示される
- **ネストオブジェクト**: "山田次郎さん（神奈川県横浜市港北区在住）"が表示される
- **オブジェクト配列**: "チーム3名（平均経験5.3年）"のような統計情報が表示される
- **動的生成**: 入力した値に基づく自己紹介メッセージが表示される
- **図書管理**: 書籍追加後にリストに反映され、貸出・返却操作が動作する

## 🎨 試してみよう

慣れてきたら、以下にチャレンジしてみましょう：

1. **カスタム人物オブジェクト**
   ```javascript
   // 開発者ツールのコンソールで実行
   const myPerson = {
       name: "自分の名前",
       skills: ["JavaScript", "HTML", "CSS"],
       introduce() {
           return `${this.name}です。スキル: ${this.skills.join(", ")}`;
       }
   };
   
   console.log(myPerson.introduce());
   ```

2. **計算機オブジェクト**
   ```javascript
   const calculator = {
       result: 0,
       add(number) {
           this.result += number;
           return this;
       },
       multiply(number) {
           this.result *= number;
           return this;
       },
       getResult() {
           return this.result;
       }
   };
   
   console.log(calculator.add(10).multiply(2).getResult()); // 20
   ```

3. **商品オブジェクト配列**
   ```javascript
   const products = [
       { name: "ノートPC", price: 80000, category: "電子機器" },
       { name: "マウス", price: 2000, category: "電子機器" },
       { name: "本", price: 1500, category: "書籍" }
   ];
   
   const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
   console.log(`合計金額: ${totalPrice}円`);
   
   const electronics = products.filter(p => p.category === "電子機器");
   console.log("電子機器:", electronics);
   ```

4. **ネストした設定オブジェクト**
   ```javascript
   const appConfig = {
       ui: {
           theme: "dark",
           language: "ja",
           fontSize: 16
       },
       api: {
           endpoint: "https://api.example.com",
           timeout: 5000
       },
       getTheme() {
           return this.ui.theme;
       },
       updateTheme(newTheme) {
           this.ui.theme = newTheme;
           console.log(`テーマを${newTheme}に変更しました`);
       }
   };
   
   console.log("現在のテーマ:", appConfig.getTheme());
   appConfig.updateTheme("light");
   ```

## 💡 オブジェクトの重要な特徴

### データの整理と構造化
```javascript
// バラバラの変数（良くない例）
let userName = "田中太郎";
let userAge = 30;
let userJob = "エンジニア";

// オブジェクトでまとめる（良い例）
const user = {
    name: "田中太郎",
    age: 30,
    job: "エンジニア"
};
```

### 関連する処理のグループ化
```javascript
const bankAccount = {
    balance: 10000,
    
    deposit(amount) {
        this.balance += amount;
        return `${amount}円を入金しました。残高: ${this.balance}円`;
    },
    
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            return `${amount}円を出金しました。残高: ${this.balance}円`;
        } else {
            return "残高不足です";
        }
    },
    
    getBalance() {
        return this.balance;
    }
};
```

### プロパティの動的操作
```javascript
const person = { name: "田中" };

// プロパティの追加
person.age = 30;
person["hobby"] = "読書";

// プロパティの削除
delete person.hobby;

// プロパティの存在確認
console.log("name" in person);           // true
console.log(person.hasOwnProperty("age")); // true

// 全プロパティの取得
console.log(Object.keys(person));        // ["name", "age"]
console.log(Object.values(person));      // ["田中", 30]
```

## 💡 実世界での応用例

このオブジェクト技術は以下で活用されます：

### Webアプリケーション
- **ユーザー管理**: ログイン情報、プロフィール、設定の統合管理
- **商品システム**: 商品情報、価格、在庫状況の構造化
- **フォームデータ**: 複数入力項目の一括処理と検証
- **設定管理**: アプリケーション設定の階層的管理

### データベース連携
- **レコード表現**: データベースの1行をオブジェクトで表現
- **API通信**: JSON形式でのデータ送受信
- **データ変換**: データベース形式と画面表示形式の相互変換
- **バリデーション**: データの整合性チェックと例外処理

### ゲーム開発
- **キャラクター管理**: HP、攻撃力、スキルなどのステータス
- **アイテムシステム**: 武器、防具、消耗品の属性管理
- **ゲーム状態**: 進行状況、設定、プレイヤーデータ
- **マップ情報**: 位置、地形、オブジェクトの配置

### ビジネスシステム
- **顧客管理**: 連絡先、購入履歴、嗜好データ
- **在庫管理**: 商品コード、数量、場所、期限
- **売上分析**: 期間、商品別、地域別の集計データ
- **人事システム**: 従業員情報、部署、給与、勤怠

### UI/UXデザイン
- **コンポーネント**: 再利用可能なUI部品とその状態
- **アニメーション**: 動きのパラメータと制御メソッド
- **テーマシステム**: 色、フォント、レイアウトの体系化
- **レスポンシブ**: デバイス別表示設定の管理

## 📈 次のステップへ

おめでとうございます！オブジェクトとデータ構造の基礎をマスターしました！🎉

これで**関数とデータ構造段階（17.5-17.6）**が完了しました。次は**ステップ18 - 簡単な電卓**に進み、学んだ知識を統合した実用的なアプリケーション開発に挑戦します。

---

**💡 オブジェクト指向の基礎習得完了**

今日学んだオブジェクトは、現代プログラミングの核心概念です。データと処理の統合、再利用性の向上、複雑なシステムの構造化—これらすべてを実現する力を身につけました。

オブジェクトリテラルからクラス、プロパティからメソッド、単純な構造から複雑な階層まで。あなたはオブジェクト指向プログラミングの扉を開きました。

**現実世界をプログラムで表現する力。**  
**関連するデータと処理をまとめる思考力。**  
**保守可能で拡張性の高いコードを書く技術。**

これらのスキルは、どんなプログラミング言語、どんなプロジェクトでも活用できる普遍的な力です。

**あなたはオブジェクト指向の基礎をマスターしました！** 🚀

## 🎓 関数とデータ構造段階 完了

ステップ17.5から17.6まで、お疲れ様でした！

あなたが学んだスキル：
- ✅ 関数の定義と呼び出し（17.5）
- ✅ オブジェクトとデータ構造（17.6）

次の段階では、これらの知識を統合して実用的なアプリケーション開発に進みます！

**プログラミングの基本構造は完璧です。次は実践の時間です！** ✨