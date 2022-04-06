const { fixtures } = require('testUtils')
const compose = require('../../compose')
const { primitiveAtom } = require('../../../atoms')

describe('actions > compose > operators', () => {
  const hashFxt = fixtures('rule/json/01-hash', 'map')

  describe('$$default', () => {
    it('applies default strategy for all fields', () => {
      const composition = compose({ $$default: primitiveAtom })
      const result = composition(hashFxt)

      expect(result).toEqual(hashFxt.result)
    })
  })

  describe('$$ignore', () => {
    const composition = compose({ $$default: primitiveAtom, $$ignore: ['bar'] })

    describe('current', () => {
      it('applies all fields except ignored one', () => {
        const result = composition({
          current: new Map([['foo', 'foo'], ['bar', 'bar'], ['baz', 'baz']]),
          upcoming: new Map([['foo', 'new foo'], ['bar', 'new bar'], ['baz', 'baz']]),
        })

        expect(result).toEqual(new Map([['foo', 'new foo'], ['bar', 'bar'], ['baz', 'baz']]))
      })
    })

    describe('upcoming', () => {
      it('applies all fields except ignored one', () => {
        const result = composition({
          current: new Map([['foo', 'foo'], ['baz', 'baz']]),
          upcoming: new Map([['foo', 'new foo'], ['bar', 'new bar'], ['baz', 'baz']]),
        })

        expect(result).toEqual(new Map([['foo', 'new foo'], ['baz', 'baz']]))
      })
    })
  })
})
