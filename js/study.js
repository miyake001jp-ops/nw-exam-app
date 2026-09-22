/**
 * ネットワークスペシャリスト試験 午前II対策アプリ
 * 学習モード管理
 */
class StudyManager {
  constructor(db) {
    this.db = db;
    this.currentQuestions = [];
    this.currentIndex = 0;
    this.mode = 'study';
    this.timer = null;
    this.timeRemaining = 0;
    this.answers = [];
    this.startTime = 0;
    this.isAnswered = false;
  }

  async startSession(options) {
    this.mode = options.mode || 'study';
    this.currentQuestions = await this.getFilteredQuestions(options);

    if (this.currentQuestions.length === 0) {
      return false;
    }

    // ★ 常に同一問題(masterId)の重複を排除する
    // 同じ問題を繰り返し表示しても学習効率が悪いため、
    // どのモード・どの並び順でも最新年度の1問だけを残す
    this.currentQuestions = this.deduplicateQuestions(this.currentQuestions);

    if (this.currentQuestions.length === 0) {
      return false;
    }

    if (this.mode === 'test') {
      const count = options.questionCount || 25;
      this.currentQuestions = this._shuffle([...this.currentQuestions]).slice(0, count);
      this.timeRemaining = 40 * 60; // 40分
      this.startTimer();
    } else if (this.mode === 'weakness') {
      this.currentQuestions = await this.prioritizeQuestions(this.currentQuestions);
    } else if (options.sort === 'random') {
      this.currentQuestions = this._shuffle([...this.currentQuestions]);
    } else if (options.sort === 'freq') {
      // 頻出順: 出題回数(appearances count)の多い順
      this.currentQuestions.sort((a, b) => (b.sameAs?.length || 0) - (a.sameAs?.length || 0));
    }

    this.currentIndex = 0;
    this.answers = new Array(this.currentQuestions.length).fill(null);
    this.startTime = Date.now();
    this.isAnswered = false;

    this.showQuestion();
    return true;
  }

  /**
   * 同一問題グループ(masterId)から代表の1問（最新年度）のみを残し、完全重複を排除する。
   * 
   * アルゴリズム:
   *  1. 全問題を yearNum 降順でソート（最新年度優先）
   *  2. masterId をキーにした Set で既出チェック
   *  3. masterId が未出のものだけを結果に含める
   */
  deduplicateQuestions(questions) {
    // 最新年度の出題を優先して残す
    const sorted = [...questions].sort((a, b) => (b.yearNum || 0) - (a.yearNum || 0));
    const seenMasterIds = new Set();
    const result = [];

    for (const q of sorted) {
      // masterId がある場合はそれをキー、なければ id をキーに使う
      const key = q.masterId || q.id;

      if (seenMasterIds.has(key)) {
        // この masterId は既に別の年度で追加済み → スキップ
        continue;
      }

      seenMasterIds.add(key);
      result.push(q);
    }

    return result;
  }

  showQuestion() {
    if (this.currentIndex >= this.currentQuestions.length) {
      if (this.mode === 'test') {
        this.showTestResults();
      } else {
        this.endSession();
      }
      return;
    }

    const q = this.currentQuestions[this.currentIndex];
    this.isAnswered = this.answers[this.currentIndex] !== null;

    document.dispatchEvent(new CustomEvent('render-question', {
      detail: {
        question: q,
        index: this.currentIndex,
        total: this.currentQuestions.length,
        mode: this.mode,
        previousAnswer: this.answers[this.currentIndex]
      }
    }));
  }

  async handleAnswer(choice) {
    // テストモードでは何度でも変更可、学習モードでは1回のみ
    if (this.mode !== 'test' && this.isAnswered) return;

    const q = this.currentQuestions[this.currentIndex];
    const isCorrect = (choice === q.answer);

    this.answers[this.currentIndex] = { choice, isCorrect };
    this.isAnswered = true;

    // DB記録
    await this.recordAnswer(q.id, isCorrect, choice);

    // 学習日記録
    await this.db.recordStudyDay();

    // ステータス更新イベントを即時発火
    document.dispatchEvent(new CustomEvent('answer-recorded', {
      detail: { questionId: q.id, isCorrect, choice, index: this.currentIndex, total: this.currentQuestions.length }
    }));

    if (this.mode === 'test') {
      // テストモードでは即座に次へ
      setTimeout(() => this.nextQuestion(), 300);
    } else {
      // 学習モードでは解説を表示
      await this.showExplanation();
    }
  }

  async showExplanation() {
    const q = this.currentQuestions[this.currentIndex];
    const ans = this.answers[this.currentIndex];

    let historyText = '';
    const totalCount = 1 + (q.sameAs ? q.sameAs.length : 0);
    if (q.sameAs && q.sameAs.length > 0) {
      const years = q.sameAs.map(id => {
        const parts = id.split('-');
        const y = parts[0];
        const yearLabel = y.startsWith('H') ? `平成${y.slice(1)}年` : `令和${y.slice(1)}年`;
        return `${yearLabel} ${parts[1]}`;
      }).join('、');
      historyText = `📚 この問題は過去【計${totalCount}回】出題されている超頻出問題です！（出題履歴: ${years}）`;
    }

    const mastery = await this.db.getQuestionMasteryStatus(q.id);

    document.dispatchEvent(new CustomEvent('render-explanation', {
      detail: {
        question: q,
        answer: ans,
        historyText,
        totalAppearances: totalCount,
        mastery
      }
    }));
  }

