const { fixtures } = require('testUtils')
const { packageJson } = require('../schema')

describe('pipes > package > schema', () => {
  describe('JSON', () => {
    const packageBaseFxt = fixtures('atomic/package/json/00-base', 'json')

    it('should merge configs', () => {
      expect(packageJson(packageBaseFxt)).toEqual(packageBaseFxt.result)
    })
  })
})
