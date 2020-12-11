const {get} = require('../utils');
const config = require('./config');
const objectToQueryParams = require('../utils/objectToQueryParams');

module.exports = function (options = {chat_id: -1, message_id: -1}) {
    return get(config.telegramHost, `/bot${config.botSecret}/deleteMessage${objectToQueryParams(options)}`)
        .then(result => {
            console.log(result);
            return result;
        });
}
