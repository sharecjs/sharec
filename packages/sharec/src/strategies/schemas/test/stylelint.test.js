const { fixtures } = require('testUtils')
const { stylelintJson } = require('../stylelint')

describe('schemas > style', () => {
  describe('JSON', () => {
    const stylelintBaseFxt = fixtures('stylelint/json/00-base', 'json')

    it('should merge configs', () => {
      expect(stylelintJson(stylelintBaseFxt)).toEqual(stylelintBaseFxt.result)
    })
  })
})
