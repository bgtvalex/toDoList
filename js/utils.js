/* U T I L S */

// L O C A L S T O R A G E
function getLocalStorage() {
  return JSON.parse(localStorage.getItem('toDoList'))
}

function setLocalStorage(data) {
  localStorage.setItem('toDoList', JSON.stringify(data))
}

// D A T E
function getDateNow(t) {
  let d = ''
  if (t > 0) {
    d = new Date(t)
  } else {
    d = new Date()
  }
  let date =
    pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear()
  return date
}

function pad(val) {
  return val < 10 ? '0' + val : val
}

function getFindItem(t) {
  for (let project of data) {
    if (project.id === t) {
      return project
    }

    for (let task of project.items) {
      if (task.id === t) {
        return task
      }

      for (let item of task.items) {
        if (item.id === t) {
          return item
        }

        for (let subItem of item.items) {
          if (subItem.id === t) {
            return subItem
          }

          for (let subSubItem of subItem.items) {
            if (subSubItem.id === t) {
              return subSubItem
            }
          }
        }
      }
    }
  }
}

function deleteItem(t) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === t) {
      data.splice(i, 1)
      setLocalStorage(data)
    }

    for (let project of data) {
      for (let i = 0; i < project.items.length; i++) {
        if (project.items[i].id === t) {
          project.items.splice(i, 1)
          setLocalStorage(data)
        }

        for (let task of project.items) {
          for (let i = 0; i < task.items.length; i++) {
            if (task.items[i].id === t) {
              task.items.splice(i, 1)
              setLocalStorage(data)
            }
          }

          for (let item of task.items) {
            for (let i = 0; i < item.items.length; i++) {
              if (item.items[i].id === t) {
                item.items.splice(i, 1)
                setLocalStorage(data)
              }
            }

            for (let subitem of item.items) {
              for (let i = 0; i < subitem.items.length; i++) {
                if (subitem.items[i].id === t) {
                  subitem.items.splice(i, 1)
                  setLocalStorage(data)
                }
              }
            }
          }
        }
      }
    }
  }
}

function countAllItems(t) {
  let count = 0
  let countChecked = 0
  // project
  for (let project of data) {
    if (project.id === t) {
      count += project.items.length

      for (let checked of project.items) {
        if (checked.status === 'done') {
          countChecked++
        }
      }
      // task
      for (let task of project.items) {
        count += task.items.length

        for (let checked of task.items) {
          if (checked.status === 'done') {
            countChecked++
          }
        }
        // item
        for (let item of task.items) {
          count += item.items.length

          for (let checked of item.items) {
            if (checked.status === 'done') {
              countChecked++
            }
          }
          // subitem
          for (let subitem of item.items) {
            count += subitem.items.length

            for (let checked of subitem.items) {
              if (checked.status === 'done') {
                countChecked++
              }
            }
          }
        }
      }
    }
  }
  return { count: count, countChecked: countChecked }
}

function jsonToHtml(t) {
  const pre = document.querySelector('.json')
  const json = JSON.stringify(t, null, 2)
  pre.classList.add('active')
  pre.innerHTML = `<div class="btn-json"> 
  <button class="btn-clear">clear JSON</button>
  <button class="btn-copy">copy JSON</button>
  <a href="" class="btn-download">backup</a>
  </div>
  <pre class="to-copy">${json}</pre>`

  // clear json
  document.querySelector('.btn-clear').addEventListener('click', function () {
    pre.innerHTML = ''
    pre.classList.remove('active')
  })

  // copy json
  document.querySelector('.btn-copy').addEventListener('click', function () {
    // Выборка ссылки с электронной почтой
    var toCopy = document.querySelector('.to-copy')
    var range = document.createRange()
    range.selectNode(toCopy)
    window.getSelection().addRange(range)

    try {
      var successful = document.execCommand('copy')
      var msg = successful ? 'successful' : 'unsuccessful'
      console.log('Copy email command was ' + msg)
      this.textContent = 'copied'
      this.classList.add('copied')
    } catch (err) {
      console.log('Oops, unable to copy')
    }

    window.getSelection().removeAllRanges()
  })

  //  backup
  document
    .querySelector('.btn-download')
    .addEventListener('click', function () {
      this.href =
        'data:application/json;charset=utf-8,' + encodeURIComponent(json)
      this.download = 'file name'
    })
}

function backup() {
  document.querySelector('.backup').addEventListener('click', function () {
    let jsonMain = localStorage.getItem('toDoList')
    this.href =
      'data:application/json;charset=utf-8,' + encodeURIComponent(jsonMain)
    this.download = 'mainJson'
  })
}
backup()

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

        // console.log('array', array)
      }
      reader.onerror = function () {
        console.log('error', reader.error)
      }
    })
}
importJson()

function importToData(a) {
  if (a.type === 'project') {
    for (let project of data) {
      if (project.id === a.id) {
        alert('Проект уже есть')
        return
      }
    }
    data.push(a)
  } else {
    // for (let project of a) {
    //   for (let lsProject of data) {
    //     if (project.id === lsProject.id) {
    //       console.log('есть совпадение!')
    //       continue
    //     }
    //   }
    // }

    // data = data.concat(a).unique()
    data = Array.from(new Set(data.concat(a)))

    const mergedArray = [...data, ...a]
    data = [...new Set([...mergedArray])]
  }

  setLocalStorage(data)
  renderData(data)
}

// D E V

function addField(field, value) {
  d = getLocalStorage()
  d.forEach((item) => {
    item[field] = value
  })
  for (task of d) {
    task.items.forEach((item) => {
      item[field] = value
    })

    for (item of task.items) {
      item.items.forEach((item) => {
        item[field] = value
      })
    }
  }
  setLocalStorage(d)
}

function changeFieldValue(field, find, change) {
  d = getLocalStorage()
  d.forEach((item) => {
    if (item[field] === find) item[field] = change
  })
  for (task of d) {
    if (task[field] === find) task[field] = change

    for (item of task.items) {
      if (item[field] === find) item[field] = change
    }
  }
  setLocalStorage(d)
}

// changeFieldValue('start', '02.06.2024', '08.02.2024')
