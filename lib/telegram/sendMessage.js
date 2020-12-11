const {postMethod} = require('../utils');
const config = require('./config');
const objectToQueryParams = require('../utils/objectToQueryParams');

module.exports = function (options = {chat_id: -1, text: ''}) {
    return postMethod(
        config.telegramHost, `/bot${config.botSecret}/sendMessage${objectToQueryParams(options)}`,
        options
    ).then(result => {
        return result;
    });
}
