# ステップ17.4b - タイマーアニメーション

## 🎯 学習目標

**タイマーとCSSアニメーションの組み合わせ**

- タイマーを使ったアニメーション制御
- CSS transition とJavaScriptの連携
- 動的なスタイル変更（色・位置・形状）
- 複数要素の同期アニメーション

## 📖 このステップの内容

### 🎬 視覚的なタイマーアニメーション

このステップでは、**17.4a**で学んだ基本的なタイマー操作に、**CSSアニメーション**を組み合わせて魅力的な視覚効果を実現します。

単純な時間制御から、**ユーザーが楽しめる動的なインターフェース**へとレベルアップします。

### 📝 学習ポイント

#### 1. CSS Transition とJavaScript連携
```javascript
// CSS側
.element {
    transition: all 0.5s ease;
}

.element.active {
    transform: translateY(-30px);
    background: #ff6b6b;
}

// JavaScript側
setInterval(() => {
    element.classList.toggle('active');
}, 500);
```

#### 2. 動的スタイル変更
```javascript
// 位置の動的変更
element.style.left = randomX + 'px';
element.style.top = randomY + 'px';

// 背景色の動的変更
const colors = [
    'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
    'linear-gradient(135deg, #667eea, #764ba2)'
];
element.style.background = colors[index % colors.length];
```

#### 3. 複数アニメーションの同期
```javascript
setInterval(() => {
    // 1. バウンス効果
    ballElement.classList.toggle('bounce');
    
    // 2. 移動効果  
    rocketElement.style.left = randomX + 'px';
    
    // 3. 色変化効果
    colorBox.style.background = randomColor;
    
    // 4. テキスト変更
    textElement.textContent = messages[step];
}, 600);
```

## 🎬 実装されているアニメーション機能

### 4つの動的アニメーション

1. **🏀 バウンスアニメーション**: 3秒間、0.5秒ごとにバウンス効果
2. **🚀 移動アニメーション**: 4秒間、1秒ごとにランダム位置へ移動
3. **🌈 色変化アニメーション**: 5秒間、0.8秒ごとに背景色グラデーション変更
4. **✨ 組み合わせアニメーション**: 6秒間、複数アニメーションを同時実行

### アニメーション統計システム

- 各アニメーションの実行回数をリアルタイム記録
- 視覚的な統計表示
- アニメーション実行状況の追跡

## 🔍 コードの詳細解説

### バウンスアニメーションシステム
```javascript
function startBounceAnimation() {
    let bounceStep = 0;
    const maxSteps = 6; // 3秒間
    
    bounceInterval = setInterval(() => {
        bounceStep++;
        
        // CSSクラスの切り替えでアニメーション
        bouncingBall.classList.toggle("bounce-animation");
        
        if (bounceStep >= maxSteps) {
            clearInterval(bounceInterval);
            bouncingBall.classList.remove("bounce-animation");
        }
    }, 500); // 0.5秒ごと
}
```

### CSS バウンスアニメーション
```css
.bounce-animation {
    animation: bounce 0.5s ease;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { 
        transform: translateY(0); 
    }
    40% { 
        transform: translateY(-30px);
        background: rgba(231, 76, 60, 0.3);
    }
    60% { 
        transform: translateY(-15px);
        background: rgba(52, 152, 219, 0.3);
    }
}
```

### 移動アニメーションシステム
```javascript
function startMoveAnimation() {
    let moveStep = 0;
    const maxMoves = 4; // 4秒間
    
    moveInterval = setInterval(() => {
        moveStep++;
        
        // ランダムな位置を計算
        const areaWidth = animationArea.offsetWidth - 80;
        const areaHeight = 150;
        
        const randomX = Math.floor(Math.random() * areaWidth) + 20;
        const randomY = Math.floor(Math.random() * areaHeight) + 80;
        
        // スタイルの直接変更（CSS transitionが効く）
        movingRocket.style.left = randomX + "px";
        movingRocket.style.top = randomY + "px";
        
        if (moveStep >= maxMoves) {
            clearInterval(moveInterval);
        }
    }, 1000); // 1秒ごと
}
```

