const { mergeLists, listsDiff, normalizeList } = require('../lists')

describe('utils > lists >', () => {
  describe('mergeLists', () => {
    it('should merget lists without duplication', () => {
      const a = ['foo', 'bar']
      const b = ['bar', 'baz']

      expect(mergeLists(a, b)).toEqual(['foo', 'bar', 'baz'])
    })
  })

  describe('listsDiff', () => {
    it('should return lists diff', () => {
      const a = ['foo', 'bar']
      const b = ['bar', 'baz']

      expect(listsDiff(a, b)).toEqual(['foo'])
    })
  })

  describe('normalizeList', () => {
    it('should transform object to array', () => {
      const list = {
        0: 1,
        1: 2,
        2: 3,
      }

      expect(normalizeList(list)).toEqual([1, 2, 3])
    })
  })
})
