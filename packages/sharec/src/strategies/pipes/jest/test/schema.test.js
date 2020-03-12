const { fixtures } = require('testUtils')
const { jestJson } = require('../schema')

describe('pipes > jest > schema', () => {
  describe('JSON', () => {
    const jestBaseFxt = fixtures('atomic/jest/json/00-base', 'json')

    it('should merge configs', () => {
      expect(jestJson(jestBaseFxt)).toEqual(jestBaseFxt.result)
    })
  })
})
