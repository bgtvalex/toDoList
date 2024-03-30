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

export default addField