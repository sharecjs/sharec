const { fixtures } = require('testUtils')
const pairAtom = require('../pair')

describe('atoms > pair', () => {
  const basePairFxt = fixtures('pair/json/00-base', 'json')
  const differentKeysPairFxt = fixtures('pair/json/01-different-keys', 'json')

  it('should return current if upcoming is not passed', () => {
    const result = pairAtom({ current: basePairFxt.current })

    expect(result).toEqual(basePairFxt.current)
  })

  it('should return upcoming if current is not passed', () => {
    const result = pairAtom({ upcoming: basePairFxt.upcoming })

    expect(result).toEqual(basePairFxt.upcoming)
  })

  it('should merge pair with cache', () => {
    const result = pairAtom({
      current: basePairFxt.current,
      upcoming: basePairFxt.upcoming,
      cached: basePairFxt.cached,
    })

    expect(result).toEqual(basePairFxt.result)
  })

  it('should return upcoming if types of data are not equal', () => {
    expect(
      pairAtom({
        current: basePairFxt.current,
        upcoming: 'foo',
      }),
    ).toEqual('foo')
    expect(
      pairAtom({
        current: 'foo',
        upcoming: basePairFxt.upcoming,
      }),
    ).toEqual(basePairFxt.upcoming)
  })

  it('should return upcoming if keys is not matched', () => {
    expect(pairAtom(differentKeysPairFxt)).toEqual(differentKeysPairFxt.result)
  })
})
