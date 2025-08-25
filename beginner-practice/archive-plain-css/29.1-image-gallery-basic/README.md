# 29.1-image-gallery-basic：基本的な画像ギャラリーの構築

## 🎯 学習目標
このステップでは、ECサイトの商品画像を表示するための基本的なギャラリー機能を学びます。複雑なAPIや高度な機能は除外し、シンプルな画像切り替え表示に集中して学習します。

### 具体的に身につくスキル
- 複数画像の表示システム
- 画像の切り替え機能
- サムネイル表示と選択
- 基本的な画像レスポンシブ対応

## 📖 学習内容

### 今回学ぶ新しい概念
**配列を使った画像管理** - データ構造の基礎
- 画像URLの配列での管理
- インデックスを使った画像選択
- 配列の長さを使ったループ処理

**DOM操作での画像更新** - 動的なコンテンツ変更
- `src`属性の動的な変更
- 画像の読み込み状態管理
- エラーハンドリングの基本

### 実装する機能
1. **メイン画像表示** 🖼️ - 大きなサイズで商品画像を表示
2. **サムネイル一覧** 🔍 - 小さなサイズの画像一覧
3. **画像切り替え** 🔄 - クリックで画像を変更
4. **前へ・次へボタン** ⬅️➡️ - 順次画像を切り替え

## 📝 学習ポイント

### 💡 基本的な画像ギャラリー構造
```html
<div class="image-gallery">
  <!-- メイン画像エリア -->
  <div class="main-image-container">
    <img id="mainImage" src="images/product-1.jpg" alt="商品画像">
    
    <!-- 前へ・次へボタン -->
    <button class="nav-btn prev-btn" id="prevBtn">❮</button>
    <button class="nav-btn next-btn" id="nextBtn">❯</button>
    
    <!-- 画像インジケーター -->
    <div class="image-indicators">
      <span class="indicator active"></span>
      <span class="indicator"></span>
      <span class="indicator"></span>
    </div>
  </div>
  
  <!-- サムネイル一覧 -->
  <div class="thumbnail-container">
    <div class="thumbnail active" data-index="0">
      <img src="images/product-1-thumb.jpg" alt="商品画像1">
    </div>
    <div class="thumbnail" data-index="1">
      <img src="images/product-2-thumb.jpg" alt="商品画像2">
    </div>
    <div class="thumbnail" data-index="2">
      <img src="images/product-3-thumb.jpg" alt="商品画像3">
    </div>
  </div>
</div>
```

### 💡 シンプルなギャラリースタイル
```css
/* ギャラリーのベーススタイル */
.image-gallery {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}

/* メイン画像エリア */
.main-image-container {
  position: relative;
  margin-bottom: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

#mainImage {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}

/* ナビゲーションボタン */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.prev-btn {
  left: 10px;
}

.next-btn {
  right: 10px;
}

/* サムネイル一覧 */
.thumbnail-container {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border: 2px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.3s;
}

.thumbnail.active {
  border-color: #3498db;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail:hover {
  border-color: #2980b9;
}
```

### 💡 画像切り替えのJavaScript
```javascript
// 基本的な画像ギャラリークラス
class BasicImageGallery {
  constructor() {
    // 画像データ
    this.images = [
      {
        main: 'images/product-1.jpg',
        thumb: 'images/product-1-thumb.jpg',
        alt: '商品画像1'
      },
      {
        main: 'images/product-2.jpg',
        thumb: 'images/product-2-thumb.jpg',
        alt: '商品画像2'
      },
      {
        main: 'images/product-3.jpg',
        thumb: 'images/product-3-thumb.jpg',
        alt: '商品画像3'
      }
    ];
    
    this.currentIndex = 0;
    this.mainImage = document.getElementById('mainImage');
    this.thumbnails = document.querySelectorAll('.thumbnail');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    
    this.init();
  }
  
  init() {
    // サムネイルクリックイベント
    this.thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        this.showImage(index);
      });
    });
    
    // 前へ・次へボタン
    this.prevBtn.addEventListener('click', () => {
      this.previousImage();
    });
    
    this.nextBtn.addEventListener('click', () => {
      this.nextImage();
    });
    
    // 初期表示
    this.showImage(0);
  }
  
  showImage(index) {
    // インデックスの範囲チェック
    if (index < 0 || index >= this.images.length) {
      return;
    }
    
    this.currentIndex = index;
    const image = this.images[index];
    
    // メイン画像更新
    this.mainImage.src = image.main;
    this.mainImage.alt = image.alt;
    
    // サムネイルのアクティブ状態更新
    this.thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  }
  
  previousImage() {
    const newIndex = this.currentIndex === 0 
      ? this.images.length - 1 
      : this.currentIndex - 1;
    this.showImage(newIndex);
  }
  
  nextImage() {
    const newIndex = this.currentIndex === this.images.length - 1 
      ? 0 
      : this.currentIndex + 1;
    this.showImage(newIndex);
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  new BasicImageGallery();
});
```

## 🚀 実装のコツ
- 画像パスが正しいか確認する
- 配列のインデックス管理に注意する
- 画像の読み込みエラーを想定する
- モバイルでのタッチ操作も考慮する

## ✅ 完成チェックリスト
- [ ] メイン画像が正しく表示される
- [ ] サムネイルをクリックすると画像が切り替わる
- [ ] 前へ・次へボタンが動作する
- [ ] アクティブなサムネイルが視覚的に分かる
- [ ] 最初・最後の画像で適切にループする
- [ ] 画像が見つからない場合のエラー処理ができている
- [ ] レスポンシブ対応ができている

## 🔗 次のステップ
次は「29.2-image-expand-display」で画像の拡大表示機能を学びます。

---
**💻 見やすい画像ギャラリーは、商品の魅力を最大限に伝える重要な要素です！**