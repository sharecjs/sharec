const { fixtures } = require('testUtils')
const { commonStrategy } = require('../../common')

describe('strategy > common > lists > ', () => {
  const listsFxt = fixtures('common/json/02-lists', 'json')
  const listsFxtYaml = fixtures('common/yaml/02-lists')

  describe('merge', () => {
    describe('JSON', () => {
      it('should merge objects by one deep level', () => {
        expect(
          commonStrategy.mergeJSON({
            current: listsFxt.current,
            upcoming: listsFxt.upcoming,
          }),
        ).toEqual(listsFxt.result)
      })

      it('should automatically merge configs with method determination', () => {
        expect(
          commonStrategy.merge('config.json')({
            current: listsFxt.current,
            upcoming: listsFxt.upcoming,
          }),
        ).toEqual(listsFxt.result)
      })
    })

    describe('YAML', () => {
      it('should merge objects by one deep level', () => {
        expect(
          commonStrategy.mergeYAML({
            current: listsFxtYaml.current,
            upcoming: listsFxtYaml.upcoming,
          }),
        ).toEqual(listsFxtYaml.result)
      })
      it('should automatically merge configs with method determination', () => {
        expect(
          commonStrategy.merge('config.yaml')({
            current: listsFxtYaml.current,
            upcoming: listsFxtYaml.upcoming,
          }),
        ).toEqual(listsFxtYaml.result)
      })
    })
  })

  describe('unapply', () => {
    describe('JSON', () => {
      it('should unapply objects by one deep level', () => {
        expect(
          commonStrategy.unapplyJSON({
            current: listsFxt.result,
            upcoming: listsFxt.upcoming,
          }),
        ).toEqual(listsFxt.restored)
      })

      it('should automatically unapply configs with method determination', () => {
        expect(
          commonStrategy.unapply('config.json')({
            current: listsFxt.result,
            upcoming: listsFxt.upcoming,
          }),
        ).toEqual(listsFxt.restored)
      })
    })

    describe('YAML', () => {
      it('should unapply objects by one deep level', () => {
        expect(
          commonStrategy.unapplyYAML({
            current: listsFxtYaml.result,
            upcoming: listsFxtYaml.upcoming,
          }),
        ).toEqual(listsFxtYaml.restored)
      })

      it('should automatically merge configs with method determination', () => {
        expect(
          commonStrategy.unapply('config.yaml')({
            current: listsFxtYaml.result,
            upcoming: listsFxtYaml.upcoming,
          }),
        ).toEqual(listsFxtYaml.restored)
      })
    })
  })
})
