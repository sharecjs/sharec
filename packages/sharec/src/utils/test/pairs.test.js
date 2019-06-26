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
  pairsChangesDiff,
  shallowPairsChangesDiff,
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
      expect(
        toPairs({
          foo: {
            bar: 'baz',
          },
          bar: 'baz',
          baz: ['foo', 'bar', 'baz'],
        }),
      ).toEqual([
        [
          'foo',
          {
            bar: 'baz',
          },
        ],
        ['bar', 'baz'],
        ['baz', ['foo', 'bar', 'baz']],
      ])
      expect(
        toPairs({
          foo: {},
          bar: {},
        }),
      ).toEqual(['foo', 'bar'])
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
      expect(
        fromPairs([
          [
            'foo',
            {
              bar: 'baz',
            },
          ],
          ['bar', 'baz'],
          ['baz', ['foo', 'bar', 'baz']],
        ]),
      ).toEqual({
        foo: {
          bar: 'baz',
        },
        bar: 'baz',
        baz: ['foo', 'bar', 'baz'],
      })
      expect(fromPairs(['foo', 'bar'])).toEqual({
        foo: {},
        bar: {},
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

  describe('pairsChangesDiff', () => {
    it('should get changes diff from pairs', () => {
      const a = [['foo', 'foo'], ['bar', 'baz']]
      const b = [['foo', 'bar'], ['bar', 'baz']]

      expect(pairsChangesDiff(a, b)).toEqual([['foo', 'bar']])
    })
  })

  describe('shallowPairsChangesDiff', () => {
    it('should get changes diff from the first level of given pairs', () => {
      const a = [
        ['foo', 'foo'],
        [
          'bar',
          {
            bar: 'baz',
          },
        ],
      ]
      const b = [
        ['foo', 'foo'],
        [
          'bar',
          {
            bar: 'foo',
          },
        ],
      ]

      expect(shallowPairsChangesDiff(a, b)).toEqual([
        [
          'bar',
          {
            bar: 'foo',
          },
        ],
      ])
    })

    it('should handle cases without values', () => {
      expect(
        shallowPairsChangesDiff(
          ['foo', 'bar'],
          [
            ['foo', 'foo'],
            [
              'bar',
              {
                bar: 'foo',
              },
            ],
          ],
        ),
      ).toEqual([
        ['foo', 'foo'],
        [
          'bar',
          {
            bar: 'foo',
          },
        ],
      ])
      expect(
        shallowPairsChangesDiff(
          [
            ['foo', 'foo'],
            [
              'bar',
              {
                bar: 'foo',
              },
            ],
          ],
          ['foo', 'bar'],
        ),
      ).toEqual(['foo', 'bar'])
      expect(
        shallowPairsChangesDiff(
          [
            'foo',
            [
              'bar',
              {
                bar: 'foo',
              },
            ],
          ],
          [
            'foo',
            [
              'bar',
              {
                bar: 'baz',
              },
            ],
          ],
        ),
      ).toEqual([
        [
          'bar',
          {
            bar: 'baz',
          },
        ],
      ])
    })
  })
})
