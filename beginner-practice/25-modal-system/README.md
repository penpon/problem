# 25-modal-system：モーダルウィンドウシステム

## 🎯 学習目標
このステップでは、ECサイトで頻繁に使用されるモーダルウィンドウシステムを構築します。商品詳細の表示、確認ダイアログ、画像拡大表示など、様々な場面で使えるモーダル機能を学びます。

### 具体的に身につくスキル
- モーダルウィンドウの作成と管理
- オーバーレイとポップアップの実装
- キーボードイベント（ESCキー）の処理
- アクセシビリティを考慮したUI設計
- 複数モーダルの管理システム

## 📖 学習内容

### 今回学ぶ新しい概念
**Event Delegation（イベント委譲）** - 効率的なイベント管理
- 動的に生成される要素へのイベント処理
- `event.target`を使った要素判定
- メモリ効率の良いイベント管理

**z-index管理** - 重なり順の制御
- モーダルの階層管理
- 複数モーダルの表示優先度
- スタッキングコンテキストの理解

### 実装する機能
1. **商品詳細モーダル** - 商品情報の詳細表示
2. **確認ダイアログ** - 削除・購入などの確認
3. **画像拡大モーダル** - 商品画像の拡大表示
4. **アラートモーダル** - 成功・エラーメッセージ
5. **カスタムモーダル** - 任意のコンテンツ表示

## 📝 学習ポイント

### 💡 モーダル管理システムの設計
```javascript
// モーダル管理クラス
class ModalManager {
  constructor() {
    this.activeModals = [];
    this.zIndexBase = 1000;
  }
  
  show(modalId, content, options = {}) {
    const modal = this.createModal(modalId, content, options);
    this.activeModals.push(modal);
    modal.style.zIndex = this.zIndexBase + this.activeModals.length;
    return modal;
  }
  
  close(modalId) {
    const index = this.activeModals.findIndex(m => m.id === modalId);
    if (index !== -1) {
      this.activeModals[index].remove();
      this.activeModals.splice(index, 1);
    }
  }
}
```

## 🚀 実装のコツ
- ESCキーでモーダルを閉じる機能
- 背景クリックで閉じる機能
- フォーカストラップの実装
- スムーズなアニメーション

## ✅ 完成チェックリスト
- [ ] 商品詳細モーダルが表示される
- [ ] 確認ダイアログが機能する
- [ ] 画像拡大モーダルが動作する
- [ ] ESCキーでモーダルが閉じる
- [ ] 複数モーダルが正しく管理される

## 🔗 次のステップ
次は「26-advanced-search」で高度な検索システムの構築を学びます。

---
**💻 ユーザビリティとアクセシビリティを重視したモーダル設計が重要です！**