const fs = require('fs');
const FormData = require('form-data');

let CHUNK_SIZE = 1 * 1024 * 1024, // 1MB
    buffer = Buffer.alloc(CHUNK_SIZE)

module.exports = function (host, path, audioPath) {
    const http = require('https');

    const form = new FormData();
    form.append('audio', fs.createReadStream(audioPath, {highWaterMark: CHUNK_SIZE}));
    const options = {
        host,
        path,
        method: "POST",
        headers: form.getHeaders()
    };

    const promise = new Promise((resolve, reject) => {
        callback = function (response) {
            let str = '';

            //another chunk of data has been received, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been received, so we just print it out here
            response.on('end', function () {
                try {
                    str = JSON.parse(str);
                } catch (ignore) {
                }
                resolve(str);
            });

            response.on('error', function (err) {
                reject(err);
            });
        }
    });

    form.pipe(http.request(options, callback));

    return promise;
}
