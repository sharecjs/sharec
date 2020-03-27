const { vol } = require('memfs')
const pick = require('lodash/pick')
const { fixture } = require('testUtils')
const {
  extractConfigs,
  extractMetaData,
  getCurrentPackageJsonMetaData,
  getUpcomingPackageJsonMetaData,
  isTargetDependantOfSharec,
  isTargetPackageInSharecIgnore,
} = require('../extract')

describe('core > package > extract >', () => {
  const packageJsonConfigsExtractionFxt = fixture(
    'package/json/06-configs-extraction/current.json',
    'json',
  )

  beforeEach(() => {
    vol.reset()
  })

  describe('extractConfigs', () => {
    it('should return all configs from package.json except dependencies, sharec meta-data and other standard package fields', () => {
      const extractedConfigs = extractConfigs(packageJsonConfigsExtractionFxt)

      expect(extractedConfigs).toEqual(
        pick(packageJsonConfigsExtractionFxt, [
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
      const extractedMetaData = extractMetaData(packageJsonConfigsExtractionFxt)

      expect(extractedMetaData).toEqual(packageJsonConfigsExtractionFxt.sharec)
    })

    it('should return null if sharec meta-data is not exists', () => {
      const extractedMetaData = extractMetaData({})

      expect(extractedMetaData).toBeNull()
    })
  })

  describe('getCurrentPackageJsonMetaData', () => {
    it('should extract sharec meta data from target project package.json', async () => {
      expect.assertions(1)

      const metaData = {
        version: '1.0.0',
        config: 'awesome-config',
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

  describe('getUpcomingPackageJsonMetaData', () => {
    it('should extract upcoming configuration package meta data', async () => {
      expect.assertions(1)

      const metaData = {
        version: '1.0.0',
        name: 'awesome-config',
      }
      const dir = {
        '/configuration-package/package.json': JSON.stringify(
          metaData,
          null,
          2,
        ),
      }
      vol.fromJSON(dir, '/')

      const res = await getUpcomingPackageJsonMetaData('/configuration-package')

      expect(res).toEqual({
        config: 'awesome-config',
        version: '1.0.0',
      })
    })
  })

  describe('isTargetDependantOfSharec', () => {
    it('should return true is target has sharec in dependencies', async () => {
      expect.assertions(1)

      const dir = {
        '/target/package.json': JSON.stringify({
          dependencies: {
            sharec: '1.0.0',
          },
        }),
      }
      vol.fromJSON(dir, '/')

      const res = await isTargetDependantOfSharec('/target')

      expect(res).toBe(true)
    })

    it('should return false is target has not sharec in dependencies', async () => {
      expect.assertions(1)

      const dir = {
        '/target/package.json': JSON.stringify({
          dependencies: {},
        }),
      }
      vol.fromJSON(dir, '/')

      const res = await isTargetDependantOfSharec('/target')

      expect(res).toBe(false)
    })

    it('should return false is target has not any dependencies', async () => {
      expect.assertions(1)

      const dir = {
        '/target/package.json': JSON.stringify({}),
      }
      vol.fromJSON(dir, '/')

      const res = await isTargetDependantOfSharec('/target')

      expect(res).toBe(false)
    })
  })

  describe('isTargetPackageInSharecIgnore', () => {
    it('should return sharec ignore status from target', async () => {
      expect.assertions(1)

      const dir = {
        '/target/package.json': JSON.stringify({
          sharec: {
            ignore: true,
          },
        }),
      }
      vol.fromJSON(dir, '/')

      const res = await isTargetPackageInSharecIgnore('/target')

      expect(res).toBe(true)
    })

    it('should return fasle if sharec field is not exist', async () => {
      expect.assertions(1)

      const dir = {
        '/target/package.json': JSON.stringify({}),
      }
      vol.fromJSON(dir, '/')

      const res = await isTargetPackageInSharecIgnore('/target')

      expect(res).toBe(false)
    })
  })
})