### 色変化アニメーションシステム
```javascript
function startColorAnimation() {
    const colors = [
        'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
        'linear-gradient(135deg, #667eea, #764ba2)',
        'linear-gradient(135deg, #fa709a, #fee140)',
        // ... 他のグラデーション
    ];
    
    let colorStep = 0;
    const maxColors = 6; // 5秒間
    
    colorInterval = setInterval(() => {
        colorStep++;
        
        const currentColor = colors[colorStep % colors.length];
        colorBox.style.background = currentColor;
        
        if (colorStep >= maxColors) {
            clearInterval(colorInterval);
            colorBox.style.background = '#f8f9fa'; // 元に戻す
        }
    }, 800); // 0.8秒ごと
}
```

### 組み合わせアニメーションシステム
```javascript
function startComboAnimation() {
    const messages = [
        "✨ 魔法の効果が発動！",
        "🌟 キラキラ効果中！", 
        // ... 他のメッセージ
    ];
    
    let comboStep = 0;
    const maxSteps = 10; // 6秒間
    
    comboInterval = setInterval(() => {
        comboStep++;
        
        // 複数のアニメーションを同時実行
        // 1. バウンス効果
        bouncingBall.classList.toggle("bounce-animation");
        
        // 2. 移動効果
        const randomX = Math.floor(Math.random() * areaWidth) + 20;
        const randomY = Math.floor(Math.random() * areaHeight) + 80;
        movingRocket.style.left = randomX + "px";
        movingRocket.style.top = randomY + "px";
        
        // 3. 色変化効果
        const currentColor = comboColors[comboStep % comboColors.length];
        colorBox.style.background = currentColor;
        
        // 4. メッセージ変化
        textDisplay.textContent = messages[comboStep - 1];
        
        if (comboStep >= maxSteps) {
            clearInterval(comboInterval);
            // 全て初期状態に戻す
            resetAllAnimations();
        }
    }, 600); // 0.6秒ごと
}
```

## 🏃‍♀️ 実行方法

1. `index.html`をブラウザで開く
2. **バウンスアニメーション**ボタンで要素の跳ね返り効果を確認
3. **移動アニメーション**ボタンで要素のランダム移動を観察
4. **色変化アニメーション**ボタンでグラデーションの変化を確認
5. **組み合わせアニメーション**ボタンで複数効果の同時実行を体験
6. 統計エリアでアニメーション実行回数を確認
7. 複数のアニメーションを同時に実行してみる
8. 開発者ツール（F12）でConsoleタブのアニメーションログを確認

## ✅ 確認ポイント

このステップが完了したら、以下を確認してください：

- [ ] バウンスアニメーションで要素が上下に跳ね返ることを確認した
- [ ] 移動アニメーションで要素がランダムな位置に移動することを確認した
- [ ] 色変化アニメーションで背景色が滑らかに変化することを確認した
- [ ] 組み合わせアニメーションで複数効果が同時実行されることを確認した
- [ ] 統計エリアで実行回数が正しく記録されることを確認した
- [ ] 複数のアニメーションを同時に実行できることを確認した
- [ ] アニメーション完了後に要素が初期状態に戻ることを確認した
- [ ] コンソールでアニメーション処理のログを確認した

### 期待される動作例
- **バウンス**: 🏀要素が0.5秒ごとに上下に跳ね返る（3秒間）
- **移動**: 🚀要素が1秒ごとにランダムな位置に滑らかに移動（4秒間）
- **色変化**: BOXの背景が0.8秒ごとに美しいグラデーションに変化（5秒間）
- **組み合わせ**: 全ての効果+メッセージ変化が0.6秒ごとに同時実行（6秒間）

## 🎨 高度な実験を試してみよう

慣れてきたら、開発者ツールのコンソールで以下を実行してみましょう：

### 1. カスタムバウンス
```javascript
// 独自のバウンス効果
let customBounce = document.getElementById("bouncing-ball");
customBounce.style.transition = "transform 0.3s ease";

let bouncing = false;
setInterval(() => {
    bouncing = !bouncing;
    customBounce.style.transform = bouncing ? 
        "translateY(-40px) scale(1.2)" : 
        "translateY(0) scale(1)";
}, 400);
```

