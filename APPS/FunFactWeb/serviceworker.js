// // This is the service worker with the Cache-first network

// const CACHE = "pwabuilder-precache";

// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// self.addEventListener("message", (event) => {
//   if (event.data && event.data.type === "SKIP_WAITING") {
//     self.skipWaiting();
//   }
// });

// workbox.routing.registerRoute(
//   new RegExp('/*'),
//   new workbox.strategies.CacheFirst({
//     cacheName: CACHE
//   })
// );

// This is the "Offline copy of assets" service worker

//  const CACHE = "pwabuilder-offline";
//  const QUEUE_NAME = "bgSyncQueue";

//  importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

//  self.addEventListener("message", (event) => {
//    if (event.data && event.data.type === "SKIP_WAITING") {
//      self.skipWaiting();
//    }
//  });

//  const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin(QUEUE_NAME, {
//    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
//  });

//  workbox.routing.registerRoute(
//    new RegExp('/*'),
//    new workbox.strategies.StaleWhileRevalidate({
//      cacheName: CACHE,
//      plugins: [
//        bgSyncPlugin
//      ]
//    })
//  );

 //This is the service worker with the Advanced caching

 importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

 const HTML_CACHE = "html";
 const JS_CACHE = "javascript";
 const STYLE_CACHE = "stylesheets";
 const IMAGE_CACHE = "images";
 const FONT_CACHE = "fonts";
 const JSON_CACHE = "json";

 self.addEventListener("message", (event) => {
   if (event.data && event.data.type === "SKIP_WAITING") {
     self.skipWaiting();
   }
 });

 workbox.routing.registerRoute(
   ({event}) => event.request.destination === 'document',
   new workbox.strategies.NetworkFirst({
     cacheName: HTML_CACHE,
     plugins: [
       new workbox.expiration.ExpirationPlugin({
         maxEntries: 2,
       }),
     ],
   })
 );

 workbox.routing.registerRoute(
  /.*\.json/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: JSON_CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1,
      }),
    ],
  }),
);

 workbox.routing.registerRoute(
   ({event}) => event.request.destination === 'script',
   new workbox.strategies.StaleWhileRevalidate({
     cacheName: JS_CACHE,
     plugins: [
       new workbox.expiration.ExpirationPlugin({
         maxEntries: 3,
       }),
     ],
   })
 );

 workbox.routing.registerRoute(
   ({event}) => event.request.destination === 'style',
   new workbox.strategies.CacheFirst({
     cacheName: STYLE_CACHE,
     plugins: [
       new workbox.expiration.ExpirationPlugin({
         maxEntries: 3,
       }),
     ],
   })
 );

 workbox.routing.registerRoute(
   ({event}) => event.request.destination === 'image',
   new workbox.strategies.CacheFirst({
     cacheName: IMAGE_CACHE,
     plugins: [
       new workbox.expiration.ExpirationPlugin({
         maxEntries: 14,
       }),
     ],
   })
 );

 workbox.routing.registerRoute(
   ({event}) => event.request.destination === 'font',
   new workbox.strategies.StaleWhileRevalidate({
     cacheName: FONT_CACHE,
     plugins: [
       new workbox.expiration.ExpirationPlugin({
         maxEntries: 2,
       }),
     ],
   })
 );

// 'use strict';

// // CODELAB: Update cache names any time any of the cached files change.
// const CACHE_NAME = 'static-cache-v9';

// // CODELAB: Add list of files to cache here.
// const FILES_TO_CACHE = [
//   '/HTML/index.html',
//   '/API/Datos.json',
//   '/CSS/styles.css',
//   '/CSS/stylesLight.css',
//   '/IMG/Fondo.jpg',
//   '/IMG/FondoLight.jpg',
//   '/IMG/IllustracionOnErrorPorUnDraw.svg',
//   '/IMG/IllustracionOnErrorPorUnDrawLM.svg',
//   '/IMG/IllustracionporUnSplash.svg',
//   '/IMG/IllustracionporUnSplashLM.svg',
//   '/IMG/LogoHorizontalDM[FF].svg',
//   '/IMG/LogoHorizontalDM[II].svg',
//   '/IMG/LogoHorizontalDM[ST].svg',
//   '/IMG/LogoHorizontalLM[FF].svg',
//   '/IMG/LogoHorizontalLM[II].svg',
//   '/IMG/LogoHorizontalLM[ST].svg',
//   '/IMG/LogoSolo[FF].svg',
//   '/IMG/LogoSoloFF.png',
//   '/JS/Script.js',
//   '/JS/ScriptDelFormulario.js',
//   '/JS/ScriptFuncionesIndividuales.js',
//   '/LIBS/PersonalIconCollection-v1.0/style.css',
//   '/LIBS/PersonalIconCollection-v1.0/fonts/PersonalIconCollection.ttf?2uzjs3',
//   '/LIBS/PersonalIconCollection-v1.0/selection.json',
//   '/manifest.webmanifest',
//   '/serviceworker.js'
// ];

// self.addEventListener('install', (evt) => {
//   console.log('[ServiceWorker] Instalación');
//   // CODELAB: Precache static resources here.
//   evt.waitUntil(
//       caches.open(CACHE_NAME).then((cache) => {
//         console.log('[ServiceWorker] Pre-cacheando página fuera de línea');
//         return cache.addAll(FILES_TO_CACHE);
//       })
//   );
//   self.skipWaiting();
// });

// self.addEventListener('activate', (evt) => {
//   console.log('[ServiceWorker] Activación');
//   // CODELAB: Remove previous cached data from disk.
//   evt.waitUntil(
//       caches.keys().then((keyList) => {
//         return Promise.all(keyList.map((key) => {
//           if (key !== CACHE_NAME) {
//             console.log('[ServiceWorker] Removiendo caché anterior', key);
//             return caches.delete(key);
//           }
//         }));
//       })
//   );
//   self.clients.claim();
// });

// self.addEventListener('fetch', (evt) => {
//   // CODELAB: Add fetch event handler here.
//   // if (evt.request.mode !== 'navigate') {
//   //   // Not a page navigation, bail.
//   //   console.log("Fetch no navigate");
//   //   return;
//   // }
//   console.log('[ServiceWorker] Fetch', evt.request.url);
//   evt.respondWith(
//       caches.open(CACHE_NAME).then((cache) => {
//         return cache.match(evt.request)
//             .then((response) => {
//               console.log("RESP", response);
//               return response || fetch(evt.request);
//             });
//       })
//   );
// });