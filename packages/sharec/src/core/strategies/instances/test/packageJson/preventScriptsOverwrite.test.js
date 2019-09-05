const { fixtures } = require('testUtils')
const { packageJsonStrategy } = require('../../packageJson')

describe('strategy > packageJson > prevent scripts overwrite', () => {
  const packageJsonPreventScriptsOverwriteFxt = fixtures(
    'package/json/08-prevent-scripts-overwrite',
    'json',
  )

  describe('merge', () => {
    it('should correctly merge configs without changed scripts overwrite', () => {
      expect(
        packageJsonStrategy.merge('scripts')({
          current: packageJsonPreventScriptsOverwriteFxt.current,
          upcoming: packageJsonPreventScriptsOverwriteFxt.upcoming,
          cached: packageJsonPreventScriptsOverwriteFxt.cached,
        }),
      ).toEqual(packageJsonPreventScriptsOverwriteFxt.result)
    })
  })

  // describe('uapplying', () => {
  //   it('should correctly unapply configs', () => {
  //     expect(
  //       npmIgnoreStrategy.unapply('.npmignore')({
  //         current: npmignoreBaseFxt.result,
  //         upcoming: npmignoreBaseFxt.upcoming,
  //       }),
  //     ).toEqual(npmignoreBaseFxt.restored)
  //   })
  // })
})
