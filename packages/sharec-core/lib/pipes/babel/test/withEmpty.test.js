const { fixtures } = require('testUtils')
const { babelJson } = require('../schema')

describe('strategies > pipes > babel > schema', () => {
  const babelWithEmptyFxt = fixtures('babel/json/01-with-empty', 'map')

  it('should handle empty envs', () => {
    expect(babelJson(babelWithEmptyFxt)).toMatchSnapshot()
  })
})
