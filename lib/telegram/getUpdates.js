const get = require('../utils/get');
const config = require('./config');
const objectToQueryParams = require('../utils/objectToQueryParams');

module.exports = function (options = {}) {
    return get(config.telegramHost, `/bot${config.botSecret}/getUpdates${objectToQueryParams(options)}`).then(result => {
        return result;
    });
}
