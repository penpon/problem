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