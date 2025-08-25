# 31-checkout-flow：チェックアウト機能の構築

## 🎯 学習目標
このステップでは、ECサイトの最重要機能であるチョックアウトフローを構築します。多段階フォーム、配送先入力、支払い方法選択、注文確認画面など、購入完了までの一連の流れを学びます。

### 具体的に身につくスキル
- 多段階フォームの設計と実装
- フォームバリデーションとエラーハンドリング
- 配送先・請求先情報の管理
- 支払い方法と料金計算
- 注文データの管理と永続化

## 📖 学習内容

### 今回学ぶ新しい概念
**マルチステップフォーム** - 複雑な入力を段階分け
- ステップインジケーターでの進捗表示
- ステップ間のデータ保持と引き継ぎ
- バリデーション状態の管理

**支払いAPI統合** - 決済システムの基础
- クレジットカード情報の取り扱い
- セキュアなデータ送信の基本
- 決済状態の管理

### 実装する機能
1. **カート内容確認** - 商品・数量・価格の最終確認
2. **ゲストチェックアウト** - アカウント未作成でも購入可能
3. **配送先情報入力** - 郵便番号自動入力、住所検索
4. **請求先情報** - 配送先と同じ・別住所選択
5. **配送方法選択** - 速度と料金の異なる選択肢
6. **支払い方法選択** - クレジットカード・代引き・銀行振込
7. **注文確認・完了** - 最終確認と注文完了画面

## 📝 学習ポイント

### 💡 マルチステップフォームの実装
```javascript
class CheckoutWizard {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 5;
    this.formData = {
      cart: [],
      shipping: {},
      billing: {},
      delivery: {},
      payment: {}
    };
  }
  
  nextStep() {
    if (this.validateCurrentStep()) {
      this.saveStepData();
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.showStep(this.currentStep);
        this.updateProgressIndicator();
      }
    }
  }
  
  validateCurrentStep() {
    const stepValidators = {
      1: () => this.validateCart(),
      2: () => this.validateShipping(),
      3: () => this.validateBilling(),
      4: () => this.validateDelivery(),
      5: () => this.validatePayment()
    };
    
    return stepValidators[this.currentStep]();
  }
  
  saveStepData() {
    const stepData = this.getCurrentStepData();
    Object.assign(this.formData, stepData);
    
    // LocalStorageに中間データを保存
    localStorage.setItem('checkoutData', JSON.stringify(this.formData));
  }
}
```

### 💡 料金計算システム
```javascript
class PriceCalculator {
  constructor() {
    this.taxRate = 0.10; // 消費税10%
    this.shippingRates = {
      'standard': 500,
      'express': 1000,
      'overnight': 2000
    };
  }
  
  calculateTotal(cartItems, shippingMethod, discountCode = null) {
    const subtotal = this.calculateSubtotal(cartItems);
    const shipping = this.calculateShipping(subtotal, shippingMethod);
    const discount = this.calculateDiscount(subtotal, discountCode);
    const tax = this.calculateTax(subtotal - discount);
    
    return {
      subtotal: subtotal,
      shipping: shipping,
      discount: discount,
      tax: tax,
      total: subtotal + shipping - discount + tax
    };
  }
  
  calculateSubtotal(cartItems) {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
  
  calculateShipping(subtotal, method) {
    // 3000円以上で送料無料
    if (subtotal >= 3000) {
      return 0;
    }
    
    return this.shippingRates[method] || this.shippingRates['standard'];
  }
}
```

## 🚀 実装のコツ
- フォームの中間保存と復元機能
- アドレスの自動入力支援
- クレジットカード情報のセキュアな取り扱い
- ローディング状態とエラーハンドリング

## ✅ 完成チェックリスト
- [ ] カート内容確認画面が正しく表示される
- [ ] 配送先情報入力が機能する
- [ ] 支払い方法選択が動作する
- [ ] 料金計算が正しく行われる
- [ ] マルチステップフォームが適切に動作する
- [ ] フォームバリデーションが機能する
- [ ] 注文確認・完了画面が表示される
- [ ] データの中間保存・復元が機能する

## 🔗 次のステップ
次は「32-integrated-ec-site」でこれまで学んだ全ての機能を統合した完全なECサイトを構築します。

---
**💻 チェックアウトは転換率に直結する最重要機能です。ユーザビリティを絶対に疑わないでください！**