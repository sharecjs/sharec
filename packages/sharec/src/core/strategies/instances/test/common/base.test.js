const { fixture } = require('testUtils')
const { commonStrategy } = require('../../common')

describe('strategy > common', () => {
  const commonCurrentJSON = fixture('common/json/01-base/current.json', 'json')
  const commonNewJSON = fixture('common/json/01-base/new.json', 'json')
  const commonResultJSON = fixture('common/json/01-base/result.json', 'json')
  const commonRestoredJSON = fixture(
    'common/json/01-base/restored.json',
    'json',
  )
  const commonCurrentYAML = fixture('common/yaml/01-base/current.yml')
  const commonNewYAML = fixture('common/yaml/01-base/new.yml')
  const commonResultYAML = fixture('common/yaml/01-base/result.yml')
  const commonRestoredYAML = fixture('common/yaml/01-base/restored.yml')

  describe('merge', () => {
    it('should return last argument if it is not mergable', () => {
      expect(commonStrategy.merge('config')('bar', 'baz')).toBe('baz')
    })

    describe('JSON', () => {
      it('should merge objects by one deep level', () => {
        expect(
          commonStrategy.mergeJSON(commonCurrentJSON, commonNewJSON),
        ).toEqual(commonResultJSON)
      })

      it('should automatically merge configs with method determination', () => {
        expect(
          commonStrategy.merge('config.json')(commonCurrentJSON, commonNewJSON),
        ).toEqual(commonResultJSON)
      })
    })

    describe('YAML', () => {
      it('should merge objects by one deep level', () => {
        expect(
          commonStrategy.mergeYAML(commonCurrentYAML, commonNewYAML),
        ).toEqual(commonResultYAML)
      })
      it('should automatically merge configs with method determination', () => {
        expect(
          commonStrategy.merge('config.yaml')(commonCurrentYAML, commonNewYAML),
        ).toEqual(commonResultYAML)
      })
    })
  })

  describe('unapply', () => {
    describe('JSON', () => {
      it('should unapply objects by one deep level', () => {
        expect(
          commonStrategy.unapplyJSON(commonResultJSON, commonNewJSON),
        ).toEqual(commonRestoredJSON)
      })

      it('should automatically unapply configs with method determination', () => {
        expect(
          commonStrategy.unapply('config.json')(
            commonResultJSON,
            commonNewJSON,
          ),
        ).toEqual(commonRestoredJSON)
      })
    })

    describe('YAML', () => {
      it('should unapply objects by one deep level', () => {
        expect(
          commonStrategy.unapplyYAML(commonResultYAML, commonNewYAML),
        ).toEqual(commonRestoredYAML)
      })

      it('should automatically merge configs with method determination', () => {
        expect(
          commonStrategy.unapply('config.yaml')(
            commonResultYAML,
            commonNewYAML,
          ),
        ).toEqual(commonRestoredYAML)
      })
    })
  })
})
