const { fixtures } = require('testUtils')
const { commitlintJson } = require('../schema')

describe('pipes > commitlint > schema', () => {
  describe('JSON', () => {
    const commitlintFxt = fixtures('commitlint/json/00-base', 'map')

    it('should merge configs', () => {
      expect(
        commitlintJson({
          current: commitlintFxt.current,
          upcoming: commitlintFxt.upcoming,
        }),
      ).toMatchSnapshot()
    })
  })
})
