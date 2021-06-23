import {SendMessageRequest} from "../models/sendMessageRequest";
import {objectToQueryParams, postMethod} from "../utils";
import {config} from "./config";

export async function sendMessage(options: SendMessageRequest = { chat_id: -1, text: '' }): Promise<any> {
  return postMethod(
    config.telegramHost, `/bot${config.botSecret}/sendMessage${objectToQueryParams({...options, text: null})}`,
    options
  );
}
