const { vol } = require('memfs')
const { collectConfigPackageInfo, collectConfigs } = require('../collect')

describe('core > collector >', () => {
  beforeEach(() => {
    vol.reset()
  })

  describe('collectConfigPackageInfo', () => {
    it('should return configuration package version', async () => {
      expect.assertions(1)

      const dir = {
        'package.json': JSON.stringify({
          name: 'my-awesome-configs',
          version: '1.0.0',
        }),
      }
      vol.fromJSON(dir, '/configs')

      const info = await collectConfigPackageInfo('/configs')

      expect(info).toEqual({
        name: 'my-awesome-configs',
        version: '1.0.0',
      })
    })
  })

  describe('collectConfigs', () => {
    it('should collect all configs from given path and return hash with their sources in utf8', async () => {
      expect.assertions(1)

      const dir = {
        'package.json': 'foo',
        '.eslintrc': 'bar',
        'package-lock.json': 'baz',
        'yarn.lock': 'foo',
      }
      vol.fromJSON(dir, '/configs')

      const files = await collectConfigs('/configs')

      expect(files).toEqual({
        'package.json': 'foo',
        '.eslintrc': 'bar',
      })
    })
  })
})
