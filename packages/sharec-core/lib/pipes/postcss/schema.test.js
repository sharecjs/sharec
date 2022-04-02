const { fixtures } = require('testUtils')
const { postcssJson } = require('./schema')

describe('pipes > postcss > schema', () => {
  const postcssBaseFxt = fixtures('postcss/json/00-base', 'map')

  describe('merge', () => {
    it('should merge objects by one deep level', () => {
      expect(
        postcssJson({
          current: postcssBaseFxt.current,
          upcoming: postcssBaseFxt.upcoming,
        }),
      ).toMatchSnapshot()
    })
  })
})
