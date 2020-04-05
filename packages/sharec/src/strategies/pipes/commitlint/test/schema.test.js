const { fixtures } = require('testUtils')
const { commitlintJson } = require('../schema')

describe('pipes > commitlint > schema', () => {
  describe('JSON', () => {
    const commitlintFxt = fixtures('commitlint/json/00-base', 'json')

    it('should merge configs', () => {
      expect(
        commitlintJson({
          current: commitlintFxt.current,
          upcoming: commitlintFxt.upcoming,
        }),
      ).toEqual(commitlintFxt.result)
    })
  })
})
