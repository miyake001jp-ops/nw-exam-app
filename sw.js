const CACHE_NAME = 'nw-exam-app-v12';
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

// インストール時にキャッシュして即時アクティブ化
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache:', CACHE_NAME);
        return cache.addAll(ASSETS).catch((err) => {
          console.warn('Some assets failed to cache:', err);
        });
      })
  );
});

// アクティベート時に古いキャッシュを完全削除し即時クライアントを制御
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
    }).then(() => self.clients.claim())
  );
});

// フェッチ制御: JSとHTMLは Network-First (常に最新の問題・コードを取得)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isJsOrHtml = url.pathname.endsWith('.js') || url.pathname.endsWith('.html') || url.pathname.endsWith('/') || url.pathname === '';

  if (isJsOrHtml) {
    // ネットワークファースト: 常に最新ファイルを取得し、成功時にキャッシュを更新
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // オフライン時はキャッシュから返す
          return caches.match(event.request);
        })
    );
    return;
  }

  // 静的アセット (画像・フォント・CSS) はキャッシュファースト
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    })
  );
});
