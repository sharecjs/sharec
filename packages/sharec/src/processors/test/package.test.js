const { vol } = require('memfs')
const {
  processPackageJson,
  clearPackageJson,
  getCurrentPackageJsonMetaData,
} = require('../package')

describe('processors > package >', () => {
  const packageJson01 = require('fixtures/package/package_01.json')
  const packageJson02 = require('fixtures/package/package_02.json')
  const packageJson5 = require('../../../test/fixtures/package/package_05.json')
  const packageJson6 = require('../../../test/fixtures/package/package_06.json')

  beforeEach(() => {
    vol.reset()
  })

  describe('processPackageJson', () => {
    it('should merge exist package.json with upcoming from configs', async () => {
      expect.assertions(1)

      const dir = {
        '/target/package.json': JSON.stringify(packageJson01, null, 2),
        '/configs/package.json': JSON.stringify(packageJson02, null, 2),
      }
      vol.fromJSON(dir, '/')

      await processPackageJson('/configs', '/target')

      expect(
        JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
      ).toMatchSnapshot()
    })
  })

  describe('getCurrentPackageJsonMetaData', () => {
    it('should extract sharec meta data from target project package.json', async () => {
      expect.assertions(1)

      const metaData = {
        injected: true,
      }
      const dir = {
        '/target/package.json': JSON.stringify(
          {
            sharec: metaData,
          },
          null,
          2,
        ),
      }
      vol.fromJSON(dir, '/')

      const receivedMetaData = await getCurrentPackageJsonMetaData('/target')

      expect(receivedMetaData).toEqual(metaData)
    })

    it('should return null if sharec meta data is not exist', async () => {
      expect.assertions(1)

      const dir = {
        '/target/package.json': JSON.stringify({}, null, 2),
      }
      vol.fromJSON(dir, '/')

      const receivedMetaData = await getCurrentPackageJsonMetaData('/target')

      expect(receivedMetaData).toEqual(null)
    })
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
})
