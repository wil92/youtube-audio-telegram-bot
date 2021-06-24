import {Process} from "../../src/lib/core/process";
import {Telegram} from "../../src/lib/telegram";
import {UpdateItem} from "../../src/lib/models";

describe('process.getChatId', () => {
    let process: Process;

    const CHAT_ID_EXAMPLE = 879465456;

    beforeAll(() => {
        process = new Process(new Telegram());
    });

    it('should extract the message id from the UpdateItem', () => {
        expect(process.getChatId({message: {chat: {id: CHAT_ID_EXAMPLE}}} as UpdateItem))
            .toEqual(CHAT_ID_EXAMPLE);
        expect(process.getChatId({channel_post: {chat: {id: CHAT_ID_EXAMPLE}}} as UpdateItem))
            .toEqual(CHAT_ID_EXAMPLE);
    });
});
