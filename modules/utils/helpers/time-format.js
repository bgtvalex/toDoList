import getDateNow from './get-time-now.js'

const timeFormat = {
  toTimeStamp: (t) => {
    if (t > 0) {
      return t
    } else {
      if (!t) return
      let arr = t?.split('.')
      let d = new Date(arr[2], arr[1] - 1, arr[0]).getTime()
      // console.log('d: ', d)
      return d
    }
  },
  outTimeStamp: (t) => {
    if (t > 0) {
      return new Date(t).toLocaleDateString()
    } else {
      return t
    }
  },
}

export const toTimeStamp = timeFormat.toTimeStamp
export const outTimeStamp = timeFormat.outTimeStamp
