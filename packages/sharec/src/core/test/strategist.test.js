const fakeStrategiesMap = {
  common: {
    strategy: 'commonStrategy',
    yamlStrategy: 'commonYamlStrategy',
  },
  babel: {
    strategy: 'babelStrategy',
  },
  eslint: {
    strategy: 'eslintStrategy',
    yamlStrategy: 'eslintYamlStrategy',
  },
}
jest.mock('strategies', () => fakeStrategiesMap)

const { determineConfigStrategy } = require('core/strategist')

describe('core > strategist >', () => {
  describe('determineConfigStrategy', () => {
    afterAll(() => {
      jest.unmock('strategies')
    })

    it('should correctly determine common strategies by fileName', () => {
      expect(determineConfigStrategy('sample-config.json')).toBe(
        fakeStrategiesMap.common.strategy,
      )
      expect(determineConfigStrategy('exmaple-config.yml')).toBe(
        fakeStrategiesMap.common.yamlStrategy,
      )
      expect(determineConfigStrategy('example/dir/exmaple-config.json')).toBe(
        fakeStrategiesMap.common.strategy,
      )
      expect(
        determineConfigStrategy('anoter/example/dir/exmaple-config.yaml'),
      ).toBe(fakeStrategiesMap.common.yamlStrategy)
    })

    it('should correctly determine babel strategies by fileName', () => {
      expect(determineConfigStrategy('.babelrc')).toBe(
        fakeStrategiesMap.babel.strategy,
      )
      expect(determineConfigStrategy('.babelrc.json')).toBe(
        fakeStrategiesMap.babel.strategy,
      )
      expect(determineConfigStrategy('example/dir/.babelrc')).toBe(
        fakeStrategiesMap.babel.strategy,
      )
    })

    it('should correctly determine eslint strategies by fileName', () => {
      expect(determineConfigStrategy('.eslintrc')).toBe(
        fakeStrategiesMap.eslint.strategy,
      )
      expect(determineConfigStrategy('eslintrc.json')).toBe(
        fakeStrategiesMap.eslint.strategy,
      )
      expect(determineConfigStrategy('eslintrc.yml')).toBe(
        fakeStrategiesMap.eslint.yamlStrategy,
      )
      expect(determineConfigStrategy('example/dir/.eslintrc')).toBe(
        fakeStrategiesMap.eslint.strategy,
      )
      expect(determineConfigStrategy('anoter/example/dir/eslintrc.yaml')).toBe(
        fakeStrategiesMap.eslint.yamlStrategy,
      )
    })

    it('should return null if file is not have defined special strategy or it not json or yaml', () => {
      expect(determineConfigStrategy('.editorconfig')).toBeNull()
      expect(determineConfigStrategy('example/dir/.gitkeep')).toBeNull()
    })
  })
})
