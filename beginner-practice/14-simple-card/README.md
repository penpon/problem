# ステップ14: シンプルカード

## 🎯 学習目標

**Flexbox、影、角丸を組み合わせて美しいカードを作る**

- これまで学んだ技術を組み合わせてカードを作る
- カードのレイアウト構造を理解する
- 画像、テキスト、ボタンを含むカードを作成する
- レスポンシブなカードグリッドを作成する

## 📝 学習内容

### **今回組み合わせる技術**
- **Flexbox**: カードの配置とレイアウト
- **box-shadow**: カードに立体感を与える
- **border-radius**: 角丸で現代的な見た目
- **transition**: ホバー時の滑らかな変化
- **hover効果**: インタラクティブな操作感

### **前回の復習**
- display: flexとjustify-content
- align-itemsとflex-direction
- gap プロパティで余白調整

### **重要なポイント**
1. **カード**は独立したコンテンツの単位
2. **一貫したデザイン**でユーザビリティを向上
3. **ホバー効果**で操作可能であることを示す

## 🔍 カードデザインの原則

### **基本構造**
```html
<div class="card">
    <img src="image.jpg" alt="画像">
    <div class="card-content">
        <h3>タイトル</h3>
        <p>説明文</p>
        <button>アクション</button>
    </div>
</div>
```

### **カードの特徴**
- **境界線**: 明確な境界で内容をグループ化
- **影**: 浮いているような立体感
- **角丸**: やわらかく親しみやすい印象
- **ホバー効果**: インタラクション可能性を示唆

## 🔍 コードの説明

### **HTML（index.html）**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <title>シンプルカード</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>美しいカードレイアウト</h1>
    
    <h2>1. 基本的なカード</h2>
    <div class="card-container">
        <div class="card basic-card">
            <h3>基本カード</h3>
            <p>シンプルなカードデザインです。影と角丸で立体感を表現しています。</p>
        </div>
        <div class="card basic-card">
            <h3>ホバー効果</h3>
            <p>マウスを載せると少し浮き上がります。ユーザーに操作可能性を示します。</p>
        </div>
    </div>
    
    <h2>2. 画像付きカード</h2>
    <div class="card-container">
        <div class="card image-card">
            <div class="card-image">
                <div class="placeholder-image">📷</div>
            </div>
            <div class="card-content">
                <h3>写真カード</h3>
                <p>画像とテキストを組み合わせたカードです。</p>
                <span class="card-tag">写真</span>
            </div>
        </div>
        <div class="card image-card">
            <div class="card-image">
                <div class="placeholder-image">🎨</div>
            </div>
            <div class="card-content">
                <h3>アートカード</h3>
                <p>クリエイティブな内容を紹介するカードです。</p>
                <span class="card-tag">デザイン</span>
            </div>
        </div>
        <div class="card image-card">
            <div class="card-image">
                <div class="placeholder-image">💡</div>
            </div>
            <div class="card-content">
                <h3>アイデアカード</h3>
                <p>新しいアイデアや提案を表示するカードです。</p>
                <span class="card-tag">アイデア</span>
            </div>
        </div>
    </div>
    
    <h2>3. アクション付きカード</h2>
    <div class="card-container">
        <div class="card action-card">
            <h3>プロジェクトA</h3>
            <p>素晴らしいプロジェクトの詳細を確認できます。</p>
            <div class="card-footer">
                <span class="card-price">¥2,980</span>
                <button class="card-button primary">詳細を見る</button>
            </div>
        </div>
        <div class="card action-card">
            <h3>プロジェクトB</h3>
            <p>革新的なソリューションを提供します。</p>
            <div class="card-footer">
                <span class="card-price">¥4,500</span>
                <button class="card-button primary">詳細を見る</button>
            </div>
        </div>
    </div>
    
    <h2>4. プロフィールカード</h2>
    <div class="card-container">
        <div class="card profile-card">
            <div class="profile-avatar">👨‍💻</div>
            <h3>田中 太郎</h3>
            <p class="profile-role">フロントエンドエンジニア</p>
            <p class="profile-bio">React、Vue.jsを得意とするフロントエンド開発者です。</p>
            <div class="profile-stats">
                <div class="stat">
                    <span class="stat-number">42</span>
                    <span class="stat-label">プロジェクト</span>
                </div>
                <div class="stat">
                    <span class="stat-number">1.2k</span>
                    <span class="stat-label">フォロワー</span>
                </div>
            </div>
            <button class="card-button secondary">フォローする</button>
        </div>
        <div class="card profile-card">
            <div class="profile-avatar">👩‍🎨</div>
            <h3>佐藤 花子</h3>
            <p class="profile-role">UIUXデザイナー</p>
            <p class="profile-bio">使いやすく美しいインターフェースをデザインします。</p>
            <div class="profile-stats">
                <div class="stat">
                    <span class="stat-number">28</span>
                    <span class="stat-label">デザイン</span>
                </div>
                <div class="stat">
                    <span class="stat-number">856</span>
                    <span class="stat-label">いいね</span>
                </div>
            </div>
            <button class="card-button secondary">フォローする</button>
        </div>
    </div>
    
    <h2>5. 統計カード</h2>
    <div class="card-container stats-container">
        <div class="card stats-card">
            <div class="stats-icon">📈</div>
            <div class="stats-content">
                <h3>売上</h3>
                <p class="stats-number">¥1,250,000</p>
                <p class="stats-change positive">+12.5%</p>
            </div>
        </div>
        <div class="card stats-card">
            <div class="stats-icon">👥</div>
            <div class="stats-content">
                <h3>ユーザー</h3>
                <p class="stats-number">8,420</p>
                <p class="stats-change positive">+8.2%</p>
            </div>
        </div>
        <div class="card stats-card">
            <div class="stats-icon">📊</div>
            <div class="stats-content">
                <h3>コンバージョン</h3>
                <p class="stats-number">3.8%</p>
                <p class="stats-change negative">-1.2%</p>
            </div>
        </div>
        <div class="card stats-card">
            <div class="stats-icon">⭐</div>
            <div class="stats-content">
                <h3>評価</h3>
                <p class="stats-number">4.7</p>
                <p class="stats-change positive">+0.3</p>
            </div>
        </div>
    </div>
