import * as chai from 'chai';

import {toMP3} from "../../src/lib/utils";

const expect = chai.expect;

describe('toMP3', function () {
  it('should correct the file name 1', function () {
    expect(toMP3(' POR QUÉ...-rIbRa0pwfhA.webm'))
      .to.equal('POR QUÉ...-rIbRa0pwfhA.mp3');
  });

  it('should correct the file name 2', function () {
    const value = '\n \n MIRA POR QUÉ...-rIbRa0pwfhA.webm\n\n'
    expect(toMP3(value))
      .to.equal('MIRA POR QUÉ...-rIbRa0pwfhA.mp3');
  });

  it('should correct the file name 3', function () {
    const value = 'El video más corto del mundo-bQL2FsHe7G4.webm'
    expect(toMP3(value))
      .to.equal('El video más corto del mundo-bQL2FsHe7G4.mp3');
  });
});
