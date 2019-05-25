const path = require('path')
const { readFileSync } = require('fs')
const { fromYaml, toYaml } = require('../yaml')
const { readFile } = require('../index')

const jsonFixture = require('./fixtures/eslintrc_01.json')
const yamlFixture = readFileSync(
  path.resolve(__dirname, './fixtures/eslintrc_01.yml'),
  'utf8',
)

describe('utils > yaml', () => {
  describe('fromYaml', () => {
    it('should convert yaml string to json', () => {
      expect(fromYaml(yamlFixture)).toEqual(jsonFixture)
    })
  })

  describe('toYaml', () => {
    it('should convert json or js-object to yaml string', () => {
      expect(toYaml(jsonFixture)).toEqual(yamlFixture)
    })
  })
})
