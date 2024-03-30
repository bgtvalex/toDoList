import { createBtn } from './button.js'
import getFindItem from '../utils/helpers/get-find-item.js'
import { setData } from '../data/localStorage.js'
import { data } from '../utils/constants/data.js'
import renderData from '../config/render-data.js'

const Form = {
  createForm: (cl) => {
    let f = document.createElement('form')
    f.id = 'form'
    f.name = 'form'
    f.classList.add(cl)
    f.autocomplete = 'off'

    return f
  },

  createFormTitle: (title, id) => {
    let f = document.createElement('form')
    f.id = 'form'
    f.name = 'form'
    f.classList.add('title')
    f.autocomplete = 'off'
    let inp = Form.createInput('Title')
    let btn = createBtn('title', 'Ok')

    inp.value = title

    f.addEventListener('submit', function (e) {
      e.preventDefault()
      let obj = (getFindItem(id).title = inp.value)
      f.remove()
      setData(data)
      renderData(data)
    })

    f.append(inp)
    f.append(btn)
    inp.focus()

    return f
  },

  createInput: (holder) => {
    let inp = document.createElement('input')
    inp.classList.add('inp')
    inp.name = 'title'
    inp.setAttribute('placeholder', holder)

    return inp
  },
}

export const form = Form.createForm
export const createFormTitle = Form.createFormTitle
export const input = Form.createInput
