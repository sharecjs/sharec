const path = require('path')
const { vol } = require('memfs')
const { backupConfigs } = require('../cache')

describe('core > compress >', () => {
  beforeEach(() => {
    vol.reset()
  })

  describe('backupConfigs', () => {
    it('should compress all configs from given pathes and return hash with hex-encoded files inside', async () => {
      expect.assertions(3)

      const dir = {
        '/configuration-package/_templates/exampleCss.ejs.t': 'foo',
        '/configuration-package/_templates/exampleHtml.ejs.t': 'bar',
        '/configuration-package/_templates/exampleJs.ejs.t': 'baz',
      }
      const cacheDir = '/target/node_modules/.cache/sharec/awesome-config/1.0.0'
      vol.fromJSON(dir, '/')

      await backupConfigs({
        configsName: 'awesome-config',
        configsVersion: '1.0.0',
        configsPath: '/configuration-package',
        targetPath: '/target',
      })

      expect(
        vol.readFileSync(
          path.join(cacheDir, '_templates/exampleCss.ejs.t'),
          'utf8',
        ),
      ).toEqual('foo')
      expect(
        vol.readFileSync(
          path.join(cacheDir, '_templates/exampleHtml.ejs.t'),
          'utf8',
        ),
      ).toEqual('bar')
      expect(
        vol.readFileSync(
          path.join(cacheDir, '_templates/exampleJs.ejs.t'),
          'utf8',
        ),
      ).toEqual('baz')
    })
  })
})
