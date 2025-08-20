/**
 * AdminQuestionManager - 問題管理機能
 * プログラミング問題とクイズ問題のCRUD操作、検索、フィルタリング機能を提供
 */

class AdminQuestionManager {
    constructor() {
        this.currentFilters = {
            programming: { category: '', difficulty: '', search: '' },
            quiz: { category: '', level: '', search: '' }
        };
        
        this.sortOptions = {
            programming: { field: 'id', direction: 'asc' },
            quiz: { field: 'id', direction: 'asc' }
        };

        this.pageSize = 50;
        this.currentPage = { programming: 1, quiz: 1 };
        
        console.log('📚 AdminQuestionManager initialized');
    }

    /**
     * プログラミング問題の一覧取得（フィルタリング・検索対応）
     * @param {Object} filters フィルタオプション
     * @param {Object} sort ソートオプション
     * @param {number} page ページ番号
     * @returns {Promise<Object>} 問題一覧と統計
     */
    async getProgrammingProblems(filters = null, sort = null, page = 1) {
        console.log('📝 Loading programming problems with filters:', filters);
        
        try {
            const problemIndex = await problemLoader.loadProblemIndex();
            let filteredProblems = [...problemIndex];

            // フィルタリング適用
            if (filters) {
                filteredProblems = this.applyProgrammingFilters(filteredProblems, filters);
            }

            // ソート適用
            if (sort) {
                filteredProblems = this.sortProgrammingProblems(filteredProblems, sort);
            }

            // ページネーション
            const totalCount = filteredProblems.length;
            const startIndex = (page - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            const pagedProblems = filteredProblems.slice(startIndex, endIndex);

            // 詳細情報の取得（必要に応じて）
            const problemsWithDetails = await Promise.all(
                pagedProblems.map(async (problem) => {
                    try {
                        const detail = await problemLoader.loadProblem(problem.id);
                        return {
                            ...problem,
                            hasTestCases: !!(detail.testCases && detail.testCases.length > 0),
                            testCaseCount: detail.testCases ? detail.testCases.length : 0,
                            templateLength: detail.template ? detail.template.length : 0,
                            descriptionLength: detail.description ? detail.description.length : 0
                        };
                    } catch (error) {
                        console.warn(`⚠️ Failed to load details for ${problem.id}:`, error);
                        return {
                            ...problem,
                            hasTestCases: false,
                            testCaseCount: 0,
                            templateLength: 0,
                            descriptionLength: 0,
                            error: error.message
                        };
                    }
                })
            );

            const result = {
                problems: problemsWithDetails,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(totalCount / this.pageSize),
                    totalCount: totalCount,
                    pageSize: this.pageSize,
                    hasNext: endIndex < totalCount,
                    hasPrev: page > 1
                },
                filters: filters,
                sort: sort
            };

            console.log(`✅ Programming problems loaded: ${problemsWithDetails.length}/${totalCount}`);
            return result;
            
        } catch (error) {
            console.error('❌ Failed to load programming problems:', error);
            throw new Error(`プログラミング問題の読み込みに失敗しました: ${error.message}`);
        }
    }

    /**
     * クイズ問題の一覧取得（フィルタリング・検索対応）
     * @param {Object} filters フィルタオプション
     * @param {Object} sort ソートオプション
     * @param {number} page ページ番号
     * @returns {Promise<Object>} 問題一覧と統計
     */
    async getQuizQuestions(filters = null, sort = null, page = 1) {
        console.log('❓ Loading quiz questions with filters:', filters);
        
        try {
            // QuizLoaderが利用可能か確認
            if (typeof QuizLoader === 'undefined') {
                return {
                    questions: [],
                    pagination: { currentPage: 1, totalPages: 0, totalCount: 0, pageSize: this.pageSize },
                    error: 'QuizLoader not available'
                };
            }

            const quizLoader = new QuizLoader();
            await quizLoader.initialize();
            
            let allQuestions = [];

            // 全カテゴリ・全レベルの問題を取得
            for (const category of quizLoader.manifest.categories) {
                if (filters?.category && category.id !== filters.category) {
                    continue;
                }

                for (const level of category.levels) {
                    if (filters?.level && level !== filters.level) {
                        continue;
                    }

                    try {
                        const levelQuestions = await quizLoader.loadQuestionsByLevel(
                            category.id, 
                            level, 
                            { loadAll: true }
                        );

                        levelQuestions.forEach((question, index) => {
                            allQuestions.push({
                                ...question,
                                id: `${category.id}_${level}_q${String(index + 1).padStart(3, '0')}`,
                                categoryId: category.id,
                                categoryName: category.name,
                                level: level,
                                questionLength: question.question ? question.question.length : 0,
                                hasExplanation: !!(question.explanation && question.explanation.trim()),
                                optionCount: question.options ? question.options.length : 0
                            });
                        });
                        
                    } catch (error) {
                        console.warn(`⚠️ Failed to load questions for ${category.id}/${level}:`, error);
                    }
                }
            }

            // 検索フィルタ適用
            if (filters?.search) {
                allQuestions = this.applyQuizSearchFilter(allQuestions, filters.search);
            }

            // ソート適用
            if (sort) {
                allQuestions = this.sortQuizQuestions(allQuestions, sort);
            }

            // ページネーション
            const totalCount = allQuestions.length;
            const startIndex = (page - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            const pagedQuestions = allQuestions.slice(startIndex, endIndex);

            const result = {
                questions: pagedQuestions,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(totalCount / this.pageSize),
                    totalCount: totalCount,
                    pageSize: this.pageSize,
                    hasNext: endIndex < totalCount,
                    hasPrev: page > 1
                },
                filters: filters,
                sort: sort
            };

            console.log(`✅ Quiz questions loaded: ${pagedQuestions.length}/${totalCount}`);
            return result;
            
        } catch (error) {
            console.error('❌ Failed to load quiz questions:', error);
            return {
                questions: [],
                pagination: { currentPage: 1, totalPages: 0, totalCount: 0, pageSize: this.pageSize },
                error: error.message
            };
        }
    }

