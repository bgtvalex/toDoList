import { data } from './modules/utils/constants/data.js'
import renderData from './modules/config/render-data.js'
import start from './modules/config/start.js'
import showOptions from './modules/utils/helpers/show-options.js'
import archiveIconActive from './modules/utils/helpers/archive-icon-active.js'
import importData from './modules/data/import-data.js'
import backup from './modules/data/backup.js'
import { darkMode } from './modules/config/dark-mode.js'
import { version } from './modules/utils/helpers/get-version.js'

window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js')
      .then((reg) => {
        console.log('Registration succeeded. Scope is ' + reg.scope)
      })
      .catch((error) => {
        console.log('Registration failed with ' + error)
      })
  }
})

console.log('data: ', data)

showOptions()
archiveIconActive()
importData()
backup()
darkMode()
version()

if (data.length === 0) {
  start()
} else {
  renderData(data)
}
