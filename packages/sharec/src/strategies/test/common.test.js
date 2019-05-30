const path = require('path')
const { readFileSync } = require.requireActual('fs')
const { strategy, yamlStrategy } = require('strategies/common')

describe('strategy > common', () => {
  describe('json strategy', () => {
    const common01 = require('fixtures/common/json/common_01.json')
    const common02 = require('fixtures/common/json/common_02.json')

    it('should merge objects by one deep level', () => {
      expect(strategy(common01, common02)).toMatchSnapshot()
    })
  })

  describe('yaml strategy', () => {
    const common01 = readFileSync(
      path.resolve(
        __dirname,
        '../../../test/fixtures/common/yaml/common_01.yml',
      ),
      'utf8',
    )
    const common02 = readFileSync(
      path.resolve(
        __dirname,
        '../../../test/fixtures/common/yaml/common_02.yml',
      ),
      'utf8',
    )

    it('should merge objects by one deep level', () => {
      expect(yamlStrategy(common01, common02)).toMatchSnapshot()
    })
  })
})
