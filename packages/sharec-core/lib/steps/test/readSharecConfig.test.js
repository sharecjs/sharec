const { vol } = require('memfs')
const { fixtures } = require('testUtils')
const readSharecConfig = require('../readSharecConfig')

describe('steps > readSharecConfig', () => {
  const sharecPackageFxt = fixtures('package/json/07-sharec-config')
  const sharecPackageJSONFxt = fixtures('package/json/07-sharec-config', 'json')
  const sharecFxt = fixtures('sharec/json/00-base')
  const sharecJSONFxt = fixtures('sharec/json/00-base', 'json')
  const input = {
    targetPath: '/target',
    configPath: '/configuration-package',
  }

  beforeEach(() => {
    vol.reset()
  })

  context('with `sharec` field in root package.json', () => {
    it('returns configuration', async () => {
      const dir = {
        '/configuration-package/package.json': sharecPackageFxt.current,
      }

      vol.fromJSON(dir, input.targetPath)

      const output = await readSharecConfig(input)

      expect(output).toEqual({
        ...input,
        sharecConfig: sharecPackageJSONFxt.current.sharec,
      })
    })
  })

  context('with `.sharecrc.json` field in root package.json', () => {
    it('returns configuration', async () => {
      const dir = {
        '/configuration-package/.sharecrc.json': sharecFxt.current,
      }

      vol.fromJSON(dir, input.targetPath)

      const output = await readSharecConfig(input)

      expect(output).toEqual({
        ...input,
        sharecConfig: sharecJSONFxt.current,
      })
    })
  })

  context('without any configuration', () => {
    it('returns empty configuration', async () => {
      const dir = {}

      vol.fromJSON(dir, input.targetPath)

      const output = await readSharecConfig(input)

      expect(output).toEqual({
        ...input,
        sharecConfig: {},
      })
    })
  })
})
