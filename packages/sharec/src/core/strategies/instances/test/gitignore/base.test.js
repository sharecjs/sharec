const { fixtures } = require('testUtils')
const { gitIgnoreStrategy } = require('../../gitignore')

describe('strategy > gitignore', () => {
  const gitignoreBaseFxt = fixtures('gitignore/01-base')

  describe('merge', () => {
    it('should correctly merge configs', () => {
      expect(
        gitIgnoreStrategy.merge('.gitignore')(
          gitignoreBaseFxt.current,
          gitignoreBaseFxt.new,
        ),
      ).toEqual(gitignoreBaseFxt.result)
    })
  })

  describe('uapplying', () => {
    it('should correctly unapply configs', () => {
      expect(
        gitIgnoreStrategy.unapply('.gitignore')(
          gitignoreBaseFxt.result,
          gitignoreBaseFxt.new,
        ),
      ).toEqual(gitignoreBaseFxt.restored)
    })
  })
})
