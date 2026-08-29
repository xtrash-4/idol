const CACHE_NAME = "idolchat-v2.3-6jkt48";
const ASSETS = [
  "./",
  "./index.html",
  "./css/style.css?v=2.3",
  "./js/sound.js?v=2.3",
  "./js/members.js?v=2.3",
  "./js/groq-api.js?v=2.3",
  "./js/app.js?v=2.3",
  "./manifest.json",
  "./jkt48 logo.png"
];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      )
    )
  );
  self.clients.claim();
});

// Network-First strategy agar pembaruan data member & foto selalu tampil real-time
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const resClone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, resClone));
        }
        return networkRes;
      })
      .catch(() => caches.match(e.request))
  );
});
