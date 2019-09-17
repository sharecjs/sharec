const { fixtures } = require('testUtils')
const { yaspellerStrategy } = require('../../yaspeller')

describe('strategy > yaspeller', () => {
  const yaspellerBaseFxt = fixtures('yaspeller/json/01-base', 'json')

  it('should merge yaspeller json configs', () => {
    expect(
      yaspellerStrategy.mergeJSON({
        current: yaspellerBaseFxt.current,
        upcoming: yaspellerBaseFxt.upcoming,
      }),
    ).toMatchObject(yaspellerBaseFxt.result)
  })

  it('should remove applyed JSON config', () => {
    expect(
      yaspellerStrategy.unapplyJSON({
        current: yaspellerBaseFxt.result,
        upcoming: yaspellerBaseFxt.upcoming,
      }),
    ).toMatchObject(yaspellerBaseFxt.restored)
  })

  it('should fully unapply JSON config and return empty object', () => {
    expect(
      yaspellerStrategy.unapplyJSON({
        current: yaspellerBaseFxt.result,
        upcoming: yaspellerBaseFxt.result,
      }),
    ).toEqual({})
  })
})
