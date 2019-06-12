const path = require('path')
const { readFileSync } = require.requireActual('fs')
const { eslintStrategy } = require('strategies/eslint')

describe('strategy > eslint', () => {
  const eslint01 = require('fixtures/eslint/json/eslintrc_01.json')
  const eslint02 = require('fixtures/eslint/json/eslintrc_02.json')
  const eslintYaml01 = readFileSync(
    path.resolve(
      __dirname,
      '../../../test/fixtures/eslint/yaml/eslintrc_01.yml',
    ),
    'utf8',
  )
  const eslintYaml02 = readFileSync(
    path.resolve(
      __dirname,
      '../../../test/fixtures/eslint/yaml/eslintrc_02.yml',
    ),
    'utf8',
  )

  describe('json strategy', () => {
    it('should merge eslint json configs', () => {
      expect(eslintStrategy.mergeJSON(eslint01, eslint02)).toMatchSnapshot()
    })
  })

  describe('yaml strategy', () => {
    it('should merge eslint yaml configs', () => {
      expect(
        eslintStrategy.mergeYAML(eslintYaml01, eslintYaml02),
      ).toMatchSnapshot()
    })
  })

  describe('auto merge', () => {
    it('should automatically merge configs', () => {
      expect(
        eslintStrategy.merge('.eslintrc')(eslint01, eslint02),
      ).toMatchSnapshot()
      expect(
        eslintStrategy.merge('eslintrc.yml')(eslintYaml01, eslintYaml02),
      ).toMatchSnapshot()
    })
  })
})
