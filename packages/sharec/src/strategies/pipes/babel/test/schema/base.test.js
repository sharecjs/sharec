const { fixtures } = require('testUtils')
const { babelJson } = require('../../schema')

describe('strategies > pipes > babel > schema', () => {
  const babelBaseFxt = fixtures('atomic/babel/json/00-base', 'json')

  it('should merge babel json configs', () => {
    expect(babelJson(babelBaseFxt)).toEqual(babelBaseFxt.result)
  })
})
