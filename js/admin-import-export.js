/**
 * AdminImportExport - データインポート・エクスポート機能
 * JSON/CSV対応、バックアップ機能を提供
 */

class AdminImportExport {
    constructor() {
        this.supportedFormats = ['json', 'csv'];
        this.maxFileSize = 10 * 1024 * 1024; // 10MB
        this.validationRules = {
            programming: ['id', 'title', 'category'],
            quiz: ['question', 'options', 'correct'],
            category: ['id', 'name']
        };
        
        console.log('📦 AdminImportExport initialized');
    }

    /**
     * 全データエクスポート
     * @returns {Promise<Object>} エクスポートデータ
     */
    async exportAllData() {
        console.log('📤 Starting complete data export...');
        
        try {
            const [programmingData, quizData, categoriesData, statisticsData] = await Promise.all([
                this.exportProgrammingProblems(),
                this.exportQuizQuestions(),
                this.exportCategories(),
                adminStatistics.exportStatistics()
            ]);

            const completeBackup = {
                metadata: {
                    exportTime: new Date().toISOString(),
                    version: '2.0.0',
                    type: 'complete_backup',
                    totalItems: {
                        programming: programmingData.problems.length,
                        quiz: quizData.questions.length,
                        categories: categoriesData.categories.length
                    }
                },
                programming: programmingData,
                quiz: quizData,
                categories: categoriesData,
                statistics: statisticsData,
                systemInfo: await this.getSystemInfo()
            };

            console.log('✅ Complete data export finished:', completeBackup.metadata.totalItems);
            return completeBackup;
            
        } catch (error) {
            console.error('❌ Failed to export all data:', error);
            throw new Error(`データエクスポートに失敗しました: ${error.message}`);
        }
    }

    /**
     * プログラミング問題のエクスポート
     * @param {Array|null} selectedIds 選択された問題ID（nullの場合は全て）
     * @returns {Promise<Object>} プログラミング問題データ
     */
    async exportProgrammingProblems(selectedIds = null) {
        console.log('📝 Exporting programming problems...');
        
        try {
            const problemIndex = await problemLoader.loadProblemIndex();
            const problems = [];

            for (const problemMeta of problemIndex) {
                if (selectedIds && !selectedIds.includes(problemMeta.id)) {
                    continue;
                }

                try {
                    const problemDetail = await problemLoader.loadProblem(problemMeta.id);
                    problems.push({
                        ...problemMeta,
                        ...problemDetail,
                        exportedAt: new Date().toISOString()
                    });
                } catch (error) {
                    console.warn(`⚠️ Failed to load problem ${problemMeta.id}:`, error);
                    // メタデータのみ含める
                    problems.push({
                        ...problemMeta,
                        error: `詳細データの読み込みに失敗: ${error.message}`,
                        exportedAt: new Date().toISOString()
                    });
                }
            }

            const exportData = {
                metadata: {
                    exportTime: new Date().toISOString(),
                    version: '1.0.0',
                    type: 'programming_problems',
                    count: problems.length
                },
                problems: problems
            };

            console.log(`✅ Programming problems exported: ${problems.length} items`);
            return exportData;
            
        } catch (error) {
            console.error('❌ Failed to export programming problems:', error);
            throw new Error(`プログラミング問題のエクスポートに失敗しました: ${error.message}`);
        }
    }

