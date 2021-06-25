import {Process} from "../../src/lib/core/process";
import {Telegram} from "../../src/lib/telegram";

describe('process.getMessageText', () => {
    let process: Process;
    let telegram: Telegram;

    beforeAll(() => {
        jest.useFakeTimers();
        telegram = new Telegram();
        process = new Process(telegram);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should make a full process iteration with an empty list of update items', async () => {
        jest.spyOn(process, 'getUpdates').mockReturnValueOnce(Promise.resolve([]));

        await process.process();

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(process.markedPost.size).toEqual(0);
    });
});
