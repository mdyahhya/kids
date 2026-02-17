// sw.js - network-only, no caching so GitHub changes show immediately

self.addEventListener('install', event => {
  // skip waiting so new SW takes control ASAP
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // claim all clients right away
  event.waitUntil(self.clients.claim());
});

// Network-only strategy: always go to network, never use Cache API
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // optional: basic offline fallback message
      return new Response(
        '<html><body><h2 style="font-family:sans-serif;color:#FF6B6B;">You are offline.</h2><p style="font-family:sans-serif;">Please reconnect to load Tiny Treasures.</p></body></html>',
        { headers: { 'Content-Type': 'text/html' } }
      );
    })
  );
});
