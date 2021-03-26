const arrayToQuery = require('./arrayToQuery')

module.exports = function (obj = {}) {
  let result = ''
  if (obj) {
    Object.keys(obj).forEach((key) => {
      let val = obj[key]
      if (val !== null && val !== undefined) {
        if (Array.isArray(val)) {
          val = arrayToQuery(val)
        }
        result += `&${key}=${val}`
      }
    })
  }
  result = result.replace(/^&/, '?')
  return result
}
