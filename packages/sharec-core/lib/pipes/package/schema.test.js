const { fixtures } = require('testUtils')
const { packageJson } = require('./schema')

describe('pipes > package > schema', () => {
  describe('JSON', () => {
    const packageBaseFxt = fixtures('package/json/00-base', 'map')

    it('should merge configs', () => {
      expect(packageJson(packageBaseFxt)).toMatchSnapshot()
    })
  })
})