    /**
     * プログラミング問題のフィルタリング
     * @param {Array} problems 問題配列
     * @param {Object} filters フィルタ条件
     * @returns {Array} フィルタリング後の問題配列
     */
    applyProgrammingFilters(problems, filters) {
        return problems.filter(problem => {
            // カテゴリフィルタ
            if (filters.category && problem.category !== filters.category) {
                return false;
            }

            // 難易度フィルタ
            if (filters.difficulty && problem.difficulty !== filters.difficulty) {
                return false;
            }

            // 検索フィルタ（ID、タイトル）
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                const matchesId = problem.id.toLowerCase().includes(searchTerm);
                const matchesTitle = problem.title && problem.title.toLowerCase().includes(searchTerm);
                
                if (!matchesId && !matchesTitle) {
                    return false;
                }
            }

            return true;
        });
    }

    /**
     * クイズ問題の検索フィルタリング
     * @param {Array} questions 問題配列
     * @param {string} searchTerm 検索語
     * @returns {Array} フィルタリング後の問題配列
     */
    applyQuizSearchFilter(questions, searchTerm) {
        const term = searchTerm.toLowerCase();
        
        return questions.filter(question => {
            // 問題文で検索
            if (question.question && question.question.toLowerCase().includes(term)) {
                return true;
            }

            // タグで検索
            if (question.tags && question.tags.some(tag => tag.toLowerCase().includes(term))) {
                return true;
            }

            // 解説で検索
            if (question.explanation && question.explanation.toLowerCase().includes(term)) {
                return true;
            }

            return false;
        });
    }

    /**
     * プログラミング問題のソート
     * @param {Array} problems 問題配列
     * @param {Object} sort ソートオプション
     * @returns {Array} ソート後の問題配列
     */
    sortProgrammingProblems(problems, sort) {
        return problems.sort((a, b) => {
            let valueA = a[sort.field];
            let valueB = b[sort.field];

            // 数値フィールドの処理
            if (sort.field === 'points') {
                valueA = parseInt(valueA) || 0;
                valueB = parseInt(valueB) || 0;
            }

            // 文字列フィールドの処理
            if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            let comparison = 0;
            if (valueA > valueB) {
                comparison = 1;
            } else if (valueA < valueB) {
                comparison = -1;
            }

            return sort.direction === 'desc' ? -comparison : comparison;
        });
    }

    /**
     * クイズ問題のソート
     * @param {Array} questions 問題配列
     * @param {Object} sort ソートオプション
     * @returns {Array} ソート後の問題配列
     */
    sortQuizQuestions(questions, sort) {
        return questions.sort((a, b) => {
            let valueA = a[sort.field];
            let valueB = b[sort.field];

            // 特殊フィールドの処理
            switch (sort.field) {
                case 'categoryName':
                    valueA = a.categoryName || '';
                    valueB = b.categoryName || '';
                    break;
                case 'level':
                    // レベルの優先順位
                    const levelOrder = { 'basic': 1, 'intermediate': 2, 'advanced': 3 };
                    valueA = levelOrder[a.level] || 999;
                    valueB = levelOrder[b.level] || 999;
                    break;
                case 'questionLength':
                    valueA = a.questionLength || 0;
                    valueB = b.questionLength || 0;
                    break;
            }

            // 文字列フィールドの処理
            if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            let comparison = 0;
            if (valueA > valueB) {
                comparison = 1;
            } else if (valueA < valueB) {
                comparison = -1;
            }

            return sort.direction === 'desc' ? -comparison : comparison;
        });
    }

    /**
     * 特定のプログラミング問題の詳細取得
     * @param {string} problemId 問題ID
     * @returns {Promise<Object>} 問題詳細
     */
    async getProgrammingProblemDetail(problemId) {
        console.log(`📖 Loading programming problem detail: ${problemId}`);
        
        try {
            const problemDetail = await problemLoader.loadProblem(problemId);
            
            // 統計情報の追加
            const enrichedDetail = {
                ...problemDetail,
                statistics: {
                    testCaseCount: problemDetail.testCases ? problemDetail.testCases.length : 0,
                    templateLength: problemDetail.template ? problemDetail.template.length : 0,
                    descriptionLength: problemDetail.description ? problemDetail.description.length : 0,
                    hasInitialCode: !!(problemDetail.template && problemDetail.template.trim()),
                    complexity: this.assessProblemComplexity(problemDetail)
                },
                validation: this.validateProgrammingProblem(problemDetail)
            };

            console.log(`✅ Programming problem detail loaded: ${problemId}`);
            return enrichedDetail;
            
        } catch (error) {
            console.error(`❌ Failed to load programming problem ${problemId}:`, error);
            throw new Error(`問題の詳細読み込みに失敗しました: ${error.message}`);
        }
    }

    /**
     * プログラミング問題の複雑度評価
     * @param {Object} problemDetail 問題詳細
     * @returns {Object} 複雑度評価
     */
    assessProblemComplexity(problemDetail) {
        let score = 0;
        const factors = [];

        // テストケース数による評価
        const testCaseCount = problemDetail.testCases ? problemDetail.testCases.length : 0;
        if (testCaseCount >= 5) {
            score += 2;
            factors.push('多数のテストケース');
        } else if (testCaseCount >= 3) {
            score += 1;
            factors.push('標準的なテストケース');
        }

        // 問題説明の長さによる評価
        const descriptionLength = problemDetail.description ? problemDetail.description.length : 0;
        if (descriptionLength > 1000) {
            score += 2;
            factors.push('詳細な説明');
        } else if (descriptionLength > 300) {
            score += 1;
            factors.push('適度な説明');
        }

        // テンプレートコードの複雑さ
        const templateLength = problemDetail.template ? problemDetail.template.length : 0;
        if (templateLength > 500) {
            score += 2;
            factors.push('複雑な初期コード');
        } else if (templateLength > 100) {
            score += 1;
            factors.push('基本的な初期コード');
        }

        let level = '初級';
        if (score >= 5) {
            level = '上級';
        } else if (score >= 3) {
            level = '中級';
        }

        return {
            score,
            level,
            factors
        };
    }

    /**
     * プログラミング問題のバリデーション
     * @param {Object} problemDetail 問題詳細
     * @returns {Object} バリデーション結果
     */
    validateProgrammingProblem(problemDetail) {
        const issues = [];
        const warnings = [];

        // 必須フィールドチェック
        if (!problemDetail.title) {
            issues.push('タイトルが設定されていません');
        }

        if (!problemDetail.description) {
            issues.push('問題説明が設定されていません');
        }

        if (!problemDetail.template) {
            warnings.push('初期コードテンプレートが設定されていません');
        }

        if (!problemDetail.testCases || problemDetail.testCases.length === 0) {
            issues.push('テストケースが設定されていません');
        }

        // テストケースの詳細チェック
        if (problemDetail.testCases) {
            problemDetail.testCases.forEach((testCase, index) => {
                if (!testCase.hasOwnProperty('expected')) {
                    issues.push(`テストケース${index + 1}: 期待値が設定されていません`);
                }

                if (!testCase.description) {
                    warnings.push(`テストケース${index + 1}: 説明が設定されていません`);
                }
            });
        }

        return {
            valid: issues.length === 0,
            issues,
            warnings
        };
    }

    /**
     * カテゴリ一覧の取得
     * @returns {Promise<Object>} カテゴリ情報
     */
    async getCategories() {
        console.log('📁 Loading categories...');
        
        try {
            const [programmingCategories, quizCategories] = await Promise.all([
                this.getProgrammingCategories(),
                this.getQuizCategories()
            ]);

            const categories = {
                programming: programmingCategories,
                quiz: quizCategories,
                combined: this.combineCategories(programmingCategories, quizCategories)
            };

            console.log('✅ Categories loaded:', {
                programming: programmingCategories.length,
                quiz: quizCategories.length,
                combined: categories.combined.length
            });

            return categories;
            
        } catch (error) {
            console.error('❌ Failed to load categories:', error);
            throw new Error(`カテゴリの読み込みに失敗しました: ${error.message}`);
        }
    }

    /**
     * プログラミング問題のカテゴリ取得
     * @returns {Promise<Array>} カテゴリ一覧
     */
    async getProgrammingCategories() {
        const programmingStats = await adminStatistics.getProgrammingStats();
        
        return Object.entries(programmingStats.byCategory).map(([name, data]) => ({
            id: name.toLowerCase().replace(/\s+/g, '_'),
            name: name,
            type: 'programming',
            questionCount: data.count,
            totalPoints: data.points,
            averagePoints: data.count > 0 ? Math.round(data.points / data.count) : 0
        }));
    }

    /**
     * クイズ問題のカテゴリ取得
     * @returns {Promise<Array>} カテゴリ一覧
     */
    async getQuizCategories() {
        try {
            if (typeof QuizLoader === 'undefined') {
                return [];
            }

            const quizLoader = new QuizLoader();
            await quizLoader.initialize();
            
            return quizLoader.manifest.categories.map(category => ({
                id: category.id,
                name: category.name,
                type: 'quiz',
                questionCount: category.questionCount || 0,
                levels: category.levels || [],
                enabled: category.enabled,
                icon: category.icon,
                color: category.color,
                description: category.description
            }));
            
        } catch (error) {
            console.warn('⚠️ Failed to load quiz categories:', error);
            return [];
        }
    }

    /**
     * カテゴリの統合
     * @param {Array} programmingCategories プログラミングカテゴリ
     * @param {Array} quizCategories クイズカテゴリ
     * @returns {Array} 統合カテゴリ
     */
    combineCategories(programmingCategories, quizCategories) {
        const combined = new Map();

        // プログラミングカテゴリを追加
        programmingCategories.forEach(category => {
            combined.set(category.id, {
                ...category,
                programmingCount: category.questionCount,
                quizCount: 0,
                types: ['programming']
            });
        });

        // クイズカテゴリを追加または統合
        quizCategories.forEach(category => {
            if (combined.has(category.id)) {
                const existing = combined.get(category.id);
                combined.set(category.id, {
                    ...existing,
                    quizCount: category.questionCount,
                    types: [...existing.types, 'quiz'],
                    levels: category.levels,
                    enabled: category.enabled,
                    icon: category.icon,
                    color: category.color
                });
            } else {
                combined.set(category.id, {
                    ...category,
                    programmingCount: 0,
                    quizCount: category.questionCount,
                    types: ['quiz']
                });
            }
        });

        return Array.from(combined.values()).map(category => ({
            ...category,
            totalQuestions: category.programmingCount + category.quizCount
        }));
    }

    /**
     * 問題の検索（統合検索）
     * @param {string} query 検索クエリ
     * @param {Object} options 検索オプション
     * @returns {Promise<Object>} 検索結果
     */
    async searchQuestions(query, options = {}) {
        console.log('🔍 Searching questions:', query);
        
        try {
            const results = {
                query: query,
                programming: [],
                quiz: [],
                totalFound: 0
            };

            // プログラミング問題の検索
            if (!options.type || options.type === 'programming') {
                const programmingResult = await this.getProgrammingProblems(
                    { search: query },
                    null,
                    1
                );
                results.programming = programmingResult.problems.slice(0, 10); // 上位10件
            }

            // クイズ問題の検索
            if (!options.type || options.type === 'quiz') {
                const quizResult = await this.getQuizQuestions(
                    { search: query },
                    null,
                    1
                );
                results.quiz = quizResult.questions.slice(0, 10); // 上位10件
            }

            results.totalFound = results.programming.length + results.quiz.length;

            console.log(`✅ Search completed: ${results.totalFound} results found`);
            return results;
            
        } catch (error) {
            console.error('❌ Search failed:', error);
            throw new Error(`検索に失敗しました: ${error.message}`);
        }
    }

    /**
     * フィルタオプションの取得
     * @returns {Promise<Object>} フィルタオプション
     */
    async getFilterOptions() {
        try {
            const categories = await this.getCategories();
            
            return {
                programming: {
                    categories: categories.programming.map(cat => ({
                        value: cat.name,
                        label: `${cat.name} (${cat.questionCount}問)`
                    })),
                    difficulties: [
                        { value: '初級', label: '初級' },
                        { value: '中級', label: '中級' },
                        { value: '上級', label: '上級' }
                    ]
                },
                quiz: {
                    categories: categories.quiz.map(cat => ({
                        value: cat.id,
                        label: `${cat.name} (${cat.questionCount}問)`
                    })),
                    levels: [
                        { value: 'basic', label: '基礎' },
                        { value: 'intermediate', label: '中級' },
                        { value: 'advanced', label: '上級' }
                    ]
                }
            };
            
        } catch (error) {
            console.error('❌ Failed to get filter options:', error);
            return {
                programming: { categories: [], difficulties: [] },
                quiz: { categories: [], levels: [] }
            };
        }
    }
}

// グローバルインスタンス作成
const adminQuestionManager = new AdminQuestionManager();