    /**
     * クイズ問題のエクスポート
     * @param {string|null} categoryId カテゴリID（nullの場合は全て）
     * @param {string|null} level レベル（nullの場合は全て）
     * @returns {Promise<Object>} クイズデータ
     */
    async exportQuizQuestions(categoryId = null, level = null) {
        console.log('❓ Exporting quiz questions...');
        
        try {
            // QuizLoaderが利用可能か確認
            if (typeof QuizLoader === 'undefined') {
                console.warn('⚠️ QuizLoader not available');
                return {
                    metadata: {
                        exportTime: new Date().toISOString(),
                        version: '1.0.0',
                        type: 'quiz_questions',
                        count: 0,
                        error: 'QuizLoader not available'
                    },
                    questions: [],
                    categories: []
                };
            }

            const quizLoader = new QuizLoader();
            await quizLoader.initialize();
            const manifest = quizLoader.manifest;
            
            const questions = [];
            const categories = [];

            for (const category of manifest.categories) {
                if (categoryId && category.id !== categoryId) {
                    continue;
                }

                categories.push({
                    ...category,
                    exportedAt: new Date().toISOString()
                });

                // 各レベルの問題を取得
                for (const levelName of category.levels) {
                    if (level && levelName !== level) {
                        continue;
                    }

                    try {
                        const levelQuestions = await quizLoader.loadQuestionsByLevel(
                            category.id, 
                            levelName, 
                            { loadAll: true }
                        );

                        levelQuestions.forEach(question => {
                            questions.push({
                                ...question,
                                categoryId: category.id,
                                categoryName: category.name,
                                level: levelName,
                                exportedAt: new Date().toISOString()
                            });
                        });
                        
                    } catch (error) {
                        console.warn(`⚠️ Failed to load questions for ${category.id}/${levelName}:`, error);
                    }
                }
            }

            const exportData = {
                metadata: {
                    exportTime: new Date().toISOString(),
                    version: '2.0.0',
                    type: 'quiz_questions',
                    count: questions.length,
                    categories: categories.length,
                    filters: { categoryId, level }
                },
                questions: questions,
                categories: categories,
                manifest: manifest
            };

            console.log(`✅ Quiz questions exported: ${questions.length} items from ${categories.length} categories`);
            return exportData;
            
        } catch (error) {
            console.error('❌ Failed to export quiz questions:', error);
            return {
                metadata: {
                    exportTime: new Date().toISOString(),
                    version: '2.0.0',
                    type: 'quiz_questions',
                    count: 0,
                    error: error.message
                },
                questions: [],
                categories: []
            };
        }
    }

    /**
     * カテゴリ情報のエクスポート
     * @returns {Promise<Object>} カテゴリデータ
     */
    async exportCategories() {
        console.log('📁 Exporting categories...');
        
        try {
            const categories = [];
            
            // プログラミング問題のカテゴリ
            const programmingStats = await adminStatistics.getProgrammingStats();
            Object.entries(programmingStats.byCategory).forEach(([name, data]) => {
                categories.push({
                    id: name.toLowerCase().replace(/\s+/g, '_'),
                    name: name,
                    type: 'programming',
                    questionCount: data.count,
                    totalPoints: data.points,
                    source: 'programming_problems'
                });
            });

            // クイズ問題のカテゴリ
            try {
                if (typeof QuizLoader !== 'undefined') {
                    const quizLoader = new QuizLoader();
                    await quizLoader.initialize();
                    
                    quizLoader.manifest.categories.forEach(category => {
                        categories.push({
                            id: category.id,
                            name: category.name,
                            type: 'quiz',
                            questionCount: category.questionCount || 0,
                            levels: category.levels || [],
                            enabled: category.enabled,
                            icon: category.icon,
                            color: category.color,
                            description: category.description,
                            source: 'quiz_system'
                        });
                    });
                }
            } catch (error) {
                console.warn('⚠️ Failed to load quiz categories:', error);
            }

            const exportData = {
                metadata: {
                    exportTime: new Date().toISOString(),
                    version: '1.0.0',
                    type: 'categories',
                    count: categories.length
                },
                categories: categories
            };

            console.log(`✅ Categories exported: ${categories.length} items`);
            return exportData;
            
        } catch (error) {
            console.error('❌ Failed to export categories:', error);
            throw new Error(`カテゴリのエクスポートに失敗しました: ${error.message}`);
        }
    }

