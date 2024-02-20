function getData() {
  if (localStorage.getItem('toDoList')) {
    return JSON.parse(localStorage.getItem('toDoList'))
  } else {
    return 'str'
  }
}

function setDate(obj) {
  localStorage.setItem('toDoList', JSON.stringify(obj))
}
