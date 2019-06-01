const { pipe } = require('utils')

describe('pipe', () => {
  it('should pipe functions', () => {
    const a = (foo, bar) => foo + bar
    const b = foo => foo * 2
    const c = foo => foo.toString()
    const d = pipe(
      a,
      b,
      c,
    )

    expect(d(1, 1)).toBe('4')
  })
})
