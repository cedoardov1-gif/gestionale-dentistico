const CACHE_NAME = "sds-v2";

self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // Mai cachare: HTML, API Supabase, autenticazione
  if (
    e.request.mode === "navigate" ||
    url.hostname.includes("supabase.co") ||
    url.pathname === "/sw.js" ||
    url.pathname === "/manifest.json"
  ) {
    e.respondWith(fetch(e.request));
    return;
  }

  // Cache-first solo per assets statici (JS, CSS, immagini)
  if (
    url.pathname.match(/\.(js|css|png|jpg|ico|woff2?)$/)
  ) {
    e.respondWith(
      caches.match(e.request).then((cached) => {
        return cached || fetch(e.request).then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          return res;
        });
      })
    );
    return;
  }

  // Tutto il resto: network first
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
