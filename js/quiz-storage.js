/**
 * QuizStorage - 復習機能とプログレス管理
 * ローカルストレージを使用した学習データ管理システム
 */

class QuizStorage {
    constructor() {
        this.storageKey = 'engineerQuizData';
        this.version = '2.0.0';
        this.maxStorageSize = 5 * 1024 * 1024; // 5MB制限
        
        // データ構造の初期化
        this.data = this.loadData();
        this.ensureDataStructure();
        
        console.log('💾 QuizStorage initialized');
    }

    /**
     * データ構造の確保
     * @private
     */
    ensureDataStructure() {
        if (!this.data.version || this.data.version !== this.version) {
            console.log('🔄 Migrating storage data to new version');
            this.migrateData();
        }

        const requiredStructure = {
            version: this.version,
            lastUpdated: new Date().toISOString(),
            categories: {},
            globalStats: {
                totalQuestions: 0,
                totalCorrect: 0,
                totalIncorrect: 0,
                streakCurrent: 0,
                streakBest: 0,
                studyTimeMinutes: 0,
                lastStudyDate: null
            },
            settings: {
                soundEnabled: true,
                animationsEnabled: true,
                reviewMode: 'incorrect_only', // 'incorrect_only', 'all', 'low_confidence'
                questionOrder: 'random', // 'random', 'sequential'
                autoAdvance: false,
                studyReminders: true
            },
            achievements: []
        };

        // 不足している構造を追加
        this.data = this.deepMerge(requiredStructure, this.data);
        this.saveData();
    }

