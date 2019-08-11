const { fixtures } = require('testUtils')
const { commonStrategy } = require('../../common')

describe('strategy > lists > ', () => {
  const listsFxt = fixtures('common/json/02-lists', 'json')
  const listsFxtYaml = fixtures('common/yaml/02-lists')

  describe('merge', () => {
    describe('JSON', () => {
      it('should merge objects by one deep level', () => {
        expect(
          commonStrategy.mergeJSON(listsFxt.current, listsFxt.new),
        ).toEqual(listsFxt.result)
      })

      it('should automatically merge configs with method determination', () => {
        expect(
          commonStrategy.merge('config.json')(listsFxt.current, listsFxt.new),
        ).toEqual(listsFxt.result)
      })
    })

    describe('YAML', () => {
      it('should merge objects by one deep level', () => {
        expect(
          commonStrategy.mergeYAML(listsFxtYaml.current, listsFxtYaml.new),
        ).toEqual(listsFxtYaml.result)
      })
      it('should automatically merge configs with method determination', () => {
        expect(
          commonStrategy.merge('config.yaml')(
            listsFxtYaml.current,
            listsFxtYaml.new,
          ),
        ).toEqual(listsFxtYaml.result)
      })
    })
  })

  describe('unapply', () => {
    describe('JSON', () => {
      it('should unapply objects by one deep level', () => {
        expect(
          commonStrategy.unapplyJSON(listsFxt.result, listsFxt.new),
        ).toEqual(listsFxt.restored)
      })

      it('should automatically unapply configs with method determination', () => {
        expect(
          commonStrategy.unapply('config.json')(listsFxt.result, listsFxt.new),
        ).toEqual(listsFxt.restored)
      })
    })

    describe('YAML', () => {
      it('should unapply objects by one deep level', () => {
        expect(
          commonStrategy.unapplyYAML(listsFxtYaml.result, listsFxtYaml.new),
        ).toEqual(listsFxtYaml.restored)
      })

      it('should automatically merge configs with method determination', () => {
        expect(
          commonStrategy.unapply('config.yaml')(
            listsFxtYaml.result,
            listsFxtYaml.new,
          ),
        ).toEqual(listsFxtYaml.restored)
      })
    })
  })
})
