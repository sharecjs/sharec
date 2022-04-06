const { fixtures } = require('testUtils')
const { defaultJson } = require('../schema')

describe('pipes > default > schema', () => {
  describe('JSON', () => {
    const defaultFxt = fixtures('default/json/00-base', 'map')

    it('should merge configs', () => {
      expect(
        defaultJson({
          current: defaultFxt.current,
          upcoming: defaultFxt.upcoming,
        }),
      ).toMatchSnapshot()
    })
  })
})
