import { data } from '../utils/constants/data.js'
import { setData } from './localStorage.js'
import showArchive from '../utils/helpers/show-archive.js'
import renderData from '../config/render-data.js'

function moveToArchive(t) {
  if (t?.archive) {
    t.archive = false
  } else {
    t.archive = true
  }
  setData(data)

  // проверка в Архиве или нет
  const isArchive = document.querySelector('.archive.active')
  if (isArchive) {
    showArchive()
  } else {
    renderData(data)
  }
}

export default moveToArchive