</body>
</html>
```

### **CSS（style.css）**
```css
/* 基本スタイル */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: #333;
}

h1 {
    text-align: center;
    color: white;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 30px;
    margin: 0 0 40px 0;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    font-size: 28px;
}

h2 {
    color: white;
    margin: 50px 0 30px 0;
    padding: 15px 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    backdrop-filter: blur(5px);
    font-size: 22px;
}

/* カードコンテナ */
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    margin-bottom: 40px;
    justify-content: center;
}

.stats-container {
    justify-content: space-around;
}

/* 基本カードスタイル */
.card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    overflow: hidden;
    position: relative;
}

.card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

/* 1. 基本カード */
.basic-card {
    padding: 30px;
    max-width: 300px;
    text-align: center;
}

.basic-card h3 {
    margin: 0 0 15px 0;
    color: #2c3e50;
    font-size: 20px;
}

.basic-card p {
    margin: 0;
    color: #7f8c8d;
    line-height: 1.6;
}

/* 2. 画像付きカード */
.image-card {
    max-width: 280px;
    overflow: hidden;
}

.card-image {
    height: 180px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.placeholder-image {
    font-size: 48px;
    color: white;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.card-content {
    padding: 25px;
    position: relative;
}

.card-content h3 {
    margin: 0 0 10px 0;
    color: #2c3e50;
    font-size: 18px;
}

.card-content p {
    margin: 0 0 15px 0;
    color: #7f8c8d;
    line-height: 1.5;
}

.card-tag {
    display: inline-block;
    background: #667eea;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
}

/* 3. アクション付きカード */
.action-card {
    max-width: 300px;
    padding: 25px;
    display: flex;
    flex-direction: column;
}

.action-card h3 {
    margin: 0 0 10px 0;
    color: #2c3e50;
    font-size: 20px;
}

.action-card p {
    margin: 0 0 auto 0;
    color: #7f8c8d;
    line-height: 1.6;
    flex-grow: 1;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #ecf0f1;
}

.card-price {
    font-size: 20px;
    font-weight: bold;
    color: #e74c3c;
}

.card-button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;
}

.card-button.primary {
    background: #667eea;
    color: white;
}

.card-button.primary:hover {
    background: #5a6fd8;
    transform: translateY(-1px);
}

.card-button.secondary {
    background: #ecf0f1;
    color: #2c3e50;
    border: 2px solid #bdc3c7;
}

.card-button.secondary:hover {
    background: #d5dbdb;
    border-color: #95a5a6;
}

/* 4. プロフィールカード */
.profile-card {
    max-width: 280px;
    padding: 30px;
    text-align: center;
}

.profile-avatar {
    width: 80px;
    height: 80px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    margin: 0 auto 20px auto;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.profile-card h3 {
    margin: 0 0 5px 0;
    color: #2c3e50;
    font-size: 22px;
}

.profile-role {
    margin: 0 0 15px 0;
    color: #667eea;
    font-weight: bold;
    font-size: 14px;
}

.profile-bio {
    margin: 0 0 25px 0;
    color: #7f8c8d;
    line-height: 1.5;
    font-size: 14px;
}

.profile-stats {
    display: flex;
    justify-content: space-around;
    margin-bottom: 25px;
    padding: 20px 0;
    border-top: 1px solid #ecf0f1;
    border-bottom: 1px solid #ecf0f1;
}

.stat {
    text-align: center;
}

.stat-number {
    display: block;
    font-size: 20px;
    font-weight: bold;
    color: #2c3e50;
}

.stat-label {
    font-size: 12px;
    color: #95a5a6;
    text-transform: uppercase;
}

/* 5. 統計カード */
.stats-card {
    padding: 25px;
    min-width: 200px;
    display: flex;
    align-items: center;
    gap: 20px;
}

.stats-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
}

.stats-content h3 {
    margin: 0 0 5px 0;
    color: #7f8c8d;
    font-size: 14px;
    font-weight: normal;
    text-transform: uppercase;
}

.stats-number {
    margin: 0 0 5px 0;
    font-size: 24px;
    font-weight: bold;
    color: #2c3e50;
}

.stats-change {
    margin: 0;
    font-size: 12px;
    font-weight: bold;
}

.stats-change.positive {
    color: #27ae60;
}

.stats-change.positive::before {
    content: '↗ ';
}

.stats-change.negative {
    color: #e74c3c;
}

.stats-change.negative::before {
    content: '↘ ';
}

/* レスポンシブデザイン */
@media (max-width: 768px) {
    body {
        padding: 15px;
    }
    
    .card-container {
        flex-direction: column;
        align-items: center;
    }
    
    .card {
        max-width: 100%;
        width: 100%;
        max-width: 400px;
    }
    
    .stats-container {
        flex-direction: column;
    }
    
    .stats-card {
        min-width: auto;
    }
}

@media (max-width: 480px) {
    h1 {
        font-size: 24px;
        padding: 20px;
    }
    
    h2 {
        font-size: 18px;
        padding: 12px 15px;
    }
    
    .card {
        max-width: 100%;
    }
    
    .card-footer {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
    }
    
    .card-button {
        width: 100%;
        padding: 12px;
    }
}
```

## 📐 カードデザインのベストプラクティス

### **1. 一貫性のあるスタイル**
```css
.card {
    border-radius: 16px;  /* 統一された角丸 */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);  /* 統一された影 */
    transition: all 0.3s ease;  /* 統一されたアニメーション */
}
```

### **2. 適切な余白とサイズ**
```css
.card-content {
    padding: 25px;  /* 十分な内側余白 */
}

