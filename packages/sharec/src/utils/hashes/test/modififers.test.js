const { withKeys, withoutKeys } = require('../modifiers')

describe('utils > hashes > modifiers', () => {
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
