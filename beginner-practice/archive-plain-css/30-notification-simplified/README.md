# 30-notification-simplified：基本通知システムの構築

## 🎯 学習目標
このステップでは、ECサイトで最も基本的な通知機能を学びます。トーストやローディングスピナーなどの高度機能は除外し、シンプルな成功・エラーメッセージ表示に集中して実装します。

### 具体的に身につくスキル
- 基本的な通知メッセージの表示
- 成功・エラー・警告の色分け
- 自動消去機能の実装
- シンプルなアニメーション効果

## 📖 学習内容

### 今回学ぶ新しい概念
**setTimeout を使ったタイマー制御** - 時間制御の基礎
- 指定時間後の自動処理
- タイマーのクリア機能
- 複数タイマーの管理

**CSS クラスの動的な追加・削除** - スタイル制御
- `classList.add()` と `classList.remove()`
- CSS transitionとの連携
- 条件に応じたスタイル切り替え

### 実装する機能
1. **成功通知** ✅ - 緑色で成功メッセージを表示
2. **エラー通知** ❌ - 赤色でエラーメッセージを表示
3. **警告通知** ⚠️ - 黄色で警告メッセージを表示
4. **自動消去** ⏰ - 3秒後に自動的に消える

## 📝 学習ポイント

### 💡 シンプルな通知HTML構造
```html
<div class="notification-demo">
  <h2>通知システムのテスト</h2>
  
  <!-- テスト用ボタン -->
  <div class="test-buttons">
    <button id="successBtn" class="demo-btn success-btn">成功通知</button>
    <button id="errorBtn" class="demo-btn error-btn">エラー通知</button>
    <button id="warningBtn" class="demo-btn warning-btn">警告通知</button>
    <button id="infoBtn" class="demo-btn info-btn">情報通知</button>
  </div>
  
  <!-- 通知が表示されるエリア -->
  <div id="notificationContainer" class="notification-container">
    <!-- 動的に通知が追加される -->
  </div>
</div>
```

### 💡 基本通知スタイル
```css
/* 通知コンテナ */
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
}

/* 基本通知スタイル */
.notification {
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: translateX(100%);
  opacity: 0;
  transition: all 0.3s ease-in-out;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 表示状態 */
.notification.show {
  transform: translateX(0);
  opacity: 1;
}

/* 非表示アニメーション */
.notification.hide {
  transform: translateX(100%);
  opacity: 0;
}

/* 通知タイプ別の色設定 */
.notification.success {
  background-color: #27ae60;
}

.notification.error {
  background-color: #e74c3c;
}

.notification.warning {
  background-color: #f39c12;
}

.notification.info {
  background-color: #3498db;
}

/* 通知アイコン */
.notification-icon {
  font-size: 1.2rem;
  margin-right: 0.5rem;
}

/* 閉じるボタン */
.notification-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: auto;
  padding: 0.2rem;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.notification-close:hover {
  opacity: 1;
}

/* テスト用ボタン */
.test-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.demo-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.success-btn {
  background-color: #27ae60;
}

.error-btn {
  background-color: #e74c3c;
}

.warning-btn {
  background-color: #f39c12;
}

.info-btn {
  background-color: #3498db;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .notification-container {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
  
  .notification {
    transform: translateY(-100%);
  }
  
  .notification.show {
    transform: translateY(0);
  }
  
  .notification.hide {
    transform: translateY(-100%);
  }
}
```

### 💡 シンプルな通知JavaScript
```javascript
// 基本通知システムクラス
class SimpleNotificationSystem {
  constructor() {
    this.container = document.getElementById('notificationContainer');
    this.notifications = [];
    
    this.init();
  }
  
  init() {
    // テスト用ボタンのイベント設定
    document.getElementById('successBtn').addEventListener('click', () => {
      this.show('操作が正常に完了しました！', 'success');
    });
    
    document.getElementById('errorBtn').addEventListener('click', () => {
      this.show('エラーが発生しました。もう一度お試しください。', 'error');
    });
    
    document.getElementById('warningBtn').addEventListener('click', () => {
      this.show('この操作は元に戻すことができません。', 'warning');
    });
    
    document.getElementById('infoBtn').addEventListener('click', () => {
      this.show('新しいバージョンが利用可能です。', 'info');
    });
  }
  
  // 通知表示のメインメソッド
  show(message, type = 'info', duration = 3000) {
    const notification = this.createNotification(message, type);
    this.container.appendChild(notification);
    this.notifications.push(notification);
    
    // アニメーションで表示
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // 自動消去
    if (duration > 0) {
      setTimeout(() => {
        this.hide(notification);
      }, duration);
    }
    
    return notification;
  }
  
  // 通知要素の作成
  createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // アイコンの決定
    const iconMap = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    
    const icon = iconMap[type] || 'ℹ';
    
    notification.innerHTML = `
      <span class="notification-icon">${icon}</span>
      <span class="notification-message">${message}</span>
      <button class="notification-close">×</button>
    `;
    
    // 閉じるボタンのイベント
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      this.hide(notification);
    });
    
    return notification;
  }
  
  // 通知を隠す
  hide(notification) {
    notification.classList.remove('show');
    notification.classList.add('hide');
    
    // アニメーション完了後に削除
    setTimeout(() => {
      if (notification.parentNode) {
        this.container.removeChild(notification);
        
        // 配列からも削除
        const index = this.notifications.indexOf(notification);
        if (index > -1) {
          this.notifications.splice(index, 1);
        }
      }
    }, 300);
  }
  
  // 全ての通知をクリア
  clearAll() {
    this.notifications.forEach(notification => {
      this.hide(notification);
    });
  }
  
  // 便利メソッド
  success(message, duration = 3000) {
    return this.show(message, 'success', duration);
  }
  
  error(message, duration = 5000) {
    return this.show(message, 'error', duration);
  }
  
  warning(message, duration = 4000) {
    return this.show(message, 'warning', duration);
  }
  
  info(message, duration = 3000) {
    return this.show(message, 'info', duration);
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  window.notifications = new SimpleNotificationSystem();
  
  // 使用例：
  // window.notifications.success('商品をカートに追加しました');
  // window.notifications.error('ログインに失敗しました');
});
```

## 🚀 実装のコツ
- メッセージは分かりやすく具体的に書く
- 自動消去の時間は内容に応じて調整する
- 通知が多くなりすぎないよう制限を設ける
- 色のコントラストを十分に確保する

## ✅ 完成チェックリスト
- [ ] 成功通知が緑色で表示される
- [ ] エラー通知が赤色で表示される
- [ ] 警告通知が黄色で表示される
- [ ] 情報通知が青色で表示される
- [ ] 通知が自動的に消える
- [ ] 閉じるボタンで手動で消せる
- [ ] 複数の通知が適切に表示される
- [ ] モバイルで適切にレスポンシブ対応される

## 🔗 次のステップ
次は「31-checkout-basic」で基本的なチェックアウトフォームを学びます。

---
**💻 適切な通知は、ユーザーに安心感と操作の成功を伝える重要な要素です！**