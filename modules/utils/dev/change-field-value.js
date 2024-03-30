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

export default changeFieldValue