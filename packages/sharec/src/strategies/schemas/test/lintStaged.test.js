const { fixtures } = require('testUtils')
const { lintStagedJson } = require('../lintStaged')

describe('schemas > lintStaged', () => {
  describe('JSON', () => {
    const lintStagedBaseFxt = fixtures('lintStaged/json/00-base', 'json')

    it('should merge configs', () => {
      expect(lintStagedJson(lintStagedBaseFxt)).toEqual(
        lintStagedBaseFxt.result,
      )
    })
  })
})
