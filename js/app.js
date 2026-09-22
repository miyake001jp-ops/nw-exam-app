/**
 * ネットワークスペシャリスト試験 午前II対策アプリ
 * メインアプリケーションコントローラー
 */
class App {
  constructor() {
    this.db = new DataSync();
    this.studyManager = null;
    this.statsManager = null;
    this.chartManager = null;
    this.currentPage = 'home';
  }

  async init() {
    try {
      await this.db.initDB();
      this.studyManager = new StudyManager(this.db);
      this.statsManager = new StatisticsManager(this.db);
      this.chartManager = new ChartManager();

      this.populateFilters();
      this.setupNavigation();
      this.setupEventListeners();
      this.setupKeyboardShortcuts();

      // テーマ読み込み
      const theme = await this.db.getSetting('theme');
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        const toggle = document.getElementById('dark-mode-toggle');
        if (toggle) toggle.checked = true;
      }

      // スキップ設定読み込み
      const skipSettings = await this.db.getSkipSettings();
      const autoSkipToggle = document.getElementById('auto-skip-toggle');
      const studySkipMastered = document.getElementById('study-skip-mastered');
      if (autoSkipToggle) autoSkipToggle.checked = skipSettings.autoSkipEnabled;
      if (studySkipMastered) studySkipMastered.checked = skipSettings.autoSkipEnabled;

      // URLパラメータ同期チェック (?sync=...)
      const urlParams = new URLSearchParams(window.location.search);
      const syncPayload = urlParams.get('sync');
      if (syncPayload) {
        await this.handleURLSync(syncPayload);
      }

      // 初期ページ表示
      this.navigate('home');
      await this.updateDashboard();
      await this.updateSkippedCountBadge();

      // 古いキャッシュによる選択肢欠損の自動検出＆自動キャッシュパージ
      if (typeof QUESTIONS_DB !== 'undefined') {
        const r7q6 = QUESTIONS_DB.find(q => q.id === 'R7-Q06');
        if (r7q6 && (!r7q6.choices || !r7q6.choices['ア'] || r7q6.choices['ア'].trim() === '')) {
          console.warn('古いキャッシュデータを検出しました。キャッシュを自動更新します...');
          if ('caches' in window) {
            const keys = await caches.keys();
            await Promise.all(keys.map(k => caches.delete(k)));
          }
          if ('serviceWorker' in navigator) {
            const regs = await navigator.serviceWorker.getRegistrations();
            for (const r of regs) await r.unregister();
          }
          window.location.reload(true);
          return;
        }
      }

      // Service Worker 登録と更新チェック
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then(reg => {
          reg.update().catch(() => {});
        }).catch(() => {});
        
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('最新のService Workerが有効化されました');
        });
      }

      console.log(`NW午前II対策アプリ起動完了: ${QUESTIONS_DB.length}問読み込み済み`);
    } catch (e) {
      console.error('初期化エラー:', e);
    }
  }

  // ===== ナビゲーション =====
  setupNavigation() {
    // サイドバーナビ
    document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigate(link.dataset.page);
        document.getElementById('sidebar').classList.remove('open');
      });
    });

    // ボトムナビ
    document.querySelectorAll('.bottom-nav a[data-page]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigate(link.dataset.page);
      });
    });

    // ハンバーガーメニュー
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
      });
    }
    const closeMenu = document.getElementById('close-menu');
    if (closeMenu) {
      closeMenu.addEventListener('click', () => {
        document.getElementById('sidebar').classList.remove('open');
      });
    }
  }

  navigate(page) {
    this.currentPage = page;

    // 全ページ非表示
    document.querySelectorAll('.page').forEach(el => {
      el.classList.remove('active');
      el.style.display = 'none';
    });

    // 対象ページ表示
    const target = document.getElementById(`page-${page}`);
    if (target) {
      target.classList.add('active');
      target.style.display = 'block';
    }

    // ナビのアクティブ状態更新
    document.querySelectorAll('.nav-links a, .bottom-nav a').forEach(a => {
      a.classList.toggle('active', a.dataset.page === page);
    });

    // ページ固有処理
    if (page === 'home') this.updateDashboard();
    if (page === 'stats') this.renderStatistics();
    if (page === 'settings') this.updateSkippedCountBadge();
  }

  // ===== フィルター初期化 =====
  populateFilters() {
    const yearSelect = document.getElementById('study-year');
    const fieldSelect = document.getElementById('study-field');
    const subcatSelect = document.getElementById('study-subcat');

    if (yearSelect) {
      const years = [...new Set(QUESTIONS_DB.filter(q => !q.isPrediction).map(q => q.year))];
      years.sort((a, b) => {
        const numA = (typeof YEAR_MAP !== 'undefined' && YEAR_MAP[a]?.num) || (a.startsWith('H') ? parseInt(a.slice(1)) : parseInt(a.slice(1)) + 30);
        const numB = (typeof YEAR_MAP !== 'undefined' && YEAR_MAP[b]?.num) || (b.startsWith('H') ? parseInt(b.slice(1)) : parseInt(b.slice(1)) + 30);
        return numA - numB;
      });
      years.forEach(y => {
        const label = (typeof YEAR_MAP !== 'undefined' && YEAR_MAP[y]?.label) || (y === 'R1' ? '令和元年' : (y.startsWith('H') ? `平成${y.slice(1)}年` : `令和${y.slice(1)}年`));
        yearSelect.innerHTML += `<option value="${y}">${label}</option>`;
      });
    }

    if (fieldSelect) {
      Object.entries(CATEGORY_INFO).forEach(([key, info]) => {
        fieldSelect.innerHTML += `<option value="${key}">${info.label}</option>`;
      });
    }

    if (subcatSelect) {
      Object.entries(SUBCATEGORY_INFO).forEach(([key, info]) => {
        subcatSelect.innerHTML += `<option value="${key}">${info.label}</option>`;
      });
    }
  }

  // ===== イベントリスナー =====
  setupEventListeners() {
    // 学習モード開始
    const startStudyBtn = document.getElementById('start-study-btn');
    if (startStudyBtn) {
      startStudyBtn.addEventListener('click', () => this.startStudySession());
    }

    // テストモード開始
    const startTestBtn = document.getElementById('start-test-btn');
    if (startTestBtn) {
      startTestBtn.addEventListener('click', () => this.startTestSession());
    }

    // 弱点克服モード開始
    const startWeakBtn = document.getElementById('start-weak-btn');
    if (startWeakBtn) {
      startWeakBtn.addEventListener('click', () => this.startWeaknessSession());
    }

    // 予想問題モード開始
    const startPredictBtn = document.getElementById('start-predict-btn');
    if (startPredictBtn) {
      startPredictBtn.addEventListener('click', () => this.startPredictionSession());
    }

    // おすすめ問題
    const startRecommended = document.getElementById('start-recommended');
    if (startRecommended) {
      startRecommended.addEventListener('click', () => this.startRecommendedSession());
    }

    // 学習ナビボタン
    document.getElementById('study-next-btn')?.addEventListener('click', () => this.studyManager.nextQuestion());
    document.getElementById('feedback-next-btn')?.addEventListener('click', () => this.studyManager.nextQuestion());
    document.getElementById('study-prev-btn')?.addEventListener('click', () => this.studyManager.prevQuestion());
    document.getElementById('study-skip-btn')?.addEventListener('click', () => this.studyManager.nextQuestion());

    // テストナビボタン
    document.getElementById('test-next-btn')?.addEventListener('click', () => this.studyManager.nextQuestion());
    document.getElementById('test-prev-btn')?.addEventListener('click', () => this.studyManager.prevQuestion());
    document.getElementById('test-submit-btn')?.addEventListener('click', () => this.studyManager.showTestResults());
    document.getElementById('test-review-btn')?.addEventListener('click', () => this.navigate('study'));

    // 選択肢クリック（イベント委任）
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.choice-btn');
      if (btn && !btn.classList.contains('disabled')) {
        const choice = btn.dataset.choice;
        if (choice) this.handleChoiceClick(choice);
      }
    });

    // 統計タブ切り替え
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => {
          c.classList.remove('active');
          c.style.display = 'none';
        });
        btn.classList.add('active');
        const tabId = `tab-${btn.dataset.tab}`;
        const tabEl = document.getElementById(tabId);
        if (tabEl) {
          tabEl.classList.add('active');
          tabEl.style.display = 'block';
        }
      });
    });

    // ダークモード
    const darkToggle = document.getElementById('dark-mode-toggle');
    if (darkToggle) {
      darkToggle.addEventListener('change', async () => {
        const isDark = darkToggle.checked;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : '');
        await this.db.saveSetting('theme', isDark ? 'dark' : 'light');
        this.showToast(isDark ? 'ダークモードに切り替えました' : 'ライトモードに切り替えました');
      });
    }

    // スキップ設定
    const autoSkipToggle = document.getElementById('auto-skip-toggle');
    if (autoSkipToggle) {
      autoSkipToggle.addEventListener('change', async () => {
        const isEnabled = autoSkipToggle.checked;
        await this.db.setAutoSkipEnabled(isEnabled);
        const studySkipMastered = document.getElementById('study-skip-mastered');
        if (studySkipMastered) studySkipMastered.checked = isEnabled;
        await this.updateSkippedCountBadge();
        this.showToast(isEnabled ? '5回連続正解の自動スキップを有効にしました' : '自動スキップを無効にしました');
      });
    }

    // スキップ設定リセット
    const resetSkipsBtn = document.getElementById('reset-skips-btn');
    if (resetSkipsBtn) {
      resetSkipsBtn.addEventListener('click', async () => {
        if (confirm('問題個別に設定したスキップ状態（手動ON/OFF）をすべて初期化しますか？')) {
          await this.db.resetAllSkips();
          await this.updateSkippedCountBadge();
          this.showToast('個別スキップ設定を初期化しました');
        }
      });
    }

    // 解説画面での個別スキップ切り替えボタン
    const toggleSkipBtn = document.getElementById('study-toggle-skip-btn');
    if (toggleSkipBtn) {
      toggleSkipBtn.addEventListener('click', async () => {
        if (!this.currentExplanationQuestion) return;
        const q = this.currentExplanationQuestion;
        const mId = q.masterId || q.id;
        const newStatus = await this.db.toggleQuestionSkipOverride(mId);
        const mastery = await this.db.getQuestionMasteryStatus(q.id);
        this.updateExplanationMasteryUI(mastery);
        this.showToast(`この問題のスキップを ${newStatus ? 'ON (次回以降スキップ)' : 'OFF (学習対象に復帰)'} に設定しました`);
        await this.updateSkippedCountBadge();
      });
    }

    // エクスポート
    document.getElementById('export-btn')?.addEventListener('click', async () => {
      try {
        const data = await this.db.exportData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nw-exam-data-${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('データをエクスポートしました');
      } catch (e) {
        this.showToast('エクスポートに失敗しました', 'error');
      }
    });

    // インポート
    document.getElementById('import-btn-proxy')?.addEventListener('click', () => {
      document.getElementById('import-file')?.click();
    });
    document.getElementById('import-file')?.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        await this.db.importData(text);
        this.showToast('データをインポートしました');
        await this.updateDashboard();
        await this.updateSkippedCountBadge();
      } catch (err) {
        this.showToast('インポートに失敗しました', 'error');
      }
    });

    // QRコード表示
    document.getElementById('show-qr-btn')?.addEventListener('click', async () => {
      const container = document.getElementById('qrcode-container');
      if (container) {
        container.classList.toggle('hidden');
        if (!container.classList.contains('hidden')) {
          await this.generateQRCode(container);
        }
      }
    });

    // データリセット
    document.getElementById('reset-data-btn')?.addEventListener('click', async () => {
      if (confirm('全ての学習データを削除しますか？この操作は取り消せません。')) {
        await this.db.clearAllData();
        this.showToast('データをリセットしました');
        await this.updateDashboard();
        await this.updateSkippedCountBadge();
      }
    });

    // キャッシュ強制更新
    document.getElementById('force-update-btn')?.addEventListener('click', async () => {
      this.showToast('最新データを再取得しています...', 'info');
      try {
        if ('caches' in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map(k => caches.delete(k)));
        }
        if ('serviceWorker' in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations();
          for (const r of regs) await r.unregister();
        }
      } catch (err) {}
      window.location.reload(true);
    });

    // カスタムイベント
    document.addEventListener('render-question', (e) => this.renderQuestion(e.detail));
    document.addEventListener('render-explanation', (e) => this.renderExplanation(e.detail));
    document.addEventListener('timer-tick', (e) => this.updateTimer(e.detail));
    document.addEventListener('render-test-results', (e) => this.renderTestResults(e.detail));
    document.addEventListener('answer-recorded', async () => {
      await this.updateDashboard();
      await this.updateSkippedCountBadge();
    });
    document.addEventListener('session-ended', () => this.onSessionEnded());
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (!['home', 'study', 'test', 'weak', 'prediction'].includes(this.currentPage)) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

      const key = e.key;
      if (['1', '2', '3', '4'].includes(key)) {
        const map = { '1': 'ア', '2': 'イ', '3': 'ウ', '4': 'エ' };
        this.handleChoiceClick(map[key]);
        e.preventDefault();
      }
      if (key === 'ArrowRight' || key === 'Enter') {
        this.studyManager.nextQuestion();
        e.preventDefault();
      }
      if (key === 'ArrowLeft') {
        this.studyManager.prevQuestion();
        e.preventDefault();
      }
    });
  }

  // ===== セッション開始 =====
  async startStudySession() {
    const year = document.getElementById('study-year')?.value;
    const field = document.getElementById('study-field')?.value;
    const subcat = document.getElementById('study-subcat')?.value;
    const sort = document.getElementById('study-sort')?.value;
    const skipMastered = document.getElementById('study-skip-mastered')?.checked;

    const options = {
      mode: 'study',
      years: year && year !== 'all' ? [year] : [],
      categories: field && field !== 'all' ? [field] : [],
      subcategories: subcat && subcat !== 'all' ? [subcat] : [],
      sort: sort || 'asc',
      skipMastered: !!skipMastered
    };

    const ok = await this.studyManager.startSession(options);
    if (ok) {
      document.getElementById('study-area')?.classList.remove('hidden');
    } else {
      this.showToast('条件に該当する問題がありません（全てスキップ対象の可能性があります。「5連続正解をスキップ」のチェックを外すか、設定を確認してください）。', 'error');
    }
  }

  async startRecommendedSession() {
    // ホーム画面の「おすすめを解く」ボタン用
    // フィルタドロップダウンに依存せず、ランダム順で全問題を学習
    const skipMastered = document.getElementById('study-skip-mastered')?.checked ?? true;
    const options = {
      mode: 'study',
      years: [],
      categories: [],
      subcategories: [],
      sort: 'random',
      skipMastered
    };

    let ok = await this.studyManager.startSession(options);
    if (!ok && skipMastered) {
      // スキップ対象外の問題が尽きた場合は、スキップなしで再試行
      ok = await this.studyManager.startSession({ ...options, skipMastered: false });
    }
    if (ok) {
      // 学習ページに遷移してUI表示
      this.navigate('study');
      document.getElementById('study-area')?.classList.remove('hidden');
    } else {
      this.showToast('問題が見つかりませんでした。', 'error');
    }
  }

  async startTestSession() {
    const count = parseInt(document.getElementById('test-count')?.value || '25');
    const ok = await this.studyManager.startSession({
      mode: 'test',
      questionCount: count
    });
    if (ok) {
      document.getElementById('test-start-screen')?.classList.add('hidden');
      document.getElementById('test-area')?.classList.remove('hidden');
      document.getElementById('test-result-screen')?.classList.add('hidden');
    }
  }

  async startWeaknessSession() {
    const ok = await this.studyManager.startSession({ mode: 'weakness' });
    if (ok) {
      // 弱点克服は学習モードのUIを共有
      this.navigate('study');
      document.getElementById('study-area')?.classList.remove('hidden');
    } else {
      this.showToast('間違えた問題がまだありません。まず学習を始めましょう！');
    }
  }

  async startPredictionSession() {
    const ok = await this.studyManager.startSession({ mode: 'prediction' });
    if (ok) {
      this.navigate('study');
      document.getElementById('study-area')?.classList.remove('hidden');
    }
  }

  // ===== 選択肢クリック処理 =====
  handleChoiceClick(choice) {
    if (this.studyManager.mode === 'test') {
      this.studyManager.handleAnswer(choice);
    } else {
      this.studyManager.handleAnswer(choice);
    }
  }

  // ===== UI描画 =====
  renderQuestion(detail) {
    const q = detail.question;
    const isTest = detail.mode === 'test';
    const container = isTest ? 'test' : 'study';

    // 問題番号・年度
    const yearEl = document.getElementById(`${container}-q-year`);
    const numEl = document.getElementById(`${container}-q-num`);
    const textEl = document.getElementById(`${container}-q-text`);
    const choicesEl = document.getElementById(`${container}-choices`);

    if (yearEl) {
      let badge = q.yearLabel;
      if (q.isPrediction) badge = '🔮 予想問題';
      yearEl.textContent = badge;
    }
    if (numEl) {
      numEl.textContent = isTest
        ? `第${detail.index + 1}問 / ${detail.total}問`
        : `問${q.number} (${detail.index + 1}/${detail.total}問)`;
    }
    if (textEl) textEl.textContent = q.question;

    if (choicesEl) {
      choicesEl.innerHTML = '';
      ['ア', 'イ', 'ウ', 'エ'].forEach(label => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.dataset.choice = label;

        // 前回の回答状態を反映
        if (detail.previousAnswer) {
          if (isTest) {
            if (label === detail.previousAnswer.choice) {
              btn.classList.add('selected');
            }
          } else {
            btn.classList.add('disabled');
            if (label === q.answer) btn.classList.add('correct');
            if (label === detail.previousAnswer.choice && !detail.previousAnswer.isCorrect) {
              btn.classList.add('wrong');
            }
          }
        }

        btn.innerHTML = `<span>${label}</span> <div class="choice-text">${q.choices[label]}</div>`;
        choicesEl.appendChild(btn);
      });
    }

    // プログレスバー
    const progressEl = document.getElementById(`${container}-progress`);
    if (progressEl) {
      const pct = ((detail.index + 1) / detail.total) * 100;
      progressEl.style.width = `${pct}%`;
    }

    // フィードバック非表示
    const feedback = document.getElementById('study-feedback');
    if (feedback && !isTest) feedback.classList.add('hidden');

    // 前へボタンの制御
    const prevBtn = document.getElementById(`${container}-prev-btn`);
    if (prevBtn) prevBtn.disabled = detail.index === 0;
  }

  renderExplanation(detail) {
    const feedback = document.getElementById('study-feedback');
    if (!feedback) return;
    feedback.classList.remove('hidden');

    const titleEl = document.getElementById('study-result-title');
    const ansEl = document.getElementById('study-correct-ans');
    const expEl = document.getElementById('study-explanation');
    const histInfo = document.getElementById('study-history-info');
    const histList = document.getElementById('study-history-list');

    if (titleEl) {
      titleEl.textContent = detail.answer.isCorrect ? '⭕ 正解！' : '❌ 不正解...';
      titleEl.style.color = detail.answer.isCorrect ? 'var(--success-color)' : 'var(--error-color)';
    }
    if (ansEl) ansEl.textContent = `${detail.question.answer}: ${detail.question.choices[detail.question.answer]}`;
    if (expEl) expEl.textContent = detail.question.explanation;

    // 同一問題の出題履歴
    if (histInfo && histList) {
      const sameAs = detail.question.sameAs || [];
      if (sameAs.length > 0) {
        histInfo.style.display = 'block';
        const totalCount = 1 + sameAs.length;
        const titleEl = histInfo.querySelector('h4');
        if (titleEl) {
          titleEl.innerHTML = `🔥 同一問題の出題履歴 <span class="badge" style="background-color: var(--error-color); color: white; margin-left: 0.5rem; font-size: 0.8rem;">過去 計${totalCount}回出題</span>`;
        }
        histList.innerHTML = sameAs.map(id => {
          const parts = id.split('-');
          const y = parts[0];
          const yLabel = (typeof YEAR_MAP !== 'undefined' && YEAR_MAP[y]?.label) || (y === 'R1' ? '令和元年' : (y.startsWith('H') ? `平成${y.slice(1)}年` : `令和${y.slice(1)}年`));
          return `<li><strong>${yLabel} ${parts[1]}</strong>（同一問題・同一解答）</li>`;
        }).join('');
      } else {
        histInfo.style.display = 'none';
      }
    }

    // 選択肢にフィードバック色を適用
    document.querySelectorAll('.choice-btn').forEach(btn => {
      btn.classList.add('disabled');
      const choice = btn.dataset.choice;
      if (choice === detail.question.answer) btn.classList.add('correct');
      if (choice === detail.answer.choice && !detail.answer.isCorrect) btn.classList.add('wrong');
    });

    // 連続正解数・スキップ状態の表示更新
    this.currentExplanationQuestion = detail.question;
    if (detail.mastery) {
      this.updateExplanationMasteryUI(detail.mastery);
    }
  }

  updateExplanationMasteryUI(mastery) {
    const streakBadge = document.getElementById('study-streak-badge');
    const skipLabel = document.getElementById('study-skip-status-label');
    const skipBtn = document.getElementById('study-toggle-skip-btn');
    if (!streakBadge || !skipLabel || !skipBtn) return;

    const streak = mastery.consecutiveCorrect || 0;
    const isSkipped = !!mastery.isSkipped;

    streakBadge.className = 'badge mastery-badge';
    if (isSkipped) {
      if (mastery.isManual && mastery.manualValue === true) {
        streakBadge.classList.add('skipped');
        streakBadge.textContent = `📌 手動スキップ中 (連続正解 ${streak}回)`;
      } else {
        streakBadge.classList.add('mastered');
        streakBadge.textContent = `🎉 習得済み (${streak}連続正解・自動スキップ中)`;
      }
    } else {
      if (mastery.isManual && mastery.manualValue === false) {
        streakBadge.textContent = `🔄 スキップ解除中 (連続正解 ${streak}回)`;
      } else {
        streakBadge.textContent = `🔥 連続正解: ${streak}/5回`;
      }
    }

    skipLabel.textContent = isSkipped ? 'ON' : 'OFF';
    if (isSkipped) {
      skipBtn.classList.remove('btn-outline');
      skipBtn.classList.add('btn-primary');
    } else {
      skipBtn.classList.remove('btn-primary');
      skipBtn.classList.add('btn-outline');
    }
  }

  async updateSkippedCountBadge() {
    try {
      const badge = document.getElementById('skipped-count-badge');
      if (!badge || typeof QUESTIONS_DB === 'undefined') return;
      const stats = await this.db.getAllMasteryStats();
      const settings = await this.db.getSkipSettings();

      const seenMasterIds = new Set();
      let skippedCount = 0;
      for (const q of QUESTIONS_DB) {
        const mId = q.masterId || q.id;
        if (!seenMasterIds.has(mId)) {
          seenMasterIds.add(mId);
          if (this.db.isQuestionSkipped(mId, settings.autoSkipEnabled, settings.manualOverrides, stats)) {
            skippedCount++;
          }
        }
      }
      badge.textContent = `${skippedCount} 問`;
    } catch (e) {
      console.error('スキップバッジ更新エラー:', e);
    }
  }

  updateTimer(detail) {
    const timerEl = document.getElementById('test-timer');
    if (timerEl) {
      const min = Math.floor(detail.remaining / 60);
      const sec = detail.remaining % 60;
      timerEl.textContent = `${min}:${String(sec).padStart(2, '0')}`;
      if (detail.remaining < 300) timerEl.style.color = 'var(--error-color)';
    }
  }

  renderTestResults(detail) {
    document.getElementById('test-area')?.classList.add('hidden');
    const resultScreen = document.getElementById('test-result-screen');
    if (!resultScreen) return;
    resultScreen.classList.remove('hidden');

    const isPass = detail.score >= 60;
    const scoreEl = document.getElementById('test-score');
    const passEl = document.getElementById('test-pass-fail');
    const timeEl = document.getElementById('test-time-taken');

    if (scoreEl) scoreEl.textContent = detail.score.toFixed(0);
    if (passEl) {
      passEl.textContent = isPass ? '🎉 合格圏内！' : '😤 不合格 - もう少し！';
      passEl.style.color = isPass ? 'var(--success-color)' : 'var(--error-color)';
    }
    if (timeEl) {
      const elapsed = (40 * 60) - (detail.timeRemaining || 0);
      const m = Math.floor(elapsed / 60);
      const s = elapsed % 60;
      timeEl.textContent = `${m}分${s}秒`;
    }
  }

  onSessionEnded() {
    // 学習エリアを非表示にし、ホームに戻る
    document.getElementById('study-area')?.classList.add('hidden');
    this.showToast('学習セッション完了！お疲れさまでした🎉');
    this.navigate('home');
    this.updateDashboard();
  }

  // ===== ダッシュボード =====
  async updateDashboard() {
    try {
      const accuracy = await this.statsManager.getOverallAccuracy();
      const streak = await this.statsManager.getStudyStreak();
      const answers = await this.db.getAllAnswers();

      const totalEl = document.getElementById('total-learned');
      const accEl = document.getElementById('overall-accuracy');
      const streakEl = document.getElementById('streak-days');
      const passEl = document.getElementById('pass-prediction');

      if (totalEl) totalEl.textContent = `${answers.length}問`;
      if (accEl) accEl.textContent = accuracy.total > 0 ? `${(accuracy.rate * 100).toFixed(1)}%` : '---';
      if (streakEl) streakEl.textContent = `${streak}日`;

      if (passEl) {
        if (accuracy.total >= 3) {
          const pct = Math.round(accuracy.rate * 100);
          const prob = accuracy.rate >= 0.6 ? `合格圏内 (${pct}%)` : `要努力 (${pct}%)`;
          passEl.textContent = prob;
          passEl.style.color = accuracy.rate >= 0.6 ? 'var(--success-color)' : 'var(--error-color)';
        } else if (answers.length > 0) {
          passEl.textContent = `収集中 (${answers.length}/3問)`;
          passEl.style.color = 'var(--text-muted)';
        } else {
          passEl.textContent = '未学習';
          passEl.style.color = 'var(--text-muted)';
        }
      }

      // 弱点問題数
      const wrongAnswers = await this.db.getWrongAnswers();
      const weakCount = document.getElementById('weak-count');
      if (weakCount) weakCount.textContent = wrongAnswers.length;

    } catch (e) {
      console.error('ダッシュボード更新エラー:', e);
    }
  }

  // ===== 統計・分析 =====
  async renderStatistics() {
    // 過去問分析タブ
    const reuseData = this.statsManager.getReuseRateByYear();
    this.chartManager.renderReuseRateChart('reappear-chart',
      reuseData.map(d => ({
        yearLabel: d.yearLabel,
        rate: Math.round(d.rate * 100)
      }))
    );

    // 分野別出題数
    const catDist = this.statsManager.getCategoryDistribution();
    const catChartData = Object.entries(catDist).map(([key, count]) => ({
      label: CATEGORY_INFO[key]?.label || key,
      count: count,
      color: CATEGORY_INFO[key]?.color || '#999'
    }));
    this.chartManager.renderCategoryChart('field-chart', catChartData);

    // 頻出問題ランキング
    this.renderFrequentTable();

    // 同一問題対照表
    this.renderSameQuestionTable();

    // 学習進捗タブ
    const accData = await this.statsManager.getOverallAccuracy();
    if (accData.total > 0) {
      // レーダーチャート
      const subStats = await this.statsManager.getAccuracyBySubcategory();
      const radarData = Object.entries(subStats).map(([key, stat]) => ({
        label: SUBCATEGORY_INFO[key]?.label || key,
        accuracy: Math.round(stat.rate * 100)
      }));
      if (radarData.length > 2) {
        this.chartManager.renderAccuracyRadarChart('radar-chart', radarData);
      }

      // 弱点分析テキスト
      const weakAreas = await this.statsManager.getWeakAreas();
      const weakText = document.getElementById('weakness-analysis-text');
      if (weakText) {
        if (weakAreas.length > 0) {
          const areas = weakAreas.map(w => SUBCATEGORY_INFO[w.subcategory]?.label || w.subcategory);
          weakText.innerHTML = `<strong>弱点分野:</strong> ${areas.join('、')}<br>これらの分野を重点的に学習しましょう。`;
        } else {
          weakText.textContent = '特に弱点は見つかっていません。引き続き学習を続けましょう！';
        }
      }
    }
  }

  renderFrequentTable() {
    const tbody = document.getElementById('frequent-q-table');
    if (!tbody) return;

    // REUSE_MAPから頻出問題を抽出
    const groups = {};
    Object.entries(REUSE_MAP).forEach(([id, related]) => {
      const allIds = [id, ...related].sort();
      const key = allIds[0];
      if (!groups[key]) {
        groups[key] = new Set(allIds);
      } else {
        allIds.forEach(i => groups[key].add(i));
      }
    });

    const ranked = Object.entries(groups)
      .map(([key, ids]) => {
        const q = QUESTIONS_DB.find(q => q.id === key);
        return {
          question: q ? q.question.substring(0, 50) + '...' : key,
          count: ids.size,
          years: [...ids].map(id => id.split('-')[0])
        };
      })
      .filter(r => r.count > 1)
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    tbody.innerHTML = ranked.map((r, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${r.question}</td>
        <td><strong>${r.count}回</strong> (${[...new Set(r.years)].join(', ')})</td>
      </tr>
    `).join('');
  }

  renderSameQuestionTable() {
    const table = document.getElementById('same-q-table');
    if (!table) return;

    const groups = {};
    Object.entries(REUSE_MAP).forEach(([id, related]) => {
      if (related.length === 0) return;
      const allIds = [id, ...related].sort();
      const key = allIds[0];
      if (!groups[key]) groups[key] = new Set(allIds);
      else allIds.forEach(i => groups[key].add(i));
    });

    let html = '<thead><tr><th>問題</th><th>出題年度</th></tr></thead><tbody>';
    Object.entries(groups).forEach(([key, ids]) => {
      if (ids.size <= 1) return;
      const q = QUESTIONS_DB.find(q => q.id === key);
      const qText = q ? q.question.substring(0, 60) + '...' : key;
      const yearsList = [...ids].map(id => {
        const y = id.split('-')[0];
        return y.startsWith('H') ? `平${y.slice(1)}` : `令${y.slice(1)}`;
      }).join(' → ');
      html += `<tr><td>${qText}</td><td>${yearsList}</td></tr>`;
    });
    html += '</tbody>';
    table.innerHTML = html;
  }

  // ===== QRコード & URL同期 =====
  async generateQRCode(container) {
    try {
      const data = await this.db.exportData();
      // 軽量化: 回答データのサマリーのみ（直近200件）
      const summary = {
        v: 1,
        date: new Date().toISOString(),
        answers: (data.answers || []).slice(-200).map(a => ({
          q: a.questionId,
          c: a.isCorrect ? 1 : 0,
          ch: a.choice || ''
        }))
      };
      const jsonStr = JSON.stringify(summary);
      const encoded = btoa(unescape(encodeURIComponent(jsonStr)));

      container.innerHTML = '';
      if (encoded.length > 2200) {
        container.innerHTML = '<p style="color:var(--error-color);">履歴データが大きいため、JSONエクスポートファイル経由（Googleドライブ/メール等）での同期を推奨します。</p>';
        return;
      }

      // スマホで読み取った際に直接開けるURL
      const syncUrl = `${window.location.origin}${window.location.pathname}?sync=${encodeURIComponent(encoded)}`;

      const canvas = document.createElement('canvas');
      container.appendChild(canvas);
      
      const note = document.createElement('p');
      note.style.cssText = 'font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem; text-align: center;';
      note.textContent = 'Androidスマホのカメラ等で読み取ると、自動的に学習履歴が連動されます。';
      container.appendChild(note);

      if (typeof QRCode !== 'undefined') {
        await QRCode.toCanvas(canvas, syncUrl, { width: 220, margin: 2 });
      }
    } catch (e) {
      console.error('QR生成エラー:', e);
      container.innerHTML = '<p>QRコード生成に失敗しました。</p>';
    }
  }

  async handleURLSync(encodedData) {
    try {
      const jsonStr = decodeURIComponent(escape(atob(encodedData)));
      const payload = JSON.parse(jsonStr);

      if (payload && payload.answers && Array.isArray(payload.answers)) {
        for (const item of payload.answers) {
          await this.db.saveAnswer({
            questionId: item.q,
            isCorrect: item.c === 1,
            choice: item.ch,
            timestamp: Date.now()
          });
        }
        await this.db.recordStudyDay();
        this.showToast(`📱 PC端末から ${payload.answers.length} 問の学習履歴を同期しました！`);
        
        // URLからsyncパラメータを除去してクリーンに
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    } catch (e) {
      console.error('URL同期エラー:', e);
      this.showToast('端末間同期データの読み込みに失敗しました。', 'error');
    }
  }

  // ===== トースト通知 =====
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
      padding: 12px 24px; border-radius: 8px; z-index: 9999;
      background: ${type === 'error' ? 'var(--error-color)' : 'var(--primary-color)'};
      color: white; font-size: 14px; opacity: 0; transition: opacity 0.3s;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.style.opacity = '1');
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// ===== アプリ起動 =====
let app;
window.addEventListener('DOMContentLoaded', () => {
  app = new App();
  window.app = app;
  app.init();
});
