const { hashWithoutChangedFields } = require('../substract')

describe('hashes > subsctract', () => {
  describe('hashWithoutChangedFields', () => {
    it('should return object without different properties', () => {
      const foo = {
        foo: 'bar',
        bar: 'baz',
      }
      const bar = {
        foo: 'bar',
        bar: 'bar',
      }

      expect(hashWithoutChangedFields(foo, bar)).toEqual({
        foo: 'bar',
      })
    })

    it('should return object without diff properties deeply', () => {
      const foo = {
        foo: 'foo',
        bar: {
          foo: 'foo',
          bar: {
            foo: 'foo',
          },
        },
      }
      const bar = {
        foo: 'foo',
        bar: {
          foo: 'bar',
          bar: {
            foo: 'foo',
          },
        },
      }

      expect(hashWithoutChangedFields(foo, bar)).toEqual({
        foo: 'foo',
        bar: {
          bar: {
            foo: 'foo',
          },
        },
      })
    })

    it('should return first argument if second is not passed', () => {
      const foo = {
        foo: 'bar',
        bar: 'baz',
      }

      expect(hashWithoutChangedFields(foo)).toEqual(foo)
    })
  })
})
