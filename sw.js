const CACHE_NAME = 'nw-exam-app-v4';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/questions.js',
  './js/study.js',
  './js/statistics.js',
  './js/charts.js',
  './js/sync.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// インストール時にキャッシュする
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(ASSETS);
      })
  );
});

// アクティベート時に古いキャッシュを削除する
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// フェッチ時にキャッシュまたはネットワークからリソースを取得
self.addEventListener('fetch', (event) => {
  // アプリケーションシェル（ASSETS）はキャッシュファースト
  // それ以外（API呼び出しなど）はネットワークファーストで実装
  const isAppShell = ASSETS.some(asset => event.request.url.includes(asset));

  if (isAppShell) {
    // キャッシュファースト
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // キャッシュにあれば返す
          if (response) {
            return response;
          }
          // なければネットワークから取得
          return fetch(event.request).then(
            (response) => {
              // 有効なレスポンスかチェック
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              // レスポンスをクローンしてキャッシュに保存
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              return response;
            }
          );
        })
    );
  } else {
    // ネットワークファースト（フォールバック付き）
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request);
      })
    );
  }
});
