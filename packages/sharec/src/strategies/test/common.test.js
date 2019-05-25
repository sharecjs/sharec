const path = require('path')
const { readFileSync } = require('fs')
const { strategy, yamlStrategy } = require('../common')

describe('strategy > common', () => {
  describe('json strategy', () => {
    const common01 = require('./fixtures/common/json/common_01.json')
    const common02 = require('./fixtures/common/json/common_02.json')
    const common03 = require('./fixtures/common/json/common_03.json')

    it('should merge objects by one deep level', () => {
      expect(strategy(common01, common02)).toEqual(common03)
    })
  })

  describe('yaml strategy', () => {
    const common01 = readFileSync(
      path.resolve(__dirname, './fixtures/common/yaml/common_01.yml'),
      'utf8',
    )
    const common02 = readFileSync(
      path.resolve(__dirname, './fixtures/common/yaml/common_02.yml'),
      'utf8',
    )
    const common03 = readFileSync(
      path.resolve(__dirname, './fixtures/common/yaml/common_03.yml'),
      'utf8',
    )

    it('should merge objects by one deep level', () => {
      expect(yamlStrategy(common01, common02)).toEqual(common03)
    })
  })
})
