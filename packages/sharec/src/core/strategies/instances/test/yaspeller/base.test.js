const { fixtures } = require('testUtils')
const { yaspellerStrategy } = require('../../yaspeller')

describe('strategy > yaspeller', () => {
  const yaspellerBaseFxt = fixtures('yaspeller/01-base', 'json')

  it('should merge yaspeller json configs', () => {
    expect(
      yaspellerStrategy.mergeJSON(
        yaspellerBaseFxt.current,
        yaspellerBaseFxt.new,
      ),
    ).toMatchObject(yaspellerBaseFxt.result)
  })

  it('should remove applyed JSON config', () => {
    expect(
      yaspellerStrategy.unapplyJSON(
        yaspellerBaseFxt.result,
        yaspellerBaseFxt.new,
      ),
    ).toMatchObject(yaspellerBaseFxt.restored)
  })

  it('should fully unapply JSON config and return empty object', () => {
    expect(
      yaspellerStrategy.unapplyJSON(
        yaspellerBaseFxt.result,
        yaspellerBaseFxt.result,
      ),
    ).toEqual({})
  })
})
