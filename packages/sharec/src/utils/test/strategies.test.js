const path = require('path')
const { withYaml } = require('utils/strategies')
const { readFileSync } = require.requireActual('fs')

const yamlFixture01 = readFileSync(
  path.resolve(__dirname, '../../../test/fixtures/eslint/yaml/eslintrc_01.yml'),
  'utf8',
)
const yamlFixture02 = readFileSync(
  path.resolve(__dirname, '../../../test/fixtures/eslint/yaml/eslintrc_02.yml'),
  'utf8',
)

describe('strategies', () => {
  describe('withYaml', () => {
    const strategy = (a, b) => ({
      ...a,
      ...b,
    })

    it('should process yaml input with strategy', () => {
      const yamledStrategy = withYaml(strategy)

      expect(yamledStrategy(yamlFixture01, yamlFixture02)).toMatchSnapshot()
    })
  })
})
