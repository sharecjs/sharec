const {
  hashesDiff,
  withKeys,
  withoutKeys,
  mergeHashes,
  mergeHashesWithKeys,
  deepMergeHashesWithKeys,
  mergeHashesWithoutKeys,
  deepMergeHashesWithoutKeys,
  shallowHashesChangesDiff,
} = require('utils/hashes')

describe('utils > hashes', () => {
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

  describe('shallowHashesChangesDiff', () => {
    it('should get changes diff from the first level of given hashes', () => {
      expect(
        shallowHashesChangesDiff(
          {
            foo: 'foo',
            bar: 'baz',
            baz: {
              foo: 'foo',
              bar: {
                foo: 'foo',
              },
            },
          },
          {
            foo: 'baz',
            bar: 'baz',
            baz: {
              foo: 'baz',
              bar: {
                foo: 'foo',
              },
            },
          },
        ),
      ).toEqual({
        foo: 'foo',
        baz: {
          foo: 'foo',
          bar: {
            foo: 'foo',
          },
        },
      })
      expect(
        shallowHashesChangesDiff(
          {
            bar: 'baz',
            baz: {},
            foo: 'foo',
          },
          {
            bar: 'baz',
            baz: {},
            foo: 'baz',
          },
        ),
      ).toEqual({
        foo: 'foo',
      })
      expect(
        shallowHashesChangesDiff(
          {
            foo: {},
            baz: {},
          },
          {
            foo: {},
            baz: {},
          },
        ),
      ).toEqual({})
    })
    expect(
      shallowHashesChangesDiff(
        {
          'space-before-function-paren': 1,
          'no-console': 0,
          'max-len': [
            'warn',
            120,
            4,
            {
              ignoreUrls: false,
              ignoreComments: true,
              ignoreStrings: false,
            },
          ],
        },
        {
          'space-before-function-paren': 1,
          'no-console': 0,
          'max-len': [
            'warn',
            120,
            4,
            {
              ignoreUrls: false,
              ignoreComments: true,
              ignoreStrings: false,
            },
          ],
        },
      ),
    ).toEqual({})
    expect(
      shallowHashesChangesDiff(
        {
          foo: 'bar',
          bar: 'baz',
        },
        {
          bar: 'baz',
        },
      ),
    ).toEqual({
      foo: 'bar',
    })
  })

  describe('hashesDiff', () => {
    it('should correclty get diff from two objects', () => {
      expect(
        hashesDiff(
          {
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
          },
          {
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
          },
        ),
      ).toEqual({
        foo: 'baz',
        baz: {
          foo: 'baz',
          baz: {
            foo: 'baz',
          },
        },
      })
      expect(
        hashesDiff(
          {
            foo: 'baz',
            baz: {
              foo: 'baz',
              baz: {
                foo: [3, 2, 1],
              },
            },
          },
          {
            foo: 'foo',
            baz: {
              foo: 'foo',
              baz: {
                foo: [1, 2, 3],
              },
            },
          },
        ),
      ).toEqual({
        foo: 'baz',
        baz: {
          foo: 'baz',
          baz: {
            foo: [3, undefined, 1],
          },
        },
      })
      expect(
        hashesDiff(
          {
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
          },
          {
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
          },
        ),
      ).toEqual({})
      expect(
        hashesDiff(
          {
            foo: 'bar',
            bar: 'baz',
          },
          {
            bar: 'baz',
          },
        ),
      ).toEqual({
        foo: 'bar',
      })
    })
  })
})
