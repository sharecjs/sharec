const commonStrategy = require('../common')

describe('strategy > common', () => {
  it('should merge objects by one deep level', () => {
    const a = {
      foo: 'bar',
      bar: 'baz',
      baz: {
        foo: 'bar',
        bar: 'baz',
      },
    }
    const b = {
      foo: 'baz',
      bar: {
        foo: 'foo',
      },
    }
    const res = commonStrategy(a, b)

    expect(res).toEqual({
      foo: 'baz',
      bar: {
        foo: 'foo',
      },
      baz: {
        foo: 'bar',
        bar: 'baz',
      },
    })
  })
})
