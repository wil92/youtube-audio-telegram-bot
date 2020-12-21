const fs = require('fs')
const path = require('path')

const { postMethod, toReadableSize } = require('../utils')
const config = require('./config')
const objectToQueryParams = require('../utils/objectToQueryParams')

// 2MB
const CHUNK_SIZE = 2 * 1024 * 1024

function fileSize (fileName) {
  const stats = fs.statSync(fileName)
  return stats ? stats.size : 0
}

module.exports = function (options = {}, audioPath) {
  return postMethod(
    config.telegramHost,
        `/bot${config.botSecret}/sendAudio${objectToQueryParams(options)}`,
        {
          audio: fs.createReadStream(audioPath, { highWaterMark: CHUNK_SIZE }),
          title: `${toReadableSize(fileSize(audioPath))}. ${path.basename(audioPath)}`
        })
}
