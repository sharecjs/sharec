const {
  mergeHashes,
  mergeHashesWithKeys,
  deepMergeHashesWithKeys,
  mergeHashesWithoutKeys,
  deepMergeHashesWithoutKeys,
  intersectHashes,
  removeHashesIntersection,
  deepIntersectHashes,
  deepRemoveHashesIntersection,
  createIntersectionMap,
  withKeys,
  withoutKeys,
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

      expect(deepMergeHashesWithoutKeys(a, b, ['foo'])).toEqual({
        bar: {
          foo: 'baz',
          bar: 'baz',
        },
      })
    })
  })

  describe('intersectHashes', () => {
    it('should get instersected properties with values from given hashes', () => {
      const a = {
        foo: 'foo',
        bar: 'baz',
      }
      const b = {
        foo: 'bar',
        bar: 'baz',
      }

      expect(intersectHashes(a, b)).toEqual({
        bar: 'baz',
      })
    })
  })

  describe('removeHashesIntersection', () => {
    it('should remove intersected properties', () => {
      const a = {
        foo: 'foo',
        bar: 'baz',
      }
      const b = {
        foo: 'bar',
        bar: 'baz',
      }

      expect(removeHashesIntersection(a, b)).toEqual({
        foo: 'foo',
      })
    })
  })

  describe('deepIntersectHashes', () => {
    it('should get instersected properties with values from given hashes deeply', () => {
      const a = {
        foo: 'foo',
        bar: 'baz',
        baz: {
          foo: 'foo',
          bar: 'baz',
          baz: {
            foo: 'foo',
            bar: 'baz',
          },
        },
      }
      const b = {
        foo: 'baz',
        bar: 'baz',
        baz: {
          foo: 'baz',
          bar: 'baz',
          baz: {
            foo: 'baz',
            bar: 'baz',
          },
        },
      }

      expect(deepIntersectHashes(a, b)).toEqual({
        bar: 'baz',
        baz: {
          bar: 'baz',
          baz: {
            bar: 'baz',
          },
        },
      })
    })
  })

  describe('createIntersectionMap', () => {
    it('should return hash with intersected key by levels', () => {
      const a = {
        foo: 'bar',
        bar: 'baz',
        baz: 'foo',
      }
      const b = {
        bar: 'baz',
        baz: {
          bar: 'baz',
          baz: {
            bar: 'baz',
          },
        },
      }

      expect(createIntersectionMap(a)).toEqual({
        $$root: ['foo', 'bar', 'baz'],
      })
      expect(createIntersectionMap(b)).toEqual({
        $$root: ['bar'],
        baz: {
          $$root: ['bar'],
          baz: {
            $$root: ['bar'],
          },
        },
      })
    })
  })

  describe('deepRemoveHashesIntersection', () => {
    it('should remove intersected properties deeply', () => {
      const a = {
        foo: 'foo',
        bar: 'baz',
        baz: {
          foo: 'foo',
          bar: 'baz',
          baz: {
            foo: 'foo',
            bar: 'baz',
          },
        },
      }
      const b = {
        foo: 'baz',
        bar: 'baz',
        baz: {
          foo: 'baz',
          bar: 'baz',
          baz: {
            foo: 'baz',
            bar: 'baz',
          },
        },
      }

      expect(deepRemoveHashesIntersection(a, b)).toEqual({
        foo: 'foo',
        baz: {
          foo: 'foo',
          baz: {
            foo: 'foo',
          },
        },
      })
    })
  })

  describe('withKeys', () => {
    it('should leave only matched properties to given keys from given function parameters ', () => {
      const handler = (a, b) => [a, b]
      const withKeysHandler = withKeys(handler, ['foo'])

      expect(
        withKeysHandler(
          {
            foo: 'bar',
            bar: 'baz',
            baz: 'foo',
          },
          {
            foo: 'foo',
            bar: 'bar',
            baz: 'baz',
          },
        ),
      ).toEqual([
        {
          foo: 'bar',
        },
        {
          foo: 'foo',
        },
      ])
    })
  })

  describe('withoutKeys', () => {
    it('should remove from given function parameters properties matched to given keys', () => {
      const handler = (a, b) => [a, b]
      const withoutKeysHandler = withoutKeys(handler, ['bar', 'baz'])

      expect(
        withoutKeysHandler(
          {
            foo: 'bar',
            bar: 'baz',
            baz: 'foo',
          },
          {
            foo: 'foo',
            bar: 'bar',
            baz: 'baz',
          },
        ),
      ).toEqual([
        {
          foo: 'bar',
        },
        {
          foo: 'foo',
        },
      ])
    })
  })
})
