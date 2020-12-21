module.exports = function (value = '') {
  return value.trim().replace(/\.\w+$/, '.mp3')
}
