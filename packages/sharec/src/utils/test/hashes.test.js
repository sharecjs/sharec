const {
  mergeHashes,
  mergeHashesWithKeys,
  deepMergeHashesWithKeys,
  mergeHashesWithoutKeys,
  deepMergeHashesWithoutKeys,
} = require('utils/hashes')

describe('utils > hashes', () => {
  describe('mergeHashes', () => {
    it('should merge given hashes', () => {
      const foo = {
        foo: 'bar',
      }
      const bar = {
        bar: 'baz',
      }

      expect(mergeHashes(foo, bar)).toEqual({
        foo: 'bar',
        bar: 'baz',
      })
    })
  })

  describe('mergeHashesWithKeys', () => {
    it('should extract given fields from objects and merge to one hash', () => {
      const a = {
        foo: 'bar',
        bar: 'baz',
      }
      const b = {
        foo: 'baz',
        bar: 'foo',
      }

      expect(mergeHashesWithKeys(a, b, ['foo'])).toEqual({
        foo: 'baz',
      })
    })
  })

  describe('deepMergeHashesWithKeys', () => {
    it('should extract given fields from objects and merge to one hash deeply', () => {
      const a = {
        foo: 'bar',
        bar: {
          foo: 'bar',
          bar: {
            foo: 'bar',
          },
        },
      }
      const b = {
        foo: 'baz',
        bar: {
          foo: 'baz',
          bar: 'baz',
        },
      }

      expect(deepMergeHashesWithKeys(a, b, ['bar'])).toEqual({
        bar: {
          foo: 'baz',
          bar: 'baz',
        },
      })
    })
  })

  describe('mergeHashesWithoutKeys', () => {
    it('should omit given fields from passed objects and merge them', () => {
      const a = {
        foo: 'bar',
        bar: 'baz',
      }
      const b = {
        foo: 'baz',
        bar: 'foo',
      }

      expect(mergeHashesWithoutKeys(a, b, ['foo'])).toEqual({
        bar: 'foo',
      })
    })
  })

  describe('deepMergeHashesWithoutKeys', () => {
    it('should omit given fields from passed objects and merge them deeply', () => {
      const a = {
        foo: 'bar',
        bar: {
          foo: 'bar',
          bar: {
            foo: 'bar',
          },
        },
      }
      const b = {
        foo: 'baz',
        bar: {
          foo: 'baz',
          bar: 'baz',
        },
      }

      expect(deepMergeHashesWithoutKeys(a, b, ['bar'])).toEqual({
        foo: 'baz',
      })
    })
  })
})
