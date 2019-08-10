const { fixture } = require('testUtils')
const { commonStrategy } = require('../common')

describe('strategy > common', () => {
  const common01 = fixture('common/json/common_01.json', 'json')
  const common02 = fixture('common/json/common_02.json', 'json')
  const commonYaml01 = fixture('common/yaml/common_01.yml')
  const commonYaml02 = fixture('common/yaml/common_02.yml')

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
