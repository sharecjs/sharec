const { fixtures } = require('testUtils')
const { prettierJson } = require('../schema')

describe('pipes > prettier > schema', () => {
  describe('JSON', () => {
    const prettierBaseFxt = fixtures('prettier/json/00-base', 'map')

    it('should merge configs', () => {
      expect(prettierJson(prettierBaseFxt)).toEqual(prettierBaseFxt.result)
    })
  })
})
