# 27-data-management：データ管理システムの構築

## 🎯 学習目標
このステップでは、商品データの管理システムを構築します。商品の追加・編集・削除（CRUD操作）、データのバックアップと復元、CSVファイルのインポート・エクスポート機能を学びます。

### 具体的に身につくスキル
- CRUD操作（Create・Read・Update・Delete）の実装
- JSONデータの操作と管理
- ファイルAPIを使ったデータのインポート・エクスポート
- データのバリデーションとエラーハンドリング
- LocalStorageを使ったデータの永続化

## 📖 学習内容

### 今回学ぶ新しい概念
**File API** - ファイルの読み込みと処理
- `FileReader`を使ったCSVファイルの読み込み
- ファイルのドラッグ＆ドロップ操作
- Blobを使ったファイルのダウンロード

**CSVデータ処理** - テキストデータの解析と生成
- CSV形式のパーシング
- 特殊文字のエスケープ処理
- データ型の自動判定と変換

### 実装する機能
1. **商品管理画面** - 商品一覧と操作ボタン
2. **商品追加フォーム** - 新しい商品の登録
3. **商品編集機能** - 既存商品の情報更新
4. **商品削除機能** - 確認ダイアログ付き削除
5. **CSVインポート** - ファイルからの一括データ登録
6. **CSVエクスポート** - データのバックアップ
7. **データ検索・フィルター** - 管理画面での商品検索

## 📝 学習ポイント

### 💡 CRUD操作の実装
```javascript
class ProductManager {
  constructor() {
    this.products = this.loadProducts();
  }
  
  // Create - 商品追加
  addProduct(productData) {
    const product = {
      id: this.generateId(),
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.products.push(product);
    this.saveProducts();
    return product;
  }
  
  // Read - 商品取得
  getProduct(id) {
    return this.products.find(p => p.id === id);
  }
  
  // Update - 商品更新
  updateProduct(id, updates) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = {
        ...this.products[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.saveProducts();
      return this.products[index];
    }
    return null;
  }
  
  // Delete - 商品削除
  deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      const deleted = this.products.splice(index, 1)[0];
      this.saveProducts();
      return deleted;
    }
    return null;
  }
}
```

### 💡 CSVインポート・エクスポート
```javascript
// CSVインポート
function importFromCSV(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target.result;
        const products = parseCSV(csv);
        resolve(products);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
}

// CSVエクスポート
function exportToCSV(products) {
  const headers = ['id', 'name', 'price', 'category', 'stock'];
  const csvContent = [
    headers.join(','),
    ...products.map(product => 
      headers.map(header => `"${product[header] || ''}"`).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'products.csv';
  link.click();
}
```

## 🚀 実装のコツ
- データのバリデーションとエラーハンドリング
- ユニークIDの生成と管理
- 操作履歴の記録（作成日時、更新日時）
- データのバックアップと復元機能

## ✅ 完成チェックリスト
- [ ] 商品の追加ができる
- [ ] 商品の編集ができる
- [ ] 商品の削除ができる
- [ ] CSVファイルからのインポートが機能する
- [ ] CSVファイルへのエクスポートが機能する
- [ ] データのバリデーションが動作する
- [ ] エラーハンドリングが適切に実装されている

## 🔗 次のステップ
次は「28-navigation-system」でナビゲーションシステムの構築を学びます。

---
**💻 データ管理はECサイト運営の基盤となる重要な機能です！**