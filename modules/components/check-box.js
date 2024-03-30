export function createCheckBox() {
  let check = document.createElement('input')
  check.classList.add('check')
  check.setAttribute('type', 'checkbox')

  return check
}