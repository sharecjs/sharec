const { isMap, pick, pickBy, omit, omitBy } = require('../map')

describe('utils > map', () => {
  describe('isMap', () => {
    describe('with Map', () => {
      it('returns true', () => {
        expect(isMap(new Map())).toBe(true)
      })
    })

    describe('with no Map', () => {
      it('returns false', () => {
        expect(isMap(1)).toBe(false)
        expect(isMap('foo')).toBe(false)
        expect(isMap({})).toBe(false)
        expect(isMap([])).toBe(false)
        expect(isMap(new Set())).toBe(false)
        expect(isMap(new WeakMap())).toBe(false)
      })
    })
  })

  describe('pick', () => {
    it('returns values by given keys', () => {
      const target = new Map().set('foo', 'bar').set('bar', 'baz')

      expect(pick(target, ['foo'])).toEqual(new Map().set('foo', 'bar'))
    })
  })

  describe('omit', () => {
    it('returns map without given keys', () => {
      const target = new Map().set('foo', 'bar').set('bar', 'baz')

      expect(omit(target, ['foo'])).toEqual(new Map().set('bar', 'baz'))
    })
  })

  describe('pickBy', () => {
    it('returns values matched with predicate', () => {
      const target = new Map().set('foo', 1).set('bar', 'baz')

      expect(pickBy(target, (val) => typeof val === 'number')).toEqual(new Map().set('foo', 1))
    })
  })

  describe('omitBy', () => {
    it('returns map without values mathced with predicate', () => {
      const target = new Map().set('foo', 1).set('bar', 'baz')

      expect(omitBy(target, (val) => typeof val === 'number')).toEqual(new Map().set('bar', 'baz'))
    })
  })
})
