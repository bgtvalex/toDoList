const storage = {
  getData: () => {
    console.log('getlocalStorage')
    if (localStorage.getItem('toDoList')) {
      return JSON.parse(localStorage.getItem('toDoList'))
    } else {
      return []
    }
  },
  setData: (obj) => {
    console.log('setLocalStorage')
    localStorage.setItem('toDoList', JSON.stringify(obj))
  },
}

export const getData = storage.getData
export const setData = storage.setData

// L O C A L S T O R A G E
// function getLocalStorage() {
//   return JSON.parse(localStorage.getItem('toDoList'))
// }

// function setLocalStorage(data) {
//   localStorage.setItem('toDoList', JSON.stringify(data))
// }
