import { createBtn } from '../components/button.js'
import { $app } from '../utils/constants/getApp.js'
import { cForm } from './create-form.js'

function start(data) {
  const btn = createBtn('start', '+')
  $app.append(btn)
  btn.addEventListener('click', () => {
    $app.append(cForm(data))
  })
}

export default start
