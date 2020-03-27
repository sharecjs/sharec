const { fixtures } = require('testUtils')
const { browserslistStrategy } = require('../../browserslist')

describe('strategy > browserslist', () => {
  const browserslistBaseFxt = fixtures('browserslist/lines/00-base')
  const browserslistArrayLikeFxt = fixtures(
    'browserslist/json/00-array-like',
    'json',
  )

  describe('merge', () => {
    it('should correctly merge configs', () => {
      expect(
        browserslistStrategy.merge('.browserslistrc')({
          current: browserslistBaseFxt.current,
          upcoming: browserslistBaseFxt.upcoming,
        }),
      ).toEqual(browserslistBaseFxt.result)
      expect(
        browserslistStrategy.merge('browserslist')({
          current: browserslistArrayLikeFxt.current,
          upcoming: browserslistArrayLikeFxt.upcoming,
        }),
      ).toEqual(browserslistArrayLikeFxt.result)
    })
  })
})
