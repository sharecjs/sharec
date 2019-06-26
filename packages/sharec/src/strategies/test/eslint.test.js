const path = require('path')
const { readFileSync } = require.requireActual('fs')
const { eslintStrategy } = require('strategies/eslint')

describe('strategy > eslint', () => {
  const eslint01 = require('fixtures/eslint/json/eslintrc_01.json')
  const eslint02 = require('fixtures/eslint/json/eslintrc_02.json')
  const eslint04 = require('fixtures/eslint/json/eslintrc_04.json')
  const eslint05 = require('fixtures/eslint/json/eslintrc_05.json')
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
  const eslintYaml04 = readFileSync(
    path.resolve(
      __dirname,
      '../../../test/fixtures/eslint/yaml/eslintrc_04.yml',
    ),
    'utf8',
  )
  const eslintYaml05 = readFileSync(
    path.resolve(
      __dirname,
      '../../../test/fixtures/eslint/yaml/eslintrc_05.yml',
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

  describe('uapplying JSON', () => {
    it('should remove applyed JSON config', () => {
      expect(eslintStrategy.unapplyJSON(eslint04, eslint05)).toMatchSnapshot()
    })
  })

  describe('uapplying YAML', () => {
    it('should remove applyed YAML config', () => {
      expect(
        eslintStrategy.unapplyYAML(eslintYaml04, eslintYaml05),
      ).toMatchSnapshot()
    })
  })

  describe('auto unapply', () => {
    it('should automatically unapply configs', () => {
      expect(
        eslintStrategy.unapply('.eslintrc')(eslint05, eslint04),
      ).toMatchSnapshot()
      expect(
        eslintStrategy.unapply('eslintrc.yml')(eslintYaml05, eslintYaml04),
      ).toMatchSnapshot()
    })
  })
})
