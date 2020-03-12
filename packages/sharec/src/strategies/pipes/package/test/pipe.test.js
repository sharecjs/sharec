const { fixtures } = require('testUtils')
const packagePipe = require('../pipe')

describe('pipes > package > pipe', () => {
  describe('JSON', () => {
    const packageBaseFxt = fixtures('atomic/package/json/00-base', 'json')

    it('should merge configs', () => {
      expect(packagePipe('package.json')(packageBaseFxt)).toEqual(
        packageBaseFxt.result,
      )
    })
  })
})
