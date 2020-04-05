const { fixtures } = require('testUtils')
const { stylelintJson } = require('../schema')

describe('pipes > stylelint > schema', () => {
  describe('JSON', () => {
    const stylelintFxt = fixtures('stylelint/json/00-base', 'json')

    it('should merge configs', () => {
      expect(stylelintJson(stylelintFxt)).toEqual(stylelintFxt.result)
    })
  })
})
