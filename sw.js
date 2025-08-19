const CACHE_NAME = orders-app-v1;
const urlsToCache = [
  .,
  .index.html,
  .manifest.json,
  .iconsicon-192.png,
  .iconsicon-512.png,
  httpscdn.jsdelivr.netnpmhtml2canvas@1.4.1disthtml2canvas.min.js,
  httpscdnjs.cloudflare.comajaxlibsjspdf2.5.1jspdf.umd.min.js
];

 تثبيت الكاش
self.addEventListener(install, event = {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache = cache.addAll(urlsToCache))
  );
});

 تفعيل الخدمة
self.addEventListener(activate, event = {
  event.waitUntil(
    caches.keys().then(keys =
      Promise.all(keys.filter(k = k !== CACHE_NAME).map(k = caches.delete(k)))
    )
  );
});

 التعامل مع الطلبات
self.addEventListener(fetch, event = {
  event.respondWith(
    caches.match(event.request).then(res = res  fetch(event.request))
  );
});
