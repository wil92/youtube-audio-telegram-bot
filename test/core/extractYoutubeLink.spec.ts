import {Process} from "../../src/lib/core/process";
import {Telegram} from "../../src/lib/telegram";

describe('process.extractYoutubeLink', () => {
    let process: Process;

    beforeAll(() => {
        process = new Process(new Telegram());
    });

    it('should extract default values', () => {
        expect(process.extractYoutubeLink('https://www.youtube.com/watch?v=bQL2FsHe7G4'))
            .toEqual('https://www.youtube.com/watch?v=bQL2FsHe7G4');
        expect(process.extractYoutubeLink('https://youtube.com/watch?v=bQL2FsHe7G4'))
            .toEqual('https://youtube.com/watch?v=bQL2FsHe7G4');
        expect(process.extractYoutubeLink('https://m.youtube.com/watch?v=bQL2FsHe7G4'))
            .toEqual('https://m.youtube.com/watch?v=bQL2FsHe7G4');
        expect(process.extractYoutubeLink('https://youtu.be/watch?v=bQL2FsHe7G4'))
            .toEqual('https://youtu.be/watch?v=bQL2FsHe7G4');
    });

    it('should test an example with text around', () => {
        expect(process.extractYoutubeLink('asdf https://www.youtube.com/watch?v=bQL2FsHe7G4 asdf'))
            .toEqual('https://www.youtube.com/watch?v=bQL2FsHe7G4');
    });

    it('should return null for not existing youtube link', () => {
        expect(process.extractYoutubeLink('asdf asdf asdf asdfasdf asdf'))
            .toEqual(null);
    });
});
