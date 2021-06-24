import * as chai from 'chai';

import {objectToQueryParams} from "../../src/lib/utils";

const expect = chai.expect;

describe('objectToQueryParams', () => {
  it('should get a correct query params', () => {
    expect(objectToQueryParams({ test: 'test' })).to.equal('?test=test');
  });

  it('should get an empty string', () => {
    expect(objectToQueryParams()).to.equal('');
  });

  it('should get a valid query params with an array example', () => {
    expect(objectToQueryParams({ arr: ['some', 'that'], example: 'that' }))
      .to.equal('?arr=["some","that"]&example=that');
  });
});
