/* E L E M E N T S */

// div
function createDiv(cl, id, itemId) {
  let div = document.createElement('div')
  if (itemId) {
    div.id = itemId
  } else if (id) {
    div.id = Date.now()
  }
  div.classList.add(cl)

  return div
}

// title h2
function createH2(cl, str) {
  let h2 = document.createElement('h2')
  h2.classList.add(cl)
  // console.log('str', str)
  h2.textContent = str

  return h2
}

// title h3
function createH3(cl, str) {
  let h3 = document.createElement('h3')
  h3.classList.add(cl)
  h3.textContent = str

  return h3
}

// create checkBox
function createCheckBox() {
  let check = document.createElement('input')
  check.classList.add('check')
  check.setAttribute('type', 'checkbox')

  return check
}

// create form
function createForm(cl) {
  let form = document.createElement('form')
  form.id = 'form'
  form.name = 'form'
  form.classList.add(cl)
  form.autocomplete = 'off'

  return form
}

function createFormTitle(title, id) {
  let form = document.createElement('form')
  form.id = 'form'
  form.name = 'form'
  form.classList.add('title')
  form.autocomplete = 'off'
  let inp = createInput('Title')
  let btn = createBtn('title', 'Ok')

  inp.value = title

  form.addEventListener('submit', function (e) {
    e.preventDefault()
    let obj = (getFindItem(id).title = inp.value)
    form.remove()
    setLocalStorage(data)
    renderData(data)
  })

  form.append(inp)
  form.append(btn)
  inp.focus()

  return form
}

// create input
function createInput(holder) {
  let inp = document.createElement('input')
  inp.classList.add('inp')
  inp.name = 'title'
  inp.setAttribute('placeholder', holder)

  return inp
}

// create button
function createBtn(cl, title) {
  let btn = document.createElement('button')
  btn.classList.add(`btn-${cl}`)
  btn.textContent = title
  btn.setAttribute('type', 'submit')

  return btn
}

// L I S T

// create ul
function createUl(cl, tree) {
  let ul = document.createElement('ul')
  ul.classList.add(cl)
  if (tree !== undefined) {
    ul.classList.add(tree)
  }

  return ul
}

// create li
function createLi(obj) {
  let li = document.createElement('li')
  li.classList.add(obj.type + '-wrapper')
  if (obj.status === 'done') {
    li.classList.add('checked')
  }
  li.id = obj.id

  return li
}

function createSup(obj) {
  let sup = document.createElement('sup')
  sup.title = 'to JSON'
  sup.classList.add('a-json')

  sup.textContent = 'JSON'
  return sup
}
