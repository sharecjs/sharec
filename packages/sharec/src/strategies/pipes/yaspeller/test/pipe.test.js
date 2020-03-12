const { fixtures } = require('testUtils')
const yaspellerPipe = require('../pipe')

describe('pipes > yaspeller > pipe', () => {
  describe('JSON', () => {
    const yaspellerBaseFxt = fixtures('atomic/yaspeller/json/00-base', 'json')

    it('should merge configs', () => {
      expect(yaspellerPipe('.yaspellerrc')(yaspellerBaseFxt)).toEqual(
        yaspellerBaseFxt.result,
      )
    })
  })
})
