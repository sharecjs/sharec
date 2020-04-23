const { fixtures } = require('testUtils')
const { fromJSON, toJSON } = require('../')

describe('parsers > json', () => {
  const defaultFxt = fixtures('default/json/00-base')
  const currentMap = new Map().set('foo', 'bar').set('bar', 'baz')
  const defaultFxtMap = new Map(currentMap).set('baz', currentMap)

  describe('fromJSON', () => {
    it('should create Map from given JSON', () => {
      expect(fromJSON(defaultFxt.current)).toEqual(defaultFxtMap)
    })
  })

  describe('toJSON', () => {
    it('should create JSON string from Map', () => {
      expect(toJSON(defaultFxtMap)).toEqual(defaultFxt.current)
    })
  })
})
