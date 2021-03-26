const chai = require('chai')
const { hasYoutubeLink } = require('../../src/lib/utils')

const expect = chai.expect

describe('hasYoutubeLink', function () {
  it('should test default values', function () {
    expect(hasYoutubeLink('https://www.youtube.com/watch?v=bQL2FsHe7G4'))
      .to.be.true;
    expect(hasYoutubeLink('https://youtube.com/watch?v=bQL2FsHe7G4'))
       .to.be.true;
    expect(hasYoutubeLink('https://m.youtube.com/watch?v=bQL2FsHe7G4'))
       .to.be.true;
    expect(hasYoutubeLink('https://youtu.be/watch?v=bQL2FsHe7G4'))
       .to.be.true;
  });

  it('should test an example with text around', function () {
    expect(hasYoutubeLink('asdf https://www.youtube.com/watch?v=bQL2FsHe7G4 asdf'))
        .to.be.true;
  });

  it('should be false if there is not youtube link', () => {
    expect(hasYoutubeLink('asdf 34f2d wfsdf asdf'))
        .to.be.false;
  });
})
