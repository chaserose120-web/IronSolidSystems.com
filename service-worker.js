const CACHE_NAME = "ironsolidsystems-v1";
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/supabase-config.js",
  "/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return Promise.resolve();
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  const pathname = url.pathname || "/";
  const isCoreAsset = CORE_ASSETS.includes(pathname);
  const isNavigation = request.mode === "navigate";

  if (!isCoreAsset && !isNavigation) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && isCoreAsset) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(pathname, responseClone);
          });
        }
        return response;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(pathname);

        if (cachedResponse) {
          return cachedResponse;
        }

        if (isNavigation) {
          return caches.match("/index.html");
        }

        throw new Error("Offline and no cached response available.");
      })
  );
});
