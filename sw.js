const staticCachename = "site-static-v1";
const assets = [
  "/",
  "/index.html",
  "/pages/search.html",
  "/asset/js/index.js",
  "/asset/js/search.js",
  "/asset/css/style.css",
  "/asset/img/icons/icon.png",
  "/asset/img/icons/icon100x100.png",
  "/asset/img/icons/icon140x140.png",
  "/asset/img/icons/icon192x192.png",
  "/asset/img/icons/icon512x512.png",
  "/asset/img/icons/icon96x96.png",
  "/asset/img/cloud.svg",
  "/asset/img/girltime.svg",
  "/asset/img/mancloud.svg",
  "/asset/img/menu.png",
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap",
];

// step TWO
//install event for service worker
self.addEventListener("install", (evt) => {
  // console.log('service worker installed')
  //caching asset when service worker is install
  evt.waitUntil(
    caches.open(staticCachename).then((cache) => {
      //    console.log('caching shell asset')
      cache.addAll(assets);
    })
  );
});

//Next activate service worker

self.addEventListener("activate", (evt) => {
  // console.log('service worker actived ')

  //delete old cache here
  evt.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys)
      return Promise.all(
        keys
          .filter((key) => key !== staticCachename) //new array of keys/ caches to delete
          .map((key) => caches.delete(key)) //deleting each
      );
    })
  );
});

//fetch event

self.addEventListener("fetch", (evt) => {
  // console.log('fetch event', evt)
  //check if request is inside cache;
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return cacheRes || fetch(evt.request); //if its in cache return cacheRes else proceed with inititial fetch
    })
  );
});
