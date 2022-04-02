const { fixtures } = require('testUtils')
const hashAtom = require('./hash')

describe('atoms > hash', () => {
  const hashFxt = fixtures('rule/json/01-hash', 'map')
  const hashRemovedFxt = fixtures('default/json/01-handle-removed', 'map')

  it('should return current if upcoming is not passed', () => {
    const result = hashAtom({ current: hashFxt.current })

    expect(result).toEqual(hashFxt.current)
  })

  it('should return upcoming if current is not passed', () => {
    const result = hashAtom({ upcoming: hashFxt.upcoming })

    expect(result).toEqual(hashFxt.upcoming)
  })

  it('should merge rules with cache', () => {
    const result = hashAtom(hashFxt)

    expect(result).toEqual(hashFxt.result)
  })

  it('should handle removed fields', () => {
    const result = hashAtom(hashRemovedFxt)

    expect(result).toEqual(hashRemovedFxt.result)
  })
})
