const { fixtures } = require('testUtils')
const { huskyJson } = require('../schema')

describe('pipes > husky > schema', () => {
  describe('JSON', () => {
    const huskyBaseFxt = fixtures('atomic/husky/json/00-base', 'json')

    it('should merge configs', () => {
      expect(huskyJson(huskyBaseFxt)).toEqual(huskyBaseFxt.result)
    })
  })
})
