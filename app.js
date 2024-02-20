/* VARIABLES */
let app = document.getElementById('app'),
  data = getLocalStorage()

console.log('data', data)

// D A T A  =>  H T M L
if (data !== null) {
  renderData(data)
} else {
  console.log('start')
  start()
  data = []
}

function start() {
  let btn = createBtn('start', '+')
  app.append(btn)
  btn.addEventListener('click', () => {
    app.append(createFormItem())
  })
}
