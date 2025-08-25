# 29.2-image-expand-display：画像拡大表示機能の構築

## 🎯 学習目標
このステップでは、基本的なギャラリー機能に加えて、画像をクリックして拡大表示する機能を学びます。モーダル連携での画像拡大に集中し、複雑なズーム機能は除外してシンプルに実装します。

### 具体的に身につくスキル
- クリックでの画像拡大表示
- モーダルウィンドウとの連携
- オーバーレイ背景の実装
- 画像の中央揃えと適切なサイズ調整

## 📖 学習内容

### 今回学ぶ新しい概念
**モーダルウィンドウ** - ポップアップ表示の基礎
- オーバーレイ背景の作成
- モーダルの開閉制御
- 適切なz-indexの管理

**イベントバブリング** - イベント処理の詳細
- クリックイベントの伝播防止
- 背景クリックでの閉じる処理
- Escapeキーでの閉じる処理

### 実装する機能
1. **画像拡大モーダル** 🔍 - クリックで画像を大きく表示
2. **オーバーレイ背景** 🌑 - 半透明の背景でフォーカス
3. **閉じる機能** ❌ - 背景クリック・Escapeキー・閉じるボタン
4. **画像切り替え** ⬅️➡️ - モーダル内でも画像切り替え可能

## 📝 学習ポイント

### 💡 拡大表示のHTML構造
```html
<div class="image-gallery">
  <!-- 基本ギャラリー（29.1の内容） -->
  <div class="main-image-container">
    <img id="mainImage" src="images/product-1.jpg" alt="商品画像" class="expandable">
    
    <!-- 拡大ボタン -->
    <button class="expand-btn" id="expandBtn">🔍</button>
  </div>
  
  <!-- サムネイル（省略） -->
</div>

<!-- 拡大表示モーダル -->
<div id="expandModal" class="modal-overlay">
  <div class="modal-content">
    <!-- 閉じるボタン -->
    <button class="modal-close" id="modalClose">✕</button>
    
    <!-- 拡大画像 -->
    <div class="expanded-image-container">
      <img id="expandedImage" src="" alt="">
      
      <!-- モーダル内ナビゲーション -->
      <button class="modal-nav-btn modal-prev" id="modalPrev">❮</button>
      <button class="modal-nav-btn modal-next" id="modalNext">❯</button>
    </div>
    
    <!-- 画像情報 -->
    <div class="image-info">
      <p id="imageCounter">1 / 3</p>
      <p id="imageDescription">商品画像1</p>
    </div>
  </div>
</div>
```

### 💡 モーダルスタイルの実装
```css
/* モーダルオーバーレイ */
.modal-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  justify-content: center;
  align-items: center;
}

.modal-overlay.active {
  display: flex;
}

/* モーダルコンテンツ */
.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

/* 拡大画像 */
.expanded-image-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

#expandedImage {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  display: block;
}

/* 閉じるボタン */
.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
  transition: background-color 0.3s;
}

.modal-close:hover {
  background: white;
}

/* 拡大ボタン */
.expand-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.expand-btn:hover {
  background: white;
}

/* 画像情報 */
.image-info {
  padding: 1rem;
  text-align: center;
  background: white;
}

.image-info p {
  margin: 0.5rem 0;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .modal-content {
    max-width: 95%;
    max-height: 95%;
  }
  
  #expandedImage {
    max-height: 60vh;
  }
}
```

### 💡 拡大表示のJavaScript
```javascript
// 画像拡大表示クラス
class ImageExpandDisplay {
  constructor() {
    this.images = [
      {
        main: 'images/product-1.jpg',
        alt: '商品画像1'
      },
      {
        main: 'images/product-2.jpg',
        alt: '商品画像2'
      },
      {
        main: 'images/product-3.jpg',
        alt: '商品画像3'
      }
    ];
    
    this.currentIndex = 0;
    this.modal = document.getElementById('expandModal');
    this.expandedImage = document.getElementById('expandedImage');
    this.expandBtn = document.getElementById('expandBtn');
    this.modalClose = document.getElementById('modalClose');
    this.imageCounter = document.getElementById('imageCounter');
    this.imageDescription = document.getElementById('imageDescription');
    
    this.init();
  }
  
  init() {
    // 拡大ボタンクリック
    this.expandBtn.addEventListener('click', () => {
      this.openModal();
    });
    
    // メイン画像クリックでも拡大
    document.getElementById('mainImage').addEventListener('click', () => {
      this.openModal();
    });
    
    // 閉じるボタン
    this.modalClose.addEventListener('click', () => {
      this.closeModal();
    });
    
    // 背景クリックで閉じる
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });
    
    // Escapeキーで閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
    
    // モーダル内ナビゲーション
    document.getElementById('modalPrev').addEventListener('click', () => {
      this.previousImage();
    });
    
    document.getElementById('modalNext').addEventListener('click', () => {
      this.nextImage();
    });
  }
  
  openModal() {
    const mainImage = document.getElementById('mainImage');
    this.expandedImage.src = mainImage.src;
    this.expandedImage.alt = mainImage.alt;
    
    this.updateImageInfo();
    this.modal.classList.add('active');
    
    // スクロール防止
    document.body.style.overflow = 'hidden';
  }
  
  closeModal() {
    this.modal.classList.remove('active');
    
    // スクロール復元
    document.body.style.overflow = '';
  }
  
  previousImage() {
    // 基本ギャラリーの切り替えと連動
    const newIndex = this.currentIndex === 0 
      ? this.images.length - 1 
      : this.currentIndex - 1;
    this.showImage(newIndex);
  }
  
  nextImage() {
    // 基本ギャラリーの切り替えと連動
    const newIndex = this.currentIndex === this.images.length - 1 
      ? 0 
      : this.currentIndex + 1;
    this.showImage(newIndex);
  }
  
  showImage(index) {
    this.currentIndex = index;
    const image = this.images[index];
    
    // 拡大画像更新
    this.expandedImage.src = image.main;
    this.expandedImage.alt = image.alt;
    
    this.updateImageInfo();
  }
  
  updateImageInfo() {
    const current = this.currentIndex + 1;
    const total = this.images.length;
    
    this.imageCounter.textContent = `${current} / ${total}`;
    this.imageDescription.textContent = this.images[this.currentIndex].alt;
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  new ImageExpandDisplay();
});
```

## 🚀 実装のコツ
- z-indexの管理に注意する
- モーダル開閉時のスクロール制御
- 画像の読み込み状態を適切に処理
- キーボード操作でのアクセシビリティ確保

## ✅ 完成チェックリスト
- [ ] 画像をクリックするとモーダルで拡大表示される
- [ ] 閉じるボタンでモーダルが閉じる
- [ ] 背景クリックでモーダルが閉じる
- [ ] Escapeキーでモーダルが閉じる
- [ ] モーダル内で画像を切り替えできる
- [ ] 画像カウンターが正しく表示される
- [ ] モバイルでも適切に表示される
- [ ] 拡大画像が適切なサイズで表示される

## 🔗 次のステップ
次は「30-notification-simplified」で基本的な通知機能を学びます。

---
**💻 美しい拡大表示は、商品の詳細を伝える重要な機能です！**