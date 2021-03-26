const { postMethod } = require('../utils')
const config = require('./config')
const objectToQueryParams = require('../utils/objectToQueryParams')

module.exports = async function (options = { chat_id: -1, text: '' }) {
  return postMethod(
    config.telegramHost, `/bot${config.botSecret}/sendMessage${objectToQueryParams({...options, text: null})}`,
    options,
    { text: options.text }
  ).then(result => {
    return result
  })
}
