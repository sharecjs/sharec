const { fixtures } = require('testUtils')
const { babelJson } = require('./schema')

describe('strategies > pipes > babel > schema', () => {
  const babelUniqueEnvFxt = fixtures('babel/json/03-unique-env', 'map')

  it('should handle unique envs', () => {
    expect(babelJson(babelUniqueEnvFxt)).toMatchSnapshot()
  })
})
