let cacheName = "abc";
let urlToBeLoad = [
  './restaurant.html',
  './index.html',
  './css/styles.css',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js',
  './'
];
this.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName)
    .then((ca) => {
      ca.addAll(urlToBeLoad)
    })
  )
})

this.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.open(cacheName)
    .then((ac) => {
      return ac.match(e.request)
        .then((result) => {
          return result || fetch(e.request)
            .then((res) => {
              ac.put(e.request, res.clone())
              return res;
            })
        })
    })
  )
})
self.addEventListener('activate', function(event) {
    var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];
    event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
