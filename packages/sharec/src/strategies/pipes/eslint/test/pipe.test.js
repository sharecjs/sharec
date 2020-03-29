const { fixtures } = require('testUtils')
const { pipe } = require('../pipe')

describe('strategies > pipes > eslint > pipe', () => {
  describe('JSON', () => {
    const eslintBaseFxt = fixtures('atomic/eslint/json/01-base')

    it('should merge configs', () => {
      expect(pipe('.eslintrc')(eslintBaseFxt)).toEqual(eslintBaseFxt.result)
    })
  })
})
