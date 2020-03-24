const { fixtures } = require('testUtils')
const babelPipe = require('../pipe')

describe('strategies > pipes > babel > pipe', () => {
  const babelBaseFxt = fixtures('atomic/babel/json/00-base')

  it('should merge babel json configs', () => {
    expect(babelBaseFxt.result).toMatch(babelPipe('.babelrc')(babelBaseFxt))
  })
})
