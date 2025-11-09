// Define un nombre y versión para la caché
const CACHE_NAME = 'funfact-cache-v1';

// Lista de archivos clave (el "App Shell") que la PWA necesita para funcionar offline
const urlsToCache = [
  './',
  './index.html',
  './manifest.webmanifest',
  './CSS/stylesFF.css',
  '../../CSS/styles.css',
  '../../CSS/stylesLight.css',
  '../../LIBS/PersonalIconCollection-v1.0/style.css',
  './JS/Script.js',
  '../../JS/ScriptGlobal.js',
  './API/Datos.json', // ¡Muy importante! Cacheamos los datos.

  // Imágenes del App Shell
  './IMG/IllustracionporUnSplash.svg',
  './IMG/IllustracionporUnSplashLM.svg',
  './IMG/IllustracionOnErrorPorUnDraw.svg',
  './IMG/IllustracionOnErrorPorUnDrawLM.svg',
  '../../IMG/Miniaturas/LogoSolo[FF].svg',

  // Los iconos que creaste en el Paso 1 (ahora con la ruta global)
  '../../IMG/Miniaturas/PWA/FunFact/icon-192x192.png',
  '../../IMG/Miniaturas/PWA/FunFact/icon-512x512.png'
];

// Evento 'install': Se dispara cuando el Service Worker se instala por primera vez.
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  // Espera a que la promesa de 'install' se complete
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Abriendo caché y guardando App Shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        self.skipWaiting(); // Fuerza al SW a activarse inmediatamente
      })
  );
});

// Evento 'fetch': Se dispara cada vez que la app pide un recurso (CSS, JS, imagen, fetch API).
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Estrategia: "Cache First"
    // 1. Intenta encontrar el recurso en la caché
    caches.match(event.request)
      .then((response) => {
        // 2. Si está en caché, lo devuelve.
        //    Si no, intenta buscarlo en la red.
        return response || fetch(event.request);
      })
  );
});

// Evento 'activate': Se dispara cuando el Service Worker se activa (reemplaza a uno antiguo).
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activando...');
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Si la caché no es la actual, la borra.
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Borrando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim()) // Toma control de la página inmediatamente
  );
});