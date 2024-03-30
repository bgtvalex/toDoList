const ver = '10'
const cacheName = 'toDoList-pwa-v-' + ver
const appShellFilesToCache = [
  '/',
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
  '/assets/img/sun.svg',
]
const dataCacheName = 'pwa-data-v-' + ver

self.addEventListener('install', async (e) => {
  console.log('[sw]: installed')
  const cache = await caches.open(cacheName)
  await cache.addAll(appShellFilesToCache)
})

self.addEventListener('activate', (e) => {
  console.log('[sw]: Activated')
})

self.addEventListener('fetch', (event) => {
  console.log('[sw]: Fetch')

  event.respondWith(
    caches
      .match(event.request)
      .then((resp) => {
        return (
          resp ||
          fetch(event.request).then((response) => {
            let responseClone = response.clone()
            caches.open(cacheName).then((cache) => {
              cache.put(event.request, responseClone)
            })

            return response
          })
        )
      })
      .catch(() => {
        return caches.match('/screenshots/screenshot1.jpeg')
      })
  )
})
