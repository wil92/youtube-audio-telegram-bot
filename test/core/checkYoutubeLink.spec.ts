import {Process} from "../../src/lib/core/process";
import {Telegram} from "../../src/lib/telegram";
import {UpdateItem} from "../../src/lib/models";

describe('process.checkYoutubeLink', () => {
    let process: Process;

    beforeAll(() => {
        process = new Process(new Telegram());
    });

    it('should validate a text with a correct youtube link', () => {
        const EXAMPLE_CORRECT_LINK = 'asdf https://www.youtube.com/watch?v=bQL2FsHe7G4 asdf';
        expect(process.checkYoutubeLink({message: {text: EXAMPLE_CORRECT_LINK}} as UpdateItem)).toBeTruthy();
        expect(process.checkYoutubeLink({channel_post: {text: EXAMPLE_CORRECT_LINK}} as UpdateItem)).toBeTruthy();
    });

    it('should validate a text with an invalid youtube link', () => {
        const EXAMPLE_INCORRECT_LINK = 'asdf https://some7G4.com asdf';
        expect(process.checkYoutubeLink({message: {text: EXAMPLE_INCORRECT_LINK}} as UpdateItem)).toBeFalsy();
        expect(process.checkYoutubeLink({channel_post: {text: EXAMPLE_INCORRECT_LINK}} as UpdateItem)).toBeFalsy();
    });

    it('should validate a text with an invalid youtube link', () => {
        const EXAMPLE_EMPTY_LINK = 'asdf sdfgsdfg asdf';
        expect(process.checkYoutubeLink({message: {text: EXAMPLE_EMPTY_LINK}} as UpdateItem)).toBeFalsy();
        expect(process.checkYoutubeLink({channel_post: {text: EXAMPLE_EMPTY_LINK}} as UpdateItem)).toBeFalsy();
    });
});
