const { fixtures } = require('testUtils')
const { npmIgnoreStrategy } = require('../../npmignore')

describe('strategy > npmignore', () => {
  const npmignoreBaseFxt = fixtures('npmignore/01-base')

  describe('merge', () => {
    it('should correctly merge configs', () => {
      expect(
        npmIgnoreStrategy.merge('.npmignore')({
          current: npmignoreBaseFxt.current,
          upcoming: npmignoreBaseFxt.upcoming,
        }),
      ).toEqual(npmignoreBaseFxt.result)
    })
  })

  describe('uapplying', () => {
    it('should correctly unapply configs', () => {
      expect(
        npmIgnoreStrategy.unapply('.npmignore')({
          current: npmignoreBaseFxt.result,
          upcoming: npmignoreBaseFxt.upcoming,
        }),
      ).toEqual(npmignoreBaseFxt.restored)
    })
  })
})
