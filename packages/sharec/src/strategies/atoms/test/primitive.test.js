const primitiveStrategy = require('../primitive')

describe('strategies > primitive', () => {
  it('should return current if upcoming is not passed', () => {
    const result = primitiveStrategy({ current: 'foo' })

    expect(result).toEqual('foo')
  })

  it('should return upcoming if current is not passed', () => {
    const result = primitiveStrategy({ upcoming: 'bar' })

    expect(result).toEqual('bar')
  })

  it('should return upcoming if values are not equal', () => {
    const result = primitiveStrategy({ current: 'foo', upcoming: 'bar' })

    expect(result).toEqual('bar')
  })

  it('should not change if it was changed by user', () => {
    const result = primitiveStrategy({
      current: 'foo',
      upcoming: 'bar',
      cached: 'cached foo',
    })

    expect(result).toEqual('foo')
  })
})
