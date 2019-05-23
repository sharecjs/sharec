const {
  mergeHashes,
  mergeHashesWithFields,
  deepMergeHashesWithFields,
  mergeHashesWithoutFields,
  deepMergeHashesWithoutFields,
} = require('../strategies')

describe('utils > strategies', () => {
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

  describe('mergeHashesWithFields', () => {
    it('should extract given fields from objects and merge to one hash', () => {
      const a = {
        foo: 'bar',
        bar: 'baz',
      }
      const b = {
        foo: 'baz',
        bar: 'foo',
      }

      expect(mergeHashesWithFields(a, b, ['foo'])).toEqual({
        foo: 'baz',
      })
    })
  })

  describe('deepMergeHashesWithFields', () => {
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

      expect(deepMergeHashesWithFields(a, b, ['bar'])).toEqual({
        bar: {
          foo: 'baz',
          bar: 'baz',
        },
      })
    })
  })

  describe('mergeHashesWithoutFields', () => {
    it('should omit given fields from passed objects and merge them', () => {
      const a = {
        foo: 'bar',
        bar: 'baz',
      }
      const b = {
        foo: 'baz',
        bar: 'foo',
      }

      expect(mergeHashesWithoutFields(a, b, ['foo'])).toEqual({
        bar: 'foo',
      })
    })
  })

  describe('deepMergeHashesWithoutFields', () => {
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

      expect(deepMergeHashesWithoutFields(a, b, ['bar'])).toEqual({
        bar: {
          foo: 'baz',
        },
      })
    })
  })
})
