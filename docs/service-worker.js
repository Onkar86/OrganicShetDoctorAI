// Service worker copied to docs/ for GitHub Pages
const CACHE_NAME = "organic-shet-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/manifest.json",
  "/service-worker.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
});

self.addEventListener("fetch", event => {
  const { request } = event;
  const isLocal = request.url.startsWith(self.location.origin) || request.url.startsWith('http://127.0.0.1');
  if (!isLocal) return;
  if (request.url.includes('/api/') || request.url.includes('127.0.0.1:8000')) {
    event.respondWith(fetch(request).catch(() => caches.match(request)));
    return;
  }
  event.respondWith(caches.match(request).then(r => r || fetch(request).then(resp => { if (resp.ok) { caches.open(CACHE_NAME).then(c => c.put(request, resp.clone())); } return resp; }).catch(() => caches.match('/index.html'))));
});
