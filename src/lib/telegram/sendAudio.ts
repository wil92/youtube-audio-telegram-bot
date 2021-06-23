import * as fs from 'fs';
import * as path from 'path';

import {config} from "./config";
import {objectToQueryParams, postMethod, toReadableSize} from "../utils";

// 2MB
const CHUNK_SIZE = 2 * 1024 * 1024

function fileSize (fileName: string): number {
  const stats = fs.statSync(fileName)
  return stats ? stats.size : 0
}

export async function sendAudio(options = {}, audioPath: string): Promise<any> {
  return postMethod(
    config.telegramHost,
        `/bot${config.botSecret}/sendAudio${objectToQueryParams(options)}`,
        {
          audio: fs.createReadStream(audioPath, { highWaterMark: CHUNK_SIZE }),
          title: `${toReadableSize(fileSize(audioPath))}. ${path.basename(audioPath)}`
        });
}
