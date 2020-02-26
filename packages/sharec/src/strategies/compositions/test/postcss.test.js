const { fixtures } = require('testUtils')
const { postcssJson } = require('../postcss')

describe('compositions > postcss > ', () => {
  const postcssBaseFxt = fixtures('postcss/json/00-base', 'json')

  describe('merge', () => {
    it('should merge objects by one deep level', () => {
      expect(
        postcssJson({
          current: postcssBaseFxt.current,
          upcoming: postcssBaseFxt.upcoming,
        }),
      ).toEqual(postcssBaseFxt.result)
    })
  })
})
