const config = require('../telegram/config');

module.exports = function (value = '') {
  let result = config.regexpYoutubeLink.exec(value);
  return !!(result && result[0]);
}
