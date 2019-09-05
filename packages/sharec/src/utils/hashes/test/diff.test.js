const { hashesDiff, shallowHashesChangesDiff } = require('../diff')

describe('utils > hashes > diff', () => {
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
