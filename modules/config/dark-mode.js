export function darkMode() {
  const $el = document.querySelector('.dark')
  const $meta = document.querySelector('meta[name="theme-color"]')
  const $img = document.querySelector('.dark img')
  const ls = JSON.parse(localStorage.getItem('toDoListTheme'))

  if (ls === 'dark') {
    document.body.classList.add('dark')
    $img.setAttribute('src', `./assets/img/img/sun.svg`)
    $meta.content = '#00391d'
  } else {
    document.body.classList.remove('dark')
    $img.setAttribute('src', `./assets/img/img/moon.svg`)
    $meta.content = '#f0e9b3'
  }

  $el.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark')

    if (isDark) {
      $img.setAttribute('src', `./assets/img/img/sun.svg`)
      $meta.content = '#00391d'
      localStorage.setItem('toDoListTheme', JSON.stringify('dark'))
    } else {
      $img.setAttribute('src', `./assets/img/img/moon.svg`)
      $meta.content = '#f0e9b3'
      localStorage.setItem('toDoListTheme', JSON.stringify('light'))
    }
  })
}
