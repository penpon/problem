/**
 * AdminStatistics - 統計・ダッシュボード機能
 * 統合学習システムの統計情報とチャート生成
 */

class AdminStatistics {
    constructor() {
        this.chartInstances = new Map();
        this.statsCache = {
            programming: null,
            quiz: null,
            categories: null,
            lastUpdate: null
        };
        this.cacheTimeout = 5 * 60 * 1000; // 5分
        
        console.log('📊 AdminStatistics initialized');
    }

    /**
     * 全体統計の取得
     * @returns {Promise<Object>} 統計データ
     */
    async getOverallStats() {
        console.log('📈 Gathering overall statistics...');
        
        try {
            const [programmingStats, quizStats, categoryStats] = await Promise.all([
                this.getProgrammingStats(),
                this.getQuizStats(),
                this.getCategoryStats()
            ]);

            const overallStats = {
                programming: programmingStats,
                quiz: quizStats,
                categories: categoryStats,
                system: await this.getSystemStats(),
                timestamp: new Date().toISOString()
            };

            console.log('✅ Overall statistics gathered:', overallStats);
            return overallStats;
            
        } catch (error) {
            console.error('❌ Failed to gather overall statistics:', error);
            throw error;
        }
    }

    /**
     * プログラミング問題の統計
     * @returns {Promise<Object>} プログラミング問題統計
     */
    async getProgrammingStats() {
        if (this.isStatsValid('programming')) {
            return this.statsCache.programming;
        }

        try {
            const problemIndex = await problemLoader.loadProblemIndex();
            
            const stats = {
                totalProblems: problemIndex.length,
                byCategory: {},
                byDifficulty: {},
                averagePoints: 0,
                totalPoints: 0
            };

            let totalPoints = 0;
            
            problemIndex.forEach(problem => {
                // カテゴリ別統計
                const category = problem.category || 'その他';
                if (!stats.byCategory[category]) {
                    stats.byCategory[category] = { count: 0, points: 0 };
                }
                stats.byCategory[category].count++;
                stats.byCategory[category].points += problem.points || 0;

                // 難易度別統計
                const difficulty = problem.difficulty || '未分類';
                if (!stats.byDifficulty[difficulty]) {
                    stats.byDifficulty[difficulty] = { count: 0, points: 0 };
                }
                stats.byDifficulty[difficulty].count++;
                stats.byDifficulty[difficulty].points += problem.points || 0;

                totalPoints += problem.points || 0;
            });

            stats.totalPoints = totalPoints;
            stats.averagePoints = problemIndex.length > 0 ? Math.round(totalPoints / problemIndex.length) : 0;

            this.statsCache.programming = stats;
            this.statsCache.lastUpdate = Date.now();
            
            return stats;
            
        } catch (error) {
            console.error('❌ Failed to get programming stats:', error);
            return {
                totalProblems: 0,
                byCategory: {},
                byDifficulty: {},
                averagePoints: 0,
                totalPoints: 0,
                error: error.message
            };
        }
    }

    /**
     * クイズ問題の統計
     * @returns {Promise<Object>} クイズ統計
     */
    async getQuizStats() {
        if (this.isStatsValid('quiz')) {
            return this.statsCache.quiz;
        }

        try {
            // QuizLoaderが存在する場合のみクイズ統計を取得
            if (typeof QuizLoader === 'undefined') {
                return this.getEmptyQuizStats();
            }

            const quizLoader = new QuizLoader();
            await quizLoader.initialize();
            const manifest = quizLoader.manifest;

            const stats = {
                totalQuestions: manifest.totalQuestions || 0,
                totalCategories: manifest.categories ? manifest.categories.length : 0,
                byCategory: {},
                byLevel: {},
                enabledCategories: 0
            };

            if (manifest.categories) {
                for (const category of manifest.categories) {
                    // カテゴリ別統計
                    stats.byCategory[category.name] = {
                        count: category.questionCount || 0,
                        enabled: category.enabled,
                        levels: category.levels || []
                    };

                    if (category.enabled) {
                        stats.enabledCategories++;
                    }

                    // レベル別統計（カテゴリ情報から推定）
                    if (category.levels) {
                        category.levels.forEach(level => {
                            if (!stats.byLevel[level]) {
                                stats.byLevel[level] = { count: 0, categories: 0 };
                            }
                            stats.byLevel[level].categories++;
                        });
                    }
                }
            }

            this.statsCache.quiz = stats;
            this.statsCache.lastUpdate = Date.now();
            
            return stats;
            
        } catch (error) {
            console.error('❌ Failed to get quiz stats:', error);
            return this.getEmptyQuizStats();
        }
    }

