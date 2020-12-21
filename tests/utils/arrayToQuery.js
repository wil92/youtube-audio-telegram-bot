const chai = require('chai')
const arrayToQuery = require('../../src/lib/utils/arrayToQuery')

const expect = chai.expect

describe('arrayToQuery', function () {
  it('should get a valid list', function () {
    expect(arrayToQuery(['some', 'that'])).to.equal('["some","that"]')
  })

  it('should return an empty string', function () {
    expect(arrayToQuery()).to.equal('[]')
  })
})
