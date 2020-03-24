const { fixtures } = require('testUtils')
const stylelintPipe = require('../pipe')

describe('pipes > stylelint > pipe', () => {
  describe('JSON', () => {
    const stylelintBaseFxt = fixtures('atomic/stylelint/json/00-base')

    it('should merge configs', () => {
      expect(stylelintBaseFxt.result).toMatch(
        stylelintPipe('.stylelint')(stylelintBaseFxt),
      )
    })
  })
})
