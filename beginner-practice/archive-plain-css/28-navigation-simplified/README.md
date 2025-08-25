# 28-navigation-simplified：基本ナビゲーションシステムの構築

## 🎯 学習目標
このステップでは、ECサイトで最も基本的なナビゲーション機能を段階的に学びます。複雑な機能は除外し、初心者が理解しやすい基本的なメニュー表示とハンバーガーメニューの実装に集中します。

### 具体的に身につくスキル
- 基本的なナビゲーションメニューの作成
- ハンバーガーメニューの実装
- シンプルなレスポンシブ対応
- メニューの開閉アニメーション

## 📖 学習内容

### 今回学ぶ新しい概念
**CSS Flexbox基礎** - 現代的なレイアウト手法
- フレキシブルなメニューレイアウト
- メニュー項目の配置と調整
- シンプルなレスポンシブ対応

**ハンバーガーメニューの基本** - モバイル対応の基礎
- CSS での表示切り替え
- JavaScriptでのクリックイベント処理
- シンプルなアニメーション効果

### 実装する機能
1. **メインナビゲーション** 🏠 - ホーム、商品、お問い合わせなどの基本メニュー
2. **ハンバーガーメニュー** 🍔 - モバイル用の3本線メニュー
3. **メニュー開閉機能** 📱 - タップで開いて閉じる機能
4. **基本アニメーション** ✨ - 滑らかな表示・非表示

## 📝 学習ポイント

### 💡 基本的なナビゲーション構造
```html
<nav class="main-navigation">
  <div class="nav-container">
    <!-- ロゴエリア -->
    <div class="nav-brand">
      <h1>Fashion Store</h1>
    </div>
    
    <!-- デスクトップメニュー -->
    <ul class="nav-menu">
      <li><a href="#home">ホーム</a></li>
      <li><a href="#products">商品一覧</a></li>
      <li><a href="#about">お店について</a></li>
      <li><a href="#contact">お問い合わせ</a></li>
    </ul>
    
    <!-- モバイル用ハンバーガーボタン -->
    <button class="hamburger-btn">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</nav>
```

### 💡 シンプルなレスポンシブスタイル
```css
/* 基本のナビゲーションスタイル */
.main-navigation {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 0;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* デスクトップメニュー */
.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-menu a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-menu a:hover {
  color: #3498db;
}

/* ハンバーガーメニューボタン */
.hamburger-btn {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger-btn span {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 3px 0;
  transition: 0.3s;
}

/* モバイル対応 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    flex-direction: column;
    background-color: #2c3e50;
    padding: 1rem 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .nav-menu.active {
    display: flex;
  }
  
  .hamburger-btn {
    display: flex;
  }
}
```

### 💡 メニュー開閉のJavaScript
```javascript
// ハンバーガーメニューの制御
class SimpleNavigation {
  constructor() {
    this.hamburgerBtn = document.querySelector('.hamburger-btn');
    this.navMenu = document.querySelector('.nav-menu');
    this.isMenuOpen = false;
    
    this.init();
  }
  
  init() {
    if (this.hamburgerBtn) {
      this.hamburgerBtn.addEventListener('click', () => {
        this.toggleMenu();
      });
    }
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    // メニューの表示切り替え
    if (this.isMenuOpen) {
      this.navMenu.classList.add('active');
    } else {
      this.navMenu.classList.remove('active');
    }
    
    // ハンバーガーアイコンのアニメーション
    this.hamburgerBtn.classList.toggle('active', this.isMenuOpen);
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  new SimpleNavigation();
});
```

## 🚀 実装のコツ
- シンプルな構造を保ち、一つずつ機能を追加
- モバイルファーストでスタイルを作成
- 基本的なアニメーションから始める
- コンソールでエラーがないか確認

## ✅ 完成チェックリスト
- [ ] デスクトップでメニューが横並びで表示される
- [ ] モバイルでハンバーガーボタンが表示される
- [ ] ハンバーガーボタンをクリックするとメニューが開く
- [ ] もう一度クリックするとメニューが閉じる
- [ ] メニューリンクにホバー効果がある
- [ ] 768px以下でレスポンシブ対応される
- [ ] コンソールにエラーが表示されない

## 🔗 次のステップ
次は「29.1-image-gallery-basic」で基本的な画像ギャラリー機能を学びます。

---
**💻 シンプルで使いやすいナビゲーションは、ECサイト成功の第一歩です！**