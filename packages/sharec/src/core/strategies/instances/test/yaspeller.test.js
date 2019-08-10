const { fixture } = require('testUtils')
const { yaspellerStrategy } = require('../yaspeller')

describe('strategy > yaspeller', () => {
  const yaspellerCurrent = fixture('yaspeller/01-base/current.json', 'json')
  const yaspellerNew = fixture('yaspeller/01-base/new.json', 'json')
  const yaspellerResult = fixture('yaspeller/01-base/result.json', 'json')
  const yaspellerRestored = fixture('yaspeller/01-base/restored.json', 'json')

  describe('json strategy', () => {
    it('should merge yaspeller json configs', () => {
      expect(
        yaspellerStrategy.mergeJSON(yaspellerCurrent, yaspellerNew),
      ).toMatchObject(yaspellerResult)
    })
  })

  describe('auto merge', () => {
    it('should automatically merge configs', () => {
      expect(
        yaspellerStrategy.merge('.yaspellerrc')(yaspellerCurrent, yaspellerNew),
      ).toMatchObject(yaspellerResult)
    })
  })

  describe('uapplying JSON', () => {
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

  describe('auto unapply', () => {
    it('should automatically unapply configs', () => {
      expect(
        yaspellerStrategy.unapply('.yaspellerrc')(
          yaspellerResult,
          yaspellerNew,
        ),
      ).toMatchObject(yaspellerRestored)
    })
  })
})
