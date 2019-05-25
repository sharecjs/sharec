const path = require('path')
const { readFileSync } = require('fs')
const { withYaml } = require('../strategies')

const yamlFixture01 = readFileSync(
  path.resolve(__dirname, './fixtures/withYaml_01.yml'),
  'utf8',
)
const yamlFixture02 = readFileSync(
  path.resolve(__dirname, './fixtures/withYaml_02.yml'),
  'utf8',
)
const yamlFixture03 = readFileSync(
  path.resolve(__dirname, './fixtures/withYaml_03.yml'),
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

      expect(yamledStrategy(yamlFixture01, yamlFixture02)).toEqual(
        yamlFixture03,
      )
    })
  })
})
