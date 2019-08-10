const { fixture } = require('testUtils')
const { gitIgnoreStrategy } = require('../../gitignore')

describe('strategy > gitignore', () => {
  const gitignoreCurrent = fixture('gitignore/01-base/current.txt')
  const gitignoreNew = fixture('gitignore/01-base/new.txt')
  const gitignoreResult = fixture('gitignore/01-base/result.txt')
  const gitignoreRestored = fixture('gitignore/01-base/restored.txt')

  describe('merge', () => {
    it('should correctly merge configs', () => {
      expect(gitIgnoreStrategy.merge()(gitignoreCurrent, gitignoreNew)).toEqual(
        gitignoreResult,
      )
    })
  })

  describe('uapplying', () => {
    it('should correctly unapply configs', () => {
      expect(
        gitIgnoreStrategy.unapply()(gitignoreResult, gitignoreNew),
      ).toEqual(gitignoreRestored)
    })
  })
})
