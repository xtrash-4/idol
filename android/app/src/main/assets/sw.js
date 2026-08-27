const CACHE_NAME = "mpruyy-halu-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/sound.js",
  "./js/members.js",
  "./js/groq-api.js",
  "./js/app.js",
  "./manifest.json",
  "./jkt48 logo.png",
  "./newjeans logo.jpg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
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

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
