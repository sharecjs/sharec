const primitiveAtom = require('../primitive')

describe('atoms > primitive', () => {
  it('should return current if upcoming is not passed', () => {
    const result = primitiveAtom({ current: 'foo' })

    expect(result).toEqual('foo')
  })

  it('should return upcoming if current is not passed', () => {
    const result = primitiveAtom({ upcoming: 'bar' })

    expect(result).toEqual('bar')
  })

  it('should return upcoming if values are not equal', () => {
    const result = primitiveAtom({ current: 'foo', upcoming: 'bar' })

    expect(result).toEqual('bar')
  })

  it('should not change if it was changed by user', () => {
    const result = primitiveAtom({
      current: 'foo',
      upcoming: 'bar',
      cached: 'cached foo',
    })

    expect(result).toEqual('foo')
  })
})
