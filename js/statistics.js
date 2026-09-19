/**
 * ネットワークスペシャリスト試験 午前II対策アプリ
 * 統計分析管理
 */
class StatisticsManager {
  constructor(db) {
    this.db = db;
  }

  // ===== 過去問分析 =====

  /**
   * 年度別再出題率を算出
   * questions.jsのフィールド名は year, sameAs
   */
  getReuseRateByYear() {
    if (typeof QUESTIONS_DB === 'undefined') return [];

    const yearsMap = {};

    QUESTIONS_DB.filter(q => !q.isPrediction).forEach(q => {
      if (!yearsMap[q.year]) {
        yearsMap[q.year] = { year: q.year, total: 0, reused: 0 };
      }
      yearsMap[q.year].total++;

      // sameAsに自分より古い年度のIDがあれば再出題
      if (q.sameAs && q.sameAs.length > 0) {
        const currentYearNum = q.yearNum;
        const hasOlder = q.sameAs.some(id => {
          const otherQ = QUESTIONS_DB.find(oq => oq.id === id);
          return otherQ && otherQ.yearNum < currentYearNum;
        });
        if (hasOlder) {
          yearsMap[q.year].reused++;
        }
      }
    });

    return Object.values(yearsMap).map(y => {
      y.yearLabel = this._formatYear(y.year);
      y.yearNum = y.year.startsWith('H') ? 1988 + parseInt(y.year.slice(1)) : 2018 + parseInt(y.year.slice(1));
      y.rate = y.total > 0 ? y.reused / y.total : 0;
      return y;
    }).sort((a, b) => a.yearNum - b.yearNum);
  }

  /**
   * 最も多く再出題された問題ランキング
   */
  getMostReusedQuestions(limit = 15) {
    if (typeof REUSE_MAP === 'undefined' || typeof QUESTIONS_DB === 'undefined') return [];

    // グループ化（同一問題を1グループに）
    const groups = {};
    Object.entries(REUSE_MAP).forEach(([id, related]) => {
      if (related.length === 0) return;
      const allIds = [id, ...related].sort();
      const key = allIds[0];
      if (!groups[key]) groups[key] = new Set(allIds);
      else allIds.forEach(i => groups[key].add(i));
    });

    return Object.entries(groups)
      .map(([key, ids]) => {
        const q = QUESTIONS_DB.find(q => q.id === key);
        return {
          id: key,
          question: q ? q.question : 'Unknown',
          count: ids.size,
          years: [...ids].map(id => id.split('-')[0])
        };
      })
      .filter(r => r.count > 1)
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  /**
   * 分野別出題数
   */
  getCategoryDistribution() {
    if (typeof QUESTIONS_DB === 'undefined') return {};
    const dist = {};
    QUESTIONS_DB.filter(q => !q.isPrediction).forEach(q => {
      dist[q.category] = (dist[q.category] || 0) + 1;
    });
    return dist;
  }

  /**
   * サブカテゴリ別出題頻度
   */
  getSubcategoryFrequency() {
    if (typeof QUESTIONS_DB === 'undefined') return {};
    const freq = {};
    QUESTIONS_DB.filter(q => !q.isPrediction).forEach(q => {
      freq[q.subcategory] = (freq[q.subcategory] || 0) + 1;
    });
    return freq;
  }

  /**
   * 同一問題対照表
   */
  getSameQuestionTable() {
    if (typeof REUSE_MAP === 'undefined') return [];

    const groups = {};
    Object.entries(REUSE_MAP).forEach(([id, related]) => {
      if (related.length === 0) return;
      const allIds = [id, ...related].sort();
      const key = allIds[0];
      if (!groups[key]) groups[key] = new Set(allIds);
      else allIds.forEach(i => groups[key].add(i));
    });

    return Object.entries(groups)
      .filter(([_, ids]) => ids.size > 1)
      .map(([key, ids]) => ({
        id: key,
        appearances: [...ids],
        count: ids.size
      }))
      .sort((a, b) => b.count - a.count);
  }

  // ===== 学習進捗 =====

  async getOverallAccuracy() {
    const answers = await this.db.getAllAnswers();
    if (answers.length === 0) return { total: 0, correct: 0, rate: 0 };

    const correct = answers.filter(a => a.isCorrect).length;
    return {
      total: answers.length,
      correct: correct,
      rate: correct / answers.length
    };
  }

  async getAccuracyByCategory() {
    if (typeof QUESTIONS_DB === 'undefined') return {};
    const answers = await this.db.getAllAnswers();

    const stats = {};
    answers.forEach(a => {
      const q = QUESTIONS_DB.find(q => q.id === a.questionId);
      if (q) {
        if (!stats[q.category]) stats[q.category] = { total: 0, correct: 0 };
        stats[q.category].total++;
        if (a.isCorrect) stats[q.category].correct++;
      }
    });

    Object.keys(stats).forEach(k => {
      stats[k].rate = stats[k].correct / stats[k].total;
    });

    return stats;
  }

  async getAccuracyBySubcategory() {
    if (typeof QUESTIONS_DB === 'undefined') return {};
    const answers = await this.db.getAllAnswers();

    const stats = {};
    answers.forEach(a => {
      const q = QUESTIONS_DB.find(q => q.id === a.questionId);
      if (q) {
        if (!stats[q.subcategory]) stats[q.subcategory] = { total: 0, correct: 0, subcategory: q.subcategory };
        stats[q.subcategory].total++;
        if (a.isCorrect) stats[q.subcategory].correct++;
      }
    });

    Object.keys(stats).forEach(k => {
      stats[k].rate = stats[k].correct / stats[k].total;
    });

    return stats;
  }

  async getStudyHistory() {
    return await this.db.getStudyDays();
  }

  async getWeakAreas() {
    const subStats = await this.getAccuracyBySubcategory();
    return Object.entries(subStats)
      .filter(([_, stat]) => stat.total >= 3 && stat.rate < 0.6)
      .sort((a, b) => a[1].rate - b[1].rate)
      .map(([subcategory, stat]) => ({ subcategory, ...stat }));
  }

  async getStudyStreak() {
    const days = await this.db.getStudyDays();
    if (!days || days.length === 0) return 0;

    const sorted = days.map(d => d.date).sort((a, b) => b.localeCompare(a));
    const today = new Date().toISOString().split('T')[0];

    let streak = 0;
    let checkDate = new Date(today);

    for (let i = 0; i < 365; i++) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (sorted.includes(dateStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (i === 0) {
        // 今日まだ学習していない場合、昨日から数える
        checkDate.setDate(checkDate.getDate() - 1);
        continue;
      } else {
        break;
      }
    }

    return streak;
  }

  async predictPassProbability() {
    const accuracy = await this.getOverallAccuracy();
    if (accuracy.total < 50) return null;
    return Math.min(Math.max(accuracy.rate * 100, 0), 100);
  }

  // ===== ユーティリティ =====
  _formatYear(year) {
    if (year.startsWith('H')) return `平成${year.slice(1)}年`;
    if (year.startsWith('R')) return `令和${year.slice(1)}年`;
    return year;
  }
}
