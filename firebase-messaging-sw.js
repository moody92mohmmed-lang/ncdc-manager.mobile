importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCFbEW9iJKMZVtKTb9FsBjp4FduXtFUCJY",
  authDomain: "ncdc-mali.firebaseapp.com",
  databaseURL: "https://ncdc-mali-default-rtdb.firebaseio.com",
  projectId: "ncdc-mali",
  storageBucket: "ncdc-mali.firebasestorage.app",
  messagingSenderId: "465272815753",
  appId: "1:465272815753:web:4dbd1161ddf27dd9d60658",
  measurementId: "G-KKDW2HLY3Y"
});

const CACHE_NAME='ncdc-manager-mobile-fcm-v1';
const ASSETS=['./','./index.html','./manifest.json','./icons/icon-192.png','./icons/icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch',e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match('./index.html'))));
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const title = payload.notification?.title || 'تحديث منصة البريد';
  const options = {
    body: payload.notification?.body || 'وصل تحديث جديد من منصة اللابتوب',
    icon: './icons/icon-192.png',
    badge: './icons/icon-192.png',
    dir: 'rtl',
    lang: 'ar',
    tag: payload.data?.mailId || 'ncdc-manager-update',
    data: { url: './index.html', ...(payload.data || {}) }
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data?.url || './index.html';
  event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
    for(const client of list){
      if(client.url.includes(self.location.origin) && 'focus' in client) return client.focus();
    }
    if(clients.openWindow) return clients.openWindow(url);
  }));
});
