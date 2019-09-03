const { fixtures } = require('testUtils')
const { eslintStrategy } = require('../../eslint')

describe('strategy > eslint', () => {
  describe('JSON', () => {
    const eslintBaseFxt = fixtures('eslint/json/01-base', 'json')

    it('should merge configs', () => {
      expect(
        eslintStrategy.mergeJSON(eslintBaseFxt.current, eslintBaseFxt.upcoming),
      ).toEqual(eslintBaseFxt.result)
    })

    it('should unapply configs', () => {
      expect(
        eslintStrategy.unapplyJSON(
          eslintBaseFxt.result,
          eslintBaseFxt.upcoming,
        ),
      ).toEqual(eslintBaseFxt.restored)
    })
  })

  describe('YAML', () => {
    const eslintBaseFxt = fixtures('eslint/yaml/01-base')

    it('should merge configs', () => {
      expect(
        eslintStrategy.mergeYAML(eslintBaseFxt.current, eslintBaseFxt.upcoming),
      ).toEqual(eslintBaseFxt.result)
    })

    it('should unapply configs', () => {
      expect(
        eslintStrategy.unapplyYAML(
          eslintBaseFxt.result,
          eslintBaseFxt.upcoming,
        ),
      ).toEqual(eslintBaseFxt.restored)
    })
  })
})
