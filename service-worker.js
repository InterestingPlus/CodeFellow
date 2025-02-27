const CACHE_NAME = "codefellow-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  // "/offline.html",
  "/logo.png",
  "/logo.jpg",
  "/manifest.json",
  "/static/js/bundle.js", // Main React JS file
  "/static/js/main.js", // React main entry file
  "/static/js/vendors~main.chunk.js", // React vendors file
  "/static/css/main.css", // Main CSS file
];

// Install Service Worker & Cache Files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Serve Cached Content When Offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return caches.match("/offline.html"); // Serve an offline page if needed
      })
  );
});

// Update Cache & Remove Old Versions
self.addEventListener("activate", (event) => {
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
