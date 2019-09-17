const { transformJSONInput } = require('../json')

describe('utils > json', () => {
  describe('transformJSONInput', () => {
    it('should transform all JSON strings to objects', () => {
      expect(
        transformJSONInput(
          {
            foo: 'bar',
          },
          null,
          '{"bar":"baz"}',
        ),
      ).toEqual([
        {
          foo: 'bar',
        },
        null,
        {
          bar: 'baz',
        },
      ])
    })
  })
})
