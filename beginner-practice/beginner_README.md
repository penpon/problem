# 🌟 超初心者向けWeb開発学習サイト

## 📋 概要

このプロジェクトは、**完全にWeb開発が初めての方**のための段階的学習サイト集です。HTMLタグを初めて学ぶレベルから始まり、**68段階**で基本的なWebサイト制作から**プロフェッショナルレベルの動的Webシステム**まで身につけられます。

## ⚠️ 注意事項（カテゴリ方針）

### 1. カテゴリの明確化
- **HTML/CSS基礎（html-css-\*)**: HTML/CSSのみ（JavaScriptは含めない）
- **JavaScript基礎（js-basic-\*)**: 基本文法とDOM操作（フレームワーク/OOPなし）
- **JavaScript応用（js-advanced-\*)**: 配列・関数・イベント等の応用（フレームワーク/OOPなし）
- **Bootstrap基礎（bootstrap-\*)**: BootstrapのCSSユーティリティ中心（JSプラグインは必要回のみ最小導入）
- **ECプロジェクト（ec-project-\*)**: 実用ミニアプリ構築（複数回を横断して段階的に拡張）

### 2. 問題JSONの必須項目（全問題共通）
- `id`
- `title`
- `description`
- `category`
- `instructions`
- `files`
- `checks`

---

## 🧭 共通運用原則（全カテゴリ）

### 📈 段階的難易度・1ステップ1概念
- 前ステップ比は最大「約1.1倍」まで
- 新規概念は1つに限定

### ⚙️ 最小で確実に動く実装
- コピペ即動作・エラーなし（ブラウザ標準でOK）
- 視覚的変化を必ず入れる（レイアウト課題は完成状態の視覚確認を重視）

### 🧩 実用性と統一
- 3分割構成（files.html / files.css / files.js）
- 期待値は `problems/frontend/expected/<id>/files.<ext>.expected` に外出し
- 文言・トーンは命令形・簡潔・用語統一

### ✅ チェック整合性
- 詳細は「✅ 最小チェックリスト」の checks 項目を参照（重複記載を避けるため集約）

### 🔒 セキュリティ・教育観点
- 入力値の反映は `textContent` を基本（XSS回避）
- `innerHTML` は必要回のみ最小使用（学習目的を明記）

### 🗂️ 命名・マッピング管理
- ディレクトリ命名の一貫性（例: `html-css-06-<slug>/`, `js-basic-12-<slug>/`, `js-advanced-05-<slug>/`, `bootstrap-03-<slug>/`, `ec-project-15-mini-cart/`）
- `js/problemLoader.js#getProblemDirectoryMap()` を変更時に更新
- 古い重複課題はアーカイブ → 不要なら削除

### 🔁 差分設計
- 既存の流れに自然に橋渡し（例: js-basic → js-advanced → ec-project）
- 各README冒頭に「学習目標・チェックリスト」を明記

### 🔄 同期運用（problems ↔ beginner-practice）
- 追加・更新の原則:
  - `problems/frontend/<id>.json`（例: `html-css-20` 以降）を作成/更新したら、同一IDに対応する `beginner-practice/<id>-<slug>/` を同時に作成/更新する。
  - HTML/CSS テンプレートは JSON の `files.html.template` / `files.css.template` をそのまま `index.html` / `style.css` に反映する（JS は空なら作成不要）。
  - ディレクトリ構成・ファイル名は完全同期（ズレ禁止）。slug を変更したら両方に反映。
