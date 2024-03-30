import renderData from '../config/render-data.js'
import { data } from '../utils/constants/data.js'
import { setData, getData } from './localStorage.js'

// import Data
function importData() {
  function importJson() {
    document
      .querySelector('.input-file')
      .addEventListener('change', function (e) {
        let fileJson = this.files[0]
        let reader = new FileReader()
        reader.readAsText(fileJson)
        reader.onload = function () {
          const array = JSON.parse(reader.result)
          importToData(array)
        }
        reader.onerror = function () {
          console.log('error', reader.error)
        }
      })
  }
  importJson()

  function importToData(arr) {
    if (arr.type === 'project') {
      for (let project of data) {
        if (project.id === arr.id) {
          alert('Проект уже есть')
          return
        }
      }
      data.push(arr)

      setData(data)
      renderData(data)
    } else {
      setData(arr)
      renderData(getData())
    }
  }
}

export default importData
