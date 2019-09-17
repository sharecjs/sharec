const { fixture } = require('testUtils')
const { fromYaml, toYaml } = require('../yaml')

const jsonFixture = require('fixtures/eslint/json/eslintrc_01.json')
const yamlFixture = fixture('eslint/yaml/eslintrc_01.yml')

describe('utils > yaml', () => {
  describe('fromYaml', () => {
    it('should convert yaml string to json', () => {
      expect(fromYaml(yamlFixture)).toMatchSnapshot()
    })
  })

  describe('toYaml', () => {
    it('should convert json or js-object to yaml string', () => {
      expect(toYaml(jsonFixture)).toMatchSnapshot()
    })

    it('should convert empty object to an empty string', () => {
      expect(toYaml({})).toBe('')
    })
  })
})
