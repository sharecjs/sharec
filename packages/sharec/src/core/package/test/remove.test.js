const { vol } = require('memfs')
const { fixtures } = require('testUtils')
const { clearPackageJson, ereaseMetaData } = require('../remove')

describe('core > package > remove >', () => {
  const packageJsonBaseRemoveFxt = fixtures('package/04-base-remove', 'json')

  beforeEach(() => {
    vol.reset()
  })

  describe('clearPackageJson', () => {
    it('should remove configs from package json and injection status', async () => {
      const dir = {
        '/target/package.json': JSON.stringify(packageJsonBaseRemoveFxt.result),
        '/configuration-package/package.json': JSON.stringify(
          packageJsonBaseRemoveFxt.new,
        ),
      }

      vol.fromJSON(dir)

      await clearPackageJson('/configuration-package', '/target')

      expect(
        JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
      ).toEqual(packageJsonBaseRemoveFxt.restored)
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