    /**
     * 空のクイズ統計を返す
     * @returns {Object} 空の統計データ
     */
    getEmptyQuizStats() {
        return {
            totalQuestions: 0,
            totalCategories: 0,
            byCategory: {},
            byLevel: {},
            enabledCategories: 0,
            error: 'QuizLoader not available'
        };
    }

    /**
     * カテゴリ統計の取得
     * @returns {Promise<Object>} カテゴリ統計
     */
    async getCategoryStats() {
        if (this.isStatsValid('categories')) {
            return this.statsCache.categories;
        }

        try {
            const [programmingStats, quizStats] = await Promise.all([
                this.getProgrammingStats(),
                this.getQuizStats()
            ]);

            const stats = {
                totalCategories: 0,
                programming: Object.keys(programmingStats.byCategory).length,
                quiz: Object.keys(quizStats.byCategory).length,
                combined: {},
                distribution: []
            };

            // プログラミング問題のカテゴリ
            Object.entries(programmingStats.byCategory).forEach(([name, data]) => {
                stats.combined[name] = {
                    programming: data.count,
                    quiz: 0,
                    total: data.count,
                    type: 'programming'
                };
            });

            // クイズ問題のカテゴリ
            Object.entries(quizStats.byCategory).forEach(([name, data]) => {
                if (stats.combined[name]) {
                    stats.combined[name].quiz = data.count;
                    stats.combined[name].total += data.count;
                    stats.combined[name].type = 'mixed';
                } else {
                    stats.combined[name] = {
                        programming: 0,
                        quiz: data.count,
                        total: data.count,
                        type: 'quiz'
                    };
                }
            });

            stats.totalCategories = Object.keys(stats.combined).length;

            // チャート用データ
            stats.distribution = Object.entries(stats.combined).map(([name, data]) => ({
                label: name,
                value: data.total,
                programming: data.programming,
                quiz: data.quiz,
                type: data.type
            }));

            this.statsCache.categories = stats;
            this.statsCache.lastUpdate = Date.now();
            
            return stats;
            
        } catch (error) {
            console.error('❌ Failed to get category stats:', error);
            return {
                totalCategories: 0,
                programming: 0,
                quiz: 0,
                combined: {},
                distribution: [],
                error: error.message
            };
        }
    }

    /**
     * システム統計の取得
     * @returns {Promise<Object>} システム統計
     */
    async getSystemStats() {
        try {
            const stats = {
                storageUsage: this.getStorageUsage(),
                cacheStats: this.getCacheStats(),
                systemStatus: this.getSystemStatus(),
                loadTimes: this.getLoadTimes()
            };

            return stats;
            
        } catch (error) {
            console.error('❌ Failed to get system stats:', error);
            return {
                storageUsage: { used: 0, quota: 0, percentage: 0 },
                cacheStats: { problems: 0, quiz: 0 },
                systemStatus: 'error',
                loadTimes: {},
                error: error.message
            };
        }
    }

    /**
     * ストレージ使用量の取得
     * @returns {Object} ストレージ統計
     */
    getStorageUsage() {
        try {
            let totalSize = 0;
            
            // LocalStorageのサイズを計算
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    totalSize += localStorage[key].length + key.length;
                }
            }