    /**
     * システム情報の取得
     * @returns {Promise<Object>} システム情報
     */
    async getSystemInfo() {
        return {
            userAgent: navigator.userAgent,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            localStorage: {
                available: this.checkLocalStorageAvailable(),
                usage: adminStatistics.getStorageUsage()
            },
            features: {
                chartJs: typeof Chart !== 'undefined',
                problemLoader: typeof problemLoader !== 'undefined',
                quizLoader: typeof QuizLoader !== 'undefined'
            }
        };
    }

    /**
     * JSONファイルからのインポート
     * @param {File} file ファイルオブジェクト
     * @returns {Promise<Object>} インポート結果
     */
    async importFromJSON(file) {
        console.log('📥 Starting JSON import...');
        
        try {
            // ファイルサイズチェック
            if (file.size > this.maxFileSize) {
                throw new Error(`ファイルサイズが大きすぎます (最大: ${this.maxFileSize / 1024 / 1024}MB)`);
            }

            // ファイル内容の読み込み
            const content = await this.readFileAsText(file);
            let data;

            try {
                data = JSON.parse(content);
            } catch (error) {
                throw new Error('無効なJSONファイルです');
            }

            // データ検証
            const validationResult = this.validateImportData(data);
            if (!validationResult.valid) {
                throw new Error(`データ検証エラー: ${validationResult.errors.join(', ')}`);
            }

            // インポート処理
            const result = await this.processImportData(data);
            
            console.log('✅ JSON import completed:', result);
            return result;
            
        } catch (error) {
            console.error('❌ JSON import failed:', error);
            throw error;
        }
    }

