const { fixtures } = require('testUtils')
const yaspellerPipe = require('../pipe')

describe('pipes > yaspeller > pipe', () => {
  describe('JSON', () => {
    const yaspellerBaseFxt = fixtures('atomic/yaspeller/json/00-base')

    it('should merge configs', () => {
      expect(yaspellerBaseFxt.result).toMatch(
        yaspellerPipe('.yaspellerrc')(yaspellerBaseFxt),
      )
    })
  })
})
