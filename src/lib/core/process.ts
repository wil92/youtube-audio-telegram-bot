import path from "path";
import fs from "fs";
import {exec} from "child_process";

import {UpdateItem, GetUpdateRequest} from "../models";
import {Telegram} from "../telegram";


export class Process {

    markedPost: Set<number>;

    constructor(private telegram: Telegram) {
        this.markedPost = new Set<number>();
    }

    startService() {
        this.getUpdates().then((res: UpdateItem[]) => {
            res.forEach(elem => {
                this.markedPost.add(elem.update_id);
            });
            setTimeout(this.process.bind(this), this.telegram.config.updateInterval);
        });
    }

    async process() {
        const updateItems = await this.getUpdates();
        const tmpMarkedPost = new Set<number>();

        for (const updateItem of updateItems) {
            tmpMarkedPost.add(updateItem.update_id);
            if (this.checkYoutubeLink(updateItem) && !this.markedPost.has(updateItem.update_id)) {
                try {
                    await this.downloadYoutubeVideo(updateItem, '-x --audio-format mp3 --audio-quality 8 -q');
                    let fileName = await this.downloadYoutubeVideo(updateItem, '--get-filename');

                    fileName = this.toMP3(fileName);
                    console.log(fileName);

                    await this.telegram.deleteMessage({chat_id: this.getChatId(updateItem), message_id: this.getMessageId(updateItem)});

                    await this.telegram.sendMessage({chat_id: this.getChatId(updateItem), text: this.getMessageText(updateItem)});
                    await this.uploadAudio(fileName, this.getChatId(updateItem));
                    await this.removeAudio(path.join(__dirname, '..', fileName));
                } catch (error) {
                    console.error(error);
                }
            } else if (!this.checkYoutubeLink(updateItem) && !this.markedPost.has(updateItem.update_id)) {
                console.info(`Not valid youtube link in the update number: ${updateItem.update_id}`)
            }
        }

        this.markedPost = tmpMarkedPost;

        // loop the process
        setTimeout(this.process.bind(this), this.telegram.config.updateInterval);
    }

    async getUpdates(
        prev: UpdateItem[] = [],
        options: GetUpdateRequest = {limit: 100, allowed_updates: ['channel_post']}
    ): Promise<UpdateItem[]> {
        const updates = await this.telegram.getUpdates(options);
        if (updates.result && Array.isArray(updates.result)) {
            const results = [...prev, ...updates.result];
            if (updates.result.length === 100) {
                return this.getUpdates(results, {
                    ...options,
                    offset: updates.result[updates.result.length - 1].update_id + 1
                });
            }
            return results;
        }
        return prev;
    }

    uploadAudio(audioName: string, chatId: number) {
        return this.telegram.sendAudio({chat_id: chatId}, path.join(__dirname, '..', audioName))
    }

    removeAudio(audioName: string): void {
        fs.unlinkSync(audioName)
    }

    async downloadYoutubeVideo(elem: UpdateItem, options = ''): Promise<string> {
        return new Promise((resolve, reject) => {
            const ytLink = this.extractYoutubeLink(this.getMessageText(elem));
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

    getMessageText(elem: UpdateItem): string {
        return elem.channel_post ? elem.channel_post.text : elem.message.text
    }

    getChatId(elem: UpdateItem): number {
        return elem.channel_post ? elem.channel_post.chat.id : elem.message.chat.id
    }

    getMessageId(elem: UpdateItem): number {
        return elem.channel_post ? elem.channel_post.message_id : elem.message.message_id
    }

    checkYoutubeLink(elem: UpdateItem): boolean {
        return (elem.channel_post && this.isYoutubeLinkInText(elem.channel_post.text)) ||
            (elem.message && this.isYoutubeLinkInText(elem.message.text));
    }

    isYoutubeLinkInText(value: string = ''): boolean {
        const result = this.telegram.config.regexpYoutubeLink.exec(value);
        return !!(result && result[0]);
    }

    toMP3(value: string = ''): string {
        return value.trim().replace(/\.\w+$/, '.mp3');
    }

    extractYoutubeLink(value: string = ''): string | null {
        const result = this.telegram.config.regexpYoutubeLink.exec(value);
        return result && result[0];
    }
}
