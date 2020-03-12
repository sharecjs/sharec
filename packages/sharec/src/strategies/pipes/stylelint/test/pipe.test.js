const { fixtures } = require('testUtils')
const stylelintPipe = require('../pipe')

describe('pipes > stylelint > pipe', () => {
  describe('JSON', () => {
    const stylelintBaseFxt = fixtures('atomic/stylelint/json/00-base', 'json')

    it('should merge configs', () => {
      expect(stylelintPipe('.stylelint')(stylelintBaseFxt)).toEqual(
        stylelintBaseFxt.result,
      )
    })
  })
})
