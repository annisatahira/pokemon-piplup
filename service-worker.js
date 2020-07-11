const CACHE_NAME = "piplup-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style/style.css",
  "/style/head.css",
  "/style/neck.css",
  "/style/body.css",
  "/style/back.css",
  "/style/feet.css",

  "/favicon.png",

  "/icons/Icon-72.png",
  "/icons/Icon-96.png",
  "/icons/Icon-144.png",
  "/icons/Icon-192.png",
  "/icons/icon-512.png",

  "/sw.js",
  "/manifest.json",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
