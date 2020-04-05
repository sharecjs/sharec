const { fixtures } = require('testUtils')
const { babelJson } = require('../../schema')

describe('strategies > pipes > babel > schema', () => {
  const babelWithEmptyFxt = fixtures('atomic/babel/json/01-with-empty', 'json')

  it('should handle empty envs', () => {
    expect(babelJson(babelWithEmptyFxt)).toEqual(babelWithEmptyFxt.result)
  })
})
