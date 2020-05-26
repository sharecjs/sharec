const { fixtures } = require('testUtils')
const { pipe } = require('../pipe')

describe('strategies > pipes > babel > pipe', () => {
  const babelBaseFxt = fixtures('babel/json/00-base')

  it('should merge babel json configs', () => {
    expect(pipe('.babelrc')(babelBaseFxt)).toWraplessEqual(babelBaseFxt.result, {
      eol: false,
    })
  })
})