            return {
                used: totalSize,
                usedKB: Math.round(totalSize / 1024 * 100) / 100,
                percentage: 0, // ブラウザのクォータは取得困難
                keys: Object.keys(localStorage).length
            };
            
        } catch (error) {
            return { used: 0, usedKB: 0, percentage: 0, keys: 0, error: error.message };
        }
    }

    /**
     * キャッシュ統計の取得
     * @returns {Object} キャッシュ統計
     */
    getCacheStats() {
        const stats = {
            programming: {
                cached: problemLoader ? problemLoader.loadedProblems.size : 0,
                indexed: problemLoader ? (problemLoader.problemIndex ? problemLoader.problemIndex.length : 0) : 0
            },
            quiz: 0
        };

        // QuizLoaderのキャッシュ統計
        if (typeof QuizLoader !== 'undefined' && window.quizLoader) {
            stats.quiz = window.quizLoader.questionCache.size;
        }

        return stats;
    }

    /**
     * システム状態の取得
     * @returns {Object} システム状態
     */
    getSystemStatus() {
        return {
            programmingSystem: typeof problemLoader !== 'undefined' ? 'ok' : 'error',
            quizSystem: typeof QuizLoader !== 'undefined' ? 'ok' : 'error',
            localStorage: this.checkLocalStorage(),
            charts: typeof Chart !== 'undefined' ? 'ok' : 'error'
        };
    }

    /**
     * LocalStorageの状態チェック
     * @returns {string} 状態
     */
    checkLocalStorage() {
        try {
            const testKey = 'admin_test';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            return 'ok';
        } catch (error) {
            return 'error';
        }
    }

    /**
     * 読み込み時間の取得
     * @returns {Object} 読み込み時間統計
     */
    getLoadTimes() {
        const loadTimes = {};
        
        if (problemLoader && problemLoader.loadTimes) {
            Object.entries(problemLoader.loadTimes).forEach(([key, time]) => {
                loadTimes[`programming_${key}`] = Math.round(time * 100) / 100;
            });
        }

        return loadTimes;
    }

    /**
     * 統計の有効性チェック
     * @param {string} type 統計タイプ
     * @returns {boolean} 有効性
     */
    isStatsValid(type) {
        if (!this.statsCache[type] || !this.statsCache.lastUpdate) {
            return false;
        }
        
        return (Date.now() - this.statsCache.lastUpdate) < this.cacheTimeout;
    }

    /**
     * チャート生成（カテゴリ分布）
     * @param {HTMLCanvasElement} canvas キャンバス要素
     * @param {Object} categoryStats カテゴリ統計
     */
    generateCategoryChart(canvas, categoryStats) {
        // 既存のチャートを破棄
        if (this.chartInstances.has('categoryChart')) {
            this.chartInstances.get('categoryChart').destroy();
        }

        const ctx = canvas.getContext('2d');
        
        // データ準備
        const data = categoryStats.distribution.slice(0, 10); // 上位10件
        
        if (data.length === 0) {
            this.drawNoDataMessage(ctx, 'カテゴリデータがありません');
            return;
        }

        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.map(item => item.label),
                datasets: [{
                    data: data.map(item => item.value),
                    backgroundColor: [
                        '#667eea', '#764ba2', '#f093fb', '#f5576c',
                        '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
                        '#ffecd2', '#fcb69f'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            font: { size: 12 },
                            padding: 15,
                            generateLabels: (chart) => {
                                const original = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                                return original.map((label, index) => {
                                    const item = data[index];
                                    label.text = `${label.text} (${item.value})`;
                                    return label;
                                });
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const item = data[context.dataIndex];
                                return [
                                    `${context.label}: ${context.parsed}問`,
                                    `プログラミング: ${item.programming}問`,
                                    `クイズ: ${item.quiz}問`
                                ];
                            }
                        }
                    }
                }
            }
        });

        this.chartInstances.set('categoryChart', chart);
    }

    /**
     * データなしメッセージの描画
     * @param {CanvasRenderingContext2D} ctx コンテキスト
     * @param {string} message メッセージ
     */
    drawNoDataMessage(ctx, message) {
        const canvas = ctx.canvas;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#64748b';
        ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.fillText(message, canvas.width / 2, canvas.height / 2);
    }

    /**
     * 統計キャッシュのクリア
     */
    clearStatsCache() {
        this.statsCache = {
            programming: null,
            quiz: null,
            categories: null,
            lastUpdate: null
        };
        console.log('🗑️ Statistics cache cleared');
    }

    /**
     * チャートの破棄
     */
    destroyCharts() {
        this.chartInstances.forEach((chart, key) => {
            console.log(`🗑️ Destroying chart: ${key}`);
            chart.destroy();
        });
        this.chartInstances.clear();
    }

    /**
     * アクティビティログの生成
     * @returns {Array} アクティビティリスト
     */
    generateActivityLog() {
        const activities = [];
        
        // システム初期化アクティビティ
        activities.push({
            icon: 'fas fa-power-off',
            message: '管理画面が初期化されました',
            time: new Date().toLocaleString('ja-JP'),
            type: 'system'
        });

        // 統計更新アクティビティ
        if (this.statsCache.lastUpdate) {
            activities.push({
                icon: 'fas fa-chart-bar',
                message: '統計データが更新されました',
                time: new Date(this.statsCache.lastUpdate).toLocaleString('ja-JP'),
                type: 'stats'
            });
        }

        return activities;
    }

    /**
     * 統計データのエクスポート
     * @returns {Promise<Object>} エクスポートデータ
     */
    async exportStatistics() {
        console.log('📤 Exporting statistics...');
        
        try {
            const overallStats = await this.getOverallStats();
            
            const exportData = {
                metadata: {
                    exportTime: new Date().toISOString(),
                    version: '1.0.0',
                    type: 'admin_statistics'
                },
                statistics: overallStats,
                activities: this.generateActivityLog()
            };

            console.log('✅ Statistics exported successfully');
            return exportData;
            
        } catch (error) {
            console.error('❌ Failed to export statistics:', error);
            throw error;
        }
    }
}

// グローバルインスタンス作成
const adminStatistics = new AdminStatistics();