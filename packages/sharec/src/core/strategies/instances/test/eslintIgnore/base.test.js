const { fixtures } = require('testUtils')
const { eslintIgnoreStrategy } = require('../../eslintignore')

describe('strategy > eslintignore', () => {
  const eslintignoreBaseFxt = fixtures('eslintignore/01-base')

  describe('merge', () => {
    it('should correctly merge configs', () => {
      expect(
        eslintIgnoreStrategy.merge()(
          eslintignoreBaseFxt.current,
          eslintignoreBaseFxt.new,
        ),
      ).toEqual(eslintignoreBaseFxt.result)
    })
  })

  describe('uapplying', () => {
    it('should correctly unapply configs', () => {
      expect(
        eslintIgnoreStrategy.unapply()(
          eslintignoreBaseFxt.result,
          eslintignoreBaseFxt.new,
        ),
      ).toEqual(eslintignoreBaseFxt.restored)
    })
  })
})
