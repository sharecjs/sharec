const { fixtures } = require('testUtils')
const { gitIgnoreStrategy } = require('../../gitignore')

describe('strategy > gitignore', () => {
  const gitignoreBaseFxt = fixtures('gitignore/01-base')

  describe('merge', () => {
    it('should correctly merge configs', () => {
      expect(
        gitIgnoreStrategy.merge('.gitignore')({
          current: gitignoreBaseFxt.current,
          upcoming: gitignoreBaseFxt.upcoming,
        }),
      ).toEqual(gitignoreBaseFxt.result)
    })
  })

  describe('uapplying', () => {
    it('should correctly unapply configs', () => {
      expect(
        gitIgnoreStrategy.unapply('.gitignore')({
          current: gitignoreBaseFxt.result,
          upcoming: gitignoreBaseFxt.upcoming,
        }),
      ).toEqual(gitignoreBaseFxt.restored)
    })
  })
})
