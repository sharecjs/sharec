const { fixtures } = require('testUtils')
const eslintPipe = require('../pipe')

describe('strategies > pipes > eslint > pipe', () => {
  describe('JSON', () => {
    const eslintBaseFxt = fixtures('atomic/eslint/json/01-base')

    it('should merge configs', () => {
      expect(eslintBaseFxt.result).toMatch(
        eslintPipe('.eslintrc')(eslintBaseFxt),
      )
    })
  })
})