  nextQuestion() {
    if (this.currentIndex < this.currentQuestions.length - 1) {
      this.currentIndex++;
      this.isAnswered = this.answers[this.currentIndex] !== null;
      this.showQuestion();
    } else if (this.mode === 'test') {
      this.showTestResults();
    } else {
      this.endSession();
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.isAnswered = this.answers[this.currentIndex] !== null;
      this.showQuestion();
      // 既に回答済みなら解説も表示
      if (this.isAnswered && this.mode !== 'test') {
        this.showExplanation();
      }
    }
  }

  startTimer() {
    this.stopTimer();
    this.timer = setInterval(() => {
      this.timeRemaining--;
      document.dispatchEvent(new CustomEvent('timer-tick', {
        detail: { remaining: this.timeRemaining }
      }));
      if (this.timeRemaining <= 0) {
        this.stopTimer();
        this.showTestResults();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  async showTestResults() {
    this.stopTimer();

    let correctCount = 0;
    this.answers.forEach(a => {
      if (a && a.isCorrect) correctCount++;
    });

    const score = (correctCount / this.currentQuestions.length) * 100;

    await this.db.saveSession({
      sessionId: `test-${Date.now()}`,
      mode: 'test',
      score: correctCount,
      total: this.currentQuestions.length,
      timeSpent: (40 * 60) - this.timeRemaining,
      timestamp: Date.now()
    });

    document.dispatchEvent(new CustomEvent('render-test-results', {
      detail: {
        score,
        correctCount,
        total: this.currentQuestions.length,
        answers: this.answers,
        questions: this.currentQuestions,
        timeRemaining: this.timeRemaining
      }
    }));
  }

  async endSession() {
    let correctCount = 0;
    this.answers.forEach(a => {
      if (a && a.isCorrect) correctCount++;
    });

    await this.db.saveSession({
      sessionId: `${this.mode}-${Date.now()}`,
      mode: this.mode,
      score: correctCount,
      total: this.currentQuestions.length,
      timeSpent: Math.floor((Date.now() - this.startTime) / 1000),
      timestamp: Date.now()
    });

    document.dispatchEvent(new CustomEvent('session-ended'));
  }

  async getFilteredQuestions(filters) {
    if (typeof QUESTIONS_DB === 'undefined') return [];

    let filtered = [...QUESTIONS_DB];

    // 年度フィルタ（"all"や空配列の場合はフィルタしない）
    if (filters.years && filters.years.length > 0 && !filters.years.includes('all')) {
      filtered = filtered.filter(q => filters.years.includes(q.year));
    }

    // カテゴリフィルタ
    if (filters.categories && filters.categories.length > 0 && !filters.categories.includes('all')) {
      filtered = filtered.filter(q => filters.categories.includes(q.category));
    }

    // サブカテゴリフィルタ
    if (filters.subcategories && filters.subcategories.length > 0 && !filters.subcategories.includes('all')) {
      filtered = filtered.filter(q => filters.subcategories.includes(q.subcategory));
    }

    // 弱点モード: 間違えた問題のみ
    if (filters.mode === 'weakness') {
      const wrongAnswers = await this.db.getWrongAnswers();
      const wrongIds = new Set(wrongAnswers.map(a => a.questionId));
      filtered = filtered.filter(q => wrongIds.has(q.id));
    }

    // 予想問題モード
    if (filters.mode === 'prediction') {
      filtered = filtered.filter(q => q.isPrediction === true);
    }

    // ★ 5回連続正解（習得済み）問題のスキップ処理
    // テストモード以外で、スキップ機能が有効な場合に適用
    if (filters.mode !== 'test') {
      const skipSettings = await this.db.getSkipSettings();
      const shouldFilterSkipped = (filters.skipMastered !== undefined)
        ? !!filters.skipMastered
        : skipSettings.autoSkipEnabled;

      if (shouldFilterSkipped) {
        const masteryStats = await this.db.getAllMasteryStats();
        filtered = filtered.filter(q => {
          const mId = q.masterId || q.id;
          const isSkipped = this.db.isQuestionSkipped(
            mId,
            true, // 個別判定時に5連続正解判定を適用
            skipSettings.manualOverrides,
            masteryStats
          );
          return !isSkipped;
        });
      }
    }

    return filtered;
  }

  async prioritizeQuestions(questions) {
    const history = await this.db.getAllAnswers();
    const stats = {};

    history.forEach(a => {
      if (!stats[a.questionId]) {
        stats[a.questionId] = { correct: 0, total: 0, lastAnswered: 0 };
      }
      stats[a.questionId].total++;
      if (a.isCorrect) stats[a.questionId].correct++;
      if (a.timestamp > stats[a.questionId].lastAnswered) {
        stats[a.questionId].lastAnswered = a.timestamp;
      }
    });

    return questions.sort((a, b) => {
      const statA = stats[a.id] || { correct: 0, total: 0 };
      const statB = stats[b.id] || { correct: 0, total: 0 };

      const errorRateA = statA.total > 0 ? (statA.total - statA.correct) / statA.total : 1;
      const errorRateB = statB.total > 0 ? (statB.total - statB.correct) / statB.total : 1;

      return errorRateB - errorRateA;
    });
  }

  async recordAnswer(questionId, isCorrect, choice) {
    await this.db.saveAnswer({
      questionId,
      isCorrect,
      choice,
      timestamp: Date.now()
    });
  }

  _shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
