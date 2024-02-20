/* T A S K */

// F O R M
function createFormItem(name, id) {
  let forms = document.querySelectorAll('.form')
  if (forms.length > 0) {
    for (f of forms) {
      f.style.display = 'none'
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

  let form = createForm('form'),
    inp = createInput('item', type),
    btn = createBtn('add', 'add')

  form.append(inp)
  form.append(btn)
  app.appendChild(form)
  inp.focus()

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (inp.value == '') {
      form.remove()
    } else {
      let objItem = {
        type: type,
        id: time.toString(),
        title: inp.value,
        status: 'in process',
        start: getDateNow(time),
        tree: 'open',
        items: [],
      }

      if (id === undefined) {
        data.push(objItem)
      } else {
        let findItem = getFindItem(id)
        findItem.items.push(objItem)
      }
      setLocalStorage(data)
      renderData(data)
      form.remove()
    }
  })

  return form
}

// I T E M
function createItem(obj) {
  let taskItem = createLi(obj),
    task = createDiv(obj.type),
    check = createCheckBox(),
    title = createH3(obj.type + '-title', obj.title),
    btnTask = createBtn('task', '+'),
    btnMinus = createBtn('minus', '-'),
    countItems = document.createElement('span'),
    doneDate = document.createElement('span'),
    startDate = document.createElement('span'),
    json = createSup(),
    img = ''
  if (obj.tree === 'open') {
    img = '▼'
  } else {
    img = '▶'
  }
  const btnHasChild = createBtn('has-child', img)

  countItems.classList.add('date')
  doneDate.classList.add('date')
  startDate.classList.add('date')

  startDate.textContent = obj.start

  if (obj.items.length > 0) {
    task.append(btnHasChild)
  }
  if (obj.status === 'done') {
    check.checked = true
  }
  if (obj.finish !== '') {
    doneDate.textContent = obj.finish
  }
  if (obj.items.length > 0) {
    if (obj.type === 'project') {
      const { count, countChecked } = countAllItems(obj.id)
      let per = Math.round((countChecked / count) * 100)
      countItems.textContent = ` (${countChecked}/${count} - ${per}%)`
    } else {
      countItems.textContent = ` (${obj.items.length})`
    }
  }
  task.append(check)
  task.append(title)
  if (obj.type !== 'sub-sub-item') {
    task.append(countItems)
    task.append(btnTask)
    task.append(btnMinus)
  }
  task.append(startDate)
  task.append(doneDate)
  task.append(json)
  taskItem.append(task)

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
    setLocalStorage(data)
  })

  check.addEventListener('change', function () {
    let itemId = this.parentNode.parentNode.id
    if (this.checked) {
      getFindItem(itemId).status = 'done'
      getFindItem(itemId).finish = getDateNow()

      taskItem.classList.add('checked')
      doneDate.textContent = getDateNow()
    } else {
      getFindItem(itemId).status = 'in process'
      getFindItem(itemId).finish = ''
      taskItem.classList.remove('checked')
      doneDate.textContent = ''
    }
    setLocalStorage(data)
    renderData(data)
  })

  btnTask.addEventListener('click', function () {
    let parentType = this.parentNode.className
    let parentParentId = this.parentNode.parentNode.id
    let form = createFormItem(parentType, parentParentId)
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

  return taskItem
}