    /**
     * データの深いマージ
     * @private
     */
    deepMerge(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this.deepMerge(result[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
        
        return result;
    }

    /**
     * 問題の回答を記録
     * @param {string} questionId 問題ID
     * @param {string} categoryId カテゴリID
     * @param {string} level 難易度レベル
     * @param {boolean} isCorrect 正解かどうか
     * @param {number} timeSpent 回答にかかった時間（秒）
     * @param {string} selectedAnswer 選択した答え
     * @param {string} correctAnswer 正解
     */
    recordAnswer(questionId, categoryId, level, isCorrect, timeSpent, selectedAnswer, correctAnswer) {
        try {
            // カテゴリデータの初期化
            if (!this.data.categories[categoryId]) {
                this.data.categories[categoryId] = {
                    name: categoryId,
                    levels: {},
                    totalQuestions: 0,
                    totalCorrect: 0,
                    totalIncorrect: 0,
                    averageTime: 0,
                    lastStudied: null
                };
            }

            // レベルデータの初期化
            if (!this.data.categories[categoryId].levels[level]) {
                this.data.categories[categoryId].levels[level] = {
                    questions: {},
                    totalQuestions: 0,
                    totalCorrect: 0,
                    totalIncorrect: 0,
                    averageTime: 0,
                    completion: 0
                };
            }

            const categoryData = this.data.categories[categoryId];
            const levelData = categoryData.levels[level];

            // 問題データの初期化または更新
            if (!levelData.questions[questionId]) {
                levelData.questions[questionId] = {
                    attempts: 0,
                    correct: 0,
                    incorrect: 0,
                    totalTime: 0,
                    firstAttempt: new Date().toISOString(),
                    lastAttempt: null,
                    consecutiveCorrect: 0,
                    confidence: 0, // 0-100の信頼度
                    needsReview: true,
                    answers: []
                };
            }

            const questionData = levelData.questions[questionId];

            // 回答記録
            const answerRecord = {
                timestamp: new Date().toISOString(),
                isCorrect,
                timeSpent,
                selectedAnswer,
                correctAnswer
            };

            questionData.answers.push(answerRecord);
            questionData.attempts++;
            questionData.totalTime += timeSpent;
            questionData.lastAttempt = answerRecord.timestamp;

            if (isCorrect) {
                questionData.correct++;
                questionData.consecutiveCorrect++;
                levelData.totalCorrect++;
                categoryData.totalCorrect++;
                this.data.globalStats.totalCorrect++;
                
                // 連続正解でストリーク更新
                this.data.globalStats.streakCurrent++;
                if (this.data.globalStats.streakCurrent > this.data.globalStats.streakBest) {
                    this.data.globalStats.streakBest = this.data.globalStats.streakCurrent;
                }
            } else {
                questionData.incorrect++;
                questionData.consecutiveCorrect = 0;
                levelData.totalIncorrect++;
                categoryData.totalIncorrect++;
                this.data.globalStats.totalIncorrect++;
                this.data.globalStats.streakCurrent = 0;
            }

            // 信頼度の計算
            this.updateConfidence(questionData);

            // 復習が必要かどうかの判定
            this.updateReviewStatus(questionData);

            // 統計の更新
            this.updateStatistics(categoryId, level);

            // 実績チェック
            this.checkAchievements();

            // データ保存
            this.data.lastUpdated = new Date().toISOString();
            this.data.globalStats.lastStudyDate = new Date().toISOString();
            this.saveData();

            console.log(`📝 Recorded answer for ${questionId}: ${isCorrect ? 'correct' : 'incorrect'}`);

        } catch (error) {
            console.error('❌ Failed to record answer:', error);
        }
    }

    /**
     * 信頼度の更新
     * @private
     */
    updateConfidence(questionData) {
        const correctRate = questionData.correct / questionData.attempts;
        const recentAttempts = questionData.answers.slice(-5); // 直近5回
        const recentCorrectRate = recentAttempts.filter(a => a.isCorrect).length / recentAttempts.length;
        
        // 信頼度計算（正解率、連続正解、回答時間を考慮）
        let confidence = 0;
        
        // 基本信頼度（正解率ベース）
        confidence += correctRate * 60;
        
        // 直近の成績重視
        confidence += recentCorrectRate * 30;
        
        // 連続正解ボーナス
        if (questionData.consecutiveCorrect >= 3) {
            confidence += 10;
        }
        
        // 回答時間による調整（平均時間が短いほど信頼度UP）
        const averageTime = questionData.totalTime / questionData.attempts;
        if (averageTime < 15) { // 15秒以内
            confidence += 10;
        } else if (averageTime > 45) { // 45秒以上
            confidence -= 10;
        }

        questionData.confidence = Math.max(0, Math.min(100, Math.round(confidence)));
    }

    /**
     * 復習ステータスの更新
     * @private
     */
    updateReviewStatus(questionData) {
        // 復習が必要な条件
        const needsReview = 
            questionData.confidence < 70 || // 信頼度70%未満
            questionData.consecutiveCorrect < 2 || // 連続正解2回未満
            questionData.incorrect > questionData.correct; // 不正解数が正解数を上回る

        questionData.needsReview = needsReview;
    }

    /**
     * カテゴリ・レベル統計の更新
     * @private
     */
    updateStatistics(categoryId, level) {
        const categoryData = this.data.categories[categoryId];
        const levelData = categoryData.levels[level];

        // レベル統計
        levelData.totalQuestions = Object.keys(levelData.questions).length;
        if (levelData.totalQuestions > 0) {
            const totalTime = Object.values(levelData.questions)
                .reduce((sum, q) => sum + q.totalTime, 0);
            const totalAttempts = Object.values(levelData.questions)
                .reduce((sum, q) => sum + q.attempts, 0);
            levelData.averageTime = totalAttempts > 0 ? totalTime / totalAttempts : 0;
            
            // 完了率（信頼度70%以上を完了とみなす）
            const completedQuestions = Object.values(levelData.questions)
                .filter(q => q.confidence >= 70).length;
            levelData.completion = (completedQuestions / levelData.totalQuestions) * 100;
        }

        // カテゴリ統計の集計
        categoryData.totalQuestions = Object.values(categoryData.levels)
            .reduce((sum, level) => sum + level.totalQuestions, 0);
        categoryData.lastStudied = new Date().toISOString();

        // グローバル統計
        this.data.globalStats.totalQuestions = Object.values(this.data.categories)
            .reduce((sum, cat) => sum + cat.totalQuestions, 0);
    }

    /**
     * 実績のチェック
     * @private
     */
    checkAchievements() {
        const achievements = [
            {
                id: 'first_correct',
                name: '初回正解',
                description: '最初の問題に正解！',
                condition: () => this.data.globalStats.totalCorrect >= 1
            },
            {
                id: 'streak_5',
                name: '連続正解5問',
                description: '5問連続で正解！',
                condition: () => this.data.globalStats.streakBest >= 5
            },
            {
                id: 'streak_10',
                name: '連続正解10問',
                description: '10問連続で正解！',
                condition: () => this.data.globalStats.streakBest >= 10
            },
            {
                id: 'total_50',
                name: '累計50問正解',
                description: '累計50問正解を達成！',
                condition: () => this.data.globalStats.totalCorrect >= 50
            },
            {
                id: 'category_master',
                name: 'カテゴリマスター',
                description: '1つのカテゴリで90%以上の正解率を達成！',
                condition: () => {
                    return Object.values(this.data.categories).some(cat => {
                        const total = cat.totalCorrect + cat.totalIncorrect;
                        return total >= 10 && (cat.totalCorrect / total) >= 0.9;
                    });
                }
            }
        ];

        const currentAchievementIds = this.data.achievements.map(a => a.id);

        achievements.forEach(achievement => {
            if (!currentAchievementIds.includes(achievement.id) && achievement.condition()) {
                this.data.achievements.push({
                    ...achievement,
                    unlockedAt: new Date().toISOString()
                });
                console.log(`🏆 Achievement unlocked: ${achievement.name}`);
            }
        });
    }

    /**
     * 復習が必要な問題を取得
     * @param {string} categoryId カテゴリID（省略時は全て）
     * @param {string} level レベル（省略時は全て）
     * @returns {Array} 復習が必要な問題IDリスト
     */
    getReviewQuestions(categoryId = null, level = null) {
        const reviewQuestions = [];

        const categories = categoryId ? 
            { [categoryId]: this.data.categories[categoryId] } : 
            this.data.categories;

        Object.entries(categories).forEach(([catId, catData]) => {
            if (!catData) return;

            const levels = level ? 
                { [level]: catData.levels[level] } : 
                catData.levels;

            Object.entries(levels).forEach(([levelId, levelData]) => {
                if (!levelData) return;

                Object.entries(levelData.questions).forEach(([questionId, questionData]) => {
                    if (questionData.needsReview) {
                        reviewQuestions.push({
                            questionId,
                            categoryId: catId,
                            level: levelId,
                            confidence: questionData.confidence,
                            lastAttempt: questionData.lastAttempt,
                            attempts: questionData.attempts,
                            correctRate: questionData.correct / questionData.attempts
                        });
                    }
                });
            });
        });

        // 信頼度の低い順でソート
        return reviewQuestions.sort((a, b) => a.confidence - b.confidence);
    }

    /**
     * 問題の学習状況を取得
     * @param {string} questionId 問題ID
     * @returns {Object|null} 学習データ
     */
    getQuestionStats(questionId) {
        for (const categoryData of Object.values(this.data.categories)) {
            for (const levelData of Object.values(categoryData.levels)) {
                if (levelData.questions[questionId]) {
                    return levelData.questions[questionId];
                }
            }
        }
        return null;
    }

    /**
     * カテゴリの統計を取得
     * @param {string} categoryId カテゴリID
     * @returns {Object|null} カテゴリ統計
     */
    getCategoryStats(categoryId) {
        return this.data.categories[categoryId] || null;
    }

    /**
     * 全体統計を取得
     * @returns {Object} グローバル統計
     */
    getGlobalStats() {
        const totalAttempts = this.data.globalStats.totalCorrect + this.data.globalStats.totalIncorrect;
        const accuracy = totalAttempts > 0 ? (this.data.globalStats.totalCorrect / totalAttempts) * 100 : 0;

        return {
            ...this.data.globalStats,
            accuracy: Math.round(accuracy * 100) / 100,
            totalAttempts
        };
    }

    /**
     * 設定の取得
     * @returns {Object} 設定データ
     */
    getSettings() {
        return { ...this.data.settings };
    }

    /**
     * 設定の更新
     * @param {Object} newSettings 新しい設定
     */
    updateSettings(newSettings) {
        this.data.settings = { ...this.data.settings, ...newSettings };
        this.data.lastUpdated = new Date().toISOString();
        this.saveData();
        console.log('⚙️ Settings updated');
    }

    /**
     * 実績リストを取得
     * @returns {Array} 実績配列
     */
    getAchievements() {
        return [...this.data.achievements];
    }

    /**
     * データのエクスポート
     * @returns {string} JSON文字列
     */
    exportData() {
        const exportData = {
            ...this.data,
            exportedAt: new Date().toISOString(),
            exportVersion: this.version
        };
        return JSON.stringify(exportData, null, 2);
    }

    /**
     * データのインポート
     * @param {string} jsonData JSON文字列
     * @returns {boolean} 成功可否
     */
    importData(jsonData) {
        try {
            const importedData = JSON.parse(jsonData);
            
            // バージョンチェック
            if (importedData.exportVersion && importedData.exportVersion !== this.version) {
                console.warn('⚠️ Importing data from different version');
            }

            this.data = importedData;
            this.ensureDataStructure();
            this.saveData();
            
            console.log('📥 Data imported successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to import data:', error);
            return false;
        }
    }

    /**
     * 特定データの削除
     * @param {string} type 削除タイプ ('category', 'level', 'all')
     * @param {string} categoryId カテゴリID
     * @param {string} level レベル
     */
    clearData(type = 'all', categoryId = null, level = null) {
        try {
            switch (type) {
                case 'category':
                    if (categoryId && this.data.categories[categoryId]) {
                        delete this.data.categories[categoryId];
                        console.log(`🗑️ Cleared data for category: ${categoryId}`);
                    }
                    break;
                    
                case 'level':
                    if (categoryId && level && this.data.categories[categoryId]?.levels[level]) {
                        delete this.data.categories[categoryId].levels[level];
                        console.log(`🗑️ Cleared data for ${categoryId}/${level}`);
                    }
                    break;
                    
                case 'all':
                    this.data.categories = {};
                    this.data.globalStats = {
                        totalQuestions: 0,
                        totalCorrect: 0,
                        totalIncorrect: 0,
                        streakCurrent: 0,
                        streakBest: 0,
                        studyTimeMinutes: 0,
                        lastStudyDate: null
                    };
                    this.data.achievements = [];
                    console.log('🗑️ Cleared all data');
                    break;
            }
            
            this.data.lastUpdated = new Date().toISOString();
            this.saveData();
            
        } catch (error) {
            console.error('❌ Failed to clear data:', error);
        }
    }

    /**
     * データの読み込み
     * @private
     */
    loadData() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error('❌ Failed to load data from localStorage:', error);
            return {};
        }
    }

