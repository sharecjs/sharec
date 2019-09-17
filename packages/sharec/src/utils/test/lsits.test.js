const { mergeLists, listsDiff } = require('../lists')

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
})
