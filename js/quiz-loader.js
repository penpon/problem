/**
 * QuizLoader - 拡張性を考慮した問題データ管理システム
 * エンジニア初心者向け4択クイズ
 */

class QuizLoader {
    constructor() {
        this.manifest = null;
        this.categories = new Map();
        this.questionCache = new Map();
        this.isLoading = false;
        this.loadedBatches = new Set();
        this.batchSize = 10; // 一度に読み込む問題数
        
        // Performance tracking
        this.loadTimes = new Map();
        this.cacheHits = 0;
        this.cacheMisses = 0;
    }

    /**
     * システムの初期化 - マニフェストとカテゴリ情報を読み込み
     * @returns {Promise<Object>} マニフェストデータ
     */
    async initialize() {
        console.log('🚀 QuizLoader initializing...');
        const startTime = performance.now();
        
        try {
            this.isLoading = true;
            
            // マニフェスト読み込み
            await this.loadManifest();
            
            // 有効なカテゴリの基本情報を読み込み
            await this.loadCategoriesInfo();
            
            const loadTime = performance.now() - startTime;
            this.loadTimes.set('initialization', loadTime);
            
            console.log(`✅ QuizLoader initialized in ${loadTime.toFixed(2)}ms`);
            console.log(`📊 Loaded ${this.manifest.categories.length} categories, ${this.manifest.totalQuestions} total questions`);
            
            return this.manifest;
            
        } catch (error) {
            console.error('❌ Failed to initialize QuizLoader:', error);
            throw new Error(`初期化に失敗しました: ${error.message}`);
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * マニフェストファイルを読み込み
     * @private
     */
    async loadManifest() {
        try {
            const response = await fetch('quiz-data/manifest.json');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            this.manifest = await response.json();
            
            // バージョンチェック
            if (!this.manifest.version || this.manifest.version < '2.0.0') {
                console.warn('⚠️ Old manifest version detected. Some features may not work properly.');
            }
            
            return this.manifest;
            
        } catch (error) {
            throw new Error(`マニフェスト読み込みエラー: ${error.message}`);
        }
    }

    /**
     * 全カテゴリの基本情報を読み込み
     * @private
     */
    async loadCategoriesInfo() {
        const enabledCategories = this.manifest.categories.filter(cat => cat.enabled);
        
        const loadPromises = enabledCategories.map(async (categoryMeta) => {
            try {
                const response = await fetch(`quiz-data/categories/${categoryMeta.id}/category.json`);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                const categoryData = await response.json();
                this.categories.set(categoryMeta.id, {
                    ...categoryMeta,
                    ...categoryData,
                    loadedLevels: new Set()
                });
                
                return categoryData;
                
            } catch (error) {
                console.error(`❌ Failed to load category ${categoryMeta.id}:`, error);
                return null;
            }
        });

        const results = await Promise.allSettled(loadPromises);
        const successful = results.filter(result => result.status === 'fulfilled' && result.value !== null);
        
        console.log(`📂 Loaded ${successful.length}/${enabledCategories.length} categories`);
    }

    /**
     * 特定カテゴリ・レベルの問題を読み込み
     * @param {string} categoryId カテゴリID
     * @param {string} level 難易度レベル
     * @param {number} offset 開始位置
     * @param {number} limit 取得数
     * @returns {Promise<Array>} 問題配列
     */
    async loadQuestions(categoryId, level = 'basic', offset = 0, limit = null) {
        const startTime = performance.now();
        const cacheKey = `${categoryId}_${level}`;
        
        try {
            // キャッシュチェック
            if (this.questionCache.has(cacheKey)) {
                this.cacheHits++;
                const cached = this.questionCache.get(cacheKey);
                const result = limit ? cached.slice(offset, offset + limit) : cached.slice(offset);
                console.log(`💾 Cache hit for ${cacheKey}: ${result.length} questions`);
                return result;
            }
            
            this.cacheMisses++;
            
            // カテゴリ存在チェック
            if (!this.categories.has(categoryId)) {
                throw new Error(`カテゴリ '${categoryId}' が見つかりません`);
            }
            
            const category = this.categories.get(categoryId);
            if (!category.levels[level]) {
                throw new Error(`レベル '${level}' はカテゴリ '${categoryId}' に存在しません`);
            }
            
            // インデックスファイル読み込み
            const indexResponse = await fetch(`quiz-data/categories/${categoryId}/${level}/index.json`);
            if (!indexResponse.ok) {
                throw new Error(`インデックスファイルが見つかりません: ${categoryId}/${level}`);
            }
            
            const index = await indexResponse.json();
            const questions = [];
            
            // 問題ファイルを並列読み込み
            const questionPromises = index.questions.map(async (questionMeta) => {
                try {
                    const response = await fetch(`quiz-data/categories/${categoryId}/${level}/${questionMeta.file}`);
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    
                    const questionData = await response.json();
                    return {
                        ...questionData,
                        metadata: questionMeta
                    };
                    
                } catch (error) {
                    console.error(`❌ Failed to load question ${questionMeta.file}:`, error);
                    return null;
                }
            });
            
            const questionResults = await Promise.allSettled(questionPromises);
            const loadedQuestions = questionResults
                .filter(result => result.status === 'fulfilled' && result.value !== null)
                .map(result => result.value);
            
            // キャッシュに保存
            this.questionCache.set(cacheKey, loadedQuestions);
            category.loadedLevels.add(level);
            
            const loadTime = performance.now() - startTime;
            this.loadTimes.set(cacheKey, loadTime);
            
            console.log(`📚 Loaded ${loadedQuestions.length} questions for ${categoryId}/${level} in ${loadTime.toFixed(2)}ms`);
            
            // 結果を返す
            const result = limit ? loadedQuestions.slice(offset, offset + limit) : loadedQuestions.slice(offset);
            return result;
            
        } catch (error) {
            console.error(`❌ Failed to load questions:`, error);
            throw error;
        }
    }

    /**
     * 特定の問題IDで問題を取得
     * @param {string} questionId 問題ID
     * @returns {Promise<Object|null>} 問題データ
     */
    async getQuestionById(questionId) {
        for (const [cacheKey, questions] of this.questionCache) {
            const question = questions.find(q => q.id === questionId);
            if (question) {
                this.cacheHits++;
                return question;
            }
        }
        
        this.cacheMisses++;
        console.warn(`⚠️ Question ${questionId} not found in cache`);
        return null;
    }

    /**
     * 問題をランダムに取得
     * @param {string} categoryId カテゴリID
     * @param {string} level レベル
     * @param {number} count 取得数
     * @returns {Promise<Array>} ランダムな問題配列
     */
    async getRandomQuestions(categoryId, level, count = 10) {
        const allQuestions = await this.loadQuestions(categoryId, level);
        
        if (allQuestions.length <= count) {
            return this.shuffleArray([...allQuestions]);
        }
        
        const shuffled = this.shuffleArray([...allQuestions]);
        return shuffled.slice(0, count);
    }

    /**
     * 問題をフィルタリング
     * @param {string} categoryId カテゴリID
     * @param {string} level レベル
     * @param {Object} filters フィルタ条件
     * @returns {Promise<Array>} フィルタ済み問題配列
     */
    async filterQuestions(categoryId, level, filters = {}) {
        const questions = await this.loadQuestions(categoryId, level);
        
        return questions.filter(question => {
            // タグフィルタ
            if (filters.tags && filters.tags.length > 0) {
                const hasMatchingTag = filters.tags.some(tag => 
                    question.tags && question.tags.includes(tag)
                );
                if (!hasMatchingTag) return false;
            }
            
            // 難易度フィルタ
            if (filters.difficulty && question.difficulty) {
                if (question.difficulty.score !== filters.difficulty) {
                    return false;
                }
            }
            
            // キーワード検索
            if (filters.keyword) {
                const keyword = filters.keyword.toLowerCase();
                const text = `${question.question.text} ${question.choices.map(c => c.text).join(' ')}`.toLowerCase();
                if (!text.includes(keyword)) {
                    return false;
                }
            }
            
            return true;
        });
    }

    /**
     * 問題の先読み（パフォーマンス最適化）
     * @param {string} categoryId カテゴリID
     * @param {string} level レベル
     */
    async preloadQuestions(categoryId, level) {
        const cacheKey = `${categoryId}_${level}`;
        
        if (!this.questionCache.has(cacheKey)) {
            console.log(`🔄 Preloading questions for ${categoryId}/${level}...`);
            try {
                await this.loadQuestions(categoryId, level);
                console.log(`✅ Preloaded questions for ${categoryId}/${level}`);
            } catch (error) {
                console.error(`❌ Failed to preload questions:`, error);
            }
        }
    }

    /**
     * カテゴリ情報を取得
     * @param {string} categoryId カテゴリID
     * @returns {Object|null} カテゴリデータ
     */
    getCategory(categoryId) {
        return this.categories.get(categoryId) || null;
    }

    /**
     * 全カテゴリリストを取得
     * @returns {Array} カテゴリ配列
     */
    getAllCategories() {
        return Array.from(this.categories.values());
    }

    /**
     * キャッシュをクリア
     * @param {string} categoryId 特定カテゴリのみクリア（省略時は全体）
     */
    clearCache(categoryId = null) {
        if (categoryId) {
            for (const key of this.questionCache.keys()) {
                if (key.startsWith(categoryId)) {
                    this.questionCache.delete(key);
                }
            }
            console.log(`🗑️ Cleared cache for category: ${categoryId}`);
        } else {
            this.questionCache.clear();
            this.loadedBatches.clear();
            console.log('🗑️ Cleared all cache');
        }
    }

    /**
     * 統計情報を取得
     * @returns {Object} パフォーマンス統計
     */
    getStats() {
        const totalCacheRequests = this.cacheHits + this.cacheMisses;
        const cacheHitRate = totalCacheRequests > 0 ? (this.cacheHits / totalCacheRequests) * 100 : 0;
        
        return {
            cacheHitRate: cacheHitRate.toFixed(2) + '%',
            cacheHits: this.cacheHits,
            cacheMisses: this.cacheMisses,
            cachedCategories: this.questionCache.size,
            loadTimes: Object.fromEntries(this.loadTimes),
            memoryUsage: this.getMemoryUsage()
        };
    }

    /**
     * メモリ使用量を概算
     * @private
     */
    getMemoryUsage() {
        let totalQuestions = 0;
        for (const questions of this.questionCache.values()) {
            totalQuestions += questions.length;
        }
        
        // 1問あたり約2KBと仮定
        const estimatedBytes = totalQuestions * 2048;
        return {
            questions: totalQuestions,
            estimatedSize: this.formatBytes(estimatedBytes)
        };
    }

    /**
     * バイト数を読みやすい形式にフォーマット
     * @private
     */
    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    /**
     * 配列をシャッフル
     * @private
     */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * エラーリカバリ機能
     * @param {Function} operation 実行する操作
     * @param {number} maxRetries 最大リトライ回数
     * @returns {Promise} 操作結果
     */
    async withRetry(operation, maxRetries = 3) {
        let lastError;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await operation();
            } catch (error) {
                lastError = error;
                console.warn(`⚠️ Attempt ${attempt}/${maxRetries} failed:`, error.message);
                
                if (attempt < maxRetries) {
                    const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Exponential backoff
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
        
        throw lastError;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuizLoader;
}

// Global instance for browser usage
if (typeof window !== 'undefined') {
    window.QuizLoader = QuizLoader;
}