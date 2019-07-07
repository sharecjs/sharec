const { determineConfigStrategy } = require('core/strategist')
const { CommonStrategy } = require('strategies/common')
const { BabelStrategy } = require('strategies/babel')
const { EslintStrategy } = require('strategies/eslint')

describe('core > strategist >', () => {
  describe('determineConfigStrategy', () => {
    it('should correctly determine common strategies by fileName', () => {
      expect(determineConfigStrategy('sample-config.json')).toBeInstanceOf(
        CommonStrategy,
      )
      expect(determineConfigStrategy('exmaple-config.yml')).toBeInstanceOf(
        CommonStrategy,
      )
      expect(
        determineConfigStrategy('example/dir/exmaple-config.json'),
      ).toBeInstanceOf(CommonStrategy)
      expect(
        determineConfigStrategy('anoter/example/dir/exmaple-config.yaml'),
      ).toBeInstanceOf(CommonStrategy)
    })

    it('should correctly determine babel strategies by fileName', () => {
      expect(determineConfigStrategy('.babelrc')).toBeInstanceOf(BabelStrategy)
      expect(determineConfigStrategy('.babelrc.json')).toBeInstanceOf(
        BabelStrategy,
      )
      expect(determineConfigStrategy('example/dir/.babelrc')).toBeInstanceOf(
        BabelStrategy,
      )
    })

    it('should correctly determine eslint strategies by fileName', () => {
      expect(determineConfigStrategy('.eslintrc')).toBeInstanceOf(
        EslintStrategy,
      )
      expect(determineConfigStrategy('eslintrc.json')).toBeInstanceOf(
        EslintStrategy,
      )
      expect(determineConfigStrategy('eslintrc.yml')).toBeInstanceOf(
        EslintStrategy,
      )
      expect(determineConfigStrategy('example/dir/.eslintrc')).toBeInstanceOf(
        EslintStrategy,
      )
      expect(
        determineConfigStrategy('anoter/example/dir/eslintrc.yaml'),
      ).toBeInstanceOf(EslintStrategy)
    })
  })
})
