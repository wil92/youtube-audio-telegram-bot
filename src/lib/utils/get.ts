import {IncomingMessage} from "http";
import {TelegramUpdatesResult} from "../models/telegramUpdatesResult";

export async function get(host: string, path: string): Promise<TelegramUpdatesResult> {
  const http = require('https');

  // The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
  const options = { host, path };

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
          resolve(JSON.parse(str));
        } catch (error) {
          console.error(error);
        }
      });

      response.on('error', (err: Error) => {
        reject(err);
      });
    }
    ).end();
  });
}
