# 19.5 シンプル統合システム

## 🎯 学習目標

**これまで学んだ基本機能を組み合わせて、シンプルで使いやすいシステムを作ろう**

今までに学んだ「ボタンクリック」「データ保存」「カウンター機能」を組み合わせて、簡単だけど便利なシステムを作成します。

## 📖 学習内容

### ✨ 今回作る3つの機能

1. **カウンター機能** - ボタンを押すと数字が増える
2. **データ保存** - リロードしても数字が残る
3. **リセット機能** - 数字を0に戻す

## 📝 学習ポイント

### 今回新しく学ぶこと

**データの組み合わせ**
- 前回までに学んだ機能を組み合わせて使う
- カウンター + データ保存 = 便利なアプリ

**JavaScriptの復習**
- `localStorage.setItem()` でデータを保存
- `localStorage.getItem()` でデータを取得
- ボタンクリックで関数を実行

## 🔍 詳細解説

### コード例（とても簡単）

**HTML**
```html
<p>カウント: <span id="count">0</span></p>
<button onclick="countUp()">+1する</button>
<button onclick="reset()">リセット</button>
```

**JavaScript**
```javascript
// カウントを1増やす
function countUp() {
    let count = Number(localStorage.getItem('count') || 0);
    count++;
    document.getElementById('count').textContent = count;
    localStorage.setItem('count', count);
}

// カウントを0に戻す
function reset() {
    document.getElementById('count').textContent = 0;
    localStorage.setItem('count', 0);
}
```

## 💻 実習の進め方

1. **HTMLを書く**: ボタンと表示場所を作る
2. **JavaScriptを書く**: 関数を作る
3. **動作確認**: ボタンを押してみる
4. **リロード確認**: ページを更新しても数字が残るか確認

## 🎉 完成時の達成感

- ✅ **3つの機能**がうまく組み合わさって動く
- ✅ **データが保存**されて便利
- ✅ **統合システム**の基本が理解できる