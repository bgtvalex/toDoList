import { createUl } from '../components/list.js'
import start from './start.js'
import createItem from '../components/create-item.js'

function renderData(data) {
  if (data) {
    let projectList = document.querySelector('.project-list')
    let btnStart = document.querySelector('.btn-start')

    if (projectList) {
      projectList.remove()
    }

    if (btnStart) {
      btnStart.remove()
    }
    let ulProject = createUl('project-list')
    start()

    // PROJECT
    data.map((project) => {
      if (project?.archive) return
      let projectWrapper = createItem(project)

      // TASK
      if (project.items?.length !== 0) {
        let ulTask = createUl('list', project.tree)
        project.items?.map((task) => {
          let taskWrapper = createItem(task)

          // ITEM
          if (task.items.length !== 0) {
            let ulItem = createUl('list', task.tree)
            task.items.map((item) => {
              let itemWrapper = createItem(item)

              // SUB-ITEM
              if (item.items !== 0) {
                let ulSubItem = createUl('list', item.tree)
                item.items.map((subitem) => {
                  let subItemWrapper = createItem(subitem)

                  // sub-sub-item
                  if (subitem.items !== 0) {
                    let ulSubSubItem = createUl('list', subitem.tree)
                    subitem.items.map((subsubitem) => {
                      let subSubItemWrapper = createItem(subsubitem)

                      ulSubSubItem.append(subSubItemWrapper)
                    })
                    // console.log('ulSubSubItem:', ulSubSubItem)
                    subItemWrapper.append(ulSubSubItem)
                  }
                  ulSubItem.append(subItemWrapper)
                })
                itemWrapper.append(ulSubItem)
              }
              ulItem.append(itemWrapper)
            })
            taskWrapper.append(ulItem)
          }
          ulTask.append(taskWrapper)
        })
        projectWrapper.append(ulTask)
      }
      ulProject.append(projectWrapper)
      app.append(ulProject)
    })
  }
}

export default renderData
