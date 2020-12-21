module.exports = function (array = []) {
  return '[' + array.reduce((previousValue, currentValue, currentIndex) => {
    return previousValue + (currentIndex ? ',' : '') + `"${currentValue}"`
  }, '') + ']'
}
