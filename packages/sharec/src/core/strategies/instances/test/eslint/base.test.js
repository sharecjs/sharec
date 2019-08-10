const { fixture } = require('testUtils')
const { eslintStrategy } = require('../../eslint')

describe('strategy > eslint', () => {
  describe('JSON', () => {
    const eslintCurrent = fixture('eslint/json/01-base/current.json', 'json')
    const eslintNew = fixture('eslint/json/01-base/new.json', 'json')
    const eslintResult = fixture('eslint/json/01-base/result.json', 'json')
    const eslintRestored = fixture('eslint/json/01-base/restored.json', 'json')

    it('should merge configs', () => {
      expect(eslintStrategy.mergeJSON(eslintCurrent, eslintNew)).toEqual(
        eslintResult,
      )
    })

    it('should unapply configs', () => {
      expect(eslintStrategy.unapplyJSON(eslintResult, eslintNew)).toEqual(
        eslintRestored,
      )
    })
  })

  describe('YAML', () => {
    const eslintCurrent = fixture('eslint/yaml/01-base/current.yml')
    const eslintNew = fixture('eslint/yaml/01-base/new.yml')
    const eslintResult = fixture('eslint/yaml/01-base/result.yml')
    const eslintRestored = fixture('eslint/yaml/01-base/restored.yml')

    it('should merge configs', () => {
      expect(eslintStrategy.mergeYAML(eslintCurrent, eslintNew)).toEqual(
        eslintResult,
      )
    })

    it('should unapply configs', () => {
      expect(eslintStrategy.unapplyYAML(eslintResult, eslintNew)).toEqual(
        eslintRestored,
      )
    })
  })
})
