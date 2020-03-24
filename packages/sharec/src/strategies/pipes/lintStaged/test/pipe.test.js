const { fixtures } = require('testUtils')
const lintStagedPipe = require('../pipe')

describe('pipes > lintStaged > pipe', () => {
  describe('JSON', () => {
    const lintStagedBaseFxt = fixtures('atomic/lintStaged/json/00-base')

    it('should merge configs', () => {
      expect(lintStagedBaseFxt.result).toMatch(
        lintStagedPipe('.lintstagedrc')(lintStagedBaseFxt),
      )
    })
  })
})