.card-container {
    gap: 25px;  /* カード間の適切な余白 */
}
```

### **3. アクセシビリティを考慮**
```css
.card-button {
    min-height: 44px;  /* タップしやすいサイズ */
    cursor: pointer;
}

.card:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
}
```

## 🚀 実践してみよう

### **手順1: ファイルを開く**
`14-simple-card/index.html` をブラウザで開いてください。

### **手順2: 各カードの確認**
- **基本カード**：シンプルなテキストカード
- **画像付きカード**：視覚的な要素を含むカード
- **アクション付きカード**：ボタンや価格を含むカード
- **プロフィールカード**：人物紹介用のカード
- **統計カード**：データ表示用のカード

### **手順3: ホバー効果とレスポンシブ**
各カードにマウスを載せ、ブラウザ幅を変えて動作を確認してください。

## ✨ 試してみよう

以下を変更して、変化を確認してみましょう：

### **1. カードの色を変更**
```css
.card {
    background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
}
```

### **2. ホバー効果をカスタマイズ**
```css
.card:hover {
    transform: scale(1.05) rotate(1deg);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}
```

### **3. 新しいカードタイプを追加**
```css
.news-card {
    border-left: 4px solid #e74c3c;
    padding: 20px;
}

.news-card::before {
    content: '📰';
    font-size: 20px;
    margin-right: 10px;
}
```

## 📖 豆知識

### **カードの最適なサイズ**
- **幅**: 280px〜350px（読みやすい幅）
- **高さ**: 内容に応じて可変
- **余白**: 20px〜30px（十分な呼吸感）

### **影の使い分け**
```css
/* 浅い影：さりげない立体感 */
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

/* 深い影：強い立体感 */
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

/* ホバー時：浮き上がり感 */
box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
```

### **Flexboxでの配置**
```css
/* 等間隔配置 */
.card-container {
    display: flex;
    justify-content: space-between;
}

/* 中央寄せ配置 */
.card-container {
    display: flex;
    justify-content: center;
    gap: 20px;
}
```

## ⚠️ よくある間違い

### **1. カードが大きすぎる**
```css
/* 避ける：幅が大きすぎる */
.card {
    width: 500px;  /* 読みにくい */
}

/* 推奨：適度な幅 */
.card {
    max-width: 320px;
}
```

### **2. 余白が不足**
```css
/* 避ける：余白が少ない */
.card {
    padding: 5px;  /* 窮屈 */
}

/* 推奨：十分な余白 */
.card {
    padding: 25px;
}
```

### **3. ホバー効果が強すぎる**
```css
/* 避ける：過度なアニメーション */
.card:hover {
    transform: scale(1.5) rotate(45deg);  /* やりすぎ */
}

/* 推奨：控えめな効果 */
.card:hover {
    transform: translateY(-5px);
}
```

## ✅ このステップでできるようになること

- [ ] 基本的なカードレイアウトを作れる
- [ ] 画像、テキスト、ボタンを組み合わせられる
- [ ] Flexboxでカードを美しく配置できる
- [ ] ホバー効果でインタラクティブにできる
- [ ] レスポンシブなカードグリッドを作れる
- [ ] 異なる種類のカード（プロフィール、統計など）を作れる

## 📚 次のステップ

次は **ステップ15: ホバー効果** でさらに豊富なインタラクション効果を学びます！

---

**🎉 美しいカードデザインができるようになりました！これまでの技術を組み合わせて実用的なUIコンポーネントが作れますね！**