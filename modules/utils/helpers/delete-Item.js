import { data } from '../constants/data.js'
import { setData } from '../../data/localStorage.js'

function deleteItem(t) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === t) {
      data.splice(i, 1)
      setData(data)
    }

    for (let project of data) {
      for (let i = 0; i < project.items.length; i++) {
        if (project.items[i].id === t) {
          project.items.splice(i, 1)
          setData(data)
        }

        for (let task of project.items) {
          for (let i = 0; i < task.items.length; i++) {
            if (task.items[i].id === t) {
              task.items.splice(i, 1)
              setData(data)
            }
          }

          for (let item of task.items) {
            for (let i = 0; i < item.items.length; i++) {
              if (item.items[i].id === t) {
                item.items.splice(i, 1)
                setData(data)
              }
            }

            for (let subitem of item.items) {
              for (let i = 0; i < subitem.items.length; i++) {
                if (subitem.items[i].id === t) {
                  subitem.items.splice(i, 1)
                  setData(data)
                }
              }
            }
          }
        }
      }
    }
  }
}

export default deleteItem
