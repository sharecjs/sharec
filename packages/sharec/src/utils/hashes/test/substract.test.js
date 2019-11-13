const {
  hashWithoutChangedFields,
  hashWithoutUnchangedFields,
} = require('../substract')

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

  describe('hashWithoutUnchangedFields', () => {
    it('should return object without different properties', () => {
      const foo = {
        foo: 'bar',
        bar: 'baz',
      }
      const bar = {
        foo: 'bar',
        bar: 'bar',
      }

      expect(hashWithoutUnchangedFields(foo, bar)).toEqual({
        bar: 'baz',
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

      expect(hashWithoutUnchangedFields(foo, bar)).toEqual({
        bar: {
          foo: 'foo',
        },
      })
    })

    it('should return first argument if second is not passed', () => {
      const foo = {
        foo: 'bar',
        bar: 'baz',
      }

      expect(hashWithoutUnchangedFields(foo)).toEqual(foo)
    })

    it('should handle the same objects', () => {
      const foo = {
        foo: 'bar',
        bar: 'baz',
      }
      const bar = {
        foo: 'bar',
        bar: 'baz',
      }

      expect(hashWithoutUnchangedFields(foo, bar)).toEqual({})
    })

    it('should handle empty fields', () => {
      const foo = {
        foo: 'bar',
      }
      const bar = {
        foo: 'bar',
        bar: 'baz',
      }

      expect(hashWithoutUnchangedFields(foo, bar)).toEqual({})
      expect(hashWithoutUnchangedFields(bar, foo)).toEqual({
        bar: 'baz',
      })
    })
  })
})