- README 生成ルール（必須）:
  - 全課題で `README.md` は「絵文字＋太字の9セクション」固定。
    - 🧩 学ぶタグ/プロパティ
    - 🔁 前回の復習
    - 📌 重要なポイント
    - 🧪 例題
    - ✨ 新しく追加された部分
    - 🔍 コードの説明
    - 📖 豆知識
    - ⚠️ 注意点
    - 🛒 ECサイト制作で繋がるポイント
  - セクション見出しは絵文字＋太字。箇条書きの強調は太字を用いる。
  - 例題（🧪）セクションの必須要件:
    - コピペで即実行できる「実行可能なコード」を必ず掲載すること（最小構成）。
    - 課題の内容に応じて、必要なコード種別をすべて掲載すること。
      - HTML課題: HTMLコード（必要最小限）。原則 CSS/JS は不要。
      - CSS課題: HTMLコード＋CSSコード（`<style>` 直書き or 外部 `style.css` の想定コードブロック）。
      - JavaScript課題: HTMLコード＋JSコード（`<script>` 直書き or 外部 `main.js` の想定コードブロック）。
      - Bootstrap課題: HTMLコード（必要に応じてCSS）＋ 必要なCDNリンク（`<link>`/`<script>`）を明示。
    - 外部ファイルを使う場合は、読み込みタグ `<script src="main.js"></script>` / `<link rel="stylesheet" href="style.css">` を例題内に明記。
    - テキスト反映は原則 `textContent` を使用（セキュリティ配慮）。`innerHTML` を使う場合は意図と注意点を明記。
- 同期チェック項目:
  - [ ] `beginner-practice/<id>-<slug>/index.html` が JSON `files.html.template` と一致
  - [ ] `beginner-practice/<id>-<slug>/style.css` が JSON `files.css.template` と一致
  - [ ] `problems/frontend/expected/<id>/files.*.expected` は「実体テキスト」で二重 `__INCLUDE__` なし
  - [ ] `README.md` が9セクション形式に準拠

### 🔗 依存関係
- 原則フレームワーク不使用。使用時は理由と最小CDN（例: Bootstrapは `@latest`）
- 外部画像等は安定ソース（placeholder / picsum）

## 🔧 フロント統合（共通）
以下は要点の概要です。詳細の作成手順・検証観点は「✅ 最小チェックリスト」と「🧾 一連の流れチェックリスト」を参照してください（重複排除のため集約）。
- `problems/frontend/index.json` の `problems` 並び順・`totalProblems`・`lastUpdated` を更新
- 問題JSONは `problems/frontend/<id>.json` に作成し、`files.*.expected` は `problems/frontend/expected/<id>/files.<ext>.expected` を参照

### 🚀 初期表示最適化：インデックスの最小スキーマ運用（重要）
- フロントの初期ロードを「ほぼ1リクエスト」にするため、`problems/frontend/index.json` の各カテゴリ `problems` は **`{ id, title }` 形式**で管理します。
- __問題を追加／タイトル変更したら__、以下のスクリプトでインデックスを自動再生成してください（手動編集は不要）。

実行コマンド:

```bash
node tools/update-frontend-index.js
```

補足:
- スクリプトは `problems/frontend/*.json` から `id` と `title` を抽出して `index.json` を更新します。
- 実行時に `index.json.bak-<timestamp>` を同ディレクトリに自動バックアップします。
- `package.json` に以下を追加すると簡便です（任意）：

```json
{
  "scripts": {
    "update:index": "node tools/update-frontend-index.js"
  }
}
```

運用ルール:
- 追加・変更作業の最後に実行するか、pre-commit フック（husky 等）に組み込んで自動化してもOK。
- `problems/frontend/index.json` を `{ id, title }` で保てば、一覧表示時に各問題JSONの事前フェッチが不要になり表示が高速化されます。

## ❗ expected 作成ルール（重要）
- **実体化**: `.expected` は最終テキストを直接格納（必要なら `beginner-practice` からコピー）
- **対象**: `files.html.expected`, `files.css.expected`, `files.js.expected`

---

## 🔢 小数点付きID（例: 10.1, 10.2）作成時の注意

> 「10.1」「10.2」のように小数点付きの連番を扱う際のガイドです。

- __ID形式__
  - 例: `html-css-10.1`（カテゴリに応じた接頭辞 + 小数点付き番号）
  - `category` はカテゴリIDと厳密一致（例: `html-css-`）。

- __タイトル形式__
  - 例: `10.1: レイアウト基礎（...）`
  - フロント表示では `problem.id` から番号を抽出して左バッジに表示し、タイトル先頭の番号はクリーンアップされます（`cleanProblemTitle()`）。

