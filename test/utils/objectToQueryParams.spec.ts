import {objectToQueryParams} from "../../src/lib/utils";

describe('objectToQueryParams', () => {
  it('should get a correct query params', () => {
    expect(objectToQueryParams({ test: 'test' })).toEqual('?test=test');
  });

  it('should get an empty string', () => {
    expect(objectToQueryParams()).toEqual('');
  });

  it('should get a valid query params with an array example', () => {
    expect(objectToQueryParams({ arr: ['some', 'that'], example: 'that' }))
      .toEqual('?arr=["some","that"]&example=that');
  });
});
