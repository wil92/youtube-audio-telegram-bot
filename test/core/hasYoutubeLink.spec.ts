import {Process} from "../../src/lib/core/process";
import {Telegram} from "../../src/lib/telegram";

describe('process.hasYoutubeLink', () => {
  let process: Process;

  beforeAll(() => {
    process = new Process(new Telegram());
  });

  it('should test default values', () => {
    expect(process.hasYoutubeLink('https://www.youtube.com/watch?v=bQL2FsHe7G4')).toBeTruthy();
    expect(process.hasYoutubeLink('https://youtube.com/watch?v=bQL2FsHe7G4')).toBeTruthy();
    expect(process.hasYoutubeLink('https://m.youtube.com/watch?v=bQL2FsHe7G4')).toBeTruthy();
    expect(process.hasYoutubeLink('https://youtu.be/watch?v=bQL2FsHe7G4')).toBeTruthy();
  });

  it('should test an example with text around', () => {
    expect(process.hasYoutubeLink('asdf https://www.youtube.com/watch?v=bQL2FsHe7G4 asdf')).toBeTruthy();
  });

  it('should be false if there is not youtube link', () => {
    expect(process.hasYoutubeLink('asdf 34f2d wfsdf asdf')).toBeFalsy();
  });
});
