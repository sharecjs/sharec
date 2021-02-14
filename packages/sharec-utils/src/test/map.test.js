const { pick, pickBy, omit, omitBy } = require('../map')

describe('utils > map', () => {
  describe('pick', () => {
    it('should pick values by given keys', () => {
      const target = new Map().set('foo', 'bar').set('bar', 'baz')

      expect(pick(target, ['foo'])).toEqual(new Map().set('foo', 'bar'))
    })
  })

  describe('omit', () => {
    it('should omit values by given keys', () => {
      const target = new Map().set('foo', 'bar').set('bar', 'baz')

      expect(omit(target, ['foo'])).toEqual(new Map().set('bar', 'baz'))
    })
  })

  describe('pickBy', () => {
    it('should pick values by predicate function', () => {
      const target = new Map().set('foo', 1).set('bar', 'baz')

      expect(pickBy(target, (val) => typeof val === 'number')).toEqual(new Map().set('foo', 1))
    })
  })

  describe('omitBy', () => {
    it('should omit values by predicate function', () => {
      const target = new Map().set('foo', 1).set('bar', 'baz')

      expect(omitBy(target, (val) => typeof val === 'number')).toEqual(new Map().set('bar', 'baz'))
    })
  })
})