    /**
     * データの保存
     * @private
     */
    saveData() {
        try {
            const jsonString = JSON.stringify(this.data);
            
            // サイズチェック
            if (jsonString.length > this.maxStorageSize) {
                console.warn('⚠️ Data size exceeds limit, cleaning up old records');
                this.cleanupOldData();
                return;
            }
            
            localStorage.setItem(this.storageKey, jsonString);
            
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                console.warn('⚠️ localStorage quota exceeded, cleaning up data');
                this.cleanupOldData();
            } else {
                console.error('❌ Failed to save data to localStorage:', error);
            }
        }
    }

    /**
     * 古いデータのクリーンアップ
     * @private
     */
    cleanupOldData() {
        // 30日以上古い回答履歴を削除
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 30);

        Object.values(this.data.categories).forEach(categoryData => {
            Object.values(categoryData.levels).forEach(levelData => {
                Object.values(levelData.questions).forEach(questionData => {
                    questionData.answers = questionData.answers.filter(answer => 
                        new Date(answer.timestamp) > cutoffDate
                    );
                });
            });
        });

        this.saveData();
        console.log('🧹 Cleaned up old data');
    }

    /**
     * データ移行
     * @private
     */
    migrateData() {
        // 古いバージョンからの移行処理
        if (!this.data.version) {
            // v1.0からv2.0への移行
            console.log('📦 Migrating from v1.0 to v2.0');
            // 移行ロジックをここに実装
        }
        
        this.data.version = this.version;
    }

    /**
     * ストレージサイズの取得
     * @returns {Object} サイズ情報
     */
    getStorageInfo() {
        const data = JSON.stringify(this.data);
        const sizeBytes = data.length;
        const sizeKB = (sizeBytes / 1024).toFixed(2);
        const usagePercent = ((sizeBytes / this.maxStorageSize) * 100).toFixed(2);

        return {
            sizeBytes,
            sizeKB: sizeKB + ' KB',
            usagePercent: usagePercent + '%',
            questionsTracked: this.data.globalStats.totalQuestions
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuizStorage;
}

// Global instance for browser usage
if (typeof window !== 'undefined') {
    window.QuizStorage = QuizStorage;
}