import {arrayToQuery} from "../../src/lib/utils";

describe('arrayToQuery', () => {
    it('should get a valid list', () => {
        expect(arrayToQuery(['some', 'that'])).toEqual('["some","that"]');
    });

    it('should return an empty string', () => {
        expect(arrayToQuery()).toEqual('[]');
    });
});
