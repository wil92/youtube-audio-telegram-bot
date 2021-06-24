import * as chai from 'chai';

import {Process} from "../../src/lib/core/process";
import {Telegram} from "../../src/lib/telegram";

const expect = chai.expect;

describe('process.toMP3', () => {
  let process: Process;

  before(() => {
    process = new Process(new Telegram());
  });

  it('should correct the file name 1', () => {
    expect(process.toMP3(' POR QUÉ...-rIbRa0pwfhA.webm'))
      .to.equal('POR QUÉ...-rIbRa0pwfhA.mp3');
  });

  it('should correct the file name 2', () => {
    const value = '\n \n MIRA POR QUÉ...-rIbRa0pwfhA.webm\n\n'
    expect(process.toMP3(value))
      .to.equal('MIRA POR QUÉ...-rIbRa0pwfhA.mp3');
  });

  it('should correct the file name 3', () => {
    const value = 'El video más corto del mundo-bQL2FsHe7G4.webm'
    expect(process.toMP3(value))
      .to.equal('El video más corto del mundo-bQL2FsHe7G4.mp3');
  });
});
