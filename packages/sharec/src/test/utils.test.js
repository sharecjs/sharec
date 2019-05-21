const { pipe } = require('../utils')

describe('pipe', () => {
  it('should pipe multiple functions', () => {
    const a = () => 'foo'
    const b = val => val + ' bar'
    const c = val => val + ' baz'
    const d = mod => val => mod + ' ' + val

    const res = pipe(
      a,
      b,
      c,
      d('beep'),
    )()

    expect(res).toBe('beep foo bar baz')
  })
})
