const CACHE_NAME = 'gym-tracker-v1';
const ASSETS_TO_CACHE = [
 './',
 './index.html',
 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Oswald:wght@600;700&display=swap'
];

// Install Service Worker
self.addEventListener('install', (event) => {
 event.waitUntil(
   caches.open(CACHE_NAME).then((cache) => {
     return cache.addAll(ASSETS_TO_CACHE);
   })
 );
});

// Activate & Cleanup Old Caches
self.addEventListener('activate', (event) => {
 event.waitUntil(
   caches.keys().then((cacheNames) => {
     return Promise.all(
       cacheNames.map((cache) => {
         if (cache !== CACHE_NAME) {
           return caches.delete(cache);
         }
       })
     );
   })
 );
});

// Fetch Strategy: Network First, Fallback to Cache
self.addEventListener('fetch', (event) => {
 event.respondWith(
   fetch(event.request).catch(() => {
     return caches.match(event.request);
   })
 );
});