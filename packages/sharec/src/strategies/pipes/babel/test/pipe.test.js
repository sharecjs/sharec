const { fixtures } = require('testUtils')
const babelPipe = require('../pipe')

describe('strategies > pipes > babel > pipe', () => {
  const babelBaseFxt = fixtures('atomic/babel/json/00-base', 'json')

  it('should merge babel json configs', () => {
    expect(babelPipe('.babelrc')(babelBaseFxt)).toEqual(babelBaseFxt.result)
  })
})
