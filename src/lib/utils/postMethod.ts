import FormData from 'form-data';
import {IncomingMessage} from "http";

export async function postMethod(host: string, path: string, formValues: any) {
    const http = require('https');

    const form = new FormData();
    Object.keys(formValues).forEach(key => form.append(key, formValues[key]));

    const options = {
        host,
        path,
        method: 'POST',
        headers: form.getHeaders()
    };

    return new Promise((resolve, reject) => {
        form.pipe(http.request(options, (response: IncomingMessage) => {
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
        }));
    });
}
