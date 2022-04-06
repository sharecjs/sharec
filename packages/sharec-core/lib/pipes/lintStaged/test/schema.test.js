const { fixtures } = require('testUtils')
const { lintStagedJson } = require('../schema')

describe('pipes > lintStaged > schema', () => {
  describe('JSON', () => {
    const lintStagedBaseFxt = fixtures('lintStaged/json/00-base', 'map')

    it('should merge configs', () => {
      expect(lintStagedJson(lintStagedBaseFxt)).toMatchSnapshot()
    })
  })
})
