import { data } from '../utils/constants/data.js'
import getDateNow from '../utils/helpers/get-time-now.js'

function backup() {
  if (!data.length) return
  const bc = document.querySelector('.backup')
  bc.addEventListener('click', function () {
    let jsonMain = localStorage.getItem('toDoList')
    this.href =
      'data:application/json;charset=utf-8,' + encodeURIComponent(jsonMain)
    this.download = 'toDoList-' + getDateNow() + '.json'
  })
}

export default backup