- __expected 配置__
  - `problems/frontend/expected/html-css-10.1/files.html.expected`
  - `problems/frontend/expected/html-css-10.1/files.css.expected`
  - `problems/frontend/expected/html-css-10.1/files.js.expected`
  - JSON の参照は `__INCLUDE__: problems/frontend/expected/<id>/files.<ext>.expected`

- __テンプレート方針（回答非掲載）__
  - 小数点付き練習回（例: 10.1〜10.3）は「エディタの初期テンプレに回答を含めない」。
  - 例: CSS テンプレは `/* ここに実装してください */` のプレースホルダーのみ。

- __一覧への追加順（index.json）__
  - `problems/frontend/index.json` の該当カテゴリ `problems` 配列に手動で順序通りに追加（並び順は表示順に直結）。
  - 例: `html-css-10`, `html-css-10.1`, `html-css-10.2`, `html-css-10.3`, `html-css-11` のように意図した順を明示的に並べる。

- __フロント表示ロジックとの整合性__
  - 問題一覧の番号は `problem.id` から抽出する仕様（`js/frontend.js` の `extractProblemNumber()`）。
  - IDの接頭辞とカテゴリの対応が追加カテゴリで必要な場合は、`extractProblemNumber()` の `prefixMap` を拡張する。
  - タイトル先頭の番号除去は小数点付き対応（`cleanProblemTitle()`）。タイトル形式を変更する場合は正規表現も合わせて更新。

- __同期チェック__
  - beginner-practice と problems/frontend の両方で ID・ディレクトリ・ファイルを同期。
  - checks とテンプレDOM/仕様の整合性を再確認。

---

## 🧾 一連の流れチェックリスト：問題作成 → frontend.html 表示

> 新しい問題を作って、フロントの一覧に表示・採点できるまでの手順です（全カテゴリ共通）。

### 1. 企画・命名
- [ ] **ID決定**: `html-css-XX` / `js-basic-XX` / `js-advanced-XX` / `bootstrap-XX` / `ec-project-XX`
- [ ] **カテゴリ確認**: READMEのカテゴリ方針に合致している
- [ ] **ディレクトリ名**: `beginner-practice/<id>-<slug>/`

### 2. テンプレ作成（beginner-practice/）
- [ ] `files.html` `files.css` `files.js` を作成（html-css-* は `files.js` 空でも可）
- [ ] DOM/ID/クラスは後述の checks と一致させて用意
- [ ] コピペ即動作・視覚的反応がある（または完成状態が確認できる）

### 3. expected 作成（problems/frontend/expected/<id>/）
- [ ] `files.html.expected` `files.css.expected` `files.js.expected` を作成
- [ ] 中身は「実体テキスト」を直接格納（beginner-practice からコピーして整える）
- [ ] `__INCLUDE__` の二重参照は禁止（expected → expected で完結させる）

### 4. 問題JSON 作成（problems/frontend/<id>.json）
- [ ] `id`, `title`, `category`（カテゴリIDと厳密一致）
- [ ] `files.*.expected` は `__INCLUDE__: problems/frontend/expected/<id>/files.<ext>.expected`
- [ ] `checks` を定義（観点はテンプレDOM/仕様と完全一致）

### 5. 一覧へ追加（problems/frontend/index.json）
- [ ] 対応カテゴリの `problems` 配列に `<id>` を追記（並び順に注意）
- [ ] `totalProblems` を合算に合わせて更新
- [ ] `lastUpdated` を最新日に更新（例: `2025-08-30`）

### 6. 参照マップ（必要に応じて）
- [ ] `js/problemLoader.js#getProblemDirectoryMap()` を変更が必要な場合は更新

### 7. 動作確認
- [ ] `frontend.html` を開く
- [ ] カテゴリに新規 `<id>` が表示される
- [ ] 問題詳細で expected プレビューが正しく表示される（`__INCLUDE__` の生表示がない）
- [ ] 採点（checks）が意図通りに通る

### 8. よくある不具合チェック
- [ ] `.expected` が二重 `__INCLUDE__` になっている
- [ ] `category` のスペル/IDミスマッチ
- [ ] `checks` とテンプレDOM/仕様がズレている
- [ ] `index.json` の合計数や日付の未更新
