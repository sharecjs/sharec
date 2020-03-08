const { fixtures } = require('testUtils')
const { browserslistJson } = require('../browserslist')

describe('schemas > browserslist', () => {
  describe('JSON', () => {
    const browserslistArrayLikeFxt = fixtures(
      'browserslist/json/00-array-like',
      'json',
    )

    it('should merge configs', () => {
      expect(browserslistJson(browserslistArrayLikeFxt)).toEqual(
        browserslistArrayLikeFxt.result,
      )
    })
  })
})
