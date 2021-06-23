import * as chai from 'chai';

import {arrayToQuery} from "../../src/lib/utils";

const expect = chai.expect;

describe('arrayToQuery', function () {
    it('should get a valid list', function () {
        expect(arrayToQuery(['some', 'that'])).to.equal('["some","that"]');
    });

    it('should return an empty string', function () {
        expect(arrayToQuery()).to.equal('[]');
    });
});
