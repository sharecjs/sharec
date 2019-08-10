const { fixture } = require('testUtils')
const { eslintIgnoreStrategy } = require('../../eslintignore')

describe('strategy > eslintignore', () => {
  const eslintignoreCurrent = fixture('eslintignore/01-base/current.txt')
  const eslintignoreNew = fixture('eslintignore/01-base/new.txt')
  const eslintignoreResult = fixture('eslintignore/01-base/result.txt')
  const eslintignoreRestored = fixture('eslintignore/01-base/restored.txt')

  describe('merge', () => {
    it('should correctly merge configs', () => {
      expect(
        eslintIgnoreStrategy.merge()(eslintignoreCurrent, eslintignoreNew),
      ).toEqual(eslintignoreResult)
    })
  })

  describe('uapplying', () => {
    it('should correctly unapply configs', () => {
      expect(
        eslintIgnoreStrategy.unapply()(eslintignoreResult, eslintignoreNew),
      ).toEqual(eslintignoreRestored)
    })
  })
})
