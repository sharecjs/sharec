const { vol } = require('memfs')
const { installPackageJson, injectMetaData } = require('../install')
const { fixtures } = require('testUtils')

describe('core > package > install >', () => {
  const packageBaseInstallFxt = fixtures('package/json/03-base-install', 'json')

  beforeEach(() => {
    vol.reset()
  })

  describe('installPackageJson', () => {
    it('should merge exist package.json with upcoming from configs', async () => {
      expect.assertions(1)

      const dir = {
        '/target/package.json': JSON.stringify(
          packageBaseInstallFxt.current,
          null,
          2,
        ),
        '/configs/package.json': JSON.stringify(
          packageBaseInstallFxt.upcoming,
          null,
          2,
        ),
      }
      vol.fromJSON(dir, '/')

      await installPackageJson({
        configsPath: '/configs',
        targetPath: '/target',
        upcomingMeta: {
          config: 'awesome-config',
          version: '1.0.0',
        },
      })

      expect(
        JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
      ).toEqual(packageBaseInstallFxt.result)
    })
  })

  describe('injectMetaData', () => {
    it('should inject sharec meta-data', () => {
      const metaData = {
        version: '1.0.0',
        config: 'awesome-config',
      }
      const res = injectMetaData({ meta: metaData })(
        packageBaseInstallFxt.current,
      )

      expect(res).toEqual({
        ...packageBaseInstallFxt.current,
        sharec: metaData,
      })
    })

    it('should returns unmodified object if skip if passed', () => {
      const metaData = {
        version: '1.0.0',
        config: 'awesome-config',
      }
      const res = injectMetaData({ skip: true, meta: metaData })(
        packageBaseInstallFxt.current,
      )

      expect(res).toEqual(packageBaseInstallFxt.current)
    })
  })
})
