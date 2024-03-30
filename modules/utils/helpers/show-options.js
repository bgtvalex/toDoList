function showOptions() {
  const $opt = document.querySelector('.options')
  
  $opt.addEventListener('click', function () {
    document.querySelector('.backup-wrapper').classList.toggle('active')
    this.classList.toggle('active')
  })
}

export default showOptions
