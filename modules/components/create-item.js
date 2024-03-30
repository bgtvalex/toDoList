import { data } from '../utils/constants/data.js'
import { createLi } from './list.js'
import { createDiv, createSpan, createSup } from './blocks.js'
import { createCheckBox } from './check-box.js'
import { createH3 } from './headers.js'
import { createBtn } from './button.js'
import { createFormTitle } from './form.js'
import deleteItem from '../utils/helpers/delete-Item.js'
import renderData from '../config/render-data.js'
import getFindItem from '../utils/helpers/get-find-item.js'
import getDateNow from '../utils/helpers/get-time-now.js'
import { setData } from '../data/localStorage.js'
import { cForm } from '../config/create-form.js'
import countAllItems from '../utils/helpers/count-all-items.js'
import jsonToHtml from '../utils/helpers/json-to-html.js'
import moveToArchive from '../data/move-to-archive.js'
import { outTimeStamp } from '../utils/helpers/time-format.js'

function createItem(obj) {
  let taskItem = createLi(obj),
    task = createDiv(obj.type),
    check = createCheckBox(),
    title = createH3(obj.type + '-title', obj.title),
    btnTask = createBtn('task', '+'),
    btnMinus = createBtn('minus', '-'),
    countItems = document.createElement('span'),
    // date
    createDate = createSpan(obj, 'created'),
    startDate = createSpan(obj, 'start'),
    finishDate = createSpan(obj, 'finish'),
    json = createSup('json'),
    archive = createSup('archive'),
    img = ''
  countItems.classList.add('date')
  if (obj.tree === 'open') {
    img = '▼'
  } else {
    img = '▶'
  }
  const btnHasChild = createBtn('has-child', img)

  if (obj.items?.length > 0) {
    task.append(btnHasChild)
  }
  if (obj.status === 'done') {
    check.checked = true
  }
  if (obj.items?.length > 0) {
    if (obj.type === 'project') {
      const { count, countChecked } = countAllItems(obj.id)
      let per = Math.round((countChecked / count) * 100)
      countItems.innerHTML = ` (${countChecked}/${count} - <b>${per}%</b>)`
    } else {
      countItems.textContent = ` (${obj.items.length})`
    }
  }
  task.append(check)
  task.append(title)
  task.append(createDate)
  task.append(startDate)
  task.append(finishDate)
  if (obj.type !== 'sub-sub-item') {
    task.append(countItems)
  }
  task.append(json)
  if (obj.type === 'project') {
    task.append(archive)
  }
  taskItem.append(task)
  if (obj.type !== 'sub-sub-item') {
    task.append(btnTask)
  }
  task.append(btnMinus)

  let count = 0
  title.addEventListener('click', function () {
    if (count === 0) {
      this.append(createFormTitle(this.textContent, obj.id))

      count++
    }
  })

  btnHasChild.addEventListener('click', function () {
    let ul = this.parentNode.parentNode.querySelector('.list')
    let itemId = this.parentNode.parentNode.id
    if (ul.classList.contains('open')) {
      getFindItem(itemId).tree = 'close'
      ul.classList.remove('open')
      this.textContent = '▶'
    } else {
      getFindItem(itemId).tree = 'open'
      ul.classList.add('open')
      this.textContent = '▼'
    }
    setData(data)
  })

  check.addEventListener('change', function () {
    let itemId = this.parentNode.parentNode.id
    if (this.checked) {
      // const dateNow = getDateNow()
      const dateNow = Date.now()
      getFindItem(itemId).status = 'done'
      getFindItem(itemId).finish = dateNow

      taskItem.classList.add('checked')
      finishDate.textContent = outTimeStamp(dateNow)
    } else {
      getFindItem(itemId).status = 'in process'
      getFindItem(itemId).finish = ''
      taskItem.classList.remove('checked')
      finishDate.textContent = ''
    }
    setData(data)
    renderData(data)
  })

  btnTask.addEventListener('click', function () {
    let parentType = this.parentNode.className
    let parentParentId = this.parentNode.parentNode.id
    let form = cForm(parentType, parentParentId)
    taskItem.append(form)
  })

  btnMinus.addEventListener('click', function (e) {
    let msg = `Remove? ${obj.title}`
    if (confirm(msg)) {
      deleteItem(obj.id)
      renderData(data)
    }
  })

  json.addEventListener('click', function () {
    jsonToHtml(obj)
  })

  archive.addEventListener('click', function () {
    moveToArchive(obj)
  })

  return taskItem
}

export default createItem
