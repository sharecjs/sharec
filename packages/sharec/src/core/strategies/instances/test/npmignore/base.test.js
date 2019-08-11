const { fixtures } = require('testUtils')
const { npmIgnoreStrategy } = require('../../npmignore')

describe('strategy > npmignore', () => {
  const npmignoreBaseFxt = fixtures('npmignore/01-base')

  describe('merge', () => {
    it('should correctly merge configs', () => {
      expect(
        npmIgnoreStrategy.merge('.npmignore')(
          npmignoreBaseFxt.current,
          npmignoreBaseFxt.new,
        ),
      ).toEqual(npmignoreBaseFxt.result)
    })
  })

  describe('uapplying', () => {
    it('should correctly unapply configs', () => {
      expect(
        npmIgnoreStrategy.unapply('.npmignore')(
          npmignoreBaseFxt.result,
          npmignoreBaseFxt.new,
        ),
      ).toEqual(npmignoreBaseFxt.restored)
    })
  })
})
