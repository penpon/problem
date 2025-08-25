# 29-image-gallery：画像ギャラリーシステムの構築

## 🎯 学習目標
このステップでは、ECサイトに不可欠な画像ギャラリーシステムを構築します。商品画像のスライダー、ズーム機能、サムネイル表示、画像の遅延読み込みなど、パフォーマンスとユーザーエクスペリエンスを重視したシステムを学びます。

### 具体的に身につくスキル
- イメージスライダーの実装（スワイプ対応）
- ズーム機能とパン操作
- Lazy Loading（遅延読み込み）の実装
- Intersection Observer APIの活用
- タッチイベントとジェスチャー対応

## 📖 学習内容

### 今回学ぶ新しい概念
**Intersection Observer API** - 要素の表示状態を監視
- 要素がビューポートに入ったときの処理
- パフォーマンスに優しい監視方法
- Lazy Loadingの効率的な実装

**Touch Events** - モバイルデバイス対応
- `touchstart`, `touchmove`, `touchend`イベント
- スワイプジェスチャーの判定
- ピンチズームの実装

### 実装する機能
1. **商品画像スライダー** - 複数画像のスライド表示
2. **サムネイルギャラリー** - 小さな画像一覧
3. **ズーム機能** - 画像の拡大・縮小
4. **フルスクリーンモード** - 画像の全画面表示
5. **Lazy Loading** - 画像の遅延読み込み
6. **スワイプ操作** - モバイルデバイスでのジェスチャー対応

## 📝 学習ポイント

### 💡 Lazy Loadingの実装
```javascript
class LazyImageLoader {
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      { threshold: 0.1 }
    );
  }
  
  observe(img) {
    this.observer.observe(img);
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }
  
  loadImage(img) {
    const src = img.dataset.src;
    if (src) {
      img.src = src;
      img.classList.add('loaded');
    }
  }
}
```

### 💡 スワイプ操作の実装
```javascript
class SwipeGallery {
  constructor(container) {
    this.container = container;
    this.currentIndex = 0;
    this.startX = 0;
    this.isDragging = false;
    
    this.bindEvents();
  }
  
  bindEvents() {
    this.container.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.container.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.container.addEventListener('touchend', this.handleTouchEnd.bind(this));
  }
  
  handleTouchStart(e) {
    this.startX = e.touches[0].clientX;
    this.isDragging = true;
  }
  
  handleTouchMove(e) {
    if (!this.isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = this.startX - currentX;
    
    // スワイプ方向を判定
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.nextImage();
      } else {
        this.previousImage();
      }
      this.isDragging = false;
    }
  }
}
```

## 🚀 実装のコツ
- 画像のプリロードとパフォーマンス最適化
- アクセシビリティ対応（キーボード操作、スクリーンリーダー）
- 適切なalt属性とARIAラベル
- エラーハンドリングとフォールバック画像

## ✅ 完成チェックリスト
- [ ] 画像スライダーが動作する
- [ ] サムネイルギャラリーが機能する
- [ ] ズーム機能が動作する
- [ ] Lazy Loadingが実装されている
- [ ] スワイプ操作が機能する
- [ ] キーボード操作が可能
- [ ] アクセシビリティが適切に実装されている

## 🔗 次のステップ
次は「30-notification-system」で通知システムの構築を学びます。

---
**💻 ビジュアルに魅力的な画像ギャラリーはECサイトの転換率向上に直結します！**