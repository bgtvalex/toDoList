import { data } from '../constants/data.js'
import createItem from '../../components/create-item.js'

function showArchive() {
  let count = 0
  document.querySelector('.project-list').innerHTML = ''

  data.map((project) => {
    if (project.archive) {
      const proj = createItem(project)

      document.querySelector('.project-list').append(proj)
      count++
    }
  })
  if (!count) {
    document.querySelector('.project-list').innerHTML =
      '<h3>Проектов в архиве нет.</h3>'
  }
}

export default showArchive
