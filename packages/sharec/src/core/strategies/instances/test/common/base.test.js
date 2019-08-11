const { fixtures } = require('testUtils')
const { commonStrategy } = require('../../common')

describe('strategy > common', () => {
  const commonBaseFxt = fixtures('common/json/01-base', 'json')
  const commonBaseFxtYaml = fixtures('common/yaml/01-base')

  describe('merge', () => {
    it('should return last argument if it is not mergable', () => {
      expect(commonStrategy.merge('config')('bar', 'baz')).toBe('baz')
    })

    describe('JSON', () => {
      it('should merge objects by one deep level', () => {
        expect(
          commonStrategy.mergeJSON(commonBaseFxt.current, commonBaseFxt.new),
        ).toEqual(commonBaseFxt.result)
      })

      it('should automatically merge configs with method determination', () => {
        expect(
          commonStrategy.merge('config.json')(
            commonBaseFxt.current,
            commonBaseFxt.new,
          ),
        ).toEqual(commonBaseFxt.result)
      })
    })

    describe('YAML', () => {
      it('should merge objects by one deep level', () => {
        expect(
          commonStrategy.mergeYAML(
            commonBaseFxtYaml.current,
            commonBaseFxtYaml.new,
          ),
        ).toEqual(commonBaseFxtYaml.result)
      })
      it('should automatically merge configs with method determination', () => {
        expect(
          commonStrategy.merge('config.yaml')(
            commonBaseFxtYaml.current,
            commonBaseFxtYaml.new,
          ),
        ).toEqual(commonBaseFxtYaml.result)
      })
    })
  })

  describe('unapply', () => {
    describe('JSON', () => {
      it('should unapply objects by one deep level', () => {
        expect(
          commonStrategy.unapplyJSON(commonBaseFxt.result, commonBaseFxt.new),
        ).toEqual(commonBaseFxt.restored)
      })

      it('should automatically unapply configs with method determination', () => {
        expect(
          commonStrategy.unapply('config.json')(
            commonBaseFxt.result,
            commonBaseFxt.new,
          ),
        ).toEqual(commonBaseFxt.restored)
      })
    })

    describe('YAML', () => {
      it('should unapply objects by one deep level', () => {
        expect(
          commonStrategy.unapplyYAML(
            commonBaseFxtYaml.result,
            commonBaseFxtYaml.new,
          ),
        ).toEqual(commonBaseFxtYaml.restored)
      })

      it('should automatically merge configs with method determination', () => {
        expect(
          commonStrategy.unapply('config.yaml')(
            commonBaseFxtYaml.result,
            commonBaseFxtYaml.new,
          ),
        ).toEqual(commonBaseFxtYaml.restored)
      })
    })
  })
})
