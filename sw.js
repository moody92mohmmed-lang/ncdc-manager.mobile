const CACHE_NAME = 'ncdc-manager-mobile-status-v1';
const ASSETS = ['./','./index.html','./manifest.json'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS).catch(()=>{})));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  if(e.request.url.includes('firestore.googleapis.com')) return;
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).catch(()=>cached)));
});
