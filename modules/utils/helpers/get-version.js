const $ver = document.querySelector('.version')

function getVersion() {
  fetch('/modules/data/version.json')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      let str = `${data[data.length - 1].version}`
      $ver.textContent = str
    })
}

export const version = getVersion
