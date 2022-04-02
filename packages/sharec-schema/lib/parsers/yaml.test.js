const { fixtures } = require('testUtils')
const { fromYAML, toYAML } = require('./yaml')

describe('parsers > yaml', () => {
  const defaultFxt = fixtures('default/json/00-base')
  const defaultFxtYAML = fixtures('default/yaml/00-base')

  describe('fromYAML', () => {
    it('should create Map from given YAML', () => {
      expect(fromYAML(defaultFxtYAML.current)).toWraplessEqual(defaultFxt.current, {
        eof: false,
      })
    })
  })

  describe('toYAML', () => {
    it('should create YAML string from Map', () => {
      expect(toYAML(defaultFxt.current)).toWraplessEqual(defaultFxtYAML.current, {
        eof: false,
      })
    })
  })
})
