const { vol } = require('memfs')
const { clearPackageJson, ereaseMetaData } = require('../remove')

describe('core > package > remove >', () => {
  const packageJson5 = require('fixtures/package/package_05.json')
  const packageJson6 = require('fixtures/package/package_06.json')

  beforeEach(() => {
    vol.reset()
  })

  describe('clearPackageJson', () => {
    it('should remove configs from package json and injection status', async () => {
      const dir = {
        '/target/package.json': JSON.stringify(packageJson5),
        '/configuration-package/package.json': JSON.stringify(packageJson6),
      }

      vol.fromJSON(dir)

      await clearPackageJson('/configuration-package', '/target')

      expect(
        JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
      ).toMatchSnapshot()
    })
  })

  describe('ereaseMetaData', () => {
    it('should remove all sharec meta-data in package.json from target path', () => {
      const res = ereaseMetaData({
        sharec: {
          injected: true,
        },
      })

      expect(res).toEqual({})
    })
  })
})
