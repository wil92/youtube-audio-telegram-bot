import * as fs from 'fs';
import * as path from 'path';
import {exec} from 'child_process';

import {UpdateItem} from "./lib/models/updateItem";
import {config} from "./lib/telegram";
import {GetUpdateRequest} from "./lib/models/getUpdateRequest";
import * as telegram from './lib/telegram';
import {extractYoutubeLink, hasYoutubeLink, toMP3} from "./lib/utils";

let markedPost = new Set();

async function getUpdates(
    prev: UpdateItem[] = [],
    options: GetUpdateRequest = {limit: 100, allowed_updates: ['channel_post']}
): Promise<UpdateItem[]> {
    const updates = await telegram.getUpdates(options);
    if (updates.result && Array.isArray(updates.result)) {
        const results = [...prev, ...updates.result];
        if (updates.result.length === 100) {
            return getUpdates(results, {
                ...options,
                offset: updates.result[updates.result.length - 1].update_id + 1
            });
        }
        return results;
    }
    return prev;
}

function uploadAudio(audioName: string, chatId: number) {
    return telegram.sendAudio({chat_id: chatId}, path.join(__dirname, '..', audioName))
}

function removeAudio(audioName: string): void {
    fs.unlinkSync(audioName)
}

function getMessageText(elem: UpdateItem): string {
    return elem.channel_post ? elem.channel_post.text : elem.message.text
}

function getChatId(elem: UpdateItem): number {
    return elem.channel_post ? elem.channel_post.chat.id : elem.message.chat.id
}

function getMessageId(elem: UpdateItem): number {
    return elem.channel_post ? elem.channel_post.message_id : elem.message.message_id
}

async function downloadYoutubeVideo(elem: UpdateItem, options = ''): Promise<string> {
    return new Promise((resolve, reject) => {
        const ytLink = extractYoutubeLink(getMessageText(elem));
        exec(`youtube-dl ${options} ${ytLink}`, (error, stdout, stderr) => {
            if (error) {
                return reject(error);
            }
            if (stderr) {
                return reject(stderr);
            }
            resolve(stdout);
        })
    });
}

function checkYoutubeLink(elem: UpdateItem): boolean {
    return (elem.channel_post && hasYoutubeLink(elem.channel_post.text)) ||
        (elem.message && hasYoutubeLink(elem.message.text));
}

async function process() {
    const res = await getUpdates();
    const tmpMarkedPost = new Set();

    for (const elem of res) {
        tmpMarkedPost.add(elem.update_id);
        if (checkYoutubeLink(elem) && !markedPost.has(elem.update_id)) {
            try {
                await downloadYoutubeVideo(elem, '-x --audio-format mp3 --audio-quality 8 -q');
                let fileName = await downloadYoutubeVideo(elem, '--get-filename');

                fileName = toMP3(fileName);
                console.log(fileName);

                await telegram.deleteMessage({chat_id: getChatId(elem), message_id: getMessageId(elem)});

                await telegram.sendMessage({chat_id: getChatId(elem), text: getMessageText(elem)});
                await uploadAudio(fileName, getChatId(elem));
                await removeAudio(path.join(__dirname, '..', fileName));
            } catch (error) {
                console.error(error);
            }
        } else if (!checkYoutubeLink(elem) && !markedPost.has(elem.update_id)) {
            console.info(`Not valid youtube link in the update number: ${elem.update_id}`)
        }
    }

    markedPost = tmpMarkedPost;
    setTimeout(process, config.updateInterval);
}

getUpdates().then((res: UpdateItem[]) => {
    res.forEach(elem => {
        markedPost.add(elem.update_id);
    });
    setTimeout(process, config.updateInterval);
});
