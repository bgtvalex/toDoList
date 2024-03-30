import showArchive from './show-archive.js'
import renderData from '../../config/render-data.js'
import { data } from '../constants/data.js'

function archiveIconActive() {
  let countArchive = 0
  if (!data.length) return
  document.querySelector('.archive').addEventListener('click', function () {
    this.classList.toggle('active')
    if (countArchive % 2 == 0) {
      showArchive()
    } else {
      renderData(data)
    }
    countArchive++
  })
}

export default archiveIconActive
