const { fixtures } = require('testUtils')
const packagePipe = require('../pipe')

describe('pipes > package > pipe', () => {
  describe('JSON', () => {
    const packageBaseFxt = fixtures('atomic/package/json/00-base')

    it('should merge configs', () => {
      expect(packageBaseFxt.result).toMatch(
        packagePipe('package.json')(packageBaseFxt),
      )
    })
  })
})
