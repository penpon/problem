# 28-navigation-system：ナビゲーションシステムの構築

## 🎯 学習目標
このステップでは、ECサイトに不可欠なナビゲーションシステムを構築します。レスポンシブメニュー、ドロップダウンサブメニュー、パンくずナビ、ページ内リンクなど、ユーザビリティとアクセシビリティを重視したナビゲーションを学びます。

### 具体的に身につくスキル
- レスポンシブメニューの実装（ハンバーガーメニュー）
- ドロップダウンサブメニューの作成
- パンくずナビゲーションの構築
- ページ内スムーズスクロール
- キーボードナビゲーション対応

## 📖 学習内容

### 今回学ぶ新しい概念
**CSS Flexbox/Grid レイアウト** - 現代的なレイアウト手法
- フレキシブルなメニューレイアウト
- グリッドシステムでのコンテンツ配置
- メディアクエリでのレスポンシブ対応

**スムーズスクロール** - ユーザーエクスペリエンスの向上
- `scrollIntoView()`メソッドの活用
- CSS `scroll-behavior: smooth`の実装
- アンカーリンクの最適化

### 実装する機能
1. **メインナビゲーション** - ホーム、商品、カテゴリ等のメインメニュー
2. **ハンバーガーメニュー** - モバイル用のコンパクトメニュー
3. **ドロップダウンメニュー** - カテゴリのサブメニュー表示
4. **パンくずナビ** - 現在位置を示すナビゲーション
5. **ページ内リンク** - スムーズスクロール付きアンカー
6. **サイドバーメニュー** - フィルターやカテゴリー選択

## 📝 学習ポイント

### 💡 レスポンシブメニューの実装
```css
/* デスクトップ用メニュー */
.main-nav {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

/* モバイル用スタイル */
@media (max-width: 768px) {
  .main-nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    flex-direction: column;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .main-nav.active {
    display: flex;
  }
  
  .hamburger {
    display: flex;
  }
}
```

### 💡 スムーズスクロールの実装
```javascript
function smoothScrollTo(targetId) {
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// パンくずナビの更新
function updateBreadcrumb(path) {
  const breadcrumb = document.getElementById('breadcrumb');
  const pathItems = path.split('/').filter(item => item);
  
  const breadcrumbHTML = [
    '<a href="/">\u30db\u30fc\u30e0</a>'
  ].concat(
    pathItems.map((item, index) => {
      const isLast = index === pathItems.length - 1;
      const href = '/' + pathItems.slice(0, index + 1).join('/');
      
      if (isLast) {
        return `<span class="current">${item}</span>`;
      } else {
        return `<a href="${href}">${item}</a>`;
      }
    })
  ).join(' > ');
  
  breadcrumb.innerHTML = breadcrumbHTML;
}
```

## 🚀 実装のコツ
- WAI-ARIA属性でアクセシビリティ向上
- キーボードナビゲーション対応
- フォーカス管理とフォーカストラップ
- セマンティックHTMLの使用

## ✅ 完成チェックリスト
- [ ] メインナビゲーションが正しく表示される
- [ ] ハンバーガーメニューがモバイルで動作する
- [ ] ドロップダウンメニューが機能する
- [ ] パンくずナビが正しく表示される
- [ ] スムーズスクロールが動作する
- [ ] キーボードナビゲーションが機能する
- [ ] アクセシビリティが適切に実装されている

## 🔗 次のステップ
次は「29-image-gallery」で画像ギャラリーシステムの構築を学びます。

---
**💻 直感的なナビゲーションはECサイトのユーザビリティを大きく左右します！**