### 2. 回転アニメーション追加
```javascript
// 要素に回転効果を追加
let rocket = document.getElementById("moving-rocket");
let rotation = 0;

setInterval(() => {
    rotation += 45;
    rocket.style.transform = `rotate(${rotation}deg)`;
}, 500);
```

### 3. 動的色彩変化
```javascript
// HSL色空間での連続的な色変化
let colorBox = document.getElementById("color-box");
let hue = 0;

setInterval(() => {
    hue = (hue + 10) % 360;
    colorBox.style.background = 
        `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${(hue + 60) % 360}, 70%, 60%))`;
}, 100);
```

### 4. パーティクル風エフェクト
```javascript
// 複数の小さな要素を動的生成
function createParticle() {
    let particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background: #ff6b6b;
        border-radius: 50%;
        left: ${Math.random() * 300}px;
        top: ${Math.random() * 200 + 50}px;
        transition: all 2s ease;
        opacity: 1;
    `;
    
    document.getElementById('animation-area').appendChild(particle);
    
    // 2秒後にフェードアウト
    setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = 'translateY(-50px) scale(0)';
    }, 100);
    
    // 4秒後に削除
    setTimeout(() => {
        particle.remove();
    }, 2100);
}

// パーティクルを0.5秒ごとに生成
let particleInterval = setInterval(createParticle, 500);

// 10秒後に停止
setTimeout(() => {
    clearInterval(particleInterval);
}, 10000);
```

## 💡 CSS Transition の重要なプロパティ

### duration（継続時間）
```css
.element {
    transition-duration: 0.5s; /* 0.5秒かけて変化 */
}
```

### timing-function（タイミング関数）
```css
.element {
    transition-timing-function: ease;        /* 滑らか */
    /* transition-timing-function: linear;     直線的 */
    /* transition-timing-function: ease-in;   徐々に加速 */
    /* transition-timing-function: ease-out;  徐々に減速 */
}
```

### delay（遅延）
```css
.element {
    transition-delay: 0.2s; /* 0.2秒後に開始 */
}
```

### 複合プロパティ
```css
.element {
    transition: all 0.5s ease 0.1s;
    /* プロパティ 継続時間 タイミング関数 遅延 */
}
```

## 💡 実世界でのアプリケーション

### Webアプリケーション
- **ローディング画面**: 魅力的なアニメーションで待機時間を演出
- **データ可視化**: チャートやグラフの動的更新
- **ゲーミフィケーション**: ポイント獲得、レベルアップ演出
- **フィードバック**: ユーザー操作に対する視覚的な反応

### ユーザーインターフェース
- **ホバー効果**: マウスオーバー時の滑らかな変化
- **ページ遷移**: スムーズなページ切り替え効果
- **モーダル表示**: フェードイン・アウトで自然な表示
- **通知システム**: メッセージの表示・非表示アニメーション

### eコマースサイト
- **商品カード**: ホバー時の拡大・回転効果
- **カート追加**: 商品がカートに飛んでいくアニメーション
- **価格変更**: 価格の変化を視覚的に強調
- **在庫状況**: 在庫数の増減を動的表示

## 📈 次のステップ（17.5）への準備

17.4bをマスターしたら、次は**17.5-function-basics**（関数基礎）に進みます：

- 関数の基本的な定義と呼び出し
- パラメータと戻り値の概念
- 関数を使ったコードの整理
- アニメーション処理の関数化

---

**💡 タイマーアニメーション連携の習得完了**

タイマーとCSSアニメーションを組み合わせることで、静的なWebページから動的で魅力的なインターフェースを作成できるようになりました。

これまで学んだスキル：
- ✅ 基本的なタイマー操作（17.4a）
- ✅ アニメーション連携（17.4b）

この技術により：
- ユーザーエクスペリエンスの向上
- 視覚的に魅力的なインターフェース
- インタラクティブなWebアプリケーション

**動的で美しいWebの世界へようこそ！** 🎬✨

次のステップでは、これらのアニメーション処理をより効率的に管理するための**関数**について学習していきます。