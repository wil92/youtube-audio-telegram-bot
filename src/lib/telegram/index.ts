import {config} from './config';
import {getUpdates} from './getUpdates';
import {deleteMessage} from './deleteMessage';
import {sendAudio} from './sendAudio';
import {sendMessage} from './sendMessage';

export class Telegram {
    config = config;
    getUpdates = getUpdates;
    deleteMessage = deleteMessage;
    sendAudio = sendAudio;
    sendMessage = sendMessage;
}
