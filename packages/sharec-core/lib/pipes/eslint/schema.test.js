const { fixtures } = require('testUtils')
const { eslintJson } = require('./schema')

describe('pipes > eslint > schema', () => {
  describe('JSON', () => {
    const eslintBaseFxt = fixtures('eslint/json/01-base', 'map')

    it('should merge configs', () => {
      expect(
        eslintJson({
          current: eslintBaseFxt.current,
          upcoming: eslintBaseFxt.upcoming,
        }),
      ).toMatchSnapshot()
    })
  })
})
