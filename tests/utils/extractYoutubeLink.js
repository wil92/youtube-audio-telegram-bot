const chai = require('chai')
const { extractYoutubeLink } = require('../../src/lib/utils')

const expect = chai.expect

describe('extractYoutubeLink', function () {
  it('should extract default values', function () {
    expect(extractYoutubeLink('https://www.youtube.com/watch?v=bQL2FsHe7G4'))
      .to.be.equal('https://www.youtube.com/watch?v=bQL2FsHe7G4');
    expect(extractYoutubeLink('https://youtube.com/watch?v=bQL2FsHe7G4'))
       .to.be.equal('https://youtube.com/watch?v=bQL2FsHe7G4');
    expect(extractYoutubeLink('https://m.youtube.com/watch?v=bQL2FsHe7G4'))
       .to.be.equal('https://m.youtube.com/watch?v=bQL2FsHe7G4');
    expect(extractYoutubeLink('https://youtu.be/watch?v=bQL2FsHe7G4'))
       .to.be.equal('https://youtu.be/watch?v=bQL2FsHe7G4');
  });

  it('should test an example with text around', function () {
    expect(extractYoutubeLink('asdf https://www.youtube.com/watch?v=bQL2FsHe7G4 asdf'))
        .to.be.equal('https://www.youtube.com/watch?v=bQL2FsHe7G4');
  });

  it('should return null for not existing youtube link', () => {
    expect(extractYoutubeLink('asdf asdf asdf asdfasdf asdf'))
        .to.be.equal(null);
  });
})
