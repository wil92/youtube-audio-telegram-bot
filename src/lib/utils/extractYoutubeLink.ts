import {config} from "../telegram";

export function extractYoutubeLink(value: string = '') {
    const result = config.regexpYoutubeLink.exec(value);
    return result && result[0];
}
