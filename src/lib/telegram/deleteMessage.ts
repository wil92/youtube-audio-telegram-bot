import {DeleteRequest} from "../models";
import {get, objectToQueryParams} from "../utils";
import {config} from "./config";

export async function deleteMessage(options: DeleteRequest = {chat_id: -1, message_id: -1}): Promise<any> {
    console.log('options', options);
    return get(config.telegramHost, `/bot${config.botSecret}/deleteMessage${objectToQueryParams(options)}`)
        .then((result: any) => {
            console.log(result);
            return result;
        });
}
