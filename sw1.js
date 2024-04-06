let ver = 1
const cacheName = 'toDoList-v-' + ver
const fileToCache = ['/',
'/index.html',
'/app.js',
'/modules/components/blocks.js',
'/modules/components/button.js',
'/modules/components/check-box.js',
'/modules/components/create-item.js',
'/modules/components/form.js',
'/modules/components/headers.js',
'/modules/components/list.js',
'/modules/config/create-form.js',
'/modules/config/dark-mode.js',
'/modules/config/render-data.js',
'/modules/config/start.js',
'/modules/data/backup.js',
'/modules/data/import-data.js',
'/modules/data/localStorage.js',
'/modules/data/move-to-archive.js',
'/modules/utils/constants/data.js',
'/modules/utils/constants/getApp.js',
'/modules/utils/helpers/archive-icon-active.js',
'/modules/utils/helpers/count-all-items.js',
'/modules/utils/helpers/delete-Item.js',
'/modules/utils/helpers/get-find-item.js',
'/modules/utils/helpers/get-time-now.js',
'/modules/utils/helpers/json-to-html.js',
'/modules/utils/helpers/show-archive.js',
'/modules/utils/helpers/show-options.js',
'/modules/utils/helpers/time-format.js',
'/assets/styles/reset.css',
'/assets/styles/main.css',
'/assets/img/archive.svg',
'/assets/img/backup.svg',
'/assets/img/clear.svg',
'/assets/img/import.svg',
'/assets/img/json.svg',
'/assets/img/moon.svg',
'/assets/img/sun.svg',]

self.addEventListener('install', (event) => {
  console.log('SW installed event!')
  event.waitUntil(
    caches.open(cacheName).then( cache => {
      return cache.addAll(fileToCache)
    })
  )
})

self.addEventListener('activate', (event) => {
  console.log('SW activated!')
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          // Return true if you want to remove this cache
        }).map(cacheName => {
          return caches.delete(cacheName)
        })
      )
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request) || fetch(event.request))
})
/* 
Chrome for Developers
https://www.youtube.com/watch?v=wEPeaJgbIxQ&list=PLNYkxOF6rcIB2xHBZ7opgc2Mv009X87Hh&index=7
*/