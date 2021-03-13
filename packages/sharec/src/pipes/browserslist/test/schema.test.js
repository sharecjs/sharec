const { fixtures } = require('testUtils')
const { browserslistJson } = require('../schema')

describe('pipes > browserslist > schema', () => {
  describe('JSON', () => {
    const browserslistArrayLikeFxt = fixtures('browserslist/json/00-array-like', 'map')

    it('should merge configs', () => {
      expect(browserslistJson(browserslistArrayLikeFxt)).toEqual(browserslistArrayLikeFxt.result)
    })
  })
})
