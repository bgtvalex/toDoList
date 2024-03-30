function getDateNow(t) {
  let d = ''
  if (t > 0) {
    d = new Date(t)
  } else {
    d = new Date()
  }
    
  return pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear()
}

function pad(val) {
  return val < 10 ? '0' + val : val
}

export default getDateNow