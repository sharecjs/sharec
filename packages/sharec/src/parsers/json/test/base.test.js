const { fixtures } = require('testUtils')
const { parseJSON, makeJSON } = require('../')

describe('parsers > json', () => {
  const defaultFxt = fixtures('default/json/00-base')
  const currentMap = new Map().set('foo', 'bar').set('bar', 'baz')
  const defaultFxtMap = new Map(currentMap).set('baz', currentMap)

  describe('parseJSON', () => {
    it('should create Map from given JSON', () => {
      expect(parseJSON(defaultFxt.current)).toEqual(defaultFxtMap)
    })
  })

  describe('makeJSON', () => {
    it('should create JSON string from Map', () => {
      expect(makeJSON(defaultFxtMap)).toEqual(defaultFxt.current)
    })
  })
})
