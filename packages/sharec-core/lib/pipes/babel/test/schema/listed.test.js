const { fixtures } = require('testUtils')
const { babelJson } = require('../../schema')

describe('strategies > pipes > babel > schema', () => {
  const babelListedValuesFxt = fixtures('babel/json/04-listed-values', 'map')

  it('should handle empty envs', () => {
    expect(babelJson(babelListedValuesFxt)).toEqual(babelListedValuesFxt.result)
  })
})
