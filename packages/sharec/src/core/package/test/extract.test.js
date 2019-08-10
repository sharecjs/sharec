const { vol } = require('memfs')
const pick = require('lodash/pick')
const { fixture } = require('testUtils')
const {
  getCurrentPackageJsonMetaData,
  extractConfigs,
  extractMetaData,
} = require('../extract')

describe('core > package > extract >', () => {
  const packageJsonFixture = fixture('package/package_07.json', 'json')

  beforeEach(() => {
    vol.reset()
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

  describe('extractConfigs', () => {
    it('should return all configs from package.json except dependencies, sharec meta-data and other standard package fields', () => {
      const extractedConfigs = extractConfigs(packageJsonFixture)

      expect(extractedConfigs).toEqual(
        pick(packageJsonFixture, [
          'scripts',
          'lint-staged',
          'husky',
          'config',
          'prettier',
          'eslintConfig',
          'eslintIgnore',
          'devDependencies',
        ]),
      )
    })
  })

  describe('extractMetaData', () => {
    it('should return sharec meta-data', () => {
      const extractedMetaData = extractMetaData(packageJsonFixture)

      expect(extractedMetaData).toEqual(packageJsonFixture.sharec)
    })

    it('should return null if sharec meta-data is not exists', () => {
      const extractedMetaData = extractMetaData({})

      expect(extractedMetaData).toBeNull()
    })
  })
})
