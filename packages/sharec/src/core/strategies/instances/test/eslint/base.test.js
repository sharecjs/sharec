const { fixtures } = require('testUtils')
const { eslintStrategy } = require('../../eslint')

const diff = require('diff')

describe('strategy > eslint', () => {
  describe('JSON', () => {
    const eslintBaseFxt = fixtures('eslint/json/01-base', 'json')

    it('should merge configs', () => {
      expect(
        eslintStrategy.mergeJSON({
          current: eslintBaseFxt.current,
          upcoming: eslintBaseFxt.upcoming,
        }),
      ).toEqual(eslintBaseFxt.result)
    })

    it('should unapply configs', () => {
      expect(
        eslintStrategy.unapplyJSON({
          current: eslintBaseFxt.result,
          upcoming: eslintBaseFxt.upcoming,
        }),
      ).toEqual(eslintBaseFxt.restored)
    })
  })

  describe('YAML', () => {
    const eslintBaseFxt = fixtures('eslint/yaml/01-base')

    it('should merge configs', () => {
      expect(
        eslintStrategy.mergeYAML({
          current: eslintBaseFxt.current,
          upcoming: eslintBaseFxt.upcoming,
        }),
      ).toWraplessEqual(eslintBaseFxt.result)
    })

    it('should unapply configs', () => {
      expect(
        eslintStrategy.unapplyYAML({
          current: eslintBaseFxt.result,
          upcoming: eslintBaseFxt.upcoming,
        }),
      ).toWraplessEqual(eslintBaseFxt.restored)
    })
  })
})
