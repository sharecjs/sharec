const { fixtures } = require('testUtils')
const { postcssStrategy } = require('../../postcss')

describe('strategy > postcss > ', () => {
  const postcssBaseFxt = fixtures('postcss/json/00-base', 'json')

  describe('merge', () => {
    it('should merge objects by one deep level', () => {
      expect(
        postcssStrategy.merge('postcss')({
          current: postcssBaseFxt.current,
          upcoming: postcssBaseFxt.upcoming,
        }),
      ).toEqual(postcssBaseFxt.result)
    })
  })

  describe('unapply', () => {
    it('should unapply objects by one deep level', () => {
      expect(
        postcssStrategy.unapply('postcss')({
          current: postcssBaseFxt.result,
          upcoming: postcssBaseFxt.upcoming,
        }),
      ).toEqual(postcssBaseFxt.restored)
    })
  })
})
