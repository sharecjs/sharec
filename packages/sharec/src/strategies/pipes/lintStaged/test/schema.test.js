const { fixtures } = require('testUtils')
const { lintStagedJson } = require('../schema')

describe('pipes > lintStaged > schema', () => {
  describe('JSON', () => {
    const lintStagedBaseFxt = fixtures('atomic/lintStaged/json/00-base', 'json')

    it('should merge configs', () => {
      expect(lintStagedJson(lintStagedBaseFxt)).toEqual(
        lintStagedBaseFxt.result,
      )
    })
  })
})
