import * as chai from 'chai';

import {Process} from "../../src/lib/core/process";
import {Telegram} from "../../src/lib/telegram";

const expect = chai.expect;

describe('process.hasYoutubeLink', () => {
  let process: Process;

  before(() => {
    process = new Process(new Telegram());
  });

  it('should test default values', () => {
    expect(process.hasYoutubeLink('https://www.youtube.com/watch?v=bQL2FsHe7G4'))
      .to.be.true;
    expect(process.hasYoutubeLink('https://youtube.com/watch?v=bQL2FsHe7G4'))
       .to.be.true;
    expect(process.hasYoutubeLink('https://m.youtube.com/watch?v=bQL2FsHe7G4'))
       .to.be.true;
    expect(process.hasYoutubeLink('https://youtu.be/watch?v=bQL2FsHe7G4'))
       .to.be.true;
  });

  it('should test an example with text around', () => {
    expect(process.hasYoutubeLink('asdf https://www.youtube.com/watch?v=bQL2FsHe7G4 asdf'))
        .to.be.true;
  });

  it('should be false if there is not youtube link', () => {
    expect(process.hasYoutubeLink('asdf 34f2d wfsdf asdf'))
        .to.be.false;
  });
});
