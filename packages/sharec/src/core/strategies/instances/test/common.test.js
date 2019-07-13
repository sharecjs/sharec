const path = require('path')
const { readFileSync } = require.requireActual('fs')
const { commonStrategy } = require('../common')

describe('strategy > common', () => {
  const common01 = require('fixtures/common/json/common_01.json')
  const common02 = require('fixtures/common/json/common_02.json')
  const commonYaml01 = readFileSync(
    path.resolve(
      __dirname,
      '../../../../../test/fixtures/common/yaml/common_01.yml',
    ),
    'utf8',
  )
  const commonYaml02 = readFileSync(
    path.resolve(
      __dirname,
      '../../../../../test/fixtures/common/yaml/common_02.yml',
    ),
    'utf8',
  )

  describe('json strategy', () => {
    it('should merge objects by one deep level', () => {
      expect(commonStrategy.mergeJSON(common01, common02)).toMatchSnapshot()
    })
  })

  describe('yaml strategy', () => {
    it('should merge objects by one deep level', () => {
      expect(
        commonStrategy.mergeYAML(commonYaml01, commonYaml02),
      ).toMatchSnapshot()
    })
  })

  describe('merge', () => {
    it('should automatically merge configs with method determination', () => {
      expect(
        commonStrategy.merge('config.json')(common01, common02),
      ).toMatchSnapshot()
      expect(
        commonStrategy.merge('config.yaml')(commonYaml01, commonYaml02),
      ).toMatchSnapshot()
    })

    it('should return last argument if it is not mergable', () => {
      expect(commonStrategy.merge('config')('bar', 'baz')).toBe('baz')
    })
  })
})