    /**
     * ファイルをテキストとして読み込み
     * @param {File} file ファイルオブジェクト
     * @returns {Promise<string>} ファイル内容
     */
    readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => reject(new Error('ファイルの読み込みに失敗しました'));
            reader.readAsText(file, 'UTF-8');
        });
    }

    /**
     * インポートデータの検証
     * @param {Object} data インポートデータ
     * @returns {Object} 検証結果
     */
    validateImportData(data) {
        const errors = [];
        
        // メタデータの確認
        if (!data.metadata) {
            errors.push('メタデータが見つかりません');
        } else {
            if (!data.metadata.type) {
                errors.push('データタイプが指定されていません');
            }
            if (!data.metadata.version) {
                errors.push('データバージョンが指定されていません');
            }
        }

        // データタイプ別検証
        switch (data.metadata?.type) {
            case 'programming_problems':
                if (!Array.isArray(data.problems)) {
                    errors.push('プログラミング問題データが配列ではありません');
                }
                break;
                
            case 'quiz_questions':
                if (!Array.isArray(data.questions)) {
                    errors.push('クイズ問題データが配列ではありません');
                }
                break;
                
            case 'complete_backup':
                if (!data.programming || !data.quiz || !data.categories) {
                    errors.push('完全バックアップに必要なデータが不足しています');
                }
                break;
                
            default:
                errors.push(`未対応のデータタイプ: ${data.metadata?.type}`);
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * インポートデータの処理
     * @param {Object} data インポートデータ
     * @returns {Promise<Object>} 処理結果
     */
    async processImportData(data) {
        const results = {
            type: data.metadata.type,
            processed: 0,
            errors: 0,
            warnings: [],
            details: {}
        };

        try {
            switch (data.metadata.type) {
                case 'programming_problems':
                    results.details = await this.importProgrammingProblems(data.problems);
                    break;
                    
                case 'quiz_questions':
                    results.details = await this.importQuizQuestions(data.questions);
                    break;
                    
                case 'complete_backup':
                    results.details = await this.importCompleteBackup(data);
                    break;
                    
                default:
                    throw new Error(`未対応のインポートタイプ: ${data.metadata.type}`);
            }

            results.processed = results.details.processed || 0;
            results.errors = results.details.errors || 0;
            
        } catch (error) {
            results.errors++;
            results.warnings.push(error.message);
        }

        return results;
    }

    /**
     * プログラミング問題のインポート処理
     * @param {Array} problems 問題データ
     * @returns {Promise<Object>} 処理結果
     */
    async importProgrammingProblems(problems) {
        console.log('📝 Importing programming problems...');
        
        // 注意: 実際の本格的なインポートは複雑なため、
        // ここではローカルストレージに一時保存する例を示す
        const results = {
            processed: 0,
            errors: 0,
            warnings: []
        };

        try {
            const importKey = `admin_import_programming_${Date.now()}`;
            const importData = {
                problems: problems,
                importedAt: new Date().toISOString(),
                status: 'pending_review'
            };

            localStorage.setItem(importKey, JSON.stringify(importData));
            results.processed = problems.length;
            results.warnings.push('データは一時保存されました。手動でレビューが必要です。');
            
            console.log(`✅ Programming problems imported to storage: ${problems.length} items`);
            
        } catch (error) {
            results.errors++;
            results.warnings.push(`インポートエラー: ${error.message}`);
        }

        return results;
    }

    /**
     * クイズ問題のインポート処理
     * @param {Array} questions 問題データ
     * @returns {Promise<Object>} 処理結果
     */
    async importQuizQuestions(questions) {
        console.log('❓ Importing quiz questions...');
        
        const results = {
            processed: 0,
            errors: 0,
            warnings: []
        };

        try {
            const importKey = `admin_import_quiz_${Date.now()}`;
            const importData = {
                questions: questions,
                importedAt: new Date().toISOString(),
                status: 'pending_review'
            };

            localStorage.setItem(importKey, JSON.stringify(importData));
            results.processed = questions.length;
            results.warnings.push('データは一時保存されました。手動でレビューが必要です。');
            
            console.log(`✅ Quiz questions imported to storage: ${questions.length} items`);
            
        } catch (error) {
            results.errors++;
            results.warnings.push(`インポートエラー: ${error.message}`);
        }

        return results;
    }

    /**
     * 完全バックアップのインポート処理
     * @param {Object} backupData バックアップデータ
     * @returns {Promise<Object>} 処理結果
     */
    async importCompleteBackup(backupData) {
        console.log('💾 Importing complete backup...');
        
        const results = {
            processed: 0,
            errors: 0,
            warnings: [],
            details: {}
        };

        try {
            // 各データタイプを順次処理
            if (backupData.programming?.problems) {
                results.details.programming = await this.importProgrammingProblems(
                    backupData.programming.problems
                );
                results.processed += results.details.programming.processed;
                results.errors += results.details.programming.errors;
            }

            if (backupData.quiz?.questions) {
                results.details.quiz = await this.importQuizQuestions(
                    backupData.quiz.questions
                );
                results.processed += results.details.quiz.processed;
                results.errors += results.details.quiz.errors;
            }

            results.warnings.push('完全バックアップのインポートが完了しました。各データは一時保存されており、手動でのレビューが必要です。');
            
        } catch (error) {
            results.errors++;
            results.warnings.push(`バックアップインポートエラー: ${error.message}`);
        }

        return results;
    }

    /**
     * データ整合性チェック
     * @returns {Promise<Object>} チェック結果
     */
    async validateDataIntegrity() {
        console.log('🔍 Checking data integrity...');
        
        const results = {
            valid: true,
            issues: [],
            warnings: [],
            stats: {}
        };

        try {
            // プログラミング問題の整合性チェック
            const programmingCheck = await this.checkProgrammingDataIntegrity();
            results.stats.programming = programmingCheck;
            if (!programmingCheck.valid) {
                results.valid = false;
                results.issues.push(...programmingCheck.issues);
            }
            results.warnings.push(...programmingCheck.warnings);

            // クイズ問題の整合性チェック
            const quizCheck = await this.checkQuizDataIntegrity();
            results.stats.quiz = quizCheck;
            if (!quizCheck.valid) {
                results.valid = false;
                results.issues.push(...quizCheck.issues);
            }
            results.warnings.push(...quizCheck.warnings);

            console.log('✅ Data integrity check completed:', results);
            
        } catch (error) {
            results.valid = false;
            results.issues.push(`整合性チェックエラー: ${error.message}`);
        }

        return results;
    }

    /**
     * プログラミング問題データの整合性チェック
     * @returns {Promise<Object>} チェック結果
     */
    async checkProgrammingDataIntegrity() {
        const result = {
            valid: true,
            issues: [],
            warnings: [],
            stats: { total: 0, checked: 0, errors: 0 }
        };

        try {
            const problemIndex = await problemLoader.loadProblemIndex();
            result.stats.total = problemIndex.length;

            for (const problemMeta of problemIndex) {
                result.stats.checked++;
                
                try {
                    const problemDetail = await problemLoader.loadProblem(problemMeta.id);
                    
                    // 必須フィールドチェック
                    if (!problemDetail.description) {
                        result.warnings.push(`${problemMeta.id}: 問題説明が不足しています`);
                    }
                    
                    if (!problemDetail.testCases || problemDetail.testCases.length === 0) {
                        result.issues.push(`${problemMeta.id}: テストケースが存在しません`);
                        result.valid = false;
                    }
                    
                } catch (error) {
                    result.issues.push(`${problemMeta.id}: 詳細データの読み込みに失敗 - ${error.message}`);
                    result.stats.errors++;
                    result.valid = false;
                }
            }
            
        } catch (error) {
            result.issues.push(`プログラミング問題インデックスの読み込みに失敗: ${error.message}`);
            result.valid = false;
        }

        return result;
    }

    /**
     * クイズ問題データの整合性チェック
     * @returns {Promise<Object>} チェック結果
     */
    async checkQuizDataIntegrity() {
        const result = {
            valid: true,
            issues: [],
            warnings: [],
            stats: { total: 0, checked: 0, errors: 0 }
        };

        try {
            if (typeof QuizLoader === 'undefined') {
                result.warnings.push('QuizLoaderが利用できません');
                return result;
            }

            const quizLoader = new QuizLoader();
            await quizLoader.initialize();
            
            for (const category of quizLoader.manifest.categories) {
                for (const level of category.levels) {
                    try {
                        const questions = await quizLoader.loadQuestionsByLevel(
                            category.id, 
                            level, 
                            { loadAll: true }
                        );
                        
                        result.stats.total += questions.length;
                        
                        questions.forEach(question => {
                            result.stats.checked++;
                            
                            // 必須フィールドチェック
                            if (!question.question) {
                                result.issues.push(`${category.id}/${level}: 問題文が空です`);
                                result.valid = false;
                            }
                            
                            if (!question.options || question.options.length !== 4) {
                                result.issues.push(`${category.id}/${level}: 選択肢が4つではありません`);
                                result.valid = false;
                            }
                            
                            if (typeof question.correct !== 'number' || question.correct < 0 || question.correct > 3) {
                                result.issues.push(`${category.id}/${level}: 正解インデックスが無効です`);
                                result.valid = false;
                            }
                        });
                        
                    } catch (error) {
                        result.issues.push(`${category.id}/${level}: 問題の読み込みに失敗 - ${error.message}`);
                        result.stats.errors++;
                        result.valid = false;
                    }
                }
            }
            
        } catch (error) {
            result.issues.push(`クイズシステムの初期化に失敗: ${error.message}`);
            result.valid = false;
        }

        return result;
    }

    /**
     * LocalStorageの利用可能性チェック
     * @returns {boolean} 利用可能性
     */
    checkLocalStorageAvailable() {
        try {
            const testKey = 'admin_test_storage';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * エクスポートファイルのダウンロード
     * @param {Object} data エクスポートデータ
     * @param {string} filename ファイル名
     */
    downloadAsJSON(data, filename) {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        console.log(`📁 File downloaded: ${filename}`);
    }

    /**
     * バックアップファイル名の生成
     * @param {string} type バックアップタイプ
     * @returns {string} ファイル名
     */
    generateBackupFilename(type = 'complete') {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        return `learning_system_${type}_backup_${timestamp}.json`;
    }
}

// グローバルインスタンス作成
const adminImportExport = new AdminImportExport();