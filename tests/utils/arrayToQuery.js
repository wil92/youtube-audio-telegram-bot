const chai = require('chai');
const arrayToQuery = require('../../lib/utils/arrayToQuery');

const expect = chai.expect;

describe('arrayToQuery', () => {
    it('should get a valid list', () => {
        expect(arrayToQuery(['some', 'that'])).to.equal('some,that');
    });

    it('should return an empty string', () => {
        expect(arrayToQuery()).to.equal('');
    });
});
