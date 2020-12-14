const fs = require('fs');

const {postMethod} = require('../utils');
const config = require('./config');
const objectToQueryParams = require('../utils/objectToQueryParams');

// 2MB
const MB = 1024 * 1024;
const CHUNK_SIZE = 2 * MB;

function toMB(sizeInBytes) {
    return Math.round(sizeInBytes / MB * 1000) / 1000;
}

function fileSize(fileName) {
    const stats = fs.statSync(fileName);
    return stats ? stats.size : 0;
}

module.exports = function (options = {}, audioPath) {
    return postMethod(
        config.telegramHost,
        `/bot${config.botSecret}/sendAudio${objectToQueryParams(options)}`,
        {
            audio: fs.createReadStream(audioPath, {highWaterMark: CHUNK_SIZE}),
            title: `${toMB(fileSize(audioPath))}MB. ${audioPath}`
        });
}
