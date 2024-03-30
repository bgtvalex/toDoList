function jsonToHtml(t) {
  const pre = document.querySelector('.json')
  const json = JSON.stringify(t, null, 2)
  pre.classList.add('active')
  pre.innerHTML = `<div class="btn-json"> 
  <button class="btn-clear"><img src="./assets/img/img/clear.svg" alt="clear" title="clear"></button>
  <button class="btn-copy"><img src="./assets/img/img/copy.svg" alt="copy" title="copy"></button>
  <a href="" class="btn-download"><img src="./assets/img/img/backup.svg" alt="backup" title="backup"></a>
  </div>
  <pre class="to-copy">${json}</pre>`

  // clear json
  document.querySelector('.btn-clear').addEventListener('click', function () {
    pre.innerHTML = ''
    pre.classList.remove('active')
  })

  // copy json
  document.querySelector('.btn-copy').addEventListener('click', function () {
    // Выборка ссылки с электронной почтой
    var toCopy = document.querySelector('.to-copy')
    var range = document.createRange()
    range.selectNode(toCopy)
    window.getSelection().addRange(range)

    try {
      var successful = document.execCommand('copy')
      var msg = successful ? 'successful' : 'unsuccessful'
      console.log('Copy email command was ' + msg)
      this.classList.add('copied')
    } catch (err) {
      console.log('Oops, unable to copy')
    }

    window.getSelection().removeAllRanges()
  })

  //  backup project
  document
    .querySelector('.btn-download')
    .addEventListener('click', function () {
      this.href =
        'data:application/json;charset=utf-8,' + encodeURIComponent(json)
      this.download = t.title
    })
}

export default jsonToHtml
