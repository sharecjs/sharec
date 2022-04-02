const { fixtures } = require('testUtils')
const { pipe } = require('./pipe')

describe('pipes > lintStaged > pipe', () => {
  describe('JSON', () => {
    const lintStagedBaseFxt = fixtures('lintStaged/json/00-base')

    it('should merge configs', () => {
      expect(pipe('.lintstagedrc')(lintStagedBaseFxt)).toMatchSnapshot()
    })
  })
})
