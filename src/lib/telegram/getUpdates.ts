import {TelegramUpdatesResult} from "../models/telegramUpdatesResult";
import {GetUpdateRequest} from "../models/getUpdateRequest";
import {get, objectToQueryParams} from "../utils";
import {config} from "./config";

export async function getUpdates(options: GetUpdateRequest   = {}): Promise<TelegramUpdatesResult> {
    return get(config.telegramHost, `/bot${config.botSecret}/getUpdates${objectToQueryParams(options)}`);
}
