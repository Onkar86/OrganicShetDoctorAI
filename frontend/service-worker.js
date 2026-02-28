// ========================================
// SERVICE WORKER - ORGANIC SHET DOCTOR AI
// Offline support, caching, PWA functionality
// ========================================

const CACHE_NAME = "organic-shet-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/manifest.json",
  "/service-worker.js"
];

// ========================================
// INSTALL EVENT - Cache assets
// ========================================
self.addEventListener("install", event => {
  console.log("🔧 Service Worker: Installing...");
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("📦 Caching assets...");
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        console.log("✅ Service Worker: Installation complete");
        self.skipWaiting(); // Activate immediately
      })
      .catch(err => console.log("❌ Cache error:", err))
  );
});

// ========================================
// ACTIVATE EVENT - Clean old caches
// ========================================
self.addEventListener("activate", event => {
  console.log("🚀 Service Worker: Activating...");
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => {
            console.log(`🗑️ Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          })
      );
    })
  );
  
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.navigate(client.url); // Reload all tabs
    });
  });
});

// ========================================
// FETCH EVENT - Network first, cache fallback
// ========================================
self.addEventListener("fetch", event => {
  const { request } = event;
  
  // Skip cross-origin requests
  const isLocalRequest = request.url.startsWith(self.location.origin) ||
                         request.url.startsWith("http://127.0.0.1");
  
  if (!isLocalRequest) {
    return; // Let browser handle external requests
  }
  
  // API requests: Network first
  if (request.url.includes("/api/") || request.url.includes("127.0.0.1:8000")) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful API responses
          if (response.ok) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, response.clone());
            });
          }
          return response;
        })
        .catch(() => {
          // Return cached response if offline
          return caches.match(request);
        })
    );
  } else {
    // Static assets: Cache first
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response; // Use cached version
          }
          
          return fetch(request)
            .then(response => {
              // Cache successful responses
              if (response.ok && (response.type === "basic" || response.type === "cors")) {
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(request, response.clone());
                });
              }
              return response;
            })
            .catch(() => {
              // Offline fallback
              if (request.destination === "document") {
                return caches.match("/index.html");
              }
            });
        })
    );
  }
});

// ========================================
// BACKGROUND SYNC (Optional)
// ========================================
self.addEventListener("sync", event => {
  if (event.tag === "sync-solutions") {
    event.waitUntil(
      // Sync logic here if needed
      Promise.resolve()
    );
  }
});

console.log("✅ Service Worker loaded and ready");
