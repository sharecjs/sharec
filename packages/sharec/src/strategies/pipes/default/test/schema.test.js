const { fixtures } = require('testUtils')
const { defaultJson } = require('../schema')

describe('pipes > default > schema', () => {
  describe('JSON', () => {
    const defaultFxt = fixtures('atomic/default/json/00-base', 'json')

    it('should merge configs', () => {
      expect(
        defaultJson({
          current: defaultFxt.current,
          upcoming: defaultFxt.upcoming,
        }),
      ).toEqual(defaultFxt.result)
    })
  })
})
