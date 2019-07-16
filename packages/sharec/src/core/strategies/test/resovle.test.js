const { resolveConfigStrategy } = require('../resolve')
const { CommonStrategy } = require('../instances/common')
const { BabelStrategy } = require('../instances/babel')
const { EslintStrategy } = require('../instances/eslint')

describe('core > strategist >', () => {
  describe('resolveConfigStrategy', () => {
    it('should correctly determine common strategies by fileName', () => {
      expect(resolveConfigStrategy('sample-config.json')).toBeInstanceOf(
        CommonStrategy,
      )
      expect(resolveConfigStrategy('exmaple-config.yml')).toBeInstanceOf(
        CommonStrategy,
      )
      expect(
        resolveConfigStrategy('example/dir/exmaple-config.json'),
      ).toBeInstanceOf(CommonStrategy)
      expect(
        resolveConfigStrategy('anoter/example/dir/exmaple-config.yaml'),
      ).toBeInstanceOf(CommonStrategy)
    })

    it('should correctly determine babel strategies by fileName', () => {
      expect(resolveConfigStrategy('.babelrc')).toBeInstanceOf(BabelStrategy)
      expect(resolveConfigStrategy('.babelrc.json')).toBeInstanceOf(
        BabelStrategy,
      )
      expect(resolveConfigStrategy('example/dir/.babelrc')).toBeInstanceOf(
        BabelStrategy,
      )
    })

    it('should correctly determine eslint strategies by fileName', () => {
      expect(resolveConfigStrategy('.eslintrc')).toBeInstanceOf(EslintStrategy)
      expect(resolveConfigStrategy('eslintrc.json')).toBeInstanceOf(
        EslintStrategy,
      )
      expect(resolveConfigStrategy('eslintrc.yml')).toBeInstanceOf(
        EslintStrategy,
      )
      expect(resolveConfigStrategy('example/dir/.eslintrc')).toBeInstanceOf(
        EslintStrategy,
      )
      expect(
        resolveConfigStrategy('anoter/example/dir/eslintrc.yaml'),
      ).toBeInstanceOf(EslintStrategy)
    })
  })
})
