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
