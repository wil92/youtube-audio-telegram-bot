import {IncomingMessage} from "http";

export async function deleteMethod(host: string, path: string) {
    const http = require('https');

    const options = {host, path, method: 'DELETE'};

    return new Promise((resolve, reject) => {
        http.request(options, (response: IncomingMessage) => {
            let str = '';

            // another chunk of data has been received, so append it to `str`
            response.on('data', (chunk: any) => {
                str += chunk;
            });

            // the whole response has been received, so we just print it out here
            response.on('end', () => {
                try {
                    str = JSON.parse(str);
                } catch (error) {
                    console.error(error);
                }
                resolve(str);
            });

            response.on('error', (err: Error) => {
                reject(err);
            });
        }).end();
    });
}
