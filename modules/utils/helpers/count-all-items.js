import { data } from '../constants/data.js'

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

export default countAllItems
