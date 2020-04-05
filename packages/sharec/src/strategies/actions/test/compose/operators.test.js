const { fixtures } = require('testUtils')
const compose = require('../../compose')
const { primitiveAtom } = require('../../../atoms')

describe('actions > compose > operators', () => {
  const hashFxt = fixtures('atomic/rule/json/01-hash', 'json')

  describe('$$default', () => {
    it('should apply default strategy for all fields', () => {
      const composition = compose({ $$default: primitiveAtom })
      const result = composition(hashFxt)

      expect(result).toEqual(hashFxt.result)
    })

    it('should apply default strategy for fields without strategies', () => {
      const composition = compose({ $$default: primitiveAtom })
      const result = composition(hashFxt)

      expect(result).toEqual(hashFxt.result)
    })
  })
})
