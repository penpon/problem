/**
 * 問題データの遅延読み込みを管理するクラス
 * GitHub Pages用 JavaScript自動採点システム
 */

class ProblemLoader {
  constructor() {
    this.problemIndex = null;
    this.frontendIndex = null;
    this.loadedProblems = new Map(); // キャッシュ機能
    this.isLoading = false;
  }

  /**
   * 問題インデックスを読み込み
   * @returns {Promise<Array>} 問題一覧
   */
  async loadProblemIndex() {
    if (this.problemIndex) {
      return this.problemIndex;
    }

    try {
      this.isLoading = true;
      const response = await fetch('problems/index.json');
      
      if (!response.ok) {
        throw new Error(`Failed to load problem index: ${response.status}`);
      }
      
      const data = await response.json();
      this.problemIndex = data.problems;
      
      console.log(`問題インデックス読み込み完了: ${this.problemIndex.length}問`);
      return this.problemIndex;
      
    } catch (error) {
      console.error('問題インデックスの読み込みに失敗しました:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * フロントエンド問題インデックスを読み込み
   * @returns {Promise<Object>} フロントエンド問題データ
   */
  async loadFrontendIndex() {
    if (this.frontendIndex) {
      return this.frontendIndex;
    }

    try {
      this.isLoading = true;
      const response = await fetch('problems/frontend/index.json');
      
      if (!response.ok) {
        throw new Error(`Failed to load frontend index: ${response.status}`);
      }
      
      const data = await response.json();
      this.frontendIndex = data;
      
      console.log(`フロントエンド問題インデックス読み込み完了: ${data.totalProblems}問`);
      return this.frontendIndex;
      
    } catch (error) {
      console.error('フロントエンド問題インデックスの読み込みに失敗しました:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * 特定の問題の詳細データを読み込み
   * @param {string} problemId 問題ID
   * @returns {Promise<Object>} 問題データ
   */
  async loadProblem(problemId) {
    // キャッシュから取得
    if (this.loadedProblems.has(problemId)) {
      return this.loadedProblems.get(problemId);
    }

    try {
      const response = await fetch(`problems/${problemId}.json`);
      
      if (!response.ok) {
        throw new Error(`Failed to load problem ${problemId}: ${response.status}`);
      }
      
      const problemData = await response.json();
      
      // キャッシュに保存
      this.loadedProblems.set(problemId, problemData);
      
      console.log(`問題 ${problemId} の詳細データ読み込み完了`);
      return problemData;
      
    } catch (error) {
      console.error(`問題 ${problemId} の読み込みに失敗しました:`, error);
      throw error;
    }
  }

  /**
   * フロントエンド問題の詳細データを読み込み
   * @param {string} problemId 問題ID
   * @returns {Promise<Object>} 問題データ
   */
  async loadFrontendProblem(problemId) {
    const cacheKey = `frontend_${problemId}`;
    
    // キャッシュから取得
    if (this.loadedProblems.has(cacheKey)) {
      return this.loadedProblems.get(cacheKey);
    }

    try {
      const response = await fetch(`problems/frontend/${problemId}.json`);
      
      if (!response.ok) {
        throw new Error(`Failed to load frontend problem ${problemId}: ${response.status}`);
      }
      
      const problemData = await response.json();
      
      // キャッシュに保存
      this.loadedProblems.set(cacheKey, problemData);
      
      console.log(`フロントエンド問題 ${problemId} の詳細データ読み込み完了`);
      return problemData;
      
    } catch (error) {
      console.error(`フロントエンド問題 ${problemId} の読み込みに失敗しました:`, error);
      throw error;
    }
  }

  /**
   * 問題一覧を取得（レガシー関数の互換性維持）
   * @returns {Promise<Array>} 問題一覧
   */
  async getProblemList() {
    const index = await this.loadProblemIndex();
    return index.map(problem => ({
      id: problem.id,
      title: problem.title
    }));
  }

  /**
   * フロントエンド問題一覧を取得
   * @returns {Promise<Array>} フロントエンド問題一覧
   */
  async getFrontendProblemList() {
    const index = await this.loadFrontendIndex();
    const problems = [];
    const seen = new Set();
    
    for (const category of index.categories) {
      const categoryId = category.id;
      for (const entry of category.problems) {
        // エントリは string (id) または object ({ id, title }) を許容
        const problemId = typeof entry === 'string' ? entry : entry?.id;
        if (!problemId) continue;
        if (seen.has(problemId)) {
          console.warn(`Duplicate problem ID detected in frontend index and will be skipped: ${problemId}`);
          continue;
        }

        // 最小スキーマ（id, title）が index.json にあればそれを優先して使用
        const titleFromIndex = typeof entry === 'object' && entry?.title ? entry.title : null;
        if (titleFromIndex) {
          problems.push({
            id: problemId,
            title: titleFromIndex,
            category: categoryId
          });
          seen.add(problemId);
          continue;
        }

        // フォールバック: タイトルが無い場合のみ従来の詳細JSONを取得
        try {
          const problem = await this.loadFrontendProblem(problemId);
          const problemCategory = problem.category && typeof problem.category === 'string'
            ? problem.category
            : categoryId;
          problems.push({
            id: problem.id,
            title: problem.title,
            description: problem.description,
            category: problemCategory,
            difficulty: problem.difficulty
          });
          seen.add(problemId);
        } catch (error) {
          console.warn(`Failed to load frontend problem ${problemId}:`, error);
        }
      }
    }
    
    return problems;
  }

  /**
   * 特定の問題を取得（レガシー関数の互換性維持）
   * @param {string} problemId 問題ID
   * @returns {Promise<Object>} 問題データ
   */
  async getProblem(problemId) {
    return await this.loadProblem(problemId);
  }

  /**
   * キャッシュをクリア
   */
  clearCache() {
    this.loadedProblems.clear();
    this.problemIndex = null;
    this.frontendIndex = null;
    console.log('問題データキャッシュをクリアしました');
  }

  /**
   * 問題IDからREADMEファイルパスに変換
   * @param {string} problemId 問題ID（例: practice01, practice15_1）
   * @returns {string} READMEファイルパス
   */
  problemIdToReadmePath(problemId) {
    const directoryMap = this.getProblemDirectoryMap();
    
    if (directoryMap[problemId]) {
      return `beginner-practice/${directoryMap[problemId]}/README.md`;
    }
    
    throw new Error(`Problem directory not found for ID: ${problemId}`);
  }

  /**
   * 問題IDからディレクトリ名への完全マッピングテーブル
   * @returns {Object} 問題IDとディレクトリ名のマッピング
   */
  getProblemDirectoryMap() {
    return {
      // HTML/CSS基礎 (html-css-01 → html-css-20) ※拡張版：75個構成
      'html-css-01': 'html-css-01-basic-html',
      'html-css-02': 'html-css-02-add-heading', 
      'html-css-03': 'html-css-03-add-image',
      'html-css-04': 'html-css-04-add-link',
      'html-css-05': 'html-css-05-add-list',
      'html-css-06': 'html-css-06-first-css',
      'html-css-07': 'html-css-07-font-basics',
      'html-css-08': 'html-css-08-spacing',
      'html-css-09': 'html-css-09-borders',
      'html-css-10': 'html-css-10-centering',
      // 10の派生問題（レイアウト基礎の補助）
      'html-css-10.1': 'html-css-10.1-flex-align-gap',
      'html-css-10.2': 'html-css-10.2-inline-block-align',
      'html-css-10.3': 'html-css-10.3-float-two-column',
      'html-css-11': 'html-css-11-layout-basics',
      'html-css-12': 'html-css-12-text-centering',
      'html-css-13': 'html-css-13-shadows-corners',
      'html-css-14': 'html-css-14-box-shadow',
      'html-css-15': 'html-css-15-simple-animation',
      'html-css-16': 'html-css-16-flexbox-basics',
      'html-css-17': 'html-css-17-flexbox-intro',
      'html-css-18': 'html-css-18-simple-card',
      'html-css-19': 'html-css-19-basic-transition',
      'html-css-20': 'html-css-20-hover-effects',
      
      // JavaScript基礎 (js-basic-01 → js-basic-10)
      'js-basic-01': 'js-basic-01-first-javascript',
      'js-basic-02': 'js-basic-02-javascript-hello',
      'js-basic-03': 'js-basic-03-console-and-variables',
      'js-basic-04': 'js-basic-04-basic-math',
      'js-basic-05': 'js-basic-05-get-element',
      'js-basic-06': 'js-basic-06-button-click',
      'js-basic-07': 'js-basic-07-multiple-buttons',
      'js-basic-08': 'js-basic-08-counter-basic',
      'js-basic-09': 'js-basic-09-counter-enhanced',
      'js-basic-10': 'js-basic-10-change-content',
      'js-basic-11': 'js-basic-11-classlist-toggle',
      'js-basic-12': 'js-basic-12-input-to-text',
      'js-basic-13': 'js-basic-13-live-preview',
      'js-basic-14': 'js-basic-14-prevent-default',
      'js-basic-15': 'js-basic-15-focus-blur',
      'js-basic-16': 'js-basic-16-add-to-cart',
      'js-basic-17': 'js-basic-17-qty-subtotal',
      'js-basic-18': 'js-basic-18-favorite-toggle',
      'js-basic-19': 'js-basic-19-coupon-apply',
      'js-basic-20': 'js-basic-20-shipping-option',
      'js-basic-21': 'js-basic-21-qty-plus-input-subtotal',
      'js-basic-22': 'js-basic-22-shipping-total',
      'js-basic-23': 'js-basic-23-coupon-discount',
      'js-basic-24': 'js-basic-24-preview-and-color',
      'js-basic-25': 'js-basic-25-checkout-summary',
      
      // JavaScript応用(js-advanced-01 → js-advanced-20)
      'js-advanced-01': 'js-advanced-01-text-content-change',
      'js-advanced-02': 'js-advanced-02-html-content-basic',
      'js-advanced-03': 'js-advanced-03-search-filter',
      'js-advanced-04': 'js-advanced-04-price-sort',
      'js-advanced-05': 'js-advanced-05-array-basics',
      'js-advanced-06': 'js-advanced-06-product-find',
      'js-advanced-07': 'js-advanced-07-timer-basics',
      'js-advanced-08': 'js-advanced-08-timer-animation',
      'js-advanced-09': 'js-advanced-09-function-practical',
      'js-advanced-10': 'js-advanced-10-function-basics',
      'js-advanced-11': 'js-advanced-11-array-to-html',
      'js-advanced-12': 'js-advanced-12-filter-basics',
      'js-advanced-13': 'js-advanced-13-sort-toggle',
      'js-advanced-14': 'js-advanced-14-multi-conditions',
      'js-advanced-15': 'js-advanced-15-search-input',
      'js-advanced-16': 'js-advanced-16-event-delegation',
      'js-advanced-17': 'js-advanced-17-reduce-totals',
      'js-advanced-18': 'js-advanced-18-view-toggle',
      'js-advanced-19': 'js-advanced-19-card-template',
      'js-advanced-20': 'js-advanced-20-basic-validation',
      
      // JavaScript応用 統合 (js-advanced-21 → js-advanced-25)
      'js-advanced-21': 'js-advanced-21-integrated-search-sort-filter',
      'js-advanced-22': 'js-advanced-22-integrated-cart-totals',
      'js-advanced-23': 'js-advanced-23-integrated-favorite-view',
      'js-advanced-24': 'js-advanced-24-integrated-timer-banner',
      'js-advanced-25': 'js-advanced-25-integrated-form-preview-validate',
      
      // Bootstrap・最小課題（bootstrap-01 → bootstrap-10）
      'bootstrap-01': 'bootstrap-01-integrated-system',
      'bootstrap-02': 'bootstrap-02-ec-header-search',
      'bootstrap-03': 'bootstrap-03-simple-calculator-bootstrap',
      'bootstrap-04': 'bootstrap-04-ec-product-card',
      'bootstrap-05': 'bootstrap-05-advanced-calculator',
      'bootstrap-06': 'bootstrap-06-scientific-calculator',
      'bootstrap-07': 'bootstrap-07-two-product-gallery',
      'bootstrap-08': 'bootstrap-08-two-product-gallery-bootstrap',
      'bootstrap-09': 'bootstrap-09-bootstrap-basics',
      'bootstrap-10': 'bootstrap-10-component-intro-bootstrap',
      // 追加: Bootstrap 11以降（EC橋渡し用）
      'bootstrap-11': 'bootstrap-11-grid-12-6-4',
      'bootstrap-12': 'bootstrap-12-card-3-items',
      'bootstrap-13': 'bootstrap-13-ec-product-grid',
      'bootstrap-14': 'bootstrap-14-utility-classes',
      'bootstrap-15': 'bootstrap-15-form-controls',
      'bootstrap-16': 'bootstrap-16-ec-cart-summary',
      'bootstrap-17': 'bootstrap-17-ec-filter-bar',
      'bootstrap-18': 'bootstrap-18-badges',
      'bootstrap-19': 'bootstrap-19-table-minimal',
      'bootstrap-20': 'bootstrap-20-advanced-grid',
      // 追加: Bootstrap 総合(まとめ練習) 21〜25
      'bootstrap-21': 'bootstrap-21-summary-product-list-filter',
      'bootstrap-22': 'bootstrap-22-summary-product-detail',
      'bootstrap-23': 'bootstrap-23-summary-header-search-nav',
      'bootstrap-24': 'bootstrap-24-summary-landing-page',
      'bootstrap-25': 'bootstrap-25-summary-pricing',
      
      // 総合ECサイト構築 (ec-project-01 → ec-project-15)
      'ec-project-01': 'ec-project-01-responsive-system',
      'ec-project-02': 'ec-project-02-utility-classes',
      'ec-project-03': 'ec-project-03-bootstrap-product-gallery',
      'ec-project-04': 'ec-project-04-bootstrap-shopping-cart',
      'ec-project-05': 'ec-project-05-multiple-products-basics',
      'ec-project-06': 'ec-project-06-dynamic-display-system',
      'ec-project-07': 'ec-project-07-filtering-system',
      'ec-project-08': 'ec-project-08-sort-functionality-system',
      'ec-project-09': 'ec-project-09-search-functionality-system',
      'ec-project-10': 'ec-project-10-integrated-gallery-system',
      'ec-project-11': 'ec-project-11-search-basic',
      'ec-project-12': 'ec-project-12-category-filter',
      'ec-project-13': 'ec-project-13-sort-feature',
      'ec-project-14': 'ec-project-14-form-validation',
      'ec-project-15': 'ec-project-15-mini-cart',
      // 追加: EC-16〜19（README参照用ディレクトリ）
      'ec-project-16': 'ec-project-16-checkout-separation',
      'ec-project-17': 'ec-project-17-complete-screen',
      'ec-project-18': 'ec-project-18-auth-mock',
      'ec-project-19': 'ec-project-19-admin-logs',
      'ec-project-20': 'ec-project-20-complete-ec-site'
    };
  }

  /**
   * 問題IDから実際のREADMEファイルパスを特定
   * @param {string} problemId 問題ID
   * @returns {Promise<string>} 実際のREADMEファイルパス
   */
  async findReadmePath(problemId) {
    const cacheKey = `readme_path_${problemId}`;
    
    if (this.loadedProblems.has(cacheKey)) {
      return this.loadedProblems.get(cacheKey);
    }

    try {
      // 直接的なマッピングを使用してパスを取得
      const readmePath = this.problemIdToReadmePath(problemId);
      
      // ファイルの存在確認（軽量なHEADリクエストではなくGETで確認）
      const response = await fetch(readmePath, { 
        method: 'GET',
        // キャッシュを避けるためのヘッダー
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (response.ok) {
        this.loadedProblems.set(cacheKey, readmePath);
        console.log(`README path found for ${problemId}: ${readmePath}`);
        return readmePath;
      } else {
        throw new Error(`README file not accessible: ${response.status} ${response.statusText}`);
      }
      
    } catch (error) {
      console.error(`Failed to find README path for ${problemId}:`, error);
      throw new Error(`README file not found for problem ${problemId}. Error: ${error.message}`);
    }
  }

  /**
   * 問題のREADME.mdファイルを読み込み
   * @param {string} problemId 問題ID
   * @returns {Promise<string>} README.mdの内容（Markdownテキスト）
   */
  async loadProblemReadme(problemId) {
    const cacheKey = `readme_${problemId}`;
    
    // キャッシュから取得
    if (this.loadedProblems.has(cacheKey)) {
      console.log(`README cache hit for ${problemId}`);
      return this.loadedProblems.get(cacheKey);
    }

    try {
      console.log(`Loading README for problem: ${problemId}`);
      const readmePath = await this.findReadmePath(problemId);
      console.log(`README path resolved: ${readmePath}`);
      
      const response = await fetch(readmePath, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const markdownContent = await response.text();
      
      if (!markdownContent || markdownContent.trim().length === 0) {
        throw new Error('README file is empty or contains no content');
      }
      
      // キャッシュに保存
      this.loadedProblems.set(cacheKey, markdownContent);
      
      console.log(`README.md successfully loaded for problem ${problemId} (${markdownContent.length} characters)`);
      return markdownContent;
      
    } catch (error) {
      console.error(`Failed to load README for ${problemId}:`, error);
      
      // フォールバック: 問題JSONからヒント情報を取得
      try {
        console.log(`Attempting fallback hint for ${problemId}`);
        const fallbackHint = await this.getFallbackHint(problemId);
        if (fallbackHint) {
          return fallbackHint;
        }
      } catch (fallbackError) {
        console.warn(`Fallback hint also failed for ${problemId}:`, fallbackError);
      }
      
      throw new Error(`README読み込みに失敗しました: ${error.message}`);
    }
  }

  /**
   * フォールバックヒント取得（問題JSONからヒント情報を取得）
   * @param {string} problemId 問題ID
   * @returns {Promise<string|null>} フォールバックヒントまたはnull
   */
  async getFallbackHint(problemId) {
    try {
      const problemData = await this.loadFrontendProblem(problemId);
      
      if (problemData && problemData.hints) {
        // 問題データにヒント情報がある場合
        return `# ${problemData.title} - ヒント\n\n${problemData.hints.join('\n\n')}`;
      }
      
      if (problemData && problemData.description) {
        // 説明をヒントとして使用
        return `# ${problemData.title} - ヒント\n\n${problemData.description}`;
      }
      
      return null;
    } catch (error) {
      console.warn(`Fallback hint failed for ${problemId}:`, error);
      return null;
    }
  }

  /**
   * 読み込み状況の統計を取得
   * @returns {Object} 統計情報
   */
  getLoadStats() {
    return {
      indexLoaded: !!this.problemIndex,
      problemsInIndex: this.problemIndex ? this.problemIndex.length : 0,
      cachedProblems: this.loadedProblems.size,
      isLoading: this.isLoading
    };
  }
}

// グローバルインスタンス作成
const problemLoader = new ProblemLoader();

// レガシー関数のラッパー（後方互換性維持）
async function getProblemList() {
  try {
    return await problemLoader.getProblemList();
  } catch (error) {
    console.error('getProblemList error:', error);
    return [];
  }
}

async function getProblem(problemId) {
  try {
    return await problemLoader.getProblem(problemId);
  } catch (error) {
    console.error(`getProblem(${problemId}) error:`, error);
    return null;
  }
}

// フロントエンド学習システム用の関数
async function getFrontendProblemList() {
  try {
    return await problemLoader.getFrontendProblemList();
  } catch (error) {
    console.error('getFrontendProblemList error:', error);
    return [];
  }
}

async function getFrontendProblem(problemId) {
  try {
    return await problemLoader.loadFrontendProblem(problemId);
  } catch (error) {
    console.error(`getFrontendProblem(${problemId}) error:`, error);
    return null;
  }
}

// README読み込み用の関数
async function loadProblemReadme(problemId) {
  try {
    return await problemLoader.loadProblemReadme(problemId);
  } catch (error) {
    console.error(`loadProblemReadme(${problemId}) error:`, error);
    return null;
  }
}
