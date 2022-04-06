const { fixtures } = require('testUtils')
const { pipe } = require('../pipe')

describe('pipes > package > pipe', () => {
  describe('JSON', () => {
    const packageBaseFxt = fixtures('package/json/00-base')

    it('should merge configs', () => {
      expect(pipe('package.json')(packageBaseFxt)).toMatchSnapshot()
    })
  })
})
