<!-- fb2e5c5e-dad3-4be7-8d91-e7acd6f6e9c2 b1429f76-bafe-4a4d-b43f-e994d36db402 -->
# JS応用 01〜15: instructions整理 と 正解タブ表示修正

## 目的
- 全15問の instructions/description から「innerHTMLを使わない」等の冗長表現を撤去し、<template>+DOM操作の要点のみを簡潔化。
- フロントエンドの「正解」タブで、expectedに設定されているファイル内容（__INCLUDE__先を含む）が確実に表示されるよう挙動を安定化。

## 変更対象
- JSON: `problems/frontend/js-advanced-01.json` 〜 `js-advanced-15.json`
  - instructions: 「（innerHTML は使わない）」等の文言を削除
  - description: innerHTML非推奨/禁止の明示が残っていれば削除（例: 06/07）
- コード: `assets/js/frontend.js`
  - `loadExpectedContent()` は __INCLUDE__ のパスをそのまま fetch する
  - 既存 `updateExpectedCodeDisplays()` による表示は維持（textContentで安全表示）

## 実装手順
1. JSON一括修正（01〜15）
   - instructionsの「（innerHTML は使わない）」等の文言を削除
   - 06/07などdescription内のinnerHTML言及も削除
   - 例: 02の手順 → `textContentで差し込み、既存の出力コンテナへappendChild`（括弧書き削除）
2. 正解タブ表示（そのままの実装を維持）
   - `assets/js/frontend.js`
     - `loadExpectedContent(content)` は __INCLUDE__ のパスをそのまま fetch する（追加の分岐は行わない）
     - `updateExpectedCodeDisplays()` は既存のまま（fetch結果を `.textContent` に反映）
3. 動作確認
   - フロント画面でJS応用01〜15を順に選択
   - 「正解」タブでHTML/CSS/JS各コードが表示されること
   - プレビューも崩れないこと（テンプレート導入済み）

## 備考
- UI変更なし。既存セレクタ維持、innerHTMLは実装上使わない前提のため、instructionsからの表記のみ整理。

### To-dos
- [ ] 全15問のinstructionsをtemplate+DOM操作に書換え（冗長なinnerHTML文言を撤去）
- [ ] 全15問のHTML expectedに<template>を追加（既存セレクタ維持）
- [ ] 全15問のJS expectedをconst/let+for+cloneNode方式（スプレッド構文）に統一
- [ ] 各問題固有の表示/並び替え仕様に合わせtemplateと差し込みを調整
- [ ] innerHTML不使用/既存セレクタ維持/表示崩れの最終確認


