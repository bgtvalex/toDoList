import renderData from '../config/render-data.js'
import { setData } from '../data/localStorage.js'
import { data } from '../utils/constants/data.js'
import getFindItem from '../utils/helpers/get-find-item.js'
import getDateNow from '../utils/helpers/get-time-now.js'
import { outTimeStamp, toTimeStamp } from '../utils/helpers/time-format.js'

const blocks = {
  createDiv: (cl, id, itemId) => {
    let div = document.createElement('div')
    if (itemId) {
      div.id = itemId
    } else if (id) {
      div.id = Date.now()
    }
    div.classList.add(cl)

    return div
  },
  createSup: (title) => {
    let sup = document.createElement('sup')
    sup.title = `to ${title.toUpperCase()}`
    sup.classList.add(`a-${title}`)

    sup.textContent = title.toUpperCase()
    sup.innerHTML = `<img src="./assets/img/img/${title}.svg" alt="${title}" title="${title}">`

    return sup
  },
  createSpan: (obj, type) => {
    const span = document.createElement('span')
    span.classList.add('date')
    span.classList.add(type)

    span.textContent = obj[type] ? outTimeStamp(obj[type]) : '-'

    const dater = document.createElement('div')
    dater.classList.add('dater')
    dater.innerHTML = `
		<p>${type}</p>
		`
    span.prepend(dater)

    span.addEventListener('mouseover', () => {
      dater.classList.add('active')
    })

    span.addEventListener('mouseleave', () => {
      dater.classList.remove('active')
    })

    span.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      let t = getFindItem(obj.id)
      switch (type) {
        case 'created':
          t.created = toTimeStamp(prompt(type, outTimeStamp(t[type])))
          break
        case 'start':
          t.start = toTimeStamp(prompt(type, outTimeStamp(t[type])))
          break
        case 'finish':
          t.finish = toTimeStamp(prompt(type, outTimeStamp(t[type])))
          break
      }
      setData(data)
      renderData(data)
    })

    span.addEventListener('click', () => {
      let t = getFindItem(obj.id)
      switch (type) {
        case 'created':
          t.start = Date.now()
          break
        case 'start':
          t.start = ''
          break
      }
      setData(data)
      renderData(data)
    })

    return span
  },
}

export const createDiv = blocks.createDiv
export const createSpan = blocks.createSpan
export const createSup = blocks.createSup
