const { fixture } = require('testUtils')
const { npmIgnoreStrategy } = require('../npmignore')

describe('strategy > npmignore', () => {
  const npmignoreCurrent = fixture('npmignore/01-base/current.txt')
  const npmignoreNew = fixture('npmignore/01-base/new.txt')
  const npmignoreResult = fixture('npmignore/01-base/result.txt')
  const npmignoreRestored = fixture('npmignore/01-base/restored.txt')

  describe('merge', () => {
    it('should correctly merge configs', () => {
      expect(npmIgnoreStrategy.merge()(npmignoreCurrent, npmignoreNew)).toEqual(
        npmignoreResult,
      )
    })
  })

  describe('uapplying', () => {
    it('should correctly unapply configs', () => {
      expect(
        npmIgnoreStrategy.unapply()(npmignoreResult, npmignoreNew),
      ).toEqual(npmignoreRestored)
    })
  })
})
