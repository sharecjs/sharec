const { fixtures } = require('testUtils')
const { pipe } = require('../pipe')

describe('pipes > yaspeller > pipe', () => {
  describe('JSON', () => {
    const yaspellerBaseFxt = fixtures('yaspeller/json/00-base')

    it('should merge configs', () => {
      expect(pipe('.yaspellerrc')(yaspellerBaseFxt)).toMatchSnapshot()
    })
  })
})
