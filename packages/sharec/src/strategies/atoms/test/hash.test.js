const { fixtures } = require('testUtils')
const hashAtom = require('../hash')

describe('atoms > hash', () => {
  const hashFxt = fixtures('atomic/rule/json/01-hash', 'json')

  it('should return current if upcoming is not passed', () => {
    const result = hashAtom({ current: hashFxt.current })

    expect(result).toEqual(hashFxt.current)
  })

  it('should return upcoming if current is not passed', () => {
    const result = hashAtom({ upcoming: hashFxt.upcoming })

    expect(result).toEqual(hashFxt.upcoming)
  })

  it('should merge rules with cache', () => {
    const result = hashAtom({
      current: hashFxt.current,
      upcoming: hashFxt.upcoming,
      cached: hashFxt.cached,
    })

    expect(result).toEqual(hashFxt.result)
  })
})
