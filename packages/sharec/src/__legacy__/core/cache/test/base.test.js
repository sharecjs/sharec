const path = require('path')
const { vol } = require('memfs')
const { cacheConfig, loadConfigCache } = require('../index')

describe('core > configs > cache >', () => {
  const cacheDir = '/target/node_modules/.cache/sharec/awesome-config/1.0.0'

  beforeEach(() => {
    vol.reset()
  })

  describe('cacheConfig', () => {
    it('should cache config source to target path node_modules/.cache', async () => {
      expect.assertions(1)

      vol.fromJSON({}, '/')

      await cacheConfig({
        configsMeta: {
          config: 'awesome-config',
          version: '1.0.0',
        },
        configPath: '_templates/exampleCss.ejs.t',
        configSource: 'foo',
        targetPath: '/target',
      })

      expect(
        vol.readFileSync(
          path.join(cacheDir, '_templates/exampleCss.ejs.t'),
          'utf8',
        ),
      ).toEqual('foo')
    })
  })

  describe('loadConfigCache', () => {
    it('should load config cache', async () => {
      expect.assertions(1)

      const dir = {
        [path.join(cacheDir, '_templates/exampleHtml.ejs.t')]: 'foo',
      }
      vol.fromJSON(dir, '/')

      const cache = await loadConfigCache({
        configsMeta: {
          config: 'awesome-config',
          version: '1.0.0',
        },
        configPath: '_templates/exampleHtml.ejs.t',
        targetPath: '/target',
      })

      expect(cache).toBe('foo')
    })

    it('should return null if config cache is not exist', async () => {
      expect.assertions(1)

      const dir = {}
      vol.fromJSON(dir, '/')

      const cache = await loadConfigCache({
        configsMeta: {
          config: 'awesome-config',
          version: '1.0.0',
        },
        configPath: '_templates/exampleHtml.ejs.t',
        targetPath: '/target',
      })

      expect(cache).toBeNull()
    })
  })
})
