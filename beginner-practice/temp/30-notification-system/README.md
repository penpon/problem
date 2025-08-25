# 30-notification-system：通知システムの構築

## 🎯 学習目標
このステップでは、ユーザーエクスペリエンスを向上させる通知システムを構築します。トースト通知、ローディングスピナー、プログレスバー、エラー・成功メッセージなど、様々な種類の通知機能を学びます。

### 具体的に身につくスキル
- トースト通知システムの実装
- ローディングアニメーションの作成
- プログレスバーとパーセント表示
- アニメーションとトランジション効果
- アクセシビリティを考慮した通知設計

## 📖 学習内容

### 今回学ぶ新しい概念
**CSS Animation & Keyframes** - アニメーションの高度化
- `@keyframes`でのカスタムアニメーション作成
- `animation`プロパティの詳細制御
- CSS Transformでの滑らかな動き

**Promise & async/await** - 非同期処理の管理
- ローディング状態の管理
- タイマーとPromiseの組み合わせ
- エラーハンドリングとリトライ処理

### 実装する機能
1. **トースト通知** - 成功・エラー・警告・情報メッセージ
2. **ローディングスピナー** - 美しいアニメーション付き
3. **プログレスバー** - アップロードや処理進捗表示
4. **確認ダイアログ** - 重要な操作の確認
5. **アラートバナー** - ページ上部に固定表示
6. **スナックバー** - ページ下部からの短いメッセージ

## 📝 学習ポイント

### 💡 トーストシステムの実装
```javascript
class ToastManager {
  constructor() {
    this.container = this.createContainer();
    this.toasts = [];
  }
  
  show(message, type = 'info', duration = 3000) {
    const toast = this.createToast(message, type);
    this.container.appendChild(toast);
    
    // アニメーションで表示
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
    
    // 自動除去
    if (duration > 0) {
      setTimeout(() => {
        this.hide(toast);
      }, duration);
    }
    
    return toast;
  }
  
  hide(toast) {
    toast.classList.add('hiding');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }
}
```

### 💡 プログレスバーの実装
```javascript
class ProgressBar {
  constructor(container) {
    this.container = container;
    this.progressElement = this.createProgressBar();
    this.currentValue = 0;
  }
  
  updateProgress(value, total) {
    const percentage = Math.min(100, Math.max(0, (value / total) * 100));
    this.currentValue = percentage;
    
    this.progressElement.style.width = `${percentage}%`;
    this.progressElement.setAttribute('aria-valuenow', percentage);
    
    // パーセント表示更新
    const percentText = this.container.querySelector('.percent-text');
    if (percentText) {
      percentText.textContent = `${Math.round(percentage)}%`;
    }
    
    // 完了時の処理
    if (percentage >= 100) {
      this.onComplete();
    }
  }
  
  onComplete() {
    this.container.classList.add('complete');
    setTimeout(() => {
      this.hide();
    }, 1000);
  }
}
```

## 🚀 実装のコツ
- アクセシビリティ対応（ARIAラベル、スクリーンリーダー）
- モバイルデバイスでの表示最適化
- ユーザーが設定したアニメーション無効設定への対応
- 適切なコントラスト比と色選択

## ✅ 完成チェックリスト
- [ ] トースト通知が正しく表示・消える
- [ ] ローディングスピナーが美しくアニメーションする
- [ ] プログレスバーが正しく動作する
- [ ] 確認ダイアログが機能する
- [ ] 異なる種類の通知が適切に表示される
- [ ] アクセシビリティが適切に実装されている
- [ ] モバイルで適切に表示される

## 🔗 次のステップ
次は「31-checkout-flow」でチェックアウト機能の構築を学びます。

---
**💻 適切なフィードバックはユーザーの信頼と満足度を大きく向上させます！**