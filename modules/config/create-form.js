import { data } from '../utils/constants/data.js'
import { setData } from '../data/localStorage.js'
import { form, input } from '../components/form.js'
import { createBtn } from '../components/button.js'
import getDateNow from '../utils/helpers/get-time-now.js'
import renderData from './render-data.js'
import getFindItem from '../utils/helpers/get-find-item.js'

function createForm(name = undefined, id) {
  let forms = document.querySelectorAll('.form')
  if (forms.length > 0) {
    for (form of forms) {
      form.style.display = 'none'
    }
  }

  let time = Date.now()
  let type = ''
  if (name === undefined) {
    type = 'project'
  } else {
    switch (name) {
      case 'project':
        type = 'task'
        break
      case 'task':
        type = 'item'
        break
      case 'item':
        type = 'sub-item'
        break
      case 'sub-item':
        type = 'sub-sub-item'
        break
    }
  }

  let f = form('form'),
    inp = input('item', type),
    btn = createBtn('add', 'add')

  f.append(inp)
  f.append(btn)
  app.appendChild(f)
  inp.focus()

  f.addEventListener('submit', (e) => {
    e.preventDefault()

    if (inp.value == '') {
      f.remove()
    } else {
      let objItem = {
        id: time.toString(),
        type: type,
        created: time,
        start: '',
        finish: '',
        title: inp.value,
        status: 'in process',
        tree: 'open',
        items: [],
      }

      if (id === undefined) {
        console.log('finish: ', objItem.finish)
        data.push(objItem)
      } else {
        let findItem = getFindItem(id)
        findItem.items.push(objItem)
      }
      setData(data)
      renderData(data)
      f.remove()
    }
  })

  return f
}

export const cForm = createForm
