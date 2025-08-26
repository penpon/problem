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
    
    for (const category of index.categories) {
      for (const problemId of category.problems) {
        try {
          const problem = await this.loadFrontendProblem(problemId);
          problems.push({
            id: problem.id,
            title: problem.title,
            description: problem.description,
            category: problem.category,
            difficulty: problem.difficulty
          });
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
      'practice01': '01-basic-html',
      'practice02': '02-add-heading', 
      'practice03': '03-add-image',
      'practice04': '04-add-link',
      'practice05': '05-add-list',
      'practice06': '06-first-css',
      'practice07': '07-spacing',
      'practice08': '08-borders',
      'practice09': '09-centering',
      'practice10': '10-layout-basics',
      'practice11': '11-shadows-corners',
      'practice12': '12-simple-animation',
      'practice13': '13-flexbox-intro',
      'practice14': '14-simple-card',
      'practice15': '15-hover-effects',
      'practice16': '16-first-javascript',
      'practice17': '17-javascript-hello',
      'practice18': '18-console-and-variables',
      'practice19': '19-basic-math',
      'practice20': '20-get-element',
      'practice21': '21-button-click',
      'practice22': '22-multiple-buttons',
      'practice23': '23-counter-basic',
      'practice24': '24-counter-enhanced',
      'practice25': '25-change-content',
      'practice26': '26-text-content-change',
      'practice27': '27-html-content-basic',
      'practice28': '28-random-basic',
      'practice29': '29-array-random-combo',
      'practice30': '30-array-basics',
      'practice31': '31-random-selection',
      'practice32': '32-timer-basics',
      'practice33': '33-timer-animation',
      'practice34': '34-function-practical',
      'practice35': '35-function-basics',
      'practice36': '36-function-systems',
      'practice37': '37-object-basics',
      'practice38': '38-mini-product-card',
      'practice39': '39-mini-product-card-bootstrap',
      'practice40': '40-basic-product-card',
      'practice41': '41-card-expansion',
      'practice42': '42-data-basic',
      'practice43': '43-data-management',
      'practice44': '44-advanced-interaction',
      'practice45': '45-ui-ux-completion',
      'practice46': '46-integrated-system',
      'practice47': '47-simple-calculator',
      'practice48': '48-simple-calculator-bootstrap',
      'practice49': '49-basic-calculator',
      'practice50': '50-advanced-calculator'
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