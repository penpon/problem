/**
 * 問題データの遅延読み込みを管理するクラス
 * GitHub Pages用 JavaScript自動採点システム
 */

class ProblemLoader {
  constructor() {
    this.problemIndex = null;
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