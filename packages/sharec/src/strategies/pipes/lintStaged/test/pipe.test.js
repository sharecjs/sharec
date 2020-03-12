const { fixtures } = require('testUtils')
const lintStagedPipe = require('../pipe')

describe('pipes > lintStaged > pipe', () => {
  describe('JSON', () => {
    const lintStagedBaseFxt = fixtures('atomic/lintStaged/json/00-base', 'json')

    it('should merge configs', () => {
      expect(lintStagedPipe('.lintstagedrc')(lintStagedBaseFxt)).toEqual(
        lintStagedBaseFxt.result,
      )
    })
  })
})
