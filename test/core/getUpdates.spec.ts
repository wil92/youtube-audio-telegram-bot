import {Process} from "../../src/lib/core/process";
import {Telegram} from "../../src/lib/telegram";
import {TelegramUpdatesResult, UpdateItem} from "../../src/lib/models";
import spyOn = jest.spyOn;

describe('process.getMessageText', () => {
    let process: Process;
    let telegram: Telegram;

    beforeAll(() => {
        telegram = new Telegram();
        process = new Process(telegram);
    });

    it('should extract the message id from the UpdateItem', async () => {
        const items100 = new Array(100).fill(0).map(() => ({} as UpdateItem));
        spyOn(telegram, 'getUpdates')
            .mockReturnValueOnce(Promise.resolve({result: items100} as TelegramUpdatesResult))
            .mockReturnValueOnce(Promise.resolve({result: items100} as TelegramUpdatesResult))
            .mockReturnValueOnce(Promise.resolve({result: []} as TelegramUpdatesResult));
        const updateItems = await process.getUpdates();
        expect(updateItems.length).toEqual(200);
    });
});
