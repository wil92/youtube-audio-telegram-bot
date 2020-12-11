const post = require('../utils/post');
const config = require('./config');
const objectToQueryParams = require('../utils/objectToQueryParams');

module.exports = function (options = {}, audioPath) {
    return post(
        config.telegramHost,
        `/bot${config.botSecret}/sendAudio${objectToQueryParams(options)}`,
        audioPath
    ).then(result => {
        return result;
    });
}
