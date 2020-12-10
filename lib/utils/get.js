module.exports = function (host, path) {
    const http = require('https');

    //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
    const options = {host, path};

    const promise = new Promise((resolve, reject) => {
        callback = function(response) {
            let str = '';

            //another chunk of data has been received, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been received, so we just print it out here
            response.on('end', function () {
                try {
                    str = JSON.parse(str);
                } catch (ignore) {}
                resolve(str);
            });

            response.on('error', function(err) {
                reject(err);
            });
        }
    });

    http.request(options, callback).end();

    return promise;
}
