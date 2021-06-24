import {Process} from "../../src/lib/core/process";
import {Telegram} from "../../src/lib/telegram";
import {UpdateItem} from "../../src/lib/models";

describe('process.getMessageText', () => {
    let process: Process;

    const MESSAGE_TEXT_EXAMPLE = 'SAlksajdf dflasdjf lkasdf';

    beforeAll(() => {
        process = new Process(new Telegram());
    });

    it('should extract the message id from the UpdateItem', () => {
        expect(process.getMessageText({message: {text: MESSAGE_TEXT_EXAMPLE}} as UpdateItem))
            .toEqual(MESSAGE_TEXT_EXAMPLE);
        expect(process.getMessageText({channel_post: {text: MESSAGE_TEXT_EXAMPLE}} as UpdateItem))
            .toEqual(MESSAGE_TEXT_EXAMPLE);
    });
});
