const { fixtures } = require('testUtils')
const { scriptsStrategy } = require('../../scripts')

describe('strategy > npmignore', () => {
  const packageJsonScriptsFxt = fixtures('package/json/11-scripts')

  describe('merge', () => {
    it('should correctly merge configs', () => {
      expect(
        scriptsStrategy.merge('scripts')({
          current: packageJsonScriptsFxt.current,
          upcoming: packageJsonScriptsFxt.upcoming,
        }),
      ).toEqual(packageJsonScriptsFxt.result)
    })
  })

  describe('uapplying', () => {
    it('should correctly unapply configs', () => {
      expect(
        scriptsStrategy.unapply('scripts')({
          current: packageJsonScriptsFxt.result,
          upcoming: packageJsonScriptsFxt.upcoming,
        }),
      ).toEqual(packageJsonScriptsFxt.restored)
    })
  })
})
