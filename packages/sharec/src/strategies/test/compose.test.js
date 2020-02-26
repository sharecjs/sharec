const { fixtures } = require('testUtils')
const compose = require('../compose')
const { primitiveStrategy } = require('../atoms')

describe('strategies > compose', () => {
  const hashFxt = fixtures('rule/json/01-hash', 'json')
  const listFxt = fixtures('list/json/00-base', 'json')

  it('should create composition for hashes', () => {
    const composition = compose({
      foo: primitiveStrategy,
      bar: primitiveStrategy,
      baz: primitiveStrategy,
    })
    const result = composition(hashFxt)

    expect(result).toEqual(hashFxt.result)
  })

  it('should create composition for lists', () => {
    const composition = compose([primitiveStrategy])
    const result = composition(listFxt)

    expect(result).toEqual(listFxt.result)
  })

  it('should allow to compose nested compositions', () => {
    const composition = compose({
      foo: compose([primitiveStrategy]),
    })
    const result = composition({
      current: { foo: listFxt.current },
      upcoming: { foo: listFxt.upcoming },
      cached: { foo: listFxt.cached },
    })

    expect(result).toEqual({ foo: listFxt.result })
  })

  describe('operators', () => {
    describe('$$default', () => {
      it('should apply default strategy for all fields', () => {
        const composition = compose({ $$default: primitiveStrategy })
        const result = composition(hashFxt)

        expect(result).toEqual(hashFxt.result)
      })

      it('should apply default strategy for fields without strategies', () => {
        const composition = compose({ $$default: primitiveStrategy })
        const result = composition(hashFxt)

        expect(result).toEqual(hashFxt.result)
      })
    })
  })
})
