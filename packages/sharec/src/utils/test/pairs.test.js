const {
  toPairs,
  toPairsWithKeys,
  fromPairs,
  fillPairs,
  mergePairs,
  deepMergePairs,
  mergePairsWithKeys,
  mergePairsWithoutKeys,
  deepMergePairsWithKeys,
  deepMergePairsWithoutKeys,
} = require('utils/pairs')

describe('utils > pairs >', () => {
  describe('fillPairs', () => {
    it('should add empty object to pairs only with key', () => {
      const pairs = [
        'foo',
        [
          'bar',
          {
            foo: 'bar',
          },
        ],
        'baz',
      ]

      expect(fillPairs(pairs)).toEqual([
        ['foo'],
        ['bar', { foo: 'bar' }],
        ['baz'],
      ])
    })
  })

  describe('toPairs', () => {
    it('should transform object to array of arrays', () => {
      const obj = {
        foo: {
          bar: 'baz',
        },
        bar: 'baz',
        baz: ['foo', 'bar', 'baz'],
      }

      expect(toPairs(obj)).toEqual([
        [
          'foo',
          {
            bar: 'baz',
          },
        ],
        ['bar', 'baz'],
        ['baz', ['foo', 'bar', 'baz']],
      ])
    })

    it('should transform empty key with object to single element array', () => {
      const obj = {
        foo: {},
      }

      expect(toPairs(obj)).toEqual(['foo'])
    })
  })

  describe('toPairsWithKeys', () => {
    it('should create pairs from object only with given keys', () => {
      const obj = {
        foo: {
          bar: 'baz',
        },
        bar: 'baz',
        baz: ['foo', 'bar', 'baz'],
      }

      expect(toPairsWithKeys(obj, ['foo'])).toEqual([
        [
          'foo',
          {
            bar: 'baz',
          },
        ],
      ])
    })
  })

  describe('fromPairs', () => {
    it('should transform array of arrays to object', () => {
      const pairs = [
        [
          'foo',
          {
            bar: 'baz',
          },
        ],
        ['bar', 'baz'],
        ['baz', ['foo', 'bar', 'baz']],
      ]

      expect(fromPairs(pairs)).toEqual({
        foo: {
          bar: 'baz',
        },
        bar: 'baz',
        baz: ['foo', 'bar', 'baz'],
      })
    })

    it('should transform single element array to key with empty object', () => {
      const pairs = [['foo']]

      expect(fromPairs(pairs)).toEqual({
        foo: {},
      })
    })
  })

  describe('mergePairs', () => {
    it('should merge pairs by first pair argument as key', () => {
      const a = [
        [
          'foo',
          {
            bar: 'baz',
          },
        ],
        [
          'bar',
          {
            baz: 'foo',
          },
        ],
        'beep',
        'boop',
      ]
      const b = [
        [
          'foo',
          {
            beep: 'boop',
          },
        ],
        [
          'baz',
          {
            foo: 'bar',
          },
        ],
        [
          'beep',
          {
            boop: 'foo',
          },
        ],
      ]

      expect(mergePairs(a, b)).toEqual([
        [
          'foo',
          {
            beep: 'boop',
          },
        ],
        [
          'bar',
          {
            baz: 'foo',
          },
        ],
        [
          'beep',
          {
            boop: 'foo',
          },
        ],
        'boop',
        [
          'baz',
          {
            foo: 'bar',
          },
        ],
      ])
    })
  })

  describe('deepMergePairs', () => {
    it('should merge pairs by first pair argument as key deeply', () => {
      const a = [
        [
          'foo',
          {
            bar: 'baz',
          },
        ],
        [
          'bar',
          {
            baz: 'foo',
          },
        ],
      ]
      const b = [
        [
          'foo',
          {
            beep: 'boop',
          },
        ],
        [
          'baz',
          {
            foo: 'bar',
          },
        ],
      ]

      expect(deepMergePairs(a, b)).toEqual([
        [
          'foo',
          {
            bar: 'baz',
            beep: 'boop',
          },
        ],
        [
          'bar',
          {
            baz: 'foo',
          },
        ],
        [
          'baz',
          {
            foo: 'bar',
          },
        ],
      ])
    })
  })

  describe('mergePairsWithKeys', () => {
    it('should extract given fields from passed pairs and merge them', () => {
      const a = [
        [
          'foo',
          {
            bar: 'baz',
          },
        ],
        [
          'bar',
          {
            baz: 'foo',
          },
        ],
      ]
      const b = [
        [
          'foo',
          {
            beep: 'boop',
          },
        ],
        [
          'baz',
          {
            foo: 'bar',
          },
        ],
      ]

      expect(mergePairsWithKeys(a, b, ['foo'])).toEqual([
        [
          'foo',
          {
            beep: 'boop',
          },
        ],
      ])
    })
  })

  describe('mergePairsWithoutKeys', () => {
    it('should omit given fields from objects and merge to one hash', () => {
      const a = [
        [
          'foo',
          {
            bar: 'baz',
          },
        ],
        [
          'bar',
          {
            baz: 'foo',
          },
        ],
      ]
      const b = [
        [
          'foo',
          {
            beep: 'boop',
          },
        ],
        [
          'baz',
          {
            foo: 'bar',
          },
        ],
      ]

      expect(mergePairsWithoutKeys(a, b, ['bar'])).toEqual([
        [
          'foo',
          {
            beep: 'boop',
          },
        ],
        [
          'baz',
          {
            foo: 'bar',
          },
        ],
      ])
    })
  })

  describe('deepMergePairsWithKeys', () => {
    it('should extract given fields from passed pairs and merge them deeply', () => {
      const a = [
        [
          'foo',
          {
            bar: 'baz',
          },
        ],
        [
          'bar',
          {
            baz: 'foo',
          },
        ],
      ]
      const b = [
        [
          'foo',
          {
            beep: 'boop',
          },
        ],
        [
          'baz',
          {
            foo: 'bar',
          },
        ],
      ]

      expect(deepMergePairsWithKeys(a, b, ['foo'])).toEqual([
        [
          'foo',
          {
            bar: 'baz',
            beep: 'boop',
          },
        ],
      ])
    })
  })

  describe('deepMergePairsWithoutKeys', () => {
    it('should omit given fields from objects and merge to one hash deeply', () => {
      const a = [
        [
          'foo',
          {
            bar: 'baz',
          },
        ],
        [
          'bar',
          {
            baz: 'foo',
          },
        ],
      ]
      const b = [
        [
          'foo',
          {
            beep: 'boop',
          },
        ],
        [
          'baz',
          {
            foo: 'bar',
          },
        ],
      ]

      expect(deepMergePairsWithoutKeys(a, b, ['bar'])).toEqual([
        [
          'foo',
          {
            bar: 'baz',
            beep: 'boop',
          },
        ],
        [
          'baz',
          {
            foo: 'bar',
          },
        ],
      ])
    })
  })
})
