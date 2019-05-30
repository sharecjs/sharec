const path = require('path')
const { readFileSync } = require.requireActual('fs')
const { strategy, yamlStrategy } = require('strategies/eslint')

describe('strategy > eslint', () => {
  const eslint01 = require('fixtures/eslint/json/eslintrc_01.json')
  const eslint02 = require('fixtures/eslint/json/eslintrc_02.json')

  describe('json strategy', () => {
    it('should merge eslint json configs', () => {
      expect(strategy(eslint01, eslint02)).toMatchSnapshot()
    })
  })

  describe('yaml strategy', () => {
    const eslint01 = readFileSync(
      path.resolve(
        __dirname,
        '../../../test/fixtures/eslint/yaml/eslintrc_01.yml',
      ),
      'utf8',
    )
    const eslint02 = readFileSync(
      path.resolve(
        __dirname,
        '../../../test/fixtures/eslint/yaml/eslintrc_02.yml',
      ),
      'utf8',
    )

    it('should merge eslint yaml configs', () => {
      expect(yamlStrategy(eslint01, eslint02)).toMatchSnapshot()
    })
  })
})
