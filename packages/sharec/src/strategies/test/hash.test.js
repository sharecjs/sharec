const { fixtures } = require('testUtils')
const hashStrategy = require('../hash')

describe('strategies > hash', () => {
  const hashFxt = fixtures('rule/json/01-hash', 'json')

  it('should return current if upcoming is not passed', () => {
    const result = hashStrategy({ current: hashFxt.current })

    expect(result).toEqual(hashFxt.current)
  })

  it('should return upcoming if current is not passed', () => {
    const result = hashStrategy({ upcoming: hashFxt.upcoming })

    expect(result).toEqual(hashFxt.upcoming)
  })

  it('should merge rules with cache', () => {
    const result = hashStrategy({
      current: hashFxt.current,
      upcoming: hashFxt.upcoming,
      cached: hashFxt.cached,
    })

    expect(result).toEqual(hashFxt.result)
  })
})
