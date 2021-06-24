import {Process} from "../../src/lib/core/process";
import {Telegram} from "../../src/lib/telegram";
import {UpdateItem} from "../../src/lib/models";

describe('process.getMessageId', () => {
    let process: Process;

    const MESSAGE_ID_EXAMPLE = 12352334;

    beforeAll(() => {
        process = new Process(new Telegram());
    });

    it('should extract the message id from the UpdateItem', () => {
        expect(process.getMessageId({message: {message_id: MESSAGE_ID_EXAMPLE}} as UpdateItem))
            .toEqual(MESSAGE_ID_EXAMPLE);
        expect(process.getMessageId({channel_post: {message_id: MESSAGE_ID_EXAMPLE}} as UpdateItem))
            .toEqual(MESSAGE_ID_EXAMPLE);
    });
});
