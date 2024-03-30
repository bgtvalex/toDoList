import { data } from '../constants/data.js'

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

export default getFindItem
