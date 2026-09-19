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
      // 頻出順: sameAsの多い順
      this.currentQuestions.sort((a, b) => (b.sameAs?.length || 0) - (a.sameAs?.length || 0));
    }

    this.currentIndex = 0;
    this.answers = new Array(this.currentQuestions.length).fill(null);
    this.startTime = Date.now();
    this.isAnswered = false;

    this.showQuestion();
    return true;
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
      this.showExplanation();
    }
  }

  showExplanation() {
    const q = this.currentQuestions[this.currentIndex];
    const ans = this.answers[this.currentIndex];

    let historyText = '';
    if (q.sameAs && q.sameAs.length > 0) {
      const years = q.sameAs.map(id => {
        const parts = id.split('-');
        const y = parts[0];
        const yearLabel = y.startsWith('H') ? `平成${y.slice(1)}年` : `令和${y.slice(1)}年`;
        return `${yearLabel} ${parts[1]}`;
      }).join('、');
      historyText = `📚 この問題は ${years} にも出題されています。`;
    }

    document.dispatchEvent(new CustomEvent('render-explanation', {
      detail: { question: q, answer: ans, historyText }
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

    // 年度フィルタ
    if (filters.years && filters.years.length > 0) {
      filtered = filtered.filter(q => filters.years.includes(q.year));
    }

    // カテゴリフィルタ (questions.jsのフィールド名は category)
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(q => filters.categories.includes(q.category));
    }

    // サブカテゴリフィルタ (questions.jsのフィールド名は subcategory)
    if (filters.subcategories && filters.subcategories.length > 0) {
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
