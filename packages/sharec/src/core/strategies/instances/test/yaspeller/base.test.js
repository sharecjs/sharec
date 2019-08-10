const { fixture } = require('testUtils')
const { yaspellerStrategy } = require('../../yaspeller')

describe('strategy > yaspeller', () => {
  const yaspellerCurrent = fixture('yaspeller/01-base/current.json', 'json')
  const yaspellerNew = fixture('yaspeller/01-base/new.json', 'json')
  const yaspellerResult = fixture('yaspeller/01-base/result.json', 'json')
  const yaspellerRestored = fixture('yaspeller/01-base/restored.json', 'json')

  it('should merge yaspeller json configs', () => {
    expect(
      yaspellerStrategy.mergeJSON(yaspellerCurrent, yaspellerNew),
    ).toMatchObject(yaspellerResult)
  })

  it('should remove applyed JSON config', () => {
    expect(
      yaspellerStrategy.unapplyJSON(yaspellerResult, yaspellerNew),
    ).toMatchObject(yaspellerRestored)
  })

  it('should fully unapply JSON config and return empty object', () => {
    expect(
      yaspellerStrategy.unapplyJSON(yaspellerResult, yaspellerResult),
    ).toEqual({})
  })
})
