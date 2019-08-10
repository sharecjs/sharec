const { fixture } = require('testUtils')
const { eslintStrategy } = require('../eslint')

describe('strategy > eslint', () => {
  const eslint01 = fixture('eslint/json/eslintrc_01.json', 'json')
  const eslint02 = fixture('eslint/json/eslintrc_02.json', 'json')
  const eslint04 = fixture('eslint/json/eslintrc_04.json', 'json')
  const eslint05 = fixture('eslint/json/eslintrc_05.json', 'json')
  const eslintYaml01 = fixture('eslint/yaml/eslintrc_01.yml')
  const eslintYaml02 = fixture('eslint/yaml/eslintrc_02.yml')
  const eslintYaml04 = fixture('eslint/yaml/eslintrc_04.yml')
  const eslintYaml05 = fixture('eslint/yaml/eslintrc_05.yml')

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

    it('should fully unapply JSON config and return empty object', () => {
      expect(eslintStrategy.unapplyJSON(eslint04, eslint04)).toEqual({})
    })
  })

  describe('uapplying YAML', () => {
    it('should remove applyed YAML config', () => {
      expect(
        eslintStrategy.unapplyYAML(eslintYaml04, eslintYaml05),
      ).toMatchSnapshot()
    })

    it('should fully unapply YAML config and return empty object', () => {
      expect(eslintStrategy.unapplyYAML(eslintYaml04, eslintYaml04)).toEqual('')
    })
  })

  describe('auto unapply', () => {
    it('should automatically unapply configs', () => {
      expect(
        eslintStrategy.unapply('.eslintrc')(eslint04, eslint05),
      ).toMatchSnapshot()
      expect(
        eslintStrategy.unapply('eslintrc.yml')(eslintYaml04, eslintYaml05),
      ).toMatchSnapshot()
    })
  })
})
