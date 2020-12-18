const chai = require('chai');
const {toReadableSize} = require('../../lib/utils');

const expect = chai.expect;

describe('toReadableSize', () => {
    it('should return a bytes example', () => {
        expect(toReadableSize(90))
            .to.equal('90B');
    });

    it('should return a KB example', () => {
        expect(toReadableSize(2548))
            .to.equal('2.5KB');
    });

    it('should return a MB example', () => {
        expect(toReadableSize(25481235))
            .to.equal('24.3MB');
    });

    it('should return a GB example', () => {
        expect(toReadableSize(254856481234))
            .to.equal('237.4GB');
    });
});
