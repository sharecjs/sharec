const { vol } = require('memfs')
const {
  processPackageJson,
  getCurrentPackageJsonMetaData,
} = require('core/packageProcessor')

describe('core > packageProcessor >', () => {
  const packageJson01 = require('fixtures/package/package_01.json')
  const packageJson02 = require('fixtures/package/package_02.json')

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
})
