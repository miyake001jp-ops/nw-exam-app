class DataSync {
  constructor() {
    this.dbName = 'NWExamStudyDB';
    this.dbVersion = 1;
    this.db = null;
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = (event) => {
        console.error('IndexedDB error:', event.target.error);
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains('answers')) {
          const answersStore = db.createObjectStore('answers', { keyPath: 'id', autoIncrement: true });
          answersStore.createIndex('questionId', 'questionId', { unique: false });
          answersStore.createIndex('timestamp', 'timestamp', { unique: false });
          answersStore.createIndex('isCorrect', 'isCorrect', { unique: false });
        }

        if (!db.objectStoreNames.contains('sessions')) {
          const sessionsStore = db.createObjectStore('sessions', { keyPath: 'sessionId' });
          sessionsStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }

        if (!db.objectStoreNames.contains('studyDays')) {
          db.createObjectStore('studyDays', { keyPath: 'date' });
        }
      };
    });
  }

  // Generic method to add/put data
  async _saveData(storeName, data, usePut = true) {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject(new Error('Database not initialized'));
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = usePut ? store.put(data) : store.add(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  // Generic method to get all data from a store
  async _getAll(storeName) {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject(new Error('Database not initialized'));
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async saveAnswer(data) {
    // data: { questionId, isCorrect, choice, timestamp }
    data.timestamp = data.timestamp || Date.now();
    await this._saveData('answers', data, false);
    await this.recordStudyDay();
  }

  async getAnswerHistory(questionId) {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject(new Error('Database not initialized'));
      const transaction = this.db.transaction(['answers'], 'readonly');
      const store = transaction.objectStore('answers');
      const index = store.index('questionId');
      const request = index.getAll(questionId);

      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async getAllAnswers() {
    return this._getAll('answers');
  }

  async getWrongAnswers() {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject(new Error('Database not initialized'));
      const transaction = this.db.transaction(['answers'], 'readonly');
      const store = transaction.objectStore('answers');
      const index = store.index('isCorrect');
      const request = index.getAll(false);

      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async saveSession(data) {
    // data: { sessionId, mode, score, total, timestamp }
    data.timestamp = data.timestamp || Date.now();
    return this._saveData('sessions', data);
  }

  async getSessions() {
    return this._getAll('sessions');
  }

  async saveSetting(key, value) {
    return this._saveData('settings', { key, value });
  }

  async getSetting(key) {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject(new Error('Database not initialized'));
      const transaction = this.db.transaction(['settings'], 'readonly');
      const store = transaction.objectStore('settings');
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result ? request.result.value : null);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  getMasterId(questionId) {
    if (typeof QUESTIONS_DB !== 'undefined' && Array.isArray(QUESTIONS_DB)) {
      const q = QUESTIONS_DB.find(item => item.id === questionId);
      if (q && q.masterId) return q.masterId;
    }
    return questionId;
  }

  async getAllMasteryStats() {
    const answers = await this.getAllAnswers();
    const answersByMaster = {};
    for (const a of answers) {
      const mId = this.getMasterId(a.questionId);
      if (!answersByMaster[mId]) answersByMaster[mId] = [];
      answersByMaster[mId].push(a);
    }

    const stats = {};
    for (const [mId, list] of Object.entries(answersByMaster)) {
      list.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
      let consecutiveCorrect = 0;
      let totalCorrect = 0;
      for (const ans of list) {
        if (ans.isCorrect) {
          totalCorrect++;
          consecutiveCorrect++;
        } else {
          consecutiveCorrect = 0;
        }
      }
      stats[mId] = {
        masterId: mId,
        consecutiveCorrect,
        isMastered: consecutiveCorrect >= 5,
        totalAnswers: list.length,
        totalCorrect,
        lastAnswered: list[list.length - 1].timestamp || 0
      };
    }
    return stats;
  }

  async getSkipSettings() {
    const autoSkip = await this.getSetting('autoSkipMastered');
    const overrides = await this.getSetting('skipOverrides');
    return {
      autoSkipEnabled: autoSkip !== false, // デフォルト有効 (true)
      manualOverrides: overrides || {}     // { [masterId]: boolean }
    };
  }

  async setAutoSkipEnabled(enabled) {
    return this.saveSetting('autoSkipMastered', !!enabled);
  }

  async setQuestionSkipOverride(masterId, isSkipped) {
    const overrides = (await this.getSetting('skipOverrides')) || {};
    if (isSkipped === null) {
      delete overrides[masterId];
    } else {
      overrides[masterId] = !!isSkipped;
    }
    return this.saveSetting('skipOverrides', overrides);
  }

  async toggleQuestionSkipOverride(masterId) {
    const stats = await this.getAllMasteryStats();
    const settings = await this.getSkipSettings();
    const mStats = stats[masterId] || { consecutiveCorrect: 0, isMastered: false };

    let currentlySkipped = false;
    if (settings.manualOverrides.hasOwnProperty(masterId)) {
      currentlySkipped = settings.manualOverrides[masterId];
    } else {
      currentlySkipped = settings.autoSkipEnabled && mStats.isMastered;
    }

    const newStatus = !currentlySkipped;
    await this.setQuestionSkipOverride(masterId, newStatus);
    return newStatus;
  }

  isQuestionSkipped(masterId, autoSkipEnabled = true, manualOverrides = {}, stats = {}) {
    if (manualOverrides && manualOverrides.hasOwnProperty(masterId)) {
      return !!manualOverrides[masterId];
    }
    if (!autoSkipEnabled) return false;
    const mStat = stats[masterId];
    return !!(mStat && mStat.consecutiveCorrect >= 5);
  }

  async getQuestionMasteryStatus(questionId) {
    const masterId = this.getMasterId(questionId);
    const stats = await this.getAllMasteryStats();
    const settings = await this.getSkipSettings();
    const mStat = stats[masterId] || {
      masterId,
      consecutiveCorrect: 0,
      isMastered: false,
      totalAnswers: 0,
      totalCorrect: 0
    };

    const isSkipped = this.isQuestionSkipped(
      masterId,
      settings.autoSkipEnabled,
      settings.manualOverrides,
      stats
    );

    const isManual = settings.manualOverrides && settings.manualOverrides.hasOwnProperty(masterId);

    return {
      masterId,
      consecutiveCorrect: mStat.consecutiveCorrect,
      isMastered: mStat.consecutiveCorrect >= 5,
      isSkipped,
      isManual,
      manualValue: isManual ? settings.manualOverrides[masterId] : null
    };
  }

  async resetAllSkips() {
    await this.saveSetting('skipOverrides', {});
  }


  async recordStudyDay() {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return new Promise((resolve, reject) => {
      if (!this.db) return reject(new Error('Database not initialized'));
      const transaction = this.db.transaction(['studyDays'], 'readwrite');
      const store = transaction.objectStore('studyDays');
      const request = store.get(today);

      request.onsuccess = () => {
        let data = request.result;
        if (data) {
          data.questionCount += 1;
        } else {
          data = { date: today, questionCount: 1 };
        }
        store.put(data).onsuccess = () => resolve();
      };
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async getStudyDays() {
    return this._getAll('studyDays');
  }

  async exportData() {
    try {
      const answers = await this.getAllAnswers();
      const sessions = await this.getSessions();
      const settings = await this._getAll('settings');
      const studyDays = await this.getStudyDays();

      return {
        version: 1,
        exportDate: new Date().toISOString(),
        answers,
        sessions,
        settings,
        studyDays
      };
    } catch (e) {
      console.error('Export failed:', e);
      throw e;
    }
  }

  async importData(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      
      // Simple merge logic: clear and add or just add depending on requirements.
      // For simplicity, we add/put records. Overwrites settings, adds new answers.
      
      if (data.settings) {
        for (const s of data.settings) await this.saveSetting(s.key, s.value);
      }
      
      if (data.sessions) {
        for (const s of data.sessions) await this.saveSession(s);
      }

      if (data.studyDays) {
         for (const d of data.studyDays) await this._saveData('studyDays', d);
      }
      
      if (data.answers) {
         for (const a of data.answers) {
           // To avoid massive duplication, in a real scenario we'd check existence,
           // but here we just add since it's a log.
           await this._saveData('answers', a, false);
         }
      }

      return true;
    } catch (e) {
      console.error('Import failed:', e);
      throw e;
    }
  }

  async generateSyncQR() {
    // Compress data to a small payload for QR
    // Example: just total correct/wrong for some questions or weak areas
    // To keep it small, maybe just recent session data
    const sessions = await this.getSessions();
    const payload = JSON.stringify({
      s: sessions.slice(-10).map(s => [s.sessionId, s.score]) // small format
    });
    
    // In a real app, use base64 encoding and a QR library like qrcode.js
    const encoded = btoa(payload);
    const syncUrl = `${window.location.origin}${window.location.pathname}?sync=${encoded}`;
    return syncUrl;
  }

  async importFromURL(url) {
    try {
      const urlObj = new URL(url);
      const syncData = urlObj.searchParams.get('sync');
      if (syncData) {
        const payload = JSON.parse(atob(syncData));
        // merge payload...
        console.log('Imported from URL', payload);
        return true;
      }
      return false;
    } catch (e) {
      console.error('URL import failed', e);
      throw e;
    }
  }

  async clearAllData() {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject(new Error('Database not initialized'));
      
      const stores = ['answers', 'sessions', 'settings', 'studyDays'];
      const transaction = this.db.transaction(stores, 'readwrite');
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = (e) => reject(e.target.error);
      
      stores.forEach(storeName => {
        transaction.objectStore(storeName).clear();
      });
    });
  }
}
