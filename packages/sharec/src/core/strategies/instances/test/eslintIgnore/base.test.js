const { fixtures } = require('testUtils')
const { eslintIgnoreStrategy } = require('../../eslintignore')

describe('strategy > eslintignore', () => {
  const eslintignoreBaseFxt = fixtures('eslintignore/01-base')
  const eslintignoreArrayLikeFxt = fixtures(
    'eslintignore/02-array-like',
    'json',
  )

  describe('merge', () => {
    it('should correctly merge configs', () => {
      expect(
        eslintIgnoreStrategy.merge('.eslintignore')(
          eslintignoreBaseFxt.current,
          eslintignoreBaseFxt.new,
        ),
      ).toEqual(eslintignoreBaseFxt.result)
      expect(
        eslintIgnoreStrategy.merge('eslintIgnore')(
          eslintignoreArrayLikeFxt.current,
          eslintignoreArrayLikeFxt.new,
        ),
      ).toEqual(eslintignoreArrayLikeFxt.result)
    })
  })

  describe('uapplying', () => {
    it('should correctly unapply configs', () => {
      expect(
        eslintIgnoreStrategy.unapply('.eslintignore')(
          eslintignoreBaseFxt.result,
          eslintignoreBaseFxt.new,
        ),
      ).toEqual(eslintignoreBaseFxt.restored)
      expect(
        eslintIgnoreStrategy.unapply('eslintIgnore')(
          eslintignoreArrayLikeFxt.result,
          eslintignoreArrayLikeFxt.new,
        ),
      ).toEqual(eslintignoreArrayLikeFxt.restored)
    })
  })
})
